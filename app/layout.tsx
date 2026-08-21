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
  metadataBase: new URL("https://thanhast.com"),
  title: {
    default: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực Cao Cấp",
    template: "%s | Thạnh AST",
  },
  description:
    "Thạnh AST chuyên cung cấp phụ kiện Slingshot Fishing, các dòng kính phân cực câu cá, dây thun tròn & dẹp cao cấp, nhận Order nội địa Trung Quốc uy tín. Giao hàng toàn quốc, liên hệ Zalo 0983 087 375.",
  keywords: [
    "Slingshot Fishing",
    "phụ kiện Slingshot",
    "kính phân cực",
    "kính phân cực câu cá",
    "dây thun ná cao su",
    "dây thun tròn",
    "dây thun dẹp",
    "order hàng Trung Quốc",
    "order trung quốc",
    "Thạnh AST",
    "thanhast",
    "ná cao su",
  ],
  authors: [{ name: "Thạnh AST", url: "https://thanhast.com" }],
  creator: "Thạnh AST",
  publisher: "Thạnh AST",
  alternates: {
    canonical: "https://thanhast.com",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/logo.jpeg" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://thanhast.com",
    siteName: "Thạnh AST",
    title: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực Cao Cấp",
    description:
      "Thạnh AST chuyên phụ kiện Slingshot Fishing, các dòng kính phân cực, dây thun tròn & dẹp cao cấp, nhận Order nội địa Trung Quốc uy tín. Giao hàng toàn quốc.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 800,
        height: 800,
        alt: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực",
      },
      {
        url: "/logo.jpeg",
        width: 1080,
        height: 1080,
        alt: "Thạnh AST Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thạnh AST — Phụ Kiện Slingshot Fishing & Kính Phân Cực Cao Cấp",
    description:
      "Thạnh AST chuyên phụ kiện Slingshot Fishing, các dòng kính phân cực, dây thun tròn & dẹp cao cấp, nhận Order nội địa Trung Quốc uy tín. Giao hàng toàn quốc.",
    images: ["/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Thạnh AST",
  description:
    "Phụ Kiện Slingshot Fishing & Kính Phân Cực Cao Cấp, nhận Order nội địa Trung Quốc uy tín.",
  url: "https://thanhast.com",
  logo: "https://thanhast.com/logo.jpeg",
  image: "https://thanhast.com/logo.jpeg",
  telephone: "0983087375",
  priceRange: "₫₫",
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
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
