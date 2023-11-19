import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "../Components/Cards/Cards";

import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

import { fetchData } from "../helpers/fetchData";
import {
  failedFetch,
  startFetch,
  successFetch,
} from "../redux/actions/actionsCreator";
import HeroSection from "../Components/Hero/HeroSection";

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
      <HeroSection />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
