import React from "react";
import About from '../components/home/About';
import CardGrid from '../components/home/CardGrid';
import FooterDemo from "../components/home/Footer";
import { Hero } from "../components/home/Hero";


const AttendifyLandingPage: React.FC = () => {
  return(<>
      <Hero />
      <About/>
      <CardGrid />
      <FooterDemo />
    </>
  );
};

export default AttendifyLandingPage;
