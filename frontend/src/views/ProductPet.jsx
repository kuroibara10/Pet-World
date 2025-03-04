import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductsPet() {
  const [products, setProducts] = useState([]);
  const { section } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-10">
      <main className="container mx-auto my-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {products?.data
            ? products.data
                .filter((product) => product.suitable === section)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 shadow rounded text-center"
                  >
                    <img
                      src={`http://localhost:8000/storage/${product.image}`}
                      // src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-blue-600 font-bold">{product.price}</p>
                    <p className="text-blue-600 font-bold">
                      {product.suitable}
                    </p>

                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow">
                      Order
                    </button>
                  </div>
                ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
}

export default ProductsPet;
