import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  console.log(useParams());

  //handle send function
  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3333/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPass, confirmPass }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-20">
      <Card className="w-5/12 p-3 border-none shadow-md  mx-auto">
        <h2 className="mx-auto mb-4 text-pink-600 font-bold text-3xl">
          Enter Your Password
        </h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <button
              className="btn border-none text-white font-semibold bg-pink-600 hover:bg-pink-500 w-full text-center"
              type="submit"
              onClick={handleSend}
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
