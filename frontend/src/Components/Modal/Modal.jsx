import React from "react";
import style from "./modal.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../helpers/logout";

const Modal = ({ closeModal, profile }) => {
  return (
    <>
      <div className={style.modalWrapper}></div>
      <div className={style.modalContainer}>
        <div className="flex flex-col capitalize text-gray-600 cursor-pointer">
          <span>change password</span>
          <span>manage accounts</span>
          <span>security and privacy</span>
          <Link
            onClick={logout(profile)}
            className="inline-flex items-center text-white bg-pink-600 border-1 py-1 px-3 focus:outline-none hover:bg-pink-500  md:mt-0"
          >
            Log out
          </Link>
          <button
            className="bg-pink-600 text-white capitalize mt-2 py-1 cursor-pointer"
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
