"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import ProductImage from "./ProductImage";
import BuyZaloButton from "./BuyZaloButton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = calculateDiscount(product.price, product.original_price);
  const imageSrc = product.images?.[0] || "";

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-xl overflow-hidden border border-border-subtle bg-card card-hover animate-fade-in shadow-xs hover:shadow-md",
        `stagger-${Math.min((index % 8) + 1, 8)}`
      )}
      style={{ opacity: 0 }}
    >
      <Link href={`/product/${product.slug}`} className="block flex-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <ProductImage
            src={imageSrc}
            alt={product.name}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover (desktop) */}
          <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-gray-900 shadow-md">
                <Eye className="w-3.5 h-3.5" />
                Xem chi tiết
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5">
            {product.featured && (
              <span className="badge-featured text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                ⭐ Nổi bật
              </span>
            )}
            {discount > 0 && (
              <span className="badge-sale text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5 sm:p-4 pb-1.5 sm:pb-2">
          {/* Category */}
          {product.category && (
            <span className="text-[10px] sm:text-xs font-medium text-accent-amber uppercase tracking-wider line-clamp-1">
              {product.category}
            </span>
          )}

          {/* Name */}
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent-orange transition-colors duration-200 min-h-[2rem] sm:min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline gap-1 sm:gap-2">
            <span className="text-sm sm:text-base md:text-lg font-bold text-accent-orange">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="text-[10px] sm:text-xs text-text-muted line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Button: Mua hàng (Zalo) */}
      <div className="p-2.5 sm:p-4 pt-1 sm:pt-1">
        <BuyZaloButton
          product={product}
          className="w-full text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4"
          text="Mua hàng"
        />
      </div>
    </div>
  );
}
