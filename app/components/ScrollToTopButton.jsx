"use client"
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "@/app/styles/ScrollToTopButton.module.css"
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className={styles.scrollToTop} onClick={scrollToTop}>
        <FaArrowUp className={styles.arrowIcon} />
      </div>
    )
  );
}
