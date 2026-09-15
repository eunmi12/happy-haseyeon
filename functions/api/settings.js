import { json, options, requireAdmin, getSettings } from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

export async function onRequestGet(context) {
  const settings = await getSettings(context.env);
  return json({ settings });
}

export async function onRequestPut(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  const body = await context.request.json();
  const entries = body.settings || body;

  for (const [key, value] of Object.entries(entries)) {
    if (key === 'password') continue;
    await context.env.DB.prepare(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
    )
      .bind(key, String(value ?? ''))
      .run();
  }

  const settings = await getSettings(context.env);
  return json({ ok: true, settings });
}
