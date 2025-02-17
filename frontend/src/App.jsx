import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import Settings from "./views/Settings";
import Client from "./views/Client";
import NotFound from "./views/NotFound";
import Header from "./components/Hedaer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/fishs" element={<Fishs />} />
        <Route path="/births" element={<Births />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/client" element={<Client />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
