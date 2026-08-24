import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-lg text-text-secondary font-medium">
          Không tìm thấy sản phẩm nào
        </p>
        <p className="text-sm text-text-muted mt-1">
          Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.id}-${product.category}-${product.slug}-${index}`}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
