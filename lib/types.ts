export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  original_price: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
}
