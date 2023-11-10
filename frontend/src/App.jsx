import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetails from "./Components/CardDetails/CardDetails";
import LoginForm from "./Components/Login/LoginForm";
import SignupForm from "./Components/signup/SignupForm";
import store from "./redux/store";
import Cancel from "./screens/Cancel";
import Cart from "./screens/Cart";
import ForgetPassword from "./screens/ForgetPassword";
import Home from "./screens/Home";
import ResetPassword from "./screens/ResetPassword";
import Success from "./screens/Success";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignupForm />} />
          <Route path="/cardDetails/:id" exact element={<CardDetails />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/success" exact element={<Success />} />
          <Route path="/cancel" exact element={<Cancel />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route
            path="/forget-password/:id/:token"
            exact
            element={<ForgetPassword />}
          />
          {/* <Route path="*" exact element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
