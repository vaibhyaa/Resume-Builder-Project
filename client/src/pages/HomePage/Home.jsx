import React from "react";
import Banner from "../../components/HomePageComponents/Banner";
import { Hero } from "../../components/HomePageComponents/Hero";
import { Features } from "../../components/HomePageComponents/Features";
import Testimonial from "../../components/HomePageComponents/Testimonial";
import UpdatedTestimonal from "../../components/HomePageComponents/UpdatedTestimonal";
import CallToAction from "../../components/HomePageComponents/CallToAction";
import Footer from "../../components/HomePageComponents/Footer";

const Home = () => {
  return (
    <>
      <Banner />
      <Hero />
      <Features />
      {/* <Testimonial /> */}
	  <UpdatedTestimonal/>
	  <CallToAction/>
	  <Footer/>
    </>
  );
};

export default Home;
