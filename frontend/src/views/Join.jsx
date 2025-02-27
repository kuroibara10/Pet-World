import { useEffect, useState } from "react";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import logo from "../assets/Pet_World.png";
import Login from "../components/login";

function Join({ setIslog, setRoleuser, setId }) {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-[600px] min-h-[450px] bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center flex items-center justify-center">
        <div className="flex items-center justify-center mb-6 group">
          <h2 className="relative text-2xl font-bold mr-4 text-blue-600 transition transform duration-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            {isLogin ? "Login" : "Register"}
          </h2>{" "}
          <Link to="/" className="ml-40">
            <img src={logo} alt="logo" className="h-8" />
          </Link>
        </div>
        <div className="flex-1">
          {isLogin ? (
            <Login
              setIslog={setIslog}
              setRoleuser={setRoleuser}
              setId={setId}
            />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-blue-600 underline ml-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </main>
    </div>
  );
}

export default Join;
