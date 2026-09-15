/** /admin → admin.html */
export async function onRequestGet(context) {
  const asset = await context.env.ASSETS.fetch(
    new URL('/admin.html', context.request.url)
  );

  return new Response(asset.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
