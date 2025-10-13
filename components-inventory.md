# Components Inventory - Fondation Assalam

## Unified Component Library

This document catalogs all unified components created during the auto-unification process, their props, variants, and usage across the project.

## Core Layout Components

### Layout.jsx
**Purpose**: Root layout wrapper for all pages
**Props**:
- `metadata`: Object with title, description, generator
- `children`: React.ReactNode

**Usage**: Used in all page layouts (`app/layout.jsx`, `app/projects/layout.jsx`, etc.)

### Container.jsx
**Purpose**: Responsive content container
**Props**:
- `size`: "small" | "medium" | "large" | "full" (default: "medium")
- `padding`: boolean (default: true)
- `className`: string

**Usage**: Used throughout all pages for consistent content width and padding

## Content Display Components

### ContentCard.jsx
**Purpose**: Reusable card for displaying projects, blogs, and other content
**Variants**: "default" | "featured" | "blog" | "project"
**Props**:
- `title`: string (required)
- `excerpt`: string (required)
- `image`: string
- `link`: string (required)
- `category`: string
- `date`: string | Date
- `variant`: string (default: "default")
- `priority`: boolean (default: false)
- `className`: string

**Features**:
- Hover animations with image zoom
- Responsive image optimization
- Category tags and metadata display
- Loading states and accessibility

**Usage**: Projects page, Blogs page, Homepage

### ContentGrid.jsx
**Purpose**: Responsive grid layout for content cards
**Props**:
- `items`: Array (required)
- `columns`: Object with responsive breakpoints
- `renderItem`: Function (required)

**Usage**: Projects page, Blogs page, Homepage

## Interactive Components

### Button.jsx ✨ *Enhanced*
**Purpose**: Consistent button styling with animations
**Variants**: "primary" | "secondary" | "outline" | "danger" | "ghost" | "success"
**Props**:
- `children`: React.ReactNode (required)
- `href`: string (optional - renders as Link)
- `variant`: string (default: "primary")
- `size`: "small" | "medium" | "large" (default: "medium")
- `className`: string
- `icon`: React.ReactNode
- `iconPosition`: "left" | "right" (default: "right")
- `disabled`: boolean (default: false)
- `loading`: boolean (default: false)

**Features**:
- Loading states with spinner
- Icon animations and hover effects
- Focus ring for accessibility
- GPU-accelerated hover animations

**Usage**: Throughout all pages for CTAs and interactions

## Form Components

### Input.jsx ✨ *New*
**Purpose**: Form input with validation states
**Props**:
- `label`: string
- `type`: string (default: "text")
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

**Features**:
- Validation state styling
- Icon integration
- Focus animations
- Required field indicators

**Usage**: Contact page forms

### Textarea.jsx ✨ *New*
**Purpose**: Multi-line text input
**Props**:
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `rows`: number (default: 4)

**Features**:
- Auto-resize functionality
- Validation states
- Character count support

**Usage**: Contact page forms

### Select.jsx ✨ *New*
**Purpose**: Dropdown selection component
**Props**:
- `label`: string
- `placeholder`: string (default: "Sélectionnez une option")
- `value`: string
- `onChange`: function
- `options`: Array of {value, label}
- `error`: string
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)

**Features**:
- Custom styling for Moroccan users
- Validation states
- Search functionality for large lists

**Usage**: Contact page forms

## Feedback Components

### Alert.jsx ✨ *New*
**Purpose**: User feedback messages
**Types**: "success" | "error" | "warning" | "info"
**Props**:
- `type`: string (required)
- `title`: string
- `message`: string (required)
- `onClose`: function
- `className`: string
- `dismissible`: boolean (default: false)

**Features**:
- Auto-dismiss functionality
- Animation effects
- Icon integration
- Screen reader support

**Usage**: Contact page, Admin dashboard

### LoadingSpinner.jsx ✨ *New*
**Purpose**: Loading indicators and skeleton screens
**Components**:
- `LoadingSpinner`: Animated spinner
- `LoadingSkeleton`: Content placeholder
- `PageLoading`: Full-page loading state

**Props** (LoadingSpinner):
- `size`: "small" | "medium" | "large" (default: "medium")
- `color`: "blue" | "green" | "gray" | "white" (default: "blue")
- `className`: string

**Usage**: Admin dashboard, async operations

## Data Display Components

### StatsCard.jsx ✨ *New*
**Purpose**: Dashboard statistics display
**Props**:
- `title`: string (required)
- `value`: string | number (required)
- `change`: number
- `changeText`: string
- `icon`: React.ReactNode
- `color`: "blue" | "green" | "red" | "purple" | "yellow" (default: "blue")
- `className`: string

**Features**:
- Trend indicators (up/down arrows)
- Color-coded variants
- Hover animations

**Usage**: Admin dashboard, About page

## Section Components

