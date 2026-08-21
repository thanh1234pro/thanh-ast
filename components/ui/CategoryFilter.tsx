"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange("")}
        className={cn(
          "inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border",
          activeCategory === ""
            ? "bg-gradient-to-r from-accent-orange to-accent-amber text-white border-transparent shadow-xs font-semibold"
            : "bg-white text-text-secondary border-border-subtle hover:text-foreground hover:border-accent-orange/40 hover:bg-slate-50 shadow-xs"
        )}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Tất cả
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border",
            activeCategory === cat
              ? "bg-gradient-to-r from-accent-orange to-accent-amber text-white border-transparent shadow-xs font-semibold"
              : "bg-white text-text-secondary border-border-subtle hover:text-foreground hover:border-accent-orange/40 hover:bg-slate-50 shadow-xs"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
