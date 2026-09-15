/**
 * 더미 게시글 SQL 생성기
 * 실행: node scripts/gen-dummy-seed.mjs
 * 이미지: /images/dummy/01.jpg ~ 18.jpg (생성 후 직접 배치)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '../migrations/008_clear_notices_seed_dummies.sql');

function img(n, alt = '') {
  const id = String(n).padStart(2, '0');
  return `<p><img src="/images/dummy/${id}.jpg" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px" /></p>`;
}

function esc(s) {
  return String(s).replace(/'/g, "''");
}

function post({ slug, title, category, cover, likes, date, body }) {
  return `INSERT OR REPLACE INTO posts (slug, title, body, category, cover_image, likes, comment_count_display, published_at, updated_at)
VALUES ('${esc(slug)}', '${esc(title)}', '${esc(body)}', '${esc(category)}', '${esc(cover)}', ${likes}, 0, '${esc(date)}', datetime('now'));`;
}

const posts = [];

// ——— 인기글 4 ———
posts.push({
  slug: 'popular-mealprep-week',
  title: '일주일 밀프렙으로 야식 끊은 현실 루틴 (장보기~보관까지)',
  category: '인기글',
  cover: '/images/dummy/01.jpg',
  likes: 1920,
  date: '2026년 7월 18일',
  body: `<p>※ 개인 경험 기록입니다. 무리한 절식은 권하지 않아요.</p>
<p>안녕하세요, 하서연이에요. 오늘은 제가 <strong>야식을 끊기 위해</strong> 가장 효과 봤던 <strong>일주일 밀프렙</strong>을 길게 남겨둘게요.</p>
${img(1, '밀프렙 전체')}
<h2>1. 왜 밀프렙인가</h2>
<p>배고파서가 아니라 “냉장고를 열면 뭔가 있어야 한다”는 습관이 문제였어요. 미리 만들어 두면 선택지가 건강한 쪽으로 바뀝니다.</p>
${img(2, '재료 손질')}
<h2>2. 장보기 리스트</h2>
<ul>
<li>닭가슴살·계란·두부</li>
<li>현미밥·고구마</li>
<li>브로콜리·파프리카·오이</li>
<li>그릭요거트·베리</li>
</ul>
${img(5, '단백질 박스')}
<h2>3. 일요일 2시간 루틴</h2>
<p>씻고 → 찌고 → 구워 → 통에 나누기. 거창한 레시피보다 <em>반복 가능한 구성</em>이 중요해요.</p>
${img(6, '보관 용기')}
<h2>4. 평일 저녁 예시</h2>
<p>현미 반공기 + 단백질 + 채소. 소스는 저염 간장·레몬·요거트 드레싱만 돌려 씁니다.</p>
${img(3, '식단 한 상')}
<h2>5. 한 달 후 체감</h2>
<p>체중보다 먼저 바뀐 건 <strong>밤 11시 허기</strong>였어요. 미리 채우니 충동이 줄었습니다.</p>
${img(4, '걷기')}
<p>다음엔 직장인용 도시락 버전으로 이어서 쓸게요.</p>`,
});

posts.push({
  slug: 'popular-walk-diet',
  title: '헬스장 없이 -4.2kg, 매일 8천보 걷기 다이어트 일기',
  category: '인기글',
  cover: '/images/dummy/04.jpg',
  likes: 2455,
  date: '2026년 7월 10일',
  body: `<p>운동 초보였던 제가 고른 방법은 단순했습니다. <strong>매일 걷기</strong>.</p>
${img(4, '아침 산책')}
<h2>시작 전 상태</h2>
<p>앉아 있는 시간이 길고, 저녁에 배달이 잦았어요. 목표는 “완벽”이 아니라 “끊기지 않는 것”.</p>
${img(3, '체중계')}
<h2>루틴</h2>
<ul>
<li>출근 전 20분 또는 퇴근 후 30분</li>
<li>주말엔 공원 한 바퀴 길게</li>
<li>물 500ml 이상 챙기기</li>
</ul>
${img(8, '물병과 운동화')}
${img(2, '가벼운 식사')}
<h2>식단은 과하지 않게</h2>
<p>야식만 줄이고 밥 양을 20% 줄였어요. 걷기가 붙으니 과식 죄책감이 줄더라고요.</p>
${img(1, '건강한 한 끼')}
${img(9, '저녁 샐러드')}
<p>4주 차 -4.2kg. 드라마는 아니지만, <strong>지속 가능한 변화</strong>라 만족합니다.</p>`,
});

posts.push({
  slug: 'popular-sugar-detox',
  title: '단 거 끊기 21일 챌린지… 식욕이 진짜 조용해질까?',
  category: '인기글',
  cover: '/images/dummy/10.jpg',
  likes: 1688,
  date: '2026년 7월 2일',
  body: `<p>디저트·탄산·시럽 커피를 21일간 끊어본 기록입니다.</p>
${img(10, '과일 디저트 대체')}
<h2>왜 했나</h2>
<p>오후만 되면 혈당 롤러코스터처럼 졸리고 예민했어요. “의지”보다 <strong>환경</strong>을 바꾸기로 했습니다.</p>
${img(11, '블랙커피')}
${img(2, '대체 간식')}
<h2>대체 리스트</h2>
<ul>
<li>무가당 요거트 + 베리</li>
<li>아메리카노</li>
<li>바나나 반 개 + 견과</li>
</ul>
${img(5, '요거트볼')}
${img(6, '견과')}
${img(1, '정식 식사')}
<p>2주차부터 단맛 갈망이 확실히 줄었습니다. 체중은 -2.1kg 정도.</p>`,
});

posts.push({
  slug: 'popular-office-lunch',
  title: '회사 구내식당만 먹어도 살찐다? 직장인 점심 다이어트 전략',
  category: '인기글',
  cover: '/images/dummy/07.jpg',
  likes: 1312,
  date: '2026년 6월 28일',
  body: `<p>구내식당이 “범인”이 아니라 <strong>구성</strong>이 문제일 때가 많아요.</p>
${img(7, '직장 도시락')}
${img(1, '균형 접시')}
<h2>접시 비율</h2>
<p>채소 먼저 → 단백질 → 밥은 반. 국은 건더기 위주로.</p>
${img(2, '샐러드')}
${img(5, '닭가슴살')}
${img(9, '간단 저녁')}
${img(4, '점심 후 걷기')}
<p>점심 후 10분만 걸어도 오후의 졸음이 달라집니다.</p>`,
});

// ——— 자유게시판 4 ———
posts.push({
  slug: 'free-midnight-snack',
  title: '밤 12시 배고픔… 여러분도 이러세요? (해결 팁 공유)',
  category: '자유게시판',
  cover: '/images/dummy/09.jpg',
  likes: 420,
  date: '2026년 7월 17일',
  body: `<p>자유글이에요. 밤에 유독 허기가 심해지는 분들 있나요?</p>
${img(9, '야식 유혹')}
${img(10, '대체 간식')}
<p>저는 저녁을 너무 가볍게 먹었을 때 더 심해지더라고요. 단백질을 조금 늘리니 덜했어요.</p>
${img(5, '단백질 간식')}
${img(11, '허브티')}
${img(6, '냉장고 정리')}
${img(2, '미리 준비한 샐러드')}
<p>여러분 팁도 댓글로 남겨주세요!</p>`,
});

posts.push({
  slug: 'free-scale-anxiety',
  title: '체중계 숫자 때문에 하루 기분 망가질 때',
  category: '자유게시판',
  cover: '/images/dummy/03.jpg',
  likes: 388,
  date: '2026년 7월 14일',
  body: `<p>다이어트하다 보면 저울에 감정이 묶일 때가 있어요.</p>
${img(3, '체중계')}
${img(4, '산책으로 환기')}
<p>저는 주 1회만 재기로 바꿨습니다. 옷·부종·수면에 따라 매일 달라지니까요.</p>
${img(8, '물과 휴식')}
${img(1, '제대로 된 한 끼')}
${img(2, '영양 챙기기')}
${img(9, '가벼운 저녁')}
<p>기록이 목적이 아니라, <strong>나를 돌보는 도구</strong>가 되길 바라요.</p>`,
});

posts.push({
  slug: 'free-weekend-binge',
  title: '주말만 되면 폭식… 월요일이 두려운 사람 손',
  category: '자유게시판',
  cover: '/images/dummy/12.jpg',
  likes: 512,
  date: '2026년 7월 8일',
  body: `<p>평일엔 잘 지키다가 주말에 무너지는 패턴 공유합니다.</p>
${img(12, '주말 브런치')}
${img(10, '디저트')}
<p>완벽한 주말보다 “조금 느슨하되 완전히 놓치지 않기”로 목표를 바꿨어요.</p>
${img(1, '브런치도 균형')}
${img(2, '채소 추가')}
${img(4, '주말 걷기')}
${img(7, '미리 싼 도시락')}
<p>같은 고민 있으면 같이 응원해요.</p>`,
});

posts.push({
  slug: 'free-water-habit',
  title: '물 2리터 챌린지 해봤더니 피부가 먼저 반응함',
  category: '자유게시판',
  cover: '/images/dummy/08.jpg',
  likes: 276,
  date: '2026년 7월 5일',
  body: `<p>물 마시기가 다이어트 기본인데 제일 어렵더라고요.</p>
${img(8, '물병')}
${img(11, '티로 대체')}
${img(3, '컨디션')}
${img(4, '활동량')}
${img(2, '식사와 함께')}
${img(1, '하루 루틴')}
<p>알람보다 예쁜 보틀이 더 효과 있었습니다 ㅎㅎ</p>`,
});

// ——— 후기 5 (제품) ———
posts.push({
  slug: 'review-protein-shake',
  title: '단백질 쉐이크 3종 비교 후기… 속이 편한 건 이거였음',
  category: '후기',
  cover: '/images/dummy/13.jpg',
  likes: 890,
  date: '2026년 7월 16일',
  body: `<p>※ 협찬 아님, 직접 구매 후기입니다.</p>
${img(13, '단백질 쉐이크 제품')}
<h2>왜 쉐이크를 쓰나</h2>
<p>점심이 늦어질 때 폭식을 막는 “보험”으로 씁니다.</p>
${img(14, '제품 구성')}
${img(15, '가루 텍스처')}
<h2>비교 포인트</h2>
<ul>
<li>용해력</li>
<li>단맛·인공감미료 여부</li>
<li>포만감 지속</li>
</ul>
${img(16, '셰이커에 탄 모습')}
${img(5, '요거트와 함께')}
${img(2, '식단 조합')}
<p>저는 B제품이 속이 가장 편했어요. 단맛은 A가 강했고, C는 덩김이 있었어요.</p>`,
});

posts.push({
  slug: 'review-meal-replacement',
  title: '도시락형 식단조절 도시락 2주 먹어본 솔직 후기',
  category: '후기',
  cover: '/images/dummy/07.jpg',
  likes: 734,
  date: '2026년 7월 11일',
  body: `<p>배달 도시락 다이어트, 광고와 현실 사이.</p>
${img(7, '도시락 제품')}
${img(1, '열어본 구성')}
${img(5, '단백질 비중')}
${img(2, '채소량')}
${img(9, '저녁 대체')}
${img(3, '2주 후 컨디션')}
<p>짜지 않은 편이지만 나트륨은 체크 필요. 맛은 3일쯤 질릴 수 있어 소스 조절 추천.</p>`,
});

posts.push({
  slug: 'review-yoga-mat',
  title: '홈트용 요가매트 구매 후기 (두께·미끄럼 실제 체감)',
  category: '후기',
  cover: '/images/dummy/17.jpg',
  likes: 456,
  date: '2026년 7월 6일',
  body: `<p>집에서 스트레칭·가벼운 홈트용으로 산 매트 후기.</p>
${img(17, '요가매트 제품')}
${img(18, '두께 비교')}
${img(4, '사용 장면')}
${img(8, '보관')}
${img(3, '운동 후')}
${img(11, '루틴 메모')}
<p>두꺼운 게 무릎엔 좋지만 밸런스 동작은 조금 흔들릴 수 있어요.</p>`,
});

posts.push({
  slug: 'review-sugarfree-syrup',
  title: '제로슈거 시럽 커피에 넣어본 후기… 단맛 중독 탈출용?',
  category: '후기',
  cover: '/images/dummy/11.jpg',
  likes: 612,
  date: '2026년 6월 30일',
  body: `<p>달달한 라떼를 끊고 싶어 산 제로 시럽 후기.</p>
${img(11, '제로시럽과 커피')}
${img(13, '제품 라벨')}
${img(14, '용량')}
${img(16, '섞은 커피')}
${img(10, '디저트 대체')}
${img(2, '간식 줄이기')}
<p>초반엔 인공감미료 뒷맛이 느껴졌고, 며칠 되니 적응됐어요. 과량보다는 “조금”이 핵심.</p>`,
});

posts.push({
  slug: 'review-resistance-band',
  title: '탄력밴드 세트 홈트 후기… 어깨·힙 자극 실제로?',
  category: '후기',
  cover: '/images/dummy/18.jpg',
  likes: 398,
  date: '2026년 6월 25일',
  body: `<p>헬스장 대신 집에서 쓰는 밴드 세트 후기입니다.</p>
${img(18, '밴드 세트')}
${img(17, '패키지')}
${img(4, '운동')}
${img(8, '물과 함께')}
${img(3, '스트레칭')}
${img(1, '운동 후 식사')}
<p>강도별 3단계가 있어서 초보에게 괜찮았어요. 관절 통증 있으면 천천히.</p>`,
});

// ——— 공지 5 (상세 본문 포함) ———
posts.push({
  slug: 'notice-cafe-rules',
  title: '카페 이용 규칙 안내 (필독)',
  category: '공지',
  cover: '/images/dummy/01.jpg',
  likes: 12,
  date: '2026년 7월 1일',
  body: `<p>행복하서연을 이용해 주셔서 감사합니다.</p>
${img(1, '카페 소개')}
<h2>기본 규칙</h2>
<ul>
<li>비방·혐오·스팸 글은 삭제될 수 있습니다</li>
<li>의료·약 관련 내용은 개인 경험이며 전문의 상담을 대체하지 않습니다</li>
<li>타인의 후기 무단 도용을 금지합니다</li>
</ul>
${img(8, '건강한 소통')}
${img(2, '식단 공유 예시')}
${img(4, '운동 공유 예시')}
${img(5, '후기 작성 팁')}
${img(11, '문의')}
<p>문의는 관리자 또는 마이페이지를 이용해 주세요.</p>`,
});

posts.push({
  slug: 'notice-welcome',
  title: '신규 회원 환영합니다 — 첫 글 작성 가이드',
  category: '공지',
  cover: '/images/dummy/02.jpg',
  likes: 8,
  date: '2026년 6월 20일',
  body: `<p>새로 오신 분들 환영해요!</p>
${img(2, '환영')}
<h2>첫 글 추천 주제</h2>
<ul>
<li>나의 시작 몸무게/목표 (선택)</li>
<li>오늘 식단 한 끼</li>
<li>걷기/운동 인증</li>
</ul>
${img(1, '식단 예시')}
${img(4, '걷기')}
${img(5, '간식')}
${img(7, '도시락')}
${img(9, '저녁')}
<p>완벽한 글보다 <strong>꾸준한 기록</strong>이 더 힘이 됩니다.</p>`,
});

posts.push({
  slug: 'notice-howto',
  title: '일기장 이용 안내 — 게시판별 쓰는 법',
  category: '공지',
  cover: '/images/dummy/06.jpg',
  likes: 15,
  date: '2026년 6월 15일',
  body: `<p>게시판을 어떻게 나누는지 안내드립니다.</p>
${img(6, '가이드')}
<ul>
<li><strong>인기글</strong> — 길게 정리한 노하우</li>
<li><strong>자유게시판</strong> — 질문·수다·인증</li>
<li><strong>후기</strong> — 제품·식단·앱 실사용 후기</li>
<li><strong>공지</strong> — 운영 안내</li>
</ul>
${img(1, '인기글 예시')}
${img(9, '자유글 예시')}
${img(13, '후기 예시')}
${img(17, '제품 후기')}
${img(4, '인증')}
<p>대표 이미지는 1200×750 권장입니다.</p>`,
});

posts.push({
  slug: 'notice-event-walk',
  title: '7월 걷기 챌린지 안내 (인증 이벤트)',
  category: '공지',
  cover: '/images/dummy/04.jpg',
  likes: 44,
  date: '2026년 7월 3일',
  body: `<p>7월 한 달간 <strong>하루 7천보</strong> 걷기 챌린지를 진행합니다.</p>
${img(4, '걷기 챌린지')}
${img(8, '물 챙기기')}
${img(3, '기록')}
${img(17, '홈트 병행')}
${img(2, '식단')}
${img(1, '인증 예시')}
<p>자유게시판에 “걷기인증” 제목으로 올려 주세요. 참여만으로도 충분히 의미 있습니다.</p>`,
});

posts.push({
  slug: 'notice-image-guide',
  title: '이미지 업로드 안내 (대표 이미지 권장 사이즈)',
  category: '공지',
  cover: '/images/dummy/14.jpg',
  likes: 21,
  date: '2026년 7월 15일',
  body: `<p>게시글·대표 이미지 등록 시 아래를 참고해 주세요.</p>
${img(14, '이미지 가이드')}
<ul>
<li>대표 이미지 권장: <strong>1200 × 750px</strong> (16:10)</li>
<li>최소 800 × 500px 이상</li>
<li>본문 이미지는 R2 업로드 사용 (base64 금지)</li>
</ul>
${img(15, '예시1')}
${img(16, '예시2')}
${img(13, '제품샷')}
${img(1, '식단샷')}
${img(7, '목록 썸네일')}
<p>세로·정사각은 목록에서 잘릴 수 있어요.</p>`,
});

const lines = [];
lines.push('-- 008: 구 공지(타이틀 only) 삭제 + 게시판 더미 시드');
lines.push('-- 이미지 파일을 /images/dummy/01.jpg ~ 18.jpg 로 배치한 뒤 실행하세요.');
lines.push('-- Cloudflare D1: wrangler d1 execute <DB> --file=migrations/008_clear_notices_seed_dummies.sql');
lines.push('');
lines.push('DELETE FROM notices;');
lines.push('');
lines.push("-- 동일 slug 재실행 대비");
const slugs = posts.map((p) => `'${p.slug}'`).join(', ');
lines.push(`DELETE FROM comments WHERE post_id IN (SELECT id FROM posts WHERE slug IN (${slugs}));`);
lines.push(`DELETE FROM posts WHERE slug IN (${slugs});`);
lines.push('');

for (const p of posts) {
  lines.push(post(p));
  lines.push('');
}

lines.push('-- 확인');
lines.push("SELECT category, COUNT(*) AS cnt FROM posts WHERE slug LIKE 'popular-%' OR slug LIKE 'free-%' OR slug LIKE 'review-%' OR slug LIKE 'notice-%' GROUP BY category;");

fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log('Wrote', out, 'posts:', posts.length);
