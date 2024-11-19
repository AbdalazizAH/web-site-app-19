"use client";
import { useState, useEffect } from "react";
import { addToCart } from "./components/card";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(`https://backend-v1-psi.vercel.app/product/`, {
        headers: { accept: "application/json" },
      });
      const data = await res.json();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = async (product) => {
    try {
      setLoadingProductId(product.ProductID);
      const result = await addToCart(product.ProductID);

      await new Promise((resolve) => {
        const handleCartUpdate = () => {
          window.removeEventListener("cartUpdated", handleCartUpdate);
          resolve();
        };
        window.addEventListener("cartUpdated", handleCartUpdate);

        setTimeout(() => {
          window.removeEventListener("cartUpdated", handleCartUpdate);
          resolve();
        }, 5000);
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.error || "حدث خطأ أثناء إضافة المنتج",
      });
    } finally {
      setLoadingProductId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.Category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {message && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white transform transition-all duration-500 ease-in-out`}
        >
          {message.text}
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* رأس الصفحة */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 relative">
            <span className="relative inline-block">
              المنتجات المميزة
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform -skew-x-12"></div>
            </span>
          </h1>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              جميع المنتجات
            </button>
            {/* يمكن إضافة المزيد من الفئات هنا */}
          </div>
        </header>

        {/* قسم المنتجات */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <article
                key={product.ProductID}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* قسم صورة المنتج */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0].ImageURL}
                      alt={product.images[0].AltText || product.ProductName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">لا تتوفر صورة</span>
                    </div>
                  )}
                  {product.OldPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      خصم{" "}
                      {Math.round(
                        ((product.OldPrice - product.SellPrice) /
                          product.OldPrice) *
                          100
                      )}
                      %
                    </div>
                  )}
                </div>

                {/* تفاصيل المنتج */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                    {product.ProductName}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm">
                    {product.Description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.SellPrice.toFixed(2)}
                      </span>
                      {product.OldPrice && (
                        <span className="block text-sm text-gray-400 line-through">
                          ${product.OldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingProductId === product.ProductID}
                      className={`px-6 py-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:scale-105 ${
                        loadingProductId === product.ProductID
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl"
                      } text-white`}
                    >
                      {loadingProductId === product.ProductID ? (
                        <>
                          <LoadingSpinner size="small" light />
                          <span>جاري الإضافة...</span>
                        </>
                      ) : (
                        <>
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
                          <span>إضافة للسلة</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
