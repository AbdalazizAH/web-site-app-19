export async function addToCart(ProductID) {
  try {
    const cartSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cart_session="))
      ?.split("=")[1];

    const res = await fetch(`/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Cart-Session": cartSession,
      },
      body: JSON.stringify({
        ProductId: ProductID,
        Quantity: 1,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "فشل في إضافة المنتج إلى السلة");
    }

    const data = await res.json();

    if (data.Items && Array.isArray(data.Items)) {
      window.dispatchEvent(new Event("cartUpdated"));

      return {
        success: true,
        cartData: data,
        message: "تمت إضافة المنتج بنجاح",
      };
    } else {
      throw new Error("استجابة غير صالحة من الخادم");
    }
  } catch (error) {
    console.error("خطأ في إضافة المنتج:", error);
    throw {
      success: false,
      error: error.message || "حدث خطأ أثناء إضافة المنتج",
      cartData: null,
    };
  }
}

export function checkProductAvailability(product) {
  return {
    isAvailable: product.StockQuantity > 0,
    stockLevel:
      product.StockQuantity > 10
        ? "high"
        : product.StockQuantity > 5
        ? "medium"
        : "low",
  };
}
