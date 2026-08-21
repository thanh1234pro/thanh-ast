"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 sm:gap-2 mt-10 select-none",
        className
      )}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-border-subtle text-text-secondary hover:text-foreground hover:border-accent-orange/40 hover:bg-slate-50 shadow-xs transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-text-muted text-sm"
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-semibold transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-accent-orange to-accent-amber text-white shadow-sm font-bold scale-105"
                : "bg-white border border-border-subtle text-text-secondary hover:text-foreground hover:border-accent-orange/40 hover:bg-slate-50 shadow-xs"
            )}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-border-subtle text-text-secondary hover:text-foreground hover:border-accent-orange/40 hover:bg-slate-50 shadow-xs transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
