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
        {seats.map((seat) => (
          <span
            key={seat}
            onClick={() => onClickSeat && onClickSeat(seat)}
            className={`badge ${badgeColor} font-semibold shadow-sm ${
              onClickSeat
                ? "cursor-pointer hover:opacity-75 hover:scale-105 transition-all"
                : ""
            }`}
          >
            {seat}번
          </span>
        ))}
      </div>
    </div>
  );
};
