"use client";

import { useState } from "react";

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
  price: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { name, price, popularityScore, images } = product;
  const imageUrls = [images.yellow, images.rose, images.white];

  const [index, setIndex] = useState(0);
  let startX = 0;

  const prev = () =>
    setIndex((i) => (i - 1 + imageUrls.length) % imageUrls.length);
  const next = () => setIndex((i) => (i + 1) % imageUrls.length);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const diff = e.clientX - startX;
    if (diff > 50) prev();
    else if (diff < -50) next();
  };

  const rawRating = popularityScore / 2;
  const rounded = Math.round(rawRating * 10) / 10;
  let ratingDisplay = rounded.toString();
  if (ratingDisplay.endsWith('.0')) ratingDisplay = ratingDisplay.slice(0, -2);
  if (ratingDisplay.startsWith('0')) ratingDisplay = ratingDisplay.slice(1);

  return (
    <div className="border rounded-2xl shadow-sm p-4 max-w-xs">
      <div
        className="relative mb-4 overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <img
          src={imageUrls[index]}
          alt={`${name} variant ${index + 1}`}
          className="w-full h-52 object-cover rounded-xl"
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <h2 className="text-lg font-montserrat font-medium mb-1">{name}</h2>
      <p className="text-base font-avenir mb-2">
        {price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p className="text-sm font-montserrat text-gray-600 mb-3">
        {ratingDisplay}/5
      </p>
      <div className="flex space-x-2">
        {imageUrls.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-6 h-6 rounded-full border ${
              index === idx ? "ring-2 ring-yellowGold" : ""
            }`}
            style={{
              backgroundColor:
                idx === 0 ? "#E6CA97" : idx === 1 ? "#E1A4A9" : "#D9D9D9",
            }}
          />
        ))}
      </div>
    </div>
  );
}
