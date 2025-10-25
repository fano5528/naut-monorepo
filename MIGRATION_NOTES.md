# Turborepo Migration Notes

## Status

✅ **naut-site** - Working
✅ **naut-customers** - Working

## Changes Made for naut-customers

### 1. Root Configuration

#### package.json
Added turbo scripts for easy development and building:
- `dev:customers` - Run naut-customers in development mode
- `build:customers` - Build naut-customers
- Plus scripts for other apps (site, preview, wa)

#### .gitignore
Enhanced with proper Next.js and monorepo patterns:
- Added `.next/`, `out/`, `build`, `dist`
- Added TypeScript build info
- Added proper log file patterns

### 2. naut-customers Configuration

#### package.json
- Added missing dependency: `@radix-ui/react-visually-hidden@^1.1.0`
- Removed `--turbopack` flag from dev script (causes "Next.js package not found" error in monorepo)

#### tsconfig.json
- Excluded `drizzle.config.ts` from TypeScript checking to avoid `@next/env` import error during build

#### Component Fixes
Fixed framer-motion API usage in multiple components:
- `HarariBlock.tsx` - Moved `amount` from `transition` to `viewport` prop (3 instances)
- `RiordanBlock.tsx` - Moved `amount` from `transition` to `viewport` prop (3 instances)

**Before:**
```tsx
transition={{ delay: 0.2, amount: 0.3 }}
viewport={{ once: true }}
```

**After:**
```tsx
transition={{ delay: 0.2 }}
viewport={{ once: true, amount: 0.3 }}
```

## How to Use

### Development
```bash
# Run all apps
pnpm dev

# Run specific app
pnpm dev:customers
pnpm dev:site
pnpm dev:preview
pnpm dev:wa
```

### Building
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:customers
pnpm build:site
pnpm build:preview
pnpm build:wa
```

### Linting
```bash
pnpm lint
```

## Architecture

This is a pnpm workspace + Turborepo monorepo with:
- **apps/** - Contains all application packages
  - `naut-site` - Main site (uses `@naut/schemas`)
  - `naut-customers` - Customer-facing app (has own schema)
  - `naut-preview` - Preview app
  - `naut-wa` - WhatsApp integration
- **packages/** - Shared packages
  - `@naut/schemas` - Shared database schemas

## Next Steps

To get the remaining apps working:
1. ✅ naut-site
2. ✅ naut-customers  
3. ⏳ naut-preview
4. ⏳ naut-wa


