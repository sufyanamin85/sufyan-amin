'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking a link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        {/* Company Logo */}
        <Link href="/" className="navbar-brand">
          <Image
            src="/devenue.png"
            alt="Company Logo"
            width={105}
            height={65}
          />
        </Link>

        {/* Hamburger / Cross Icon */}
        <button
          className={`navbar-toggler ${styles.hamburger}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <IoClose size={30} color="#ef0454" className={styles.closeIcon} />
          ) : (
            <IoMenu size={30} color="#ef0454" />
          )}
        </button>

        {/* Navigation Links for Desktop */}
        <div
          className={`collapse navbar-collapse ${
            isOpen ? styles.showMenu : ""
          }`}
        >
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navLinks}`}>
            <li className={styles.navitem}>
              <Link href="/" className={styles.navlink} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="#about" className={styles.navlink} onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="#skills" className={styles.navlink} onClick={closeMenu}>
                Skills
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="#services" className={styles.navlink} onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="#portfolio" className={styles.navlink} onClick={closeMenu}>
                Portfolio
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="#testimonials" className={styles.navlink} onClick={closeMenu}>
                Testimonials
              </Link>
            </li>
          </ul>

          {/* Download CV Button */}
          <div className={styles.downloadCv}>
            <Link href="/cv.pdf" download className={styles.cvButton}>
              Download CV
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            <li>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="#skills" onClick={closeMenu}>
                Skills
              </Link>
            </li>
            <li>
              <Link href="#services" onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#portfolio" onClick={closeMenu}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="#testimonials" onClick={closeMenu}>
                Testimonials
              </Link>
            </li>
          </ul>

          {/* Mobile Download CV Button */}
          <div className={styles.mobileCvButton}>
            <Link href="/cv.pdf" download className={styles.cvButton}>
              Download CV
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
