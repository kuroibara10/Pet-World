// import { useEffect, useState } from "react";
// import axios from "axios";

// function Products() {
//   const [showTable, setShowTable] = useState(true);

//   const [products, setProducts] = useState([]);
//   const [details, setDetails] = useState(false);
//   const [productById, setProductById] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [nameproduct, setNameproductSearch] = useState("");
//   const [prixSearch, setPrixSearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [suitableSearch, setSuitableSearch] = useState("");
//   const usersPerPage = 5;

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/products")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const filteredProducts =
//     products?.data?.filter((product) => {
//       return (
//         product.name.toLowerCase().includes(nameproduct.toLowerCase()) &&
//         (typeSearch
//           ? product.type.toLowerCase().includes(typeSearch.toLowerCase())
//           : true) &&
//         (suitableSearch
//           ? product.suitable
//               .toLowerCase()
//               .includes(suitableSearch.toLowerCase())
//           : true) &&
//         (prixSearch ? product.prix >= Number(prixSearch) : true)
//       );
//     }) || [];

//   const totalPages = Math.ceil(filteredProducts.length / usersPerPage);
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstUser,
//     indexOfLastUser
//   );

//   const handleShow = (id) => {
//     const product = products?.data?.find((p) => p.id === id);
//     if (product) {
//       setProductById(product);
//       setDetails(true);
//     }
//   };
//   // Update Product
//   const [detailsUpdate, setDetailsUpdate] = useState(false);

//   const [updatename, setupdatename] = useState(
//     productById?.name ? productById?.name : ""
//   );
//   const [updatedescription, setupdatedescription] = useState(
//     productById?.description ? productById?.description : ""
//   );
//   const [updateprix, setupdateprix] = useState(
//     productById?.prix ? productById?.prix : ""
//   );
//   const [updatequantity, setupdatequantity] = useState(
//     productById?.quantity ? productById?.quantity : ""
//   );
//   const [updatesuitable, setupdatesuitable] = useState(
//     productById?.suitable ? productById?.suitable : ""
//   );
//   const [updatetype, setupdatetype] = useState(
//     productById?.type ? productById?.type : ""
//   );
//   const [updatediscount_status, setupdatediscount_status] = useState(
//     productById.discount_status
//   );
//   const [updatediscount_percentage, setupdatediscount_percentage] = useState(
//     productById.discount_percentage
//   );
//   const [updateimage, setupdateImage] = useState(
//     productById?.image ? productById?.image : null
//   );

//   const handleUpdate = (id) => {
//     const product = products?.data?.find((p) => p.id === id);
//     if (product) {
//       setProductById(product);
//       setDetailsUpdate(true);
//     }
//   };
//   const [productId, setproductId] = useState(1);
//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();

//     // إعداد FormData وتعبئتها بالبيانات
//     const formData = new FormData();
//     formData.append("name", updatename);
//     formData.append("description", updatedescription);
//     formData.append("prix", Number(updateprix));
//     formData.append("quantity", Number(updatequantity));
//     formData.append("suitable", updatesuitable);
//     formData.append("type", updatetype);
//     formData.append("discount_status", updatediscount_status ? 1 : 0);
//     if (updatediscount_percentage) {
//       formData.append("discount_percentage", Number(updatediscount_percentage));
//     }
//     if (updateimage) {
//       formData.append("image", updateimage);
//     }
//     // إضافة _method للسماح بتحديث البيانات مع استخدام FormData
//     formData.append("_method", "PUT");

//     try {
//       // تغيير الرابط ليتناسب مع بيئة عملك
//       const response = await axios.post(
//         `http://localhost:8000/api/products/${productId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log("تم تحديث المنتج:", response.data);
//       // يمكنك إعادة توجيه المستخدم أو تحديث الحالة هنا
//     } catch (error) {
//       console.error("حدث خطأ أثناء تحديث المنتج:", error);
//       if (error.response && error.response.data.errors) {
//         setErrors(error.response.data.errors);
//       }
//     }
//   };

