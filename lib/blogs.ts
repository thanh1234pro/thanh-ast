import { BlogPost } from "@/types/blog";

const BLOGS_API_URL = process.env.NEXT_PUBLIC_BLOGS_API_URL || "";

let buildTimeBlogsCache: BlogPost[] | null = null;

/**
 * Fetch and return all published blog posts from the API with ISR (revalidate: 60).
 */
export async function getBlogs(forceRefresh: boolean = false): Promise<BlogPost[]> {
  const isDev = process.env.NODE_ENV === "development";

  if (!BLOGS_API_URL) {
    console.warn("NEXT_PUBLIC_BLOGS_API_URL is not defined in environment variables.");
    return [];
  }

  // Use memory cache during production build if available
  if (!isDev && !forceRefresh && buildTimeBlogsCache) {
    return buildTimeBlogsCache;
  }

  try {
    const res = await fetch(BLOGS_API_URL, {
      cache: isDev || forceRefresh ? "no-store" : "default",
      next: isDev || forceRefresh ? { revalidate: 0 } : { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    const rawList = Array.isArray(data) ? data : [];

    const blogs: BlogPost[] = rawList
      .map((item: Record<string, unknown>) => {
        const id = String(item.id ?? item._id ?? "");
        const slug = String(item.slug ?? "").trim();

        return {
          id: id || slug,
          slug,
          title: String(item.title ?? ""),
          summary: String(item.summary ?? item.description ?? ""),
          content: String(item.content ?? ""),
          thumbnail: String(item.thumbnail ?? item.image ?? item.thumbnail_url ?? ""),
          author: String(item.author ?? "Thạnh AST"),
          created_at: String(item.created_at ?? item.createdAt ?? item.date ?? new Date().toISOString()),
          published:
            item.published === true ||
            item.published === 1 ||
            item.published === "1" ||
            String(item.published).toLowerCase() === "true",
        };
      })
      .filter((post: BlogPost) => post.published && post.slug.length > 0);

    // Sort by created_at descending (newest first)
    blogs.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime() || 0;
      const timeB = new Date(b.created_at).getTime() || 0;
      return timeB - timeA;
    });

    buildTimeBlogsCache = blogs;
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs from API:", error);
    return buildTimeBlogsCache || [];
  }
}

/**
 * Fetch a single blog post strictly by its unique slug.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!slug) return undefined;
  const blogs = await getBlogs();
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  return blogs.find((b) => b.slug.trim().toLowerCase() === normalizedSlug);
}

/**
 * Helper to fetch recent or related blogs for sidebars and footer suggestions.
 */
export async function getRecentBlogs(
  limit: number = 3,
  excludeSlug?: string
): Promise<BlogPost[]> {
  const blogs = await getBlogs();
  return blogs
    .filter((post) => (excludeSlug ? post.slug !== excludeSlug : true))
    .slice(0, limit);
}
