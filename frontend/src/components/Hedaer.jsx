import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Pet_World.png";
import logo2 from "../assets/Pet_World_Dark.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Header({ colorepage, islog, setIslog, id, roleu }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  let listPetAnimals = ["dogs", "cats", "birds", "fishes"];

  const capitalizeFirstCharacter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/userss/${id}`
          );
          setUserInfo(response.data);
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      };

      fetchUserInfo();
    }
  }, [id]);
  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      setIslog(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`${colorepage} text-white py-4 px-6 fixed top-0 left-0 w-full shadow-lg z-50 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src={location.pathname === "/" ? logo : logo2}
            alt="Logo"
            className="h-10 mr-4"
          />
        </NavLink>

        <nav>
          {listPetAnimals.map((section, index) => (
            <NavLink
              key={index}
              to={`/products/${section}`}
              className={({ isActive }) =>
                isActive ? "text-sky-50 mx-5" : "text-gray-950 mx-5"
              }
            >
              {capitalizeFirstCharacter(section)}
            </NavLink>
          ))}
        </nav>
      </div>

      {islog ? (
        <div className="flex items-center">
          {roleu === "admin" ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "text-gray-50 mx-5" : "text-gray-950 mx-5"
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <Link to={`/client/${userInfo?.data.username}`}>
              <img
                src={userInfo?.data ? userInfo.data.photo : "Loading..."}
                // src={userInfo?.photo || "default-profile.png"}
                alt="Client"
                className="h-10 mr-4 rounded-full"
              />
            </Link>
          )}
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded shadow"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/join">
          <button className="bg-white text-blue-600 px-4 py-2 rounded shadow">
            Join
          </button>
        </Link>
      )}
    </header>
  );
}

export default Header;
