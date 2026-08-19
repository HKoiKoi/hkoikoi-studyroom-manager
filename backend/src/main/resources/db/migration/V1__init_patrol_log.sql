-- 순찰 일지 테이블 작성

CREATE TABLE patrol_log
(
    patrol_log_id   BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '순찰 일지 ID',
    standing_seats  VARCHAR(255) COMMENT '스탠딩 좌석 번호 목록',
    cafe_zone_seats VARCHAR(255) COMMENT '카페존 좌석 번호 목록',
    drowsy_seats    VARCHAR(255) COMMENT '졸음 및 딴짓 좌석 번호 목록',
    absent_seats    VARCHAR(255) COMMENT '자리비움 좌석 번호 목록',
    memo            TEXT COMMENT '특이사항',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
    COMMENT '순찰 일지';
