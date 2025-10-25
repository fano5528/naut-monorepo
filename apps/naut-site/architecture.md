# Naut Architecture Documentation

This document provides a comprehensive overview of the Naut platform's architecture, design patterns, and technical implementation details.

## 🏛 System Overview

Naut is a multi-tenant SaaS platform that enables users to create and manage websites through a sophisticated content management system. The architecture is designed around **domain-based tenancy**, where each website is identified and configured based on its domain name.

### Core Principles

1. **Multi-tenancy**: Complete isolation between sites while sharing the same codebase
2. **Dynamic Configuration**: Everything configurable via database (styling, components, content)
3. **Component-based**: Modular, reusable components for maximum flexibility
4. **Performance First**: Static generation, optimized images, minimal JavaScript
5. **Type Safety**: Full TypeScript coverage with runtime validation

## 🌐 Multi-Tenant Architecture

### Domain-Based Tenancy Model

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   site1.com     │    │   site2.com     │    │   site3.com     │
│                 │    │                 │    │                 │
│ Custom Theme A  │    │ Custom Theme B  │    │ Custom Theme C  │
│ Component Set A │    │ Component Set B │    │ Component Set C │
│ Content A       │    │ Content B       │    │ Content C       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   Shared Codebase   │
                    │                     │
                    │ - Next.js App       │
                    │ - Component Library │
                    │ - Database Schema   │
                    │ - Styling System    │
                    └─────────────────────┘
```

### Tenant Isolation

- **Data Isolation**: All database queries filtered by `siteDomain`
- **Style Isolation**: CSS variables generated per domain
- **Component Isolation**: Different component sets per site
- **Content Isolation**: CMS content scoped to specific domains

## 🗄 Database Architecture

### Entity Relationship Overview

The database uses a sophisticated multi-tenant design with the following key relationships:

#### Site Management Layer
- **Site** (Primary tenant identifier)
  - Domain as primary key
  - User ownership
  - Styling configuration
  - Component selection

#### Content Management Layer
- **Page** → **Block** → **Content** (Static content)
- **cmsType** → **cmsEntry** → **cmsEntryContent** (Dynamic CMS content)

#### Component System Layer
- **Component** → **Field** (Component definitions)
- **Block** → **Content** (Instance data)

### Core Tables

#### Site Management
```sql
Site {
  domain: varchar(191) PRIMARY KEY
  userId: varchar(191) NOT NULL
  name: varchar(191) NOT NULL
  headerComponentName: varchar(191) NOT NULL
  footerComponentName: varchar(191) NOT NULL
  -- Styling configuration
  backgroundColor1: varchar(191)
  color1: varchar(191)
  sansFont: varchar(191)
  -- Analytics
  googleId: varchar(191)
  metaId: varchar(191)
}
```

#### Page System
```sql
Page {
  id: serial PRIMARY KEY
  siteDomain: varchar(191) NOT NULL  -- Foreign Key to Site
  route: varchar(191) NOT NULL
  title: varchar(191) NOT NULL
  description: text NOT NULL
  header: boolean DEFAULT true
  footer: boolean DEFAULT true
}

Block {
  id: serial PRIMARY KEY
  pageId: int NOT NULL              -- Foreign Key to Page
  componentName: varchar(191) NOT NULL  -- Foreign Key to Component
  order: int NOT NULL
}

Content {
  id: serial PRIMARY KEY
  blockId: int NOT NULL             -- Foreign Key to Block
  fieldId: int NOT NULL             -- Foreign Key to Field
  value: json NOT NULL
}
```

#### CMS System
```sql
cmsType {
  id: serial PRIMARY KEY
  uid: varchar(191) NOT NULL
  name: varchar(191) NOT NULL
  siteDomain: varchar(191) NOT NULL  -- Foreign Key to Site
  entryComponentName: varchar(191) NOT NULL
  categoryComponentName: varchar(191) NOT NULL
  homeComponentName: varchar(191) NOT NULL
}

cmsEntry {
  id: serial PRIMARY KEY
  cmsTypeId: int NOT NULL           -- Foreign Key to cmsType
  createdAt: timestamp NOT NULL
  publishedAt: timestamp
}

