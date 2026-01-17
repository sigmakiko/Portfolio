# 🚀 Neon Data Shard CV Button

## Overview

A futuristic, high-tech "Download CV" button component that embodies the cyber-tech aesthetic of the kiko.div portfolio. This is not just a button—it's a **data shard** from the future.

---

## ✨ Features

### Visual Design

- **Futuristic Shape**: Trapezoid with cut corners (clip-path polygon)
- **Dark Base**: Semi-transparent dark background with blur
- **Brand Colors**: Neon Cyan (#00f2ff) and Purple (#8a2be2)
- **Tech Details**: Corner cut indicators, particle effects

### Hover Animation ("Ignition Effect")

When you hover over the button, it **powers up**:

1. **Intense Glow**: Multi-layered box-shadows (Cyan + Purple)
2. **Light Sweep**: Energizing gradient sweep across the button
3. **Icon Ignition**: Download icon glows with cyan shadow
4. **Text Transformation**: Text becomes gradient-filled (Cyan → Purple)
5. **Particle Activation**: Tech particles pulse around the button
6. **Scale Feedback**: Subtle lift effect (translateY + scale)

### Accessibility

- ✅ Keyboard focus states (same glow on `:focus-visible`)
- ✅ Proper aria-label
- ✅ Semantic HTML (`<a>` tag with `download` attribute)
- ✅ Screen reader friendly

---

## 📦 Installation

The component is already integrated into your portfolio at:

```
src/components/CvButton/
├── CvButton.jsx          # React component
├── CvButton.module.css   # Scoped styles
└── index.js              # Export file
```

---

## 🎯 Usage

### Basic Implementation

```jsx
import CvButton from "../CvButton/CvButton";

<CvButton />;
```

### Current Integration

The button is now placed in the **About** section, centered below the SectionHeader:

```jsx
// src/components/About/About.jsx
<SectionHeader ... />

<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
  <CvButton />
</div>

<div className={styles.cards}>
  {/* Cards... */}
</div>
```

---

## 📁 CV File Setup

### File Location

Place your actual CV PDF at:

```
public/assets/documents/Kiko_CV.pdf
```

### Update File Path

If you want to change the CV file name, edit line 4 in `CvButton.jsx`:

```jsx
href = "/assets/documents/YOUR_CV_NAME.pdf";
download = "Your_Name_CV.pdf";
```

---

## 🎨 Customization

### Change Colors

Edit `CvButton.module.css`:

```css
/* Cyan Glow Layer (line ~46) */
.glowBorder {
  background: #YOUR_COLOR;
  box-shadow: 0 0 20px rgba(YOUR_RGB, 0.6);
}

/* Purple Glow Layer (line ~57) */
.glowBorderPurple {
  background: #YOUR_COLOR;
}

/* Text Gradient (line ~224) */
.cvButton:hover .text {
  background: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
}
```

### Adjust Shape

Modify the `clip-path` polygon (line ~13):

```css
clip-path: polygon(
  /* Adjust these coordinates for different cut angles */ 8px 0,
  calc(100% - 8px) 0,
  ...
);
```

### Change Button Text

Edit line 28 in `CvButton.jsx`:

```jsx
<span className={styles.text}>Your Text Here</span>
```

---

## 🔧 Technical Stack

- **React**: Functional component with Framer Motion
- **CSS Modules**: Scoped styling
- **Advanced CSS**:
  - `clip-path` for futuristic shape
  - Multi-layered `box-shadow` for glow
  - `backdrop-filter` for glass effect
  - Gradient overlays for light sweep
  - CSS animations for particles

---

## 🎮 Animation Details

### Hover Sequence

1. **0.0s**: Glow borders activate (opacity: 0 → 0.7)
2. **0.0s**: Light sweep starts moving (left: -100% → 100%)
3. **0.3s**: Icon color shifts to cyan with glow
4. **0.3s**: Text becomes gradient
5. **0.3s**: Corner cuts illuminate
6. **0.5s**: Particles begin pulsing

### Timing Functions

- **Glow**: `ease-in-out` (smooth breathing effect)
- **Sweep**: `cubic-bezier(0.4, 0, 0.2, 1)` (accelerated departure)
- **Scale**: Framer Motion spring physics

---

## 📱 Responsive Behavior

### Tablet (≤768px)

- Padding: `14px 28px`
- Font: `14px`
- Icon: `20px`

### Mobile (≤480px)

- Padding: `12px 24px`
- Font: `13px`
- Gap: `10px`

---

## 🚀 Performance

- **GPU Acceleration**: Uses `transform` and `opacity` for smooth 60fps
- **No Layout Shifts**: All animations use `transform` and `opacity`
- **Lazy Rendering**: Glow layers only visible on hover
- **Optimized Shadows**: Multiple layers but minimal performance impact

---

## ✅ Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (uses `-webkit-` prefixes)
- ✅ Modern mobile browsers

---

## 🎯 Best Practices

1. **Place the CV file** in `/public/assets/documents/`
2. **Keep the button prominent** but not intrusive
3. **Use in hero sections** or about/contact areas
4. **Test download** functionality on different browsers
5. **Update the CV regularly** to keep it current

---

## 🔮 Future Enhancements (Optional)

- Add sound effect on click (using `use-sound`)
- Implement "data stream" particle trail animation
- Add download progress indicator
- Create different button variants (e.g., "Contact", "Projects")

---

## 📝 Notes

- The button uses `download` attribute to force download instead of opening in browser
- The component is fully self-contained (no external dependencies except Framer Motion)
- All animations are CSS-based for maximum performance
- The design matches the overall portfolio aesthetic (neon, tech, futuristic)

---

## 🎨 Design Philosophy

This button embodies the **"kiko.div"** identity:

- **Professional**: Clean, readable, functional
- **Innovative**: Unique shape and interaction patterns
- **High-Performance**: Smooth animations, no jank
- **Accessible**: Works for everyone, everywhere

---

**Created by:** kiko.div  
**Version:** 1.0  
**Last Updated:** January 16, 2026
