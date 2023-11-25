import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  //handle change function
  const handleChange = (value) => {
    setEmail(value);
  };
  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setEmail("");
      const data = await response.json();
      toast(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <Card className="w-5/12 p-3 border-none shadow-md  mx-auto">
        <h2 className="mx-auto mb-4 text-pink-600 font-bold text-3xl">
          Enter Your E-mail
        </h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => handleChange(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <ToastContainer position="top-center" autoClose={4000} />
          <Form.Group className="mb-3">
            <button
              onClick={handleSubmit}
              className="btn border-none text-white font-semibold bg-pink-600 hover:bg-pink-500 w-full text-center"
              type="submit"
            >
              Send
            </button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