cmsEntryContent {
  id: serial PRIMARY KEY
  cmsEntryId: int NOT NULL          -- Foreign Key to cmsEntry
  cmsFieldId: int NOT NULL          -- Foreign Key to cmsField
  value: json NOT NULL
}
```

### Database Design Patterns

#### 1. Soft Multi-tenancy
```sql
-- All queries include domain filtering
SELECT * FROM pages 
WHERE siteDomain = 'example.com' 
AND route = '/about';
```

#### 2. JSON Content Storage
```sql
-- Flexible content structure
{
  "payload": "Content value",
  "type": "text",
  "metadata": {...}
}
```

#### 3. Component-Field Mapping
```sql
-- Dynamic component configuration
Component -> Field -> Content
"HeroBlock" -> "title" -> "Welcome to Site"
"HeroBlock" -> "subtitle" -> "Your journey starts here"
```

## 🎨 Component Architecture

### Component Hierarchy

```
App Layout (Root)
├── Dynamic Header Component
├── Page Content
│   ├── Block 1 (Component A)
│   ├── Block 2 (Component B)
│   └── Block N (Component N)
└── Dynamic Footer Component
```

### Component Categories

#### 1. Layout Components
- **Headers**: Navigation and branding (`TigerHeader`, `KoepkaHeader`, etc.)
- **Footers**: Site footer content (`ChecoFooter`, `SennaFooter`, etc.)

#### 2. Content Blocks
- **Text Blocks**: Rich content display (`GladwellBlock`, `HarariBlock`)
- **Media Blocks**: Image and video content
- **Interactive Blocks**: Forms, CTAs, interactive elements

#### 3. Hero Sections
- **Landing Heroes**: Eye-catching top sections (`HendrixHero`, `MercuryHero`)
- **Page Heroes**: Section headers and intros

#### 4. CMS Components
- **Article Display**: Individual content entry rendering (`MoscatiBlock`)
- **Category Listings**: Content organization and navigation (`AcutisBlock`)
- **Home Pages**: Dynamic homepage layouts (`JuanDiegoBlock`)

### Component Props Pattern

```typescript
interface ComponentProps {
  // Dynamic props from database
  [key: string]: any;
  
  // Standard props
  edit: boolean;           // Edit mode flag
  reference?: any;         // Reference for editing
  
  // Component-specific props
  // Defined in database field schema
}
```

### Component Registration

Components are registered in a central map:

```typescript
const components: ComponentType = {
  TigerHeader,
  HendrixHero,
  GladwellBlock,
  ChecoFooter,
  // ... all available components
};
```

## 🎭 Dynamic Styling System

### CSS Variable Generation

The styling system generates CSS variables at runtime based on site configuration:

```css
:root {
  --foreground: hsl(210, 40%, 8%);
  --background: hsl(0, 0%, 95%);
  --primary: hsl(357, 96%, 61%);
  --font-sans: var(--font-bergern);
  --color1: hsl(357, 96%, 61%);
  --color1Hover: hsl(357, 86%, 41%);
  /* ... more variables */
}
```

### Font Management

Dynamic font loading based on site requirements:

```typescript
// Only load fonts needed for current site
const fontsToLoad: FontName[] = [
  siteObject[0].sansFont,
  siteObject[0].font2,
  siteObject[0].font3
].filter(Boolean);

