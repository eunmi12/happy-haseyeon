# 더미 이미지 (01~18)

게시글 시드 SQL: `migrations/008_clear_notices_seed_dummies.sql`

| 파일 | 용도 |
|------|------|
| 01.jpg | 밀프렙 / 식단 |
| 02.jpg | 샐러드 |
| 03.jpg | 체중계 |
| 04.jpg | 걷기 |
| 05.jpg | 요거트·단백질 |
| 06.jpg | 보관·가이드 |
| 07.jpg | 도시락 |
| 08.jpg | 물병·운동화 |
| 09.jpg | 저녁 식단 |
| 10.jpg | 과일 디저트 |
| 11.jpg | 커피·제로시럽 |
| 12.jpg | 주말 브런치 |
| 13~16.jpg | 단백질 제품 후기 |
| 17~18.jpg | 요가매트·밴드 후기 |

## D1 실행 예시

```bash
npx wrangler d1 execute happy-haseyeon --remote --file=migrations/008_clear_notices_seed_dummies.sql
```

이미지 폴더는 정적 자산으로 Pages에 함께 배포됩니다.
