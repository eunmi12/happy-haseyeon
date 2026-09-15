# 행복하서연

네이버 블로그 UI 참고 + Cloudflare Pages / D1 / R2 관리형 블로그

## Production

- 정식 도메인: https://tennis0915.com/
- Pages 기본: https://happy-haseyeon.pages.dev/
- 관리자: https://tennis0915.com/admin  (또는 /admin.html)

### 도메인 DNS (Cloudflare)

Pages에 도메인은 등록됨. DNS에 아래 레코드가 있어야 active 됩니다.

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `@` (tennis0915.com) | `happy-haseyeon.pages.dev` | Proxied |
| CNAME | `www` | `happy-haseyeon.pages.dev` | Proxied |

## 구조

```
/
  index.html, post.html, admin.html
  css/, js/
  functions/
  wrangler.toml
```

## 배포

```bash
npm run deploy
```

## 스토리지

- D1: `happy-haseyeon-db`
- R2: `happy-haseyeon-r2` (공개 URL: `https://pub-0d79669bad084bcd94df5093066b951f.r2.dev`)
- 이미지 업로드는 R2에 저장 후 공개 URL 반환
