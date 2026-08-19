// 필드 에러 API 응답 타입
export interface FieldErrorDetail {
  field: string;
  message: string;
}

// API 에러 응답 타입
export interface ErrorResponse {
  timestamp: string;
  code: string;
  message: string;
  details?: FieldErrorDetail[];
}

// API 응답 타입
export interface ApiResponse<T> {
  result: boolean;
  data?: T;
  error?: ErrorResponse;
}
