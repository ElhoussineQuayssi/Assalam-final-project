# API Documentation - Fondation Assalam

## API Overview

Fondation Assalam implements API endpoints using **Next.js App Router** with a minimal API surface focused on specific functionality needs. The API architecture prioritizes security, performance, and integration capabilities for the charity platform.

## API Architecture

### API Route Structure

**Current API Endpoints**:

```
app/api/
├── session/           # Authentication management
│   └── route.js      # POST (login/logout/session management)
├── upload/           # File upload handling
│   └── route.js      # POST (file uploads)
└── admin/            # Administrative endpoints (planned)
    ├── blogs/
    │   └── route.js  # CRUD operations for blog management
    └── messages/
        └── route.js  # Message management operations
```

### API Design Principles

**RESTful Design**:

- **Resource-Based URLs**: `/api/{resource}/{id}`
- **HTTP Methods**: GET, POST, PUT, DELETE for CRUD operations
- **Status Codes**: Proper HTTP status code usage
- **Content Negotiation**: JSON request/response format

**Security-First Approach**:

- **Authentication Required**: Session-based or JWT authentication
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Request throttling (future implementation)
- **CORS Protection**: Cross-origin request handling

## Authentication API

### Session Management (`/api/session`)

**Purpose**: Handle user authentication and session management

#### POST `/api/session` - Login/Logout

