import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(
  price: number,
  originalPrice: number
): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
