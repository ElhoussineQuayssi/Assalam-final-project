# Architecture Documentation - Fondation Assalam

## System Architecture Overview

Fondation Assalam implements a **modern, full-stack web application architecture** using Next.js 15's App Router with a clear separation of concerns. The architecture emphasizes maintainability, scalability, and performance while supporting the organization's charitable mission.

## High-Level Architecture

### Architecture Pattern: Full-Stack Web Application

```
┌─────────────────────────────────────────────────────────────────┐
│                    Client Layer (Browser)                       │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router          │ React Server Components         │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │   Pages     │◄────────────┤ │   Layouts   │                 │
│  │ (app/*)     │             │ │ (Shared UI) │                 │
│  └─────────────┘             │ └─────────────┘                 │
│                              │                                 │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │ Components  │◄────────────┤ │   Styles    │                 │
│  │ (React)     │             │ │ (Tailwind)  │                 │
│  └─────────────┘             │ └─────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                   Server Layer (Next.js Runtime)               │
├─────────────────────────────────────────────────────────────────┤
│  Server Actions              │ API Routes                      │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │  Form       │◄────────────┤ │ /api/*      │                 │
│  │ Processing  │             │ │ Endpoints   │                 │
│  └─────────────┘             │ └─────────────┘                 │
│                              │                                 │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │ Middleware  │             │ │ Server-Side │                 │
│  │ (Auth)      │◄────────────┤ │ Rendering   │                 │
│  └─────────────┘             │ └─────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                    Data Layer (SQLite)                         │
├─────────────────────────────────────────────────────────────────┤
│  Database Schema             │ Business Logic                  │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │   Tables    │◄────────────┤ │   Lib/*     │                 │
│  │ (SQL)       │             │ │ Functions   │                 │
│  └─────────────┘             │ └─────────────┘                 │
│                              │                                 │
│  ┌─────────────┐             │ ┌─────────────┐                 │
│  │   Indexes   │             │ │ Validation  │                 │
│  │ (Perf)      │◄────────────┤ │ (Security)  │                 │
│  └─────────────┘             │ └─────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

## Application Architecture Patterns

### 1. Next.js App Router Architecture

**File-Based Routing System**:

```
app/
├── layout.jsx              // Root layout (shared across all pages)
├── page.jsx               // Homepage (/)
├── globals.css           // Global styles
├── middleware.js         // Route protection and headers
│
├── about/
│   └── page.jsx          // About page (/about)
│
├── projects/
│   ├── layout.jsx        // Projects section layout
│   ├── page.jsx          // Projects listing (/projects)
│   └── [ProjectName]/
│       └── page.jsx      // Individual project (/projects/:name)
│
├── blogs/
│   ├── layout.jsx        // Blog section layout
│   ├── page.jsx          // Blog listing (/blogs)
│   └── [slug]/
│       └── page.jsx      // Individual post (/blogs/:slug)
│
├── contact/
│   └── page.jsx          // Contact page (/contact)
│
└── admin/
    ├── layout.jsx        // Admin panel layout
    ├── login/
    │   └── page.jsx      // Login page (/admin/login)
    ├── dashboard/
    │   └── page.jsx      // Dashboard (/admin/dashboard)
    ├── blogs/
    │   └── page.jsx      // Blog management (/admin/blogs)
    ├── messages/
    │   └── page.jsx      // Message management (/admin/messages)
    └── admins/
        └── page.jsx      // Admin management (/admin/admins)
```

### 2. Component Architecture Pattern

**Atomic Design Principles**:

```javascript
// 1. Atoms (Basic UI elements)
(Button, Input, Card, Badge);

// 2. Molecules (Component combinations)
(FormField(Input + Label), CardHeader(Title + Badge));

// 3. Organisms (Complex components)
Navbar(Logo + Navigation + MobileMenu);
ProjectCard(Image + Title + Description + Button);

// 4. Templates (Page layouts)
ProjectLayout(Header + ProjectGrid + Footer);
AdminLayout(Sidebar + MainContent + Header);

// 5. Pages (Complete views)
Homepage(Hero + Projects + Blog + Footer);
ProjectPage(ProjectLayout + ProjectContent);
```

### 3. Data Architecture Pattern

**Repository Pattern Implementation**:

```javascript
// lib/blogs.js - Blog data repository
export function getBlogs() {
  // Data access logic
  return blogs;
}

export function getBlog(slug) {
  // Single record retrieval
  return blog;
}

// lib/projects.js - Project data repository
export function getProjects() {
  // File-based data loading
  return projects;
}

export function getProject(slug) {
  // Single project lookup
  return project;
}

