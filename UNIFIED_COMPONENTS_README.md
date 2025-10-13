# Unified Components Documentation - Fondation Assalam

## Overview

This project features a comprehensive, unified component system designed to provide consistent UI/UX across the entire Fondation Assalam Next.js application. The design system follows Moroccan cultural values while maintaining modern web standards, with a focus on accessibility, responsiveness, and smooth animations.

## Design System Principles

### Color Palette
- **Foundation Blue**: `#1e40af` - Trust and stability
- **Comfort Slate**: `#64748b` - Comfort and accessibility
- **Compassion Red**: `#dc2626` - Action and urgency
- **Supporting Colors**: Light gray (`#f8fafc`), medium gray (`#475569`), dark gray (`#334155`)

### Typography
- **Primary Font**: System font stack for optimal performance
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Scale**: From 12px to 60px with consistent line heights

### Spacing & Layout
- **Container System**: Responsive containers (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Spacing Scale**: Consistent 4px-based spacing system
- **Border Radius**: From sharp corners to fully rounded elements

## Enhanced Design Tokens

All design tokens are centralized in `styles/design-tokens.css`:
- CSS custom properties for colors, typography, spacing, shadows, and animations
- Responsive breakpoints and container sizes
- Hover effects and micro-interactions
- Accessibility-focused design patterns

## Component Library

### Core Layout Components

#### `Layout.jsx`
**Purpose**: Root layout wrapper for all pages
**Features**:
- HTML structure with proper lang attribute
- Meta tag management
- Navbar and Footer integration
- Background styling

**Usage**:
```jsx
import { Layout } from "components/unified";

export default function Page() {
  return (
    <Layout metadata={{ title: "Page Title", description: "Page description" }}>
      <div>Page content</div>
    </Layout>
  );
}
```

#### `Container.jsx`
**Purpose**: Responsive content container
**Props**:
- `size`: "small" | "medium" | "large" | "full"
- `padding`: boolean
- `className`: additional CSS classes

**Usage**:
```jsx
<Container size="large" padding={true}>
  <div>Content</div>
</Container>
```

### Content Components

#### `ContentCard.jsx`
**Purpose**: Reusable card for displaying projects, blogs, and other content
**Variants**:
- `default`: Standard card layout
- `featured`: Enhanced card with "À la une" badge
- `blog`: Blog-specific layout with date
- `project`: Project-specific layout

**Features**:
- Hover animations with image zoom effect
- Responsive image optimization
- Category tags and metadata display
- Loading states and accessibility features

**Usage**:
```jsx
<ContentCard
  title="Project Title"
  excerpt="Project description..."
  image="/path/to/image.jpg"
  link="/project/slug"
  category="Education"
  date="2024-01-01"
  variant="project"
  priority={true}
/>
```

#### `ContentGrid.jsx`
**Purpose**: Responsive grid layout for content cards
**Props**:
- `items`: Array of content items
- `columns`: Responsive column configuration
- `renderItem`: Function to render each item

**Usage**:
```jsx
<ContentGrid
  items={projects}
  columns={{ default: 1, md: 2, lg: 3 }}
  renderItem={(project, index) => (
    <ContentCard key={index} {...project} />
  )}
/>
```

### Interactive Components

#### `Button.jsx` ✨ *Enhanced*
**Purpose**: Consistent button styling across the application
**Variants**:
- `primary`: Main CTA button (green)
- `secondary`: Secondary actions (white/blue)
- `outline`: Outlined button style
- `danger`: Destructive actions (red)
- `ghost`: Minimal button style
- `success`: Success confirmation (green)

**Features**:
- Loading states with spinner animation
- Icon support (left/right positioning)
- Disabled states
- Hover lift effects and shine animations
- Focus ring for accessibility

**Usage**:
```jsx
<Button
  variant="primary"
  size="large"
  href="/contact"
  icon={<ArrowRight />}
  loading={isSubmitting}
>
  Contact Us
</Button>
```

#### `Input.jsx` ✨ *New*
**Purpose**: Form input component with validation states
**Features**:
- Label and error message support
- Icon integration (left/right)
- Focus states and animations
- Required field indicators
- Disabled states

**Usage**:
```jsx
<Input
  label="Email Address"
  type="email"
  name="email"
  placeholder="your@email.com"
  required
  error={errors.email}
/>
```

#### `Textarea.jsx` ✨ *New*
**Purpose**: Multi-line text input with consistent styling
**Features**:
- Auto-resize functionality
- Character count support
- Validation states
- Moroccan RTL text support

**Usage**:
```jsx
<Textarea
  label="Message"
  name="message"
  rows={5}
  placeholder="Your message..."
  required
  error={errors.message}
/>
```

#### `Select.jsx` ✨ *New*
**Purpose**: Dropdown selection component
**Features**:
- Custom styling for Moroccan users
- Search functionality for large lists
- Validation states
- Icon integration

**Usage**:
```jsx
<Select
  label="Contact Type"
  name="type"
  options={[
    { value: "general", label: "General Inquiry" },
    { value: "donation", label: "Donation" },
    { value: "volunteer", label: "Volunteer" }
  ]}
/>
```

### Feedback Components

#### `Alert.jsx` ✨ *New*
**Purpose**: User feedback messages (success, error, warning, info)
**Types**:
- `success`: Confirmation messages
- `error`: Error notifications
- `warning`: Caution messages
- `info`: General information

**Features**:
- Auto-dismiss functionality
- Icon integration
- Animation effects
- Screen reader support

**Usage**:
```jsx
<Alert
  type="success"
  title="Success!"
  message="Your message has been sent."
  dismissible={true}
  onClose={() => setShowAlert(false)}
/>
```

#### `LoadingSpinner.jsx` ✨ *New*
**Purpose**: Loading indicators and skeleton screens
**Components**:
- `LoadingSpinner`: Animated spinner
- `LoadingSkeleton`: Content placeholder
- `PageLoading`: Full-page loading state

**Usage**:
```jsx
// Simple spinner
<LoadingSpinner size="large" color="blue" />

// Skeleton loading
<LoadingSkeleton lines={3} />

// Full page loading
<PageLoading message="Loading content..." />
```

### Data Display Components

#### `StatsCard.jsx` ✨ *New*
**Purpose**: Dashboard statistics display
**Features**:
- Icon integration
- Trend indicators (up/down arrows)
- Color-coded variants
- Hover animations

**Usage**:
```jsx
<StatsCard
  title="Total Projects"
  value={150}
  change={12}
  changeText="from last month"
  icon={FileText}
  color="blue"
/>
```

### Modal Components

#### `Modal.jsx` ✨ *New*
**Purpose**: Modal dialog overlay
**Features**:
- Backdrop blur effect
- Focus trap for accessibility
- Responsive sizing
- Animation effects
- Custom header support

**Usage**:
```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Modal Title"
  size="medium"
>
  <p>Modal content...</p>
</Modal>
```

### Section Components

#### `SectionHeader.jsx`
**Purpose**: Consistent section headings
**Features**:
- Responsive typography
- Optional subtitle
- Animation support

#### `HeroSection.jsx`
**Purpose**: Hero/banner sections
**Features**:
- Background image support
- Call-to-action buttons
- Responsive text sizing

#### `CTASection.jsx`
**Purpose**: Call-to-action sections
**Features**:
- Button integration
- Background styling
- Animation effects

## Implementation Guidelines

### File Structure
```
components/unified/
├── index.js                 # Component exports
├── Layout.jsx              # Root layout
├── Container.jsx           # Content containers
├── Button.jsx              # Interactive buttons
├── ContentCard.jsx         # Content cards
├── ContentGrid.jsx         # Grid layouts
├── Input.jsx               # Form inputs
├── Textarea.jsx            # Text areas
├── Select.jsx              # Dropdown selects
├── Modal.jsx               # Modal dialogs
├── Alert.jsx               # Feedback messages
├── StatsCard.jsx           # Dashboard stats
├── LoadingSpinner.jsx      # Loading states
└── [other components...]
```

### Usage Patterns

#### Importing Components
```jsx
import {
  Layout,
  Container,
  Button,
  Input,
  Alert,
  ContentCard
} from "components/unified";
```

#### Responsive Design
All components follow mobile-first responsive design:
- Base styles for mobile (320px+)
- Tablet enhancements (768px+)
- Desktop optimizations (1024px+)

#### Animation Guidelines
- Use `animate-fade-in` for page transitions
- Apply `hover-lift` for interactive elements
- Implement `focus-ring` for accessibility
- Keep animations subtle and purposeful

#### Cultural Considerations
- French language support throughout
- RTL-ready structure for future Arabic support
- Moroccan color psychology (blue for trust, comfortable slate for accessibility)
- Inclusive design for varying digital literacy levels

## Accessibility Features

### WCAG Compliance
- Color contrast ratios meet AA standards
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Alternative text for images

### Inclusive Design
- Touch-friendly interaction areas (44px minimum)
- Clear visual hierarchy
- Error prevention and recovery
- Multi-modal feedback

## Performance Optimizations

### Image Optimization
- Next.js Image component integration
- Responsive image sizing
- Lazy loading support
- WebP format optimization

### CSS Optimization
- Tailwind CSS utility classes
- CSS custom properties for theming
- Minimal runtime overhead
- Tree-shaking support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach
- Graceful degradation for older browsers

## Future Enhancements

### Planned Features
- Dark mode theme support
- Advanced animation library integration
- Internationalization (Arabic RTL support)
- Progressive Web App features
- Advanced form validation

### Customization
All components accept `className` props for custom styling while maintaining design consistency.

---

*This component system provides a solid foundation for the Fondation Assalam project while allowing for future growth and customization. The design emphasizes cultural sensitivity, accessibility, and modern web standards.*
