import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../helpers/logout";
import style from "./modal.module.css";

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
            onClick={() => {
              logout(profile);
            }}
            className=""
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
