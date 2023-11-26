import { useNavigate } from "react-router-dom";
import { deleteAccessToken } from "./deleteAccessToken";
import { useEffect } from "react";

export const logout = async (profile) => {
  const navigate = useNavigate();
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
