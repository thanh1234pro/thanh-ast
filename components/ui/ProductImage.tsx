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
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-surface text-text-muted/40 p-4">
        <Crosshair className="w-10 h-10 mb-2 opacity-50" />
        <span className="text-xs text-center text-text-muted/60 font-medium">
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
