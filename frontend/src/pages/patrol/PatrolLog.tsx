import { useRecentPatrolLog } from "@/hooks/usePatrolLog";
import { PatrolLogForm } from "@/components/patrol/PatrolLogForm";

export const PatrolLog = () => {
  const { data: recentLogResponse, isLoading } = useRecentPatrolLog();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return <PatrolLogForm recentData={recentLogResponse?.data} />;
};
