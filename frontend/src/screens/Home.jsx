import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "../Components/Cards/Cards";
import CarouselDiv from "../Components/Carousel/Carousel";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { getExpiration } from "../helpers/expirationToken";
import { fetchData } from "../helpers/fetchData";
import {
  failedFetch,
  startFetch,
  successFetch,
} from "../redux/actions/actionsCreator";

const Home = () => {
  const dispatch = useDispatch();

  //useEffect function for fetching data
  useEffect(() => {
    dispatch(startFetch());

    fetchData()
      .then((data) => {
        dispatch(successFetch(data));
      })
      .catch(() => dispatch(failedFetch()));
  }, []);

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
