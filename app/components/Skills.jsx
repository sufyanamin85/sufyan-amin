"use client";
import styles from "../styles/Skills.module.css";

const Skills = () => {
  const skills = [
    { name: "Frontend Development", percentage: 90 },
    { name: "Backend Development", percentage: 85 },
    { name: "React.js & Next.js", percentage: 92 },
    { name: "Python Flask & Django", percentage: 80 },
    { name: "MongoDB & SQL", percentage: 85 },
  ];

  return (
    <section className={styles.skillsSection}>
      {/* Left Side */}
      <div className={styles.leftContent}>
        <div className={styles.sectionTitle}>
          <div className={styles.line}></div>
          <span>My Skills</span>
        </div>
        <h2 className={styles.heading}>Skills That Drive Results</h2>
        <p className={styles.description}>
          I like to share my skills and experience with new people so they 
          can realize my talents.
        </p>
      </div>

      {/* Right Side - Skills Bars */}
      <div className={styles.rightContent}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skill}>
            <div className={styles.skillName}>{skill.name}</div>
            <div className={styles.skillBar}>
              <div
                className={styles.filledBar}
                style={{ width: `${skill.percentage}%` }}
              >
                <span className={styles.percentage}>{skill.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
