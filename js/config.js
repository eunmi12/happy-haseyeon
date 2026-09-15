/** Live Server(5500) / file:// 에서도 API는 wrangler(8788)로 요청 */
const SITE_ORIGIN = 'https://tennis0915.com';
const AD_CATEGORY = '광고';

function apiBase() {
  const port = location.port;
  const isLive =
    port === '5500' ||
    port === '5501' ||
    location.protocol === 'file:';
  return isLive ? 'http://127.0.0.1:8788' : '';
}

function apiUrl(path) {
  return apiBase() + path;
}

function postHref(slug, { ad = false } = {}) {
  const code = String(slug || '').replace(/^\/+|\/+$/g, '');
  if (apiBase()) {
    return '/post.html?slug=' + encodeURIComponent(code);
  }
  return ad ? '/' + encodeURIComponent(code) + '/' : '/' + encodeURIComponent(code);
}

/** 관리자 목록용 전체 도메인 URL (광고는 끝에 /) */
function publicPostUrl(slug, { ad = false } = {}) {
  const code = String(slug || '').replace(/^\/+|\/+$/g, '');
  if (!code) return SITE_ORIGIN + '/';
  return ad ? `${SITE_ORIGIN}/${code}/` : `${SITE_ORIGIN}/${code}`;
}

/** 광고 블로그용 암호화형 코드 */
function encryptedSlug(byteLen = 18) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  try {
    const arr = new Uint8Array(byteLen);
    crypto.getRandomValues(arr);
    let s = '';
    for (let i = 0; i < arr.length; i++) s += chars[arr[i] % chars.length];
    return s;
  } catch (_) {
    let s = '';
    for (let i = 0; i < byteLen; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
  }
}
