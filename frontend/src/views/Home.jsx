import { Link } from "react-router-dom";
import photo_welcom from "../assets/welcom3.png";
function Home() {
  const backgroundImageUrl = photo_welcom;
  let listPetAnimals = ["Dogs", "Cats", "Births", "Fishs"];
  return (
    <div>
      <section
        className="text-center py-30 bg-cover bg-center h-[35rem] mt-19 relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="py-20 mt-9 px-9 flex flex-col text-black grid justify-items-start">
          <h2 className="text-4xl font-bold font-[1000]">Welcom</h2>
          <p className="text-xl  ">
            Discover our best products to meet your needs.
          </p>
        </div>
      </section>
      <main className="container mx-auto my-10 px-4">
        {listPetAnimals.map((section) => (
          <section key={section} id={`section${section}`} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{section}</h2>
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
            <a href="#" className="block text-center mt-4 text-blue-600">
              View all products {section}
            </a>
          </section>
        ))}
      </main>
      {/* <main className="container my-10 px-4">
        <section id="section1" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Cats </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded">Product 1</div>
            <div className="bg-white p-4 shadow rounded">Product 2</div>
            <div className="bg-white p-4 shadow rounded">Product 3</div>
            <div className="bg-white p-4 shadow rounded">Product 4</div>
          </div>
          <Link to={"/cats"} className="block text-center mt-4 text-blue-600">
            All Products Cats
          </Link>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Section</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded text-center">
              <img
                src="https://via.placeholder.com/150"
                alt={`Product`}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">Product</h3>
              <p className="text-blue-600 font-bold">$99.99</p>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
              <img
                src="https://via.placeholder.com/150"
                alt={`Product`}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">Product</h3>
              <p className="text-blue-600 font-bold">$99.99</p>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
              <img
                src="https://via.placeholder.com/150"
                alt={`Product`}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">Product</h3>
              <p className="text-blue-600 font-bold">$99.99</p>
            </div>
            <div className="bg-white p-4 shadow rounded text-center">
              <img
                src="https://via.placeholder.com/150"
                alt={`Product`}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">Product</h3>
              <p className="text-blue-600 font-bold">$99.99</p>
            </div>
          </div>
          <a href="#" className="block text-center mt-4 text-blue-600">
            View all products in this section
          </a>
        </section>
        <section id="section2" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Dogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded">Product 5</div>
            <div className="bg-white p-4 shadow rounded">Product 6</div>
            <div className="bg-white p-4 shadow rounded">Product 7</div>
            <div className="bg-white p-4 shadow rounded">Product 8</div>
          </div>
          <Link to={"/dogs"} className="block text-center mt-4 text-blue-600">
            All Products Dogs
          </Link>
        </section>

        <section id="section3" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Fishs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded">Product 9</div>
            <div className="bg-white p-4 shadow rounded">Product 10</div>
            <div className="bg-white p-4 shadow rounded">Product 11</div>
            <div className="bg-white p-4 shadow rounded">Product 12</div>
          </div>
          <Link to={"/fishs"} className="block text-center mt-4 text-blue-600">
            All Products Fishs
          </Link>
        </section>

        <section id="section4" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Births</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 shadow rounded">Product 13</div>
            <div className="bg-white p-4 shadow rounded">Product 14</div>
            <div className="bg-white p-4 shadow rounded">Product 15</div>
            <div className="bg-white p-4 shadow rounded">Product 16</div>
          </div>
          <Link to={"/births"} className="block text-center mt-4 text-blue-600">
            All Products Births
          </Link>
        </section>
      </main> */}

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