const fonts = getFonts(fontsToLoad);
```

### Tailwind Integration

Custom Tailwind classes use CSS variables:

```css
.bg-bg1 { background-color: var(--background); }
.text-title { color: var(--foreground); }
.text-color1 { color: var(--color1); }
```

## 🔄 Request Flow

### Standard Page Rendering Process

```
1. Browser requests /about
2. Next.js extracts domain from request
3. Query site configuration by domain
4. Query page data by route and domain
5. Query blocks for the page (ordered)
6. Query content for each block
7. Resolve component names to actual components
8. Render header (if enabled)
9. Render blocks in order with props
10. Render footer (if enabled)
11. Inject dynamic CSS variables
12. Return complete HTML
```

### CMS Entry Rendering Process

```
1. Browser requests /cms/entry/123
2. Extract entry ID from route
3. Query CMS entry by ID
4. Query CMS type configuration
5. Query entry content fields
6. Query entry categories
7. Resolve CMS component name
8. Render with dynamic content
9. Apply CMS-specific styling
10. Return rendered page
```

### Static Generation Flow

```typescript
// Generate static pages for all routes
export async function generateStaticParams() {
  const domain = process.env.DOMAIN;
  
  // Static pages
  const pages = await db.select({route: page.route})
    .from(page)
    .where(eq(page.siteDomain, domain));
  
  // CMS entries
  const cmsEntries = await db.select({id: cmsEntry.id})
    .from(cmsEntry)
    .innerJoin(cmsType, eq(cmsEntry.cmsTypeId, cmsType.id))
    .where(and(
      eq(cmsType.siteDomain, domain),
      isNotNull(cmsEntry.publishedAt)
    ));
  
  return [...pageParams, ...cmsParams];
}
```

## 📊 Performance Architecture

### Static Site Generation

- **Build-time Generation**: All pages pre-rendered at build time
- **Incremental Static Regeneration**: Update pages without full rebuilds
- **Dynamic Route Generation**: Automatic route discovery from database

### Image Optimization

- **Next.js Image Component**: Automatic optimization and lazy loading
- **Multiple CDN Support**: DigitalOcean, Vercel Blob, Cloudinary
- **Remote Pattern Validation**: Secure image sources
- **WebP Conversion**: Automatic format optimization

### Code Splitting

- **Dynamic Imports**: Components loaded on demand
- **Route-based Splitting**: Automatic code splitting per route
- **Component-level Splitting**: Individual component bundles

### Database Optimization

- **Query Optimization**: Efficient joins and indexing
- **Connection Pooling**: Efficient database connections
- **Prepared Statements**: SQL injection prevention and performance

## 🔒 Security Architecture

### Authentication Flow

```
1. User attempts login
2. Clerk validates credentials
3. JWT token generated and sent
4. Next.js validates token on each request
5. User data queried from database
6. Authenticated session established
```

### Data Access Control

- **Domain-based Filtering**: All queries include domain checks
- **User Ownership**: Sites tied to user accounts
- **Role-based Access**: Admin vs. editor permissions
- **API Route Protection**: Server-side authentication

### Content Security

- **SQL Injection Prevention**: Parameterized queries via Drizzle
- **XSS Protection**: Content sanitization in rich text editor
- **CSRF Protection**: Built-in Next.js protections
- **Input Validation**: Zod schema validation
- **Image Security**: Remote pattern validation for sources

## 🌟 Extensibility

### Adding New Components

1. **Create Component File**
   ```typescript
   export default function NewBlock(props: NewBlockProps) {
     return (
       <div className="bg-bg1 p-6">
         <h2 className="text-title font-font2">{props.title}</h2>
         <p className="text-text">{props.content}</p>
       </div>
     );
   }
   ```

2. **Register Component**
   ```typescript
   const components = {
     ...existingComponents,
     NewBlock,
   };
   ```

3. **Define Component in Database**
   ```sql
   INSERT INTO "Component" (name, type)
   VALUES ('NewBlock', 'block');
   ```

4. **Define Fields**
   ```sql
   INSERT INTO "Field" (componentName, name, type)
   VALUES 
     ('NewBlock', 'title', 'text'),
     ('NewBlock', 'content', 'richtext');
   ```

### Custom Content Types

1. **Define CMS Type**
   ```sql
   INSERT INTO "cmsType" (uid, name, siteDomain, entryComponentName, categoryComponentName, homeComponentName)
   VALUES ('articles', 'Articles', 'example.com', 'ArticleBlock', 'ArticleListBlock', 'ArticleHomeBlock');
   ```

2. **Create Fields**
   ```sql
   INSERT INTO "cmsField" (cmsTypeId, uid, name, type, blockPropMappedTo)
   VALUES 
     (1, 'title', 'Title', 'text', 'title'),
     (1, 'content', 'Content', 'richtext', 'content'),
     (1, 'thumbnail', 'Thumbnail', 'image', 'thumbnail');
   ```

3. **Create Component**
   ```typescript
   export default async function ArticleBlock({ id }: { id: string }) {
     const articleData = await getArticleData(id);
     return (
       <article>
         <h1>{articleData.title}</h1>
         <RichTextReader content={articleData.content} />
       </article>
     );
   }
   ```

### Styling Extensions

- **New CSS Variables**: Add to `utils/set-variables.tsx`
- **Custom Fonts**: Add to `fonts/fonts.tsx` system
- **Theme Variants**: Create new color schemes in site configuration
- **Component Styles**: Extend Tailwind configuration

## 🔧 Development Patterns

### Database Query Patterns

```typescript
// Site-scoped queries
const siteData = await db
  .select()
  .from(site)
  .where(eq(site.domain, process.env.DOMAIN!));

