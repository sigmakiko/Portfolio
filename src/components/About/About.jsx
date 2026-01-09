import { motion } from "framer-motion";

import SectionHeader from "../SectionHeader/SectionHeader";

import educationImg from "../../assets/imgs/book.webp";
import journeyImg from "../../assets/imgs/finance.webp";
import skillsImg from "../../assets/imgs/pc.webp";
import projectsImg from "../../assets/imgs/card.webp";

import styles from "./styles.module.css";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <section className={`${styles.about}`} id="about">
      <Container>
        <SectionHeader
          title="About"
          highlightText="Me"
          subtitle="Get to know more about my background and skills"
        />
        <div className={`${styles.cards} row gap-3`}>
          <motion.div
            className={`${styles.card} col-xl-7 col-lg-12 container`}
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className={`${styles.animatedGradient}`}></div>
            <div className={styles.cardImg}>
              <img src={educationImg} alt="card img" />
            </div>

            <div className={styles.txt}>
              <h3>Education</h3>
              <p>
                Benha University
                <br />
                Computer Science and artificial intelligenceComputer Science and
                artificial intelligence
                <br />
                Sep 2022 - Jul 2026
                <br />
                Grade: Excellent (3.64)
                <br />
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} col-xl-4 col-lg-12  container`}
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className={`${styles.animatedGradient}`}></div>
            <div className={styles.cardImg}>
              <img src={journeyImg} alt="card img" />
            </div>

            <div className={styles.txt}>
              <h3>Journey</h3>
              <p>
                I started my career as a passionate developer, diving deep into
                <br /> JavaScript, React, and other frontend technologies.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} col-xl-4 col-lg-12  container`}
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className={`${styles.animatedGradient}`}></div>
            <div className={styles.cardImg}>
              <img src={projectsImg} alt="card img" />
            </div>

            <div className={styles.txt}>
              <h3>Projects</h3>
              <p>
                I’ve worked on several projects that involve building e-commerce
                platforms, and interactive websites with seamless user
                experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} col-xl-7 col-lg-12  container`}
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className={`${styles.animatedGradient}`}></div>
            <div className={styles.cardImg}>
              <img src={skillsImg} alt="card img" />
            </div>

            <div className={styles.txt}>
              <h3>Skills</h3>
              <p>
                I specialize in building highly interactive UIs with <br />
                React, Redux, and Next.js.
                <br /> I am also proficient in
                <br /> HTML, CSS, JavaScript, and other web technologies.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
