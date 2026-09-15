import { json, options, requireAdmin, ensureSchema } from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

export async function onRequestGet(context) {
  await ensureSchema(context.env);
  const { results } = await context.env.DB.prepare(
    'SELECT * FROM notices ORDER BY sort_order ASC, id ASC'
  ).all();
  return json({ notices: results || [] });
}

export async function onRequestPost(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;
  await ensureSchema(context.env);

  const body = await context.request.json();
  const result = await context.env.DB.prepare(
    'INSERT INTO notices (title, published_at, sort_order) VALUES (?, ?, ?)'
  )
    .bind(
      body.title || '',
      body.published_at || '',
      Number(body.sort_order) || 0
    )
    .run();

  return json({ ok: true, id: result.meta.last_row_id });
}

export async function onRequestPut(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  const body = await context.request.json();
  const id = Number(body.id);
  if (!id) return json({ error: 'id가 필요합니다.' }, 400);

  await context.env.DB.prepare(
    `UPDATE notices SET
      title = COALESCE(?, title),
      published_at = COALESCE(?, published_at),
      sort_order = COALESCE(?, sort_order)
     WHERE id = ?`
  )
    .bind(
      body.title ?? null,
      body.published_at ?? null,
      body.sort_order !== undefined ? Number(body.sort_order) : null,
      id
    )
    .run();

  return json({ ok: true });
}

export async function onRequestDelete(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'id가 필요합니다.' }, 400);

  await context.env.DB.prepare('DELETE FROM notices WHERE id = ?').bind(id).run();
  return json({ ok: true });
}
