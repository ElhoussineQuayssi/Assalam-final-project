# Components Documentation - Fondation Assalam

## Component Architecture Overview

Fondation Assalam employs a **modular, reusable component architecture** based on React functional components with hooks. The project uses a comprehensive UI component library built on Radix UI primitives with Tailwind CSS styling.

## Component Hierarchy

### Top-Level Layout Components

```
Layout Components (Page Wrappers)
├── Navbar.jsx (Site-wide navigation)
├── Footer.jsx (Site-wide footer)
├── AdminSidebar.jsx (Admin panel navigation)
└── ClientOnlyWrapper.jsx (Client-side rendering wrapper)
```

### Feature-Specific Components

```
Feature Components (Business Logic)
├── ProjectCard.jsx (Individual project display)
├── BlogCard.jsx (Blog post preview)
├── TestimonialCard.jsx (Beneficiary testimonials)
├── ContactForm.jsx (Multi-purpose contact form)
└── AdminDashboard.jsx (Admin overview)
```

### UI Primitive Components (51 components)

```
UI Library (Radix UI + Tailwind)
├── Form Components (input, textarea, select, checkbox)
├── Layout Components (card, sheet, dialog, tabs)
├── Navigation (breadcrumb, navigation-menu, menubar)
├── Feedback (alert, toast, sonner)
├── Data Display (table, chart, carousel)
└── Interactive (button, dropdown-menu, popover)
```

## Layout Components

### 1. Navbar.jsx

**Location**: `components/Navbar.jsx`

**Purpose**: Site-wide navigation header with responsive design

**Key Features**:

- **Responsive Navigation**: Hamburger menu on mobile, horizontal on desktop
- **Scroll-based Styling**: Background opacity changes on scroll
- **Logo Integration**: Foundation branding with Next.js Image optimization
- **Mobile Menu**: Slide-out navigation panel for smaller screens

**Props**: None (functional component with internal state)

**State Management**:

```jsx
const [isOpen, setIsOpen] = useState(false); // Mobile menu state
const [scrolled, setScrolled] = useState(false); // Scroll-based styling
```

**Dependencies**:

- `next/link` - Navigation links
- `next/image` - Logo optimization
- `lucide-react` - Menu icons
- `next/navigation` - Current pathname detection

### 2. Footer.jsx

**Location**: `components/Footer.jsx`

**Purpose**: Site-wide footer with links, contact info, and social media

**Key Features**:

- **Multi-column Layout**: Responsive grid (1-4 columns based on screen size)
- **Contact Information**: Phone, email, address with icons
- **Social Media Links**: Facebook, Twitter, Instagram, LinkedIn
- **Quick Navigation**: Important page links
- **Newsletter Signup**: Email subscription form

**Content Sections**:

1. **Brand Section**: Logo, description, social links
2. **Quick Links**: Navigation shortcuts
3. **Projects**: Featured project links
4. **Contact Info**: Physical address and contact details

### 3. AdminSidebar.jsx

**Location**: `components/AdminSidebar.jsx`

**Purpose**: Administrative panel navigation for content management

**Key Features**:

- **Role-based Access**: Different menu items based on permissions
- **Active State**: Current page highlighting
- **Collapsible Design**: Space-efficient layout
- **Icon Integration**: Visual navigation cues

**Navigation Items**:

- Dashboard overview
- Blog management
- Message handling
- Admin user management
- System settings

### 4. ClientOnlyWrapper.jsx

**Location**: `components/ClientOnlyWrapper.jsx`

**Purpose**: Prevent server-side rendering for client-specific components

**Implementation**:

```jsx
"use client";

import { useEffect, useState } from "react";

export default function ClientOnlyWrapper({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
```

## Feature Components

### 1. ProjectCard.jsx (Pattern)

**Purpose**: Reusable card component for displaying project information

**Structure**:

```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div className="h-48 relative">
    <Image src={image} alt={title} fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{excerpt}</p>
    <Link
      href={link}
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
    >
      En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  </div>
</div>
```

**Design Patterns**:

- **Progressive Disclosure**: Image → Title → Description → Action
- **Hover Effects**: Subtle shadow transitions
- **Responsive Images**: Fill layout with object-cover
- **Consistent Spacing**: 6-unit padding throughout

### 2. BlogCard.jsx (Pattern)

**Purpose**: Display blog post previews in listings

**Features**:

- **Category Tags**: Visual categorization
- **Publication Dates**: Relative time display
- **Excerpt Preview**: Content summary
- **Read More Links**: Deep linking to full posts

### 3. ContactForm.jsx

**Purpose**: Multi-purpose contact form with dynamic fields

**Form Types**:

