import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "./icons/FacebookIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import ZaloIcon from "./icons/ZaloIcon";
import TiktokIcon from "./icons/TiktokIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border-subtle bg-surface">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-accent-amber/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.jpeg"
                alt="Thạnh AST Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover border border-border-subtle"
              />
              <div>
                <span className="text-lg font-bold text-foreground">
                  Thạnh <span className="gradient-text">AST</span>
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mt-3">
              Chuyên phụ kiện Slingshot Fishing, Các dòng kính phân cực, Dây thun tròn & dẹp, Nhận Oder TQ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Trang chủ" },
                { href: "/#products", label: "Tất cả sản phẩm" },
                { href: "/#categories", label: "Danh mục" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-accent-amber flex-shrink-0" />
                <span>0983087375</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent-amber flex-shrink-0" />
                <span>vothuatvadoisong@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
                <span>Huế, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Theo dõi chúng tôi
            </h3>
            <div className="flex gap-3">
              <a
                href="https://zalo.me/0983087375"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-slate-100 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-[#0068FF] transition-all duration-200 hover:border-[#0068FF]/40 shadow-xs"
              >
                <ZaloIcon className="w-5 h-5" />
              </a>
              {[
                { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/thanh1234pro" },
                { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@THANHAST" },
                { icon: TiktokIcon, label: "TikTok", href: "https://www.tiktok.com/@thanhast" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-slate-100 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-orange transition-all duration-200 hover:border-accent-orange/40 shadow-xs"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} Thạnh AST. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Thiết kế & phát triển với ❤️ tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
