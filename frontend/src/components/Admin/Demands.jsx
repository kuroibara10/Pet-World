// import { useEffect, useState } from "react";
// import axios from "axios";

// function Demands() {
//   const [showTable, setShowTable] = useState(true);

//   const [products, setProducts] = useState([]);
//   const [details, setDetails] = useState(false);
//   const [productById, setProductById] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [nameproduct, setNameproductSearch] = useState("");
//   const [prixSearch, setPrixSearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [suitableSearch, setSuitableSearch] = useState("");
//   const demandsPerPage = 5;

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/demands")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

// //   const filteredProducts =
// //     products?.data?.filter((product) => {
// //       return (
// //         product.name.toLowerCase().includes(nameproduct.toLowerCase()) &&
// //         (typeSearch
// //           ? product.type.toLowerCase().includes(typeSearch.toLowerCase())
// //           : true) &&
// //         (suitableSearch
// //           ? product.suitable
// //               .toLowerCase()
// //               .includes(suitableSearch.toLowerCase())
// //           : true) &&
// //         (prixSearch ? product.prix >= Number(prixSearch) : true)
// //       );
// //     }) || [];

// //   const totalPages = Math.ceil(filteredProducts.length / demandsPerPage);
// //   const indexOfLastUser = currentPage * demandsPerPage;
// //   const indexOfFirstUser = indexOfLastUser - demandsPerPage;
// //   const currentProducts = filteredProducts.slice(
// //     indexOfFirstUser,
// //     indexOfLastUser
// //   );

// //   const handleShow = (id) => {
// //     const product = products?.data?.find((p) => p.id === id);
// //     if (product) {
// //       setProductById(product);
// //       setDetails(true);
// //     }
// //   };
// //   // Update Product
// //   const [detailsUpdate, setDetailsUpdate] = useState(false);

// //   const [name, setName] = useState("");
// //   const [description, setdescription] = useState("");
// //   const [prix, setprix] = useState("");
// //   const [quantity, setquantity] = useState("");
// //   const [suitable, setsuitable] = useState("");
// //   const [type, settype] = useState("");
// //   const [discount_status, setdiscount_status] = useState("");
// //   const [discount_percentage, settdiscount_percentage] = useState("");

// //   const handleUpdate = (id) => {
// //     const product = products?.data?.find((p) => p.id === id);
// //     if (product) {
// //       setProductById(product);
// //       setDetailsUpdate(true);
// //     }
// //   };

// //   // Add new Product
// //   const [detailsAdd, setDetailsAdd] = useState(false);
// //   const [newname, setnewName] = useState("");
// //   const [newdescription, setnewdescription] = useState("");
// //   const [newprix, setnewprix] = useState("");
// //   const [newquantity, setnewquantity] = useState("");
// //   const [newsuitable, setnewsuitable] = useState("");
// //   const [newtype, setnewtype] = useState("");
// //   const [newdiscount_status, setnewdiscount_status] = useState("");
// //   const [newdiscount_percentage, setnewtdiscount_percentage] = useState("");

// //   const handleAddProduct = () => {};

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Product Management</h1>
//       {showTable && (
//         <div>
//           <div className="flex justify-end">
//             <button
//               className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex mr-0"
//               onClick={() => {
//                 setDetailsAdd(true);
//                 setShowTable(false);
//               }}
//             >
//               Add New Product
//             </button>
//           </div>

