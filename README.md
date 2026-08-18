# HKoiKoi's Studyroom Manager

기존에 수기로 작성하던 독서실 순찰 일지의 불편함을 해소하고자 기획된 웹 애플리케이션<br>
30분 간격으로 진행되는 순찰 업무를 스마트폰이나 태블릿에서 최소한의 터치로 빠르고 정확하게 기록할 수 있도록 도움이 되는 것을 목표로 합니다.

## 주요 기능

- **원클릭 시간 기록:** 순찰 완료 시 현재 시간이 자동으로 기록됩니다.
- **좌석 상태 관리:** 스탠딩 책상, 카페존 이용 인원과 좌석 번호를 손쉽게 입력할 수 있습니다.
- **회원 상태 모니터링:** 자리비움, 졸음, 딴짓 등 회원의 특이 상태를 좌석 번호와 함께 기록합니다.
- **순찰 내역 퀵 태그:** 자주 하는 업무(퇴실자 탭 디스플레이 종료, 화장실 정리, 재빙기 물 보충, 정수기 및 커피머신 청소, 전 열람실 에어컨 종료 등)를 버튼화하여 터치 한 번으로 다중 선택할 수 있습니다.
- **특이사항 메모:** 다음 근무자나 관리자에게 인계할 중요한 내용 혹은 특이한 내용을 자유롭게 텍스트로 남길 수 있습니다.

## 화면 구성

- **Single Page Application (1페이지 구성)**
  - 모바일 환경에서의 조작성을 최우선으로 고려하여, 대시보드와 입력 폼을 한 페이지로 통합했습니다.
  - 불필요한 페이지 이동 없이 스크롤과 터치만으로 모든 순찰 기록을 완료할 수 있습니다.

## 기술 스택

### Frontend

- **Framework:** React 19, TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4, Daisy UI 5
- **Typography:** Pretendard

### Backend

- **Language:** Java 25
- **Framework:** Spring Boot 4.x

### Infrastructure & CI/CD

- **Repository:** GitHub Private Repository
- **CI/CD:** GitHub Actions
