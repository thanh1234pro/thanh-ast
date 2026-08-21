import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // JSON-LD BreadcrumbList structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
        <Link
          href="/"
          className="text-text-muted hover:text-accent-amber transition-colors"
          aria-label="Trang chủ"
        >
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-text-muted/50" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-text-muted hover:text-accent-amber transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary font-medium line-clamp-1">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
