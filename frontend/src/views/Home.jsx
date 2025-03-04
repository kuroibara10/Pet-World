import { Link } from "react-router-dom";
import photo_welcom from "../assets/welcom.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
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

  return (
    <div>
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
              {/* <div className="flex space-x-4 w-max">
                {products?.data
                  ? products.data
                      .filter((product) => product.suitable === section)
                      .slice(0, 6)
                      .map((product) => (
                        <div
                          key={product}
                          className="bg-white p-4 shadow rounded text-center min-w-[250px]"
                        >
                          <img
                            src={product.image}
                            alt={`Product ${product.image}`}
                            className="w-full h-40 object-cover mb-2 rounded"
                          />
                          <h3 className="text-lg font-semibold">
                            Product {product.name}
                          </h3>
                          <p className="text-blue-600 font-bold">
                            {product.prix}
                          </p>
                          <p className="text-blue-600 font-bold">
                            {product.suitable}
                          </p>
                        </div>
                      ))
                  : "Loading"}
              </div> */}
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
