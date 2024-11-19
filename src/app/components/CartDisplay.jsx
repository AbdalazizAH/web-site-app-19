"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CartDisplay() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    CustomerName: "",
    CustomerPhone: "",
    Email: "",
    Address: "",
    City: "",
    Notes: "",
  });

  useEffect(() => {
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, []);

  async function fetchCart() {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("خطأ في جلب السلة:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    try {
      const res = await fetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("فشل في حذف المنتج");

      await fetchCart(); // تحديث السلة بعد الحذف
    } catch (error) {
      console.error("خطأ في حذف المنتج:", error);
    }
  }

  async function clearCart() {
    try {
      const res = await fetch(`/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("فشل في تفريغ السلة");

      await fetchCart(); // تحديث السلة بعد التفريغ
    } catch (error) {
      console.error("خطأ في تفريغ السلة:", error);
    }
  }

  async function handleCheckout(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("فشل في إتمام عملية الشراء");
      }

      const data = await res.json();
      alert("تم إتمام عملية الشراء بنجاح!");
      setIsCheckingOut(false);
      await fetchCart(); // تحديث السلة
    } catch (error) {
      alert("حدث خطأ: " + error.message);
    }
  }

  return (
    <>
      {/* زر السلة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
        {cart?.TotalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.TotalItems}
          </span>
        )}
      </button>

      {/* نافذة السلة */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  السلة ({cart?.TotalItems || 0})
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : !cart?.Items?.length ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  السلة فارغة
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {cart.Items.map((item) => (
                      <div
                        key={item.CartItemId}
                        className="flex items-center gap-3 p-3 border-b hover:bg-gray-50 transition-colors"
                      >
                        {item.ImageUrl && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image
                              src={item.ImageUrl}
                              alt={item.ProductName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {item.ProductName}
                          </h4>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                الكمية: {item.Quantity}
                              </span>
                            </div>
                            <span className="font-bold text-blue-600">
                              ${item.Total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.ProductId)}
                          className="text-red-500 hover:text-red-700 p-1"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">المجموع:</span>
                      <span className="font-bold text-lg text-blue-600">
                        ${cart.TotalAmount.toFixed(2)}
                      </span>
                    </div>
                    {isCheckingOut ? (
                      <form onSubmit={handleCheckout} className="space-y-4">
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="الاسم الكامل"
                            required
                            className="w-full p-2 border rounded"
                            value={checkoutData.CustomerName}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                CustomerName: e.target.value,
                              })
                            }
                          />
                          <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            required
                            className="w-full p-2 border rounded"
                            value={checkoutData.CustomerPhone}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                CustomerPhone: e.target.value,
                              })
                            }
                          />
                          <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            required
                            className="w-full p-2 border rounded"
                            value={checkoutData.Email}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                Email: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="العنوان"
                            required
                            className="w-full p-2 border rounded"
                            value={checkoutData.Address}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                Address: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="المدينة"
                            required
                            className="w-full p-2 border rounded"
                            value={checkoutData.City}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                City: e.target.value,
                              })
                            }
                          />
                          <textarea
                            placeholder="ملاحظات إضافية"
                            className="w-full p-2 border rounded"
                            value={checkoutData.Notes}
                            onChange={(e) =>
                              setCheckoutData({
                                ...checkoutData,
                                Notes: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                          >
                            تأكيد الطلب
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsCheckingOut(false)}
                            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            إلغاء
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={clearCart}
                          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors mb-2"
                        >
                          تفريغ السلة
                        </button>
                        <button
                          onClick={() => setIsCheckingOut(true)}
                          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          إتمام الشراء
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
