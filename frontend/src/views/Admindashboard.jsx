import { useState } from "react";
import Users from "../components/Users";
import Products from "../components/Products";
import Messages from "../components/Messages";
import Dashboard from "../components/Dashboard";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex mt-16">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-green-600 text-white p-4 space-y-6 fixed top-0 left-0 h-full shadow-lg">
        <h2 className="text-xl font-bold mt-20">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
                onClick={() => setActiveSection("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
                onClick={() => setActiveSection("users")}
              >
                Users
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
                onClick={() => setActiveSection("products")}
              >
                Products
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
                onClick={() => setActiveSection("problems")}
              >
                Problems
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content with Left Margin to Avoid Overlap */}
      <main className="flex-1 bg-gray-100 p-6 ml-64 min-h-screen">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "users" && <Users />}
        {activeSection === "products" && <Products />}
        {activeSection === "problems" && <Messages />}
      </main>
    </div>

    // <div className="flex mt-16 min-h-screen">
    //   {/* Sidebar */}
    //   <aside className="w-64 bg-green-600 text-white p-4 space-y-6">
    //     <h2 className="text-xl font-bold ">Admin Panel</h2>
    //     <nav>
    //       <ul className="space-y-2">
    //         <li>
    //           <button
    //             className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
    //             onClick={() => setActiveSection("dashboard")}
    //           >
    //             Dshbord
    //           </button>
    //         </li>

    //         <li>
    //           <button
    //             className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
    //             onClick={() => setActiveSection("users")}
    //           >
    //             Users
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
    //             onClick={() => setActiveSection("products")}
    //           >
    //             Products
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
    //             onClick={() => setActiveSection("problems")}
    //           >
    //             Problems
    //           </button>
    //         </li>
    //       </ul>
    //     </nav>
    //   </aside>

    //   {/* Main Content */}
    //   <main className="flex-1 bg-gray-100 p-6">
    //     {activeSection === "dashboard" && <Dashboard />}

    //     {activeSection === "users" && <Users />}

    //     {activeSection === "products" && <Products />}

    //     {activeSection === "problems" && <Messages />}
    //   </main>
    // </div>
  );
}
