-- 002: 메인 히어로 배경 설정 키 (없으면 추가)
-- D1에서 한 줄씩 실행. 이미 있으면 키면 UNIQUE/PRIMARY 에러 → 무시

INSERT OR IGNORE INTO settings (key, value) VALUES ('hero_image', '/images/hero-diet.jpg');
INSERT OR IGNORE INTO settings (key, value) VALUES ('hero_video', '');
