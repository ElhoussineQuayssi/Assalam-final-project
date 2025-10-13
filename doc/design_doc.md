# Design Documentation - Fondation Assalam

## Frontend Design Principles

### Design Philosophy

Fondation Assalam employs a **human-centered, accessible, and culturally appropriate design approach** that reflects Moroccan values while maintaining modern web standards. The design emphasizes trust, compassion, and hope - core values of the foundation's mission.

## Color Palette

### Primary Colors

- **Foundation Blue**: `#1e40af` (Primary brand color)
- **Comfort Slate**: `#64748b` (Success, comfort, and accessibility)
- **Compassion Red**: `#dc2626` (Action, urgency for donations)

### Secondary Colors

- **Light Gray**: `#f8fafc` (Background sections)
- **Medium Gray**: `#64748b` (Secondary text)
- **Dark Gray**: `#334155` (Primary text)
- **White**: `#ffffff` (Primary backgrounds)

### Semantic Color Usage

```css
/* Trust and Stability */
.navbar-scrolled {
  background: white;
}
.footer {
  background: #1e293b;
}

/* Comfort and Accessibility */
.cta-button {
  background: #64748b;
}
.success-states {
  color: #64748b;
}

/* Urgency and Action */
.donation-button {
  background: #dc2626;
}
.alerts {
  border-left: 4px solid #dc2626;
}
```

## Typography

### Font Hierarchy

- **Primary Font**: System font stack (`font-sans`)
- **Headings**: Bold weights (600-800) for impact
- **Body Text**: Regular weight (400) for readability
- **Accent Text**: Medium weight (500) for emphasis

### Typography Scale

- **Hero Titles**: `text-4xl md:text-6xl` (48px-64px)
- **Section Headers**: `text-3xl` (30px)
- **Subheaders**: `text-xl` (20px)
- **Body Text**: `text-base` (16px)
- **Small Text**: `text-sm` (14px)

### Text Contrast Strategy

- **Dark on Light**: `#334155` on `#ffffff` (7:1 ratio)
- **Light on Dark**: `#ffffff` on `#1e293b` (12:1 ratio)
- **Brand Colors**: `#16a34a` on `#ffffff` (4.5:1 ratio)

## Layout and Spacing

### Grid System

- **Container**: `max-w-5xl mx-auto` (Centered, 1024px max-width)
- **Responsive Grid**: `grid md:grid-cols-3 gap-8`
- **Flexible Layouts**: `flex flex-col sm:flex-row`

### Spacing Scale

- **Micro**: `gap-2` (8px)
- **Small**: `gap-4` (16px)
- **Medium**: `gap-8` (32px)
- **Large**: `gap-12` (48px)
- **Hero**: `py-20 md:py-32` (80px-128px)

### Responsive Breakpoints

```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 0 1rem;
}
/* Small screens */
@media (min-width: 640px) {
  /* sm: */
}
/* Medium screens */
@media (min-width: 768px) {
  /* md: */
}
/* Large screens */
@media (min-width: 1024px) {
  /* lg: */
}
```

## Global Styles Architecture

### CSS Organization

```css
/* globals.css structure */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, sans-serif;
}
```

### Component Architecture

- **Utility Classes**: Tailwind CSS classes for rapid development
- **Custom Components**: `@apply` directive for reusable combinations
- **CSS Variables**: For theme colors and consistent values

## Reusable UI Patterns

### Card Component Pattern

```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div className="h-48 relative">
    <Image src={image} alt={title} fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{excerpt}</p>
  </div>
</div>
```

### Button Patterns

```jsx
/* Primary CTA */
className =
  "bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md transition duration-300 font-medium";

/* Secondary Action */
className =
  "bg-white hover:bg-white/90 text-blue-900 px-8 py-3 rounded-md transition duration-300 font-medium";

/* Donation Urgency */
className =
  "bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition duration-300 font-medium";
```

### Navigation Pattern

