import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatrolLogs } from "@/hooks/usePatrolLog";
import type { PatrolLogResponse } from "@/types/patrolLog";
import { SeatBadgeList } from "@/components/patrol/SeatBadgeList";
import {
  Moon,
  Plus,
  Clock,
  Coffee,
  FileText,
  Sparkles,
  Armchair,
  Calendar,
  UserMinus,
  ClipboardList,
} from "lucide-react";

export const PatrolLogList = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  // API 훅
  const { data: response, isLoading, isError } = usePatrolLogs(selectedDate);

  const patrolLogs = response?.data || [];

  // 시간 포맷팅
  const timeString = (isoString: string) => {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(isoString));
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-8 sm:pb-12 px-2 sm:px-0 max-w-3xl w-full mx-auto">
      {/* Hero 상단 배너 */}
      <section className="hero bg-base-100 rounded-box shadow-xs border border-base-200 py-8 sm:py-12 px-3 sm:px-6 mt-2">
        <div className="hero-content text-center flex-col gap-4 sm:gap-6 p-0 w-full">
          <div className="flex justify-center p-3 sm:p-4 bg-primary/10 rounded-full text-primary mb-1">
            <ClipboardList className="w-9 h-9 sm:w-12 sm:h-12" />
          </div>
          <div className="max-w-xl w-full">
            <h1 className="text-2xl sm:text-4xl font-bold text-base-content flex items-center justify-center gap-1.5 sm:gap-2">
              순찰 일지 목록{" "}
              <Sparkles className="text-warning w-5 h-5 sm:w-7 sm:h-7" />
            </h1>
            <p className="py-3 sm:py-4 text-base-content/70 text-xs sm:text-base leading-relaxed">
              독서실의 순찰 점검 기록을 확인합니다.
              <br className="hidden sm:inline" />
              날짜별로 기록된 데이터를 조회해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 날짜 선택 및 새 순찰 일지 작성 */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full bg-base-100 p-4 rounded-box border border-base-200 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="text-base-content/60" size={20} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input input-bordered input-sm sm:input-md w-full sm:w-auto font-semibold focus:input-primary"
          />
        </div>

        <button
          onClick={() => navigate("/patrol/new")}
          className="btn btn-primary w-full sm:w-auto gap-2"
        >
          <Plus size={18} />새 순찰 일지 작성
        </button>
      </section>

      {/* 리스트 영역 */}
      <section className="flex flex-col gap-4 sm:gap-6">
        {isLoading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-error font-semibold">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        {!isLoading && !isError && patrolLogs.length === 0 && (
          <div className="text-center py-16 bg-base-100 rounded-box border border-base-200 text-base-content/60">
            해당 날짜에 작성된 순찰 일지가 없습니다.
          </div>
        )}

        {/* 순찰 일지 카드 렌더링 */}
        {!isLoading &&
          patrolLogs.map((log: PatrolLogResponse) => (
            <div
              key={log.patrolLogId}
              className="card bg-base-100 border border-base-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="card-body p-5 sm:p-7 flex flex-col gap-5">
                {/* 카드 헤더 (시간) */}
                <div className="flex items-center justify-between border-b border-base-200 pb-3">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <Clock className="text-secondary w-5 h-5" />
                    <span>{timeString(log.createdAt)}</span>
                  </div>
                  <span className="text-xs text-base-content/50">
                    ID: {log.patrolLogId}
                  </span>
                </div>

                {/* 좌석 상태 뱃지 영역 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SeatBadgeList
                    label="스탠딩 좌석"
                    icon={Armchair}
                    seats={log.standingSeats}
                    badgeColor="badge-primary"
                  />
                  <SeatBadgeList
                    label="카페존 좌석"
                    icon={Coffee}
                    seats={log.cafeZoneSeats}
                    badgeColor="badge-secondary"
                  />
                  <SeatBadgeList
                    label="졸음 및 딴짓"
                    icon={Moon}
                    seats={log.drowsySeats}
                    badgeColor="badge-warning"
                  />
                  <SeatBadgeList
                    label="자리비움"
                    icon={UserMinus}
                    seats={log.absentSeats}
                    badgeColor="badge-error text-white"
                  />
                </div>

                {/* 특이사항 메모 영역 */}
                {log.memo && (
                  <div className="mt-2 bg-base-200/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-sm font-bold">
                      <FileText className="text-primary w-4 h-4" />
                      특이사항 및 메모
                    </div>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-base-content/80">
                      {log.memo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};
