import { getProducts, getFeaturedProducts, getCategories } from "@/lib/api";
import HeroBanner from "@/components/ui/HeroBanner";
import FeaturedSection from "@/components/ui/FeaturedSection";
import ProductsSection from "@/components/ui/ProductsSection";

export default async function HomePage() {
  const [products, featuredProducts, categories] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Products with Pagination (8 per page) */}
        <FeaturedSection products={featuredProducts} />

        {/* All Products with Filters & Pagination (12 per page) */}
        <section className="pb-20">
          <ProductsSection products={products} categories={categories} />
        </section>
      </div>
    </>
  );
}
