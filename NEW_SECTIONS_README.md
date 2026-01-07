# New Portfolio Sections - Documentation

## Overview

This document explains the two new high-quality sections added to your portfolio:

1. **GitHub Activity & Projects** - Showcases your latest GitHub repositories
2. **Content Creation (kiko.div)** - Displays your Instagram Reels and educational content

---

## 📦 Components Created

### 1. GitHubActivity Component

**Location:** `src/components/GitHubActivity/`

#### Features:

- ✅ Fetches your top 4 repositories from GitHub API (`kikogamed` username)
- ✅ Retrieves the latest commit message and date for each repo
- ✅ Displays repository stats (stars, forks, language)
- ✅ Shows a pulsing green "Live Activity" indicator
- ✅ Responsive Bootstrap Grid layout
- ✅ Smooth fade-in animations using `motion` and `react-intersection-observer`
- ✅ Loading and error states
- ✅ Dark-themed modern design

#### Files:

- `GitHubActivity.jsx` - Main component
- `styles.module.css` - Scoped CSS styles

#### API Used:

- `https://api.github.com/users/kikogamed/repos?sort=updated&per_page=4`
- `https://api.github.com/repos/{owner}/{repo}/commits?per_page=1`

---

### 2. InstagramFeed Component

**Location:** `src/components/InstagramFeed/`

#### Features:

- ✅ Displays latest 4 Instagram Reels (VIDEO type only)
- ✅ Uses Behold.so API (placeholder configured)
- ✅ Responsive 4-column desktop / 2-column mobile layout
- ✅ Hover effect reveals caption and "Watch on Instagram" button
- ✅ Play icon overlay on thumbnails
- ✅ Section header: "Tech Sharing & Community"
- ✅ Mentions "@kiko.div" brand
- ✅ Follow button CTA
- ✅ Mock data fallback for demonstration
- ✅ Loading and error states

#### Files:

- `InstagramFeed.jsx` - Main component
- `styles.module.css` - Scoped CSS styles

#### API Configuration:

Currently using mock data. To enable real Instagram posts:

1. Sign up at [Behold.so](https://behold.so/)
2. Get your API feed URL
3. Replace in `InstagramFeed.jsx` line 22:

```javascript
const BEHOLD_API = "https://behold.so/api/v1/get/YOUR_ACTUAL_ID_HERE";
```

---

## 🚀 Integration

### Updated Files:

1. **`src/components/index.js`** - Added exports for new components
2. **`src/App.jsx`** - Integrated components into main app

### Component Order in App:

```jsx
<MyNavbar />
<Hero />
<About />
<Projects />
<Skills />
<GitHubActivity />      // ← NEW
<InstagramFeed />       // ← NEW
<Contact />
```

---

## 🎨 Styling Details

### GitHubActivity Styles:

- **Background:** Dark gradient (black to navy)
- **Cards:** Glassmorphism effect with blur
- **Hover:** Lift animation + cyan glow
- **Top Border:** Animated gradient line on hover
- **Pulsing Indicator:** CSS keyframe animation

### InstagramFeed Styles:

- **Background:** Dark purple gradient
- **Cards:** 2:3 aspect ratio (Instagram standard)
- **Hover Overlay:** Instagram gradient (pink to red)
- **Buttons:** Outlined with hover fill effect
- **Play Icon:** White circle, fades on hover

---

## 📱 Responsive Design

### Breakpoints:

- **Desktop (lg):** 4 columns for both sections
- **Tablet (md):** 2 columns for GitHub, 2 for Instagram
- **Mobile (xs/sm):** 1 column for GitHub, 1-2 for Instagram

### Optimizations:

- Reduced padding on mobile
- Smaller font sizes
- Adjusted card heights
- Touch-friendly button sizes

---

## 🔄 Animations

Both components use:

- **Framer Motion (`motion`)** - For smooth animations
- **React Intersection Observer** - Triggers animations on scroll into view
- **Staggered delays** - Cards animate sequentially (0.1s apart)

### Animation Patterns:

```javascript
// Fade + Slide Up
initial={{ opacity: 0, y: 30 }}
animate={inView ? { opacity: 1, y: 0 } : {}}

// Scale In
initial={{ opacity: 0, scale: 0.9 }}
animate={inView ? { opacity: 1, scale: 1 } : {}}
```

---

## 🛠️ Technologies Used

- **React 19** - Latest React features
- **React-Bootstrap** - Layout and components
- **Motion (Framer Motion)** - Animations
- **React Intersection Observer** - Scroll triggers
- **FontAwesome** - Icons
- **GitHub API** - Repository data
- **Behold.so API** - Instagram feeds (when configured)

---

## ⚡ Performance Considerations

1. **API Caching:** Consider implementing caching for GitHub API
2. **Loading States:** Spinners shown during data fetch
3. **Error Handling:** Graceful fallback with mock data
4. **Lazy Loading:** Components only animate when in viewport
5. **Optimized Images:** Instagram thumbnails use appropriate sizes

---

## 🔧 Customization

### Change GitHub Username:

Edit line 21 in `GitHubActivity.jsx`:

```javascript
const reposResponse = await fetch(
  "https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=4"
);
```

### Change Instagram Handle:

Edit links in `InstagramFeed.jsx`:

```javascript
<a href="https://instagram.com/YOUR_HANDLE">@YOUR_HANDLE</a>
```

### Adjust Number of Items:

- GitHub: Change `per_page=4` in API URL
- Instagram: Change `.slice(0, 4)` to desired number

### Modify Colors:

Edit CSS variables in respective `styles.module.css` files:

- Gradient colors
- Border colors
- Hover effects
- Text colors

---

## 🐛 Troubleshooting

### GitHub API Rate Limit:

- Unauthenticated: 60 requests/hour
- Solution: Add GitHub token for higher limits

### Instagram Not Loading:

- Check Behold.so API URL is correct
- Verify API is active and paid (if required)
- Mock data will display as fallback

### Animations Not Working:

- Ensure `motion` package is installed
- Check `react-intersection-observer` is imported
- Verify no CSS conflicts with `overflow: hidden`

---

## 📈 Future Enhancements

### Possible Additions:

1. **GitHub Stats:** Add total contributions, streak data
2. **Real-time Updates:** WebSocket for live commits
3. **Video Playback:** Inline Instagram video player
4. **Filtering:** Filter repos by language/stars
5. **Pagination:** Load more repos/posts
6. **Search:** Search through repositories
7. **Dark Mode Toggle:** Theme switching

---

## 🎯 Testing Checklist

- [x] GitHub API fetches correctly
- [x] Latest commits display properly
- [x] Live indicator pulses
- [x] Instagram mock data loads
- [x] Hover effects work smoothly
- [x] Responsive on mobile/tablet/desktop
- [x] Animations trigger on scroll
- [x] Loading states display
- [x] Error states handled
- [x] Links open in new tabs
- [x] No console errors

---

## 📞 Support

For issues or questions about these components:

1. Check the GitHub repository
2. Review API documentation
3. Verify all dependencies are installed
4. Check browser console for errors

---

**Created for:** kiko.div Portfolio  
**Date:** January 7, 2026  
**React Version:** 19.0.0  
**Motion Version:** 12.7.4
