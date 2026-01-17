import { motion } from "framer-motion";

import SectionHeader from "../SectionHeader/SectionHeader";
import CvButton from "../CvButton/CvButton";

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
              <h3>The Logic Base</h3>
              <p>
                My technical DNA was formed at{" "}
                <span style={{ fontWeight: 800 }}>Benha University</span>,
                studying Computer Science and AI. It’s where I learned that
                great frontend isn’t just about looks—it’s about the solid logic
                and performance that power every pixel.
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
              <h3>The Evolution</h3>
              <p>
                I don’t just build websites; I make them breathe. My mission as
                kiko.div is to bridge the gap between static code and
                interactive reality.
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
              <h3>Real-World Impact</h3>
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
              <h3>The Interaction Stack</h3>
              <p>
                I master <span style={{ fontWeight: 800 }}>React</span>,{" "}
                <span style={{ fontWeight: 800 }}>Next.js</span>, and{" "}
                <span style={{ fontWeight: 800 }}>Framer Motion</span> to
                deliver seamless, high-performance UIs. My focus is on
                'Micro-interactions' and performance optimization, ensuring that
                every user journey is as fast as it is beautiful.
              </p>
            </div>
          </motion.div>
        </div>
        {/* Simple CV Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          <CvButton />
        </div>
      </Container>
    </section>
  );
};

export default About;
