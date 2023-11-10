import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/expirationToken";

const LoginForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);

  //handle Change function
  const handleChange = (value) => {
    setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handle Submit function
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
        setCookie(data.payload);
        navigate("/");
      } else {
        const data = await res.json();
        const errorMessage = data.message;

        if (errorMessage.match(/email/gi)) {
          setEmailError(errorMessage);
          setPassError(null);
        } else if (errorMessage.match(/password/gi)) {
          setPassError(errorMessage);
          setEmailError(null);
        }
      }

      setValue({ email: "", password: "" });
    } catch (error) {
      setEmailError("An error occurred while processing your request.");
      setPassError(null);
    }
  };

  useEffect(() => {
    if (emailError || passError) {
      const timer = setTimeout(() => {
        setEmailError(null);
        setPassError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailError, passError]);

  return (
    <div className="p-20">
      <Card className="border-none shadow-md w-5/12 p-3  mx-auto">
        <h2 className="mx-auto mb-4 font-bold text-3xl">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={value.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              placeholder="name@example.com"
            />
            {emailError && (
              <div className="text-red-600 font-semibold">{emailError}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={value.password}
              onChange={(e) => handleChange({ password: e.target.value })}
              placeholder="Enter your password"
            />
            {passError && (
              <div className="text-red-600 font-semibold">{passError}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <button
              className="btn text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
              type="submit"
            >
              Login
            </button>
          </Form.Group>
        </Form>
        <div className="text-center font-semibold  text-blue-600">
          <Link
            to={"/reset-password"}
            className="text-pink-600 hover:text-pink-700"
          >
            Forget Password?
          </Link>
        </div>

        <Link
          to="/signup"
          className="btn mt-3 text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
          type="submit"
        >
          Create New Account
        </Link>
        <Link
          to=""
          className="btn mt-3 text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
          type="submit"
        >
          Continue with Google
        </Link>
        <Link
          to=""
          className="btn mt-3 text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
          type="submit"
        >
          Create with Facebook
        </Link>
      </Card>
    </div>
  );
};

export default LoginForm;
