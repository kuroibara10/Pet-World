import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 fixed top-0 left-0 w-full shadow-lg z-50 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 mr-4" />
        </Link>
        <nav>
          <NavLink to="/" className="mx-5" activeClassName="text-blue-500">
            Home
          </NavLink>
          <NavLink to="/cats" className="mx-5" activeClassName="text-blue-500">
            Cats
          </NavLink>
          <NavLink to="/dogs" className="mx-5" activeClassName="text-blue-500">
            Dogs
          </NavLink>
          <NavLink to="/fishs" className="mx-5" activeClassName="text-blue-500">
            Fishs
          </NavLink>
          <NavLink
            to="/births"
            className="mx-5"
            activeClassName="text-blue-500"
          >
            Births
          </NavLink>
        </nav>
      </div>
      <Link to="/join">
        <button className="bg-white text-blue-600 px-4 py-2 rounded shadow">
          Join
        </button>
      </Link>
    </header>
  );
}

export default Header;
