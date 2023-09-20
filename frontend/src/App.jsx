// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetails from "./Components/CardDetails/CardDetails";
import LoginForm from "./Components/Login/LoginForm";
import SignupForm from "./Components/signup/SignupForm";
import store from "./redux/store";
import Cart from "./screens/Cart";
import Home from "./screens/Home";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/cardDetails/:id" element={<CardDetails />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="*" exact element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
