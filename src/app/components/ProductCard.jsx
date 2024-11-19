import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* صورة المنتج */}
      <div className="relative h-64 overflow-hidden group">
        {product.images && product.images[0] && (
          <Image
            src={product.images[0].ImageURL}
            alt={product.images[0].AltText || product.ProductName}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* شارة الخصم إذا وجد */}
        {product.OldPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            خصم{" "}
            {Math.round(
              ((product.OldPrice - product.SellPrice) / product.OldPrice) * 100
            )}
            %
          </div>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {product.ProductName}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.Description}
        </p>

        {/* السعر والتوفر */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              ${product.SellPrice.toFixed(2)}
            </div>
            {product.OldPrice && (
              <div className="text-sm text-gray-400 line-through">
                ${product.OldPrice.toFixed(2)}
              </div>
            )}
          </div>
          <div
            className={`text-sm ${
              product.StockQuantity > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.StockQuantity > 0 ? "متوفر" : "غير مت��فر"}
          </div>
        </div>

        {/* زر الإضافة للسلة */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.StockQuantity === 0}
          className={`w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
            ${
              product.StockQuantity > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {product.StockQuantity > 0 ? "إضافة للسلة" : "غير متوفر"}
        </button>
      </div>
    </div>
  );
}
