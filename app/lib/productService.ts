import productsData from "@/app/data/products.json";

export interface Product {
  id: string;
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface ProductWithPrice extends Product {
  price: number;
}

let products: Product[] | null = null;

function loadProducts(): void {
  if (products) return;
  products = (productsData as Omit<Product, "id">[]).map((p, idx) => ({
    id: String(idx + 1),
    ...p,
  }));
}

function computePrice(
  popularityScore: number,
  weight: number,
  goldPrice: number
): number {
  return (popularityScore + 1) * weight * goldPrice;
}

export async function getAllProducts(
  goldPrice: number
): Promise<ProductWithPrice[]> {
  loadProducts();
  return products!.map((p) => ({
    ...p,
    price: computePrice(p.popularityScore, p.weight, goldPrice),
  }));
}

export async function getProductById(
  id: string,
  goldPrice: number
): Promise<ProductWithPrice | null> {
  loadProducts();
  const prod = products!.find((p) => p.id === id);
  if (!prod) return null;
  return {
    ...prod,
    price: computePrice(prod.popularityScore, prod.weight, goldPrice),
  };
}