// lib/db.js - Database connection management
export default function getDb() {
  // Connection singleton pattern
  return db;
}
```

## Data Flow Architecture

### Request-Response Cycle

#### 1. Public Page Request

```
Browser Request (/projects)
       ↓
Next.js Server
       ↓
Server Component (app/projects/page.jsx)
       ↓
Data Fetching (getBlogs, getProjects)
       ↓
Database Query (SQLite)
       ↓
HTML Generation (Server-Side Rendering)
       ↓
Browser Rendering (Hydration)
```

#### 2. Form Submission Flow

```
Form Submission (Contact Form)
       ↓
Server Action (lib/actions.js)
       ↓
Input Validation
       ↓
Database Insert (SQLite)
       ↓
Cache Revalidation (revalidatePath)
       ↓
Response (Success/Error Message)
```

#### 3. Admin Authentication Flow

```
Admin Login Request (/admin/login)
       ↓
Server Action (authenticate)
       ↓
Password Verification (bcrypt)
       ↓
Session Creation (iron-session)
       ↓
Cookie Setting (httpOnly, secure)
       ↓
Redirect (Dashboard)
```

### State Management Architecture

#### 1. Server State (Next.js)

- **Server Components**: Data fetched at build time/request time
- **Server Actions**: Form handling and mutations
- **Route Handlers**: API endpoints for external integrations

#### 2. Client State (React)

```javascript
// Local component state
const [isOpen, setIsOpen] = useState(false); // UI state
const [formData, setFormData] = useState({}); // Form state
const [loading, setLoading] = useState(false); // Loading state

// Shared state (future enhancement)
const { user, login, logout } = useAuth(); // Authentication state
const { theme, toggleTheme } = useTheme(); // Theme state
```

#### 3. URL State (Next.js Router)

- **Dynamic Routes**: `/projects/[slug]`, `/blogs/[slug]`
- **Search Params**: `/contact?type=donation`
- **Navigation State**: Browser history and back/forward

## Security Architecture

### Authentication Architecture

**Multi-Layer Security**:

```javascript
// 1. Route Protection (Middleware)
export async function middleware(request) {
  if (pathname.startsWith('/admin')) {
    // Check session cookie
    // Redirect to login if not authenticated
  }
}

// 2. Component-Level Protection
export default function AdminPage() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }
  // Render admin content
}

// 3. API Protection
export async function POST(request) {
  const session = await getSession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Handle authenticated request
}
```

**Session Security**:

- **Cookie-Based Sessions**: HTTP-only, secure cookies
- **JWT Tokens**: Stateless authentication option
- **Password Hashing**: bcrypt with salt rounds
- **Account Lockout**: Brute force protection

### Data Validation Architecture

**Defense in Depth**:

```javascript
// 1. Client-Side Validation (UX)
if (!formData.email) {
  return { error: 'Email required' }
}

// 2. Server-Side Validation (Security)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(formData.email)) {
  return { error: 'Invalid email format' }
}

// 3. Database Constraints (Data Integrity)
CREATE TABLE users (
  email TEXT CHECK (email LIKE '%@%.%')
)
```

## Performance Architecture

### Rendering Strategy

**Hybrid Rendering Approach**:

- **Static Generation**: Marketing pages, blog posts (ISR)
- **Server-Side Rendering**: Dynamic pages, authenticated content
- **Client-Side Rendering**: Interactive components, real-time updates

**Performance Optimizations**:

```javascript
// Image optimization
<Image
  src="/projects/hero.jpg"
  alt="Project Hero"
  width={1200}
  height={600}
  priority={true} // Above-the-fold optimization
  placeholder="blur" // Loading experience
/>;

// Code splitting
const AdminPanel = lazy(() => import("./AdminPanel"));
const ChartComponent = lazy(() => import("./Chart"));
```

### Caching Architecture

**Multi-Layer Caching Strategy**:

```javascript
// 1. Next.js Built-in Caching
export async function getStaticProps() {
  const projects = await getProjects();
  return {
    props: { projects },
    revalidate: 3600, // ISR every hour
  };
}

// 2. Database Query Caching
const queryCache = new Map();
function cachedQuery(key, queryFn) {
  if (queryCache.has(key)) {
    return queryCache.get(key);
  }
  const result = queryFn();
  queryCache.set(key, result);
  return result;
}

// 3. Browser Caching
// Cache-Control headers for static assets
// Service Worker for offline capability (future)
```

## Database Architecture

### Schema Design

**Normalized Database Design**:

```sql
-- Core entities
admins (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT,
  created_at DATETIME
)

blog_posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  slug TEXT UNIQUE,
  content TEXT,
  author_id INTEGER REFERENCES admins(id),
  created_at DATETIME,
  updated_at DATETIME
)

