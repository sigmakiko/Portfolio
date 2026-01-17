# GitHub Token Setup Instructions

## ⚠️ CRITICAL SECURITY WARNING

### How to Revoke and Create a New Token:

1. **Revoke the exposed token:**

   - Go to: https://github.com/settings/tokens
   - Find the token and click "Delete" or "Revoke"

2. **Create a new Personal Access Token:**

   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio Website")
   - Set expiration (recommended: 90 days)
   - Select scopes:
     - ✅ `public_repo` (to access public repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

3. **Update your `.env` file:**

   ```env
   VITE_GITHUB_TOKEN=your_new_token_here
   ```

4. **Restart the development server:**
   ```bash
   npm run dev
   ```

## What Was Done

1. ✅ Created `.env` file with your GitHub token
2. ✅ Updated `.gitignore` to exclude `.env` files from version control
3. ✅ Updated `getRepos.jsx` to use the token in API requests
4. ✅ Updated `getCommits.jsx` to use the token in API requests

## Benefits

- **Higher Rate Limits:** Authenticated requests get 5,000 requests/hour (vs 60 for unauthenticated)
- **Access to Private Repos:** If needed in the future
- **Better API Performance:** More reliable fetching of repository data

## Environment Variables in Vite

Vite exposes environment variables with the `VITE_` prefix via `import.meta.env`:

- Variables MUST start with `VITE_` to be exposed to the client
- Access them with: `import.meta.env.VITE_GITHUB_TOKEN`

## Security Best Practices

1. ✅ Never commit `.env` files to version control
2. ✅ `.env` is in `.gitignore`
3. ⚠️ Never share tokens publicly
4. ✅ Revoke tokens immediately if exposed
5. ✅ Use minimal scopes (only `public_repo` for this project)
6. ✅ Set token expiration dates

## Current Implementation

The GitHub API requests now include authentication:

```javascript
const response = await fetch(url, {
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
```

This applies to:

- Fetching repositories (`getRepos.jsx`)
- Fetching branches (`getCommits.jsx`)
- Fetching commit data (`getCommits.jsx`)
