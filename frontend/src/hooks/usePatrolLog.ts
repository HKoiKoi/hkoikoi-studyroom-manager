import { patrolLogApi } from "@/api/patrolLogApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  PatrolLogCreateRequest,
  PatrolLogSeatMoveRequest,
} from "@/types/patrolLog";

// 쿼리 키 팩토리
export const patrolLogKeys = {
  all: ["patrolLogs"] as const,
  lists: () => [...patrolLogKeys.all, "list"] as const,
  list: (date?: string) => [...patrolLogKeys.lists(), date] as const,
  details: () => [...patrolLogKeys.all, "detail"] as const,
  detail: (id: number) => [...patrolLogKeys.details(), id] as const,
  recent: () => [...patrolLogKeys.all, "recent"] as const,
};

// 순찰 일지 목록 조회 훅
export const usePatrolLogs = (date?: string) => {
  return useQuery({
    queryKey: patrolLogKeys.list(date),
    queryFn: () => patrolLogApi.getPatrolLogs(date),
    staleTime: 1000 * 60,
  });
};

// 순찰 일지 단건 조회 훅
export const usePatrolLog = (patrolLogId: number) => {
  return useQuery({
    queryKey: patrolLogKeys.detail(patrolLogId),
    queryFn: () => patrolLogApi.getPatrolLog(patrolLogId),
    enabled: !!patrolLogId,
  });
};

// 당일 가장 최근 순찰 일지 조회
export const useRecentPatrolLog = () => {
  return useQuery({
    queryKey: patrolLogKeys.recent(),
    queryFn: () => patrolLogApi.getRecentPatrolLog(),
  });
};

// 순찰 일지 생성 훅
export const useCreatePatrolLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatrolLogCreateRequest) =>
      patrolLogApi.createPatrolLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patrolLogKeys.all });
    },
  });
};

// 좌석 이동 훅
export const useMoveAbsentSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      patrolLogId,
      request,
    }: {
      patrolLogId: number;
      request: PatrolLogSeatMoveRequest;
    }) => patrolLogApi.moveAbsentSeat(patrolLogId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patrolLogKeys.all });
    },
  });
};
