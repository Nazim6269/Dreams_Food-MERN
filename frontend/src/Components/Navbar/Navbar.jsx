import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccessToken } from "../../helpers/deleteAccessToken";

const Navbar = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profileReducer);

  //handle log out function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      deleteAccessToken("accessToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
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
            <Link className="mr-5">Home</Link>
            <Link className="mr-5">About</Link>
            <Link className="mr-5"> Contact</Link>
            <Link className="mr-5">Profile</Link>
          </nav>
          {/* Navbar Button  */}

          <div className="mx-auto">
            <Link
              to="/cart"
              className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-pink-500  md:mt-0"
            >
              Go to cart
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center text-white bg-pink-600 border-1 py-1 mx-2 px-3 focus:outline-none md:mt-0 hover:bg-pink-500"
            >
              Login
            </Link>
            <Link
              onClick={handleLogout}
              className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-pink-500  md:mt-0"
            >
              Log out
            </Link>
          </div>
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
