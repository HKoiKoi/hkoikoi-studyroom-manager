#!/bin/bash

# 에러 발생 시 스크립트 즉시 중단
set -e

echo "데이터베이스 초기화 스크립트 실행 시작..."

# 환경 변수를 사용하여 MySQL에 접속하고 권한 부여 SQL 실행
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL
  -- 1. Flyway 전용 계정 생성 및 DDL 권한 부여
  CREATE USER IF NOT EXISTS '${MYSQL_FLYWAY_USER}'@'%' IDENTIFIED BY '${MYSQL_FLYWAY_PASSWORD}';
  GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_FLYWAY_USER}'@'%';

  -- 2. App CRUD 전용 계정 생성 및 DML 권한 부여
  CREATE USER IF NOT EXISTS '${MYSQL_APP_USER}'@'%' IDENTIFIED BY '${MYSQL_APP_PASSWORD}';
  GRANT SELECT, INSERT, UPDATE, DELETE ON ${MYSQL_DATABASE}.* TO '${MYSQL_APP_USER}'@'%';

  -- 3. 변경된 권한 즉시 적용
  FLUSH PRIVILEGES;
EOSQL

echo "계정 생성 및 권한 부여가 성공적으로 완료되었습니다."
