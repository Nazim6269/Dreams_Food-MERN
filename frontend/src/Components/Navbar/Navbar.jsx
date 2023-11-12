import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="text-white bg-pink-600 font-semibold body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <div>
            <a className="flex title-font font-medium items-center md:mb-0">
              <div className="ml-3 text-3xl italic">Dreams Food</div>
            </a>
          </div>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap  items-center text-base justify-center">
            <a className="mr-5">Home</a>
            <a className="mr-5">About</a>
            <a className="mr-5"> Contact</a>
            <a className="mr-5">Profile</a>
          </nav>
          {/* Navbar Button  */}

          <Link
            to="/cart"
            className="inline-flex items-cente bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-white rounded hover:text-pink-600  md:mt-0"
          >
            Go to cart
          </Link>
          <div className="flex items-center">
            <div className="mr-2 ml-6">
              <img className="w-8 h-8 rounded-full " src="./Nazim.jpg" alt="" />
            </div>
            <div>Nazimuddin</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
