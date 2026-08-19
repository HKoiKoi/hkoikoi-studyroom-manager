import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content p-8 sm:p-10 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-left">
          {/* 브랜드 및 서비스 소개 */}
          <aside className="flex flex-col gap-2">
            <Building2 className="w-9 h-9 sm:w-10 sm:h-10 text-primary mb-1 sm:mb-2" />
            <span className="text-lg sm:text-xl font-bold text-white">
              SCO 순찰 일지
            </span>
            <p className="text-xs sm:text-sm leading-relaxed opacity-80 mt-1">
              효율적이고 체계적인 순찰 일지 관리 서비스를 제공합니다.
              <br />
              순찰 일지 기록을 통해 쾌적한 근무 환경을 유지하세요.
            </p>
            <p className="text-xs opacity-50 mt-2 sm:mt-4">
              © {currentYear} Studyroom Manager. All rights reserved.
            </p>
          </aside>

          {/* 메뉴 링크*/}
          <nav className="flex flex-col gap-2.5">
            <h6 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">
              메뉴
            </h6>
            <Link
              to="/patrol/new"
              className="link link-hover opacity-80 text-sm"
            >
              순찰 일지 작성
            </Link>
            <Link to="/patrol" className="link link-hover opacity-80 text-sm">
              순찰 일지 목록
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
