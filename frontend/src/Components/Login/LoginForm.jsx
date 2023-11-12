import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setExpiration } from "../../helpers/expirationToken";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const fbId = import.meta.env.VITE_FB_ID;

const LoginForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  //handle Success function
  const handleSuccess = async (googleData) => {
    const userInfo = jwtDecode(googleData.credential);
    const { name, email, sub: googleId } = userInfo;
    const createUser = {
      name,
      email,
      googleId,
    };

    const res = await fetch("http://localhost:3333/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUser),
    });

    const data = await res.json();
    console.log(data);
  };

  //handle error function
  const handleError = (error) => {
    console.log(error);
  };

  //handle change function
  const handleChange = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handle facebook success
  const handleFbSuccess = (response) => {
    console.log("Login Success!", response);
  };
  //handle facebook fail
  const handleFbFail = (error) => {
    console.log("Login Failed!", error);
  };
  //handle facebook profile success
  const handleFbProfileSuccess = (response) => {
    console.log("Get Profile Success!", response);
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
      if (res.ok) {
        const data = await res.json();

        // Function to set a value in local storage with an expiration time
        setExpiration("accessToken", data.payload, 5);
        navigate("/");
      }
      setValue({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-20">
      <Card className="w-3/12 p-3 border-none shadow-md  mx-auto">
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
            <div className="text-center my-3 font-semibold underline text-pink-600 ">
              <Link to="/signup">Forget Password?</Link>
            </div>
            <button
              className="btn mb-3 border-none text-white font-semibold bg-pink-600 hover:bg-pink-500 w-full text-center"
              type="submit"
            >
              <Link to="/signup">Create new account</Link>
            </button>

            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </GoogleOAuthProvider>

            <FacebookLogin
              appId={fbId}
              className="mt-3 rounded-md w-full bg-blue-600 hover:bg-blue-500 font-semibold text-white py-2 px-6 border-none"
              onSuccess={handleFbSuccess}
              onFail={handleFbFail}
              onProfileSuccess={handleFbProfileSuccess}
            />
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
