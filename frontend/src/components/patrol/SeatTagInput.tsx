import { X, type LucideIcon } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);

      if (!isNaN(num) && !seats.includes(num)) {
        onChange([...seats, num]);
      }

      setInputValue("");
    }
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

      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`${label} 번호 입력 후 Enter`}
        className="input input-sm sm:input-md input-bordered w-full focus:input-primary transition-all"
      />

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
