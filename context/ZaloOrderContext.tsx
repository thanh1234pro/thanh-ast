"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ZaloOrderContextType {
  isOpen: boolean;
  product: Product | null;
  copiedText: string;
  isCopied: boolean;
  isImageCopied: boolean;
  isTextCopied: boolean;
  openZaloOrder: (product: Product) => void;
  closeZaloOrder: () => void;
  copyAll: () => Promise<void>;
  copyImageOnly: () => Promise<void>;
  copyTextOnly: () => Promise<void>;
}

const ZaloOrderContext = createContext<ZaloOrderContextType | undefined>(
  undefined
);

// Helper to convert image URL to PNG Blob for ClipboardItem
async function fetchImagePngBlob(url: string): Promise<Blob | null> {
  if (typeof window === "undefined" || !url) return null;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => resolve(blob), "image/png");
      } catch (err) {
        console.warn("Canvas blob conversion failed (likely CORS):", err);
        resolve(null);
      }
    };

    img.onerror = () => {
      // Try direct fetch if standard load fails
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          if (blob.type === "image/png") return resolve(blob);
          const objUrl = URL.createObjectURL(blob);
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = fallbackImg.naturalWidth;
            canvas.height = fallbackImg.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);
            ctx.drawImage(fallbackImg, 0, 0);
            URL.revokeObjectURL(objUrl);
            canvas.toBlob((b) => resolve(b), "image/png");
          };
          fallbackImg.onerror = () => {
            URL.revokeObjectURL(objUrl);
            resolve(null);
          };
          fallbackImg.src = objUrl;
        })
        .catch(() => resolve(null));
    };

    img.src = url;
  });
}

export function ZaloOrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [copiedText, setCopiedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isImageCopied, setIsImageCopied] = useState(false);
  const [isTextCopied, setIsTextCopied] = useState(false);

  const generateMessage = useCallback((prod: Product) => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://thanhast.vn";
    const productUrl = `${origin}/product/${prod.slug}`;
    const imageUrl = prod.images?.[0] || "";
    const fullImageUrl = imageUrl
      ? imageUrl.startsWith("http")
        ? imageUrl
        : `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
      : "";

    const statusNote = prod.out_of_stock
      ? "\n• Tình trạng: Hết hàng (Cần tư vấn / Đặt trước)"
      : typeof prod.pre_order === "number" && prod.pre_order > 0
        ? `\n• Tình trạng: Cần đặt trước (${prod.pre_order} ngày)`
        : "";

    return `Chào Shop Thạnh AST, mình muốn tư vấn & đặt mua sản phẩm:
• Tên sản phẩm: ${prod.name}
• Giá: ${formatPrice(prod.price)}${statusNote}
• Link chi tiết: ${productUrl}${fullImageUrl ? `\n• Link ảnh sản phẩm: ${fullImageUrl}` : ""}`;
  }, []);

  const fallbackCopyText = (text: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      return true;
    } catch {
      return false;
    }
  };

  const copyTextOnly = useCallback(async () => {
    if (!copiedText) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(copiedText);
      } else {
        fallbackCopyText(copiedText);
      }
      setIsTextCopied(true);
      setTimeout(() => setIsTextCopied(false), 2000);
    } catch {
      fallbackCopyText(copiedText);
      setIsTextCopied(true);
      setTimeout(() => setIsTextCopied(false), 2000);
    }
  }, [copiedText]);

  const copyImageOnly = useCallback(async () => {
    const imageUrl = product?.images?.[0];
    if (!imageUrl) return;

    try {
      const imageBlob = await fetchImagePngBlob(imageUrl);
      if (imageBlob && navigator?.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": imageBlob,
          }),
        ]);
        setIsImageCopied(true);
        setTimeout(() => setIsImageCopied(false), 2000);
      }
    } catch (err) {
      console.warn("Failed to copy image to clipboard:", err);
    }
  }, [product]);

  const copyAll = useCallback(async () => {
    if (!copiedText) return;

    const imageUrl = product?.images?.[0];
    let imageBlob: Blob | null = null;

    if (imageUrl) {
      imageBlob = await fetchImagePngBlob(imageUrl);
    }

    try {
      if (navigator?.clipboard?.write) {
        const clipboardItems: Record<string, Blob> = {
          "text/plain": new Blob([copiedText], { type: "text/plain" }),
        };

        if (imageBlob) {
          clipboardItems["image/png"] = imageBlob;
        }

        await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);
        setIsCopied(true);
        setIsTextCopied(true);
        if (imageBlob) setIsImageCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          setIsTextCopied(false);
          setIsImageCopied(false);
        }, 2500);
        return;
      }
    } catch (err) {
      console.warn("Rich clipboard copy failed, falling back to text copy:", err);
    }

    // Fallback: copy text
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(copiedText);
    } else {
      fallbackCopyText(copiedText);
    }
    setIsCopied(true);
    setIsTextCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setIsTextCopied(false);
    }, 2500);
  }, [copiedText, product]);

  const openZaloOrder = useCallback(
    (prod: Product) => {
      const text = generateMessage(prod);
      setProduct(prod);
      setCopiedText(text);
      setIsOpen(true);
      setIsCopied(true);
      setIsTextCopied(true);
      setIsImageCopied(false);

      // Directly copy text containing product info, price, product URL & image URL
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          fallbackCopyText(text);
        });
      } else {
        fallbackCopyText(text);
      }
    },
    [generateMessage]
  );

  const closeZaloOrder = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ZaloOrderContext.Provider
      value={{
        isOpen,
        product,
        copiedText,
        isCopied,
        isImageCopied,
        isTextCopied,
        openZaloOrder,
        closeZaloOrder,
        copyAll,
        copyImageOnly,
        copyTextOnly,
      }}
    >
      {children}
    </ZaloOrderContext.Provider>
  );
}

export function useZaloOrder() {
  const context = useContext(ZaloOrderContext);
  if (!context) {
    throw new Error("useZaloOrder must be used within a ZaloOrderProvider");
  }
  return context;
}
