import { ensureSchema, options } from '../_utils.js';

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return options();
  }

  try {
    await ensureSchema(context.env);
  } catch (e) {
    console.error('ensureSchema failed', e);
  }

  return context.next();
}
