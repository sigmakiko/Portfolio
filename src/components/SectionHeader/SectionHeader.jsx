import { motion } from "framer-motion";
import styles from "./styles.module.css";

const SectionHeader = ({ title, subtitle, highlightText }) => {
  return (
    <div className={styles.sectionHeader}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {title}{" "}
        {highlightText && (
          <span className={styles.gradientText}>{highlightText}</span>
        )}
      </motion.h2>

      <motion.div
        className={styles.underline}
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      />

      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
