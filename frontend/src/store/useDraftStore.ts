import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftState {
  standingSeats: number[];
  cafeZoneSeats: number[];
  drowsySeats: number[];
  absentSeats: number[];
  memo: string;
  isDraftValid: boolean;
  updateDraft: (data: Partial<DraftState>) => void;
  clearDraft: () => void;
}

export const useDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      standingSeats: [],
      cafeZoneSeats: [],
      drowsySeats: [],
      absentSeats: [],
      memo: "",
      isDraftValid: false,

      updateDraft: (data) =>
        set((state) => {
          const newState = { ...state, ...data };
          const isValid = Boolean(
            newState.standingSeats.length > 0 ||
            newState.cafeZoneSeats.length > 0 ||
            newState.drowsySeats.length > 0 ||
            newState.absentSeats.length > 0 ||
            newState.memo.trim().length > 0,
          );
          return { ...newState, isDraftValid: isValid };
        }),

      clearDraft: () =>
        set({
          standingSeats: [],
          cafeZoneSeats: [],
          drowsySeats: [],
          absentSeats: [],
          memo: "",
          isDraftValid: false,
        }),
    }),
    {
      name: "patrol-log-draft-storage",
    },
  ),
);
