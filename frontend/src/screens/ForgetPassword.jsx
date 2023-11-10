import React from "react";
import { Card, Form } from "react-bootstrap";

const ForgetPassword = () => {
  return (
    <div className="p-20">
      <Card className="border-none shadow-md w-5/12 p-3  mx-auto">
        <h2 className="mx-auto mb-4 font-bold text-3xl">Enter Your E-mail</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          <Form.Group className="mb-3">
            <button
              className="btn text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
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
