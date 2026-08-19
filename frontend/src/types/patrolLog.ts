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
