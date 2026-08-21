"use client";

import React from "react";
import { Product } from "@/lib/types";
import { useZaloOrder } from "@/context/ZaloOrderContext";
import ZaloIcon from "./icons/ZaloIcon";
import { cn } from "@/lib/utils";

interface BuyZaloButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function BuyZaloButton({
  product,
  className,
  size = "md",
  text = "Mua hàng",
}: BuyZaloButtonProps) {
  const { openZaloOrder } = useZaloOrder();

  const sizeClasses = {
    sm: "py-2 px-3 text-xs gap-1.5",
    md: "py-2.5 px-4 text-sm gap-2",
    lg: "py-4 px-8 text-lg font-bold gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <button
      type="button"
      onClick={() => openZaloOrder(product)}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-[#0068FF] hover:bg-[#0055d4] text-white font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer",
        sizeClasses[size],
        className
      )}
    >
      <ZaloIcon className={cn("flex-shrink-0", iconSizes[size])} />
      <span>{text}</span>
    </button>
  );
}
