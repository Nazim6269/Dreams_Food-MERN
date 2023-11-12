import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="text-white bg-pink-600 font-semibold body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center md:mb-0">
            <div className="ml-3 text-xl italic">Dreams Food</div>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap  items-center text-base justify-center">
            <a className="mr-5">Home</a>
            <a className="mr-5">About</a>
            <a className="mr-5"> Contact</a>
            <a className="mr-5">Profile</a>
          </nav>
          {/* Navbar Button  */}

          <Link
            to="/cart"
            className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-white rounded   md:mt-0"
          >
            Go to cart
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