### SectionWithBackground.jsx ✨ *New*
**Purpose**: Section with colored background
**Variants**: "blue" | "green" | "gray" | "white"
**Props**:
- `variant`: string (default: "blue")
- `className`: string
- `children`: React.ReactNode (required)

**Usage**: Projects page, About page

### ImageTextSection.jsx ✨ *New*
**Purpose**: Alternating image-text layout
**Props**:
- `title`: string (required)
- `content`: string | React.ReactNode (required)
- `imageSrc`: string (required)
- `imageAlt`: string (required)
- `layout`: "image-left" | "image-right" (default: "image-left")
- `titleColor`: "blue" | "green" (default: "blue")
- `className`: string

**Features**:
- Responsive image optimization
- Animation delays for staggered effects

**Usage**: Projects page, About page

## Header Components

### ProjectHeader.jsx ✨ *New*
**Purpose**: Section headers for project pages
**Props**:
- `title`: string (required)
- `subtitle`: string
- `size`: "small" | "medium" | "large" (default: "medium")
- `centered`: boolean (default: true)
- `className`: string

**Usage**: Projects page

### BlogHeader.jsx ✨ *New*
**Purpose**: Section headers for blog pages
**Props**: Same as ProjectHeader

**Usage**: Blogs page

### AboutHeader.jsx ✨ *New*
**Purpose**: Section headers for about pages
**Props**: Same as ProjectHeader

**Usage**: About page

## Specialized Components

### FeaturedPost.jsx ✨ *New*
**Purpose**: Hero blog post for featured content
**Props**:
- `post`: Object with title, excerpt, image, slug, category, date (required)
- `className`: string

**Features**:
- Responsive image layout
- Category badges
- Date formatting

**Usage**: Blogs page

### CategoryFilter.jsx ✨ *New*
**Purpose**: Category filtering for blogs
**Props**:
- `categories`: Array of strings (required)
- `activeCategory`: string
- `basePath`: string (default: "/blogs")
- `className`: string

**Features**:
- Active state styling
- Horizontal scroll for mobile

**Usage**: Blogs page

### Pagination.jsx ✨ *New*
**Purpose**: Page navigation component
**Props**:
- `currentPage`: number (required)
- `totalPages`: number (required)
- `basePath`: string (default: "/blogs")
- `activeCategory`: string
- `className`: string

**Usage**: Blogs page

### MissionVisionCard.jsx ✨ *New*
**Purpose**: Mission and vision display cards
**Types**: "mission" | "vision"
**Props**:
- `type`: string (required)
- `title`: string (required)
- `description`: string (required)
- `className`: string

**Features**:
- Icon integration (M/V)
- Color-coded styling

**Usage**: About page

### ValueCard.jsx ✨ *New*
**Purpose**: Values section cards
**Props**:
- `title`: string (required)
- `description`: string (required)
- `borderColor`: "green" | "blue" | "red" | "purple" (default: "green")
- `className`: string

**Features**:
- Colored top borders
- Hover animations

**Usage**: About page

### TeamMemberCard.jsx ✨ *New*
**Purpose**: Team member profile cards
**Props**:
- `name`: string (required)
- `role`: string (required)
- `imageSrc`: string
- `imageAlt`: string
- `className`: string

**Features**:
- Responsive images
- Hover effects

**Usage**: About page

## Motion & Animation Notes

All components include:
- **Hover Effects**: Subtle scale (1.02) and shadow lift using `hover-lift` class
- **Loading States**: Fade-in animations with `animate-fade-in`
- **Interactive Elements**: Focus rings for accessibility (`focus-ring`)
- **Smooth Transitions**: 300ms duration using design tokens
- **GPU Acceleration**: Transform-based animations for performance

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are focusable
- **ARIA Support**: Proper labeling and roles
- **Color Contrast**: WCAG AA compliance (4.5:1 minimum)
- **Screen Readers**: Semantic HTML and descriptive alt text
- **Touch Targets**: 44px minimum for mobile interactions

## Performance Optimizations

- **Image Optimization**: Next.js Image component with responsive sizing
- **CSS Optimization**: Tailwind utilities with design tokens
- **Animation Performance**: GPU-accelerated transforms
- **Bundle Size**: Minimal component APIs with composition over deep props

## Usage Guidelines

### Importing
```jsx
import {
  Container,
  Button,
  ContentCard,
  // ... other components
} from "components/unified";
```

### Responsive Design
All components follow mobile-first responsive design with consistent breakpoints.

### Animation Guidelines
- Use `animate-fade-in` for page transitions
- Apply `hover-lift` for interactive elements
- Keep animations subtle and purposeful (180-300ms duration)

### Cultural Considerations
- French language support throughout
- Moroccan color psychology (green for hope, blue for trust)
- RTL-ready structure for future Arabic support
- Inclusive design for varying digital literacy levels
