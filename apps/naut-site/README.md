# Naut - Multi-Tenant Website Builder & CMS

Naut is a sophisticated multi-tenant website builder and content management system built with Next.js. Each site is dynamically configured based on domain, allowing for complete customization of styling, components, content, and functionality.

## 🚀 Features

### Multi-Tenant Architecture
- **Domain-based tenancy**: Each site identified by domain via `DOMAIN` environment variable
- **Complete isolation**: Sites have separate styling, components, content, and configuration
- **Subdomain support**: Multiple subdomains can point to the same site

### Dynamic Component System
- **50+ Pre-built components**: Headers, footers, heroes, blocks, banners, and CMS components
- **Database-driven rendering**: Components selected and configured via database
- **Flexible content blocks**: Each page composed of ordered, configurable blocks

### Content Management System
- **Custom content types**: Define your own content structures with custom fields
- **Categories and entries**: Organize content with hierarchical categorization
- **Rich text editing**: TipTap-powered WYSIWYG editor
- **Media management**: Image upload and management system
- **Multi-language support**: Content localization capabilities

### Theme Customization
- **Dynamic styling**: Colors, fonts, spacing all configurable per site
- **Font management**: Support for Google Fonts and custom local fonts
- **CSS variables**: Runtime style injection based on database configuration
- **Responsive design**: Mobile-first approach with Tailwind CSS

### SEO & Analytics
- **Dynamic metadata**: Automatic meta tag generation per page/entry
- **Analytics integration**: Google Analytics and Meta Pixel support
- **Static generation**: Full SSG support for optimal performance
- **Sitemap generation**: Automatic sitemap creation

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.1.5** - App Router with React Server Components
- **React 19** - Latest React features and optimizations
- **TypeScript** - Full type safety throughout the application

### Database & ORM
- **PostgreSQL** - Primary database (via Vercel Postgres)
- **Drizzle ORM** - Type-safe database operations
- **Migrations** - Automated database schema management

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations and transitions

### Authentication & Content
- **Clerk** - User authentication and management
- **TipTap** - Rich text editor for content creation
- **Vercel Blob** - File storage and media management

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Vercel account (for deployment)

### Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Database
POSTGRES_URL="your-postgres-connection-string"

# Site Configuration
DOMAIN="your-domain.com"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Optional: Analytics
GOOGLE_ANALYTICS_ID="your-ga-id"
META_PIXEL_ID="your-meta-pixel-id"

# File Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naut-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Run migrations
   npm run db:migrate
   
   # Optional: Seed database with initial data
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗 Project Structure

```
naut-site/
├── app/                          # Next.js App Router
│   ├── [[...page]]/             # Dynamic routing for all pages
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout with dynamic font loading
├── components/                   # React components
│   ├── blocks/                  # Content block components (50+)
│   ├── banners/                 # Banner components
│   ├── cms/                     # CMS-specific components
│   ├── footers/                 # Footer variants
│   ├── headers/                 # Header variants
│   ├── heroes/                  # Hero section components
│   ├── ui/                      # Reusable UI components
│   └── text/                    # Text and rich text components
├── db/                          # Database configuration
│   ├── index.ts                 # Database connection
│   └── schema.ts                # Database schema definitions
├── fonts/                       # Font management system
├── lib/                         # Utility libraries
├── migrations/                  # Database migrations
├── public/                      # Static assets
│   └── fonts/                   # Custom font files
└── utils/                       # Utility functions
```

## 🎨 Component System

### Block Components
Content blocks are the building blocks of pages. Each block:
- Receives props from database content
- Supports edit mode for content management
- Includes animation and responsive design
- Can be reordered and configured per page

### Headers & Footers
- Multiple header styles (Tiger, Koepka, Matsuyama, etc.)
- Various footer designs (Checo, Senna, Hamilton, etc.)
- Dynamic navigation based on site configuration
- Logo and branding customization

### Hero Sections
- Eye-catching landing sections
- Multiple styles (Hendrix, Jagger, Mercury, etc.)
- Dynamic content and media support
- Smooth animations and parallax effects

### CMS Components
- Article display (MoscatiBlock)
- Category listings (AcutisBlock)  
- Home page content (JuanDiegoBlock)
- Dynamic field mapping from CMS

## 📊 Database Schema

### Core Tables
- **Site**: Domain-based site configuration, styling, and component selection
- **Page**: Individual pages with metadata and component configuration
- **Block**: Content blocks with ordering and component references
- **Content**: Actual content data for blocks
- **Component**: Available component definitions
- **Field**: Component field definitions

### CMS Tables
- **cmsType**: Custom content type definitions
- **cmsEntry**: Individual content entries
- **cmsCategory**: Content categorization
- **cmsField**: Custom field definitions
- **cmsEntryContent**: Content values for entries

### User & Media
- **User**: User accounts and authentication
- **Image**: Media file management
- **Message**: Chat/communication system

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy**: Automatic deployment on push to main branch

### Custom Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Adding New Components

1. **Create component file** in appropriate directory (`components/blocks/`, `components/headers/`, etc.)
2. **Add to components map** in `app/[[...page]]/page.tsx`
3. **Define component fields** in database
4. **Create migration** if needed

### Custom Styling

1. **Update site configuration** in database
2. **CSS variables** automatically generated in `utils/set-variables.tsx`
3. **Use Tailwind classes** with custom CSS variables
4. **Test across different sites** with different configurations

## 📚 API Reference

### Environment Variables
- `DOMAIN`: Primary domain for site identification
- `POSTGRES_URL`: Database connection string
- `NEXT_PUBLIC_CLERK_*`: Clerk authentication keys
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token

### Database Queries
The application uses Drizzle ORM for type-safe database operations. Key patterns:
- Site data fetched by domain
- Content queried by page and block relationships
- CMS content dynamically loaded based on entry IDs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
- Verify `POSTGRES_URL` is correctly set
- Check database permissions and network access

**Font Loading Problems**
- Ensure font files exist in `public/fonts/`
- Verify font names match in `fonts/fonts.tsx`

**Component Not Rendering**
- Check component is imported in `app/[[...page]]/page.tsx`
- Verify component name matches database configuration

**Styling Issues**
- Check CSS variables are properly generated
- Verify Tailwind classes are correctly applied
- Test with different site configurations

For additional support, please open an issue in the repository.