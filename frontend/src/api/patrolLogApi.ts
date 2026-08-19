import { apiClient } from "@/api/apiClient";
import type { ApiResponse } from "@/types/common";
import type {
  PatrolLogResponse,
  PatrolLogCreateRequest,
} from "@/types/patrolLog";

export const patrolLogApi = {
  // 순찰 일지 목록 조회
  getPatrolLogs: async (
    date?: string,
  ): Promise<ApiResponse<PatrolLogResponse[]>> => {
    const response = await apiClient.get<ApiResponse<PatrolLogResponse[]>>(
      "/api/v1/patrol-logs",
      { params: { date } },
    );

    return response.data;
  },

  // 순찰 일지 단건 조회
  getPatrolLog: async (
    patrolLogId: number,
  ): Promise<ApiResponse<PatrolLogResponse>> => {
    const response = await apiClient.get<ApiResponse<PatrolLogResponse>>(
      `/api/v1/patrol-logs/${patrolLogId}`,
    );

    return response.data;
  },

  // 순찰 일지 생성
  createPatrolLog: async (
    request: PatrolLogCreateRequest,
  ): Promise<ApiResponse<number>> => {
    const response = await apiClient.post<ApiResponse<number>>(
      "/api/v1/patrol-logs",
      request,
    );

    return response.data;
  },
};
