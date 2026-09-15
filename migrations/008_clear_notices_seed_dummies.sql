-- 008: 구 공지(타이틀 only) 삭제 + 게시판 더미 시드
-- 이미지 파일을 /images/dummy/01.jpg ~ 18.jpg 로 배치한 뒤 실행하세요.
-- Cloudflare D1: wrangler d1 execute <DB> --file=migrations/008_clear_notices_seed_dummies.sql

DELETE FROM notices;

-- 동일 slug 재실행 대비
DELETE FROM comments WHERE post_id IN (SELECT id FROM posts WHERE slug IN ('popular-mealprep-week', 'popular-walk-diet', 'popular-sugar-detox', 'popular-office-lunch', 'free-midnight-snack', 'free-scale-anxiety', 'free-weekend-binge', 'free-water-habit', 'review-protein-shake', 'review-meal-replacement', 'review-yoga-mat', 'review-sugarfree-syrup', 'review-resistance-band', 'notice-cafe-rules', 'notice-welcome', 'notice-howto', 'notice-event-walk', 'notice-image-guide'));
DELETE FROM posts WHERE slug IN ('popular-mealprep-week', 'popular-walk-diet', 'popular-sugar-detox', 'popular-office-lunch', 'free-midnight-snack', 'free-scale-anxiety', 'free-weekend-binge', 'free-water-habit', 'review-protein-shake', 'review-meal-replacement', 'review-yoga-mat', 'review-sugarfree-syrup', 'review-resistance-band', 'notice-cafe-rules', 'notice-welcome', 'notice-howto', 'notice-event-walk', 'notice-image-guide');

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('popular-mealprep-week', '일주일 밀프렙으로 야식 끊은 현실 루틴 (장보기~보관까지)', '<p>※ 개인 경험 기록입니다. 무리한 절식은 권하지 않아요.</p>
<p>안녕하세요, 하서연이에요. 오늘은 제가 <strong>야식을 끊기 위해</strong> 가장 효과 봤던 <strong>일주일 밀프렙</strong>을 길게 남겨둘게요.</p>
<p><img src="/images/dummy/01.jpg" alt="밀프렙 전체" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>1. 왜 밀프렙인가</h2>
<p>배고파서가 아니라 “냉장고를 열면 뭔가 있어야 한다”는 습관이 문제였어요. 미리 만들어 두면 선택지가 건강한 쪽으로 바뀝니다.</p>
<p><img src="/images/dummy/02.jpg" alt="재료 손질" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>2. 장보기 리스트</h2>
<ul>
<li>닭가슴살·계란·두부</li>
<li>현미밥·고구마</li>
<li>브로콜리·파프리카·오이</li>
<li>그릭요거트·베리</li>
</ul>
<p><img src="/images/dummy/05.jpg" alt="단백질 박스" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>3. 일요일 2시간 루틴</h2>
<p>씻고 → 찌고 → 구워 → 통에 나누기. 거창한 레시피보다 <em>반복 가능한 구성</em>이 중요해요.</p>
<p><img src="/images/dummy/06.jpg" alt="보관 용기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>4. 평일 저녁 예시</h2>
<p>현미 반공기 + 단백질 + 채소. 소스는 저염 간장·레몬·요거트 드레싱만 돌려 씁니다.</p>
<p><img src="/images/dummy/03.jpg" alt="식단 한 상" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>5. 한 달 후 체감</h2>
<p>체중보다 먼저 바뀐 건 <strong>밤 11시 허기</strong>였어요. 미리 채우니 충동이 줄었습니다.</p>
<p><img src="/images/dummy/04.jpg" alt="걷기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>다음엔 직장인용 도시락 버전으로 이어서 쓸게요.</p>', '인기글', '/images/dummy/01.jpg', 1920, 0, '2026년 7월 18일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('popular-walk-diet', '헬스장 없이 -4.2kg, 매일 8천보 걷기 다이어트 일기', '<p>운동 초보였던 제가 고른 방법은 단순했습니다. <strong>매일 걷기</strong>.</p>
<p><img src="/images/dummy/04.jpg" alt="아침 산책" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>시작 전 상태</h2>
<p>앉아 있는 시간이 길고, 저녁에 배달이 잦았어요. 목표는 “완벽”이 아니라 “끊기지 않는 것”.</p>
<p><img src="/images/dummy/03.jpg" alt="체중계" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>루틴</h2>
<ul>
<li>출근 전 20분 또는 퇴근 후 30분</li>
<li>주말엔 공원 한 바퀴 길게</li>
<li>물 500ml 이상 챙기기</li>
</ul>
<p><img src="/images/dummy/08.jpg" alt="물병과 운동화" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="가벼운 식사" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>식단은 과하지 않게</h2>
<p>야식만 줄이고 밥 양을 20% 줄였어요. 걷기가 붙으니 과식 죄책감이 줄더라고요.</p>
<p><img src="/images/dummy/01.jpg" alt="건강한 한 끼" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="저녁 샐러드" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>4주 차 -4.2kg. 드라마는 아니지만, <strong>지속 가능한 변화</strong>라 만족합니다.</p>', '인기글', '/images/dummy/04.jpg', 2455, 0, '2026년 7월 10일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('popular-sugar-detox', '단 거 끊기 21일 챌린지… 식욕이 진짜 조용해질까?', '<p>디저트·탄산·시럽 커피를 21일간 끊어본 기록입니다.</p>
<p><img src="/images/dummy/10.jpg" alt="과일 디저트 대체" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>왜 했나</h2>
<p>오후만 되면 혈당 롤러코스터처럼 졸리고 예민했어요. “의지”보다 <strong>환경</strong>을 바꾸기로 했습니다.</p>
<p><img src="/images/dummy/11.jpg" alt="블랙커피" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="대체 간식" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>대체 리스트</h2>
<ul>
<li>무가당 요거트 + 베리</li>
<li>아메리카노</li>
<li>바나나 반 개 + 견과</li>
</ul>
<p><img src="/images/dummy/05.jpg" alt="요거트볼" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/06.jpg" alt="견과" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="정식 식사" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>2주차부터 단맛 갈망이 확실히 줄었습니다. 체중은 -2.1kg 정도.</p>', '인기글', '/images/dummy/10.jpg', 1688, 0, '2026년 7월 2일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('popular-office-lunch', '회사 구내식당만 먹어도 살찐다? 직장인 점심 다이어트 전략', '<p>구내식당이 “범인”이 아니라 <strong>구성</strong>이 문제일 때가 많아요.</p>
<p><img src="/images/dummy/07.jpg" alt="직장 도시락" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="균형 접시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>접시 비율</h2>
<p>채소 먼저 → 단백질 → 밥은 반. 국은 건더기 위주로.</p>
<p><img src="/images/dummy/02.jpg" alt="샐러드" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/05.jpg" alt="닭가슴살" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="간단 저녁" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="점심 후 걷기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>점심 후 10분만 걸어도 오후의 졸음이 달라집니다.</p>', '인기글', '/images/dummy/07.jpg', 1312, 0, '2026년 6월 28일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('free-midnight-snack', '밤 12시 배고픔… 여러분도 이러세요? (해결 팁 공유)', '<p>자유글이에요. 밤에 유독 허기가 심해지는 분들 있나요?</p>
<p><img src="/images/dummy/09.jpg" alt="야식 유혹" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/10.jpg" alt="대체 간식" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>저는 저녁을 너무 가볍게 먹었을 때 더 심해지더라고요. 단백질을 조금 늘리니 덜했어요.</p>
<p><img src="/images/dummy/05.jpg" alt="단백질 간식" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/11.jpg" alt="허브티" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/06.jpg" alt="냉장고 정리" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="미리 준비한 샐러드" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>여러분 팁도 댓글로 남겨주세요!</p>', '자유게시판', '/images/dummy/09.jpg', 420, 0, '2026년 7월 17일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('free-scale-anxiety', '체중계 숫자 때문에 하루 기분 망가질 때', '<p>다이어트하다 보면 저울에 감정이 묶일 때가 있어요.</p>
<p><img src="/images/dummy/03.jpg" alt="체중계" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="산책으로 환기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>저는 주 1회만 재기로 바꿨습니다. 옷·부종·수면에 따라 매일 달라지니까요.</p>
<p><img src="/images/dummy/08.jpg" alt="물과 휴식" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="제대로 된 한 끼" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="영양 챙기기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="가벼운 저녁" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>기록이 목적이 아니라, <strong>나를 돌보는 도구</strong>가 되길 바라요.</p>', '자유게시판', '/images/dummy/03.jpg', 388, 0, '2026년 7월 14일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('free-weekend-binge', '주말만 되면 폭식… 월요일이 두려운 사람 손', '<p>평일엔 잘 지키다가 주말에 무너지는 패턴 공유합니다.</p>
<p><img src="/images/dummy/12.jpg" alt="주말 브런치" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/10.jpg" alt="디저트" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>완벽한 주말보다 “조금 느슨하되 완전히 놓치지 않기”로 목표를 바꿨어요.</p>
<p><img src="/images/dummy/01.jpg" alt="브런치도 균형" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="채소 추가" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="주말 걷기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/07.jpg" alt="미리 싼 도시락" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>같은 고민 있으면 같이 응원해요.</p>', '자유게시판', '/images/dummy/12.jpg', 512, 0, '2026년 7월 8일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('free-water-habit', '물 2리터 챌린지 해봤더니 피부가 먼저 반응함', '<p>물 마시기가 다이어트 기본인데 제일 어렵더라고요.</p>
<p><img src="/images/dummy/08.jpg" alt="물병" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/11.jpg" alt="티로 대체" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/03.jpg" alt="컨디션" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="활동량" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="식사와 함께" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="하루 루틴" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>알람보다 예쁜 보틀이 더 효과 있었습니다 ㅎㅎ</p>', '자유게시판', '/images/dummy/08.jpg', 276, 0, '2026년 7월 5일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('review-protein-shake', '단백질 쉐이크 3종 비교 후기… 속이 편한 건 이거였음', '<p>※ 협찬 아님, 직접 구매 후기입니다.</p>
<p><img src="/images/dummy/13.jpg" alt="단백질 쉐이크 제품" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>왜 쉐이크를 쓰나</h2>
<p>점심이 늦어질 때 폭식을 막는 “보험”으로 씁니다.</p>
<p><img src="/images/dummy/14.jpg" alt="제품 구성" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/15.jpg" alt="가루 텍스처" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>비교 포인트</h2>
<ul>
<li>용해력</li>
<li>단맛·인공감미료 여부</li>
<li>포만감 지속</li>
</ul>
<p><img src="/images/dummy/16.jpg" alt="셰이커에 탄 모습" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/05.jpg" alt="요거트와 함께" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="식단 조합" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>저는 B제품이 속이 가장 편했어요. 단맛은 A가 강했고, C는 덩김이 있었어요.</p>', '후기', '/images/dummy/13.jpg', 890, 0, '2026년 7월 16일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('review-meal-replacement', '도시락형 식단조절 도시락 2주 먹어본 솔직 후기', '<p>배달 도시락 다이어트, 광고와 현실 사이.</p>
<p><img src="/images/dummy/07.jpg" alt="도시락 제품" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="열어본 구성" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/05.jpg" alt="단백질 비중" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="채소량" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="저녁 대체" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/03.jpg" alt="2주 후 컨디션" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>짜지 않은 편이지만 나트륨은 체크 필요. 맛은 3일쯤 질릴 수 있어 소스 조절 추천.</p>', '후기', '/images/dummy/07.jpg', 734, 0, '2026년 7월 11일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('review-yoga-mat', '홈트용 요가매트 구매 후기 (두께·미끄럼 실제 체감)', '<p>집에서 스트레칭·가벼운 홈트용으로 산 매트 후기.</p>
<p><img src="/images/dummy/17.jpg" alt="요가매트 제품" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/18.jpg" alt="두께 비교" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="사용 장면" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/08.jpg" alt="보관" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/03.jpg" alt="운동 후" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/11.jpg" alt="루틴 메모" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>두꺼운 게 무릎엔 좋지만 밸런스 동작은 조금 흔들릴 수 있어요.</p>', '후기', '/images/dummy/17.jpg', 456, 0, '2026년 7월 6일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('review-sugarfree-syrup', '제로슈거 시럽 커피에 넣어본 후기… 단맛 중독 탈출용?', '<p>달달한 라떼를 끊고 싶어 산 제로 시럽 후기.</p>
<p><img src="/images/dummy/11.jpg" alt="제로시럽과 커피" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/13.jpg" alt="제품 라벨" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/14.jpg" alt="용량" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/16.jpg" alt="섞은 커피" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/10.jpg" alt="디저트 대체" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="간식 줄이기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>초반엔 인공감미료 뒷맛이 느껴졌고, 며칠 되니 적응됐어요. 과량보다는 “조금”이 핵심.</p>', '후기', '/images/dummy/11.jpg', 612, 0, '2026년 6월 30일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('review-resistance-band', '탄력밴드 세트 홈트 후기… 어깨·힙 자극 실제로?', '<p>헬스장 대신 집에서 쓰는 밴드 세트 후기입니다.</p>
<p><img src="/images/dummy/18.jpg" alt="밴드 세트" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/17.jpg" alt="패키지" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="운동" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/08.jpg" alt="물과 함께" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/03.jpg" alt="스트레칭" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="운동 후 식사" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>강도별 3단계가 있어서 초보에게 괜찮았어요. 관절 통증 있으면 천천히.</p>', '후기', '/images/dummy/18.jpg', 398, 0, '2026년 6월 25일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('notice-cafe-rules', '카페 이용 규칙 안내 (필독)', '<p>행복하서연을 이용해 주셔서 감사합니다.</p>
<p><img src="/images/dummy/01.jpg" alt="카페 소개" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>기본 규칙</h2>
<ul>
<li>비방·혐오·스팸 글은 삭제될 수 있습니다</li>
<li>의료·약 관련 내용은 개인 경험이며 전문의 상담을 대체하지 않습니다</li>
<li>타인의 후기 무단 도용을 금지합니다</li>
</ul>
<p><img src="/images/dummy/08.jpg" alt="건강한 소통" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="식단 공유 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="운동 공유 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/05.jpg" alt="후기 작성 팁" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/11.jpg" alt="문의" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>문의는 관리자 또는 마이페이지를 이용해 주세요.</p>', '공지', '/images/dummy/01.jpg', 12, 0, '2026년 7월 1일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('notice-welcome', '신규 회원 환영합니다 — 첫 글 작성 가이드', '<p>새로 오신 분들 환영해요!</p>
<p><img src="/images/dummy/02.jpg" alt="환영" style="max-width:100%;height:auto;border-radius:8px" /></p>
<h2>첫 글 추천 주제</h2>
<ul>
<li>나의 시작 몸무게/목표 (선택)</li>
<li>오늘 식단 한 끼</li>
<li>걷기/운동 인증</li>
</ul>
<p><img src="/images/dummy/01.jpg" alt="식단 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="걷기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/05.jpg" alt="간식" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/07.jpg" alt="도시락" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="저녁" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>완벽한 글보다 <strong>꾸준한 기록</strong>이 더 힘이 됩니다.</p>', '공지', '/images/dummy/02.jpg', 8, 0, '2026년 6월 20일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('notice-howto', '일기장 이용 안내 — 게시판별 쓰는 법', '<p>게시판을 어떻게 나누는지 안내드립니다.</p>
<p><img src="/images/dummy/06.jpg" alt="가이드" style="max-width:100%;height:auto;border-radius:8px" /></p>
<ul>
<li><strong>인기글</strong> — 길게 정리한 노하우</li>
<li><strong>자유게시판</strong> — 질문·수다·인증</li>
<li><strong>후기</strong> — 제품·식단·앱 실사용 후기</li>
<li><strong>공지</strong> — 운영 안내</li>
</ul>
<p><img src="/images/dummy/01.jpg" alt="인기글 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/09.jpg" alt="자유글 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/13.jpg" alt="후기 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/17.jpg" alt="제품 후기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/04.jpg" alt="인증" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>대표 이미지는 1200×750 권장입니다.</p>', '공지', '/images/dummy/06.jpg', 15, 0, '2026년 6월 15일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('notice-event-walk', '7월 걷기 챌린지 안내 (인증 이벤트)', '<p>7월 한 달간 <strong>하루 7천보</strong> 걷기 챌린지를 진행합니다.</p>
<p><img src="/images/dummy/04.jpg" alt="걷기 챌린지" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/08.jpg" alt="물 챙기기" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/03.jpg" alt="기록" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/17.jpg" alt="홈트 병행" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/02.jpg" alt="식단" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="인증 예시" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>자유게시판에 “걷기인증” 제목으로 올려 주세요. 참여만으로도 충분히 의미 있습니다.</p>', '공지', '/images/dummy/04.jpg', 44, 0, '2026년 7월 3일', datetime('now'));

INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('notice-image-guide', '이미지 업로드 안내 (대표 이미지 권장 사이즈)', '<p>게시글·대표 이미지 등록 시 아래를 참고해 주세요.</p>
<p><img src="/images/dummy/14.jpg" alt="이미지 가이드" style="max-width:100%;height:auto;border-radius:8px" /></p>
<ul>
<li>대표 이미지 권장: <strong>1200 × 750px</strong> (16:10)</li>
<li>최소 800 × 500px 이상</li>
<li>본문 이미지는 R2 업로드 사용 (base64 금지)</li>
</ul>
<p><img src="/images/dummy/15.jpg" alt="예시1" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/16.jpg" alt="예시2" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/13.jpg" alt="제품샷" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/01.jpg" alt="식단샷" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p><img src="/images/dummy/07.jpg" alt="목록 썸네일" style="max-width:100%;height:auto;border-radius:8px" /></p>
<p>세로·정사각은 목록에서 잘릴 수 있어요.</p>', '공지', '/images/dummy/14.jpg', 21, 0, '2026년 7월 15일', datetime('now'));

-- 확인
SELECT category, COUNT(*) AS cnt FROM posts WHERE slug LIKE 'popular-%' OR slug LIKE 'free-%' OR slug LIKE 'review-%' OR slug LIKE 'notice-%' GROUP BY category;