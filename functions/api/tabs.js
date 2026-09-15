import { json, options, requireAdmin, ensureSchema } from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

export async function onRequestGet(context) {
  await ensureSchema(context.env);
  const { results } = await context.env.DB.prepare(
    'SELECT * FROM cafe_tabs ORDER BY sort_order ASC, id ASC'
  ).all();
  return json({ tabs: results || [] });
}

/** PUT { tabs: [{id?, label, sort_order}] } — 전체 교체 */
export async function onRequestPut(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;
  await ensureSchema(context.env);

  const body = await context.request.json();
  const tabs = body.tabs || [];

  await context.env.DB.prepare('DELETE FROM cafe_tabs').run();
  for (let i = 0; i < tabs.length; i++) {
    const label = String(tabs[i].label || '').trim();
    if (!label) continue;
    await context.env.DB.prepare(
      'INSERT INTO cafe_tabs (label, sort_order) VALUES (?, ?)'
    )
      .bind(label, Number(tabs[i].sort_order) || i)
      .run();
  }

  const { results } = await context.env.DB.prepare(
    'SELECT * FROM cafe_tabs ORDER BY sort_order ASC, id ASC'
  ).all();
  return json({ ok: true, tabs: results || [] });
}
