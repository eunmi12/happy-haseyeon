-- 대댓글(답글) 지원
ALTER TABLE comments ADD COLUMN parent_id INTEGER;
