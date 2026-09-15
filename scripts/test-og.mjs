const url =
  process.argv[2] ||
  'https://piromin.com/shop_view?idx=11&utm_source=google&utm_campaign=blog';

function pickMeta(html, prop) {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
      'i'
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
      'i'
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return '';
}

const res = await fetch(url, {
  redirect: 'follow',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'text/html',
  },
});
const html = await res.text();
const title =
  pickMeta(html, 'og:title') ||
  (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim();
const description =
  pickMeta(html, 'og:description') || pickMeta(html, 'description');
const image =
  pickMeta(html, 'og:image') ||
  pickMeta(html, 'og:image:url') ||
  pickMeta(html, 'twitter:image');
console.log(JSON.stringify({ status: res.status, finalUrl: res.url, title, description, image }, null, 2));
