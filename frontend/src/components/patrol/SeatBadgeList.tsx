import React from "react";
import type { LucideIcon } from "lucide-react";

interface SeatBadgeListProps {
  label: string;
  icon: LucideIcon | React.ElementType;
  seats?: number[];
  badgeColor: string;
  onClickSeat?: (seat: number) => void;
}

export const SeatBadgeList = ({
  label,
  icon: Icon,
  seats,
  badgeColor,
  onClickSeat,
}: SeatBadgeListProps) => {
  if (!seats || seats.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-sm font-bold text-base-content/80">
        <Icon size={14} />
        {label}
      </span>

      <div className="flex flex-wrap gap-1.5">
        {seats.map((seat) => {
          if (onClickSeat) {
            return (
              <button
                key={seat}
                type="button"
                onClick={() => onClickSeat(seat)}
                className={`badge ${badgeColor} font-semibold shadow-sm cursor-pointer hover:opacity-80 active:scale-95 transition-all py-3 px-2.5 min-h-7 select-none touch-manipulation`}
                aria-label={`${seat}번 좌석 이동 선택`}
              >
                {seat}번
              </button>
            );
          }

          return (
            <span
              key={seat}
              className={`badge ${badgeColor} font-semibold shadow-sm py-3 px-2.5 min-h-7`}
            >
              {seat}번
            </span>
          );
        })}
      </div>
    </div>
  );
};