- **Contact**: General inquiries
- **Donation**: Giving opportunities
- **Volunteer**: Community involvement

**Features**:

- **Dynamic Validation**: Context-aware field requirements
- **Real-time Feedback**: Client-side validation
- **Server Actions**: Form submission handling
- **Success States**: Confirmation messaging

## UI Component Library

### Component Library Architecture

Fondation Assalam uses **shadcn/ui** - a comprehensive React component library built on Radix UI primitives with Tailwind CSS styling.

### Core UI Categories

#### 1. Form Components

```jsx
// Input Components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Usage
<Input placeholder="Votre prénom" />
<Textarea placeholder="Votre message" />
<Select><SelectTrigger><SelectValue /></SelectTrigger></Select>
```

**Key Features**:

- **Validation Integration**: React Hook Form compatibility
- **Accessibility**: Built-in ARIA labels and keyboard navigation
- **Consistent Styling**: Unified design tokens
- **Error States**: Visual feedback for validation failures

#### 2. Layout Components

```jsx
// Layout Primitives
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Usage
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description...</p>
  </CardContent>
</Card>;
```

#### 3. Navigation Components

```jsx
// Navigation Elements
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

// Breadcrumb implementation
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/projects">Projets</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>Projet Actuel</BreadcrumbItem>
</Breadcrumb>;
```

#### 4. Feedback Components

```jsx
// User Feedback
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Alert usage
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>Message d'information important</AlertDescription>
</Alert>;

// Toast notifications
const { toast } = useToast();
toast({ title: "Succès", description: "Message envoyé avec succès" });
```

#### 5. Data Display Components

```jsx
// Information Display
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Table for admin data
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nom</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Statut</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
          <Badge variant={item.status}>{item.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>;
```

### 4. ClientOnlyWrapper.jsx

**Location**: `components/ClientOnlyWrapper.jsx`

**Purpose**: Prevent server-side rendering for client-specific components

**Implementation**:

```jsx
"use client";

import { useEffect, useState } from "react";

export default function ClientOnlyWrapper({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
```

## Feature Components

### 1. ProjectCard.jsx (Pattern)

**Purpose**: Reusable card component for displaying project information

**Structure**:

```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div className="h-48 relative">
    <Image src={image} alt={title} fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{excerpt}</p>
    <Link
      href={link}
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
    >
      En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  </div>
</div>
```

**Design Patterns**:

- **Progressive Disclosure**: Image → Title → Description → Action
- **Hover Effects**: Subtle shadow transitions
- **Responsive Images**: Fill layout with object-cover
- **Consistent Spacing**: 6-unit padding throughout

### 2. BlogCard.jsx (Pattern)

**Purpose**: Display blog post previews in listings

**Features**:

- **Category Tags**: Visual categorization
- **Publication Dates**: Relative time display
- **Excerpt Preview**: Content summary
- **Read More Links**: Deep linking to full posts

### 3. ContactForm.jsx

**Purpose**: Multi-purpose contact form with dynamic fields

**Form Types**:

- **General Contact**: Information requests and inquiries
- **Donation Interest**: Giving opportunity exploration
- **Volunteer Applications**: Community involvement requests
- **Partnership Requests**: Organizational collaboration proposals

**Features**:

- **Dynamic Validation**: Context-aware field requirements
- **Real-time Feedback**: Client-side validation
- **Server Actions**: Form submission handling
- **Success States**: Confirmation messaging

## UI Component Library

### Component Library Architecture

Fondation Assalam uses **shadcn/ui** - a comprehensive React component library built on Radix UI primitives with Tailwind CSS styling.

### Core UI Categories

#### 1. Form Components

```jsx
// Input Components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Usage
<Input placeholder="Votre prénom" />
<Textarea placeholder="Votre message" />
<Select><SelectTrigger><SelectValue /></SelectTrigger></Select>
```

**Key Features**:

- **Validation Integration**: React Hook Form compatibility
- **Accessibility**: Built-in ARIA labels and keyboard navigation
- **Consistent Styling**: Unified design tokens
- **Error States**: Visual feedback for validation failures

#### 2. Layout Components

```jsx
// Layout Primitives
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Usage
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description...</p>
  </CardContent>
</Card>;
```

#### 3. Navigation Components

```jsx
// Navigation Elements
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

// Breadcrumb implementation
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/projects">Projets</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>Projet Actuel</BreadcrumbItem>
</Breadcrumb>;
```

#### 4. Feedback Components

```jsx
// User Feedback
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Alert usage
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>Message d'information important</AlertDescription>
</Alert>;

// Toast notifications
const { toast } = useToast();
toast({ title: "Succès", description: "Message envoyé avec succès" });
```

