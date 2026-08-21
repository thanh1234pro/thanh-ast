import { Product } from "./types";

const DATA_URL = process.env.NEXT_PUBLIC_JSON_DATA_URL || "";

let buildTimeCache: Product[] | null = null;

export async function getProducts(forceRefresh: boolean = false): Promise<Product[]> {
  const isDev = process.env.NODE_ENV === "development";

  // In production / build time, use memory cache to avoid spamming the API
  if (!isDev && !forceRefresh && buildTimeCache) {
    return buildTimeCache;
  }

  try {
    const res = await fetch(DATA_URL, {
      // In dev mode, always fetch fresh data on reload. In prod/build, cache or revalidate.
      cache: isDev || forceRefresh ? "no-store" : "default",
      next: isDev || forceRefresh ? { revalidate: 0 } : { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    // Normalize: ensure id and slug are strings
    const products: Product[] = (Array.isArray(data) ? data : []).map(
      (item: Record<string, unknown>) => ({
        ...item,
        id: String(item.id ?? ""),
        slug: String(item.slug ?? item.id ?? ""),
        name: String(item.name ?? ""),
        category: String(item.category ?? ""),
        price: Number(item.price ?? 0),
        original_price: Number(item.original_price ?? 0),
        images: Array.isArray(item.images) ? item.images.map(String) : [],
        description: String(item.description ?? ""),
        specs:
          item.specs && typeof item.specs === "object"
            ? (item.specs as Record<string, string>)
            : {},
        featured:
          item.featured === true ||
          item.featured === 1 ||
          String(item.featured).toLowerCase() === "true",
        out_of_stock:
          item.out_of_stock === true ||
          item.out_of_stock === 1 ||
          item.out_of_stock === "1" ||
          String(item.out_of_stock).toLowerCase() === "true",
        pre_order:
          item.pre_order !== undefined && item.pre_order !== null && !isNaN(Number(item.pre_order))
            ? Number(item.pre_order)
            : 0,
      })
    );

    buildTimeCache = products;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return buildTimeCache || [];
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(categories);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  // If no products are explicitly featured, return top products for featured showcase
  return featured.length > 0 ? featured : products.slice(0, 16);
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit: number = 4
): Promise<Product[]> {
  const products = await getProducts();
  const related = products
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit);

  // If not enough related products in same category, fill with others
  if (related.length < limit) {
    const others = products
      .filter(
        (p) =>
          p.slug !== excludeSlug && !related.some((r) => r.slug === p.slug)
      )
      .slice(0, limit - related.length);
    related.push(...others);
  }

  return related;
}
