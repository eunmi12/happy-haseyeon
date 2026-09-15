/**
 * 광고 블로그 픽셀 — 값이 있는 항목만 스크립트 생성
 * ID는 영문·숫자·하이픈·언더스코어만 허용 (XSS 방지)
 */

function cleanId(v) {
  const s = String(v || '').trim();
  if (!s) return '';
  if (!/^[A-Za-z0-9_-]+$/.test(s)) return '';
  return s;
}

function cleanLabel(v) {
  const s = String(v || '').trim();
  if (!s) return '';
  if (!/^[A-Za-z0-9_-]+$/.test(s)) return '';
  return s;
}

/** 저장된 JSON 문자열/객체 → 정규화 객체 */
export function parseAdPixels(raw) {
  if (!raw) return {};
  let obj = raw;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return {};
    try {
      obj = JSON.parse(t);
    } catch {
      return {};
    }
  }
  if (!obj || typeof obj !== 'object') return {};
  return {
    meta_pixel_id: String(obj.meta_pixel_id || '').trim(),
    tiktok_pixel_id: String(obj.tiktok_pixel_id || '').trim(),
    google_ga4_id: String(obj.google_ga4_id || '').trim(),
    google_ads_id: String(obj.google_ads_id || '').trim(),
    google_ads_label: String(obj.google_ads_label || '').trim(),
    google_gtm_id: String(obj.google_gtm_id || '').trim(),
    naver_wcs_id: String(obj.naver_wcs_id || '').trim(),
    naver_search_conversion_id: String(obj.naver_search_conversion_id || '').trim(),
    kakao_pixel_id: String(obj.kakao_pixel_id || '').trim(),
    custom_head_html: String(obj.custom_head_html || '').trim(),
  };
}

/** 입력값 정리 후 JSON 문자열 (전부 비면 '') */
export function serializeAdPixels(input) {
  const p = parseAdPixels(input);
  const out = {};
  for (const [k, v] of Object.entries(p)) {
    if (v) out[k] = v;
  }
  return Object.keys(out).length ? JSON.stringify(out) : '';
}

export function hasAnyPixel(raw) {
  const p = parseAdPixels(raw);
  return Object.values(p).some((v) => !!v);
}

/**
 * <head> 에 넣을 픽셀 HTML
 * — 비어 있으면 '' (자동 삽입 안 함)
 */
export function buildPixelHeadHtml(raw) {
  const p = parseAdPixels(raw);
  const parts = [];

  const metaId = cleanId(p.meta_pixel_id);
  if (metaId) {
    parts.push(`<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaId}');
fbq('track','PageView');
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1" alt="" /></noscript>`);
  }

  const ttId = cleanId(p.tiktok_pixel_id);
  if (ttId) {
    parts.push(`<!-- TikTok Pixel -->
<script>
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
ttq.load('${ttId}');
ttq.page();
}(window,document,'ttq');
</script>`);
  }

  const gtmId = cleanId(p.google_gtm_id);
  if (gtmId) {
    parts.push(`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>`);
  }

  const ga4 = cleanId(p.google_ga4_id);
  const adsId = cleanId(p.google_ads_id);
  const adsLabel = cleanLabel(p.google_ads_label);
  if (ga4 || adsId) {
    parts.push(`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4 || adsId}"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
${ga4 ? `gtag('config','${ga4}');` : ''}
${adsId ? `gtag('config','${adsId}');` : ''}
${adsId && adsLabel ? `gtag('event','conversion',{'send_to':'${adsId}/${adsLabel}'});` : ''}
</script>`);
  }

  const naverWcs = cleanId(p.naver_wcs_id);
  const naverCnv = cleanId(p.naver_search_conversion_id);
  if (naverWcs || naverCnv) {
    parts.push(`<!-- Naver Analytics / Search Ads -->
<script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
<script type="text/javascript">
if(!window.wcs_add) window.wcs_add={};
${naverWcs ? `wcs_add["wa"]="${naverWcs}";` : ''}
if(window.wcs){
  wcs.inflow();
  ${naverCnv ? `var _nasa={}; if(typeof wcs.cnv==="function"){ _nasa["cnv"]=wcs.cnv("1","${naverCnv}"); } wcs_do(_nasa);` : 'wcs_do();'}
}
</script>`);
  }

  const kakaoId = cleanId(p.kakao_pixel_id);
  if (kakaoId) {
    parts.push(`<!-- Kakao Pixel -->
<script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<script type="text/javascript">
if(window.kakaoPixel){ kakaoPixel('${kakaoId}').pageView(); }
</script>`);
  }

  // 관리자가 붙여넣은 커스텀 스크립트 (값 있을 때만)
  if (p.custom_head_html) {
    // </body> 등으로 문서 깨뜨리는 패턴 최소 차단
    const custom = p.custom_head_html
      .replace(/<\/(html|body|head)>/gi, '')
      .replace(/<script[\s>]/?[\s\S]*?<\/script>/gi, (m) => m) // keep scripts
      .trim();
    if (custom) {
      parts.push(`<!-- Custom tracking -->\n${custom}`);
    }
  }

  if (!parts.length) return '';
  return '\n' + parts.join('\n') + '\n';
}

/** GTM noscript 는 body 직후용 */
export function buildPixelBodyStartHtml(raw) {
  const p = parseAdPixels(raw);
  const gtmId = cleanId(p.google_gtm_id);
  if (!gtmId) return '';
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
}
