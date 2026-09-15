function initial(name) {
  return (name || '유').charAt(0);
}

function categoryFromQuery() {
  const c = new URLSearchParams(location.search).get('c') || 'all';
  return c;
}

function boardDisplayName(c) {
  if (c === 'all') return '전체글';
  return c;
}

(async function init() {
  const category = categoryFromQuery();
  const display = boardDisplayName(category);
  document.getElementById('boardTitle').textContent = display;
  document.title = display + ' — 행복하서연';

  await loadCafeTabs(category === 'all' ? '전체글' : category);
  updateJoinButton(document.getElementById('joinBtn'));
  loadPopularTags(document.getElementById('tagCloud'));

  try {
    const [{ settings }, postsRes] = await Promise.all([
      fetch(apiUrl('/api/settings')).then((r) => r.json()),
      category === 'all'
        ? fetch(apiUrl('/api/posts')).then((r) => r.json())
        : fetch(apiUrl('/api/posts?category=' + encodeURIComponent(category))).then((r) =>
            r.json()
          ),
    ]);

    const title = settings.cafe_title || settings.blog_name || '행복하서연';
    const desc = settings.cafe_desc || settings.blog_subtitle || '';
    document.getElementById('cafeTitle').textContent = title;
    document.getElementById('cafeDesc').textContent = desc;
    document.getElementById('sideName').textContent = title;
    document.getElementById('sideDesc').textContent = desc;
    applyHeroBanner(settings);

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

    const posts = postsRes.posts || [];
    const listEl = document.getElementById('boardList');
    if (!posts.length) {
      listEl.innerHTML =
        '<li class="empty" style="padding:20px;color:#999;font-size:14px">등록된 글이 없습니다.</li>';
      return;
    }

    listEl.innerHTML = posts
      .map(
        (p) => `
      <li>
        <a class="mc-board-item" href="${postHref(p.slug)}">
          <span class="mc-board-cat">${escapeHtml(p.category || '')}</span>
          <span class="mc-board-title">${escapeHtml(p.title)}</span>
          <span class="mc-board-meta">추천 ${Number(p.likes).toLocaleString()} · ${escapeHtml(p.published_at || '')}</span>
        </a>
      </li>`
      )
      .join('');
  } catch (e) {
    console.error(e);
    document.getElementById('boardList').innerHTML =
      '<li class="empty" style="padding:20px;color:#999">목록을 불러오지 못했습니다.</li>';
  }
})();
