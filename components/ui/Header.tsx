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
          ? "glass-strong shadow-lg py-3"
          : "bg-transparent py-5"
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
                className="w-10 h-10 rounded-xl object-cover shadow-lg group-hover:shadow-accent-amber/30 transition-shadow duration-300 border border-border-subtle"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                Thạnh <span className="gradient-text">AST</span>
              </h1>
              <p className="text-[10px] text-text-muted uppercase tracking-widest leading-none">
                Premium Slingshots
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen
              ? "max-h-64 opacity-100 mt-4"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 py-3 border-t border-border-subtle">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-accent-amber to-accent-orange text-white text-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              Mua ngay
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
