import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import logo from "../../assets/imgs/logo.webp";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  // Terminal loading messages
  const loadingLines = [
    "$ Initializing portfolio...",
    "$ Fetching projects...",
    "$ Loading Masaar AI engine...",
    "$ Optimizing UI...",
    "$ Ready!",
  ];

  useEffect(() => {
    // Cycle through loading messages
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < loadingLines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500); // Change line every 500ms

    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.preloader}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth slide
            delay: 0.5, // Delay slide-up to allow logo to fade out first
          }}
        >
          {/* Centered Logo */}
          <motion.img
            src={logo}
            alt="kiko.div logo"
            className={styles.logo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />

          <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalButtons}>
                <span className={styles.close}></span>
                <span className={styles.minimize}></span>
                <span className={styles.maximize}></span>
              </div>
              <div className={styles.terminalTitle}>portfolio.terminal</div>
            </div>

            <div className={styles.terminalBody}>
              {loadingLines.map((line, index) => (
                <motion.div
                  key={index}
                  className={styles.terminalLine}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index <= currentLine ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                  {index === currentLine && index < loadingLines.length - 1 && (
                    <motion.span
                      className={styles.cursor}
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      _
                    </motion.span>
                  )}
                  {index === loadingLines.length - 1 &&
                    index === currentLine && (
                      <motion.span
                        className={styles.checkmark}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      >
                        ✓
                      </motion.span>
                    )}
                </motion.div>
              ))}
            </div>

            {/* Loading bar */}
            <div className={styles.loadingBarContainer}>
              <motion.div
                className={styles.loadingBar}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
