async function api(path) {
  const res = await fetch(apiUrl(path));
  if (!res.ok) throw new Error('API error');
  return res.json();
}

function initial(name) {
  return (name || '유').charAt(0);
}

function boardCategoryFromQuery() {
  const c = new URLSearchParams(location.search).get('c');
  if (!c || !c.trim()) return null;
  const cat = c.trim();
  if (cat === '광고') return null; // 광고는 게시판으로 노출하지 않음
  return cat;
}

function boardDisplayName(c) {
  if (c === 'all') return '전체글';
  return c;
}

function renderNoticePosts(posts, limit) {
  const el = document.getElementById('noticeList');
  if (!el) return;
  if (!posts?.length) {
    el.innerHTML =
      '<li class="empty" style="padding:12px;color:#999;font-size:13px">등록된 공지가 없습니다.</li>';
    return;
  }
  const list = typeof limit === 'number' ? posts.slice(0, limit) : posts;
  el.innerHTML = list
    .map(
      (p) => `
    <li class="mc-notice-item">
      <a class="mc-notice-link" href="${postHref(p.slug)}">
        <span class="mc-notice-badge">공지</span>
        <span class="mc-notice-title">${escapeHtml(p.title)}</span>
        <span class="mc-notice-date">${escapeHtml(p.published_at || '')}</span>
      </a>
    </li>`
    )
    .join('');
}

function renderBoardList(posts) {
  const listEl = document.getElementById('boardList');
  listEl.className = 'mc-board-list';
  if (!posts?.length) {
    listEl.innerHTML =
      '<li class="empty" style="padding:20px;color:#999;font-size:14px">등록된 글이 없습니다.</li>';
    return;
  }
  listEl.innerHTML = posts
    .map(
      (p) => `
    <li class="mc-card-li">
      <a class="mc-post-card" href="${postHref(p.slug)}">
        <div class="mc-post-card-thumb">${coverThumbHtml(p, p.category || '')}</div>
        <div class="mc-post-card-body">
          <span class="mc-post-card-cat">${escapeHtml(p.category || '')}</span>
          <strong class="mc-post-card-title">${escapeHtml(p.title)}</strong>
          <span class="mc-post-card-meta">추천 ${Number(p.likes).toLocaleString()} · ${escapeHtml(p.published_at || '')}</span>
        </div>
      </a>
    </li>`
    )
    .join('');
}

function syncAuthUi() {
  updateJoinButton(document.getElementById('joinBtn'));
  syncDrawerAuthUi();
  const link = document.getElementById('loginLink');
  if (!link) return;
  if (getMemberInfo()) {
    link.textContent = '로그아웃';
    link.href = '#';
    link.onclick = (e) => {
      e.preventDefault();
      clearMemberSession();
      syncAuthUi();
    };
  } else {
    link.textContent = '로그인';
    link.href = '/login';
    link.onclick = null;
  }
}

function applyCafeChrome(settings) {
  const title = settings.cafe_title || settings.blog_name || '행복하서연';
  const desc = settings.cafe_desc || settings.blog_subtitle || '';
  document.getElementById('cafeTitle').textContent = title;
  document.getElementById('cafeDesc').textContent = desc;
  const mobileBrand = document.getElementById('mobileBrand');
  if (mobileBrand) mobileBrand.textContent = title;
  document.getElementById('sideName').textContent = title;
  document.getElementById('sideDesc').textContent = desc;
  applyHeroBanner(settings);

  // 홈 SEO 메타 동적 반영
  document.title = title + ' - 카페';
  const setMeta = (sel, attr, value) => {
    const el = document.querySelector(sel);
    if (el && value) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', desc || title);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', desc || title);
  setMeta('meta[property="og:site_name"]', 'content', title);

  const avatarEl = document.getElementById('sideAvatar');
  if (settings.profile_image) {
    const src =
      settings.profile_image.startsWith('http') || settings.profile_image.startsWith('data:')
        ? settings.profile_image
        : apiUrl(settings.profile_image);
    avatarEl.innerHTML = `<img src="${escapeHtml(src)}" alt="" />`;
  } else {
    avatarEl.textContent = initial(settings.profile_name || title);
  }
  return title;
}

