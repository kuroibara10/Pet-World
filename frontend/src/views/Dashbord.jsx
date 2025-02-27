import { useEffect } from "react";

const Dashbord = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-green-100 min-h-screen text-left">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 fixed top-0 left-0 w-full shadow-lg z-50 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="h-10 mr-4"
          />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <button className="bg-white text-green-600 px-4 py-2 rounded shadow">
          Logout
        </button>
      </header>

      {/* Content */}
      <div className="pt-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center my-6">
          Admin Dashboard
        </h2>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gestion Users */}
          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Gestion Users
            </h3>
            <p>Manage and control all users.</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded shadow">
              Manage
            </button>
          </div>

          {/* Gestion Products */}
          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Gestion Products
            </h3>
            <p>Manage and update product details.</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded shadow">
              Manage
            </button>
          </div>

          {/* Gestion Demands */}
          <div className="bg-white p-6 shadow rounded text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Gestion Demands
            </h3>
            <p>Track and manage customer orders.</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded shadow">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-10">
        &copy; 2025 Mu - All rights reserved
      </footer>
    </div>
  );
};

export default Dashbord;
