-- 순찰 일지 날짜 검색 성능 최적화를 위한 인덱스 추가
CREATE INDEX idx_patrol_log_created_at ON patrol_log (created_at);
