-- 댓글 프로필 사진 (없으면 이니셜 아바타 유지)
ALTER TABLE comments ADD COLUMN profile_image TEXT NOT NULL DEFAULT '';
