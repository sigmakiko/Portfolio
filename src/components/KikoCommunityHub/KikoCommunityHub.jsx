import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "../SectionHeader/SectionHeader";
import styles from "./styles.module.css";

const KikoCommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      number: "50+",
      label: "Technical Reels",
      description: "Consistency",
    },
    {
      number: "React.js",
      label: "Focus",
      description: "Expertise",
    },
    {
      number: "Community",
      label: "Impact",
      description: "Growth",
    },
  ];

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        const BEHOLD_API = "https://feeds.behold.so/E3CpDveCotmLEAqBfW1k";
        const response = await fetch(BEHOLD_API);

        if (!response.ok) {
          throw new Error("API not configured");
        }

        const data = await response.json();
        const videos = data.posts
          .filter((item) => item.mediaType === "VIDEO")
          .slice(0, 4);
        setPosts(videos);
      } catch (err) {
        // Mock data for demonstration
        const mockData = [
          {
            id: "1",
            thumbnailUrl:
              "https://via.placeholder.com/400x600/1a1a2e/00ffff?text=React+Tips",
            permalink: "https://instagram.com/kiko.div",
            caption:
              "Quick React Hooks tip for beginners! 🚀 #react #javascript",
          },
          {
            id: "2",
            thumbnailUrl:
              "https://via.placeholder.com/400x600/1a1a2e/8a2be2?text=CSS+Tricks",
            permalink: "https://instagram.com/kiko.div",
            caption: "Amazing CSS Grid layout technique 💡 #css #frontend",
          },
          {
            id: "3",
            thumbnailUrl:
              "https://via.placeholder.com/400x600/1a1a2e/ff6b6b?text=JS+Tutorial",
            permalink: "https://instagram.com/kiko.div",
            caption: "JavaScript array methods explained! 📚 #javascript",
          },
          {
            id: "4",
            thumbnailUrl:
              "https://via.placeholder.com/400x600/1a1a2e/4ecdc4?text=Web+Dev",
            permalink: "https://instagram.com/kiko.div",
            caption: "Building responsive layouts with Flexbox 🎨 #webdesign",
          },
        ];
        setPosts(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section className={styles.hubSection} id="tech" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Top Row - Story + Stats */}
          <Row className="g-4 mb-4">
            {/* Story Block - Large Left */}
            <Col lg={8} md={7}>
              <motion.div
                variants={itemVariants}
                className={styles.bentoBlock + " " + styles.storyBlock}
              >
                <div className={styles.storyInner}>
                  {/* Logo Visual */}
                  <div className={styles.logoWrapper}>
                    <div className={styles.glowEffect}></div>
                    <div className={styles.logoBox}>
                      <span className={styles.logoText}>kiko.div</span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className={styles.storyContent}>
                    <h2 className={styles.storyHeader}>
                      Beyond the Code:{" "}
                      <span className={styles.gradientText}>kiko.div</span>
                    </h2>
                    <p className={styles.storyParagraph}>
                      In a world where Frontend development can feel
                      overwhelming, I created <strong>kiko.div</strong> with one
                      mission: to simplify complex concepts for the Arabic
                      developer community. Every reel, every post, is crafted to
                      break down barriers and make learning accessible.
                    </p>

                    {/* CTA Buttons */}
                    <div className={styles.ctaButtons}>
                      <motion.a
                        href="https://www.instagram.com/kiko.div"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faInstagram} className="me-2" />
                        Instagram
                      </motion.a>
                      <motion.a
                        href="https://www.tiktok.com/@kiko.div"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faTiktok} className="me-2" />
                        TikTok
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* Stats Block - Right Side */}
            <Col lg={4} md={5}>
              <motion.div
                variants={itemVariants}
                className={styles.statsColumn}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={styles.bentoBlock + " " + styles.statCard}
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={styles.statNumber}>{stat.number}</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>{stat.label}</span>
                      <span className={styles.statDescription}>
                        {stat.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>

          {/* Bottom Row - Video Grid */}
          <motion.div
            variants={itemVariants}
            className={styles.bentoBlock + " " + styles.videosBlock}
          >
            <div className={styles.videosHeader}>
              <h3 className={styles.videosTitle}>Latest Tutorials</h3>
              <span className={styles.videosBadge}>@kiko.div</span>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" size="sm" />
                <p className="mt-2 text-light small mb-0">Loading...</p>
              </div>
            ) : (
              <Row className="g-3">
                {posts.map((post, index) => (
                  <Col key={post.id} xs={6} md={3}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className={styles.videoCard}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.videoWrapper}>
                          <img
                            src={post.thumbnailUrl}
                            alt={post.caption || "Instagram post"}
                            className={styles.videoThumbnail}
                          />
                          <div className={styles.playOverlay}>
                            <FontAwesomeIcon
                              icon={faPlay}
                              className={styles.playIcon}
                            />
                          </div>
                          <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.videoLink}
                          >
                            <div className={styles.hoverOverlay}>
                              <p className={styles.videoCaption}>
                                {post.caption?.slice(0, 60)}
                                {post.caption?.length > 60 ? "..." : ""}
                              </p>
                              <span className={styles.watchLabel}>
                                <FontAwesomeIcon
                                  icon={faInstagram}
                                  className="me-1"
                                />
                                Watch
                              </span>
                            </div>
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default KikoCommunityHub;
