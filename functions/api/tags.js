import { json, options, requireAdmin } from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

export async function onRequestGet(context) {
  const { results } = await context.env.DB.prepare(
    'SELECT id, label, sort_order FROM popular_tags ORDER BY sort_order ASC, id ASC'
  ).all();
  return json({ tags: results || [] });
}

/** PUT { tags: [{ label, sort_order }] } — 전체 교체 */
export async function onRequestPut(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  const body = await context.request.json().catch(() => ({}));
  const tags = Array.isArray(body.tags) ? body.tags : [];

  await context.env.DB.prepare('DELETE FROM popular_tags').run();
  for (let i = 0; i < tags.length; i++) {
    const label = String(tags[i].label || '').trim();
    if (!label) continue;
    const sort = Number(tags[i].sort_order);
    await context.env.DB.prepare(
      'INSERT INTO popular_tags (label, sort_order) VALUES (?, ?)'
    )
      .bind(label, Number.isFinite(sort) ? sort : i)
      .run();
  }

  const { results } = await context.env.DB.prepare(
    'SELECT id, label, sort_order FROM popular_tags ORDER BY sort_order ASC, id ASC'
  ).all();
  return json({ tags: results || [] });
}
