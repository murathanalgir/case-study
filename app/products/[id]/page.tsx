import { notFound } from "next/navigation";
import ProductCard from '@/app/components/ProductCard';
import { getCurrentGoldPrice } from '@/app/lib/goldPrice';
import { getProductById } from '@/app/lib/productService';

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const goldPrice = await getCurrentGoldPrice();
  const product = await getProductById(params.id, goldPrice);
  if (!product) {
    notFound();
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-montserrat font-medium mb-6">
        {product.name}
      </h1>
      <div className="max-w-3xl mx-auto">
        <ProductCard product={product} />
      </div>
    </main>
  );
}