-- 011: 광고 블로그 더미 2건 (네이버 포스팅 톤 · 이미지 8장 + 큰 중앙 텍스트)
-- 이미지: /images/ad/ad01-*.jpg , /images/ad/ad02-*.jpg
-- 실행 전 migrations/010_comment_dislikes.sql 적용 권장

DELETE FROM comments WHERE post_id IN (
  SELECT id FROM posts WHERE slug IN (
    'Kx9mQ2pL7vN4wRaB3c',
    'Zp4nR8sT1uV6xYdE2f'
  )
);
DELETE FROM posts WHERE slug IN (
  'Kx9mQ2pL7vN4wRaB3c',
  'Zp4nR8sT1uV6xYdE2f'
);

INSERT INTO posts (
  slug, title, body, category, cover_image,
  likes, comment_count_display, published_at, updated_at
) VALUES (
  'Kx9mQ2pL7vN4wRaB3c',
  '아침에 이것만 바꿨더니 몸이 가벼워졌어요',
  '<p style="text-align:center;font-size:26px;line-height:1.7;font-weight:700;margin:32px 0 18px;color:#222;">솔직히 말할게요</p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:0 0 28px;color:#333;">다이어트… 저만 이렇게 힘들었어요?</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-01.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">매일 아침이 전쟁이었거든요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">배고픔에 시달리고<br>간식 유혹에 지고<br>저녁엔 또 자책하고…</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-02.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">그래서 루틴을 하나만 바꿨어요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">거창한 운동 말고,<br><strong>아침 한 잔</strong>부터요.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-03.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:28px 0;color:#333;">처음엔 반신반의했는데요</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-04.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">2주쯤 지나니까<br>몸이 먼저 알아채더라고요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">붓기가 덜하고<br>오후 졸음이 줄고<br>야식이 덜 당겼어요.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-05.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:28px 0;color:#333;">완벽한 식단은 못해도<br>이 루틴만큼은 지켰어요</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-06.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">요즘 아침 기분이 달라요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">“오늘은 좀 해볼까?”가<br>먼저 떠오르는 느낌.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad01-07.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:24px;line-height:1.75;font-weight:700;margin:40px 0 18px;color:#222;">같은 고민이라면<br>한번만 해보세요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 28px;color:#444;">거창하지 않아도 됩니다.<br>작은 변화가 제일 오래가요.</p>
<p data-align="center" style="text-align:center;margin:20px 0 36px;"><img src="/images/ad/ad01-08.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:16px;line-height:1.8;color:#888;margin:8px 0 24px;">#아침루틴 #가벼운동 #셀프케어</p>',
  '광고',
  '/images/ad/ad01-01.jpg',
  128,
  3,
  '2026년 7월 18일',
  datetime('now')
);

INSERT INTO posts (
  slug, title, body, category, cover_image,
  likes, comment_count_display, published_at, updated_at
) VALUES (
  'Zp4nR8sT1uV6xYdE2f',
  '밤만 되면 예민해지는 나, 이렇게 달래봤어요',
  '<p style="text-align:center;font-size:26px;line-height:1.7;font-weight:700;margin:32px 0 18px;color:#222;">요즘 밤이 길더라고요</p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:0 0 28px;color:#333;">잠은 오는데<br>마음은 안 오는 느낌…</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-01.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">그래서 밤 루틴을<br>다시 정리해봤어요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">폰을 내려놓고<br>따뜻한 한 잔부터.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-02.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:28px 0;color:#333;">향이 먼저 마음을 풀어주더라고요</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-03.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">거창한 힐링은 아니에요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">그냥<br><strong>“오늘 하루 수고했어”</strong><br>라고 말해주는 시간.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-04.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:28px 0;color:#333;">불을 낮추고<br>호흡만 천천히</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-05.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:22px;line-height:1.8;font-weight:600;margin:36px 0 16px;color:#222;">며칠 해보니<br>잠드는 속도가 달라졌어요</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 24px;color:#444;">생각이 덜 굴러가고<br>몸이 먼저 풀리네요.</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-06.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:20px;line-height:1.85;margin:28px 0;color:#333;">완벽한 루틴보다<br>지킬 수 있는 루틴이 좋아요</p>
<p data-align="center" style="text-align:center;margin:20px 0;"><img src="/images/ad/ad02-07.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:24px;line-height:1.75;font-weight:700;margin:40px 0 18px;color:#222;">당신 밤도<br>조금 더 포근해지길</p>
<p style="text-align:center;font-size:18px;line-height:1.9;margin:0 0 28px;color:#444;">오늘 하루도<br>충분히 애썼으니까요.</p>
<p data-align="center" style="text-align:center;margin:20px 0 36px;"><img src="/images/ad/ad02-08.jpg" alt="" data-align="center" style="display:block;margin-left:auto;margin-right:auto;max-width:100%;height:auto;border-radius:4px;" /></p>
<p style="text-align:center;font-size:16px;line-height:1.8;color:#888;margin:8px 0 24px;">#나이트루틴 #감성케어 #자기전에</p>',
  '광고',
  '/images/ad/ad02-01.jpg',
  96,
  3,
  '2026년 7월 19일',
  datetime('now')
);

-- 댓글 (추천/비추천 포함) — post_id는 slug로 연결
INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '하루한잔', '저도 아침만 바꿨는데 오후가 달라지더라고요 ㅎㅎ', 14, 0, '2일 전', 1
FROM posts WHERE slug = 'Kx9mQ2pL7vN4wRaB3c';

INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '슬로우라이프', '글 톤이 편안해서 끝까지 봤어요. 루틴 참고할게요!', 9, 1, '1일 전', 2
FROM posts WHERE slug = 'Kx9mQ2pL7vN4wRaB3c';

INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '민트초코', '이미지 분위기가 너무 좋네요 👀', 6, 0, '12시간 전', 3
FROM posts WHERE slug = 'Kx9mQ2pL7vN4wRaB3c';

INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '밤공기', '저도 요즘 잠이 안 와서… 한잔 루틴 시도해볼게요', 11, 0, '3일 전', 1
FROM posts WHERE slug = 'Zp4nR8sT1uV6xYdE2f';

INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '감성수집가', '문장이 따뜻해서 마음이 풀렸어요. 감사합니다.', 18, 0, '1일 전', 2
FROM posts WHERE slug = 'Zp4nR8sT1uV6xYdE2f';

INSERT INTO comments (post_id, author, content, likes, dislikes, created_at, sort_order)
SELECT id, '커피말고차', '비추천은 아닌데 저는 카페인 줄이는 게 더 효과있더라구요', 4, 2, '8시간 전', 3
FROM posts WHERE slug = 'Zp4nR8sT1uV6xYdE2f';
