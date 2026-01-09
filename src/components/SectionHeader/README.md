# SectionHeader Component

A reusable, animated section header component for portfolio sections with professional scroll-triggered animations.

## Features

- ✨ **Fade-in & Slide-up Animation**: Smooth entrance effect when scrolling
- 🎯 **Scroll-triggered**: Animates when the section enters viewport
- 🎨 **Gradient Highlight**: Optional gradient text for emphasis
- 📏 **Animated Underline**: Expanding accent line below title
- 📱 **Fully Responsive**: Adapts to all screen sizes
- ♿ **Accessible**: Semantic HTML structure
- 🔄 **Reusable**: Works across multiple sections

## Installation

The component is already set up in your project. Import it from the components barrel:

```jsx
import { SectionHeader } from "@/components";
```

## Usage

### Basic Usage

```jsx
<SectionHeader
  title="My Projects"
  subtitle="Explore my latest work and case studies"
/>
```

### With Gradient Highlight

```jsx
<SectionHeader
  title="Selected"
  highlightText="Projects"
  subtitle="Scroll to explore my work"
/>
```

### Multiple Sections Example

```jsx
// Projects Section
<section id="projects">
  <SectionHeader
    title="Featured"
    highlightText="Projects"
    subtitle="A showcase of my recent development work"
  />
  {/* Project cards here */}
</section>

// Skills Section
<section id="skills">
  <SectionHeader
    title="Technical"
    highlightText="Skills"
    subtitle="Technologies and tools I work with"
  />
  {/* Skills content here */}
</section>

// Contact Section
<section id="contact">
  <SectionHeader
    title="Get in"
    highlightText="Touch"
    subtitle="Let's build something amazing together"
  />
  {/* Contact form here */}
</section>
```

## Props

| Prop            | Type     | Required | Default | Description                          |
| --------------- | -------- | -------- | ------- | ------------------------------------ |
| `title`         | `string` | ✅ Yes   | -       | Main heading text                    |
| `highlightText` | `string` | ❌ No    | -       | Text to display with gradient effect |
| `subtitle`      | `string` | ❌ No    | -       | Descriptive text below the title     |

## Animation Details

### Title Animation

- **Initial**: `opacity: 0, y: 30`
- **Final**: `opacity: 1, y: 0`
- **Duration**: 0.6s
- **Easing**: easeOut

### Underline Animation

- **Initial**: `width: 0`
- **Final**: `width: 80px`
- **Duration**: 0.5s
- **Delay**: 0.3s (after title)
- **Easing**: easeOut

### Subtitle Animation

- **Initial**: `opacity: 0, y: 30`
- **Final**: `opacity: 1, y: 0`
- **Duration**: 0.6s
- **Delay**: 0.2s
- **Easing**: easeOut

## Styling

The component uses CSS Modules and follows your portfolio's design system:

- **Font**: Geist Sans (fallback: Inter)
- **Title Color**: `#F1F1F1`
- **Subtitle Color**: `#C5C6C7`
- **Gradient**: `linear-gradient(135deg, #00ffff 0%, #8a2be2 100%)`
- **Accent Line**: Cyan-to-purple gradient with glow effect

## Customization

### Changing the Underline Width

Edit `src/components/SectionHeader/SectionHeader.jsx`:

```jsx
<motion.div
  className={styles.underline}
  initial={{ width: 0 }}
  whileInView={{ width: "120px" }} // Change this value
  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
  viewport={{ once: true, margin: "-50px" }}
/>
```

### Adjusting Animation Timing

Modify the `transition` prop values:

```jsx
transition={{
  duration: 0.8,  // Slower animation
  ease: "easeOut",
  delay: 0.5      // Longer delay
}}
```

### Custom Colors

Override styles in `src/components/SectionHeader/styles.module.css`:

```css
.title {
  color: #your-color;
}

.gradientText {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

## Accessibility

- Uses semantic HTML (`<h2>` for titles, `<p>` for subtitles)
- Animations respect `prefers-reduced-motion` (via Framer Motion default behavior)
- Proper text contrast ratios
- Responsive font sizing

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Animations are GPU-accelerated
- `viewport={{ once: true }}` prevents re-animation on scroll
- Optimized with `will-change` implicitly via Framer Motion

## Tips

1. **Viewport Margin**: The `-50px` margin triggers the animation slightly before the element is fully visible for a more natural feel.

2. **Once True**: The animation only plays once to avoid distracting repeat animations.

3. **Staggered Delays**: Title, underline, and subtitle animate in sequence for a polished effect.

4. **Gradient Text**: Only use `highlightText` for 1-2 words to maintain visual hierarchy.

## Example Integration

Here's how to integrate it into your existing Projects section:

```jsx
// src/components/Projects/Projects.jsx
import { SectionHeader } from "@/components";
import styles from "./styles.module.css";

const Projects = () => {
  return (
    <section className={styles.projects} id="projects">
      <SectionHeader
        title="Selected"
        highlightText="Projects"
        subtitle="Scroll to explore my work"
      />

      {/* Your existing project cards */}
    </section>
  );
};

export default Projects;
```

---

**Created**: January 9, 2026  
**Version**: 1.0.0  
**Dependencies**: React 19, Framer Motion
