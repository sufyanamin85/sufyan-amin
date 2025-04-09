'use client';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import social media icons
import styles from '../styles/Footer.module.css'; // Assuming styles are defined here
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="Content">
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.socialMediaLinks}>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaFacebookF />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaInstagram />
            </Link>
            <Link href="https://www.linkedin.com/company/106318714/admin/dashboard/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaLinkedin />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaTwitter />
            </Link>
          </div>
          <div className={styles.footerText}>
            <p>© 2022 All rights reserved | Design & Develop by Devenue</p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="#services" className={styles.footerLink}>Services</Link>
            <Link href="#portfolio" className={styles.footerLink}>Portfolio</Link>
            <Link href="#skills" className={styles.footerLink}>Skills</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
