/** /join → join.html */
export async function onRequestGet(context) {
  const asset = await context.env.ASSETS.fetch(
    new URL('/join.html', context.request.url)
  );
  return new Response(asset.body, {
    status: asset.status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
