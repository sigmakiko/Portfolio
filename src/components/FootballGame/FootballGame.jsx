import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import useSound from "use-sound";

import { useCharacter } from "../../context/CharacterContext";

import styles from "./styles.module.css";

// Character images
import character from "../../assets/imgs/character.webp";
import characterPixel from "../../assets/imgs/characterPixel.webp";
import characterWink from "../../assets/imgs/wink.webp";
import characterPixelWink from "../../assets/imgs/characterPixelWink.webp";
import characterCelebrating from "../../assets/imgs/goal.webp";

// Sound effects
import kickSound from "../../assets/sounds/kick.mp3";
import goalSound from "../../assets/sounds/goal.mp3";
import winSound from "../../assets/sounds/win.mp3";
import clickSound from "../../assets/sounds/click.mp3";

import SectionHeader from "../SectionHeader/SectionHeader";
// Target icons (My Dev Promises)
const targets = [
  { id: 1, icon: "✅", name: "Clean Code", color: "#00f2ff", points: 125 },
  { id: 2, icon: "❤️", name: "User First", color: "#ff00ff", points: 125 },
  { id: 3, icon: "⚡", name: "Fast Perf.", color: "#ffff00", points: 125 },
];

// Code symbols for burst effect
const codeSymbols = ["⚽", "🎯", "GOAL!", "125", "🔥", "✅", "❤️", "⚡", "WIN"];

// Confetti colors
const confettiColors = ["#00f2ff", "#8a2be2", "#00ff88", "#ff00ff", "#ffff00"];

