import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ query, onSearch }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // Memeriksa apakah pengguna sudah login dari localStorage
  const isLoggedIn = localStorage.getItem("authToken") ? true : false;

  // Menangani pencarian

  // Menangani logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    navigate("/login"); // Redirect ke halaman login
  };

  // Mengontrol scroll body jika menu mobile terbuka
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <div>
      <header>
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              {/* Links for Desktop */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <Link
                  to="/product"
                  className="text-base font-medium text-black"
                >
                  All
                </Link>
                <Link to="#" className="text-base font-medium text-black">
                  Solutions
                </Link>
                <Link to="#" className="text-base font-medium text-black">
                  Resources
                </Link>
                <Link to="/" className="text-base font-medium text-black">
                  Pricing
                </Link>
              </div>

              {/* Logo dan Search */}
              <div className="lg:absolute lg:-translate-x-1/3 lg:inset-y-5 lg:left-1/2">
                <div className="flex-shrink-0">
                  {/* Panggil input pencarian */}
                  <input
                    type="text"
                    value={query}
                    onChange={onSearch}
                    placeholder="Search products..."
                    className="px-4 py-2 border rounded-md w-full md:w-64"
                  />
                </div>
              </div>

              {/* Auth Links (Login/Logout & Register) */}
              <div className="flex items-center space-x-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/cart"
                      className="text-base font-medium text-black"
                    >
                      Cart
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-base font-medium text-black"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-base font-medium text-black"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-base font-medium text-black"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
