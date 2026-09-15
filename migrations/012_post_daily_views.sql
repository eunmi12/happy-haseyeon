-- 012: 게시글·홈 일별 조회수
CREATE TABLE IF NOT EXISTS post_daily_views (
  post_id INTEGER NOT NULL,
  view_date TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (post_id, view_date),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_post_daily_views_date ON post_daily_views(view_date);

CREATE TABLE IF NOT EXISTS page_daily_views (
  page_key TEXT NOT NULL,
  view_date TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (page_key, view_date)
);

CREATE INDEX IF NOT EXISTS idx_page_daily_views_date ON page_daily_views(view_date);
