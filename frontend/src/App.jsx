import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetails from "./Components/CardDetails/CardDetails";
import LoginForm from "./Components/Login/LoginForm";
import PrivateRoute from "./Components/Private/PrivateRoute";
import SignupForm from "./Components/signup/SignupForm";
import store from "./redux/store";
import Cart from "./screens/Cart";
import Home from "./screens/Home";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/cardDetails/:id" exact element={<CardDetails />} />

            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignupForm />} />

          {/* <Route path="*" exact element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
