"use client";

import { useState, useMemo, useCallback } from "react";
import { Product } from "@/lib/types";
import ProductGrid from "@/components/ui/ProductGrid";
import CategoryFilter from "@/components/ui/CategoryFilter";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import { useIsMobile } from "@/lib/useIsMobile";

interface ProductsSectionProps {
  products: Product[];
  categories: string[];
}

const DESKTOP_ITEMS_PER_PAGE = 12;
const MOBILE_ITEMS_PER_PAGE = 8;

export default function ProductsSection({
  products,
  categories,
}: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile(640);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to first page when category changes
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  // Pagination calculations
  const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, startIndex, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="products" className="scroll-mt-24">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-foreground">
            Tất Cả Sản Phẩm
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary">
            Khám phá {products.length} sản phẩm chất lượng cao
          </p>
        </div>

        {totalPages > 1 && (
          <span className="hidden sm:inline-block text-xs font-medium text-text-muted px-3 py-1 rounded-full bg-white border border-border-subtle shadow-xs">
            Trang {safeCurrentPage} / {totalPages}
          </span>
        )}
      </div>

      {/* Filters */}
      <div
        id="categories"
        className="flex flex-col sm:flex-row gap-4 mb-8 scroll-mt-24"
      >
        <div className="flex-1 overflow-x-auto">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results count */}
      {(activeCategory || searchQuery) && (
        <p className="text-sm text-text-muted mb-6">
          Hiển thị {filteredProducts.length} / {products.length} sản phẩm
          {activeCategory && (
            <span>
              {" "}
              trong <span className="text-accent-amber font-medium">{activeCategory}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}
              cho &ldquo;<span className="text-accent-amber font-medium">{searchQuery}</span>&rdquo;
            </span>
          )}
        </p>
      )}

      {/* Product grid */}
      <ProductGrid products={paginatedProducts} />

      {/* Pagination */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
