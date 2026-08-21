"use client";

import { useState } from "react";
import Image from "next/image";
import { Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes,
  className,
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // If source is missing or broken placeholder like link1.jp
  const isInvalidUrl =
    !src ||
    !src.startsWith("http") ||
    src.includes("link1.jp") ||
    src.includes("link2.jpg");

  if (hasError || isInvalidUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4">
        <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 mb-2 opacity-40 text-slate-500" />
        <span className="text-[11px] sm:text-xs text-center text-slate-500 font-medium">
          Thạnh AST
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized
      onError={() => setHasError(true)}
      className={cn(className)}
    />
  );
}
