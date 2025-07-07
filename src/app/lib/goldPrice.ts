// lib/goldPrice.ts
import axios from "axios";

const GOLDAPI_URL = "https://www.goldapi.io/api/XAU/USD"; // XAU/TRY endpoint’i
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 saat cache

let cachedPrice: number | null = null;
let lastFetch = 0;

/**
 * goldapi.io’dan USD cinsinden gram altın fiyatını çeker.
 */
export async function getCurrentGoldPrice(): Promise<number> {
  const now = Date.now();
  if (cachedPrice && now - lastFetch < CACHE_TTL_MS) {
    return cachedPrice;
  }

  const res = await axios.get(GOLDAPI_URL, {
    headers: {
      "x-access-token": process.env.GOLDAPI_API_KEY!, 
      "Content-Type": "application/json"
    }
  });

  // goldapi.io price alanı troy ounce başına fiyat döner
  const pricePerOunce: number = res.data.price;
  const pricePerGram = pricePerOunce / 31.1034768; // 1 troy ounce ≈ 31.1034768 gram

  cachedPrice = pricePerGram;
  lastFetch = now;
  return pricePerGram;
}