//   // Add new Product
//   const [detailsAdd, setDetailsAdd] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [prix, setPrix] = useState(0);
//   const [quantity, setQuantity] = useState(0);
//   const [suitable, setSuitable] = useState("");
//   const [type, setType] = useState("");
//   const [discountStatus, setDiscountStatus] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState("");
//   const [image, setImage] = useState(null);
//   const [errors, setErrors] = useState({});

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     // إعداد FormData وإضافة جميع البيانات المطلوبة
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("prix", Number(prix)); // تحويل إلى رقم
//     formData.append("quantity", Number(quantity)); // تحويل إلى رقم
//     formData.append("suitable", suitable);
//     formData.append("type", type);
//     formData.append("discount_status", discountStatus ? 1 : 0); // إرسال قيمة رقمية بدلاً من Boolean
//     if (discountPercentage) {
//       formData.append("discount_percentage", Number(discountPercentage));
//     }
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/products",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log("تم إنشاء المنتج:", response.data);
//       alert("تم إنشاء المنتج:");
//     } catch (error) {
//       console.error("حدث خطأ:", error);
//       setErrors(error);
//       alert("حدث خطأ:");

//       if (error.response && error.response.data.errors) {
//         console.log("أخطاء التحقق:", error.response.data.errors);
//         // يمكنك تحديث حالة الأخطاء هنا لعرضها في الواجهة
//       }
//     }
//   };

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
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((product) => (
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
//                           setproductId(product.id);
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
//           <p>Quantity: {productById.quantity}</p>

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
//           <form className=" text-left" onSubmit={handleUpdateProduct}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Name :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
//                 value={updatename}
//                 onChange={(e) => {
//                   setupdatename(e.target.value);
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
//                 value={updatedescription}
//                 onChange={(e) => {
//                   setupdatedescription(e.target.value);
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
//                 value={updateprix}
//                 onChange={(e) => {
//                   setupdateprix(e.target.value);
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
//                 value={updatequantity}
//                 onChange={(e) => {
//                   setupdatequantity(e.target.value);
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
//                 value={updatesuitable}
//                 onChange={(e) => {
//                   setupdatesuitable(e.target.value);
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
//                 value={updatetype}
//                 onChange={(e) => {
//                   setupdatetype(e.target.value);
//                   // setCurrentPage(1);
//                 }}
//               >
//                 <option value="">Select Type</option>
//                 <option value="food">Food</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 DiscountStatus :
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 value={updatediscount_status}
//                 onChange={(e) => {
//                   setupdatediscount_status(e.target.value);
//                 }}
//               >
//                 <option value="">Select DiscountStatus</option>
//                 <option value="true">True</option>
//                 <option value="false">False</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 DiscountPercentage :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 value={updatediscount_percentage}
//                 onChange={(e) => {
//                   setupdatediscount_percentage(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Image :
//               </label>
//               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                 Image
//               </label>
//               <input
//                 className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                 id="default_size"
//                 type="file"
//                 value={updateimage}
//                 onChange={(e) => setupdateImage(e.target.files[0])}
//               />

//               {errors.image && <p>{errors.image}</p>}
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
//         </div>
//       )}
//       {detailsAdd && (
//         <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
//           <form className=" text-left" onSubmit={handleAddProduct}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Name :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 type="text"
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
//                 onChange={(e) => {
//                   setDescription(e.target.value);
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
//                   setPrix(e.target.value);
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
//                   setQuantity(e.target.value);
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
//                   setSuitable(e.target.value);
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
//                   setType(e.target.value);
//                 }}
//               >
//                 <option value="">Select Type</option>
//                 <option value="food">Food</option>
//                 <option value="accessory">Accessory</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 DiscountStatus :
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200"
//                 onChange={(e) => {
//                   setDiscountStatus(e.target.value);
//                 }}
//               >
//                 <option value="">Select DiscountStatus</option>
//                 <option value="true">True</option>
//                 <option value="false">False</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 DiscountPercentage :
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none"
//                 type="number"
//                 onChange={(e) => {
//                   setDiscountPercentage(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Image :
//               </label>
//               {/* <input
//                 type="file"
//                 onChange={(e) => setImage(e.target.files[0])}
//               /> */}
//               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                 Image
//               </label>
//               <input
//                 className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                 id="default_size"
//                 type="file"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               {errors.image && <p>{errors.image}</p>}
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

// export default Products;

import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  // حالات العرض الرئيسية
  const [showTable, setShowTable] = useState(true);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState(false);
  const [productById, setProductById] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameproduct, setNameproductSearch] = useState("");
  const [prixSearch, setPrixSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [suitableSearch, setSuitableSearch] = useState("");
  const usersPerPage = 5;

  // حالات إضافة منتج جديد
  const [detailsAdd, setDetailsAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [suitable, setSuitable] = useState("");
  const [type, setType] = useState("");
  const [discountStatus, setDiscountStatus] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  // حالات تحديث منتج
  const [detailsUpdate, setDetailsUpdate] = useState(false);
  const [updatename, setupdatename] = useState("");
  const [updatedescription, setupdatedescription] = useState("");
  const [updateprix, setupdateprix] = useState("");
  const [updatequantity, setupdatequantity] = useState("");
  const [updatesuitable, setupdatesuitable] = useState("");
  const [updatetype, setupdatetype] = useState("");
  const [updatediscount_status, setupdatediscount_status] = useState(false);
  const [updatediscount_percentage, setupdatediscount_percentage] =
    useState("");
  const [updateimage, setupdateImage] = useState(null);
  const [productId, setproductId] = useState(null);

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // تحديث حقول التحديث عند تغير المنتج المختار
  useEffect(() => {
    if (productById) {
      setupdatename(productById.name || "");
      setupdatedescription(productById.description || "");
      setupdateprix(productById.prix || "");
      setupdatequantity(productById.quantity || "");
      setupdatesuitable(productById.suitable || "");
      setupdatetype(productById.type || "");
      setupdatediscount_status(productById.discount_status);
      setupdatediscount_percentage(productById.discount_percentage || "");
      setupdateImage(null); // تعيين null لملف الصورة حتى يتم اختيار صورة جديدة
    }
  }, [productById]);

  // تصفية المنتجات بناءً على مدخلات البحث
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

  // عرض تفاصيل المنتج
  const handleShow = (id) => {
    const product = products?.data?.find((p) => p.id === id);
    if (product) {
      setProductById(product);
      setDetails(true);
    }
  };

  // تهيئة بيانات التحديث عند الضغط على زر التعديل
  const handleUpdate = (id) => {
    const product = products?.data?.find((p) => p.id === id);
    if (product) {
      setProductById(product);
      setproductId(product.id);
      setDetailsUpdate(true);
    }
  };

  // دالة تحديث المنتج
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatename);
    formData.append("description", updatedescription);
    formData.append("prix", Number(updateprix));
    formData.append("quantity", Number(updatequantity));
    formData.append("suitable", updatesuitable);
    formData.append("type", updatetype);
    formData.append("discount_status", updatediscount_status ? 1 : 0);
    if (updatediscount_percentage) {
      formData.append("discount_percentage", Number(updatediscount_percentage));
    }
    if (updateimage) {
      formData.append("image", updateimage);
    }
    // استخدام method spoofing لتحديث (PUT)
    formData.append("_method", "PUT");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/products/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("تم تحديث المنتج:", response.data);
      alert("تم تحديث المنتج");

      // يمكنك هنا إعادة تحميل القائمة أو تحديث الحالة حسب الحاجة
      setDetailsUpdate(false);
      setShowTable(true);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث المنتج:", error);
      alert("حدث خطأ أثناء تحديث المنتج");
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // دالة إضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("prix", Number(prix));
    formData.append("quantity", Number(quantity));
    formData.append("suitable", suitable);
    formData.append("type", type);
    formData.append("discount_status", discountStatus ? 1 : 0);
    if (discountPercentage) {
      formData.append("discount_percentage", Number(discountPercentage));
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("تم إنشاء المنتج:", response.data);
      alert("تم إنشاء المنتج");
      setDetailsAdd(false);
      setShowTable(true);
    } catch (error) {
      console.error("حدث خطأ:", error);
      setErrors(error);
      alert("حدث خطأ");
      if (error.response && error.response.data.errors) {
        console.log("أخطاء التحقق:", error.response.data.errors);
      }
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/products/${id}`
      );
      console.log("تم حذف المنتج:", response.data.message);
      // تحديث حالة المنتجات بعد الحذف، على سبيل المثال:
      setProducts((prev) => ({
        ...prev,
        data: prev.data.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error("حدث خطأ أثناء حذف المنتج:", error);
      // يمكنك هنا عرض رسالة للمستخدم أو التعامل مع الخطأ حسب الحاجة
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      {showTable && (
        <div>
          <div className="flex justify-end">
            <button
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => {
                setDetailsAdd(true);
                setShowTable(false);
              }}
            >
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
                        onClick={() => {
                          handleShow(product.id);
                          setShowTable(false);
                        }}
                      >
                        Show
                      </button>
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => {
                          setproductId(product.id);
                          handleUpdate(product.id);
                          setShowTable(false);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                          if (window.confirm("هل أنت متأكد من الحذف؟")) {
                            deleteProduct(product.id);
                          }
                        }}
                      >
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
      )}

      {/* عرض تفاصيل المنتج */}
      {details && productById && (
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
          <h3 className="text-xl font-bold">{productById.name}</h3>
          <img
            src={`http://localhost:8000/storage/${productById.image}`}
            // src={product.image}
            alt={productById.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <p>{productById.description}</p>
          <p>Price: {productById.prix}</p>
          <p>Suitable for: {productById.suitable}</p>
          <p>Type: {productById.type}</p>
          <p>Quantity: {productById.quantity}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setDetails(false);
              setShowTable(true);
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* نموذج تحديث المنتج */}
      {detailsUpdate && productById && (
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
          <form className="text-left" onSubmit={handleUpdateProduct}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text"
                value={updatename}
                onChange={(e) => setupdatename(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text"
                value={updatedescription}
                onChange={(e) => setupdatedescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Prix :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                value={updateprix}
                onChange={(e) => setupdateprix(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                value={updatequantity}
                onChange={(e) => setupdatequantity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Suitable :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={updatesuitable}
                onChange={(e) => setupdatesuitable(e.target.value)}
              >
                <option value="">Select Suitable</option>
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="birds">Birds</option>
                <option value="fishes">Fishes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Type :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={updatetype}
                onChange={(e) => setupdatetype(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="food">Food</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                DiscountStatus :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={updatediscount_status.toString()}
                onChange={(e) =>
                  setupdatediscount_status(e.target.value === "true")
                }
              >
                <option value="">Select DiscountStatus</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                DiscountPercentage :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                value={updatediscount_percentage}
                onChange={(e) => setupdatediscount_percentage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Image :
              </label>
              <input
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={(e) => setupdateImage(e.target.files[0])}
              />
              {errors.image && <p>{errors.image}</p>}
            </div>
            <div className="mb-4 flex space-x-4">
              <input
                type="submit"
                value="Update"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              />
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setDetailsUpdate(false);
                  setShowTable(true);
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {/* نموذج إضافة منتج جديد */}
      {detailsAdd && (
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto mt-4">
          <form className="text-left" onSubmit={handleAddProduct}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Prix :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                onChange={(e) => setPrix(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Suitable :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                onChange={(e) => setSuitable(e.target.value)}
              >
                <option value="">Select Suitable</option>
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="birds">Birds</option>
                <option value="fishes">Fishes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Type :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="food">Food</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                DiscountStatus :
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                onChange={(e) => setDiscountStatus(e.target.value === "true")}
              >
                <option value="">Select DiscountStatus</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                DiscountPercentage :
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="number"
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Image :
              </label>
              <input
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && <p>{errors.image}</p>}
            </div>
            <div className="mb-4 flex space-x-4">
              <input
                type="submit"
                value="Add"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              />
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setDetailsAdd(false);
                  setShowTable(true);
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Products;
