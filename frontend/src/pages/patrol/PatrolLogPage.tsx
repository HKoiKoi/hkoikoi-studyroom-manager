import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertUtils } from "@/utils/alertUtils";
import { patrolLogApi } from "@/api/patrolLogApi";
import type { PatrolLogCreateRequest } from "@/types/patrolLog";
import { SeatTagInput } from "@/components/patrol/SeatTagInput";
import {
  ClipboardEdit,
  Sparkles,
  Armchair,
  Coffee,
  Moon,
  UserMinus,
  FileText,
  CheckCircle2,
  Save,
} from "lucide-react";
import type { ErrorResponse } from "@/types/common";

export const PatrolLogPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [standingSeats, setStandingSeats] = useState<number[]>([]);
  const [cafeZoneSeats, setCafeZoneSeats] = useState<number[]>([]);
  const [drowsySeats, setDrowsySeats] = useState<number[]>([]);
  const [absentSeats, setAbsentSeats] = useState<number[]>([]);
  const [memo, setMemo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 반복 업무 체크리스트
  const routineTasks = [
    "퇴실자 탭 디스플레이 종료",
    "화장실 정리",
    "제빙기 물 보충",
    "정수기 컵 보충",
    "복도 휴지 보충",
    "전 열람실 에어컨 종료",
  ];

  const addRoutineTask = (task: string) => {
    setMemo((prev) => (prev ? `${prev}\n${task}` : task));
  };

  const handleSave = async () => {
    const isConfirm = await alertUtils.confirm(
      "순찰 일지를 저장하시겠습니까?",
      "한 번 저장된 기록은 수정할 수 없습니다.",
      "저장",
    );

    if (!isConfirm) return;

    const requestData: PatrolLogCreateRequest = {
      standingSeats,
      cafeZoneSeats,
      drowsySeats,
      absentSeats,
      memo: memo.trim(),
    };

    try {
      setIsLoading(true);

      const response = await patrolLogApi.createPatrolLog(requestData);

      if (response.result) {
        alertUtils.toastSuccess("순찰 일지가 성공적으로 저장되었습니다.");

        navigate("/patrol");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      alertUtils.error(
        "저장 실패",
        err.message || "서버 통신 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10 pb-8 sm:pb-12 px-2 sm:px-0 max-w-3xl w-full mx-auto">
      {/* Hero 상단 배너 */}
      <section className="hero bg-base-100 rounded-box shadow-xs border border-base-200 py-8 sm:py-12 px-3 sm:px-6 mt-2">
        <div className="hero-content text-center flex-col gap-4 sm:gap-6 p-0 w-full">
          <div className="flex justify-center p-3 sm:p-4 bg-primary/10 rounded-full text-primary mb-1">
            <ClipboardEdit className="w-9 h-9 sm:w-12 sm:h-12" />
          </div>
          <div className="max-w-xl w-full">
            <h1 className="text-2xl sm:text-4xl font-bold text-base-content flex items-center justify-center gap-1.5 sm:gap-2">
              순찰 일지 작성{" "}
              <Sparkles className="text-warning w-5 h-5 sm:w-7 sm:h-7" />
            </h1>
            <p className="py-3 sm:py-4 text-base-content/70 text-xs sm:text-base leading-relaxed">
              매장 순찰 결과를 꼼꼼하게 기록해주세요.
              <br className="hidden sm:inline" />
              쾌적한 스터디룸 환경 유지를 위한 소중한 데이터가 됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 입력 폼 영역 */}
      <section className="flex flex-col gap-6">
        {/* 1. 좌석 점검 카드 */}
        <div className="card bg-base-100 border border-base-200 shadow-xs">
          <div className="card-body p-5 sm:p-8 flex flex-col gap-6">
            <h2 className="card-title text-xl border-b border-base-200 pb-3">
              좌석 상태 점검
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SeatTagInput
                label="스탠딩 좌석"
                icon={Armchair}
                seats={standingSeats}
                onChange={setStandingSeats}
                badgeColor="badge-primary"
              />
              <SeatTagInput
                label="카페존 좌석"
                icon={Coffee}
                seats={cafeZoneSeats}
                onChange={setCafeZoneSeats}
                badgeColor="badge-secondary"
              />
              <SeatTagInput
                label="졸음 및 딴짓"
                icon={Moon}
                seats={drowsySeats}
                onChange={setDrowsySeats}
                badgeColor="badge-warning"
              />
              <SeatTagInput
                label="자리비움"
                icon={UserMinus}
                seats={absentSeats}
                onChange={setAbsentSeats}
                badgeColor="badge-error text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. 특이사항 및 점검항목 카드 */}
        <div className="card bg-base-100 border border-base-200 shadow-xs">
          <div className="card-body p-5 sm:p-8 flex flex-col gap-4">
            <h2 className="card-title text-xl flex items-center gap-2">
              <FileText className="text-primary w-6 h-6" />
              특이사항 및 점검항목
            </h2>

            {/* 빠른 추가 버튼 (Routine Tasks) */}
            <div className="flex flex-wrap gap-2 mb-2">
              {routineTasks.map((task) => (
                <button
                  key={task}
                  type="button"
                  onClick={() => addRoutineTask(task)}
                  className="btn btn-sm btn-outline btn-primary text-xs sm:text-sm rounded-full"
                >
                  <CheckCircle2 size={14} />
                  {task}
                </button>
              ))}
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-32 text-base leading-relaxed focus:textarea-primary"
              placeholder="추가적인 특이사항을 자유롭게 입력해주세요."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="btn btn-primary w-full sm:w-auto px-8 gap-2 text-lg h-12"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Save size={20} />
            )}
            {isLoading ? "저장 중..." : "순찰 일지 등록"}
          </button>
        </div>
      </section>
    </div>
  );
};
