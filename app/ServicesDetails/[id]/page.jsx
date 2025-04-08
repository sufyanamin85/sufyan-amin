"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/ServicesDetails.module.css";
import { FaCircle, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import FAQSection from "../../components/FAQSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const dummyServices = [
  {
    _id: "1",
    title: "Website Development",
    description:
      "We specialize in creating modern high-performance websites and web applications using cutting-edge technologies like React.js Next.js Node.js Express.js MongoDB Python and Flask. Our goal is to deliver scalable secure and user-friendly solutions tailored to your business needs.",
    images: [ "/webdev.jpg"],
    categories: [ "React.js","Next.js","NodeJS","ExpressJs","MongoDB","Python","Flask","MySQL"],
    checkSteps: ["Seamless frontend and backend integration.","Responsive fast and visually appealing.","Optimized for growth and data protection.","Efficient data management with MongoDB & Flask.","Fast SEO-friendly and mobile-responsive."],
  },
  {
    _id: "2",
    title: "SaaS Development",
    description:
      "We specialize in building powerful and scalable SaaS applications using cutting-edge technologies like React.js, Next.js, Node.js, Express.js, MongoDB, Python, and Flask. Our solutions are built for speed, security, and seamless integration, ensuring a top-notch user experience. Whether it's multi-tenant support, data security, or cloud scalability, we provide robust, high-performance SaaS applications tailored to your business needs.",
    images: ["/saas.jpg"],
    categories: ["React.Js","Node.Js","Express.Js","MongoDB","Next.Js","Python","Flask","MySQL"],
    checkSteps: ["Designed to handle growth with robust security measures.","Efficient SaaS applications that serve multiple users with isolated data.","Secure APIs, authentication, and encryption.","Using MongoDB, PostgreSQL, or Firebase for structured and unstructured data.","Optimized for performance, search rankings, and user accessibility."],
  },
  {
    _id: "3",
    title: "UI/UX Development",
    description:
      "We specialize in creating modern, user-friendly, and visually appealing UI/UX designs that enhance engagement and usability. Using tools like Figma, Adobe XD, and Sketch, we design pixel-perfect, responsive, and intuitive interfaces that align with your brand identity. Our goal is to provide seamless digital experiences by combining aesthetics with functionality, ensuring accessibility, usability, and user satisfaction.",
    images: ["/ui.jpg"],
    categories: [ "Figma","Adobe XD","Sketch","Framer","Chakra UI"],
    checkSteps: ["Crafting visually stunning and intuitive interfaces for an exceptional user experience.","Ensuring seamless usability across all devices and screen sizes.","Designing for inclusivity with WCAG-compliant practices.","Creating interactive prototypes to validate ideas before development.","Maintaining uniform design patterns for brand coherence and recognition."],
  },
];

const ServiceDetailsPage = () => {
  const { id } = useParams(); // Get the service ID from URL
  const [service, setService] = useState(null);

  useEffect(() => {
    if (!id) return;
    const selectedService = dummyServices.find((s) => s._id === id);
    setService(selectedService || dummyServices[0]); // Fallback to first service if not found
  }, [id]);

  if (!service) return <div className={styles.loaderContainer}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="mainContent">
        <div className={styles.portfolioDetails}>
          {/* Top Section */}
          <div className={styles.backgroundSection}>
            <h1 className={styles.pageTitle}>{service.title}</h1>
            <p className={styles.breadcrumb}>
              <Link href="/" className={styles.link}>
                Home
              </Link>{" "}
              <span className={styles.arrow}>&gt;</span> <span>Services Details</span>
            </p>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            {/* Left Content */}
            <div className={styles.leftContent}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className={styles.imageSlider}
              >
                {service.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Service ${index}`} className={styles.portfolioImage} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.description}>
                <h2>Description</h2>
                <p>{service.description}</p>
              </div>

              <div className={styles.specialFeatures}>
                <h2 className={styles.subTitle}>Tools & Technologies</h2>
                <ul className={styles.technologiesList}>
                  {service.categories.map((tech, index) => (
                    <li key={index} className={styles.technologyBox}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.checkSteps}>
                <h2>Key Features</h2>
                <ul className={styles.checkList}>
                  {service.checkSteps.map((step, index) => (
                    <li key={index}>
                      <FaCircle className={styles.icon} /> {step}
                    </li>
                  ))}
                </ul>
              </div>
              <FAQSection />
            </div>

            {/* Right Section */}
            <div className={styles.rightCard}>
              <h3>Category</h3>
              <div className={styles.categories}>
                {dummyServices.map((s, index) => (
                  <Link href={`/ServicesDetails/${s._id}`} key={index} className={styles.category}>
                    {s.title} <FaChevronRight className={styles.arrowIcon} />
                  </Link>
                ))}
              </div>
              <div className={styles.supportSection}>
                <h3>Need support for this service?</h3>
                <Link href="https://wa.me/03365464893" className={styles.contactButton}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailsPage;