async function initBoardMode(category) {
  const display = boardDisplayName(category);
  document.getElementById('homeView').hidden = true;
  document.getElementById('boardView').hidden = false;
  document.getElementById('boardTitle').textContent = display;
  document.title = display + ' — 행복하서연';

  await loadCafeTabs(category === 'all' ? '전체글' : category);
  syncAuthUi();
  loadPopularTags(document.getElementById('tagCloud'));

  try {
    const [{ settings }, postsRes] = await Promise.all([
      api('/api/settings'),
      category === 'all'
        ? api('/api/posts')
        : api('/api/posts?category=' + encodeURIComponent(category)),
    ]);
    applyCafeChrome(settings);
    const list = (postsRes.posts || []).filter((p) => p.category !== '광고');
    renderBoardList(list);
  } catch (e) {
    console.error(e);
    document.getElementById('boardList').innerHTML =
      '<li class="empty" style="padding:20px;color:#999">목록을 불러오지 못했습니다.</li>';
  }
}

async function initHomeMode() {
  document.getElementById('homeView').hidden = false;
  document.getElementById('boardView').hidden = true;

  await loadCafeTabs('홈');
  syncAuthUi();
  loadPopularTags(document.getElementById('tagCloud'));

  try {
    const [{ settings }, { posts }] = await Promise.all([
      api('/api/settings'),
      api('/api/posts'),
    ]);

    const title = applyCafeChrome(settings);
    document.title = title + ' - 카페';

    const list = (posts || []).filter((p) => p.category !== '광고');
    // 공지사항: 상세 본문이 있는 공지 게시글만 (구 notices 타이틀-only 목록 사용 안 함)
    renderNoticePosts(
      list.filter((p) => p.category === '공지'),
      5
    );

    // 인기글 섹션: 카테고리 '인기글'만
    const popular = list.filter((p) => p.category === '인기글').slice(0, 4);

    const popularEl = document.getElementById('popularList');
    if (!popular.length) {
      popularEl.innerHTML = '<div class="empty">등록된 인기글이 없습니다.</div>';
    } else {
      popularEl.innerHTML = popular
        .map(
          (p, i) => `
        <a class="mc-popular-item" href="${postHref(p.slug)}">
          <div class="mc-popular-thumb">${coverThumbHtml(p, '인기글 ' + (i + 1))}</div>
          <div class="mc-popular-title">${escapeHtml(p.title)}</div>
          <div class="mc-popular-meta">인기글 · 추천 ${Number(p.likes).toLocaleString()}</div>
        </a>`
        )
        .join('');
    }

    const latest = list.filter((p) => p.category !== '공지');
    const latestEl = document.getElementById('latestList');
    if (!latest.length && !list.length) {
      latestEl.innerHTML = '<li class="empty">등록된 글이 없습니다.</li>';
    } else {
      const show = latest.length ? latest : list;
      latestEl.innerHTML = show
        .map(
          (p) => `
        <li class="mc-card-li">
          <a class="mc-post-card mc-post-card-row" href="${postHref(p.slug)}">
            <div class="mc-post-card-thumb">${coverThumbHtml(p, p.category || '후기')}</div>
            <div class="mc-post-card-body">
              <span class="mc-post-card-cat">${escapeHtml(p.category || '후기')}</span>
              <strong class="mc-post-card-title">${escapeHtml(p.title)}</strong>
              <span class="mc-post-card-meta">추천 ${Number(p.likes).toLocaleString()} · ${escapeHtml(p.published_at || '')}</span>
            </div>
          </a>
        </li>`
        )
        .join('');
    }
  } catch (e) {
    console.error(e);
    document.getElementById('popularList').innerHTML =
      '<div class="empty">데이터를 불러오지 못했습니다.</div>';
  }
}

(async function init() {
  const category = boardCategoryFromQuery();
  if (category) await initBoardMode(category);
  else await initHomeMode();

  // 메인 홈만 홈 방문 집계 (게시판 필터 페이지 제외)
  if (!category && typeof trackPageView === 'function') {
    trackPageView({ page: 'home' });
  }
})();
