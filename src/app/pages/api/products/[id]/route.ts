// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { getCurrentGoldPrice } from "@/app/lib/goldPrice";
import { getProductById } from "@/app/lib/productService";

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const goldPrice = await getCurrentGoldPrice();
  const product = await getProductById(params.id, goldPrice);
  if (!product) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
