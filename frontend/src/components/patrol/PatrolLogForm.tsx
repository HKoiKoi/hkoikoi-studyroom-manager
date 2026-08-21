import { useNavigate } from "react-router-dom";
import { alertUtils } from "@/utils/alertUtils";
import type { ErrorResponse } from "@/types/common";
import { useRef, useEffect, useState } from "react";
import { useCreatePatrolLog } from "@/hooks/usePatrolLog";
import { SeatTagInput } from "@/components/patrol/SeatTagInput";
import type {
  PatrolLogResponse,
  PatrolLogCreateRequest,
} from "@/types/patrolLog";
import {
  Moon,
  Save,
  Clock,
  Coffee,
  Armchair,
  Calendar,
  FileText,
  Sparkles,
  UserMinus,
  CheckCircle2,
  ClipboardEdit,
} from "lucide-react";

interface PatrolLogFormProps {
  recentData?: PatrolLogResponse | null;
}

const DRAFT_KEY = "patrol_log_draft";

export const PatrolLogForm = ({ recentData }: PatrolLogFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync: createPatrolLog, isPending } = useCreatePatrolLog();

  // 로컬 스토리지에서 저장된 임시저장 데이터 불러오기
  const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");

  // 상태 관리
  const [standingSeats, setStandingSeats] = useState<number[]>(() => {
    if (savedDraft?.standingSeats) {
      return savedDraft.standingSeats;
    }

    const seats = recentData?.standingSeats || [];

    return [...seats].sort((a, b) => a - b);
  });
  const [cafeZoneSeats, setCafeZoneSeats] = useState<number[]>(() => {
    if (savedDraft?.cafeZoneSeats) {
      return savedDraft.cafeZoneSeats;
    }

    const seats = recentData?.cafeZoneSeats || [];

    return [...seats].sort((a, b) => a - b);
  });
  const [drowsySeats, setDrowsySeats] = useState<number[]>(
    savedDraft?.drowsySeats || [],
  );
  const [absentSeats, setAbsentSeats] = useState<number[]>(
    savedDraft?.absentSeats || [],
  );
  const [memo, setMemo] = useState<string>(savedDraft?.memo || "");
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  const isDraftRestored = !!savedDraft;
  const hasRecentSeats = !!(
    (recentData?.standingSeats && recentData.standingSeats.length > 0) ||
    (recentData?.cafeZoneSeats && recentData.cafeZoneSeats.length > 0)
  );
  const hasNotified = useRef(false);
  const isSubmitted = useRef(false);

  // 페이지 로드 시 임시저장 데이터가 존재하면 불러왔다는 알림, 이전 순찰 일지의 좌석 데이터가 있다면 직전 순찰 일지의 좌석 데이터를 불러왔다는 알림을 한 번만 표시
  useEffect(() => {
    if (hasNotified.current) return;

    if (isDraftRestored) {
      alertUtils.toastSuccess("작성 중이던 일지를 불러왔습니다.");
    } else if (hasRecentSeats) {
      alertUtils.toastSuccess(
        "직전 순찰 일지의 스탠딩, 카페존 좌석을 불러왔습니다.",
      );
    }

    hasNotified.current = true;
  }, [isDraftRestored, hasRecentSeats]);

  // 임시저장 기능: 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (isSubmitted.current) return;

    const draftData = {
      standingSeats,
      cafeZoneSeats,
      drowsySeats,
      absentSeats,
      memo,
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
  }, [standingSeats, cafeZoneSeats, drowsySeats, absentSeats, memo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 날짜 포맷팅
  const dateString = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(currentDateTime);

  // 시간 포맷팅
  const timeString = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(currentDateTime);

  // 반복 업무 체크리스트
  const routineTasks = [
    "퇴실자 탭 디스플레이 종료",
    "화장실 정리",
    "제빙기 얼음 부족으로 쾌속 모드로 변경",
    "제빙기 물 보충",
    "정수기 컵 보충",
    "복도 휴지 보충",
    "전 열람실 에어컨 종료",
    "정수기 및 커피머신 청소",
    "제빙기 일반 모드로 변경",
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
      const response = await createPatrolLog(requestData);

      if (response.result) {
        isSubmitted.current = true;
        localStorage.removeItem(DRAFT_KEY);

        alertUtils.toastSuccess("순찰 일지가 성공적으로 저장되었습니다.");
        navigate("/patrol");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      alertUtils.error(
        "저장 실패",
        err.message || "서버 통신 오류가 발생했습니다.",
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-8 sm:pb-12 px-2 sm:px-0 max-w-3xl w-full mx-auto">
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
              독서실 순찰 결과를 꼼꼼하게 기록해주세요.
              <br className="hidden sm:inline" />
              쾌적한 스터디룸 환경 유지를 위한 소중한 데이터가 됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 순찰 일지 작성 날짜 및 시간 */}
      <section className="flex justify-center w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-base-100 shadow-sm border border-base-200 px-6 py-4 rounded-box w-full">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-base-content/90">
            <Calendar className="text-primary w-6 h-6" />
            <span>{dateString}</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-base-300"></div>
          <div className="sm:hidden w-1.5 h-1.5 rounded-full bg-base-300"></div>
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-base-content/90">
            <Clock className="text-secondary w-6 h-6" />
            <span>{timeString}</span>
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
                badgeColor="badge-accent"
              />
            </div>
          </div>

          {/* 2. 특이사항 및 점검항목 카드 */}
          <div className="card bg-base-100 border border-base-200 shadow-xs">
            <div className="card-body p-5 sm:p-8 flex flex-col gap-4">
              <h2 className="card-title text-xl flex items-center gap-2">
                <FileText className="text-primary w-6 h-6" />
                특이사항 및 점검항목
              </h2>

              {/* 빠른 추가 버튼 */}
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
              disabled={isPending}
              className="btn btn-primary w-full sm:w-auto px-8 gap-2 text-lg h-12"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Save size={20} />
              )}
              {isPending ? "저장 중..." : "순찰 일지 등록"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
