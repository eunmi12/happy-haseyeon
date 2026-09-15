INSERT OR IGNORE INTO admins (id, password) VALUES (1, 'admin1234');

INSERT OR REPLACE INTO settings (key, value) VALUES
  ('blog_name', '행복하서연'),
  ('blog_subtitle', '다이어트는 정말 쉽다. 솔직한 일상과 후기를 기록합니다'),
  ('profile_name', '하서연'),
  ('profile_image', ''),
  ('profile_desc', '행복하서연의 다이어트 · 일상 기록'),
  ('cafe_title', '행복하서연'),
  ('cafe_desc', '다이어트는 정말 쉽다. 솔직한 일상과 후기를 기록합니다');

INSERT OR IGNORE INTO posts (id, slug, title, body, likes, comment_count_display, published_at) VALUES
(
  1,
  'fv75tanm',
  '마운ㅈ로 효과없던나.. 약없이 2달에 -27kg한 프랑스 다이어트 방법',
  '<p>※무단 도용 절대금지!!※</p>
<p>이 글은 웨딩드레스 피팅 D-65일 앞두고<br>75KG였던 제가<br>2달 만에 -27kg를 뺀 방법을 담은<br>순수 정보성 내돈내산으로<br>직접 작성한 순수 정보성<br>후기성 글입니다.</p>
<p><strong>약 X</strong> (부작용 때문에 못함.)<br><strong>굶기 X</strong> (식욕 미친 사람이라 절대 못굶음..)<br><strong>운동 X</strong> (하라고해도 못함 게으름 만렙...)</p>
<p>75kg → 48.1kg<br>1달차에 -11.7kg,<br>2달째엔 -15.3kg<br>2달만에 총 27kg 감량...</p>
<p>샘플 본문입니다. 관리자에서 자유롭게 수정하세요.</p>',
  3987,
  157,
  '2026년 6월 28일'
);

INSERT OR IGNORE INTO comments (post_id, author, content, likes, created_at, sort_order) VALUES
(1, '한솔맘', '한 번만 먹어보자 하고 시작했는데요, 효과 보고 완전 놀랐어요 ㅠㅠ 식욕 줄어든 것도 그렇고, 붓기도 빠져서 얼굴선이 살아나요. 정말 신기해요!', 357, '1일 전', 1),
(1, '은빛쭈니', '마운자로 3개월 했는데 -7kg 밖에 안 빠지고 부작용도 있었어요. 이 글을 보고 시작했는데 2달만에 11kg이 빠졌어요!!', 203, '1일 전', 2),
(1, '메이지뽕이''s', '3달째 먹고 있는데 9.4kg감량 했습니다. 일단 밥생각이 잘 안 나는 게 신기해요.', 199, '2일 전', 3);
