'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/app/styles/PortfolioDetails.module.css';
import { FaCircle } from "react-icons/fa";
import Link from 'next/link';
import Portfolio from '@/app/components/Portfolio';

// Import Swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const portfolioData = [
  {
    id: "1",
    title: "EarnFlex",
    images: ["/earnflex.jpg"],
    bulletPoints: "EARNFLEX is a powerful platform that optimizes workforce management with features like shift scheduling, vetting, and an integrated rota system.",
    categories: ["Python","Flask", "Vue.Js"],
    checkSteps: ["Effortless shift scheduling and top-tier staff vetting.", "Simplified communication for smoother operations.", "Connecting candidates with the right roles and opportunities.","Includes Background Checks Rota Management Fulfilments Invoices.","Enhances overall business productivity with a unified system."],
    startDate: "2023-03-13",
    endDate: "2023-12-26",
    clientName: "Waqas Ahmad",
    category: "Web Development",
    externalLink: "https://earnflex.com/",
  },
  {
    id: "2",
    title: "AREZ",
    images: ["/arez.png"],
    bulletPoints: "AREZ is a comprehensive workforce management solution designed for the UK security sector, offering real-time monitoring and optimal deployment.",
    categories: ["Python", "Django", "Vue.Js"],
    checkSteps: ["Real-time monitoring and efficient staff deployment.","Combines time management invoicing and payroll.", "Ensures compliance with security sector regulations.","Comprehensive background checks and constant monitoring.","Streamlined processes for enhanced productivity and compliance."],
    startDate: "2023-11-05",
    endDate: "2024-02-20",
    clientName: "Waqas Ahmad",
    category: "SaaS Development",
    externalLink: "https://arez.io/",
  },
  {
    id: "3",
    title: "EPolice",
    images: ["/police.jpg"],
    bulletPoints: "EPolice Platform integrates incident management with Control Room and Responder Apps, ensuring real-time reporting, and improved public safety.",
    categories: ["Python", "DJango", "Vue.Js"],
    checkSteps: ["Seamless coordination between Control Room Reporter and Responder Apps.", "Real-time updates and incident reporting via the Reporter App.", "Actionable on-ground insights for responders.","Optimized resource deployment for swift resolutions.","Improved communication across all teams for safety protocols."],
    startDate: "2020-02-28",
    endDate: "2022-09-20",
    clientName: "Uganda Govt",
    category: "Web & Mobile Development",
    
  },
  {
    id: "4",
    title: "TripWaly",
    images: ["/TripWalae.jpg"],
    bulletPoints: "A travel booking platform with real-time seat availability.",
    categories: ["React.Js", "Node.Js", "Express.Js","MongoDb"],
    checkSteps: ["Browse and book tours from diverse categories.", "Share feedback and subscribe to services.", "Create update accept/reject bookings and view reviews.","Manage tours bookings user activities and cities.","Full access to manage platform functionality and enhance user experience."],
    startDate: "2024-10-05",
    endDate: "2025-02-20",
    clientName: "Adbul Rafay Abdullah",
    category: "Web & Mobile Development",
    externalLink: "https://tripwaly.com/",
  }
];

const PortfolioDetails = () => {
  const { id } = useParams(); // Get the project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;
    const foundProject = portfolioData.find((item) => item.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return <div className={styles.error}>Project not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mainContent">
        <div className={styles.portfolioDetails}>
          {/* Top Section */}
          <div className={styles.backgroundSection}>
            <h1 className={styles.pageTitle}>{project.title}</h1>
            <p className={styles.breadcrumb}>
              <Link href="/" className={styles.link}>Home</Link> 
              <span className={styles.arrow}>&gt;</span> 
              <span>Portfolio Details</span>
            </p>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            {/* Left Content */}
            <div className={styles.leftContent}>
              {/* Image Slider */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className={styles.imageSlider}
              >
                {project.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Portfolio ${index}`} className={styles.portfolioImage} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.description}>
                <h2>Description</h2>
                <p>{project.bulletPoints}</p>
              </div>

              <div className={styles.specialFeatures}>
                <h2 className={styles.subTitle}>Tools & Technologies</h2>
                <ul className={styles.technologiesList}>
                  {project.categories.map((tech, index) => (
                    <li key={index} className={styles.technologyBox}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.checkSteps}>
                <h2>Key Features</h2>
                <ul className={styles.checkList}>
                  {project.checkSteps.map((step, index) => (
                    <li key={index}>
                      <FaCircle className={styles.icon} /> {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side */}
            <div className={styles.rightCard}>
              <h3>Information</h3>
              <div className={styles.infoItem}>
                <p className={styles.infoTitle}>Date</p>
                <p className={styles.infoValue}>
                  {new Date(project.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} - 
                  {new Date(project.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.infoTitle}>Client</p>
                <p className={styles.infoValue}>{project.clientName}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoTitle}>Category</p>
                <p className={styles.infoValue}>{project.category}</p>
              </div>
              {project.externalLink && (
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                  <button className={styles.watchLiveButton}>Watch Live</button>
                </a>
              )}
            </div>
          </div>
        </div>
        <Portfolio />
        <Footer />
      </div>
    </>
  );
};

export default PortfolioDetails;
