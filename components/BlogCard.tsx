"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);

  const formattedDate = formatDate(post.created_at);

  return (
    <article className="group flex flex-col bg-card border border-border-subtle rounded-2xl overflow-hidden hover:border-accent-amber/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Thumbnail Container */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        {post.thumbnail && !imgError ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            onError={() => setImgError(true)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-text-muted p-4">
            <BookOpen className="w-10 h-10 text-accent-amber/60 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-text-secondary">Thạnh AST Blog</span>
          </div>
        )}
        {/* <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-accent-orange border border-white/40 shadow-xs">
            Kinh nghiệm
          </span>
        </div> */}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-amber" />
            <span>{formattedDate || "Gần đây"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-accent-amber" />
            <span className="line-clamp-1">{post.author || "Thạnh AST"}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-accent-orange transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
          {post.summary || "Khám phá ngay bài viết chia sẻ kinh nghiệm chọn và sử dụng phụ kiện Slingshot từ Thạnh AST."}
        </p>

        {/* Action Button */}
        <div className="pt-3 border-t border-border-subtle/60 flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange group-hover:text-accent-amber transition-colors duration-200"
          >
            <span>Đọc tiếp</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
}
