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
          "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
          activeCategory === ""
            ? "bg-gradient-to-r from-accent-amber to-accent-orange text-white border-transparent shadow-md shadow-accent-amber/20"
            : "bg-card text-text-secondary border-border-subtle hover:text-foreground hover:border-accent-amber/30"
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
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
            activeCategory === cat
              ? "bg-gradient-to-r from-accent-amber to-accent-orange text-white border-transparent shadow-md shadow-accent-amber/20"
              : "bg-card text-text-secondary border-border-subtle hover:text-foreground hover:border-accent-amber/30"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
