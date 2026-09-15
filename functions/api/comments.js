import {
  json,
  options,
  requireAdmin,
  ensureCommentsColumns,
} from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

async function syncCommentCount(env, postId) {
  if (!postId) return 0;
  const row = await env.DB.prepare(
    'SELECT COUNT(*) AS c FROM comments WHERE post_id = ?'
  )
    .bind(postId)
    .first();
  return Number(row?.c) || 0;
}

async function resolveParentId(env, postId, rawParentId) {
  const parentId = Number(rawParentId) || 0;
  if (!parentId) return null;
  const parent = await env.DB.prepare(
    'SELECT id, parent_id, post_id FROM comments WHERE id = ? LIMIT 1'
  )
    .bind(parentId)
    .first();
  if (!parent || Number(parent.post_id) !== Number(postId)) {
    return { error: '답글 대상 댓글을 찾을 수 없습니다.' };
  }
  // 대댓글의 대댓글은 최상위 부모로 붙임 (1단 중첩)
  const rootId = Number(parent.parent_id) || Number(parent.id);
  return { parent_id: rootId };
}

async function insertComment(env, row) {
  const attempts = [
    {
      sql: `INSERT INTO comments (
        post_id, author, content, likes, dislikes, created_at, sort_order, profile_image, parent_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      binds: [
        row.postId,
        row.author,
        row.content,
        row.likes,
        row.dislikes,
        row.created_at,
        row.sort_order,
        row.profile_image,
        row.parent_id,
      ],
    },
    {
      sql: `INSERT INTO comments (
        post_id, author, content, likes, dislikes, created_at, sort_order, profile_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      binds: [
        row.postId,
        row.author,
        row.content,
        row.likes,
        row.dislikes,
        row.created_at,
        row.sort_order,
        row.profile_image,
      ],
    },
    {
      sql: `INSERT INTO comments (
        post_id, author, content, likes, dislikes, created_at, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      binds: [
        row.postId,
        row.author,
        row.content,
        row.likes,
        row.dislikes,
        row.created_at,
        row.sort_order,
      ],
    },
    {
      sql: `INSERT INTO comments (
        post_id, author, content, likes, created_at, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      binds: [
        row.postId,
        row.author,
        row.content,
        row.likes,
        row.created_at,
        row.sort_order,
      ],
    },
  ];

  let lastErr;
  for (const attempt of attempts) {
    try {
      return await env.DB.prepare(attempt.sql).bind(...attempt.binds).run();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function onRequestPost(context) {
  try {
    await ensureCommentsColumns(context.env);
  } catch (_) {
    /* ignore */
  }

  // 공개 페이지에서는 회원/비회원 모두 작성 불가 — 관리자만 댓글·대댓글 등록
  const admin = await requireAdmin(context.request, context.env);
  if (!admin.ok) {
    return json(
      { error: '댓글은 관리자만 작성할 수 있습니다.', needAuth: true },
      403
    );
  }

  const body = await context.request.json().catch(() => ({}));
  const postId = Number(body.post_id);
  if (!postId) return json({ error: 'post_id가 필요합니다.' }, 400);

  const content = String(body.content || '').trim();
  if (!content) return json({ error: '댓글 내용을 입력하세요.' }, 400);
  if (content.length > 2000) {
    return json({ error: '댓글은 2000자 이하로 작성해 주세요.' }, 400);
  }

  const post = await context.env.DB.prepare(
    'SELECT id FROM posts WHERE id = ? LIMIT 1'
  )
    .bind(postId)
    .first();
  if (!post) return json({ error: '글을 찾을 수 없습니다.' }, 404);

  const parentResolved = await resolveParentId(
    context.env,
    postId,
    body.parent_id
  );
  if (parentResolved?.error) {
    return json({ error: parentResolved.error }, 400);
  }
  const parent_id = parentResolved?.parent_id ?? null;

  const author = String(body.author || '').trim() || '관리자';
  const created_at = body.created_at || '';
  const likes = Number(body.likes) || 0;
  const dislikes = Number(body.dislikes) || 0;
  const sort_order = Number(body.sort_order) || 0;
  const profile_image = String(body.profile_image || '').trim();

  const result = await insertComment(context.env, {
    postId,
    author,
    content,
    likes,
    dislikes,
    created_at,
    sort_order,
    profile_image,
    parent_id,
  });

  const comment_count = await syncCommentCount(context.env, postId);
  return json({
    ok: true,
    id: result.meta.last_row_id,
    comment_count,
    comment: {
      id: result.meta.last_row_id,
      post_id: postId,
      author,
      content,
      likes,
      dislikes,
      created_at,
      sort_order,
      profile_image,
      parent_id,
    },
  });
}

export async function onRequestPut(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  try {
    await ensureCommentsColumns(context.env);
  } catch (_) {
    /* ignore */
  }

  const body = await context.request.json();
  const id = Number(body.id);
  if (!id) return json({ error: 'id가 필요합니다.' }, 400);

  try {
    await context.env.DB.prepare(
      `UPDATE comments SET
        author = COALESCE(?, author),
        content = COALESCE(?, content),
        likes = COALESCE(?, likes),
        dislikes = COALESCE(?, dislikes),
        created_at = COALESCE(?, created_at),
        sort_order = COALESCE(?, sort_order),
        profile_image = COALESCE(?, profile_image)
       WHERE id = ?`
    )
      .bind(
        body.author ?? null,
        body.content ?? null,
        body.likes !== undefined ? Number(body.likes) : null,
        body.dislikes !== undefined ? Number(body.dislikes) : null,
        body.created_at ?? null,
        body.sort_order !== undefined ? Number(body.sort_order) : null,
        body.profile_image !== undefined ? String(body.profile_image) : null,
        id
      )
      .run();
  } catch (e) {
    const msg = String(e?.message || e);
    if (/no such column:\s*profile_image/i.test(msg)) {
      await context.env.DB.prepare(
        `UPDATE comments SET
          author = COALESCE(?, author),
          content = COALESCE(?, content),
          likes = COALESCE(?, likes),
          dislikes = COALESCE(?, dislikes),
          created_at = COALESCE(?, created_at),
          sort_order = COALESCE(?, sort_order)
         WHERE id = ?`
      )
        .bind(
          body.author ?? null,
          body.content ?? null,
          body.likes !== undefined ? Number(body.likes) : null,
          body.dislikes !== undefined ? Number(body.dislikes) : null,
          body.created_at ?? null,
          body.sort_order !== undefined ? Number(body.sort_order) : null,
          id
        )
        .run();
    } else {
      throw e;
    }
  }

  return json({ ok: true });
}

export async function onRequestDelete(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'id가 필요합니다.' }, 400);

  const row = await context.env.DB.prepare(
    'SELECT post_id FROM comments WHERE id = ?'
  )
    .bind(id)
    .first();

  // 대댓글도 함께 삭제
  try {
    await context.env.DB.prepare(
      'DELETE FROM comments WHERE parent_id = ?'
    )
      .bind(id)
      .run();
  } catch (_) {
    /* parent_id 없는 구버전 무시 */
  }

  await context.env.DB.prepare('DELETE FROM comments WHERE id = ?')
    .bind(id)
    .run();

  let comment_count = 0;
  if (row?.post_id) {
    comment_count = await syncCommentCount(context.env, row.post_id);
  }

  return json({ ok: true, comment_count });
}
