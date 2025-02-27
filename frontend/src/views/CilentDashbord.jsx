import { useEffect, useState } from "react";
import Client from "../components/Clients/Client";
import Settings from "../components/Clients/Settings";
import Demands from "../components/Clients/Demands";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CilentDashbord() {
  const [activeSection, setActiveSection] = useState("dashboard");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [userInfo, setUserInfo] = useState([]);
  const { id } = useParams(); // الحصول على ID من الرابط
  useEffect(() => {
    // جلب معلومات المستخدم بناءً على ID
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/userss/${id}`
        );
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    // const fetchsetOrdress = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/orders");
    //     const filteredOrders = response.data.filter(
    //       (order) => order.customerEmail == userInfo.email
    //     );
    //     setOrders(filteredOrders);
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   }
    // };

    fetchUserInfo();
    // fetchsetOrdress();
  }, [id]);

  return (
    <div className="flex mt-16">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-4 space-y-6 fixed top-0 left-0 h-full shadow-lg">
        <h2 className="text-xl font-bold mt-20">Client Panel</h2>
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
                onClick={() => setActiveSection("demands")}
              >
                Demands
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700"
                onClick={() => setActiveSection("setting")}
              >
                Setting
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content with Left Margin to Avoid Overlap */}
      <main className="flex-1 bg-gray-100 p-6 ml-64 min-h-screen">
        {activeSection === "dashboard" && (
          <Client userInfo={userInfo} setActiveSection={setActiveSection} />
        )}
        {activeSection === "demands" && <Demands userInfo={userInfo} />}
        {activeSection === "setting" && (
          <Settings userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </main>
    </div>
  );
}
