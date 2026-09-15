/** SEO 공통 유틸 */

export function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(text, max = 150) {
  const s = String(text || '').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

export function absoluteUrl(origin, path) {
  if (!path) return origin || '';
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
  const base = String(origin || '').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/** 게시글 SEO 값 계산 (비어 있으면 제목·본문으로 자동) */
export function resolvePostSeo(post, settings = {}, origin = '') {
  const blogName = settings.blog_name || settings.cafe_title || '행복하서연';
  const title = (post.seo_title || '').trim() || post.title || blogName;
  const pageTitle = title.includes(blogName) ? title : `${title} — ${blogName}`;
  const autoDesc = truncate(stripHtml(post.body), 150);
  const description =
    (post.seo_description || '').trim() ||
    autoDesc ||
    settings.cafe_desc ||
    settings.blog_subtitle ||
    `${blogName} 다이어트·일상 기록`;
  const isAd = post.category === '광고';
  const canonical = absoluteUrl(
    origin,
    isAd ? `/${post.slug}/` : `/${post.slug}`
  );
  const image =
    absoluteUrl(origin, post.cover_image) ||
    absoluteUrl(origin, settings.hero_image || '/images/hero-diet.jpg') ||
    absoluteUrl(origin, '/images/dummy/01.jpg');

  return {
    title: pageTitle,
    seoTitle: title,
    description: truncate(description, 160),
    canonical,
    image,
    blogName,
  };
}

export function blogPostingJsonLd(post, seo, settings = {}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seo.seoTitle || post.title,
    description: seo.description,
    image: seo.image ? [seo.image] : undefined,
    datePublished: post.created_at || undefined,
    dateModified: post.updated_at || post.created_at || undefined,
    author: {
      '@type': 'Person',
      name: settings.profile_name || settings.blog_name || '행복하서연',
    },
    publisher: {
      '@type': 'Organization',
      name: seo.blogName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.canonical,
    },
    articleSection: post.category || undefined,
    url: seo.canonical,
  };
  return JSON.stringify(data);
}

export function postHeadTags(post, settings, origin) {
  const seo = resolvePostSeo(post, settings, origin);
  const jsonLd = blogPostingJsonLd(post, seo, settings);
  const robots =
    post.category === '광고' ? 'noindex, nofollow' : 'index, follow';
  return {
    seo,
    headHtml: `
  <title>${escapeAttr(seo.title)}</title>
  <meta name="description" content="${escapeAttr(seo.description)}" />
  <meta name="robots" content="${robots}" />
  <link rel="canonical" href="${escapeAttr(seo.canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="${escapeAttr(seo.blogName)}" />
  <meta property="og:title" content="${escapeAttr(seo.seoTitle)}" />
  <meta property="og:description" content="${escapeAttr(seo.description)}" />
  <meta property="og:url" content="${escapeAttr(seo.canonical)}" />
  <meta property="og:image" content="${escapeAttr(seo.image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(seo.seoTitle)}" />
  <meta name="twitter:description" content="${escapeAttr(seo.description)}" />
  <meta name="twitter:image" content="${escapeAttr(seo.image)}" />
  <script type="application/ld+json">${jsonLd.replace(/</g, '\\u003c')}</script>`,
  };
}

function escapeAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
