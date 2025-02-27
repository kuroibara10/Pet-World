// import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./views/Home";
import Join from "./views/Join";
import Products from "./views/Products";
import Cats from "./views/Cats";
import Dogs from "./views/Dogs";
import Fishs from "./views/Fishs";
import Births from "./views/Births";
import About from "./views/About";
import Contacts from "./views/Contacts";
import Dashbord from "./views/Dashbord";
import NotFound from "./views/NotFound";
import Header from "./components/Hedaer";
import Footer from "./components/Footer";
import AdminDashboard from "./views/Admindashboard";
import CilentDashbord from "./views/CilentDashbord";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [id, setId] = useState();
  const [roleu, setRoleuser] = useState("");
  const [islog, setIslog] = useState(false);

  const localisationPage = location.pathname === "/admin";
  const coloreadmin = "bg-green-600";
  const coloreclient = "bg-blue-600";

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
        <Header colorepage={coloreclient} />
      )}

      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/join"
          element={
            <Join setId={setId} setIslog={setIslog} setRoleuser={setRoleuser} />
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/fishs" element={<Fishs />} />
        <Route path="/births" element={<Births />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/client" element={<CilentDashbord />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
