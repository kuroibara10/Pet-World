// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Login({ setIslog, setId }) {
//   const [users, setUsets] = useState([]);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/userss")
//       .then((response) => setUsets(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);
//   const handLogin = (e) => {
//     e.preventDefault();
//     const user = users.data.find((user) => user.email === email);

//     console.log(user);
//     if (user && user.password === password && user.role === "client") {
//       alert(`Hello Client ${email}`);
//       setId(user.id);
//       setIslog(true);
//       // navigate(`/client/${user.username}`);
//       navigate(`/client`);
//     } else if (user && user.password === password && user.role === "admin") {
//       alert(`Hello Admin ${email}`);
//       setId(user.id);
//       setIslog(true);
//       // navigate(`/admin/${user.username}`);
//       navigate(`/admin`);
//     } else {
//       // alert(`Information encorrect`);
//       setError("Information encorrect");
//       console.log(email);
//     }
//     console.log(user);
//   };

//   return (
//     <form onSubmit={handLogin}>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           className="w-full px-3 py-2 border rounded"
//           placeholder="Enter your email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           className="w-full px-3 py-2 border rounded"
//           placeholder="Enter your password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-4 flex items-center">
//         <input type="checkbox" id="rememberMe" className="mr-2" />
//         <label htmlFor="rememberMe" className="text-gray-700">
//           Remember me
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded shadow"
//       >
//         Login
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// }

// export default Login;
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ islog, setIslog, setId, setRoleuser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      if (response.data.user.role == "client") {
        // window.location.href = `/client/${response.data.user.username}`;`
        setId(response.data.user.id);
        setRoleuser(response.data.user.role);
        // setIslog(true);
        setIslog(!islog);
        navigate(`/client/${response.data.user.username}`);
      } else {
        // window.location.href = `/admin`;
        setRoleuser(response.data.user.role);
        setId(response.data.user.id);
        // setIslog(true);
        setIslog(!islog);
        navigate(`/admin`);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
