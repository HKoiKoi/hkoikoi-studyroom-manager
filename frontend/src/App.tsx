import Swal from "sweetalert2";

function App() {
  // 현재 시간을 'HH:mm' 형식으로 가져오는 함수
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 저장 버튼 클릭 핸들러 (SweetAlert2 테스트)
  const handleSubmit = () => {
    Swal.fire({
      title: "순찰 일지 저장",
      text: `${getCurrentTime()} 순찰 기록을 저장하시겠습니까?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "저장",
      cancelButtonText: "취소",
      confirmButtonColor: "#4b5563", // Tailwind gray-600
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "저장 완료!",
          text: "순찰 일지가 성공적으로 기록되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
        // TODO: 이곳에 Axios를 이용한 백엔드 전송(POST) 로직 추가
      }
    });
  };

  return (
    // 전체 배경 및 중앙 정렬 (PC에서 볼 때도 모바일 화면처럼 보이게 제어)
    <div className="min-h-screen bg-base-200 flex justify-center font-sans">
      {/* 모바일 화면 사이즈 컨테이너 */}
      <div className="w-full max-w-md bg-base-100 shadow-xl min-h-screen flex flex-col">
        {/* 상단 네비게이션 바 (Header) */}
        <header className="navbar bg-neutral text-neutral-content sticky top-0 z-10 shadow-sm">
          <div className="flex-1">
            <h1 className="text-xl font-bold ml-2">SCO 관리일지</h1>
          </div>
          <div className="flex-none pr-4">
            <span className="badge badge-primary badge-lg font-semibold">
              {getCurrentTime()} 순찰
            </span>
          </div>
        </header>

        {/* 메인 입력 폼 영역 (스크롤 가능) */}
        <main className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
          {/* 1. 구역별 인원 파악 */}
          <section className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-4 space-y-3">
              <h2 className="card-title text-lg border-b pb-2">인원 파악</h2>

              <label className="form-control w-full">
                <div className="label pb-1">
                  <span className="label-text font-bold">스탠딩 좌석</span>
                </div>
                {/* 모바일에서 숫자 키패드가 바로 뜨도록 type="tel" 적용 */}
                <input
                  type="tel"
                  placeholder="예: 50, 48, 46"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label pb-1">
                  <span className="label-text font-bold">카페존</span>
                </div>
                <input
                  type="tel"
                  placeholder="예: 69, 107"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </section>

          {/* 2. 회원 상태 체크 */}
          <section className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-4 space-y-3">
              <h2 className="card-title text-lg border-b pb-2">회원 상태</h2>

              <div className="grid grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text font-bold text-error">
                      졸음 및 딴짓
                    </span>
                  </div>
                  <input
                    type="tel"
                    placeholder="번호 입력"
                    className="input input-bordered input-error w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label pb-1">
                    <span className="label-text font-bold text-warning">
                      자리비움
                    </span>
                  </div>
                  <input
                    type="tel"
                    placeholder="번호 입력"
                    className="input input-bordered input-warning w-full"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* 3. 특이사항 메모 */}
          <section className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-lg border-b pb-2 mb-2">
                특이사항
              </h2>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="예: 퇴실자 45번 자리 청소 요망, 재빙기 쾌속 모드 전환"
              ></textarea>
            </div>
          </section>
        </main>

        {/* 하단 고정 저장 버튼 (Sticky Footer) */}
        <div className="p-4 bg-base-100 border-t border-base-200 sticky bottom-0 z-10">
          <button
            className="btn btn-neutral w-full text-lg h-14"
            onClick={handleSubmit}
          >
            기록 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
