-- 007: posts.cover_image / category 보강 (저장 500 방지)
-- 이미 있으면 "duplicate column" 에러 → 무시하고 다음 문 실행

ALTER TABLE posts ADD COLUMN category TEXT DEFAULT '후기';
ALTER TABLE posts ADD COLUMN cover_image TEXT DEFAULT '';
