import { json, options, requireAdmin, requireMember } from '../_utils.js';

const MAX_IMAGE = 10 * 1024 * 1024;
/** Cloudflare Free/Pro 요청 본문 한도 100MB 이하로 여유 두고 설정 */
const MAX_VIDEO = 95 * 1024 * 1024;

export async function onRequestOptions() {
  return options();
}

export async function onRequestPost(context) {
  const admin = await requireAdmin(context.request, context.env);
  let member = null;
  if (!admin.ok) {
    member = await requireMember(context.request, context.env);
    if (!member.ok) return admin.response;
  }

  if (!context.env.IMAGES) {
    return json({ error: 'R2 바인딩(IMAGES)이 없습니다.' }, 500);
  }

  const form = await context.request.formData();
  const file = form.get('file');

  if (!file || typeof file === 'string') {
    return json({ error: '파일이 필요합니다.' }, 400);
  }

  const bytes = await file.arrayBuffer();
  const type = file.type || 'image/jpeg';
  const isImage = type.startsWith('image/');
  const isVideo = type.startsWith('video/');

  // 회원은 이미지만, 관리자는 이미지·영상
  if (member?.ok && !admin.ok) {
    if (!isImage) {
      return json({ error: '이미지 파일만 업로드할 수 있습니다.' }, 400);
    }
  } else if (!isImage && !isVideo) {
    return json({ error: '이미지 또는 영상 파일만 업로드할 수 있습니다.' }, 400);
  }

  const max = isVideo ? MAX_VIDEO : MAX_IMAGE;
  if (bytes.byteLength > max) {
    return json(
      {
        error: isVideo
          ? '영상은 95MB 이하만 업로드 가능합니다. (용량이 큰 파일은 압축 후 다시 올려 주세요)'
          : '이미지는 10MB 이하만 업로드 가능합니다.',
      },
      400
    );
  }

  const ext = (file.name || '').split('.').pop()?.toLowerCase() || (isVideo ? 'mp4' : 'jpg');
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : isVideo ? 'mp4' : 'jpg';
  const prefix = member?.ok && !admin.ok ? 'members' : isVideo ? 'videos' : 'uploads';
  const key = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  await context.env.IMAGES.put(key, bytes, {
    httpMetadata: { contentType: type },
  });

  const base = (context.env.R2_PUBLIC_URL || '').replace(/\/$/, '');
  const url = base ? `${base}/${key}` : `/api/upload?key=${encodeURIComponent(key)}`;

  return json({ ok: true, url, key });
}
