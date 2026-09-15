-- 003: 게시글 대표 이미지
-- cover_image 컬럼이 이미 있으면 에러 → 무시하고 넘어가세요

ALTER TABLE posts ADD COLUMN cover_image TEXT NOT NULL DEFAULT '';
