-- 010: comments.dislikes (네이버형 비추천수)
ALTER TABLE comments ADD COLUMN dislikes INTEGER NOT NULL DEFAULT 0;
