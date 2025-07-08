import { NextResponse } from "next/server";
import { getCurrentGoldPrice } from "@/app/lib/goldPrice";
import { getAllProducts } from "@/app/lib/productService";

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  try {
    const goldPrice = await getCurrentGoldPrice();
    const product = await getProductById(params.id, goldPrice);
    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error(`[GET /api/products/${params.id}] Hata:`, err);
    return NextResponse.json(
      { error: "Sunucu hatası, ürün yüklenemedi" },
      { status: 500 }
    );
  }
}