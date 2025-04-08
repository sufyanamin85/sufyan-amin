"use client";
import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import { FaEnvelope, FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Cross icon
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
const Header = () => {
  const [bounce, setBounce] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainContent">
      <header className={styles.headerSection}>
        {/* Left Social Sidebar */}
        <div className={styles.socialSidebar}>
          <div className={styles.verticalLine}></div>
          <span className={styles.followText}>Follow</span>
          <div className={styles.verticalLine}></div>
          <a href="https://github.com/Abdurrafay459" target="_blank" rel="noopener noreferrer">
  <FaGithub className={styles.socialIcon} />
</a>

<a href="https://www.linkedin.com/in/muhammadrafayabdullah" target="_blank" rel="noopener noreferrer">
  <FaLinkedin className={styles.socialIcon} />
</a>

          <FaInstagram className={styles.socialIcon} />
          <FaGoogle className={styles.socialIcon} />
          <div className={styles.smallVerticalLine}></div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
        <div className={`${styles.helloMessage} ${bounce ? styles.bounce : ""}`}>
  <span>Hello</span>
</div>

          <p className={styles.introText}>I'm</p>
          <h1 className={styles.mainHeading}>
            Abdul Rafay Abdullah <br /> <span>Web Developer</span>
          </h1>
          <p className={styles.description}>
            Web Developer with 8+ years experience that keeps customers coming back for services. Makes best effort.
          </p>
          <div className={styles.buttonGroup}>
          <Link href="https://wa.me/03365464893" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <button className={styles.sayHelloButton}>
               Say Hello <FaEnvelope className={styles.buttonIcon} />
            </button>
              </Link>
           
            <div className={styles.container}>
      {/* YouTube Button */}
      <button className={styles.watchButton} onClick={() => setShowVideo(true)}>
        <FaYoutube size={70} className={styles.buttonIcon} />
        <span>
          <span className={styles.watch}>Watch</span>
          <br />How I Work
        </span>
      </button>

      {/* Video Popup */}
      {showVideo && (
        <div className={styles.videoPopup}>
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/di8CSeG0Xbw"
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <IoClose className={styles.closeIcon} onClick={() => setShowVideo(false)} />
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
