

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/expirationToken";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setExpiration } from "../../helpers/expirationToken";


const LoginForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

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
      <Card className="w-5/12 p-3  mx-auto">
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
            <button className="btn btn-outline-dark" type="submit">
              Submit
            </button>
          </Form.Group>
        </Form>
        <div className="text-center font-semibold underline text-blue-600">
          <Link to="/signup">New user?</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
