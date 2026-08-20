import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/utils/scrollUtils";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 페이지 경로가 변경될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 btn btn-circle btn-primary shadow-lg animate-bounce hover:animate-none transition-all"
      aria-label="맨 위로 이동"
    >
      <ArrowUp size={24} />
    </button>
  );
};
