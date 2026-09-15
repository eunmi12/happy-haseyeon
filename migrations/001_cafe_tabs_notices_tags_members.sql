-- 001: 카페 탭 / 공지 / 인기태그 / 회원
-- 이미 있는 테이블은 IF NOT EXISTS 로 건너뜀

CREATE TABLE IF NOT EXISTS cafe_tabs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  published_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS popular_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT NOT NULL DEFAULT '',
  profile_image TEXT NOT NULL DEFAULT '',
  token TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_members_username ON members(username);
CREATE INDEX IF NOT EXISTS idx_members_token ON members(token);

-- posts에 category 컬럼이 없을 때만 아래 한 줄 실행 (있으면면 에러 → 스킵)
-- ALTER TABLE posts ADD COLUMN category TEXT NOT NULL DEFAULT '후기';
