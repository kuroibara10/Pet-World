import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Pet_World.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Header({ colorepage, islog, setIslog, id, roleu }) {
  const [userInfo, setUserInfo] = useState([]);
  const [rolec, setRolec] = useState("client");
  if (id !== null) {
    useEffect(() => {
      // جلب معلومات المستخدم بناءً على ID
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/userss/${id}`
          );
          setUserInfo(response.data);
          if (userInfo.data.role == "admin") {
            setRolec("admin");
          }
          console.log(rolec);
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      };
      fetchUserInfo();
    }, [id]);
  } else {
    console.log("Note Login");
  }

  const navigate = useNavigate();
  const setLogout = () => {
    setIslog(false);
    navigate("/");
  };
  console.log(`statue login: ${islog}`);
  return (
    <header
      className={`${colorepage} text-white py-4 px-6 fixed top-0 left-0 w-full shadow-lg z-50 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 mr-4" />
        </Link>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 mx-5" : "mx-5"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cats"
            className={({ isActive }) =>
              isActive ? "text-blue-500 mx-5" : "mx-5"
            }
          >
            Cats
          </NavLink>
          <NavLink
            to="/dogs"
            className={({ isActive }) =>
              isActive ? "text-blue-500 mx-5" : "mx-5"
            }
          >
            Dogs
          </NavLink>
          <NavLink
            to="/fishs"
            className={({ isActive }) =>
              isActive ? "text-blue-500 mx-5" : "mx-5"
            }
          >
            Fishs
          </NavLink>
          <NavLink
            to="/birds"
            className={({ isActive }) =>
              isActive ? "text-blue-500 mx-5" : "mx-5"
            }
          >
            Birds
          </NavLink>
        </nav>
      </div>

      {islog ? (
        <div className="flex items-center">
          {rolec == "admin" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-500 mx-5" : "mx-5"
              }
            >
              Dashboard
            </NavLink>
          )}
          <Link to={`/client`}>
            <img
              src={userInfo?.data ? userInfo.data.photo : "Loading..."}
              alt="Client"
              className="h-10 mr-4 rounded-full"
            />
          </Link>
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded shadow"
            onClick={() => setLogout(false)}
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
