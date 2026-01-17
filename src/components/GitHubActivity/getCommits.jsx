const getCommits = async (reposData) => {
  // Fetch latest commit for each repo (across all branches)
  const reposWithCommits = await Promise.all(
    reposData.map(async (repo) => {
      try {
        // First, fetch all branches for the repo
        const branchesResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
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
                  `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits/${branch.commit.sha}`,
                  {
                    headers: {
                      Accept: "application/vnd.github.v3+json",
                      Authorization: `Bearer ${
                        import.meta.env.VITE_GITHUB_TOKEN
                      }`,
                    },
                  }
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
            const currentDate = new Date(validCommits[i].commit.author.date);
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
  return reposWithCommits;
};
export { getCommits };
