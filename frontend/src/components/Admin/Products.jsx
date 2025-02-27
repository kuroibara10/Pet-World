import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState(false);
  const [productById, setProductById] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameproduct, setNameproductSearch] = useState("");
  const [prixSearch, setPrixSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [suitableSearch, setSuitableSearch] = useState("");
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredProducts =
    products?.data?.filter((product) => {
      return (
        product.name.toLowerCase().includes(nameproduct.toLowerCase()) &&
        (typeSearch
          ? product.type.toLowerCase().includes(typeSearch.toLowerCase())
          : true) &&
        (suitableSearch
          ? product.suitable
              .toLowerCase()
              .includes(suitableSearch.toLowerCase())
          : true) &&
        (prixSearch ? product.prix >= Number(prixSearch) : true)
      );
    }) || [];

  const totalPages = Math.ceil(filteredProducts.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handleShow = (id) => {
    const product = products?.data?.find((p) => p.id === id);
    if (product) {
      setProductById(product);
      setDetails(true);
    }
  };
  // Update Product
  const [detailsUpdate, setDetailsUpdate] = useState(false);

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [prix, setprix] = useState("");
  const [quantity, setquantity] = useState("");
  const [suitable, setsuitable] = useState("");
  const [type, settype] = useState("");
  const [discount_status, setdiscount_status] = useState("");
  const [discount_percentage, settdiscount_percentage] = useState("");

  const handleUpdate = (id) => {
    const product = products?.data?.find((p) => p.id === id);
    if (product) {
      setProductById(product);
      setDetailsUpdate(true);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="flex justify-end">
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex mr-0">
          Add New Product
        </button>
      </div>

      <div className="flex justify-around space-x-10">
        <input
          type="text"
          placeholder="Search by name..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={nameproduct}
          onChange={(e) => {
            setNameproductSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Search by price..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={prixSearch}
          onChange={(e) => {
            setPrixSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={typeSearch}
          onChange={(e) => {
            setTypeSearch(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Select Type</option>
          <option value="food">Food</option>
          <option value="accessory">Accessory</option>
        </select>
        <select
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={suitableSearch}
          onChange={(e) => {
            setSuitableSearch(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Select Suitable</option>
          <option value="dogs">Dogs</option>
          <option value="cats">Cats</option>
          <option value="birds">Birds</option>
          <option value="fishes">Fishes</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Suitable</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr className="bg-white hover:bg-gray-100" key={product.id}>
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">{product.description}</td>
                <td className="p-3 border">{product.prix}</td>
                <td className="p-3 border">{product.suitable}</td>
                <td className="p-3 border">{product.type}</td>
                <td className="p-3 border flex space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleShow(product.id)}
                  >
                    Show
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleUpdate(product.id)}
                  >
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center text-gray-500">
                No products found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {details && productById && (
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
          <h3 className="text-xl font-bold">{productById.name}</h3>
          <p>{productById.description}</p>
          <p>Price: {productById.prix}</p>
          <p>Suitable for: {productById.suitable}</p>
          <p>Type: {productById.type}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setDetails(false)}
          >
            Close
          </button>
        </div>
      )}
      {detailsUpdate && productById && (
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
          <form>
            <label>name : </label>
            <input
              type="text"
              value={productById.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label>description : </label>
            <input
              type="text"
              value={productById.description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />

            <label>prix : </label>
            <input
              type="number"
              value={productById.prix}
              onChange={(e) => {
                setprix(e.target.value);
              }}
            />

            <label>quantity : </label>
            <input
              type="number"
              value={productById.quantity}
              onChange={(e) => {
                setquantity(e.target.value);
              }}
            />

            <label>suitable : </label>
            <select
              className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
              value={productById.suitable}
              onChange={(e) => {
                setsuitable(e.target.value);
              }}
            >
              <option value="">Select Suitable</option>
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
              <option value="birds">Birds</option>
              <option value="fishes">Fishes</option>
            </select>

            <label>type : </label>
            <select
              className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
              value={productById.type}
              onChange={(e) => {
                settype(e.target.value);
                // setCurrentPage(1);
              }}
            >
              <option value="">Select Type</option>
              <option value="food">Food</option>
              <option value="accessory">Accessory</option>
            </select>
          </form>
          {/* <h3 className="text-xl font-bold">{productById.name}</h3>
          <p>{productById.description}</p>
          <p>Price: {productById.prix}</p>
          <p>Suitable for: {productById.suitable}</p>
          <p>Type: {productById.type}</p> */}
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setDetailsUpdate(false)}
          >
            Close
          </button>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-blue-500 text-white rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
