"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-accent-amber to-accent-orange text-white shadow-lg shadow-accent-amber/25 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-accent-amber/30 hover:scale-110 active:scale-95",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Về đầu trang"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
