import { useState } from "react";
import axios from "axios";

const Change_Pass = ({ userInfo, setUserInfo }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    axios
      .post(
        `http://localhost:8000/userss/update-password/${userInfo.data.id}`, // ضع هنا ID المستخدم الصحيح
        {
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setError("");
      })
      .catch((error) => {
        setError(error.response?.data?.error || "حدث خطأ ما");
        setMessage("");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          تغيير كلمة المرور
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="كلمة المرور الجديدة"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleChangePassword}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            تغيير كلمة المرور
          </button>
        </div>

        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Change_Pass;
