import axios, { isAxiosError } from "axios";
import type { ApiResponse } from "@/types/common";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError<ApiResponse<null>>(error)) {
      const errorResponse = error.response?.data?.error;

      if (errorResponse) {
        console.error(
          `[API Error] ${errorResponse.code}: ${errorResponse.message}`,
        );

        return Promise.reject(errorResponse);
      }
    }

    return Promise.reject(error);
  },
);
