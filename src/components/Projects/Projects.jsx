import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "../SectionHeader/SectionHeader";
import projectsData from "./projectsData.json";
import styles from "./styles.module.css";

const Projects = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={containerRef} className={styles.projects} id="projects">
      <div className={styles.stickyWrapper}>
        <div style={{ marginBottom: "-2rem" }}>
          <SectionHeader
            title="Selected"
            highlightText="Projects"
            subtitle="Scroll to explore my work"
          />
        </div>

        <motion.div className={styles.horizontalContainer} style={{ x }}>
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className={styles.projectNumber}>0{project.id}</span>

              <div className={styles.imageWrapper}>
                <img
                  src={project.img}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <button className={styles.viewProject}>
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      View Project
                    </a>
                  </button>
                </div>
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.techStack}>
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={styles.techBadge}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className={styles.projectLinks}>
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.progressContainer}>
          <motion.div
            className={styles.progressBar}
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