// Content with relationships
const pageContent = await db
  .select({
    blockId: block.id,
    componentName: block.componentName,
    fieldName: field.name,
    value: content.value
  })
  .from(content)
  .innerJoin(block, eq(content.blockId, block.id))
  .innerJoin(field, eq(content.fieldId, field.id))
  .innerJoin(page, eq(block.pageId, page.id))
  .where(and(
    eq(page.siteDomain, domain),
    eq(page.route, route)
  ))
  .orderBy(block.order);
```

### Error Handling Patterns

```typescript
// Graceful fallbacks
const siteData = await getSiteData(domain);
if (!siteData || !siteData[0]) {
  return <DefaultErrorPage />;
}

// Component error boundaries
export function ComponentErrorBoundary({ 
  children, 
  fallback 
}: {
  children: React.ReactNode;
  fallback: React.ComponentType<{error: Error}>;
}) {
  return (
    <ErrorBoundary FallbackComponent={fallback}>
      {children}
    </ErrorBoundary>
  );
}
```

### Type Safety Patterns

```typescript
// Database schema types
type Site = InferSelectModel<typeof site>;
type Page = InferSelectModel<typeof page>;
type BlockContent = {
  component: React.ComponentType<any>;
  props: Record<string, any>;
};

// Component prop validation
interface BlockProps {
  title: string;
  content?: string;
  edit: boolean;
  reference: any;
}
```

## 🚀 Deployment Architecture

### Vercel Integration

- **Git Integration**: Automatic deployments from repository
- **Edge Functions**: Server-side rendering at global edge locations
- **Static Assets**: CDN distribution worldwide
- **Environment Variables**: Secure configuration management
- **Preview Deployments**: Branch-based preview environments

### Database Architecture

- **Vercel Postgres**: Managed PostgreSQL with global distribution
- **Connection Pooling**: Efficient database connection management
- **Automated Backups**: Point-in-time recovery capabilities
- **Migration System**: Automated schema updates via Drizzle

### Monitoring & Observability

- **Next.js Analytics**: Built-in performance monitoring
- **Real User Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Runtime error monitoring and alerting
- **Database Monitoring**: Query performance and connection tracking

## 🔮 Future Architecture Considerations

### Scalability Improvements

1. **Database Sharding**: Horizontal scaling by domain clusters
2. **CDN Optimization**: Advanced caching strategies
3. **Redis Integration**: Session storage and caching layer
4. **Microservices**: Break apart monolithic structure for team scaling

### Performance Optimizations

1. **Advanced Bundle Optimization**: 
   - Tree shaking unused components
   - Dynamic component loading
   - Route-based code splitting

2. **Database Optimizations**:
   - Query result caching
   - Database indexing strategy
   - Read replicas for scaling

3. **Edge Computing**:
   - Move more computation to edge
   - Distributed content rendering
   - Regional data centers

### Feature Extensions

1. **Headless CMS APIs**: 
   - REST/GraphQL endpoints
   - Webhook integrations
   - Third-party integrations

2. **Advanced Analytics**:
   - Custom dashboards
   - A/B testing framework
   - User behavior tracking

3. **E-commerce Integration**:
   - Shopping cart system
   - Payment processing
   - Inventory management

4. **Collaboration Features**:
   - Multi-user editing
   - Comment system
   - Approval workflows

### Security Enhancements

1. **Advanced Authentication**:
   - Multi-factor authentication
   - Single sign-on (SSO)
   - Role-based permissions

2. **Content Security**:
   - Content approval workflows
   - Version control for content
   - Audit logging

3. **Infrastructure Security**:
   - WAF integration
   - DDoS protection
   - Security scanning

This architecture documentation provides the foundation for understanding, maintaining, and extending the Naut platform. The modular design and clear separation of concerns make it highly maintainable and scalable for future growth.