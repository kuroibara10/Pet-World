import { Link, useNavigate } from "react-router-dom";
import photo_welcom from "../assets/welcom.png";
import { useEffect, useState } from "react";
import axios from "axios";
import closepng from "../assets/icons/close.png";
function Home({ demands, setDemands, islog }) {
  const backgroundImageUrl = photo_welcom;
  let listPetAnimals = ["dogs", "cats", "birds", "fishes"];
  const [products, setProducts] = useState([]);

  const capitalizeFirstCharacter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
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
    console.log(productDec);
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
    // if (!product) return; // Prevent adding undefined products
    // setDemands((prevDemands) =>
    //   Array.isArray(prevDemands) ? [...prevDemands, productDec] : [productDec]
    // );
    // alert(`Product : ${productDec.name} . Add to cart cart`);
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
    <div>
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
      <section
        className="text-center py-30 bg-cover bg-center h-[35rem] mt-19 relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="py-20 mt-9 px-9 flex flex-col text-black grid justify-items-start">
          <Link to="/admin">
            <h2 className="text-4xl font-bold font-[1000]">Welcom</h2>
          </Link>
          <Link to="/dashbord">
            <p className="text-xl  ">
              Discover our best products to meet your needs.
            </p>
          </Link>
        </div>
      </section>
      <main className="container mx-auto my-10 px-4">
        {listPetAnimals.map((section) => (
          <section key={section} id={`section${section}`} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {capitalizeFirstCharacter(section)}
            </h2>
            <div className="overflow-x-auto scrollbar-small bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-6 w-max py-4">
                  {products?.data ? (
                    products.data
                      .filter((product) => product.suitable === section)
                      .slice(0, 5)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="bg-white p-5 shadow-lg rounded-xl text-center min-w-[250px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                          {product.image ? (
                            <img
                              src={`http://localhost:8000/storage/${product.image}`}
                              // src={product.image}
                              alt={`Product ${product.name}`}
                              className="w-full h-40 object-cover mb-3 rounded-xl"
                            />
                          ) : (
                            <p>Loading image...</p>
                          )}
                          <h3 className="text-lg font-semibold text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-blue-600 font-bold text-xl">
                            {product.prix} DH
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {product.suitable}
                          </p>
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
                      ))
                  ) : (
                    <p className="text-gray-500 text-lg">Loading...</p>
                  )}
                </div>
              </div>
            </div>
            <Link
              to={`/products/${section}`}
              className="block text-center mt-6 text-blue-600 font-medium hover:underline"
            >
              View all {capitalizeFirstCharacter(section)}
            </Link>
          </section>
        ))}
      </main>

      {/* Contact Section */}
      <section className="bg-gray-200 py-16 text-center px-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-2">
          We’d love to hear from you! Reach out to us via email or phone.
        </p>
        <p className="text-gray-700 font-medium">
          📧 Email:{" "}
          <a
            href="mailto:contact@mu.com"
            className="text-blue-600 hover:underline"
          >
            contact@mu.com
          </a>
        </p>
        <p className="text-gray-700 font-medium">
          📞 Phone:{" "}
          <a href="tel:+33123456789" className="text-blue-600 hover:underline">
            +33 1 23 45 67 89
          </a>
        </p>
      </section>
    </div>
  );
}

export default Home;
