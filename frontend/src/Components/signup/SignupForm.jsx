import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessTokenCookie } from "../../helpers/setAccessToken";
import { profileInLocalStorage } from "../../helpers/setLocalStorage";
import { setProfileInfo } from "../../redux/actions/actionsCreator";

//==========sign up component starts from here==========//
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const data = await res.json();

      if (!data.success) {
        toast(data.message);
        setValue({ name: "", email: "", password: "" });
      } else {
        setAccessTokenCookie("accessToken", data.payload, 30);
        dispatch(setProfileInfo(newPerson));
        profileInLocalStorage(newPerson);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <Card className="w-5/12  border-none shadow-sm p-3 mx-auto ">
        <h2 className="mx-auto mb-4 font-bold text-pink-600 text-3xl">
          Signup
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              value={value.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={value.email}
              placeholder="name@example.com"
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={value.password}
              placeholder="Enter your password"
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <button
              className="btn font-semibold mb-2 w-full text-white bg-pink-600 hover:bg-pink-500"
              type="submit"
            >
              Sign up
            </button>
            <ToastContainer position="top-center" autoClose={4000} />
            <button
              className="btn w-full font-semibold text-white bg-pink-600 hover:bg-pink-500"
              type="submit"
            >
              <Link to="/login">Login</Link>
            </button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default SignupForm;
