import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const ResetPassword = () => {
  return (
    <div className="p-20">
      <Card className="w-5/12 p-3 border-none shadow-md  mx-auto">
        <h2 className="mx-auto mb-4 text-pink-600 font-bold text-3xl">
          Enter Your Password
        </h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <button
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

export default ResetPassword;
