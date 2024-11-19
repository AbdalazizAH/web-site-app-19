"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="card group">
      {/* صورة المنتج */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {product.images && product.images[0] && !imageError ? (
          <Image
            src={product.images[0].ImageURL}
            alt={product.images[0].AltText || product.ProductName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400">لا تتوفر صورة</span>
          </div>
        )}
      </div>

      {/* ... باقي الكود ... */}
    </article>
  );
}
