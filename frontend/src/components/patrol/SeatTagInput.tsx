import { useState } from "react";
import { X, type LucideIcon } from "lucide-react";

interface SeatTagInputProps {
  label: string;
  icon: LucideIcon;
  seats: number[];
  onChange: (seats: number[]) => void;
  badgeColor?: string;
}

export const SeatTagInput = ({
  label,
  icon: Icon,
  seats,
  onChange,
  badgeColor = "badge-neutral",
}: SeatTagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const num = parseInt(inputValue.trim(), 10);

    if (!isNaN(num) && !seats.includes(num)) {
      const sortedSeats = [...seats, num].sort((a, b) => a - b);
      onChange(sortedSeats);
    }

    setInputValue("");
  };

  const removeSeat = (targetSeat: number) => {
    onChange(seats.filter((seat) => seat !== targetSeat));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-bold text-base-content">
        <Icon size={16} className="text-base-content/70" />
        {label}
      </label>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`${label} 번호 입력 후 Enter`}
          className="input input-sm sm:input-md input-bordered w-full focus:input-primary transition-all"
          enterKeyHint="done"
        />
        {/* 폼 제출을 위한 숨김 버튼 */}
        <button type="submit" className="hidden" aria-hidden="true">
          추가
        </button>
      </form>

      {seats.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {seats.map((seat) => (
            <span
              key={seat}
              className={`badge ${badgeColor} badge-lg gap-1 pl-3 pr-2 py-3 font-semibold shadow-sm`}
            >
              {seat}
              <button
                type="button"
                onClick={() => removeSeat(seat)}
                className="btn btn-ghost btn-circle btn-xs hover:bg-base-200/50"
                aria-label="삭제"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
