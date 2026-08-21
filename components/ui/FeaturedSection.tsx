"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import ProductGrid from "@/components/ui/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import { Sparkles } from "lucide-react";

interface FeaturedSectionProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (products.length === 0) return null;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("featured-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="featured-products" className="py-10 sm:py-16 scroll-mt-24">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent-amber" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-foreground">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm mt-0.5">
              Được lựa chọn kỹ lưỡng, chất lượng hàng đầu ({products.length} sản phẩm)
            </p>
          </div>
        </div>

        {totalPages > 1 && (
          <span className="hidden sm:inline-block text-xs font-medium text-text-muted px-3 py-1 rounded-full bg-white border border-border-subtle shadow-xs">
            Trang {safeCurrentPage} / {totalPages}
          </span>
        )}
      </div>

      <ProductGrid products={currentProducts} />

      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Divider */}
      <div className="mt-20 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <div className="w-2 h-2 rounded-full bg-accent-amber/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>
    </section>
  );
}
