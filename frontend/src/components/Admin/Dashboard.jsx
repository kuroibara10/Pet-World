import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsets] = useState([]);
  const [products, setProducts] = useState([]);
  const [demands, setDemands] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/userss")
      .then((response) => setUsets(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/demands")
      .then((response) => setDemands(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3>Total Users</h3>
          <p className="text-3xl font-bold">
            {users?.data ? users.data.length : "Loading..."}
          </p>
        </div>
        <div>
          <h3>Total Products</h3>
          <p className="text-3xl font-bold">
            {products?.data ? products.data.length : "Loading..."}
          </p>
        </div>
        <div>
          <h3>Orders</h3>
          <p className="text-3xl font-bold">
            {demands?.data ? demands.data.length : "Loading..."}
          </p>
        </div>
        <div>
          <h3>Sales</h3>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
