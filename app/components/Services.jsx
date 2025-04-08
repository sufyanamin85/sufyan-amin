"use client";
import Link from "next/link";
import styles from "../styles/Services.module.css";

const Services = () => {
  // Hardcoded services data
  const services = [
    {
      _id: "1",
      title: "Website Development",
      description:
        "We specialize in creating modern high-performance websites and web applications using cutting-edge technologies like React.js Next.js Node.js Express.js MongoDB Python and Flask. Our goal is to deliver scalable secure and user-friendly solutions tailored to your business needs.",
      icon: "/webdevelopment.jpg",
    },
    {
      _id: "2",
      title: "SaaS Development",
      description:
        "We specialize in building powerful and scalable SaaS applications using cutting-edge technologies like React.js, Next.js, Node.js, Express.js, MongoDB, Python, and Flask. Our solutions are built for speed, security, and seamless integration, ensuring a top-notch user experience. Whether it's multi-tenant support, data security, or cloud scalability, we provide robust, high-performance SaaS applications tailored to your business needs.",
      icon: "/saas-development.jpg",
    },
    {
      _id: "3",
      title: "UI/UX Development",
      description:
        "We specialize in creating modern, user-friendly, and visually appealing UI/UX designs that enhance engagement and usability. Using tools like Figma, Adobe XD, and Sketch, we design pixel-perfect, responsive, and intuitive interfaces that align with your brand identity. Our goal is to provide seamless digital experiences by combining aesthetics with functionality, ensuring accessibility, usability, and user satisfaction.",
      icon: "/ui-development.jpg",
    },
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.textContent}>
        <p className={styles.smallText}>Creative Service</p>
        <h2 className={styles.largeText}>Solutions I Offer You</h2>
      </div>

      <div className={styles.cardsContainer}>
        {services.map((service) => (
          <Link
            href={`/ServicesDetails/${service._id}`}
            key={service._id}
            passHref
            className={styles.link}
          >
            <div className={styles.card}>
              {service.icon && (
                <div className={styles.icon}>
                  <img
                    src={service.icon}
                    alt={service.title}
                    className={styles.serviceImage}
                  />
                </div>
              )}
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>
                {service.description.length > 100
                  ? `${service.description.substring(0, 100)}...`
                  : service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
