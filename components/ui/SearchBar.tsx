"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Tìm kiếm sản phẩm...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounce search
  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => onSearch(value), 300);
      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(query);
    return cleanup;
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-full sm:w-72 md:w-80 flex-shrink-0">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none z-10" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-border-subtle text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-orange/60 focus:ring-2 focus:ring-accent-orange/15 shadow-xs transition-all duration-200 leading-normal"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors p-1"
          aria-label="Xóa tìm kiếm"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
