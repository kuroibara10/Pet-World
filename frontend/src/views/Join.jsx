import { useState } from "react";
import { Link } from "react-router-dom";

function Join() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-20">
      <main className="container mx-auto my-10 px-4 flex justify-center">
        <div className="bg-white p-8 shadow-lg rounded w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your password"
              />
            </div>
            <Link to="/client">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded shadow"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </Link>
          </form>
          <p className="text-center mt-4 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-blue-600 underline ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Join;
