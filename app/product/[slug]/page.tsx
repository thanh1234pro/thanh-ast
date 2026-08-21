import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/api";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import ImageGallery from "@/components/ui/ImageGallery";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/ui/ProductGrid";
import BuyZaloButton from "@/components/ui/BuyZaloButton";
import {
  Tag,
  Package,
  ShieldCheck,
  Truck,
  Star,
  ArrowLeft,
  Phone,
} from "lucide-react";
import Link from "next/link";

// Generate static params for all products at build time (SSG)
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic SEO metadata per product
export async function generateMetadata(
  props: PageProps<"/product/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Sản phẩm không tồn tại" };
  }

  const title = `${product.name} — Ná Cao Su Chất Lượng`;
  const description =
    product.description ||
    `Mua ${product.name} tại Thạnh AST. Giá ${formatPrice(product.price)}. Chất lượng cao, giao hàng toàn quốc.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: product.images.filter((img) => img.startsWith("http")),
    },
  };
}

export default async function ProductPage(
  props: PageProps<"/product/[slug]">
) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = calculateDiscount(product.price, product.original_price);
  const relatedProducts = await getRelatedProducts(
    product.category,
    product.slug
  );

  // JSON-LD Product structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.filter((img) => img.startsWith("http")),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Sản phẩm", href: "/#products" },
                ...(product.category
                  ? [{ label: product.category, href: "/#categories" }]
                  : []),
                { label: product.name },
              ]}
            />
          </div>

          {/* Back link */}
          <Link
            href="/#products"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-amber transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </Link>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Image Gallery */}
            <div className="animate-fade-in">
              <ImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Right: Product Info */}
            <div className="animate-slide-up stagger-2">
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {product.category && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-amber/10 text-accent-amber text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {product.category}
                  </div>
                )}
                {product.out_of_stock && (
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                    Hết hàng
                  </span>
                )}
                {typeof product.pre_order === "number" && product.pre_order > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium text-xs">
                    ⏰ Cần đặt trước {product.pre_order} ngày
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold gradient-text">
                  {formatPrice(product.price)}
                </span>
                {discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-text-muted line-through">
                      {formatPrice(product.original_price)}
                    </span>
                    <span className="badge-sale">-{discount}%</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Bảo hành",
                    value: "Chính hãng",
                  },
                  { icon: Truck, label: "Vận chuyển", value: "Toàn quốc" },
                  { icon: Star, label: "Chất lượng", value: "Cao cấp" },
                ].map((feat) => (
                  <div
                    key={feat.label}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-border-subtle shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-4 h-4 text-accent-amber" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{feat.label}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {feat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent-amber" />
                    Mô tả sản phẩm
                  </h2>
                  <div className="text-text-secondary leading-relaxed whitespace-pre-line bg-white p-4 sm:p-5 rounded-xl border border-border-subtle">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Specs */}
              {Object.keys(product.specs).length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Thông số kỹ thuật
                  </h2>
                  <div className="rounded-xl border border-border-subtle overflow-hidden shadow-xs">
                    {Object.entries(product.specs).map(
                      ([key, value], index) => (
                        <div
                          key={key}
                          className={`flex items-center justify-between px-4 py-3 text-sm ${index % 2 === 0 ? "bg-white" : "bg-slate-50"
                            }`}
                        >
                          <span className="text-text-secondary font-medium">
                            {key}
                          </span>
                          <span className="text-foreground font-semibold">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <BuyZaloButton
                  product={product}
                  size="lg"
                  text="Mua hàng qua Zalo"
                  className="w-full sm:w-auto text-base sm:text-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                />
                <a
                  href="tel:0983087375"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl border border-border-default bg-white hover:bg-slate-50 text-foreground font-semibold text-base transition-all duration-300 hover:border-accent-orange/40 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-accent-orange" />
                  Gọi 0983 087 375
                </a>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 pt-16 border-t border-border-subtle">
              <ProductGrid
                products={relatedProducts}
                title="Sản Phẩm Liên Quan"
                subtitle="Có thể bạn cũng thích"
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
