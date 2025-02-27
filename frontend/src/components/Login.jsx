import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Login({ setIslog, setId }) {
  const [users, setUsets] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/userss")
      .then((response) => setUsets(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handLogin = (e) => {
    e.preventDefault();
    const user = users.data.find((user) => user.email === email);

    if (user && user.password === password && user.role === "client") {
      alert(`Hello Client ${email}`);
      setId(user.id);
      setIslog(true);
      // navigate(`/client/${user.username}`);
      navigate(`/client`);
    } else if (user && user.password === password && user.role === "admin") {
      alert(`Hello Admin ${email}`);
      setId(user.id);
      setIslog(true);
      // navigate(`/admin/${user.username}`);
      navigate(`/admin`);
    } else {
      // alert(`Information encorrect`);
      setError("Information encorrect");
    }
    console.log(user);
  };

  return (
    <form onSubmit={handLogin}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <input type="checkbox" id="rememberMe" className="mr-2" />
        <label htmlFor="rememberMe" className="text-gray-700">
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded shadow"
      >
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default Login;
