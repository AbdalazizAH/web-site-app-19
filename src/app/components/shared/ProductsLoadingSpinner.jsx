export default function ProductsLoadingSpinner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
        >
          {/* صورة المنتج */}
          <div className="h-72 bg-gray-200"></div>

          {/* تفاصيل المنتج */}
          <div className="p-6 space-y-4">
            {/* عنوان المنتج */}
            <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>

            {/* وصف المنتج */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
            </div>

            {/* السعر والزر */}
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
