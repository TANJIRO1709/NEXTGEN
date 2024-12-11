"use client"
import Hero from "./components/ui/pages/Hero";
import AboutUs from "./components/ui/pages/AboutUs"
import Stats from "./components/ui/common/Stats"
import Schemes from "./components/ui/pages/Schemes"
import FAQ from "./components/ui/pages/FAQ"
import AppFeatures from "./components/ui/pages/AppFeatures";
import Footer from "./components/ui/pages/Footer";
import {useState, useEffect} from "react";
import AnimatedLoader from "@/components/loadingComp";
export default function Home() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AnimatedLoader />;
  }
  return (
    <main className={`w-screen min-h-screen`}>
      <Hero/>
      <AboutUs />
      <AppFeatures />
      <Stats />   
      <Schemes />
      <FAQ /> 
      <Footer/>
    </main>
  );
}