/**
 * 링크 카드 HTML 구조 검증 (piromin OG 기준)
 * 실행: node scripts/test-link-card.mjs
 */
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

const url =
  'https://piromin.com/shop_view?idx=11&utm_source=google&utm_campaign=blog';

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// buildLinkCardHtml 로직을 scripts에서 복제 검증
function buildLinkCardHtml({ url, title, description, image, domain }, opts = {}) {
  const align = opts.align === 'left' ? 'left' : 'center';
  const safeUrl = escapeHtml(url || '');
  const safeTitle = escapeHtml(title || domain || url || '');
  const safeDesc = escapeHtml(description || '');
  const safeImage = escapeHtml(image || '');
  const safeDomain = escapeHtml(domain || '');
  const imgCell = image
    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:block;line-height:0;text-decoration:none;"><img class="link-card-img" src="${safeImage}" alt="${safeTitle}" style="display:block;width:100%;height:auto;margin:0;border:0;" /></a>`
    : `<div class="link-card-thumb--empty"></div>`;
  const descRow = description
    ? `<a class="link-card-desc" href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:block;margin-top:6px;font-size:13px;color:#666666;text-decoration:none;">${safeDesc}</a>`
    : '';
  const table =
    `<table class="link-card" data-lc="1" data-url="${safeUrl}" data-title="${safeTitle}" data-desc="${safeDesc}" data-image="${safeImage}" data-domain="${safeDomain}" contenteditable="false" style="display:inline-table;width:100%;max-width:520px;margin:0 auto;border:1px solid #e5e8eb;border-radius:10px;border-collapse:separate;background:#fff;text-align:left;"><tbody>` +
    `<tr><td class="link-card-media" style="padding:0;line-height:0;">${imgCell}</td></tr>` +
    `<tr><td class="link-card-body" style="padding:14px 16px 16px;text-align:left;">` +
    `<a class="link-card-title" href="${safeUrl}" style="display:block;font-size:16px;font-weight:700;color:#222;text-decoration:none;">${safeTitle}</a>` +
    descRow +
    `<a class="link-card-domain" href="${safeUrl}" style="display:block;margin-top:6px;font-size:12px;color:#2e9e4d;text-decoration:none;">${safeDomain}</a>` +
    `</td></tr></tbody></table>`;
  return (
    `<p class="link-card-url-line" style="text-align:${align};margin:0 0 8px;"><a class="link-card-url" href="${safeUrl}">${safeUrl}</a></p>` +
    `<p class="link-card-block" style="text-align:${align};margin:0 0 16px;">${table}</p>`
  );
}

const res = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'text/html',
  },
});
const html = await res.text();
function pick(prop) {
  const a = html.match(
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
      'i'
    )
  );
  const b = html.match(
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
      'i'
    )
  );
  return (a && a[1]) || (b && b[1]) || '';
}
const data = {
  url,
  title: pick('og:title') || '베르린정 독일 과학의 결과물.',
  description: pick('og:description') || '베르린정 프리미엄 포뮬러',
  image: pick('og:image'),
  domain: 'piromin.com',
};

const cardHtml = buildLinkCardHtml(data, { align: 'center' });
const checks = [
  ['url line', /link-card-url-line[\s\S]*piromin\.com\/shop_view/],
  ['table card', /<table class="link-card"/],
  ['image', /link-card-img[\s\S]*cdn\.imweb\.me|src="https:\/\/cdn\.imweb/],
  ['title', /link-card-title[\s\S]*베르린정 독일 과학의 결과물/],
  ['desc', /link-card-desc[\s\S]*베르린정 프리미엄 포뮬러/],
  ['domain', /link-card-domain[\s\S]*piromin\.com/],
  ['centered', /text-align:center/],
];

let ok = true;
for (const [name, re] of checks) {
  const pass = re.test(cardHtml);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
  if (!pass) ok = false;
}

const fixture = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Link card fixture</title>
<link rel="stylesheet" href="../css/blog.css" />
<style>body{font-family:sans-serif;padding:24px;max-width:720px;margin:0 auto}
.post-body{padding:16px}</style>
</head><body>
<article class="post-body">
<p style="text-align:center;font-weight:700">혹시 지금도 다이어트땜에<br>스트레스 겁나받으시고 펜 고민하고<br>펜 했는데 나랑 체질에 안맞다면</p>
${cardHtml}
<p style="text-align:center;font-weight:700;background:#ffe66d">이거 하나만 먹어보십쇼....<br>딱 1개월이면 각 나옵니당...</p>
</article>
</body></html>`;

import { writeFileSync } from 'fs';
writeFileSync(new URL('./link-card-fixture.html', import.meta.url), fixture, 'utf8');
console.log('Wrote scripts/link-card-fixture.html');
console.log(ok ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED');
process.exit(ok ? 0 : 1);
