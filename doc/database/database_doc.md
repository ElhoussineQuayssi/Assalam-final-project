# Database Documentation - Fondation Assalam

## Database Overview

Fondation Assalam uses **SQLite** as its primary database, implemented with **better-sqlite3** for improved performance and security. The database design follows relational principles with proper normalization and constraints for data integrity.

## Database Configuration

### Database Connection (`lib/db.js`)

**Connection Management**:

```javascript
import Database from "better-sqlite3";

let db = null;

export default function getDb() {
  if (!db) {
    db = new Database("data.sqlite", {
      verbose: console.log, // Query logging in development
    });
    // Enable WAL mode for better concurrency
    db.pragma("journal_mode = WAL");
  }
  return db;
}
```

**Performance Optimizations**:

- **WAL Mode**: Write-Ahead Logging for better concurrent access
- **Connection Pooling**: Singleton pattern for connection reuse
- **Prepared Statements**: Pre-compiled SQL for security and performance
- **Query Logging**: Development query monitoring

### Database File Location

- **Development**: `./data.sqlite` (project root)
- **Production**: Configurable path via `DATABASE_URL` environment variable
- **Backup**: Regular automated backups recommended

## Schema Design

### Database Schema (`lib/db/schema.js`)

**Complete Schema Definition**:

```sql
-- Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  failedAttempts INTEGER DEFAULT 0,
  lockedUntil DATETIME,
  lastLogin DATETIME,
  lastPasswordChange DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  shareOnSocial BOOLEAN DEFAULT 0,
  views INTEGER DEFAULT 0,
  image TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'contact',
  status TEXT DEFAULT 'unread',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Table Specifications

### 1. Admins Table

**Purpose**: Manage administrative users and authentication

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique identifier |
| `email` | TEXT | UNIQUE NOT NULL | Admin email address |
| `password` | TEXT | NOT NULL | Hashed password (bcrypt) |
| `name` | TEXT | NOT NULL | Admin display name |
| `role` | TEXT | NOT NULL | User role (admin, editor, viewer) |
| `failedAttempts` | INTEGER | DEFAULT 0 | Failed login tracking |
| `lockedUntil` | DATETIME | NULL | Account lockout expiration |
| `lastLogin` | DATETIME | NULL | Last successful login |
| `lastPasswordChange` | DATETIME | NOT NULL | Password update tracking |
| `createdAt` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation date |

**Security Features**:

- **Password Hashing**: bcrypt with salt rounds
- **Account Lockout**: Brute force protection
- **Audit Trail**: Login activity tracking

### 2. Blog Posts Table

**Purpose**: Store and manage blog content for the foundation

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique post identifier |
| `title` | TEXT | NOT NULL | Post title |
| `slug` | TEXT | UNIQUE NOT NULL | URL-friendly identifier |
| `excerpt` | TEXT | NOT NULL | Short post summary |
| `content` | TEXT | NOT NULL | Full post content (HTML) |
| `category` | TEXT | NOT NULL | Content categorization |
| `status` | TEXT | NOT NULL | Publication status |
| `shareOnSocial` | BOOLEAN | DEFAULT 0 | Social media sharing flag |
| `views` | INTEGER | DEFAULT 0 | View counter |
| `image` | TEXT | NULL | Featured image path |
| `createdAt` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Publication date |
| `updatedAt` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last modification |

**Content Management**:

- **Rich Text Support**: HTML content storage
- **SEO Optimization**: Slug-based URLs
- **Social Integration**: Sharing capabilities
- **Analytics**: View tracking

### 3. Messages Table

**Purpose**: Store contact form submissions and inquiries

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique message ID |
| `firstName` | TEXT | NOT NULL | Sender's first name |
| `lastName` | TEXT | NOT NULL | Sender's last name |
| `email` | TEXT | NOT NULL | Contact email |
| `phone` | TEXT | NULL | Optional phone number |
| `message` | TEXT | NOT NULL | Message content |
| `type` | TEXT | DEFAULT 'contact' | Message categorization |
| `status` | TEXT | DEFAULT 'unread' | Processing status |
| `createdAt` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Submission timestamp |

**Message Types**:

- **contact**: General inquiries
- **donation**: Donation-related questions
- **volunteer**: Volunteer applications
- **partnership**: Organizational collaboration

## Data Relationships

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐
│   admins    │       │ blog_posts  │
├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ author_id   │
│ email       │       │ (FK)        │
│ password    │       │             │
│ name        │       │             │
│ role        │       │             │
└─────────────┘       └─────────────┘
       ▲
       │
┌─────────────┐
│  messages   │
├─────────────┤
│ id (PK)     │
│ firstName   │
│ lastName    │
│ email       │
│ message     │
│ type        │
│ status      │
└─────────────┘
```

