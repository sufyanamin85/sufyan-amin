'use client';
import Link from 'next/link';
import Slider from 'react-slick';
import styles from '../styles/Portfolio.module.css';

const Portfolio = () => {
  const portfolioData = [
    {
      _id: '1',
      title: 'EarnFlex',
      category: 'Web Development',
      images: ['/Earnflex.jpg'],
    },
    {
      _id: '2',
      title: 'Arez',
      category: 'SaaS Development',
      images: ['/Arez.jpg'],
    },
    {
      _id: '3',
      title: 'EPolice',
      category: 'Web & Mobile Development',
      images: ['/EPolice.jpg'],
    },
    {
      _id: '4',
      title: 'TripWaly',
      category: 'Web & Mobile Development',
      images: ['/TripWalae.jpg'],
    },
    {
      _id: '5',
      title: 'SiteGPT',
      category: 'AI/Machine Learning',
      images: ['/ss2.png'],
    },
    {
      _id: '6',
      title: 'SiteJetAI',
      category: 'AI/Machine Learning',
      images: ['/ss3.png'],
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.textContent}>
        <p className={styles.smallText}>Creative Portfolio</p>
        <h2 className={styles.largeText}>Recent Work Example</h2>
        <p className={styles.description}>
          Experiences that keep your customers coming back for more information about services. Makes best effort.
        </p>
      </div>
      <Slider {...settings} className={styles.slider}>
        {portfolioData.map((item) => (
          <Link href={`/PortfolioDetails/${item._id}`} key={item._id} passHref>
            <div className={styles.card}>
              <div
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${item.images?.[0] || '/default-image.jpg'})` }}
              >
                <div className={styles.overlay}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.subtitle}>{item.category}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default Portfolio;
