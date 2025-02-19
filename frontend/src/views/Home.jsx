import { Link } from "react-router-dom";
import photo_welcom from "../assets/welcom.png";
function Home() {
  const backgroundImageUrl = photo_welcom;
  let listPetAnimals = ["dogs", "cats", "births", "fishs"];
  const capitalizeFirstCharacter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 w-max">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
                  <div
                    key={product}
                    className="bg-white p-4 shadow rounded text-center min-w-[250px]"
                  >
                    <img
                      src="https://via.placeholder.com/150"
                      alt={`Product ${product}`}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h3 className="text-lg font-semibold">Product {product}</h3>
                    <p className="text-blue-600 font-bold">$99.99</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to={`/${section}`}
              className="block text-center mt-4 text-blue-600"
            >
              View all products {capitalizeFirstCharacter(section)}
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
