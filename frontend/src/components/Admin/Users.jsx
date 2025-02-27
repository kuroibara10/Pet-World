import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/userss")
      .then((response) => setUsets(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [usernameSearch, setUsernameSearch] = useState(""); // 🔍 البحث عن username
  const [emailSearch, setEmailSearch] = useState(""); // 🔍 البحث عن email
  const usersPerPage = 5; // عدد المستخدمين في كل صفحة

  // 🔍 تصفية المستخدمين بناءً على `username` و `email`
  const filteredUsers =
    users?.data?.filter(
      (user) =>
        user.username.toLowerCase().includes(usernameSearch.toLowerCase()) &&
        user.email.toLowerCase().includes(emailSearch.toLowerCase())
    ) || [];

  // 🧮 حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 📌 استخراج البيانات الخاصة بالصفحة الحالية
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* 🔍 مربع البحث لـ username */}
      <div className="flex justify-around space-x-10">
        <input
          type="text"
          placeholder="🔍 Search by username..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={usernameSearch}
          onChange={(e) => {
            setUsernameSearch(e.target.value);
            setCurrentPage(1); // إعادة الصفحة للأولى عند البحث
          }}
        />

        {/* 🔍 مربع البحث لـ email */}
        <input
          type="text"
          placeholder="🔍 Search by email..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={emailSearch}
          onChange={(e) => {
            setEmailSearch(e.target.value);
            setCurrentPage(1); // إعادة الصفحة للأولى عند البحث
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-300">Username</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">B</th>
              <th className="p-3 border border-gray-300">A</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr className="bg-white hover:bg-gray-100" key={user.id}>
                  <td className="p-3 border border-gray-300">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">B</td>
                  <td className="p-3 border border-gray-300">B</td>
                  <td className="p-3 border border-gray-300 flex space-x-2">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No users found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* أزرار التحكم في الصفحات */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-blue-500 text-white rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;
