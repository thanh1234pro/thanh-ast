"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  // { href: "/", label: "Trang chủ" },
  { href: "/#products", label: "Sản phẩm" },
  { href: "/#featured-products", label: "Sản phẩm nổi bật" },
  // { href: "/#categories", label: "Danh mục" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-border-subtle"
          : "bg-white/80 backdrop-blur-sm py-3.5 border-b border-border-subtle/50"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/logo.jpeg"
                alt="Thạnh AST Logo"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-xs group-hover:shadow-accent-orange/20 transition-all duration-300 border border-border-subtle"
                priority
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                Thạnh <span className="gradient-text">AST</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-text-muted uppercase tracking-widest leading-none font-medium">
                Phụ Kiện Slingshot & Kính
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://zalo.me/0983087375"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4ca6e3] hover:bg-[#d45d52] text-white text-sm font-semibold shadow-xs transition-all duration-200"
            >
              Liên hệ Zalo
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://zalo.me/0983087375"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#4ca6e3] hover:bg-[#d45d52] text-white text-xs font-semibold"
            >
              Zalo
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen
              ? "max-h-64 opacity-100 mt-3 pb-2"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 pt-3 border-t border-border-subtle">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 mt-1 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-white text-sm font-semibold shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              Xem sản phẩm
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
