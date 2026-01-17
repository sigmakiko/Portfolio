const getRepos = async () => {
  // Fetch top 4 repositories
  const reposResponse = await fetch(
    "https://api.github.com/users/sigmakiko/repos?sort=updated&per_page=4",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
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
  return reposData;
};

export { getRepos };
