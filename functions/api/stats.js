import {
  json,
  options,
  requireAdmin,
  ensureViewsTables,
  kstDateString,
  AD_CATEGORY,
} from '../_utils.js';

export async function onRequestOptions() {
  return options();
}

function defaultRange() {
  const to = kstDateString();
  const d = new Date(to + 'T00:00:00+09:00');
  d.setDate(d.getDate() - 29);
  const from = d.toISOString().slice(0, 10);
  return { from, to };
}

function clampRange(from, to) {
  const fallback = defaultRange();
  let f = String(from || fallback.from).slice(0, 10);
  let t = String(to || fallback.to).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) f = fallback.from;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) t = fallback.to;
  if (f > t) {
    const tmp = f;
    f = t;
    t = tmp;
  }
  return { from: f, to: t };
}

/** 관리자 전용 — 일별 조회수 리포트 */
export async function onRequestGet(context) {
  const auth = await requireAdmin(context.request, context.env);
  if (!auth.ok) return auth.response;

  try {
    await ensureViewsTables(context.env);
  } catch (e) {
    console.error(e);
    return json(
      {
        error: '조회수 테이블 준비에 실패했습니다.',
        detail: String(e?.message || e),
      },
      500
    );
  }

  try {
    return await handleStatsGet(context);
  } catch (e) {
    console.error('stats error', e);
    return json(
      {
        error: '조회수 리포트를 불러오지 못했습니다.',
        detail: String(e?.message || e),
      },
      500
    );
  }
}

async function handleStatsGet(context) {
  const url = new URL(context.request.url);
  const scope = url.searchParams.get('scope') || 'main'; // main | ad | home
  const { from, to } = clampRange(
    url.searchParams.get('from'),
    url.searchParams.get('to')
  );
  const today = kstDateString();
  const q = (url.searchParams.get('q') || '').trim();
  const postId = Number(url.searchParams.get('post_id') || 0);

  if (scope === 'home') {
    const { results: days } = await context.env.DB.prepare(
      `SELECT view_date, views
       FROM page_daily_views
       WHERE page_key = 'home' AND view_date >= ? AND view_date <= ?
       ORDER BY view_date DESC`
    )
      .bind(from, to)
      .all();

    const totalRow = await context.env.DB.prepare(
      `SELECT COALESCE(SUM(views), 0) AS total
       FROM page_daily_views
       WHERE page_key = 'home' AND view_date >= ? AND view_date <= ?`
    )
      .bind(from, to)
      .first();

    const todayRow = await context.env.DB.prepare(
      `SELECT COALESCE(views, 0) AS views
       FROM page_daily_views
       WHERE page_key = 'home' AND view_date = ?`
    )
      .bind(today)
      .first();

    return json({
      scope: 'home',
      from,
      to,
      today,
      today_views: Number(todayRow?.views || 0),
      total_views: Number(totalRow?.total || 0),
      days: days || [],
    });
  }

  if (scope !== 'main' && scope !== 'ad') {
    return json({ error: 'scope는 main, ad, home 중 하나여야 합니다.' }, 400);
  }

  const isAd = scope === 'ad';

  // 특정 글 일별 상세
  if (postId) {
    const post = await context.env.DB.prepare(
      'SELECT id, slug, title, category, published_at FROM posts WHERE id = ? LIMIT 1'
    )
      .bind(postId)
      .first();
    if (!post) return json({ error: '글을 찾을 수 없습니다.' }, 404);

    const postIsAd = String(post.category || '').trim() === AD_CATEGORY;
    if (isAd !== postIsAd) {
      return json({ error: '해당 리포트 범위의 글이 아닙니다.' }, 400);
    }

    const { results: days } = await context.env.DB.prepare(
      `SELECT view_date, views
       FROM post_daily_views
       WHERE post_id = ? AND view_date >= ? AND view_date <= ?
       ORDER BY view_date DESC`
    )
      .bind(postId, from, to)
      .all();

    const totalRow = await context.env.DB.prepare(
      `SELECT COALESCE(SUM(views), 0) AS total
       FROM post_daily_views
       WHERE post_id = ? AND view_date >= ? AND view_date <= ?`
    )
      .bind(postId, from, to)
      .first();

    const todayRow = await context.env.DB.prepare(
      `SELECT COALESCE(views, 0) AS views
       FROM post_daily_views
       WHERE post_id = ? AND view_date = ?`
    )
      .bind(postId, today)
      .first();

    const allTime = await context.env.DB.prepare(
      `SELECT COALESCE(SUM(views), 0) AS total
       FROM post_daily_views WHERE post_id = ?`
    )
      .bind(postId)
      .first();

    return json({
      scope,
      from,
      to,
      today,
      post,
      today_views: Number(todayRow?.views || 0),
      range_views: Number(totalRow?.total || 0),
      total_views: Number(allTime?.total || 0),
      days: days || [],
    });
  }

  // 글 목록 + 오늘/기간/누적 조회수
  let sql = `
    SELECT
      p.id, p.slug, p.title, p.category, p.published_at,
      COALESCE((
        SELECT SUM(v.views) FROM post_daily_views v WHERE v.post_id = p.id AND v.view_date = ?
      ), 0) AS today_views,
      COALESCE((
        SELECT SUM(v.views) FROM post_daily_views v
        WHERE v.post_id = p.id AND v.view_date >= ? AND v.view_date <= ?
      ), 0) AS range_views,
      COALESCE((
        SELECT SUM(v.views) FROM post_daily_views v WHERE v.post_id = p.id
      ), 0) AS total_views
    FROM posts p
    WHERE ${isAd ? 'p.category = ?' : '(p.category IS NULL OR p.category != ?)'}
  `;
  const binds = [today, from, to, AD_CATEGORY];

  if (q) {
    sql += ' AND (p.title LIKE ? OR p.slug LIKE ?)';
    const like = '%' + q + '%';
    binds.push(like, like);
  }

  sql += ' ORDER BY range_views DESC, p.id DESC';

  const { results: posts } = await context.env.DB.prepare(sql)
    .bind(...binds)
    .all();

  return json({
    scope,
    from,
    to,
    today,
    posts: posts || [],
  });
}
