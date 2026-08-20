import { Layout } from "@/components/layout/Layout";
import { PatrolLogPage } from "@/pages/patrol/PatrolLog";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 루트 경로 접속 시 일지 작성 페이지로 자동 리다이렉트
      { index: true, element: <Navigate to="/patrol/new" replace /> },

      // TODO: 순찰 일지 라우트
      {
        path: "/patrol/new",
        element: <PatrolLogPage />,
      },

      // TODO: 404 에러 페이지
    ],
  },
]);
