import { NextResponse } from "next/server";
import { getCurrentGoldPrice } from "@/app/lib/goldPrice";
import { getAllProducts } from "@/app/lib/productService";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;


    const minPrice = parseFloat(searchParams.get("minPrice") || "");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "");
    const minPopularity = parseFloat(searchParams.get("minPopularity") || "");
    const maxPopularity = parseFloat(searchParams.get("maxPopularity") || "");

    const goldPrice = await getCurrentGoldPrice();
    let products = await getAllProducts(goldPrice);

    if (!isNaN(minPrice)) {
      products = products.filter((p) => p.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      products = products.filter((p) => p.price <= maxPrice);
    }
    if (!isNaN(minPopularity)) {
      products = products.filter((p) => p.popularityScore >= minPopularity);
    }
    if (!isNaN(maxPopularity)) {
      products = products.filter((p) => p.popularityScore <= maxPopularity);
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("[GET /api/products] Hata:", err);
    return NextResponse.json(
      { error: "Sunucu hatası, ürünler yüklenemedi" },
      { status: 500 }
    );
  }
}