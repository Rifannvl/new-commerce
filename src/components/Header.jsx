import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ query, onSearch }) {
  const [open, setOpen] = React.useState(false); // State untuk mengontrol tampilan menu
  const navigate = useNavigate();

  // Memeriksa apakah pengguna sudah login dari localStorage
  const isLoggedIn = localStorage.getItem("authToken") ? true : false;

  // Menangani logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    navigate("/"); // Redirect ke halaman login
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
        <div className="">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              {/* Links for Desktop */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <Link to="/home">
                  <svg
                    id="logo-72"
                    width="30"
                    height="100%"
                    viewBox="0 0 53 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                      className="ccustom"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </Link>
                <Link
                  to="/product"
                  className="text-base font-medium text-white"
                >
                  All
                </Link>
                <Link to="#" className="text-base font-medium text-white">
                  Solutions
                </Link>
                <Link to="#" className="text-base font-medium text-white">
                  Resources
                </Link>
                <Link to="/" className="text-base font-medium text-white">
                  Pricing
                </Link>
              </div>

              {/* Logo dan Search */}
              <div className="lg:absolute lg:-translate-x-1/3 lg:inset-y-5 lg:left-1/2 flex items-center space-x-4">
                {/* Logo untuk Desktop dan Mobile View */}
                <Link to="/home">
                  <svg
                    id="logo-72"
                    width="30"
                    height="100%"
                    viewBox="0 0 53 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                      className="ccustom"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </Link>
                {/* Search Bar */}
                <div className="flex-shrink-0 w-full md:w-64">
                  <input
                    type="text"
                    value={query}
                    onChange={onSearch}
                    placeholder="Search products..."
                    className="px-4 py-2 border rounded-md w-full"
                  />
                </div>
              </div>

              {/* Auth Links (Login/Logout & Register) */}
              <div className="flex items-center space-x-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/cart"
                      className="text-base font-medium text-white"
                    >
                      Cart
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-base font-medium text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-base font-medium text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-base font-medium text-white"
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
                {/* Hamburger SVG */}
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-neutral-800 text-white">
            <div className="space-y-6 py-6 px-6">
              {/* Logo di Mobile View */}
              <div className="flex justify-center mb-6">
                <Link to="/home">
                  <svg
                    id="logo-72"
                    width="40"
                    height="100%"
                    viewBox="0 0 53 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                      className="ccustom"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </Link>
              </div>

              <ul className="space-y-4">
                <li>
                  <Link
                    to="/home"
                    className="text-base font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product"
                    className="text-base font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-base font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-base font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-base font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Pricing
                  </Link>
                </li>

                {/* Auth Links (Login/Logout & Register) */}
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/cart"
                        className="text-base font-medium text-white"
                        onClick={() => setOpen(false)}
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="text-base font-medium text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="text-base font-medium text-white"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="text-base font-medium text-white"
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
