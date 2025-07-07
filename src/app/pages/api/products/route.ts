// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getCurrentGoldPrice } from "@/app/lib/goldPrice";
import { getAllProducts } from "@/app/lib/productService";

export async function GET() {
  const goldPrice = await getCurrentGoldPrice();
  const products = await getAllProducts(goldPrice);
  return NextResponse.json(products);
}
