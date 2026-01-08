import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";
import { getRepos } from "./getRepos";
import { getCommits } from "./getCommits";
import styles from "./styles.module.css";

const GitHubActivity = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch top 4 repositories
        const reposData = await getRepos();

        if (!Array.isArray(reposData) || reposData.length === 0) {
          console.warn("No repositories found");
          setRepos([]);
          setError(null);
          setLoading(false);
          return;
        }

        const reposWithCommits = await getCommits(reposData);

        setRepos(reposWithCommits);
        setError(null);
      } catch (err) {
        console.error("Error in fetchRepos:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className={styles.githubSection} id="github">
        <Container>
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-3 text-light">Loading GitHub Activity...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.githubSection} id="github">
        <Container>
          <motion.div className="text-center mb-5">
            <h2 className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faGithub} className="me-3" />
              GitHub Activity{" "}
              <span className={styles.gradientText}>& Projects</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Latest repositories and contributions
            </p>
          </motion.div>
          <div className={styles.githubErrorCard}>
            <div className={styles.githubErrorHeader}>
              <FontAwesomeIcon
                icon={faGithub}
                className={styles.githubErrorIcon}
              />
              <span className={styles.githubErrorTitle}>
                GitHub Activity Error
              </span>
            </div>
            <div className={styles.githubErrorBody}>
              <p className={styles.githubErrorMessage}>{error}</p>
              {error.includes("rate limit") && (
                <p className={styles.githubErrorTip}>
                  <FontAwesomeIcon
                    icon={faCodeBranch}
                    className={styles.githubErrorBranchIcon}
                  />
                  <span>
                    GitHub API has a limit of 60 requests/hour for
                    unauthenticated users.
                    <br />
                    Please wait a few minutes and refresh the page.
                  </span>
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.githubSection} id="github" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faGithub} className="me-3" />
            GitHub Activity{" "}
            <span className={styles.gradientText}>& Projects</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Latest repositories and contributions
          </p>
        </motion.div>

        <Row className="g-4">
          {repos.map((repo, index) => (
            <Col key={repo.id} xs={12} md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={styles.repoCard}>
                  <Card.Body>
                    <div className={styles.repoHeader}>
                      <h5 className={styles.repoName}>{repo.name}</h5>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoLink}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    </div>

                    <p className={styles.repoDescription}>
                      {repo.description || "No description available"}
                    </p>

                    <div className={styles.repoStats}>
                      <span className={styles.stat}>
                        <FontAwesomeIcon icon={faStar} className="me-1" />
                        {repo.stargazers_count}
                      </span>
                      <span className={styles.stat}>
                        <FontAwesomeIcon icon={faCodeBranch} className="me-1" />
                        {repo.forks_count}
                      </span>
                      {repo.language && (
                        <span className={styles.language}>{repo.language}</span>
                      )}
                    </div>

                    {repo.latestCommit && (
                      <div className={styles.commitInfo}>
                        <div className={styles.commitHeader}>
                          <span className={styles.liveIndicator}>
                            <span className={styles.pulse}></span>
                          </span>
                          <span className={styles.commitLabel}>
                            Latest Commit
                          </span>
                          {repo.latestCommit.branchName && (
                            <span className={styles.branchBadge}>
                              <FontAwesomeIcon
                                icon={faCodeBranch}
                                className="me-1"
                              />
                              {repo.latestCommit.branchName}
                            </span>
                          )}
                        </div>
                        <p className={styles.commitMessage}>
                          {repo.latestCommit.commit.message.split("\n")[0]}
                        </p>
                        <small className={styles.commitDate}>
                          {formatDate(repo.latestCommit.commit.author.date)}
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GitHubActivity;
