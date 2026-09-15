import { json, options, ensureViewsTables, kstDateString } from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

/** 공개 — 방문자 조회수 기록 (브라우저당 1일 1회는 클라이언트에서 제어) */
export async function onRequestPost(context) {
  try {
    await ensureViewsTables(context.env);
  } catch (e) {
    console.error(e);
  }

  const ua = context.request.headers.get('User-Agent') || '';
  if (/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)) {
    return json({ ok: true, skipped: true });
  }

  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return json({ error: '잘못된 요청입니다.' }, 400);
  }

  const date = kstDateString();

  if (body.page === 'home') {
    await context.env.DB.prepare(
      `INSERT INTO page_daily_views (page_key, view_date, views)
       VALUES ('home', ?, 1)
       ON CONFLICT(page_key, view_date) DO UPDATE SET views = views + 1`
    )
      .bind(date)
      .run();
    return json({ ok: true, page: 'home', date });
  }

  const postId = Number(body.post_id);
  if (!postId || !Number.isFinite(postId)) {
    return json({ error: 'post_id가 필요합니다.' }, 400);
  }

  const post = await context.env.DB.prepare(
    'SELECT id FROM posts WHERE id = ? LIMIT 1'
  )
    .bind(postId)
    .first();
  if (!post) return json({ error: '글을 찾을 수 없습니다.' }, 404);

  await context.env.DB.prepare(
    `INSERT INTO post_daily_views (post_id, view_date, views)
     VALUES (?, ?, 1)
     ON CONFLICT(post_id, view_date) DO UPDATE SET views = views + 1`
  )
    .bind(postId, date)
    .run();

  return json({ ok: true, post_id: postId, date });
}
