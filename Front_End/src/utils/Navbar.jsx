import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  //   const { user, logout } = useAuth();
  const user = [];
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  return (
    <nav className="bg-white fixed top-0 left-0 z-[5]  px-[2.2vw] h-[10vh] w-full ">
      {/* Logo */}
      <div className="nav-wrapper h-full w-full flex justify-between items-center">
        <Link
          to="/"
          className="text-[2.2vw] flex items-center font-[600] text-[#FE7743]"
        >
          ReWear
        </Link>

        {/* Links */}
        <div className="flex gap-[2vw] items-center">
          <Link
            to="/items"
            className="hover:underline text-[1.1vw] underline-offset-2 duration-[0.18s] hover:text-[#FE7743] text-black"
          >
            Browse
          </Link>

          {/* Only show when logged in */}
          {user && (
            <>
              <Link
                to="/add-item"
                className="hover:underline text-[1.1vw] underline-offset-2 duration-[0.18s] hover:text-[#FE7743] text-black"
              >
                List Item
              </Link>
              <Link
                to="/dashboard"
                className="hover:underline text-[1.1vw] underline-offset-2 duration-[0.18s] hover:text-[#FE7743] text-black"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Admin panel visible only if role is admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:underline text-[1.1vw] underline-offset-2 duration-[0.18s] hover:text-[#FE7743] text-black"
            >
              Admin
            </Link>
          )}

          {/* If not logged in, show Login/Register */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-[1.1vw] text-white px-[2vw] py-[1vw] rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            // If logged in, show Logout
            <button
              onClick={handleLogout}
              className="bg-[#FE7743]  text-[1.1vw] font-[400] cursor-pointer active:scale-[0.98] duration-[0.2s] text-white px-[1.5vw] py-[0.6vw] hover:bg-[#447D9B]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