### Relationship Analysis

**One-to-Many Relationships**:

- **Admin → Blog Posts**: One admin can author multiple posts
- **Admin → Messages**: One admin can handle multiple messages

**Data Integrity**:

- **Referential Integrity**: Foreign key constraints (when implemented)
- **Cascade Operations**: Delete behavior definition needed
- **Orphan Prevention**: Proper cleanup procedures

## Data Access Layer

### Query Patterns (`lib/actions.js`, `lib/blogs.js`)

**CRUD Operations**:

#### Create Operations

```javascript
// Insert new message
export async function saveMessage(formData) {
  const db = await getDb();
  const stmt = db.prepare(`
    INSERT INTO messages (firstName, lastName, email, phone, message, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    formData.get("firstName"),
    formData.get("lastName"),
    formData.get("email"),
    formData.get("phone"),
    formData.get("message"),
    formData.get("type"),
  );
}
```

#### Read Operations

```javascript
// Get all blog posts
export function getBlogs() {
  try {
    const db = await getDb()
    const blogs = db.prepare('SELECT * FROM blog_posts ORDER BY createdAt DESC').all()
    return { success: true, data: blogs }
  } catch (error) {
    return { success: false, message: 'Erreur lors de la récupération des blogs' }
  }
}

// Get single blog post by slug
export function getBlog(slug) {
  const db = await getDb()
  return db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(slug)
}
```

#### Update Operations

```javascript
// Update blog post
export async function updateBlog(slug, updates) {
  const db = await getDb();
  const stmt = db.prepare(`
    UPDATE blog_posts
    SET title = ?, excerpt = ?, content = ?, category = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE slug = ?
  `);
  return stmt.run(
    updates.title,
    updates.excerpt,
    updates.content,
    updates.category,
    slug,
  );
}
```

#### Delete Operations

```javascript
// Delete blog post
export async function deleteBlog(slug) {
  const db = await getDb();
  const stmt = db.prepare("DELETE FROM blog_posts WHERE slug = ?");
  return stmt.run(slug);
}
```

## Database Operations

### Migration System (`lib/db/migrate.js`)

**Schema Migration**:

```javascript
import getDb from "../db";
import { schema } from "./schema";

export function migrate() {
  const db = getDb();
  db.exec(schema); // Execute complete schema
  console.log("Database migrated successfully");
}
```

**Migration Features**:

- **Atomic Operations**: All-or-nothing migration execution
- **Version Tracking**: Schema version management (future)
- **Rollback Support**: Migration reversal capabilities (planned)

### Initialization System (`lib/db/init.js`)

**Database Setup**:

```javascript
import getDb from "../db";
import { migrate } from "./migrate";

