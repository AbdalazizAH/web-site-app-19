"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingSpinner from "./components/shared/LoadingSpinner";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const res = await fetch(`https://backend-v1-psi.vercel.app/product/`, {
        headers: { accept: "application/json" },
      });
      const data = await res.json();
      // نأخذ أول 3 منتجات كمنتجات مميزة
      setFeaturedProducts(data.slice(0, 3));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight animate-fade-in">
              مرحباً بك في متجرنا الإلكتروني
            </h1>
            <p className="text-xl mb-12 text-gray-200 animate-fade-in-delay">
              اكتشف تشكيلة واسعة من المنتجات المميزة بأفضل الأسعار
            </p>
            <Link
              href="/products"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3 shadow-lg animate-fade-in-delay-2"
            >
              تسوق الآن
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 relative inline-block">
              منتجات مميزة
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform -skew-x-12"></div>
            </h2>
            <p className="text-gray-600 text-lg">اكتشف أحدث المنتجات المضافة لدينا</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product) => (
                <Link
                  href="/products"
                  key={product.ProductID}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative h-72">
                    {product.images && product.images[0] && (
                      <Image
                        src={product.images[0].ImageURL}
                        alt={product.images[0].AltText || product.ProductName}
                        fill
                        className="object-cover"
                      />
                    )}
                    {product.OldPrice && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        خصم {Math.round(((product.OldPrice - product.SellPrice) / product.OldPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{product.ProductName}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.Description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.SellPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-blue-500 font-semibold">عرض التفاصيل</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">جودة عالية</h3>
              <p className="text-gray-600">نقدم منتجات عالية الجودة تلبي احتياجاتك</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">توصيل سريع</h3>
              <p className="text-gray-600">نضمن وصول طلبك في أسرع وقت ممكن</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تسوق آمن</h3>
              <p className="text-gray-600">نوفر طرق دفع آمنة وموثوقة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
