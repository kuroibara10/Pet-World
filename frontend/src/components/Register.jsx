import axios from "axios";
import { useEffect, useState } from "react";

function Register({ setIsLogin }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/userss");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== passwordagain) {
      setError("Passwords do not match!");
      return;
    }

    const existingUser = users.data.find((user) => user.email === email);
    if (existingUser) {
      setError("This user already exists.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/userss", {
        name,
        prenom,
        username,
        email,
        password,
      });

      alert("Account created successfully! Please login.");
      console.log("User created:", response.data);
      setIsLogin(true);
    } catch (err) {
      alert("faild operation register");
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex justify-around space-x-10">
        <div className="mb-4">
          <label className="block text-gray-700">Enter Your Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Your Last Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Enter Your First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Your First Name"
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-around space-x-10">
        <div className="mb-4">
          <label className="block text-gray-700">Enter Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Enter Your Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-around space-x-10">
        <div className="mb-4">
          <label className="block text-gray-700">Enter Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Enter Again Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Again Password"
            onChange={(e) => setPasswordagain(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded shadow"
      >
        Register
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default Register;
