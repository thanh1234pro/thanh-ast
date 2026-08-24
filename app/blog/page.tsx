import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowLeft, ShoppingBag } from "lucide-react";
import { getBlogs } from "@/lib/blogs";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Kinh Nghiệm & Chia Sẻ | Thạnh AST",
  description:
    "Tổng hợp các bài viết chia sẻ kinh nghiệm, hướng dẫn bắn ná cao su Slingshot, cách chọn kính phân cực và bảo quản phụ kiện chuyên nghiệp từ Thạnh AST.",
  openGraph: {
    title: "Kinh Nghiệm & Chia Sẻ | Thạnh AST",
    description:
      "Tổng hợp các bài viết chia sẻ kinh nghiệm, hướng dẫn bắn ná cao su Slingshot, cách chọn kính phân cực và bảo quản phụ kiện chuyên nghiệp.",
    type: "website",
    locale: "vi_VN",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Blogs" }]} />
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Góc Chia Sẻ Đam Mê</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Kinh Nghiệm & <span className="gradient-text">Chia Sẻ</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Nơi tổng hợp kiến thức, kỹ thuật bắn ná Slingshot, bí quyết chọn kính phân cực và mẹo bảo quản phụ kiện chuẩn từ Thạnh AST.
          </p>
        </div>

        {/* Blog Posts Grid or Empty State */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-surface border border-border-subtle rounded-3xl max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Chưa có bài viết nào
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto mb-6">
              Nội dung chia sẻ kinh nghiệm đang được đội ngũ Thạnh AST cập nhật. Mời bạn quay lại sau hoặc tham khảo các sản phẩm hiện có!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-foreground text-sm font-semibold transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Về trang chủ
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber hover:opacity-95 text-white text-sm font-semibold shadow-xs transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                Xem sản phẩm
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
