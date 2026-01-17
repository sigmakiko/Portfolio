import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { useCharacter } from "../../context/CharacterContext";

import styles from "./styles.module.css";

import character from "../../assets/imgs/character.webp";
import characterPixel from "../../assets/imgs/characterPixel.webp";
import characterWink from "../../assets/imgs/wink.webp";
import characterPixelWink from "../../assets/imgs/characterPixelWink.webp";
import icon1 from "../../assets/imgs/icon1.webp";
import icon2 from "../../assets/imgs/icon2.webp";
import { useMotionValue } from "motion/react";

// Code symbols for burst effect
const codeSymbols = [
  "</>",
  "{ }",
  "[ ]",
  "JS",
  "=>",
  "( )",
  "CSS",
  "HTML",
  "TS",
  "React",
  "Pixel",
];

const Hero = () => {
  const { isPixelated, setIsPixelated } = useCharacter();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isWinking, setIsWinking] = useState(false);
  const [particles, setParticles] = useState([]);

  const controls = useAnimation();
  const imageControls = useAnimation();

  // Spawn particles function
  const spawnParticles = () => {
    const particleCount = Math.floor(Math.random() * 3) + 8; // 8-10 particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const angle =
        (Math.PI * 2 * i) / particleCount + (Math.random() * 0.4 - 0.2);
      const distance = 120 + Math.random() * 80; // 120-200px radius

      return {
        id: Date.now() + Math.random(),
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        scale: 1.2 + Math.random() * 0.3,
      };
    });

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  // Digital Dissolve transition function
  const handlePixelateClick = async () => {
    // Step 1: Apply blur and brightness
    await imageControls.start({
      filter: "blur(8px) brightness(1.2)",
      scale: 1.05,
      transition: { duration: 0.15 },
    });

    // Step 2: Swap the image while blurred
    setIsPixelated(!isPixelated);

    // Trigger code burst at the moment of pixelation
    spawnParticles();

    // Step 3: Clear blur with spring effect (pixels "snap" into place)
    await imageControls.start({
      filter: "blur(0px) brightness(1)",
      scale: [1.05, 1],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    });
  };

  const handleDragEnd = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    });
  };

  return (
    <div
      className={`${styles.hero} text-center d-flex align-items-center flex-column`}
      id="home"
    >
      <h1 className={styles.head}>
        Hi, I am <br />{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={isPixelated ? "kiko" : "karim"}
            className={isPixelated ? styles.pixelatedName : styles.normalName}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isPixelated ? "kiko.div" : "Karim Ashraf"}
          </motion.span>
        </AnimatePresence>
      </h1>
      <p>
        I am a <span style={{ fontWeight: 800 }}>frontend developer</span>{" "}
        focused on creating websites that provide the best experience for users.
      </p>

      <div className={styles.characterContainer}>
        <motion.img
          src={
            isPixelated
              ? isWinking
                ? characterPixelWink
                : characterPixel
              : isWinking
              ? characterWink
              : character
          }
          onMouseEnter={() => setIsWinking(true)}
          onMouseLeave={() => setIsWinking(false)}
          onClick={handlePixelateClick}
          animate={imageControls}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{ cursor: "pointer" }}
        />

        {/* Code Burst Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className={styles.particle}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: particle.scale,
                rotate: particle.rotation,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
                duration: 0.8,
              }}
            >
              {particle.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className={styles.roundy}></div>
      <>
        <motion.div
          className={`${styles.icon1}`}
          drag
          onDragEnd={() => handleDragEnd()}
          animate={controls}
          style={{ x, y }}
        >
          <img
            style={{
              width: "350px",
            }}
            draggable="false"
            src={icon1}
            alt="icon of setting"
          />
        </motion.div>
        <motion.div className={`${styles.icon2}`}>
          <img
            style={{ width: "350px" }}
            draggable="false"
            src={icon2}
            alt="icon of bar2"
          />
        </motion.div>
      </>
    </div>
  );
};

export default Hero;
