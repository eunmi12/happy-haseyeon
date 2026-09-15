/** 광고 URL 등 trailing slash 요청을 동일 경로로 처리 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (
    path.length > 1 &&
    path.endsWith('/') &&
    !path.startsWith('/api/')
  ) {
    const rewritten = new URL(url);
    rewritten.pathname = path.replace(/\/+$/, '') || '/';
    return context.next(new Request(rewritten.toString(), context.request));
  }

  return context.next();
}
