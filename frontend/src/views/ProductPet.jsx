import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import closepng from "../assets/icons/close.png";

function ProductsPet({ demands, setDemands, islog }) {
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
  const [showDescProduct, setShowDescProduct] = useState(false);
  const [productDec, setproductDec] = useState({});
  const handDesc = (idProducthandl) => {
    const product = products.data.find(
      (product) => product.id === idProducthandl
    );
    setproductDec(product);
  };

  const navigate = useNavigate();
  const handlOrder = (idProducthandl) => {
    if (islog) {
      setDemands([]);
      const product = products.data.find(
        (product) => product.id === idProducthandl
      );
      setDemands([product]);
      console.log("productDec");
      console.log(product);
      console.log("demands");
      console.log(demands);
      navigate("/payment", { state: { demands } });
    } else {
      alert("You need login");
      navigate("/join");
    }
  };
  const addproductCart = (product) => {
    if (islog) {
      if (!product) return; // Prevent adding undefined products
      setDemands((prevDemands) =>
        Array.isArray(prevDemands) ? [...prevDemands, productDec] : [productDec]
      );
      alert(`Product : ${productDec.name} . Add to cart cart`);
      // alert("add to cart cart");
    } else {
      alert("You need login");
      navigate("/join");
    }
  };

  return (
    <div className="pt-10">
      <div>
        {showDescProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000]">
            <div className="bg-white p-5 rounded-lg w-[90%] max-w-[500px] relative">
              <div>
                <img
                  src={closepng}
                  alt="colse Desc Product"
                  className="absolute top-[10px] right-[10px] w-[30px] h-[30px] cursor-pointer"
                  onClick={() => {
                    setShowDescProduct(false);
                  }}
                />
              </div>
              <div>
                <div>
                  Name : <p>{productDec.name}</p>
                  Prix : <p>{productDec.prix}</p>
                  Suitable : <p>{productDec.suitable}</p>
                  Type : <p>{productDec.type}</p>
                </div>
                <div>
                  <img
                    src={`http://localhost:8000/storage/${productDec.image}`}
                    // src={product.image}
                    alt={productDec.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={addproductCart}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
                >
                  Add To Cart
                </button>
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
                  onClick={handlOrder}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
                    <div>
                      <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
                        onClick={() => {
                          handDesc(product.id);
                          setShowDescProduct(true);
                        }}
                      >
                        Show
                      </button>
                      <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
                        onClick={() => {
                          handlOrder(product.id);
                        }}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
}

export default ProductsPet;
