import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cards from "../Components/Cards/Cards";
import CarouselDiv from "../Components/Carousel/Carousel";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

import { fetchData } from "../helpers/fetchData";
import {
  failedFetch,
  startFetch,
  successFetch,
} from "../redux/actions/actionsCreator";

const Home = () => {
  const dispatch = useDispatch();

  window.addEventListener("load", () => {
    if (!document.cookie.includes("myCookie=")) {
      window.location.href = "http://localhost:5173/login";
    }
  });

  //useEffect function for fetching data
  useEffect(() => {
    dispatch(startFetch());

    fetchData()
      .then((data) => {
        dispatch(successFetch(data));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(failedFetch());
      });
  }, [fetchData, dispatch]);

  return (
    <div>
      <Navbar />
      <CarouselDiv />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
