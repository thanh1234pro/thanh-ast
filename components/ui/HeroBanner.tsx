import { ArrowRight, Target, ShieldCheck, Truck, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-accent-amber/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-accent-orange/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-amber/3 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-amber/20 bg-accent-amber/5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-xs font-medium text-accent-amber tracking-wide">
              CHẤT LƯỢNG CAO — UY TÍN — GIÁ TỐT TẠI HUẾ &amp; TOÀN QUỐC
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-6 animate-slide-up">
            Phụ Kiện <span className="gradient-text">Slingshot Fishing</span>
            <br />
            <span className="text-foreground/90 font-bold text-2xl sm:text-3xl lg:text-4xl">
              Kính Phân Cực &amp; Dây Thun Cao Cấp
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mb-10 animate-slide-up stagger-2">
            Chuyên cung cấp phụ kiện <span className="text-foreground font-medium">Slingshot Fishing</span> chuyên nghiệp, các dòng <span className="text-foreground font-medium">kính phân cực</span> cao cấp chống chói, <span className="text-foreground font-medium">dây thun tròn &amp; dẹp</span> độ đàn hồi vượt trội. Nhận <span className="text-accent-amber font-medium">Order hàng nội địa Trung Quốc</span> theo yêu cầu nhanh chóng, uy tín.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14 animate-slide-up stagger-3">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-amber to-accent-orange text-white font-semibold shadow-lg shadow-accent-amber/20 hover:shadow-xl hover:shadow-accent-amber/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Xem sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://zalo.me/0983087375"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-default text-text-secondary hover:text-foreground hover:border-accent-amber/40 hover:bg-white/5 transition-all duration-300 font-medium"
            >
              Tư vấn &amp; Order Zalo
            </a>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 sm:gap-4 animate-slide-up stagger-4">
            {[
              { icon: Target, label: "Độ chính xác & bền bỉ" },
              { icon: Sparkles, label: "Nhận Order TQ theo yêu cầu" },
              { icon: ShieldCheck, label: "Hàng chuẩn — Giá tốt" },
              { icon: Truck, label: "Giao hàng toàn quốc" },
            ].map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary bg-card/70 border border-border-subtle/80 px-3.5 py-2 rounded-xl backdrop-blur-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-accent-amber/10 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="w-3.5 h-3.5 text-accent-amber" />
                </div>
                <span>{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
