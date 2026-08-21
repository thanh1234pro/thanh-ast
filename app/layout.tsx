import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { ZaloOrderProvider } from "@/context/ZaloOrderContext";
import ZaloOrderModal from "@/components/ui/ZaloOrderModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực Cao Cấp",
    template: "%s | Thạnh AST",
  },
  description:
    "Thạnh AST chuyên phụ kiện Slingshot Fishing, các dòng kính phân cực, dây thun tròn & dẹp cao cấp, nhận Order nội địa Trung Quốc uy tín. Giao hàng toàn quốc.",
  keywords: [
    "Slingshot Fishing",
    "phụ kiện Slingshot",
    "kính phân cực",
    "dây thun ná cao su",
    "dây thun tròn",
    "dây thun dẹp",
    "order trung quốc",
    "Thạnh AST",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Thạnh AST",
    title: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực",
    description:
      "Chuyên phụ kiện Slingshot Fishing, các dòng kính phân cực, dây thun tròn & dẹp, nhận Order hàng Trung Quốc uy tín.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ZaloOrderProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <ZaloOrderModal />
        </ZaloOrderProvider>
      </body>
    </html>
  );
}