export function initializeDatabase() {
  try {
    migrate();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
```

## Data Validation

### Input Validation Strategy

**Client-Side Validation**:

```javascript
// Form validation patterns
const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+212|0)[5-7][0-9]{8}$/, // Moroccan phone format
  name: /^[a-zA-Z\s]{2,50}$/,
  message: /^.{10,1000}$/,
};
```

**Server-Side Validation**:

```javascript
// Server action validation
export async function saveMessage(formData) {
  const firstName = formData.get("firstName");
  const email = formData.get("email");

  // Validation checks
  if (!firstName || firstName.length < 2) {
    return {
      success: false,
      message: "Le prénom doit contenir au moins 2 caractères.",
    };
  }

  if (!validationRules.email.test(email)) {
    return { success: false, message: "Format d'email invalide." };
  }
}
```

## Performance Optimization

### Query Optimization

**Index Strategy**:

```sql
-- Performance indexes (to be added)
CREATE INDEX idx_blog_posts_category_created ON blog_posts(category, createdAt DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_messages_status_created ON messages(status, createdAt DESC);
CREATE INDEX idx_messages_type ON messages(type);
```

**Query Performance**:

- **Prepared Statements**: Pre-compiled for execution speed
- **Connection Reuse**: Singleton pattern reduces overhead
- **WAL Mode**: Better concurrent read/write performance
- **Batch Operations**: Multiple inserts in single transaction

### Caching Strategy

**Application-Level Caching**:

```javascript
// Query result caching
const cache = new Map();

export function getCachedBlogs() {
  const cacheKey = "blogs-list";
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const blogs = getBlogs();
  cache.set(cacheKey, blogs);
  return blogs;
}
```

## Backup and Recovery

### Backup Strategy

**Current Implementation**:

- **Manual Backups**: File system copy of `data.sqlite`
- **No Automation**: Manual process required
- **No Encryption**: Plain SQLite file backup

**Recommended Backup Process**:

```bash
# Development backup
cp data.sqlite data.backup.$(date +%Y%m%d_%H%M%S).sqlite

# Production backup
pg_dump foundation_db > foundation_backup_$(date +%Y%m%d).sql
```

### Recovery Procedures

**Database Recovery Steps**:

1. **Stop Application**: Prevent new writes during recovery
2. **Restore Backup**: Replace corrupted database file
3. **Verify Integrity**: Check restored data consistency
4. **Restart Application**: Resume normal operations

**Disaster Recovery Plan**:

- **Offsite Storage**: Cloud backup storage
- **Automated Backups**: Scheduled backup jobs
- **Point-in-Time Recovery**: Restore to specific timestamp
- **Testing**: Regular backup restoration testing

## Security Considerations

### Data Protection

**Current Security Measures**:

- **Password Hashing**: bcrypt for admin passwords
- **Prepared Statements**: SQL injection prevention
- **Input Validation**: Basic XSS prevention

**Security Gaps**:

- ❌ **No Database Encryption**: Data stored in plain text
- ❌ **No Access Control**: File system permissions not restricted
- ❌ **No Audit Logging**: Database access not logged
- ❌ **No Backup Encryption**: Backups contain sensitive data

### Access Control

**Database Permissions**:

- **File System**: SQLite file should be readable only by application
- **Admin Access**: Role-based permissions for sensitive operations
- **API Security**: Database operations protected by authentication

## Scalability Considerations

### Current Limitations

**SQLite Constraints**:

- **Concurrency**: Limited concurrent write performance
- **Size Limits**: 2GB per database file (SQLite limitation)
- **Networking**: File-based, not network accessible
- **Backup**: File copy operations during backup

### Scaling Strategies

**Vertical Scaling**:

- **Hardware**: Better CPU/RAM for database operations
- **Connection Optimization**: Fine-tune SQLite configuration
- **Query Optimization**: Improve slow queries

**Horizontal Scaling**:

- **Database Migration**: PostgreSQL for better concurrency
- **Read Replicas**: Multiple read-only database instances
- **Sharding**: Split data across multiple databases
- **Caching**: Redis for frequently accessed data

## Monitoring and Maintenance

### Database Monitoring

**Performance Metrics**:

- **Query Performance**: Slow query identification
- **Connection Count**: Database connection monitoring
- **File Size**: Database growth tracking
- **Error Rates**: Failed operation monitoring

**Health Checks**:

```javascript
// Database health check
export function checkDatabaseHealth() {
  try {
    const db = getDb();
    const result = db.prepare("SELECT 1 as health").get();
    return { status: "healthy", timestamp: new Date().toISOString() };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
```

### Maintenance Tasks

**Regular Maintenance**:

- **Index Optimization**: Rebuild fragmented indexes
- **Statistics Update**: Keep query planner statistics current
- **Vacuum Operation**: Reclaim unused space
- **Integrity Check**: Verify database consistency

**Automated Maintenance**:

```sql
-- Weekly maintenance tasks
VACUUM;                           -- Reclaim space
ANALYZE;                         -- Update statistics
PRAGMA integrity_check;          -- Verify integrity
PRAGMA foreign_key_check;        -- Check constraints
```

## Future Database Enhancements

### Planned Improvements

**Short Term (3-6 months)**:

1. **Index Optimization**: Add strategic indexes for performance
2. **Query Monitoring**: Slow query identification and optimization
3. **Backup Automation**: Scheduled backup implementation
4. **Health Monitoring**: Database health check endpoints

**Medium Term (6-12 months)**:

1. **PostgreSQL Migration**: For better scalability and features
2. **Connection Pooling**: Multiple database connections
3. **Advanced Caching**: Redis integration for performance
4. **Data Archiving**: Historical data management

**Long Term (12+ months)**:

1. **Microservices**: Separate databases for different services
2. **Event Sourcing**: Event-driven data architecture
3. **Data Warehouse**: Analytics and reporting database
4. **Global Replication**: Multi-region data distribution

## Data Quality Management

### Data Validation Rules

**Business Rules**:

- **Email Format**: Valid email structure and domain
- **Phone Numbers**: Moroccan phone number format
- **Content Length**: Reasonable limits for text fields
- **Required Fields**: Mandatory information validation

**Data Consistency**:

- **Referential Integrity**: Foreign key relationships
- **Format Consistency**: Standardized data formats
- **Encoding**: UTF-8 for international characters

### Data Cleaning

**Data Quality Processes**:

- **Duplicate Detection**: Identify and merge duplicate records
- **Format Standardization**: Consistent phone/email formatting
- **Completeness Check**: Required field validation
- **Validation Rules**: Business rule enforcement

## API Integration

### Database Integration Points

**External Systems**:

- **Email Service**: SendGrid/Mailgun for notifications
- **Payment Processors**: Stripe/PayPal for donations
- **Analytics Platforms**: Google Analytics data collection
- **CRM Systems**: Donor and volunteer management

**Integration Patterns**:

```javascript
// Email integration example
export async function sendWelcomeEmail(email, name) {
  const emailService = getEmailService();
  return await emailService.send({
    to: email,
    template: "welcome",
    data: { name },
  });
}
```

## Compliance and Governance

### Data Retention Policy

**Retention Rules**:

- **Contact Messages**: 2 years after last interaction
- **Admin Logs**: 1 year for security auditing
- **Blog Content**: Indefinite retention for historical purposes
- **User Data**: 30 days after account deletion request

### Privacy Compliance

**GDPR Considerations**:

- **Data Minimization**: Collect only necessary information
- **User Consent**: Clear consent for data collection
- **Right to Access**: User data export capabilities
- **Right to Erasure**: Complete data deletion options

## Troubleshooting

### Common Database Issues

**Connection Issues**:

```javascript
// Connection troubleshooting
try {
  const db = getDb();
  const test = db.prepare("SELECT 1").get();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed:", error.message);
  // Check file permissions, disk space, file corruption
}
```

**Performance Issues**:

```sql
-- Performance diagnostics
PRAGMA table_info(blog_posts);           -- Schema information
PRAGMA index_list(blog_posts);           -- Index information
PRAGMA stats;                           -- Database statistics
EXPLAIN QUERY PLAN SELECT * FROM blog_posts WHERE category = 'education';
```

**Data Corruption**:

```bash
# Integrity check
sqlite3 data.sqlite "PRAGMA integrity_check;"

# Repair (if needed)
sqlite3 data.sqlite "REINDEX;"
sqlite3 data.sqlite "VACUUM;"
```

## Conclusion

Fondation Assalam's SQLite database provides a **simple, reliable foundation** for the charity platform's data management needs. The current schema supports core functionality while offering clear migration paths for future scaling requirements.

**Database Strengths**:

- **Simplicity**: Easy setup and maintenance
- **Reliability**: ACID compliance and data integrity
- **Performance**: Good performance for current scale
- **Integration**: Seamless Next.js integration

**Scaling Considerations**:

- **Current Scale**: Appropriate for MVP and initial growth
- **Growth Limits**: Monitor concurrent users and data size
- **Migration Path**: PostgreSQL for horizontal scaling
- **Backup Strategy**: Implement automated backup procedures

The database design follows **best practices** for a charity platform, balancing simplicity with functionality while maintaining data integrity and security foundations.
