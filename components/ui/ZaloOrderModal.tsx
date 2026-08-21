"use client";

import React, { useEffect, useState } from "react";
import { useZaloOrder } from "@/context/ZaloOrderContext";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import ProductImage from "./ProductImage";
import ZaloIcon from "./icons/ZaloIcon";
import {
  X,
  Check,
  Copy,
  ExternalLink,
  Phone,
  ImageIcon,
  FileText,
  Sparkles,
  Layers,
} from "lucide-react";

export default function ZaloOrderModal() {
  const {
    isOpen,
    product,
    copiedText,
    isCopied,
    isImageCopied,
    isTextCopied,
    closeZaloOrder,
    copyAll,
    copyImageOnly,
    copyTextOnly,
  } = useZaloOrder();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isCopied || (isImageCopied && isTextCopied)) {
      setToastMessage("Đã sao chép hình ảnh & thông tin sản phẩm!");
    } else if (isImageCopied) {
      setToastMessage("Đã sao chép hình ảnh vào bộ nhớ tạm!");
    } else if (isTextCopied) {
      setToastMessage("Đã sao chép thông tin sản phẩm!");
    }

    if (isCopied || isImageCopied || isTextCopied) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCopied, isImageCopied, isTextCopied]);

  // Handle ESC key and Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZaloOrder();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeZaloOrder]);

  if (!isOpen || !product) return null;

  const discount = calculateDiscount(product.price, product.original_price);
  const imageSrc = product.images?.[0] || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeZaloOrder}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-border-subtle shadow-2xl p-5 sm:p-7 z-10 animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="zalo-modal-title"
      >
        {/* Glowing top border */}
        <div className="sticky -top-5 sm:-top-7 -mx-5 sm:-mx-7 -mt-5 sm:-mt-7 mb-5 h-1 bg-gradient-to-r from-accent-orange via-[#0068FF] to-accent-amber z-20" />

        {/* Close Button */}
        <button
          onClick={closeZaloOrder}
          className="absolute top-4 right-4 p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <ZaloIcon className="w-6 h-6" />
          </div>
          <div>
            <h3
              id="zalo-modal-title"
              className="text-lg sm:text-xl font-bold text-foreground"
            >
              Đặt Mua Nhanh Qua Zalo
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              Tư vấn &amp; chốt đơn trực tiếp với Thạnh AST
            </p>
          </div>
        </div>

        {/* Auto-copy Status Banner */}
        <div className="mb-5 p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Đã tự động sao chép thông tin sản phẩm!
            </div>
            <p className="text-xs text-emerald-900/80 mt-0.5 leading-relaxed">
              Bạn chỉ cần mở Zalo và{" "}
              <strong className="text-emerald-950 font-bold">Dán (Ctrl + V)</strong> vào khung chat để gửi cho shop.
            </p>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-border-subtle flex items-center gap-3.5">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-border-subtle flex-shrink-0 group">
            <ProductImage
              src={imageSrc}
              alt={product.name}
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {product.name}
            </h4>
            <div className="flex flex-wrap items-baseline gap-2 mt-1">
              <span className="text-base font-bold text-accent-orange">
                {formatPrice(product.price)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
              {product.out_of_stock && (
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                  Hết hàng
                </span>
              )}
              {typeof product.pre_order === "number" && product.pre_order > 0 && (
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium">
                  Cần đặt trước {product.pre_order} ngày
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Copy Action Buttons (Image & Text) */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            type="button"
            onClick={copyImageOnly}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-border-subtle hover:border-accent-orange/40 text-xs font-medium text-text-secondary hover:text-foreground transition-all cursor-pointer"
          >
            {isImageCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Đã chép ảnh!</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-accent-orange" />
                <span>Sao chép ảnh</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={copyTextOnly}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-border-subtle hover:border-accent-orange/40 text-xs font-medium text-text-secondary hover:text-foreground transition-all cursor-pointer"
          >
            {isTextCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Đã chép chữ!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-accent-orange" />
                <span>Sao chép chữ</span>
              </>
            )}
          </button>
        </div>

        {/* Copied Text Preview Box */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
            <span>Nội dung đã chép vào bộ nhớ:</span>
            <button
              onClick={copyTextOnly}
              className="inline-flex items-center gap-1 text-accent-orange hover:text-accent-orange/80 font-medium transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Chép lại</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-border-subtle text-xs text-slate-700 leading-relaxed select-all whitespace-pre-line break-all max-h-32 overflow-y-auto font-mono">
            {copiedText}
          </div>
        </div>

        {/* 3 Step Instruction Guide */}
        <div className="mb-6 space-y-2 text-xs text-text-secondary bg-slate-50 p-3 rounded-xl border border-border-subtle">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-orange-100 text-accent-orange font-bold text-xs flex items-center justify-center flex-shrink-0">
              1
            </span>
            <span>Hình ảnh &amp; thông tin sản phẩm đã nằm trong bộ nhớ tạm.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0068FF] font-bold text-xs flex items-center justify-center flex-shrink-0">
              2
            </span>
            <span>
              Bấm nút <strong className="text-foreground font-semibold">"Mở Zalo Nhắn Tin"</strong> bên dưới.
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
              3
            </span>
            <span>
              Nhấn <strong className="text-foreground font-semibold">Ctrl + V</strong> (hoặc chạm giữ &gt; Dán) và gửi ngay cho shop.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="https://zalo.me/0983087375"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeZaloOrder}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#0068FF] hover:bg-[#0055d4] text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            <ZaloIcon className="w-5 h-5 flex-shrink-0" />
            <span>Mở Zalo Nhắn Tin Ngay</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
          </a>

          <div className="flex items-center justify-between pt-1 text-xs text-text-muted">
            <a
              href="tel:0983087375"
              className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent-amber transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-accent-amber" />
              Hotline: <span className="font-semibold text-foreground">0983 087 375</span>
            </a>
            <button
              onClick={closeZaloOrder}
              className="text-text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
