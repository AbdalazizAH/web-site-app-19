"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDisplay from "../cart/CartDisplay";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* القسم الأيمن */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            متجرنا
          </Link>

          {/* القسم الأيسر */}
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link
                href="/"
                className={`${
                  isActive("/")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                } transition-colors`}
              >
                الرئيسية
              </Link>
              <Link
                href="/products"
                className={`${
                  isActive("/products")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                } transition-colors`}
              >
                المنتجات
              </Link>
            </div>

            {/* إضافة CartDisplay كقائمة منسدلة */}
            <div className="relative">
              <CartDisplay />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