//           <div className="flex justify-around space-x-10">
//             <input
//               type="text"
//               placeholder="Search by name..."
//               className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//               value={nameproduct}
//               onChange={(e) => {
//                 setNameproductSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Search by price..."
//               className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//               value={prixSearch}
//               onChange={(e) => {
//                 setPrixSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <select
//               className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//               value={typeSearch}
//               onChange={(e) => {
//                 setTypeSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="">Select Type</option>
//               <option value="food">Food</option>
//               <option value="accessory">Accessory</option>
//             </select>
//             <select
//               className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//               value={suitableSearch}
//               onChange={(e) => {
//                 setSuitableSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="">Select Suitable</option>
//               <option value="dogs">Dogs</option>
//               <option value="cats">Cats</option>
//               <option value="birds">Birds</option>
//               <option value="fishes">Fishes</option>
//             </select>
//           </div>
//           <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Description</th>
//                 <th className="p-3 border">Price</th>
//                 <th className="p-3 border">Suitable</th>
//                 <th className="p-3 border">Type</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products?.data.length > 0 ? (
//                 products?.data.map((product) => (
//                   <tr className="bg-white hover:bg-gray-100" key={product.id}>
//                     <td className="p-3 border">{product.name}</td>
//                     <td className="p-3 border">{product.description}</td>
//                     <td className="p-3 border">{product.prix}</td>
//                     <td className="p-3 border">{product.suitable}</td>
//                     <td className="p-3 border">{product.type}</td>
//                     <td className="p-3 border flex space-x-2">
//                       <button
//                         className="px-4 py-2 bg-blue-500 text-white rounded"
//                         onClick={() => {
//                           handleShow(product.id);
//                           setShowTable(false);
//                         }}
//                       >
//                         Show
//                       </button>
//                       <button
//                         className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                         onClick={() => {
//                           handleUpdate(product.id);
//                           setShowTable(false);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="p-3 text-center text-gray-500">
//                     No products found...
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4 space-x-2">
//               <button
//                 onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Previous
//               </button>
//               <span className="px-4 py-2 bg-blue-500 text-white rounded">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage(Math.min(currentPage + 1, totalPages))
//                 }
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//       {details && productById && (
//         <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
//           <h3 className="text-xl font-bold">{productById.name}</h3>
//           <p>{productById.description}</p>
//           <p>Price: {productById.prix}</p>
//           <p>Suitable for: {productById.suitable}</p>
//           <p>Type: {productById.type}</p>
//           <button
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => {
//               setDetails(false);
//               setShowTable(true);
//             }}
//           >
//             Close
//           </button>
//         </div>
//       )}
//       {detailsUpdate && productById && (
//         <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
//           <form className=" text-left">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Name :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
//                 value={productById.name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
//                 value={productById.description}
//                 onChange={(e) => {
//                   setdescription(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 prix :{" "}
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 value={productById.prix}
//                 onChange={(e) => {
//                   setprix(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Quantity :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 value={productById.quantity}
//                 onChange={(e) => {
//                   setquantity(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Suitable :
//               </label>
//               <select
//                 // className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 value={productById.suitable}
//                 onChange={(e) => {
//                   setsuitable(e.target.value);
//                 }}
//               >
//                 <option value="">Select Suitable</option>
//                 <option value="dogs">Dogs</option>
//                 <option value="cats">Cats</option>
//                 <option value="birds">Birds</option>
//                 <option value="fishes">Fishes</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Type :
//               </label>
//               <select
//                 // className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 value={productById.type}
//                 onChange={(e) => {
//                   settype(e.target.value);
//                   // setCurrentPage(1);
//                 }}
//               >
//                 <option value="">Select Type</option>
//                 <option value="food">Food</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>
//             <div className="mb-4 flex space-x-4">
//               <input
//                 type="submit"
//                 value="Update"
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//               />
//               <button
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   setDetailsUpdate(false);
//                   setShowTable(true);
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//           {/* <h3 className="text-xl font-bold">{productById.name}</h3>
//           <p>{productById.description}</p>
//           <p>Price: {productById.prix}</p>
//           <p>Suitable for: {productById.suitable}</p>
//           <p>Type: {productById.type}</p> */}
//         </div>
//       )}
//       {detailsAdd && (
//         <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
//           <form className=" text-left">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Name :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
//                 onChange={(e) => {
//                   setnewName(e.target.value);
//                 }}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
//                 onChange={(e) => {
//                   setnewdescription(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Prix :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 onChange={(e) => {
//                   setnewprix(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Quantity :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 onChange={(e) => {
//                   setnewquantity(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Suitable :
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 onChange={(e) => {
//                   setnewsuitable(e.target.value);
//                 }}
//               >
//                 <option value="">Select Suitable</option>
//                 <option value="dogs">Dogs</option>
//                 <option value="cats">Cats</option>
//                 <option value="birds">Birds</option>
//                 <option value="fishes">Fishes</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Type :
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 onChange={(e) => {
//                   setnewtype(e.target.value);
//                 }}
//               >
//                 <option value="">Select Type</option>
//                 <option value="food">Food</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>
//             <div className="mb-4 flex space-x-4">
//               <input
//                 type="submit"
//                 value="Add"
//                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//               />
//               <button
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   setDetailsAdd(false);
//                   setShowTable(true);
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Demands;
import { useEffect, useState } from "react";
import axios from "axios";

function Demands() {
  const [demands, setDemands] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/demands")
      .then((response) => setDemands(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [usernameSearch, setUsernameSearch] = useState(""); // 🔍 البحث عن username
  const [emailSearch, setEmailSearch] = useState(""); // 🔍 البحث عن email
  const demandsPerPage = 5; // عدد المستخدمين في كل صفحة

  // 🔍 تصفية المستخدمين بناءً على `username` و `email`
  const filtereddemands =
    demands?.data?.filter(
      (demand) =>
        demand.status.toLowerCase().includes(usernameSearch.toLowerCase()) &&
        demand.user.email.toLowerCase().includes(emailSearch.toLowerCase())
    ) || [];

  // 🧮 حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(filtereddemands.length / demandsPerPage);

  // 📌 استخراج البيانات الخاصة بالصفحة الحالية
  const indexOfLastUser = currentPage * demandsPerPage;
  const indexOfFirstUser = indexOfLastUser - demandsPerPage;
  const currentdemands = filtereddemands.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">demands Management</h1>

      {/* 🔍 مربع البحث لـ username */}
      <div className="flex justify-around space-x-10">
        <input
          type="text"
          placeholder="🔍 Search by username..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={usernameSearch}
          onChange={(e) => {
            setUsernameSearch(e.target.value);
            setCurrentPage(1); // إعادة الصفحة للأولى عند البحث
          }}
        />

        {/* 🔍 مربع البحث لـ email */}
        <input
          type="text"
          placeholder="🔍 Search by email..."
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          value={emailSearch}
          onChange={(e) => {
            setEmailSearch(e.target.value);
            setCurrentPage(1); // إعادة الصفحة للأولى عند البحث
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-300">Id</th>
              <th className="p-3 border border-gray-300">Client</th>
              <th className="p-3 border border-gray-300">Date order</th>
              <th className="p-3 border border-gray-300">status</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentdemands.length > 0 ? (
              currentdemands.map((demand) => (
                <tr className="bg-white hover:bg-gray-100" key={demand.id}>
                  <td className="p-3 border border-gray-300">{demand.id}</td>
                  <td className="p-3 border border-gray-300">
                    {demand.user.email}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {demand.created_at}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {demand.status}
                  </td>
                  <td className="p-3 border border-gray-300 flex space-x-2">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
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
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No demands found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* أزرار التحكم في الصفحات */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-blue-500 text-white rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default Demands;
