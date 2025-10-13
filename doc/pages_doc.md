# Pages Documentation - Fondation Assalam

## Application Structure Overview

Fondation Assalam uses **Next.js 13+ App Router** with a file-based routing system. The application follows a clear hierarchy with public pages for visitors and protected admin routes for content management.

## Route Architecture

### URL Structure

```
/                     → Homepage (Public)
├── /projects         → Projects listing (Public)
│   ├── /Rayhana      → Rayhana Assalam project (Public)
│   ├── /Kafala       → Kafala project (Public)
│   ├── /Imtiaz       → Imtiaz project (Public)
│   ├── /Fataer       → Fataer Al Baraka project (Public)
│   ├── /Center       → Centre Himaya project (Public)
│   └── /Nadi         → Nadi Assalam project (Public)
├── /blogs            → Blog listing (Public)
│   └── /[slug]       → Individual blog post (Public)
├── /about            → About page (Public)
├── /contact          → Contact page (Public)
└── /admin            → Admin panel (Protected)
    ├── /login        → Admin authentication (Public)
    ├── /dashboard    → Admin overview (Protected)
    ├── /blogs        → Blog management (Protected)
    ├── /messages     → Contact message management (Protected)
    └── /admins       → Admin user management (Protected)
```

## Public Pages

### 1. Homepage (`/`) - `app/page.jsx`

**Purpose**: Main landing page showcasing the foundation's mission and key projects

**Key Components**:

- **Hero Section**: Mission statement with CTAs for projects and donations
- **Featured Projects**: Grid of 6 main projects with images and descriptions
- **Blog Preview**: Latest 3 blog posts with categories and dates
- **Testimonials**: Social proof from beneficiaries
- **Call-to-Action**: Final conversion section for donations/volunteering

**Data Fetching**:

```jsx
// Server-side blog fetching
const result = await getBlogs();
const blogs = result.success ? result.data.slice(0, 3) : [];
```

**SEO Features**:

- Meta title: "Fondation Assalam"
- Description: "Fondation Assalam - Pour un avenir meilleur"
- French language declaration

**Layout**: Navbar + Main content + Footer

### 2. Projects Listing (`/projects`) - `app/projects/page.jsx`

**Purpose**: Comprehensive overview of all foundation projects

**Features**:

- **Project Grid**: All 6 projects displayed as cards
- **Detailed Information**: Title, description, and project-specific imagery
- **Call-to-Action**: "Learn More" buttons linking to individual project pages

**Static Data Structure**:

```jsx
const projects = [
  {
    title: "Rayhana assalam",
    excerpt: "Programme de soutien pour les femmes en difficulté.",
    image: "/projects/rayhana.jpg",
    link: "/projects/Rayhana",
  },
  // ... 5 more projects
];
```

**Layout**: Shared projects layout with navigation

### 3. Individual Project Pages (`/projects/[ProjectName]`)

**Purpose**: Detailed information about specific foundation initiatives

**Route Structure**:

- `/projects/Rayhana` - Women support program
- `/projects/Kafala` - Orphan sponsorship
- `/projects/Imtiaz` - Student scholarships
- `/projects/Fataer` - Pastry training center
- `/projects/Center` - Support center for women/children
- `/projects/Nadi` - Sewing hope initiative

**Common Features**:

- **Hero Section**: Project-specific imagery and overview
- **Detailed Description**: Comprehensive program information
- **Impact Metrics**: Beneficiaries, achievements, goals
- **Call-to-Action**: Donation and volunteer opportunities
- **Related Projects**: Cross-linking to similar initiatives

### 4. Blog System

#### Blog Listing (`/blogs`) - `app/blogs/page.jsx`

**Purpose**: Display all published blog posts with filtering and pagination

**Features**:

- **Blog Grid**: Cards with images, categories, and excerpts
- **Category Filtering**: News, updates, success stories
- **Pagination**: Load more posts functionality
- **Search Functionality**: Text-based post discovery
- **Social Sharing**: Share buttons for each post

**Data Fetching**:

```jsx
// Server-side blog retrieval (no pagination limit shown)
const blogs = await getBlogs();
// Client-side filtering would be needed for pagination
```

#### Individual Blog Posts (`/blogs/[slug]`) - `app/blogs/[slug]/page.jsx`

**Purpose**: Full blog post display with rich content

**Features**:

- **Rich Content**: HTML content with images and formatting
- **Metadata**: Publication date, category, author
- **Social Sharing**: Integrated share functionality
- **Related Posts**: Algorithm-based content recommendations
- **SEO Optimization**: Slug-based URLs, meta descriptions

**Dynamic Routing**: Uses `[slug]` parameter from database

### 5. About Page (`/about`) - `app/about/page.jsx`

**Purpose**: Foundation background, mission, and team information

**Content Sections**:

- **Foundation History**: Origin story and establishment
- **Mission & Vision**: Long-term goals and values
- **Leadership Team**: Key personnel and roles
- **Impact Statistics**: Beneficiaries and achievements
- **Transparency**: Financial reports and governance

### 6. Contact Page (`/contact`) - `app/contact/page.jsx`

**Purpose**: Multi-purpose contact form for different user needs

**Form Types**:

- **General Contact**: Information requests
- **Donation Inquiries**: Giving opportunities
- **Volunteer Applications**: Community involvement
- **Partnership Requests**: Organizational collaboration

**Form Features**:

- **Dynamic Labels**: Context-aware form fields
- **Type Selection**: Dropdown for inquiry categorization
- **Validation**: Client and server-side input validation
- **Success Feedback**: Confirmation messaging

## Administrative Pages (Protected)

### Authentication System

#### Login Page (`/admin/login`) - `app/admin/login/page.jsx`

