import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  PhoneCall,
  ShoppingBag,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { getBlogs, getBlogBySlug, getRecentBlogs } from "@/lib/blogs";
import { formatDate } from "@/lib/utils";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BlogCard from "@/components/BlogCard";

export const revalidate = 1800;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Không tìm thấy bài viết | Thạnh AST",
      description: "Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanhast.com";
  const postUrl = `${siteUrl}/blog/${blog.slug}`;
  const images = blog.thumbnail
    ? [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ]
    : [];

  return {
    title: `${blog.title} | Thạnh AST Blog`,
    description: blog.summary || `${blog.title} - Chia sẻ kinh nghiệm từ Thạnh AST.`,
    authors: [{ name: blog.author || "Thạnh AST" }],
    openGraph: {
      title: blog.title,
      description: blog.summary || `${blog.title} - Chia sẻ kinh nghiệm từ Thạnh AST.`,
      url: postUrl,
      siteName: "Thạnh AST",
      images,
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author || "Thạnh AST"],
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const recentBlogs = await getRecentBlogs(3, blog.slug);
  const formattedDate = formatDate(blog.created_at);

  // JSON-LD structured data for Article SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.summary,
    image: blog.thumbnail ? [blog.thumbnail] : [],
    datePublished: blog.created_at,
    author: {
      "@type": "Person",
      name: blog.author || "Thạnh AST",
    },
    publisher: {
      "@type": "Organization",
      name: "Thạnh AST",
      logo: {
        "@type": "ImageObject",
        url: "https://thanhast.com/logo.jpeg",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Blogs", href: "/blog" },
                { label: blog.title },
              ]}
            />
          </div>

          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tất cả bài viết</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kinh Nghiệm Slingshot</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-text-muted pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-orange/15 text-accent-orange flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium text-foreground">
                  {blog.author || "Thạnh AST"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent-amber" />
                <span>{formattedDate || "Gần đây"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-amber" />
                <span>3 phút đọc</span>
              </div>
            </div>
          </header>

          {/* Summary Callout (if available) */}
          {blog.summary && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-l-4 border-accent-orange mb-8 text-text-secondary text-base leading-relaxed font-medium">
              {blog.summary}
            </div>
          )}

          {/* Featured Thumbnail */}
          {blog.thumbnail && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 border border-border-subtle shadow-md bg-slate-100">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Main HTML Content */}
          <article
            className="blog-prose mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Post Action Footer / Share */}
          <div className="pt-6 pb-8 border-t border-b border-border-subtle flex flex-wrap items-center justify-between gap-4 mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-foreground text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách</span>
            </Link>

            <a
              href={`https://zalo.me/0983087375`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4ca6e3] hover:bg-[#3b93ce] text-white text-sm font-semibold transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Tư vấn qua Zalo</span>
            </a>
          </div>

          {/* CTA Banner Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 mb-16 shadow-xl border border-slate-700">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Thạnh AST Slingshot</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Bạn Cần Tư Vấn Phụ Kiện Slingshot & Kính?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Chuyên cung cấp phụ kiện ná cao su chính hãng, dây thun dẹp/tròn cao cấp, kính phân cực câu cá & săn bắn. Nhận order theo yêu cầu!
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://zalo.me/0983087375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber hover:opacity-95 text-white font-bold text-sm shadow-md transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4" />
                  Chat Zalo: 0983.087.375
                </a>
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Xem Sản Phẩm
                </Link>
              </div>
            </div>
            {/* Background decorative glow */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-80 h-80 rounded-full bg-accent-orange/20 blur-3xl pointer-events-none" />
          </section>

          {/* Related / Recent Blog Posts */}
          {recentBlogs.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent-orange" />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Bài Viết Liên Quan
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-accent-orange hover:text-accent-amber transition-colors"
                >
                  Xem tất cả →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBlogs.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
