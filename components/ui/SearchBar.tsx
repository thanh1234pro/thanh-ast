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
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-4 h-4 text-text-muted" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-2.5 rounded-lg bg-white border border-border-subtle text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-orange/60 focus:ring-2 focus:ring-accent-orange/15 shadow-xs transition-all duration-200"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
