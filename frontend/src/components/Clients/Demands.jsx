import { useState } from "react";
import axios from "axios";

function Demands() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Product A",
      date: "2025-02-01",
      delivery: "2025-02-05",
      status: "Delivered",
    },
    {
      id: 2,
      product: "Product B",
      date: "2025-02-10",
      delivery: "2025-02-15",
      status: "Pending",
    },
  ]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/userss")
  //     .then((response) => setUsets(response.data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <div className="pt-20">
      <main className="container mx-auto my-10 px-4">
        <div className="mt-6 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mt-10 text-center">Your Orders</h3>
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 shadow rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{order.product}</p>
                <p className="text-gray-600">Order Date: {order.date}</p>
                <p className="text-gray-600">Delivery Date: {order.delivery}</p>
              </div>
              <span
                className={`px-3 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Demands;
