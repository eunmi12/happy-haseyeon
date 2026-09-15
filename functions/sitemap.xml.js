import { ensureSchema, getSettings } from './_utils.js';

export async function onRequestGet(context) {
  try {
    await ensureSchema(context.env);
  } catch (e) {
    console.error(e);
  }

  const origin = new URL(context.request.url).origin;
  const settings = await getSettings(context.env);
  const blogName = settings.blog_name || settings.cafe_title || '행복하서연';
  const desc =
    settings.cafe_desc ||
    settings.blog_subtitle ||
    '다이어트·일상 후기를 기록하는 카페 블로그';

  let posts = [];
  try {
    const { results } = await context.env.DB.prepare(
      `SELECT slug, title, updated_at, created_at, published_at
       FROM posts
       WHERE category IS NULL OR category != '광고'
       ORDER BY id DESC
       LIMIT 5000`
    ).all();
    posts = results || [];
  } catch (e) {
    console.error(e);
  }

  const urls = [
    {
      loc: `${origin}/`,
      lastmod: new Date().toISOString().slice(0, 10),
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      loc: `${origin}/?c=all`,
      lastmod: new Date().toISOString().slice(0, 10),
      changefreq: 'daily',
      priority: '0.8',
    },
    {
      loc: `${origin}/?c=${encodeURIComponent('인기글')}`,
      changefreq: 'daily',
      priority: '0.8',
    },
    {
      loc: `${origin}/?c=${encodeURIComponent('자유게시판')}`,
      changefreq: 'weekly',
      priority: '0.7',
    },
    {
      loc: `${origin}/?c=${encodeURIComponent('후기')}`,
      changefreq: 'weekly',
      priority: '0.7',
    },
    {
      loc: `${origin}/?c=${encodeURIComponent('공지')}`,
      changefreq: 'weekly',
      priority: '0.6',
    },
  ];

  for (const p of posts) {
    const last =
      (p.updated_at || p.created_at || '').slice(0, 10) ||
      new Date().toISOString().slice(0, 10);
    urls.push({
      loc: `${origin}/${encodeURIComponent(p.slug)}`,
      lastmod: last,
      changefreq: 'weekly',
      priority: '0.9',
    });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    let item = `  <url>\n    <loc>${escapeXml(u.loc)}</loc>`;
    if (u.lastmod) item += `\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>`;
    if (u.changefreq) item += `\n    <changefreq>${u.changefreq}</changefreq>`;
    if (u.priority) item += `\n    <priority>${u.priority}</priority>`;
    item += `\n  </url>`;
    return item;
  })
  .join('\n')}
</urlset>
`;

  // blogName/desc reserved for future image sitemap / news
  void blogName;
  void desc;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
}

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
