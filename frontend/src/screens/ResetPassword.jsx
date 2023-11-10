import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //handle change function
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  //handle submit function
  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      setEmail("");
      setMessage(true);
    } else {
      toast.error("Invalid");
    }
  };
  return (
    <div className="p-20">
      <Card className="border-none shadow-md w-5/12 p-3  mx-auto">
        <h2 className="mx-auto mb-4 font-bold text-3xl">Enter Your E-mail</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            {message ? (
              <p>Pasword Reset Link successfully sent in your email</p>
            ) : null}
            <Form.Control
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <button
              className="btn text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
              type="submit"
              onClick={handleClick}
            >
              Send
            </button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
