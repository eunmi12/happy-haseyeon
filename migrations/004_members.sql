-- 004: 회원 테이블 (카페 가입/로그인)
-- 이미 있으면 테이블은 IF NOT EXISTS 로 건너뜀

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
