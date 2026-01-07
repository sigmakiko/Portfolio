import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);

        // Replace with your actual Behold.so API endpoint
        const BEHOLD_API = "https://feeds.behold.so/E3CpDveCotmLEAqBfW1k";

        const response = await fetch(BEHOLD_API);

        if (!response.ok) {
          // If the API is not configured yet, use mock data for demonstration
          throw new Error("API not configured");
        }

        const data = await fetch(response.url).then((res) => res.json());
        const posts = data.posts;
        console.log(posts);

        // Filter for videos only and get the latest 4
        const videos = posts
          .filter((item) => item.mediaType === "VIDEO")
          .slice(0, 4);
        setPosts(videos);
        setError(null);
      } catch (err) {
        // Use mock data for demonstration purposes
        const mockData = [
          {
            id: "1",
            media_url:
              "https://via.placeholder.com/400x600/1a1a2e/00ffff?text=React+Tips",
            permalink: "https://instagram.com/kiko.div",
            caption:
              "Quick React Hooks tip for beginners! 🚀 #react #javascript #webdev",
            timestamp: new Date().toISOString(),
          },
          {
            id: "2",
            media_url:
              "https://via.placeholder.com/400x600/1a1a2e/8a2be2?text=CSS+Tricks",
            permalink: "https://instagram.com/kiko.div",
            caption:
              "Amazing CSS Grid layout technique 💡 #css #frontend #coding",
            timestamp: new Date().toISOString(),
          },
          {
            id: "3",
            media_url:
              "https://via.placeholder.com/400x600/1a1a2e/ff6b6b?text=JS+Tutorial",
            permalink: "https://instagram.com/kiko.div",
            caption:
              "JavaScript array methods explained! 📚 #javascript #programming",
            timestamp: new Date().toISOString(),
          },
          {
            id: "4",
            media_url:
              "https://via.placeholder.com/400x600/1a1a2e/4ecdc4?text=Web+Dev",
            permalink: "https://instagram.com/kiko.div",
            caption:
              "Building responsive layouts with Flexbox 🎨 #webdesign #html #css",
            timestamp: new Date().toISOString(),
          },
        ];
        setPosts(mockData);
        setError(
          "Using demo content. Configure your Behold.so API to show real posts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (loading) {
    return (
      <section className={styles.instagramSection} id="content">
        <Container>
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-3 text-light">Loading Instagram Feed...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.instagramSection} id="content" ref={ref}>
      <Container>
        {error && (
          <Alert variant="info" className="mb-4">
            {error}
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faInstagram} className="me-3" />
            Tech Sharing & Community
          </h2>
          <p className={styles.sectionSubtitle}>
            Follow{" "}
            <a
              href="https://instagram.com/kiko.div"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandLink}
            >
              @kiko.div
            </a>{" "}
            for daily web development tips
          </p>
        </motion.div>

        <Row className="g-4">
          {posts.map((post, index) => (
            <Col key={post.id} xs={12} sm={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={styles.postCard}>
                  <div className={styles.mediaWrapper}>
                    <img
                      src={post.thumbnailUrl}
                      alt={post.caption || "Instagram post"}
                      className={styles.mediaThumbnail}
                    />
                    <div className={styles.playOverlay}>
                      <FontAwesomeIcon
                        icon={faPlay}
                        className={styles.playIcon}
                      />
                    </div>
                    <div className={styles.hoverOverlay}>
                      <div className={styles.overlayContent}>
                        <p className={styles.caption}>
                          {post.caption?.slice(0, 100)}
                          {post.caption?.length > 100 ? "..." : ""}
                        </p>
                        <Button
                          variant="outline-light"
                          className={styles.watchButton}
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            icon={faInstagram}
                            className="me-2"
                          />
                          Watch on Instagram
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-5"
        >
          <Button
            variant="outline-light"
            size="lg"
            className={styles.followButton}
            href="https://instagram.com/kiko.div"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="me-2" />
            Follow @kiko.div for More
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default InstagramFeed;
