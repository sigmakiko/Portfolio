# Preloader Component - Terminal Style Documentation

## Overview

A sophisticated full-screen preloader with a terminal-style typing animation built with React 19 and Framer Motion. Creates a professional loading experience before the main content appears.

---

## Features

### 🎨 Design

- **Background**: Solid `#121212` matching the portfolio theme
- **Terminal Window**: macOS-style terminal with colored buttons
- **Font**: `Geist Mono` for authentic terminal feel
- **Colors**: Cyan text (`#00ffff`) with gradient accent loading bar

### ✨ Animations

1. **Typing Cursor**: Blinking underscore that follows each line
2. **Line Sequencing**: Lines appear one by one (500ms intervals)
3. **Checkmark**: Green checkmark (✓) appears on completion
4. **Loading Bar**: Gradient progress bar fills over 2.5s
5. **Exit Slide**: Entire preloader slides up to reveal content

### ⏱️ Timing

- **Line Changes**: Every 500ms
- **Total Duration**: 2.5 seconds
- **Exit Animation**: 0.8s slide-up with custom easing

---

## Component Structure

### Loading Messages

```javascript
const loadingLines = [
  "$ Initializing portfolio...",
  "$ Fetching projects...",
  "$ Loading Masaar AI engine...",
  "$ Optimizing UI...",
  "$ Ready!",
];
```

**Customization**: Add/remove lines or change text to match your content.

---

## Implementation

### 1. Component Code (`Preloader.jsx`)

```jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  const loadingLines = [
    "$ Initializing portfolio...",
    "$ Fetching projects...",
    "$ Loading Masaar AI engine...",
    "$ Optimizing UI...",
    "$ Ready!",
  ];

  useEffect(() => {
    // Cycle through loading messages
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < loadingLines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.preloader}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {/* Terminal UI */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

### 2. Integration (`App.jsx`)

```jsx
import { Preloader } from "./components";

function App() {
  return (
    <>
      <Preloader />
      <MyNavbar />
      <Hero />
      {/* Rest of your app */}
    </>
  );
}
```

---

## Animation Details

### Exit Transition

```javascript
exit={{ y: "-100%" }}
transition={{
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier
}
```

**Effect**: Smooth slide-up that reveals content underneath

### Blinking Cursor

```javascript
<motion.span
  animate={{ opacity: [1, 0] }}
  transition={{
    duration: 0.8,
    repeat: Infinity,
    repeatType: "reverse",
  }}
>
  _
</motion.span>
```

**Effect**: Classic terminal cursor blink

### Checkmark Animation

```javascript
<motion.span
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 10,
  }}
>
  ✓
</motion.span>
```

**Effect**: Bouncy appearance on completion

### Loading Bar

```javascript
<motion.div
  initial={{ width: "0%" }}
  animate={{ width: "100%" }}
  transition={{ duration: 2.5, ease: "easeInOut" }}
/>
```

**Effect**: Smooth gradient fill synchronized with preloader duration

---

## Customization Options

### Change Duration

```javascript
// Make it faster (1.5s)
setTimeout(() => setIsLoading(false), 1500);

// Update line interval proportionally
setInterval(() => {
  /* ... */
}, 300); // 5 lines in 1.5s
```

### Change Messages

```javascript
const loadingLines = [
  "$ npm install portfolio",
  "$ Building components...",
  "$ Compiling assets...",
  "$ Starting dev server...",
  "$ Done!",
];
```

### Change Colors

```css
/* Cyan to Green */
.terminalBody {
  color: #27c93f; /* Green text */
}

