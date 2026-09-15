-- 광고 블로그 매체별 픽셀 JSON
-- 예: {"meta_pixel_id":"123","google_ga4_id":"G-XXXX"}
ALTER TABLE posts ADD COLUMN ad_pixels TEXT NOT NULL DEFAULT '';
