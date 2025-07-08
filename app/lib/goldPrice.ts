import axios from "axios";

const GOLDAPI_URL = process.env.GOLD_API_URL;
const CACHE_TTL_MS = 1000 * 60 * 60;

let cachedPrice: number | null = null;
let lastFetch = 0;

export async function getCurrentGoldPrice(): Promise<number> {
  const now = Date.now();
  if (cachedPrice && now - lastFetch < CACHE_TTL_MS) {
    return cachedPrice;
  }

  const res = await axios.get(GOLDAPI_URL, {
    headers: {
      "x-access-token": "goldapi-1jlsbksmcszv0wp-io"!,
      "Content-Type": "application/json",
    },
  });


  const pricePerOunce: number = res.data.price;
  const pricePerGram = pricePerOunce / 31.1034768; 

  cachedPrice = pricePerGram;
  lastFetch = now;
  return pricePerGram;
}