messages (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  message TEXT,
  type TEXT,
  status TEXT DEFAULT 'unread',
  created_at DATETIME
)
```

### Data Access Layer

**Repository Pattern**:

```javascript
// lib/db.js - Connection management
import Database from "better-sqlite3";

let db = null;

export default function getDb() {
  if (!db) {
    db = new Database("data.sqlite");
    // Enable WAL mode for better concurrency
    db.pragma("journal_mode = WAL");
  }
  return db;
}

// lib/actions.js - Business logic layer
export async function saveMessage(formData) {
  const db = await getDb();
  const stmt = db.prepare(`
    INSERT INTO messages (firstName, lastName, email, phone, message, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(/* parameters */);
}
```

## API Architecture

### API Route Structure

**RESTful API Design**:

```
app/api/
├── session/           # Authentication endpoints
│   └── route.js      # POST (login/logout)
├── upload/           # File upload endpoints
│   └── route.js      # POST (file upload)
└── admin/            # Admin API endpoints
    ├── blogs/
    │   └── route.js  # CRUD operations
    └── messages/
        └── route.js  # Message management
```

**API Security**:

```javascript
// app/api/session/route.js
export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Handle authenticated request
}
```

## Component Architecture

### Layout Composition

**Nested Layout Pattern**:

```jsx
// app/layout.jsx (Root Layout)
<html lang="fr">
  <body>
    <ThemeProvider>
      <AuthProvider>
        {children}  {/* Page content */}
      </AuthProvider>
    </ThemeProvider>
  </body>
</html>

// app/projects/layout.jsx (Section Layout)
<ProjectsProvider>
  <Navbar />
  <main>{children}</main>  {/* Project pages */}
  <Footer />
</ProjectsProvider>

// app/admin/layout.jsx (Admin Layout)
<AdminAuthCheck>
  <AdminSidebar />
  <main>{children}</main>  {/* Admin pages */}
</AdminAuthCheck>
```

### Component Communication

**Props Drilling vs Context**:

```jsx
// Current: Props drilling (simple but verbose)
<Navbar user={user} onLogout={handleLogout} />

// Future: Context API (clean but requires setup)
<AuthContext.Provider value={{ user, login, logout }}>
  <Navbar />
</AuthContext.Provider>
```

## Error Handling Architecture

### Error Boundary Strategy

**React Error Boundaries**:

```jsx
// components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

**Global Error Handling**:

```javascript
// app/error.jsx (Next.js 13+ error page)
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Deployment Architecture

### Production Deployment

**Deployment Pipeline**:

```bash
# Build process
npm run build          # Create production build
npm run start         # Start production server

# Environment setup
NODE_ENV=production
SESSION_SECRET=prod-secret
DATABASE_URL=prod-database-url
```

**Hosting Options**:

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Static site hosting with serverless functions
- **Railway/Render**: Full-stack application hosting
- **AWS/GCP**: Enterprise-grade infrastructure

### Scalability Architecture

**Horizontal Scaling Preparation**:

- **Stateless Design**: No server-side session storage
- **Database Optimization**: Query optimization and indexing
- **CDN Integration**: Global asset delivery
- **Load Balancing**: Multiple instance deployment ready

## Integration Architecture

### Third-Party Integrations

**Current Integration Points**:

- **Email Service**: SMTP configuration ready
- **Analytics**: Google Analytics integration point
- **Payment Processing**: Stripe/PayPal integration ready
- **CDN**: Static asset optimization

**Future Integration Architecture**:

```javascript
// Service integration pattern
class EmailService {
  async sendWelcomeEmail(user) {
    // Email sending logic
  }
}

class PaymentService {
  async processDonation(amount, donor) {
    // Payment processing logic
  }
}

class AnalyticsService {
  async trackEvent(event, data) {
    // Analytics tracking logic
  }
}
```

## Monitoring Architecture

### Application Monitoring

**Monitoring Layers**:

1. **Error Monitoring**: Client and server error tracking
2. **Performance Monitoring**: Core Web Vitals and custom metrics
3. **User Monitoring**: Behavior analytics and conversion tracking
4. **Infrastructure Monitoring**: Server health and resource usage

**Monitoring Tools Integration**:

- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: User behavior and conversion tracking
- **DataDog/New Relic**: Infrastructure and application monitoring

## Future Architecture Enhancements

### Microservices Evolution

**Potential Service Split**:

```
Monolith (Current)
├── Web Application (Next.js)
├── Database (SQLite)
└── File Storage (Local)

Microservices (Future)
├── Web Frontend (Next.js)
├── Content API (Blog/Project management)
├── User API (Authentication/Authorization)
├── Donation API (Payment processing)
├── Notification Service (Email/SMS)
├── Analytics Service (Data collection)
└── Database Layer (PostgreSQL)
```

### Event-Driven Architecture

**Event Bus Pattern**:

```javascript
// Domain events
class DomainEvents {
  static events = new EventEmitter();

  static emit(event, data) {
    this.events.emit(event, data);
  }

  static on(event, handler) {
    this.events.on(event, handler);
  }
}

// Usage
DomainEvents.emit("donation.created", { amount: 100, donor: "John" });
DomainEvents.on("donation.created", handleDonationNotification);
```

## Architecture Quality Metrics

### Maintainability Metrics

**Code Quality Indicators**:

- **Cyclomatic Complexity**: Function complexity measurement
- **Technical Debt**: Code quality and maintainability score
- **Test Coverage**: Percentage of code covered by tests
- **Documentation Coverage**: Percentage of code with documentation

**Architecture Metrics**:

- **Component Coupling**: Inter-component dependencies
- **Code Duplication**: Repeated code patterns
- **Architecture Violations**: Deviation from design principles

### Performance Metrics

**Application Performance**:

- **First Contentful Paint**: Time to first visual content
- **Largest Contentful Paint**: Loading performance indicator
- **Cumulative Layout Shift**: Visual stability measurement
- **First Input Delay**: Interactivity measurement

**Infrastructure Performance**:

- **Response Time**: API and page response times
- **Throughput**: Requests per second capacity
- **Error Rate**: Application error percentage
- **Uptime**: Service availability percentage

## Architecture Decision Records

### Key Architecture Decisions

#### 1. Next.js App Router Adoption

**Decision**: Migrate from Pages Router to App Router
**Rationale**: Better performance, server components, improved DX
**Impact**: Simplified data fetching, better SEO, reduced bundle size

#### 2. SQLite Database Choice

**Decision**: Use SQLite for MVP instead of PostgreSQL
**Rationale**: Simplicity, no external dependencies, easy backup
**Trade-offs**: Limited scalability, no concurrent write optimization

#### 3. Server Actions Pattern

**Decision**: Use Server Actions for form handling
**Rationale**: Type-safe, progressive enhancement, no API routes needed
**Benefits**: Better UX, automatic error handling, built-in validation

#### 4. Component Library Selection

**Decision**: Radix UI + Tailwind CSS over Material-UI
**Rationale**: Better accessibility, smaller bundle, customization flexibility
**Benefits**: WCAG compliance, performance, design system consistency

## Architecture Risks and Mitigations

### Current Architecture Risks

**Scalability Risks**:

- **Database**: SQLite may not handle high concurrent load
- **File Storage**: Local file system limits scalability
- **Session Storage**: In-memory sessions don't scale horizontally

**Security Risks**:

- **Input Validation**: Insufficient validation layers
- **Authentication**: Development security settings in production
- **Data Protection**: No encryption at rest

**Performance Risks**:

- **Bundle Size**: Large component library may impact loading
- **Image Optimization**: No CDN for global performance
- **Caching**: Limited caching strategy implemented

### Mitigation Strategies

**Scalability Mitigations**:

1. **Database Migration**: PostgreSQL for better concurrency
2. **CDN Integration**: CloudFlare for global asset delivery
3. **External Storage**: AWS S3 for file storage
4. **Stateless Sessions**: JWT-based session management

**Security Mitigations**:

1. **Input Validation**: Multi-layer validation implementation
2. **Security Headers**: Comprehensive security header setup
3. **Rate Limiting**: API abuse prevention
4. **Audit Logging**: Security event tracking

**Performance Mitigations**:

1. **Code Splitting**: Dynamic imports for heavy components
2. **Image Optimization**: Next.js Image component everywhere
3. **Caching Strategy**: Multi-layer caching implementation
4. **Bundle Analysis**: Regular bundle size monitoring

## Conclusion

Fondation Assalam's architecture provides a **solid, maintainable foundation** for a charity platform with clear separation of concerns and modern development practices. The Next.js App Router architecture with SQLite backend offers excellent performance and developer experience while providing clear pathways for future scaling and enhancement.

**Architecture Strengths**:

- **Modern Framework**: Latest Next.js features and optimizations
- **Clean Architecture**: Clear separation of concerns
- **Performance Focus**: Server-side rendering and optimization
- **Maintainability**: Consistent patterns and organization

**Architecture Evolution Path**:

1. **Stabilize**: Fix security issues, add comprehensive testing
2. **Scale**: Database migration, CDN integration, monitoring
3. **Enhance**: Advanced features, microservices, global expansion
4. **Innovate**: AI integration, advanced analytics, mobile apps

The architecture successfully balances **simplicity for maintenance** with **scalability for growth**, making it well-suited for the foundation's mission and future expansion plans.
