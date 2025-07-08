import ProductCard, { Product as ProductType } from '@/app/components/ProductCard';
import { getCurrentGoldPrice } from '@/app/lib/goldPrice';
import { getAllProducts } from '@/app/lib/productService';

type ProductsPageProps = {};

export default async function ProductsPage({}: ProductsPageProps) {
  // Fetch current gold price and product list
  const goldPrice = await getCurrentGoldPrice();
  const products: ProductType[] = await getAllProducts(goldPrice);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-montserrat font-medium mb-6">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}