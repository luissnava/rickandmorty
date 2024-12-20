import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { globalContext } from "../context/Globalconntext";
import { navbarServer } from "./server";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { session } = context;

  return (
    <nav className="w-full flex justify-center items-center sticky top-0 p-5 shadow-xl bg-white z-50">
      <div className="w-full px-5">
        <Link to={"/"} className="hover:underline">
          <img src="/images/logo.webp" alt="logo" width={200} height={200} />
        </Link>
      </div>
      <div className="w-full">
        <ul className="w-full flex items-center justify-center gap-5">
          {navbarServer.map((item) => (
            <li key={item.id} className="text-center text-md">
              <NavLink to={item.url}  className={({ isActive }) =>
                                    isActive ? 'text-green-500' : ''
                                }>
                {session
                  ? item.title2
                    ? item.title2
                    : item.title
                  : item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
