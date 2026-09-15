-- 006: 게시글 대표이미지 컬럼 (저장 500 방지)
-- 이미 있으면면 에러 → 무시

ALTER TABLE posts ADD COLUMN cover_image TEXT DEFAULT '';
