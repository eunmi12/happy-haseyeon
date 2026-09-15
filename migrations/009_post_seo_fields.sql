-- 009: 게시글 SEO 필드
ALTER TABLE posts ADD COLUMN seo_title TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN seo_description TEXT DEFAULT '';
