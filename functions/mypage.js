/** /mypage → mypage.html */
export async function onRequestGet(context) {
  const asset = await context.env.ASSETS.fetch(
    new URL('/mypage.html', context.request.url)
  );
  return new Response(asset.body, {
    status: asset.status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
