"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import ProductImage from "./ProductImage";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const validImages = images.filter((img) => img && img.startsWith("http"));

  if (validImages.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-card border border-border-subtle flex items-center justify-center">
        <ProductImage src="" alt={productName} />
      </div>
    );
  }

  const goToPrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  const goToNext = () =>
    setActiveIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border-subtle group">
        <ProductImage
          src={validImages[activeIndex]}
          alt={`${productName} - Ảnh ${activeIndex + 1}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500"
          priority
        />

        {/* Navigation arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full glass text-xs font-medium text-white">
            {activeIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                activeIndex === idx
                  ? "border-accent-amber shadow-md shadow-accent-amber/20"
                  : "border-border-subtle hover:border-border-default opacity-60 hover:opacity-100"
              )}
            >
              <ProductImage
                src={img}
                alt={`${productName} - Thumbnail ${idx + 1}`}
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
