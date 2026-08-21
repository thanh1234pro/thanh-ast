import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-border-subtle/30 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">🎯</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Trang không tồn tại
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
          Hãy quay lại trang chủ để tiếp tục mua sắm.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-amber to-accent-orange text-white font-semibold shadow-lg shadow-accent-amber/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-secondary hover:text-foreground hover:border-accent-amber/40 transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
