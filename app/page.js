import React from "react";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Testimonial from "./components/Testimonial";
import Aboutme from "./components/Aboutme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import ScrollToTopButton from "./components/ScrollToTopButton";

const Page = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTopButton/>
      <Header  />
      <section id="about"><Aboutme /></section>
      <section id="skills"><Skills /></section>
      <section id="services"><Services /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="testimonials"><Testimonial /></section>
      <Footer />
    </div>
  );
};

export default Page;
