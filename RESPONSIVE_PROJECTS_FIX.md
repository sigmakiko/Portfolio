# Projects Component - Responsive Horizontal Scroll Fix

## Overview

This fix makes the Projects section fully responsive by conditionally rendering horizontal scroll on desktop and vertical stacking on mobile/tablet devices.

## Implementation Details

### 1. Custom Hook: `useWindowSize`

**Location**: `src/hooks/useWindowSize.js`

```javascript
const { width, height, isMobile, isTablet, isDesktop } = useWindowSize();
```

**Returns**:

- `width`: Current window width
- `height`: Current window height
- `isMobile`: `true` if width < 768px
- `isTablet`: `true` if 768px ≤ width < 1024px
- `isDesktop`: `true` if width ≥ 1024px

### 2. Component Logic Changes

#### Desktop (width ≥ 1024px)

- **Height**: `300vh` for scroll-driven animation
- **Layout**: Horizontal scroll with pinning effect
- **Transform**: `useTransform` applies `translateX` based on scroll progress
- **Wrapper**: Sticky positioning with `height: 100vh`
- **Progress Bar**: Visible at bottom showing scroll progress

#### Mobile/Tablet (width < 1024px)

- **Height**: `auto` (removes 300vh)
- **Layout**: Vertical stack (normal document flow)
- **Transform**: Disabled (no horizontal movement)
- **Wrapper**: Normal relative positioning
- **Progress Bar**: Hidden (not needed for vertical scroll)

### 3. CSS Classes

#### Desktop Classes

- `.projects` - Main container with `300vh` height
- `.stickyWrapper` - Sticky viewport with `height: 100vh`
- `.horizontalContainer` - Flex row layout with `gap: 40px`

#### Mobile/Tablet Classes

- `.projectsMobile` - Override with `height: auto` and `min-height: 100svh`
- `.mobileWrapper` - Normal flow without sticky positioning
- `.verticalContainer` - CSS Grid single column layout

### 4. Key CSS Features

#### Touch Optimization

```css
touch-action: pan-y; /* Prevents horizontal touch conflicts */
```

#### Small Viewport Height

```css
min-height: 100svh; /* Handles mobile browser address bars */
```

#### Responsive Breakpoints

- **1024px**: Tablet adjustments (reduced padding, smaller cards)
- **768px**: Mobile layout switch (vertical stacking)
- **576px**: Small mobile refinements (full-width buttons)

## Performance Optimizations

1. **Unconditional Hook Calls**: All hooks are called unconditionally to follow React's Rules of Hooks

   ```javascript
   // ✅ CORRECT: Always call the hook
   const xTransform = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);
   const x = isDesktop ? xTransform : 0;

   // ❌ WRONG: Never conditionally call hooks
   // const x = isDesktop ? useTransform(...) : 0;
   ```

2. **Conditional Value Usage**: The transform value is conditionally used, not conditionally created

   ```javascript
   const x = isDesktop ? xTransform : 0;
   ```

3. **Conditional Rendering**: Progress bar only renders on desktop

   ```javascript
   {
     isDesktop && <ProgressBar />;
   }
   ```

4. **Class-based Switching**: Uses CSS classes instead of inline styles for better performance
   ```javascript
   className={isDesktop ? styles.horizontalContainer : styles.verticalContainer}
   ```

## Testing Checklist

### Desktop (≥1024px)

- [ ] Horizontal scroll works smoothly
- [ ] Cards pin to viewport while scrolling
- [ ] Progress bar animates with scroll
- [ ] Hover effects work properly
- [ ] No janky movements

### Tablet (768-1023px)

- [ ] Cards stack vertically
- [ ] Normal scroll behavior
- [ ] Touch scrolling is smooth
- [ ] No horizontal overflow
- [ ] Cards are properly sized

### Mobile (<768px)

- [ ] Single column layout
- [ ] Touch-friendly spacing
- [ ] Full-width link buttons
- [ ] Images load properly
- [ ] No layout breaks

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Mobile browsers (Chrome, Safari, Firefox)

## Known Limitations

1. **Server-Side Rendering**: The hook returns `undefined` initially. Consider adding a fallback:

   ```javascript
   const { isDesktop = true } = useWindowSize();
   ```

2. **Resize Performance**: Debounce is not implemented. For production, consider adding debounce to the resize handler.

## Future Enhancements

1. **Swipe Gestures**: Add touch swipe navigation for mobile
2. **Lazy Loading**: Implement intersection observer for images
3. **Animation Preferences**: Respect `prefers-reduced-motion`
4. **Accessibility**: Add keyboard navigation for horizontal scroll

## Usage Example

```jsx
import { Projects } from "@/components";

// The component automatically adapts to screen size
<Projects />;
```

## File Structure

```
src/
├── hooks/
│   └── useWindowSize.js          # Window size detection hook
├── components/
│   └── Projects/
│       ├── Projects.jsx           # Main component with responsive logic
│       ├── styles.module.css      # Responsive styles
│       └── projectsData.json      # Project data
```

## Troubleshooting

### Issue: Horizontal scroll still appears on mobile

**Solution**: Ensure `isDesktop` check is working. Add console log:

```javascript
console.log("isDesktop:", isDesktop, "width:", window.innerWidth);
```

### Issue: Layout jumps on resize

**Solution**: Add CSS transition to smooth the layout change:

```css
.projects {
  transition: height 0.3s ease;
}
```

### Issue: Touch scrolling feels sluggish

**Solution**: Verify `touch-action: pan-y` is applied to the main container.

---

**Last Updated**: January 9, 2026  
**Version**: 2.0.0 (Responsive)  
**Author**: Portfolio Team
