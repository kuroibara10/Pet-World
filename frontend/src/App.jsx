import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Join from "./views/Join";
import Products from "./views/Products";
import About from "./views/About";
import Contacts from "./views/Contacts";
import Dashbord from "./views/Dashbord";
import NotFound from "./views/NotFound";
import Header from "./components/Hedaer";
import Footer from "./components/Footer";
import AdminDashboard from "./views/Admindashboard";
import CilentDashbord from "./views/CilentDashbord";
import { useState } from "react";
import ProductsPet from "./views/ProductPet";
import closepng from "./assets/icons/close.png";
import Payment from "./views/Payment";

function App() {
  const location = useLocation();
  const [id, setId] = useState();
  const [roleu, setRoleuser] = useState("");
  const [islog, setIslog] = useState(false);

  const localisationPage = location.pathname === "/admin";
  const coloreadmin = "bg-green-600";
  const coloreclient = "bg-blue-600";
  const [demands, setDemands] = useState([]);
  const [showCart, setShowcart] = useState(false);
  const deleteproductCart = (nameProduct) => {
    setDemands((prevDemands) => {
      const index = prevDemands.findIndex(
        (demand) => demand.name === nameProduct
      );
      if (index !== -1) {
        const updatedDemands = [...prevDemands];
        updatedDemands.splice(index, 1);
        return updatedDemands;
      }
      return prevDemands;
    });
  };
  const navigate = useNavigate();

  const handleOrderCart = () => {
    navigate("/payment", { state: { demands } });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {localisationPage ? (
        <Header
          colorepage={coloreadmin}
          islog={islog}
          setIslog={setIslog}
          id={id}
          roleu={roleu}
        />
      ) : (
        <Header
          colorepage={coloreclient}
          islog={islog}
          setIslog={setIslog}
          id={id}
          roleu={roleu}
          setShowcart={setShowcart}
        />
      )}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000]">
          <div className="bg-white p-5 rounded-lg w-[90%] max-w-[500px] relative">
            <div>
              <img
                src={closepng}
                alt="close cart"
                className="absolute top-[10px] right-[10px] w-[30px] h-[30px] cursor-pointer"
                onClick={() => {
                  setShowcart(false);
                }}
              />
            </div>
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Prix</th>
                  <th className="p-3 border border-gray-300">Suituable</th>
                  <th className="p-3 border border-gray-300">Type</th>
                  <th className="p-3 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {demands.length > 0 ? (
                  demands.map((demand) => (
                    <tr className="bg-white hover:bg-gray-100" key={demand.id}>
                      <td className="p-3 border border-gray-300">
                        {demand.name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {demand.prix}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {demand.suitable}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {demand.type}
                      </td>
                      <td className="p-3 border border-gray-300 flex space-x-2">
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => {
                            deleteproductCart(demand.name);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Cart Empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
              onClick={handleOrderCart}
            >
              Order
            </button>
          </div>
        </div>
      )}
      {/* <Header /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home demands={demands} setDemands={setDemands} islog={islog} />
          }
        />
        <Route
          path="/join"
          element={
            <Join
              setId={setId}
              islog={islog}
              setIslog={setIslog}
              setRoleuser={setRoleuser}
            />
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:section"
          element={
            <ProductsPet
              demands={demands}
              setDemands={setDemands}
              islog={islog}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/client/:username" element={<CilentDashbord id={id} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {localisationPage ? (
        <Footer colorepage={coloreadmin} />
      ) : (
        <Footer colorepage={coloreclient} />
      )}
    </div>
  );
}

export default App;