```jsx
<header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
  <div className="container mx-auto px-4 flex justify-between items-center">
    {/* Logo with conditional styling */}
    <span className={`font-bold text-xl ${scrolled ? "text-blue-700" : "text-white"}`}>
```

## Responsive Behavior

### Mobile-First Design

- **Base styles**: Mobile layout (320px minimum)
- **Progressive enhancement**: Tablet and desktop breakpoints
- **Touch-friendly**: Minimum 44px touch targets
- **Readable text**: Minimum 16px font size

### Adaptive Components

- **Navigation**: Hamburger menu on mobile, horizontal on desktop
- **Cards**: Single column on mobile, multi-column on desktop
- **Typography**: Smaller headings on mobile, larger on desktop
- **Spacing**: Reduced padding on mobile, generous on desktop

## Accessibility Standards

### WCAG Compliance

- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Keyboard Navigation**: All interactive elements focusable
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Alternative Text**: Descriptive alt text for all images

### Inclusive Design Features

```jsx
{/* Semantic HTML */}
<header role="banner">
<main role="main">
<section aria-labelledby="section-title">

{/* Focus management */}
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">

{/* Screen reader only text */}
<span className="sr-only">Navigation menu</span>
```

## Visual Identity System

### Logo Usage

- **Primary Logo**: "Assalam" text with icon
- **Color Variations**: White on colored backgrounds, blue on white
- **Sizing**: Consistent 48px height across breakpoints
- **Spacing**: Minimum 8px padding around logo

### Brand Consistency

- **Tone**: Professional, compassionate, trustworthy
- **Language**: French throughout (RTL support potential)
- **Cultural Sensitivity**: Moroccan-inspired patterns and colors
- **Photography**: Authentic images of beneficiaries and projects

## Modern Design Features

### Micro-Interactions

- **Hover Effects**: `hover:shadow-lg transition-shadow duration-300`
- **Color Transitions**: `transition-colors duration-300`
- **Smooth Scrolling**: `scroll-behavior: smooth`
- **Loading States**: Skeleton screens and spinners

### Advanced Layout Techniques

- **CSS Grid**: For complex layouts like project showcases
- **Flexbox**: For component-level layouts
- **Absolute Positioning**: For overlay content and badges
- **Z-index Management**: Layered content hierarchy

## Design System Components

### Shadcn/UI Integration

```jsx
// Button component using Radix UI + Tailwind
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

## Performance Considerations

### Image Optimization

```jsx
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### CSS Optimization

- **PurgeCSS**: Unused styles removed in production
- **Critical CSS**: Above-the-fold styles inlined
- **Lazy Loading**: Images and components loaded as needed

## Cultural and Regional Considerations

### Moroccan Design Elements

- **Color Psychology**: Green represents hope and growth in Islamic culture
- **Typography**: Clean, modern fonts respecting readability
- **Layout Direction**: LTR implementation (RTL readiness for Arabic)
- **Cultural Symbols**: Subtle integration of Moroccan patterns

### Localization Readiness

- **Language Support**: French primary, Arabic secondary
- **Date Formatting**: French locale (`toLocaleDateString()`)
- **Number Formatting**: European standards (comma as decimal separator)
- **Cultural Sensitivity**: Inclusive imagery and messaging

## Quality Assurance

### Design Testing Checklist

- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Typography is readable at all breakpoints
- [ ] Interactive elements have adequate touch targets
- [ ] Images have appropriate alt text
- [ ] Focus states are clearly visible
- [ ] Layout is stable across different screen sizes
- [ ] Brand consistency is maintained throughout

### Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility Tools**: Screen readers, keyboard navigation
- **Performance**: Core Web Vitals optimization

## Future Design Enhancements

### Recommended Improvements

1. **Dark Mode Support**: Implement theme switching with next-themes
2. **Animation Library**: Add subtle animations with Framer Motion
3. **Advanced Typography**: Variable fonts for better performance
4. **Design Tokens**: Centralized design system with CSS custom properties
5. **Internationalization**: Complete Arabic language support with RTL layout
