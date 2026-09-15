# 행복하서연

네이버 블로그 UI 참고 + Cloudflare Pages / D1 / R2 관리형 블로그

## Production

- 사이트: https://happy-haseyeon.pages.dev/
- 상세 예: https://happy-haseyeon.pages.dev/fv75tanm
- 관리자: https://happy-haseyeon.pages.dev/admin  (또는 /admin.html)
- 초기 비밀번호: `admin1234`

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