const FootballGame = () => {
  const { isPixelated } = useCharacter();

  // Sound mute state
  const [isMuted, setIsMuted] = useState(false);

  // Initialize sound hooks
  const [playKick] = useSound(kickSound, {
    soundEnabled: !isMuted,
    volume: 0.6,
  });
  const [playGoal] = useSound(goalSound, {
    soundEnabled: !isMuted,
    volume: 0.7,
  });
  const [playWin] = useSound(winSound, { soundEnabled: !isMuted, volume: 0.8 });
  const [playClick] = useSound(clickSound, {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  const [score, setScore] = useState(0);
  const [shotsTaken, setShotsTaken] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [isWinking, setIsWinking] = useState(false);
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [showGoalMessage, setShowGoalMessage] = useState(false);

  const gameAreaRef = useRef(null);
  const ballRef = useRef(null);
  const imageControls = useAnimation();

  // Track window dimensions for responsive calculations
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  // Handle window resize for dynamic coordinate recalculation
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize target positions
  useEffect(() => {
    if (gameStarted && !gameWon) {
      updateTargetPositions();
    }
  }, [gameStarted, gameWon, windowSize]);

  // Update target positions for animation
  const updateTargetPositions = () => {
    const positions = targets.map((target, index) => ({
      ...target,
      initialX: (index - 1) * 120, // Spread targets horizontally
    }));
  };

  // Spawn code burst particles
  const spawnParticles = (originX = 0, originY = 0) => {
    const particleCount = Math.floor(Math.random() * 3) + 8;
    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const angle =
        (Math.PI * 2 * i) / particleCount + (Math.random() * 0.4 - 0.2);
      const distance = 80 + Math.random() * 60;

      return {
        id: Date.now() + Math.random(),
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        scale: 1.2 + Math.random() * 0.3,
        originX,
        originY,
      };
    });

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  // Spawn confetti for win state
  const spawnConfetti = () => {
    const confettiCount = 50;
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 400 - 200,
      y: -(Math.random() * 300 + 100),
      rotation: Math.random() * 720,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 0.5,
      size: 8 + Math.random() * 8,
    }));

    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  // Digital dissolve effect for character
  const triggerPixelation = async () => {
    await imageControls.start({
      filter: "blur(8px) brightness(1.2)",
      scale: 1.05,
      transition: { duration: 0.15 },
    });

    spawnParticles();

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

  // Handle shooting the ball
  const handleShoot = async (target, targetElement) => {
    if (isShooting || gameWon) return;

    setIsShooting(true);

    // Play kick sound immediately
    playKick();

    const gameArea = gameAreaRef.current;
    const ball = ballRef.current;

    const targetRect = targetElement.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    // Calculate exact pixel difference from ball center to target center
    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Distance from ball to target (accurate for all screen sizes)
    const targetX = targetCenterX - ballCenterX;
    const targetY = targetCenterY - ballCenterY;

    setBallPosition({ x: targetX, y: targetY });

    // Wait for ball to reach target
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newScore = score + 125;
    setScore(newScore);
    setShotsTaken(shotsTaken + 1);

    // Play goal sound when scoring
    playGoal();

    setIsWinking(true);
    spawnParticles(targetX, targetY);
    setShowGoalMessage(true);

    setTimeout(() => {
      setIsWinking(false);
      setShowGoalMessage(false);
    }, 1000);

    if (newScore >= 500) {
      // Wait a moment before pixelation so user sees the final goal
      setTimeout(async () => {
        setGameWon(true);

        // Play win sound before celebrations
        playWin();

        await triggerPixelation();
        spawnConfetti();
      }, 800);
    }

    setTimeout(() => {
      setBallPosition({ x: 0, y: 0 });
      setIsShooting(false);
    }, 1000);
  };

  // Start game handler
  const handleStartGame = () => {
    playClick(); // Play click sound when starting game
    setGameStarted(true);
    setScore(0);
    setShotsTaken(0);
    setGameWon(false);
  };

  // Get character image based on state
  const getCharacterImage = () => {
    if (isWinking) {
      return isPixelated ? characterPixelWink : characterWink;
    }
    return isPixelated ? characterPixel : character;
  };

  // Target floating animation variants
  const targetVariants = {
    float: (i) => ({
      y: [0, -15, 0, 15, 0],
      x: [0, 10, 0, -10, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      boxShadow: [
        `0 0 15px ${targets[i].color}44`, // توهج خفيف (44 هي الشفافية)
        `0 0 35px ${targets[i].color}aa`, // توهج قوي (aa هي الشفافية)
        `0 0 15px ${targets[i].color}44`,
      ],
    }),
  };

  // Ball animation - use dynamic values
  const getBallAnimation = () => {
    if (isShooting) {
      return {
        x: ballPosition.x,
        y: ballPosition.y,
        rotate: 720,
        scale: [1, 1.2, 0.9, 1],
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      };
    }
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    };
  };

  const handleGameWon = () => {
    playClick(); // Play click sound
    // Scroll to contact section when game is won
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.gameSection} id="kiko-striker">
      <div className={styles.gameContainer}>
        <SectionHeader
          title="Kiko"
          highlightText="Striker"
          subtitle="Hitting professional targets as accurately as I hit these goals. Whether it’s clean code or a penalty kick, I never miss my mark!"
        />

        {/* Score Display */}
        <div className={styles.scoreBoard}>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Score</span>
            <motion.span
              className={styles.scoreValue}
              key={score}
              initial={{ scale: 1.5, color: "#00f2ff" }}
              animate={{ scale: 1, color: "#f1f1f1" }}
              transition={{ duration: 0.3 }}
            >
              {score}
            </motion.span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Target</span>
            <span className={styles.scoreValue}>500</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Shots</span>
            <span className={styles.scoreValue}>{shotsTaken}/4</span>
          </div>
        </div>

        {/* Game Area */}
        <div className={styles.gameArea} ref={gameAreaRef}>
          {/* Targets - My Dev Promises */}
          {gameStarted && !gameWon && (
            <div className={styles.targetsContainer}>
              {targets.map((target, index) => (
                <motion.button
                  key={target.id}
                  className={styles.target}
                  custom={index}
                  variants={targetVariants}
                  animate="float"
                  onClick={(e) => handleShoot(target, e.currentTarget)}
                  disabled={isShooting}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    left: `${25 + index * 25}%`,
                    borderColor: target.color,
                    boxShadow: `0 0 20px ${target.color}40, 0 0 40px ${target.color}20`,
                  }}
                >
                  <span className={styles.targetIcon}>{target.icon}</span>
                  <span
                    className={styles.targetName}
                    style={{ color: target.color }}
                  >
                    {target.name}
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Goal Message */}
          <AnimatePresence>
            {showGoalMessage && (
              <motion.div
                className={styles.goalMessage}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                GOAL! +125
              </motion.div>
            )}
          </AnimatePresence>

          {/* Win Overlay - Unified container for centering */}
          <AnimatePresence>
            {gameWon && (
              <motion.div
                className={styles.winOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={styles.winMessage}
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <img
                    src={characterCelebrating}
                    alt="Celebrating Character"
                    className={styles.winCharacter}
                  />
                  <h3>GOAL! You just scored a Senior Developer!</h3>
                  <p>Let's start the match!</p>

                  {/* Play Again Button - Inside win message for proper grouping */}
                  <div className={styles.winButtons}>
                    <motion.button
                      className={styles.playAgainButton}
                      onClick={() => {
                        handleGameWon();
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      Let's Talk Business
                    </motion.button>
                    <motion.button
                      className={styles.playAgainButton}
                      style={{
                        background:
                          "linear-gradient(135deg, #162c2e 0%, #1e132b 100%)",
                        color: "#fff",
                      }}
                      onClick={handleStartGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      Play Again?
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
          <AnimatePresence>
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className={styles.confetti}
                style={{
                  backgroundColor: piece.color,
                  width: piece.size,
                  height: piece.size,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: piece.x,
                  y: 400,
                  opacity: 0,
                  rotate: piece.rotation,
                }}
                transition={{
                  duration: 2,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </AnimatePresence>

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

          {/* Character (The Kicker) - Behind the penalty spot */}
          <div className={styles.characterArea}>
            <motion.img
              src={getCharacterImage()}
              alt="Kiko Character"
              className={styles.character}
              animate={imageControls}
              initial={{ filter: "blur(0px) brightness(1)" }}
            />
          </div>

          {/* Penalty Spot - Glowing circle on the field */}
          <div className={styles.penaltySpot} />

          {/* Football - Positioned on the penalty spot */}
          {gameStarted && !gameWon && (
            <div className={styles.footballWrapper}>
              <motion.div
                ref={ballRef}
                className={styles.football}
                animate={getBallAnimation()}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                ⚽
              </motion.div>
            </div>
          )}

          {/* Start Button */}
          {!gameStarted && (
            <motion.button
              className={styles.startButton}
              onClick={handleStartGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className={styles.startIcon}>⚽</span>
              Start Game
            </motion.button>
          )}
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: "0%" }}
              animate={{ width: `${(score / 500) * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className={styles.progressLabels}>
            <span>0</span>
            <span>125</span>
            <span>250</span>
            <span>375</span>
            <span>500 🏆</span>
          </div>
        </div>

        {/* Instructions */}
        {gameStarted && !gameWon && (
          <motion.p
            className={styles.instructions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Click on a target to shoot the ball! 🎯
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default FootballGame;