/* Different gradient */
.loadingBar {
  background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%);
}
```

### Add Sound Effect

```javascript
useEffect(() => {
  const audio = new Audio("/loading-sound.mp3");
  audio.play();

  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);
```

---

## Styling Breakdown

### Terminal Window

```css
.terminalContainer {
  width: 600px;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}
```

### macOS Buttons

```css
.close {
  background: #ff5f56;
}
.minimize {
  background: #ffbd2e;
}
.maximize {
  background: #27c93f;
}
```

### Terminal Text

```css
.terminalBody {
  font-family: "Geist Mono", "Monaco", "Courier New", monospace;
  font-size: 0.95rem;
  color: #00ffff;
}
```

---

## Performance Considerations

### Cleanup

```javascript
useEffect(() => {
  const lineInterval = setInterval(/* ... */);
  const timer = setTimeout(/* ... */);

  // Important: Clear intervals and timeouts
  return () => {
    clearInterval(lineInterval);
    clearTimeout(timer);
  };
}, []);
```

### AnimatePresence

- Uses `mode="wait"` to ensure smooth exit
- Prevents layout shift during transition
- Removes component from DOM after exit

### Fixed Positioning

- `position: fixed` with `z-index: 9999`
- Prevents scroll during loading
- Covers entire viewport

---

## Responsive Design

### Tablet (≤768px)

```css
.terminalContainer {
  width: 90%;
}
.terminalBody {
  font-size: 0.85rem;
  padding: 20px;
}
```

### Mobile (≤480px)

```css
.terminalBody {
  font-size: 0.75rem;
  padding: 16px;
}
.terminalButtons span {
  width: 10px;
  height: 10px;
}
```

---

## Advanced Features

### 1. **Fetch Real Data**

```javascript
useEffect(() => {
  const fetchData = async () => {
    setCurrentLine(1); // "Fetching projects..."
    await fetch("/api/projects");

    setCurrentLine(2); // "Loading AI engine..."
    await fetch("/api/ai");

    setCurrentLine(3); // "Optimizing UI..."
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsLoading(false);
  };

  fetchData();
}, []);
```

### 2. **Show Only on First Visit**

```javascript
const [isLoading, setIsLoading] = useState(() => {
  const hasVisited = localStorage.getItem("hasVisited");
  return !hasVisited;
});

useEffect(() => {
  if (isLoading) {
    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("hasVisited", "true");
    }, 2500);
    return () => clearTimeout(timer);
  }
}, [isLoading]);
```

### 3. **Skip Button**

```jsx
<button className={styles.skipButton} onClick={() => setIsLoading(false)}>
  Skip →
</button>
```

---

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Mobile browsers
- ⚠️ IE11: No Framer Motion support (graceful degradation needed)

---

## Accessibility

### Screen Readers

```jsx
<motion.div
  className={styles.preloader}
  role="status"
  aria-live="polite"
  aria-label="Loading portfolio"
>
  <span className="sr-only">Loading, please wait...</span>
</motion.div>
```

### Reduced Motion

```javascript
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();

const exitTransition = shouldReduceMotion
  ? { duration: 0 }
  : { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
```

---

## Testing Checklist

- [ ] Preloader appears on page load
- [ ] Lines appear sequentially (500ms intervals)
- [ ] Cursor blinks correctly
- [ ] Checkmark appears on last line
- [ ] Loading bar fills smoothly
- [ ] Preloader slides up after 2.5s
- [ ] No content flash before preloader
- [ ] Responsive on mobile/tablet
- [ ] Works without JavaScript (fallback)

---

## Troubleshooting

### Issue: Content flashes before preloader

**Solution**: Add inline style to body:

```html
<body style="overflow: hidden;"></body>
```

Remove after preloader exits.

### Issue: Preloader doesn't disappear

**Solution**: Check `AnimatePresence` is wrapping correctly and `isLoading` updates.

### Issue: Slide-up animation is choppy

**Solution**: Use GPU-accelerated transform:

```javascript
exit={{ y: "-100%", translateZ: 0 }}
```

---

## Files Structure

```
src/
├── components/
│   ├── Preloader/
│   │   ├── Preloader.jsx           # Main component
│   │   └── styles.module.css       # Scoped styles
│   └── index.js                    # Export
└── App.jsx                         # Integration
```

---

## Future Enhancements

1. **Dynamic Loading**: Show actual loading progress from API calls
2. **Error Handling**: Display error state if loading fails
3. **Retry Option**: Allow user to retry if loading fails
4. **Custom Messages**: Fetch loading messages from CMS
5. **Theme Support**: Light/dark mode variants
6. **Analytics**: Track preloader view duration

---

**Created**: January 13, 2026  
**Version**: 1.0.0  
**Dependencies**: React 19, Framer Motion 11+  
**Author**: Portfolio Team
