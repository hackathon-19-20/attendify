'use client';
import { FC } from 'react'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardGrid from "./home/Hero";
import About from "./home/About";
import { Button } from "@/components/ui/button";

const AttendifyLandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Main Section with Wave Background */}
      <div className="bg-background relative min-h-screen flex flex-col md:flex-row items-center justify-center">
        
        {/* Wave SVG at the top */}
        <div className="absolute top-0 left-0 w-full ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fca5a5" fill-opacity="1" d="M0,288L80,240C160,192,320,96,480,58.7C640,21,800,43,960,64C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        </div>

        {/* Content Section */}
        <div
          className={`transform transition-all duration-1000 ease-in-out ${
            isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-50 opacity-0'
          }`}
        >
          <header className="text-center mb-8">
            <h1 className="text-6xl font-bold text-foreground">Attendify</h1>
          </header>
          <section className="text-center">
            <p className="text-xl text-gray-500">
              Track your attendance, avoid shortfall.
            </p>
          </section>
          <div className="flex md:mt-7 justify-center">
            <Button className="bg-background p-6 text-forground border-2 border-gray-500 hover:bg-foreground hover:text-background rounded-3xl">Start</Button>
          </div>
        </div>
      </div>
      
      {/* Other Components */}
      <About/>
      <CardGrid />
    </>
  );
};

export default AttendifyLandingPage;
