import { useState } from "react";

export default function CheckoutForm({ onSubmit, onCancel, totalAmount }) {
  const [formData, setFormData] = useState({
    CustomerName: "",
    CustomerPhone: "",
    Email: "",
    Address: "",
    City: "",
    Notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">إتمام الطلب</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* معلومات العميل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              الاسم الكامل
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.CustomerName}
              onChange={(e) =>
                setFormData({ ...formData, CustomerName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              رقم الهاتف
            </label>
            <input
              type="tel"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.CustomerPhone}
              onChange={(e) =>
                setFormData({ ...formData, CustomerPhone: e.target.value })
              }
            />
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />
        </div>

        {/* العنوان */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            العنوان التفصيلي
          </label>
          <textarea
            required
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.Address}
            onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              المدينة
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.City}
              onChange={(e) =>
                setFormData({ ...formData, City: e.target.value })
              }
            />
          </div>
        </div>

        {/* ملاحظات إضافية */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ملاحظات إضافية
          </label>
          <textarea
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.Notes}
            onChange={(e) =>
              setFormData({ ...formData, Notes: e.target.value })
            }
          />
        </div>

        {/* ملخص الطلب */}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">المجموع النهائي:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            تأكيد الطلب
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
