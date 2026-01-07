import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";
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
        const reposResponse = await fetch(
          "https://api.github.com/users/sigmakiko/repos?sort=updated&per_page=4",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!reposResponse.ok) {
          const errorData = await reposResponse.json().catch(() => ({}));
          console.error("GitHub API Error:", errorData);

          // Check if it's a rate limit error
          if (
            reposResponse.status === 403 &&
            errorData.message?.includes("rate limit")
          ) {
            throw new Error(
              "GitHub API rate limit exceeded. Please try again later."
            );
          }

          throw new Error(
            `Failed to fetch repositories: ${reposResponse.status} ${reposResponse.statusText}`
          );
        }

        const reposData = await reposResponse.json();
        console.log("Fetched repos:", reposData);

        if (!Array.isArray(reposData) || reposData.length === 0) {
          console.warn("No repositories found");
          setRepos([]);
          setError(null);
          setLoading(false);
          return;
        }

        // Fetch latest commit for each repo (across all branches)
        const reposWithCommits = await Promise.all(
          reposData.map(async (repo) => {
            try {
              // First, fetch all branches for the repo
              const branchesResponse = await fetch(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`
              );

              if (branchesResponse.ok) {
                const branches = await branchesResponse.json();

                if (branches.length === 0) {
                  return { ...repo, latestCommit: null };
                }

                // Fetch the latest commit from each branch
                const branchCommits = await Promise.all(
                  branches.map(async (branch) => {
                    try {
                      const commitResponse = await fetch(
                        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits/${branch.commit.sha}`
                      );
                      if (commitResponse.ok) {
                        const commitData = await commitResponse.json();
                        return {
                          ...commitData,
                          branchName: branch.name,
                        };
                      }
                      return null;
                    } catch (error) {
                      console.error(
                        `Error fetching commit for branch ${branch.name}:`,
                        error
                      );
                      return null;
                    }
                  })
                );

                // Filter out null values and find the most recent commit
                const validCommits = branchCommits.filter((c) => c !== null);

                if (validCommits.length === 0) {
                  return { ...repo, latestCommit: null };
                }

                // Find the most recent commit
                let latestCommit = validCommits[0];
                for (let i = 1; i < validCommits.length; i++) {
                  const latestDate = new Date(latestCommit.commit.author.date);
                  const currentDate = new Date(
                    validCommits[i].commit.author.date
                  );
                  if (currentDate > latestDate) {
                    latestCommit = validCommits[i];
                  }
                }

                return {
                  ...repo,
                  latestCommit: latestCommit,
                };
              }

              // Fallback to default branch if branches API fails
              const commitsResponse = await fetch(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
              );
              if (commitsResponse.ok) {
                const commitsData = await commitsResponse.json();
                const commitWithBranch = commitsData[0]
                  ? {
                      ...commitsData[0],
                      branchName: repo.default_branch,
                    }
                  : null;
                return {
                  ...repo,
                  latestCommit: commitWithBranch,
                };
              }
              return { ...repo, latestCommit: null };
            } catch (error) {
              console.error(`Error processing repo ${repo.name}:`, error);
              return { ...repo, latestCommit: null };
            }
          })
        );

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
          <Alert variant="warning" className="my-5">
            <Alert.Heading>
              ⚠️ GitHub Activity Temporarily Unavailable
            </Alert.Heading>
            <p>{error}</p>
            {error.includes("rate limit") && (
              <p className="mb-0">
                <small>
                  💡 Tip: GitHub API has a limit of 60 requests per hour for
                  unauthenticated users. Please wait a few minutes and refresh
                  the page.
                </small>
              </p>
            )}
          </Alert>
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
            GitHub Activity & Projects
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
