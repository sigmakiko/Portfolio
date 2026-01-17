import { motion } from "framer-motion";
import styles from "./CvButton.module.css";

const CvButton = () => {
  return (
    <motion.a
      href="/assets/documents/Kiko_CV.pdf"
      download="Karim_Ashraf_CV.pdf"
      className={styles.cvButton}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Download Karim Ashraf's CV"
    >
      {/* Download Icon */}
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3V16M12 16L8 12M12 16L16 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Button Text */}
      <span className={styles.text}>Download CV</span>
    </motion.a>
  );
};

export default CvButton;