**Purpose**: Secure authentication for admin users

**Security Features**:

- **Rate Limiting**: Failed attempt tracking
- **Account Lockout**: Temporary suspension after multiple failures
- **Password Requirements**: Complexity validation
- **Session Management**: Secure token-based authentication

**Layout**: Standalone page without navigation wrapper

### Admin Dashboard (`/admin/dashboard`)

**Purpose**: Central admin control panel

**Features**:

- **Overview Statistics**: Key metrics and recent activity
- **Quick Actions**: Common administrative tasks
- **Recent Content**: Latest blog posts and messages
- **System Status**: Database health and performance

### Content Management

#### Blog Management (`/admin/blogs`) - `app/admin/blogs/page.jsx`

**Purpose**: Create, edit, and manage blog content

**Features**:

- **Blog Editor**: Rich text editor with image upload
- **Draft System**: Save unpublished content
- **Category Management**: Organize posts by topic
- **Publishing Workflow**: Draft → Review → Published
- **SEO Tools**: Meta tag and URL management

#### Message Management (`/admin/messages`)

**Purpose**: Handle contact form submissions and inquiries

**Features**:

- **Message Inbox**: All received communications
- **Status Tracking**: Unread, read, archived states
- **Priority Flagging**: Important message highlighting
- **Response System**: Direct reply functionality
- **Export Capabilities**: Data export for analysis

#### Admin User Management (`/admin/admins`)

**Purpose**: Manage administrative user accounts

**Features**:

- **User CRUD**: Create, read, update, delete admin accounts
- **Role Management**: Different permission levels
- **Access Logs**: Login activity and security monitoring
- **Password Policies**: Security requirement enforcement

## Layout System

### Root Layout (`app/layout.jsx`)

**Purpose**: Global HTML structure and metadata

**Features**:

- **Language Declaration**: `<html lang="fr">`
- **Global Styles**: CSS imports and font declarations
- **Metadata**: Title and description for SEO
- **Structure**: `<main>` wrapper for page content

### Shared Layouts

#### Projects Layout (`app/projects/layout.jsx`)

**Purpose**: Common structure for all project-related pages

**Features**:

- **Navigation**: Project-specific menu
- **Breadcrumbs**: Hierarchical navigation
- **Consistent Styling**: Shared project page styles

#### Blogs Layout (`app/blogs/layout.jsx`)

**Purpose**: Consistent structure for blog pages

**Features**:

- **Category Navigation**: Blog topic filtering
- **Archive Access**: Date-based content browsing
- **Social Integration**: Share buttons and comments

#### Admin Layout (`app/admin/layout.jsx`)

**Purpose**: Administrative interface wrapper

**Features**:

- **Sidebar Navigation**: Admin panel menu
- **Authentication Check**: Protected route access
- **Responsive Design**: Mobile-friendly admin interface

## Navigation Flow

### User Journey Patterns

#### Visitor → Information → Action

```
Homepage → Project Details → Contact Form → Thank You
    ↓           ↓              ↓           ↓
Discovery → Understanding → Engagement → Conversion
```

#### Content Consumer Journey

```
Homepage → Blog List → Individual Post → Related Content
    ↓          ↓            ↓              ↓
Awareness → Interest → Deep Dive → Retention
```

#### Administrator Workflow

```
Login → Dashboard → Content Management → Message Handling
  ↓        ↓            ↓                   ↓
Auth → Overview → Creation/Update → Communication
```

## SEO and Performance

### SEO Implementation

- **Meta Tags**: Dynamic title and description generation
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema markup for search engines
- **Canonical URLs**: Duplicate content prevention

### Performance Features

- **Server-Side Rendering**: Initial page load optimization
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Caching Strategy**: Server and client-side caching

## Error Handling

### Error Pages

- **404 Not Found**: Custom page for missing routes
- **500 Server Error**: Error handling with user feedback
- **Network Errors**: Offline and connectivity issues

### Error Boundaries

- **React Error Boundaries**: Component-level error isolation
- **Graceful Degradation**: Fallback content for failed components
- **User Feedback**: Clear error messaging and recovery options

## Internationalization Strategy

### Current Implementation

- **Primary Language**: French (`lang="fr"`)
- **Character Encoding**: UTF-8 for multilingual support
- **RTL Readiness**: CSS structure prepared for Arabic

### Future Enhancements

- **Arabic Translation**: Complete bilingual support
- **Locale Switching**: User preference language selection
- **Content Management**: Multi-language content storage

## Accessibility Features

### WCAG Compliance

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliance for text readability

### Navigation Accessibility

- **Skip Links**: Quick navigation to main content
- **Focus Management**: Visible focus indicators
- **Mobile Accessibility**: Touch-friendly interface elements

## Mobile Responsiveness

### Responsive Design Strategy

- **Mobile-First**: Base styles for mobile devices
- **Progressive Enhancement**: Tablet and desktop breakpoints
- **Touch Optimization**: 44px minimum touch targets
- **Performance**: Optimized images and loading

### Breakpoint System

```jsx
{
  /* Mobile: Default styles */
}
{
  /* sm: 640px+ */
}
{
  /* md: 768px+ */
}
{
  /* lg: 1024px+ */
}
{
  /* xl: 1280px+ */
}
```

## Development Considerations

### Page Performance

- **Bundle Analysis**: Monitor JavaScript bundle sizes
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Image Optimization**: WebP format with fallbacks
- **Font Loading**: System font stack for performance

### Maintainability

- **Component Reusability**: Shared components across pages
- **Consistent Patterns**: Similar structure across page types
- **Code Organization**: Clear separation of concerns
- **Documentation**: Inline comments and README files
