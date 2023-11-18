import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { profile } = useSelector((state) => state.profileReducer);

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
            className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-white rounded  hover:text-pink-600  md:mt-0"
          >
            Go to cart
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-white rounded  hover:text-pink-600 md:mt-0"
          >
            Login
          </Link>
          <Link className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-white hover:text-pink-600 rounded   md:mt-0">
            Log out
          </Link>
          <div className="flex items-center">
            <div className="mr-2 ml-6">
              <img
                className="w-8 h-8 rounded-full "
                src={profile.picture}
                alt=""
              />
            </div>
            <div>{profile.name}</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
