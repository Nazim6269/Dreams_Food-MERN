import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  //handle google Success function
  const handleGoogleSuccess = async (googleData) => {
    const userInfo = jwtDecode(googleData.credential);
    const { name, email, sub: googleId, picture } = userInfo;

    const createUser = {
      name,
      email,
      googleId,
      picture,
    };

    const res = await fetch("http://localhost:3333/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUser),
    });

    const userData = await res.json();

    dispatch(setProfileInfo(createUser));
    profileInLocalStorage(createUser);
    setAccessTokenCookie("accessToken", userData.payload, 30);
    navigate("/");
  };

  //handle error function
  const handleGoogleError = (error) => {
    console.log(error);
  };

  //handle change function
  const handleChange = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const person = { ...value };

    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      const data = await res.json();

      if (data.success) {
        // Function to set a value in cookie storage with an expiration time
        setAccessTokenCookie("accessToken", data.payload, 30);
        navigate("/");
      } else {
        toast(data.message);
      }
      setValue({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <Card className="w-5/12 p-3 border-none shadow-md  mx-auto">
        <h2 className="mx-auto mb-4 text-pink-600 font-bold text-3xl">Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={value.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={value.password}
              onChange={(e) => handleChange({ password: e.target.value })}
              placeholder="Enter your password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <button
              className="btn border-none text-white font-semibold bg-pink-600 hover:bg-pink-500 w-full text-center"
              type="submit"
            >
              Login
            </button>

            <ToastContainer position="top-center" autoClose={4000} />
            <div className="text-center my-3 font-semibold underline text-pink-600 ">
              <Link to="/forget-password">Forget Password?</Link>
            </div>
            <button
              className="btn mb-3 border-none text-white font-semibold bg-pink-600 hover:bg-pink-500 w-full text-center"
              type="submit"
            >
              <Link to="/signup">Create new account</Link>
            </button>

            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </GoogleOAuthProvider>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
