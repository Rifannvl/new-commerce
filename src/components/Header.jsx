import React from "react";
import SearchComponent from "./SearchBar";

export default function Header() {
  const [open, setOpen] = React.useState(false);

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
        {/* Desktop Navigation (lg+) */}
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              {/* Links for Desktop */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <a href="#" className="text-base font-medium text-black">
                  Features
                </a>
                <a href="#" className="text-base font-medium text-black">
                  Solutions
                </a>
                <a href="#" className="text-base font-medium text-black">
                  Resources
                </a>
                <a href="#" className="text-base font-medium text-black">
                  Pricing
                </a>
              </div>

              {/* Logo */}
              <div className="lg:absolute lg:-translate-x-1/3 lg:inset-y-5 lg:left-1/2">
                <div className="flex-shrink-0">
                  <SearchComponent />
                </div>
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
                  fill="none"
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

              {/* Sign In / Sign Up for Desktop */}
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <a href="#" className="text-base font-medium text-black">
                  Sign up
                </a>
                <a href="#" className="text-base font-medium text-black">
                  Sign in
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full"
                >
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation (xs to lg) */}
        <nav className="py-4 bg-white lg:hidden">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Menu
              </p>

              {/* Mobile Close Button */}
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen(!open)}
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div
              className={`mt-6 ${
                open ? "block" : "hidden"
              } transition-all duration-300`}
            >
              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Solutions
                </a>
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Resources
                </a>
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Pricing
                </a>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign up
                </a>
                <a
                  href="#"
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
