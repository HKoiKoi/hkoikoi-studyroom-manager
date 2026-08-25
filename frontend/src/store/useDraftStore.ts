import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftState {
  standingSeats: number[];
  cafeZoneSeats: number[];
  drowsySeats: number[];
  absentSeats: number[];
  memo: string;
  hasUserEdited: boolean;
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
      hasUserEdited: false,

      updateDraft: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearDraft: () =>
        set({
          standingSeats: [],
          cafeZoneSeats: [],
          drowsySeats: [],
          absentSeats: [],
          memo: "",
          hasUserEdited: false,
        }),
    }),
    {
      name: "patrol-log-draft-storage",
    },
  ),
);
