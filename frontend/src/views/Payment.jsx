import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const location = useLocation();
  const { demands } = location.state || {};
  //   const totalPrix = demands.reduce((acc, demand) => acc + demand.prix, 0);
  const totalPrix = demands.reduce((acc, demand) => {
    // تحويل السعر (prix) من string إلى number
    const prixNumber = parseFloat(demand.prix);
    return acc + (isNaN(prixNumber) ? 0 : prixNumber); // التأكد من أنه رقم صالح
  }, 0);
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Prix</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand, index) => (
              <tr key={index}>
                <td className="border p-2">{demand.name}</td>
                <td className="border p-2">{demand.prix}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th className="border p-2">Total : </th>
              <th className="border p-2">{totalPrix} DH</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6">اختر طريقة الدفع</h1>

        {/* أزرار اختيار طريقة الدفع */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              paymentMethod === "mastercard"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
            onClick={() => setPaymentMethod("mastercard")}
          >
            MasterCard
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              paymentMethod === "paypal"
                ? "bg-yellow-500 text-white"
                : "bg-white border border-yellow-500 text-yellow-500"
            }`}
            onClick={() => setPaymentMethod("paypal")}
          >
            PayPal
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              paymentMethod === "payoneer"
                ? "bg-green-600 text-white"
                : "bg-white border border-green-600 text-green-600"
            }`}
            onClick={() => setPaymentMethod("payoneer")}
          >
            Payoneer
          </button>
        </div>

        {/* نموذج الدفع حسب الاختيار */}
        {paymentMethod && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              أدخل بيانات{" "}
              {paymentMethod === "mastercard"
                ? "MasterCard"
                : paymentMethod === "paypal"
                ? "PayPal"
                : "Payoneer"}
            </h2>

            <form>
              {paymentMethod === "mastercard" && (
                <>
                  <input
                    type="text"
                    placeholder="رقم البطاقة"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                  />
                  <input
                    type="text"
                    placeholder="تاريخ الانتهاء (MM/YY)"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                  />
                </>
              )}

              {paymentMethod === "paypal" && (
                <input
                  type="email"
                  placeholder="أدخل بريد PayPal"
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />
              )}

              {paymentMethod === "payoneer" && (
                <input
                  type="email"
                  placeholder="أدخل بريد Payoneer"
                  className="w-full p-2 border border-gray-300 rounded mb-3"
                />
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                تأكيد الدفع
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