```javascript
// Request payload
{
  "action": "login" | "logout",
  "email": "admin@example.com",     // For login
  "password": "user-password"       // For login
}

// Response format
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}

// Error response
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Implementation Details**:

```javascript
// app/api/session/route.js
import { NextResponse } from "next/server";
import {
  comparePasswords,
  createSession,
  getSession,
  clearSession,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const { action, email, password } = await request.json();

    if (action === "login") {
      // Authenticate user
      const user = await authenticateUser(email, password);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 },
        );
      }

      // Create session
      await createSession(user);
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
      });
    }

    if (action === "logout") {
      await clearSession();
      return NextResponse.json({ success: true, message: "Logged out" });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
```

**Security Features**:

- **Password Verification**: bcrypt password comparison
- **Session Creation**: Secure HTTP-only cookies
- **Error Handling**: Generic error messages (no information leakage)
- **Rate Limiting**: Brute force protection (future)

## File Upload API

### File Upload (`/api/upload`)

**Purpose**: Handle file uploads for images and documents

#### POST `/api/upload` - File Upload

```javascript
// Request format: FormData
// file: File object (image, document)
// type: 'image' | 'document'
// category: 'blog' | 'project' | 'general'

// Response format
{
  "success": true,
  "fileName": "1643723400-abc123.jpg",
  "filePath": "/uploads/1643723400-abc123.jpg",
  "fileSize": 2048576,
  "fileType": "image/jpeg"
}

// Error response
{
  "success": false,
  "message": "File type not allowed"
}
```

**Implementation Details**:

```javascript
// app/api/upload/route.js
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp"],
  document: ["application/pdf", "application/msword"],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    const category = formData.get("category");

    // Validation
    if (!file || !type || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Type validation
    if (!ALLOWED_TYPES[type]?.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "File type not allowed" },
        { status: 400 },
      );
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large" },
        { status: 400 },
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(file.name);
    const fileName = `${timestamp}-${randomId}${extension}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", category);
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileName,
      filePath: `/uploads/${category}/${fileName}`,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
}
```

**Security Features**:

- **File Type Validation**: Whitelist-based type checking
- **Size Limits**: Maximum file size enforcement
- **Path Sanitization**: Secure filename generation
- **Directory Isolation**: Category-based file organization

## Administrative APIs

### Blog Management API (`/api/admin/blogs`)

**Purpose**: CRUD operations for blog content management

#### GET `/api/admin/blogs` - List Blogs

```javascript
// Query parameters
// ?page=1&limit=10&category=education&status=published

// Response format
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Blog Post Title",
      "slug": "blog-post-slug",
      "excerpt": "Post excerpt...",
      "category": "education",
      "status": "published",
      "views": 125,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST `/api/admin/blogs` - Create Blog

```javascript
// Request payload
{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "excerpt": "Post excerpt",
  "content": "Full post content",
  "category": "education",
  "status": "draft",
  "image": "/uploads/blog/image.jpg"
}

// Response format
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": 2,
    "title": "New Blog Post",
    "slug": "new-blog-post",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT `/api/admin/blogs/[id]` - Update Blog

```javascript
// Request payload (partial updates supported)
{
  "title": "Updated Blog Title",
  "status": "published"
}

// Response format
{
  "success": true,
  "message": "Blog post updated successfully"
}
```

#### DELETE `/api/admin/blogs/[id]` - Delete Blog

```javascript
// Response format
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

### Message Management API (`/api/admin/messages`)

**Purpose**: Handle contact form submissions and inquiries

#### GET `/api/admin/messages` - List Messages

```javascript
// Query parameters
// ?status=unread&page=1&limit=20&type=donation

// Response format
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "type": "donation",
      "status": "unread",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### PUT `/api/admin/messages/[id]` - Update Message Status

```javascript
// Request payload
{
  "status": "read" | "archived",
  "adminNotes": "Optional admin notes"
}

// Response format
{
  "success": true,
  "message": "Message updated successfully"
}
```

#### DELETE `/api/admin/messages/[id]` - Delete Message

```javascript
// Response format
{
  "success": true,
  "message": "Message deleted successfully"
}
```

## Server Actions (Alternative to API Routes)

### Form Processing Actions (`lib/actions.js`)

**Server Actions Pattern**:

```javascript
// Form submission without API routes
"use server";

export async function saveMessage(formData) {
  // Server-side processing
  const firstName = formData.get("firstName");
  const email = formData.get("email");

  // Validation and processing
  if (!firstName || !email) {
    return { success: false, message: "Required fields missing" };
  }

  // Database operations
  const db = await getDb();
  const result = db
    .prepare(
      `
    INSERT INTO messages (firstName, lastName, email, message, type)
    VALUES (?, ?, ?, ?, ?)
  `,
    )
    .run(firstName, lastName, email, message, type);

  // Cache revalidation
  revalidatePath("/admin/messages");

  return { success: true, message: "Message saved successfully" };
}
```

**Benefits of Server Actions**:

- **Type Safety**: End-to-end type checking
- **Progressive Enhancement**: Works without JavaScript
- **Automatic Revalidation**: Cache invalidation
- **Error Handling**: Built-in error boundaries

## External API Integrations

### Planned Integrations

#### Email Service Integration

```javascript
// Email service integration (future)
const emailService = {
  async sendWelcomeEmail(email, name) {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: "noreply@assalam.org" },
        subject: "Welcome to Fondation Assalam",
        content: [{ type: "text/plain", value: `Hello ${name}...` }],
      }),
    });

    return response.ok;
  },
};
```

#### Payment Processing Integration

```javascript
// Payment integration (future)
const paymentService = {
  async processDonation(amount, donorInfo, paymentMethod) {
    const response = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        amount: amount * 100, // Convert to cents
        currency: "mad",
        "payment_method_types[]": paymentMethod,
        metadata: { donorEmail: donorInfo.email },
      }),
    });

    return response.json();
  },
};
```

#### Analytics Integration

```javascript
// Analytics tracking (future)
const analyticsService = {
  async trackEvent(eventName, properties) {
    await fetch("https://api.mixpanel.com/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        properties: {
          token: process.env.MIXPANEL_TOKEN,
          ...properties,
        },
      }),
    });
  },
};
```

## API Security

### Authentication Middleware

**API Route Protection**:

```javascript
// Middleware for all API routes
export async function withAuth(handler) {
  return async (request) => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return handler(request, session);
  };
}

// Usage in API routes
export const POST = withAuth(async (request, session) => {
  // Authenticated handler logic
});
```

### Input Validation

**Comprehensive Validation**:

```javascript
// Validation middleware
export function validateInput(schema) {
  return async (request) => {
    try {
      const body = await request.json();
      const validatedData = schema.parse(body);
      return { success: true, data: validatedData };
    } catch (error) {
      return {
        success: false,
        message: "Invalid input",
        errors: error.errors,
      };
    }
  };
}

// Usage with Zod schemas
const blogSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
  category: z.enum(["education", "health", "general"]),
});

export const POST = async (request) => {
  const validation = await validateInput(blogSchema)(request);

  if (!validation.success) {
    return NextResponse.json(validation, { status: 400 });
  }

  // Process validated data
};
```

### Rate Limiting

**Rate Limiting Implementation** (Future):

```javascript
// Rate limiting middleware
const rateLimit = new Map();

export function rateLimitMiddleware(limit = 100, window = 3600000) {
  return async (request) => {
    const clientIP = request.ip || request.headers.get("x-forwarded-for");
    const key = `${clientIP}:${Math.floor(Date.now() / window)}`;
    const current = rateLimit.get(key) || 0;

    if (current >= limit) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }

    rateLimit.set(key, current + 1);
    return NextResponse.next();
  };
}
```

## Error Handling

### Standardized Error Responses

**Error Response Format**:

```javascript
// Consistent error structure
{
  "success": false,
  "message": "Human-readable error message",
  "code": "ERROR_CODE",           // Optional: specific error code
  "details": {                    // Optional: additional context
    "field": "email",
    "issue": "invalid_format"
  }
}

// HTTP status codes
200: Success
400: Bad Request (validation errors)
401: Unauthorized (authentication required)
403: Forbidden (insufficient permissions)
404: Not Found (resource doesn't exist)
429: Too Many Requests (rate limited)
500: Internal Server Error
```

### Error Logging

**Error Tracking** (Future Implementation):

```javascript
// Error logging service
export async function logError(error, context) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context: {
      url: context.url,
      method: context.method,
      userAgent: context.headers?.["user-agent"],
      userId: context.session?.user?.id,
    },
  };

  // Send to error tracking service (Sentry, etc.)
  await errorTrackingService.captureException(error, { extra: errorData });
}
```

## API Testing

### Testing Strategy

**API Test Structure**:

```javascript
// API endpoint testing
describe("/api/session", () => {
  describe("POST", () => {
    it("should authenticate valid credentials", async () => {
      const response = await request(app)
        .post("/api/session")
        .send({
          action: "login",
          email: "admin@test.com",
          password: "password",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app)
        .post("/api/session")
        .send({ action: "login", email: "admin@test.com", password: "wrong" });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
```

**Integration Testing**:

- **Database Integration**: Test with real database
- **File System Integration**: Test file upload functionality
- **External Service Integration**: Mock external APIs

## API Documentation

### OpenAPI Specification (Future)

**API Documentation Structure**:

```yaml
openapi: 3.0.3
info:
  title: Fondation Assalam API
  version: 1.0.0
  description: API for Fondation Assalam charity platform

servers:
  - url: https://api.assalam.org
    description: Production server
  - url: http://localhost:3000
    description: Development server

paths:
  /api/session:
    post:
      summary: Manage authentication sessions
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                action:
                  type: string
                  enum: [login, logout]
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
      responses:
        "200":
          description: Success
        "401":
          description: Authentication failed
```

## Performance Considerations

### API Performance Optimization

**Response Time Optimization**:

- **Database Query Optimization**: Prepared statements and indexes
- **Response Compression**: Gzip compression for JSON responses
- **Connection Pooling**: Efficient database connections
- **Caching Headers**: Appropriate cache control headers

**Monitoring**:

- **Response Time Tracking**: Average response time monitoring
- **Error Rate Monitoring**: API error percentage tracking
- **Throughput Monitoring**: Requests per second capacity

## Future API Enhancements

### Planned API Features

#### 1. Donation API

```javascript
// Donation processing
POST /api/donations
{
  "amount": 100,
  "currency": "MAD",
  "donorInfo": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "paymentMethod": "card"
}
```

#### 2. Volunteer API

```javascript
// Volunteer management
POST /api/volunteers/register
{
  "personalInfo": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+212-XXX-XXXXXX"
  },
  "skills": ["teaching", "translation"],
  "availability": "weekends"
}
```

#### 3. Newsletter API

```javascript
// Newsletter subscription
POST /api/newsletter/subscribe
{
  "email": "subscriber@example.com",
  "preferences": {
    "frequency": "weekly",
    "categories": ["education", "health"]
  }
}
```

### GraphQL API (Future Consideration)

**GraphQL Implementation**:

```graphql
type Query {
  blogPosts(category: String, limit: Int): [BlogPost]
  blogPost(slug: String!): BlogPost
  projects: [Project]
  project(slug: String!): Project
}

type Mutation {
  createBlogPost(input: BlogPostInput!): BlogPost
  updateBlogPost(id: ID!, input: BlogPostInput!): BlogPost
  deleteBlogPost(id: ID!): Boolean
}
```

## API Governance

### API Versioning

**Versioning Strategy**:

- **URL Versioning**: `/api/v1/session`, `/api/v2/session`
- **Header Versioning**: `Accept: application/vnd.assalam.v1+json`
- **Semantic Versioning**: Follow semantic versioning principles

### API Deprecation

**Deprecation Process**:

1. **Announcement**: 3 months notice for breaking changes
2. **Warning Headers**: `Sunset: Wed, 01 Jan 2025 00:00:00 GMT`
3. **Migration Guide**: Documentation for upgrading
4. **Removal**: Clean removal after deprecation period

## Conclusion

Fondation Assalam's API architecture provides a **secure, scalable foundation** for the charity platform's integration needs. The current minimal API surface focuses on core functionality while providing clear patterns for future expansion.

**API Strengths**:

- **Security First**: Authentication and validation built-in
- **Performance Optimized**: Efficient request handling
- **Developer Friendly**: Clear patterns and error handling
- **Future Ready**: Extensible design for new features

**API Roadmap**:

1. **Stabilize**: Complete security hardening and testing
2. **Expand**: Add donation, volunteer, and newsletter APIs
3. **Integrate**: Connect external services and platforms
4. **Document**: Comprehensive OpenAPI documentation
5. **Monitor**: Performance and error tracking implementation

The API architecture supports the foundation's mission by providing **reliable, secure endpoints** for donor engagement, volunteer coordination, and content management while maintaining the flexibility for future growth and third-party integrations.
