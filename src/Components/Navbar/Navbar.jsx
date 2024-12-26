import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import logo from "../../assets/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const { numberOfItem } = useContext(CartContext);
  const { numberOfWishList } = useContext(WishlistContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  let userName = localStorage.getItem("Username");
  let email = localStorage.getItem("UserEmail");

  const logout = () => {
    localStorage.removeItem("Token");
    setToken(null);
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-600 fixed w-full z-20 top-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="FreshCart Logo" className="h-8" />
        </Link>

        <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                : "text-gray-600 hover:text-green-600 px-3 py-1.5 font-semibold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                : "text-gray-600 hover:text-green-600 px-3 py-1.5 font-semibold"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/brands"
            className={({ isActive }) =>
              isActive
                ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                : "text-gray-600 hover:text-green-600 px-3 py-1.5 font-semibold"
            }
          >
            Brands
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                : "text-gray-600 hover:text-green-600 px-3 py-1.5 font-semibold"
            }
          >
            Categories
          </NavLink>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {token ? (
            <>
              <Link to="/wishlist" className="relative">
                <i className="text-green-600 fa-2xl fa-regular fa-heart"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {numberOfWishList}
                </span>
              </Link>
              <Link to="/cart" className="relative">
                <i className="text-green-600 fa-solid fa-2xl fa-shopping-cart"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {numberOfItem}
                </span>
              </Link>
            </>
          ) : (
            ""
          )}

          {token ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-main text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
              >
                {userName.charAt(0).toUpperCase()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <p className="px-4 py-2 text-main font-medium">{userName}</p>
                  <p className="px-4 py-2 text-gray-500 text-sm overflow-hidden border-b-2">
                    {email}
                  </p>
                  <div
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      navigate("/allOrders");
                    }}
                    className="border-b-2 w-full text-left px-5 py-3 hover:bg-lime-500 cursor-pointer"
                  >
                    All Orders
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 hover:bg-lime-500 "
                  >
                    log Out
                    <i className=" ms-2 fa-solid fa-right-from-bracket fa-xl"></i>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                    : "text-gray-600 hover:text-green-600  px-3 py-1.5 font-semibold"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-white px-3 py-1.5 rounded-md font-semibold transition-all duration-300 bg-main "
                    : "text-gray-600 hover:text-green-600 px-3 py-1.5 font-semibold"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-600 hover:text-green-600 focus:outline-none focus:bg-gray-400"
        >
          <i className="fas fa-bars text-xl text-lime-500"></i>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-600 hover:bg-lime-100 hover:text-lime-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="block px-4 py-2 text-gray-600 hover:bg-lime-100 hover:text-lime-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/brands"
            className="block px-4 py-2 text-gray-600 hover:bg-lime-100 hover:text-lime-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Brands
          </NavLink>
          <NavLink
            to="/categories"
            className="block px-4 py-2 text-gray-600 hover:bg-lime-100 hover:text-lime-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </NavLink>
        </div>
      )}
    </nav>
  );
}
