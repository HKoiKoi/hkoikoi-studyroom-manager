export type ZoneType =
  | "STANDING" // 스탠딩 좌석
  | "CAFE_ZONE"; // 카페존 좌석

// 순찰 일지 생성 요청 타입
export interface PatrolLogCreateRequest {
  standingSeats?: number[];
  cafeZoneSeats?: number[];
  drowsySeats?: number[];
  absentSeats?: number[];
  memo?: string;
}

// 순찰 일지 응답 타입
export interface PatrolLogResponse {
  patrolLogId: number;
  standingSeats?: number[];
  cafeZoneSeats?: number[];
  drowsySeats?: number[];
  absentSeats?: number[];
  memo?: string;
  createdAt: string;
}

// 좌석 이동 요청 타입
export interface PatrolLogSeatMoveRequest {
  seatNumber: number;
  targetZone: ZoneType;
}