#### 5. Data Display Components

```jsx
// Information Display
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Table for admin data
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nom</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Statut</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
          <Badge variant={item.status}>{item.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>;
```

## Component Dependencies

### External Dependencies

```json
// Key UI dependencies from package.json
"@radix-ui/react-accordion": "1.2.2"
"@radix-ui/react-alert-dialog": "1.1.4"
"@radix-ui/react-dialog": "1.1.4"
"@radix-ui/react-dropdown-menu": "2.1.4"
"@radix-ui/react-navigation-menu": "1.2.3"
"lucide-react": "^0.454.0"
"class-variance-authority": "^0.7.1"
"clsx": "^2.1.1"
"tailwind-merge": "^2.5.5"
```

### Internal Dependencies

```jsx
// Common imports across components
import { cn } from "@/lib/utils"; // Utility functions
import { Button } from "@/components/ui/button"; // Base button component
import { Input } from "@/components/ui/input"; // Form input component
import { Card } from "@/components/ui/card"; // Layout card component
```

## State Management Patterns

### Local State (useState)

```jsx
// Mobile menu state
const [isOpen, setIsOpen] = useState(false);

// Form state
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

// Loading states
const [isSubmitting, setIsSubmitting] = useState(false);
```

### Server State (Server Actions)

```jsx
// Data fetching in components
const result = await getBlogs();
const blogs = result.success ? result.data : [];

// Form submission
const handleSubmit = async (formData) => {
  const result = await saveMessage(formData);
  if (result.success) {
    // Handle success
  } else {
    // Handle error
  }
};
```

## Component Composition Patterns

### Higher-Order Components

```jsx
// Layout wrapper pattern
export default function ProjectPage({ params }) {
  return (
    <ProjectLayout>
      <ProjectContent projectId={params.id} />
    </ProjectLayout>
  );
}
```

### Render Props Pattern

```jsx
// Data fetching wrapper
<DataFetcher endpoint="/api/projects">
  {(data, loading, error) => (
    <ProjectList projects={data} loading={loading} error={error} />
  )}
</DataFetcher>
```

## Performance Optimizations

### Code Splitting

- **Automatic Splitting**: Next.js handles route-based code splitting
- **Component Lazy Loading**: Dynamic imports for heavy components
- **Tree Shaking**: Unused component code elimination

### Memoization

```jsx
// Component memoization
const ProjectCard = memo(({ project }) => {
  return (
    <Card>
      <CardContent>{project.title}</CardContent>
    </Card>
  );
});
```

### Image Optimization

```jsx
// Next.js Image component with optimization
<Image
  src={project.image}
  alt={project.title}
  width={400}
  height={300}
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Accessibility Implementation

### ARIA Implementation

```jsx
// Semantic structure
<nav role="navigation" aria-label="Navigation principale">
  <ul role="list">
    <li role="listitem">
      <a href="/projects" aria-current={pathname === '/projects' ? 'page' : undefined}>
        Projets
      </a>
    </li>
  </ul>
</nav>

// Form accessibility
<label htmlFor="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  aria-required="true"
  aria-describedby="email-help"
/>
```

### Keyboard Navigation

- **Tab Order**: Logical focus flow through interactive elements
- **Focus Indicators**: Visible focus rings on all focusable elements
- **Skip Links**: Quick navigation to main content areas
- **Escape Key**: Modal and dropdown closing

## Component Testing Strategy

### Testing Approach

```jsx
// Component testing pattern
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Projets")).toBeInTheDocument();
  });

  it("toggles mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    // Assert mobile menu is open
  });
});
```

## Maintenance Considerations

### Component Best Practices

- **Single Responsibility**: Each component has one clear purpose
- **Prop Interfaces**: Clear prop types and defaults
- **Error Boundaries**: Graceful error handling
- **Documentation**: JSDoc comments for complex components

### Refactoring Opportunities

1. **TypeScript Migration**: Add type safety to component props
2. **Storybook Documentation**: Visual component documentation
3. **Performance Monitoring**: Component render tracking
4. **Accessibility Auditing**: Automated a11y testing

## Component Library Governance

### Adding New Components

1. **Need Assessment**: Identify component requirements
2. **Radix UI Check**: Leverage existing primitives when possible
3. **Design System Compliance**: Follow established patterns
4. **Documentation**: Add JSDoc and usage examples
5. **Testing**: Unit tests for functionality
6. **Review Process**: Code review and approval

### Component Deprecation

- **Usage Auditing**: Find all component usages
- **Migration Path**: Provide upgrade instructions
- **Gradual Removal**: Multiple version deprecation warnings
- **Documentation Updates**: Remove from component library docs
