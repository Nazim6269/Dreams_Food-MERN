import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setValue((prev) => {
      return { ...prev, ...value };
    });
  };

  //handle submit functioin
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = { ...value };

    try {
      const res = await fetch("http://localhost:3333/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
      const errMessage = (await res.json()).message;

      if (errMessage.match(/name/gi)) {
        setNameErr(errMessage);
        setEmailErr(null);
        setPassErr(null);
      }
      if (errMessage.match(/email/gi)) {
        setEmailErr(errMessage);
        setPassErr(null);
        setNameErr(null);
      }
      if (errMessage.match(/password/gi)) {
        setPassErr(errMessage);
        setPassErr(null);
        setEmailErr(null);
      }

      setValue({ name: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (nameErr || emailErr || passErr) {
      const timer = setTimeout(() => {
        setNameErr(null);
        setEmailErr(null);
        setPassErr(null);
      }, 5000);
      () => clearTimeout(timer);
    }
  }, [nameErr, emailErr, passErr]);

  return (
    <div className="p-20">
      <Card className=" border-none shadow-md w-5/12 p-3 mx-auto ">
        <h2 className="mx-auto mb-4 font-bold text-3xl">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={value.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="Enter your name"
            />
            {nameErr && (
              <div className="text-red-600 font-semibold">{nameErr}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={value.email}
              placeholder="name@example.com"
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </Form.Group>
          {emailErr && (
            <div className="text-red-600 font-semibold">{emailErr}</div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={value.password}
              placeholder="Enter your password"
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            {passErr && (
              <div className="text-red-600 font-semibold">{passErr}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <button
              className="btn text-pink-600 w-full font-semibold border-pink-600 hover:text-white hover:bg-pink-600"
              type="submit"
            >
              Signup
            </button>
          </Form.Group>
        </Form>
        <div className="text-center font-semibold  text-blue-600">
          <Link to="/login" className="text-pink-600 hover:text-pink-700">
            Already user?
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupForm;
