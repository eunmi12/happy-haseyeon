/** /board → /?c=… 로 보내 게시판 표시 (index는 Functions 제외) */
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const c = url.searchParams.get('c') || 'all';
  const dest = new URL('/', url.origin);
  dest.searchParams.set('c', c);
  return Response.redirect(dest.toString(), 302);
}
