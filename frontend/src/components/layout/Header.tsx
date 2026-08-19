import logoImage from "@/assets/logo.png";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu, ClipboardEdit, ClipboardList } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [prevPathname, setPrevPathname] = useState<string>(location.pathname);

  // 페이지 이동 시 모바일 메뉴 닫기
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
        {/* 로고 및 메인 네비게이션 */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImage}
              alt="스터디룸 로고"
              className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full border border-base-300 group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-base-content group-hover:text-primary transition-colors">
              HKoiKoi's SCO 순찰 일지
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/patrol/new"
              className={`btn btn-ghost btn-sm gap-1.5 font-semibold text-sm ${
                location.pathname === "/patrol/new"
                  ? "text-primary bg-primary/10"
                  : "text-base-content/80 hover:text-primary"
              }`}
            >
              <ClipboardEdit size={18} />
              순찰 일지 작성
            </Link>

            <Link
              to="/patrol"
              className={`btn btn-ghost btn-sm gap-1.5 font-semibold text-sm ${
                location.pathname === "/patrol"
                  ? "text-primary bg-primary/10"
                  : "text-base-content/80 hover:text-primary"
              }`}
            >
              <ClipboardList size={18} />
              순찰 일지 목록
            </Link>
          </nav>
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-base-200 bg-base-100 p-4 flex flex-col animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-col gap-1 pb-3">
            <Link
              to="/patrol/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-ghost btn-sm justify-start gap-2 text-base font-semibold"
            >
              <ClipboardEdit size={18} />
              순찰 일지 작성
            </Link>

            <Link
              to="/patrol"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-ghost btn-sm justify-start gap-2 text-base font-semibold"
            >
              <ClipboardList size={18} />
              순찰 일지 목록
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
