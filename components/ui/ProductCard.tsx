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
        "group flex flex-col justify-between rounded-xl overflow-hidden border border-border-subtle bg-card card-hover animate-fade-in",
        `stagger-${Math.min((index % 8) + 1, 8)}`
      )}
      style={{ opacity: 0 }}
    >
      <Link href={`/product/${product.slug}`} className="block flex-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <ProductImage
            src={imageSrc}
            alt={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-white">
                <Eye className="w-4 h-4" />
                Xem chi tiết
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && <span className="badge-featured">⭐ Nổi bật</span>}
            {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pb-2">
          {/* Category */}
          {product.category && (
            <span className="text-xs font-medium text-accent-amber/80 uppercase tracking-wider">
              {product.category}
            </span>
          )}

          {/* Name */}
          <h3 className="mt-1.5 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent-amber transition-colors duration-200 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold gradient-text">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Button: Mua hàng (Zalo) */}
      <div className="p-4 pt-1">
        <BuyZaloButton product={product} className="w-full" text="Mua hàng" />
      </div>
    </div>
  );
}
