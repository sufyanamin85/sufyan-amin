'use client';
import { useState } from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa'; // Import the quote icon
import styles from '../styles/Testimonial.module.css'; // Assuming styles are defined here

const Testimonial = () => {
  const testimonials = [
    {
      image: '/team1.jpg',
      name: 'John Doe',
      designation: 'CEO, Tech Innovators',
      description:
        'Working with this team was an absolute pleasure! Their attention to detail and commitment to excellence exceeded our expectations.',
    },
    {
      image: '/team3.jpg',
      name: 'Sarah Smith',
      designation: 'Marketing Director, Digital Solutions',
      description:
        'Highly skilled professionals! They delivered a top-notch website for our business, boosting our online presence significantly.',
    },
    {
      image: '/team4.jpg',
      name: 'Michael Brown',
      designation: 'Founder, Startup X',
      description:
        'Their dedication and expertise were evident throughout the project. Our SaaS platform now runs smoothly thanks to their amazing work!',
    },
    {
      image: '/team5.jpg',
      name: 'Emily Johnson',
      designation: 'Product Manager, UX Studio',
      description:
        'A truly talented team that understands UI/UX design like no other. They transformed our vision into reality with ease.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Only 1 testimonial at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.textContent}>
        <p className={styles.smallText}>Valued Feedback</p>
        <h2 className={styles.largeText}>What Our Clients Say</h2>
        <p className={styles.description}>
          Discover what our clients have to say about their experience with us. Their words reflect our dedication to quality and trust.
        </p>
      </div>
      <Slider {...settings} className={styles.slider}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.flex}>
              <div className={styles.leftSide}>
                <div className={styles.imageContainer}>
                  <div className={styles.circle}></div>
                  <img src={testimonial.image} alt={testimonial.name} className={styles.image} />
                </div>
              </div>
              <div className={styles.rightSide}>
                <div className={styles.testimonialContent}>
                  <FaQuoteLeft className={styles.quoteIcon} />
                  <p className={styles.comment}>{testimonial.description}</p>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.name}>{testimonial.name}</h4>
                    <p className={styles.title}>{testimonial.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonial;
