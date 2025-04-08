'use client'
import React, { useState } from "react";
import styles from "../styles/FAQSection.module.css"; // Importing the CSS module

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the purpose of this service?",
      answer:
        "This service helps users manage their bookings and get the best offers in one place. It simplifies the booking process and ensures customer satisfaction.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact customer support by emailing us at support@service.com or through the live chat on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and bank transfers. All payment methods are secure and encrypted.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking through your account or by contacting our support team. Terms and conditions apply.",
    },
    {
      question: "How do I track my booking?",
      answer:
        "You can track your booking status from the 'My Bookings' section in your account dashboard.",
    },
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2>FAQ on the Service</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
          >
            <div className={styles.question}>
              <span>{faq.question}</span>
              <button
                className={styles.toggleBtn}
                onClick={() => toggleAnswer(index)}
              >
                {activeIndex === index ? "-" : "+"}
              </button>
            </div>
            {activeIndex === index && (
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
