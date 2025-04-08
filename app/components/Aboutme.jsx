'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/AboutMe.module.css";

const AboutMe = () => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainContent">
    <section className={styles.aboutMeSection}>
      <div className={styles.leftSide}>
        <div className={styles.imageWrapper}>
          <Image src="/aboutme.png" alt="Daniyel Joseph" width={400} height={500} className={styles.profileImage} />
          <div className={styles.experienceCircle} style={{ transform: bounce ? "translateY(-5px)" : "translateY(5px)" }}>
            <span className={styles.experience}>8+</span> Experience
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
      <p className={styles.smallHeading}><span className={styles.underscore}>____</span> About Me</p>

        <h2 className={styles.mainHeading}>Well experienced Web Developer</h2>
        <p className={styles.description}>
          As a web developer, you probably immediately thought that the way to optimize for this is to include as many keywords as possible on your resume. Unfortunately for that solution.
        </p>
        <ul className={styles.detailsList}>
          <li><strong>Name:</strong> Muhammad Rafay Abdullah</li>
          <li><strong>Phone:</strong> (+92) 336-5464893</li>
          <li><strong>Email:</strong> abdurrafay459@gmail.com</li>
          <li><strong>Experience:</strong> 8+ years</li>
          <li><strong>Freelance:</strong> Available</li>
          <li><strong>Language:</strong> English</li>
        </ul>
        <div className={styles.statsWrapper}>
          <div className={styles.stat}><span>5</span> Happy Clients</div>
          <div className={styles.stat}><span>6</span> Projects Completed</div>
          <div className={styles.stat}><span>6</span> Awards Winner</div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutMe;
