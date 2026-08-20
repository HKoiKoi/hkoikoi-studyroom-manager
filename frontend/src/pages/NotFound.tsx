import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-8 sm:pb-12 px-2 sm:px-0 max-w-3xl w-full mx-auto min-h-[70vh] justify-center">
      {/* Hero 상단 배너 */}
      <section className="hero bg-base-100 rounded-box shadow-xs border border-base-200 py-10 sm:py-16 px-4 sm:px-6 mt-2">
        <div className="hero-content text-center flex-col gap-4 sm:gap-6 p-0 w-full">
          <div className="flex justify-center p-4 sm:p-5 bg-error/10 rounded-full text-error mb-2 animate-bounce">
            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>

          <div className="max-w-xl w-full">
            <h1 className="text-5xl sm:text-7xl font-black text-base-content mb-2 sm:mb-4 tracking-tighter">
              404
            </h1>
            <h2 className="text-xl sm:text-3xl font-bold text-base-content flex items-center justify-center gap-1.5 sm:gap-2">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="py-4 sm:py-6 text-base-content/70 text-sm sm:text-base leading-relaxed">
              입력하신 주소가 잘못되었거나,
              <br className="hidden sm:inline" />
              페이지가 삭제 혹은 이동되어 찾을 수 없습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 액션 버튼 영역 */}
      <section className="w-full">
        <div className="card bg-base-100 border border-base-200 shadow-xs">
          <div className="card-body p-5 sm:p-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline flex-1 gap-2 text-base sm:text-lg h-14 sm:h-16"
            >
              <ArrowLeft size={18} />
              이전 화면으로 돌아가기
            </button>

            <Link
              to="/"
              className="btn btn-primary flex-1 gap-2 text-base sm:text-lg h-14 sm:h-16"
            >
              <Home size={18} />
              메인으로 이동
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
