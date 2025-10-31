# Components Migration Plan: Moving to `@naut/ui` Package

## Executive Summary

This document outlines a comprehensive plan to migrate all components from the three applications (`naut-site`, `naut-customers`, `naut-preview`) into a shared `@naut/ui` package while maintaining full backward compatibility and ensuring all apps continue to work as they do now.

**Feasibility:** ✅ **Highly Feasible** - The migration is straightforward with proper planning.

**Estimated Complexity:** Medium-High (due to CMS components and Tailwind configuration)

**Estimated Time:** 2-3 days for initial migration + 1-2 days for testing and refinement

---

## Current State Analysis

### Component Distribution

| Application | Component Count | Unique Files |
|------------|----------------|--------------|
| naut-site | 118 files | 0 (all exist elsewhere) |
| naut-customers | 124 files | 6 (UI components) |
| naut-preview | 115 files | 1 (DomainLink) |

### Key Findings

1. **Import Patterns:**
   - Components use relative imports: `../text/Text`, `../image/Image`
   - Apps use path aliases: `@/components/*`
   - CMS components import from `@/db` or `@naut/schemas`
   - 476+ files use `@/components` imports

2. **Dependencies:**
   - All apps share common dependencies (react, next, framer-motion, radix-ui, etc.)
   - CMS components require database access (`db` instance)
   - Components depend on Tailwind CSS classes

3. **App-Specific Features:**
   - `naut-preview`: DomainLink component for multi-tenant routing
   - `naut-customers`: CMS sidebar menu functionality
   - Different Tailwind configs (site uses v4, others use v3)

4. **Issues to Fix:**
   - Tailwind syntax errors in naut-site components
   - Inconsistent TypeScript patterns (interface vs inline props)
   - Import path differences for CMS schemas

---

## Migration Strategy

### Phase 1: Package Setup & Structure

#### 1.1 Create `@naut/ui` Package Structure

```
packages/ui/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                    # Main barrel export
│   ├── components/
│   │   ├── app-card.tsx
│   │   ├── app-form.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── form-alert-dialog.tsx
│   │   ├── form-wrapper.tsx
│   │   ├── popup-editor.tsx
│   │   ├── submit-button.tsx
│   │   ├── banners/
│   │   ├── blocks/
│   │   ├── cms/
│   │   │   ├── article/
│   │   │   ├── category/
│   │   │   └── home/
│   │   ├── footers/
│   │   ├── headers/
│   │   ├── heroes/
│   │   ├── image/
│   │   ├── link/
│   │   ├── text/
│   │   ├── ui/
│   │   └── video/
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── utils/
│       └── cn.ts                    # Tailwind merge utility
└── dist/                            # Compiled output
```

#### 1.2 Package Configuration

**`packages/ui/package.json`:**
```json
{
  "name": "@naut/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./blocks/*": {
      "import": "./dist/blocks/*.js",
      "types": "./dist/blocks/*.d.ts"
    },
    "./headers/*": {
      "import": "./dist/headers/*.js",
      "types": "./dist/headers/*.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@naut/schemas": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0",
    "framer-motion": "^12.0.0",
    "@radix-ui/react-*": "*",
    "lucide-react": "^0.5.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.0",
    "class-variance-authority": "^0.7.1"
  },
  "peerDependencies": {
    "@vercel/postgres": "^0.10.0",
    "drizzle-orm": "^0.38.0"
  }
}
```

**Key Points:**
- Use `peerDependencies` for database-related packages (apps will provide)
- Export multiple entry points for better tree-shaking
- Include all component dependencies

#### 1.3 TypeScript Configuration

**`packages/ui/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### Phase 2: Component Migration

#### 2.1 Component Selection Strategy

**Best Version Selection:**

1. **Base Components (app-card, app-form, etc.):**
   - ✅ Use versions from any app (they're identical)
   - Fix any syntax errors found

2. **UI Components:**
   - ✅ Use `naut-customers` versions (most complete - has badge, calendar, etc.)
   - These are shadcn/ui components, should be consistent

3. **Block Components:**
   - ✅ Use `naut-customers` versions (correct Tailwind syntax)
   - Fix interface definitions to export interfaces (better for TypeScript)
   - Include all blocks (add missing ones from naut-site)

4. **CMS Components:**
   - ⚠️ **Special handling required** (see section 3.1)

5. **Link Components:**
   - ✅ Use `naut-preview` version with DomainLink
   - Make DomainLink optional/configurable

6. **App-Sidebar:**
   - ✅ Use `naut-customers` version (has CMS menu)
   - Make CMS functionality optional via props

#### 2.2 Import Path Transformation

**Before (in apps):**
```tsx
import Text from "@/components/text/Text";
import Image from "@/components/image/Image";
import AchebeBlock from "@/components/blocks/AchebeBlock";
```

**After (in package):**
```tsx
// Internal package imports use relative paths
import Text from "../text/Text";
import Image from "../image/Image";

// External imports remain the same
import { db } from "drizzle-orm"; // Apps will provide this
```

**After (in apps):**
```tsx
import { Text, Image, AchebeBlock } from "@naut/ui";
// OR
import AchebeBlock from "@naut/ui/blocks/AchebeBlock";
```

#### 2.3 Barrel Exports

**`packages/ui/src/index.ts`:**
```tsx
// App components
export { default as AppCard } from './components/app-card';
export { default as AppForm } from './components/app-form';
export { default as AppSidebar } from './components/app-sidebar';
export { default as FormAlertDialog } from './components/form-alert-dialog';
export { default as FormWrapper } from './components/form-wrapper';
export { default as PopupEditor } from './components/popup-editor';
export { default as SubmitButton } from './components/submit-button';

// Blocks
export { default as AchebeBlock } from './components/blocks/AchebeBlock';
export { default as DostoevskyBlock } from './components/blocks/DostoevskyBlock';
// ... all blocks

// Headers
export { default as TigerHeader } from './components/headers/TigerHeader';
// ... all headers

// Heroes
export { default as HendrixHero } from './components/heroes/HendrixHero';
// ... all heroes

// Footers
export { default as ChecoFooter } from './components/footers/ChecoFooter';
export type { Props as ChecoFooterProps } from './components/footers/ChecoFooter';
// ... all footers

// Banners
export { default as MadonnaBanner } from './components/banners/MadonnaBanner';
// ... all banners

// Text components
export { default as Text } from './components/text/Text';
export { default as RichText } from './components/text/RichText';
export { default as RichTextReader } from './components/text/RichTextReader';
// ... all text components

// Link components
export { default as Link } from './components/link/Link';
export { default as DomainLink } from './components/link/DomainLink';
export { default as LinkWrapper } from './components/link/LinkWrapper';
export { default as IconLink } from './components/link/IconLink';

// Image & Video
export { default as Image } from './components/image/Image';
export { default as YtVideo } from './components/video/YtVideo';

// UI components (shadcn)
export * from './components/ui/button';
export * from './components/ui/card';
// ... all UI components

// Hooks
export { useMobile } from './hooks/use-mobile';
export { useToast } from './hooks/use-toast';

// Utils
export { cn } from './utils/cn';
```

---

### Phase 3: CMS Components - Special Handling

#### 3.1 The Challenge

CMS components (`MoscatiBlock`, `AcutisBlock`, `JuanDiegoBlock`) have database dependencies:

```tsx
import { db } from "@/db";  // ❌ App-specific path
import { cmsEntry, cmsType } from "@naut/schemas";  // ✅ Shared package
```

#### 3.2 Solution Options

**Option A: Dependency Injection (Recommended)**

Create a CMS context/provider that apps inject:

**`packages/ui/src/cms/CmsProvider.tsx`:**
```tsx
import { createContext, useContext } from 'react';

interface CmsContextValue {
  db: any; // Apps provide their db instance
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ db, children }: { db: any; children: React.ReactNode }) {
  return (
    <CmsContext.Provider value={{ db }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return context;
}
```

**Updated CMS Component:**
```tsx
import { useCms } from '../cms/CmsProvider';
import { cmsEntry, cmsType } from '@naut/schemas';

export default async function MoscatiBlock(props: { id: string }) {
  const { db } = useCms(); // ✅ Get db from context
  
  // Rest of component logic...
}
```

**In Apps:**
```tsx
import { CmsProvider } from '@naut/ui';
import { db } from '@/db';

export default function Layout({ children }) {
  return (
    <CmsProvider db={db}>
      {children}
    </CmsProvider>
  );
}
```

**Option B: Props Injection**

Pass `db` as a prop to CMS components:

```tsx
export default async function MoscatiBlock(props: { 
  id: string;
  db: any; // App provides db instance
}) {
  // Use props.db instead of importing
}
```

**Pros/Cons:**
- ✅ Option A: Cleaner API, better for deeply nested components
- ✅ Option B: More explicit, easier to understand
- ⚠️ Option A: Requires React Context (not ideal for server components)
- ⚠️ Option B: Props drilling for nested components

**Option C: Server Component Wrapper (Recommended for Next.js)**

Since CMS components are server components, we can't use React Context. Instead, create a wrapper pattern:

**`packages/ui/src/cms/createCmsComponent.ts`:**
```tsx
import { cmsEntry, cmsType } from '@naut/schemas';

export function createCmsComponent(db: any) {
  return {
    MoscatiBlock: async function(props: { id: string }) {
      // Component logic using provided db
      const cmsEntryData = await db.select().from(cmsEntry)...
      // ...
    },
    AcutisBlock: async function(props: { id: string }) {
      // ...
    },
    // ... other CMS components
  };
}
```

**In Apps:**
```tsx
import { createCmsComponent } from '@naut/ui/cms';
import { db } from '@/db';

const CmsComponents = createCmsComponent(db);

export default function Page() {
  return <CmsComponents.MoscatiBlock id="123" />;
}
```

**Final Recommendation: Option C**
- Works with Next.js server components
- Clean separation of concerns
- Type-safe
- No prop drilling

---

### Phase 4: Tailwind CSS Configuration

#### 4.1 The Challenge

Tailwind needs to scan component files in the package. Current configs only scan local `./components/**/*`.

#### 4.2 Solution: Update Tailwind Configs

**Each app's `tailwind.config.ts`:**

```ts
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // ✅ Add package path
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // For naut-site
    // OR use workspace path
    "../../packages/ui/dist/**/*.{js,ts,jsx,tsx}", // If using compiled output
  ],
  // ... rest of config
}
```

**Alternative: Use Tailwind's `content` array with absolute paths:**

```ts
import path from 'path';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(__dirname, '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'),
  ],
  // ...
}
```

#### 4.3 Tailwind CSS Variables

All apps use CSS variables for theming. These are defined in `app/globals.css`. The package components will inherit these variables from the consuming app, so **no changes needed**.

#### 4.4 PostCSS Configuration

No changes needed - PostCSS runs in each app and will process the package's CSS classes.

---

### Phase 5: Migration Steps

#### Step 1: Setup Package Structure
1. Create `packages/ui/package.json` with dependencies
2. Create `packages/ui/tsconfig.json`
3. Create `packages/ui/src/index.ts` barrel export
4. Create folder structure

#### Step 2: Migrate Base Components
1. Copy identical components (app-card, app-form, etc.)
2. Fix any syntax errors found
3. Update internal imports to use relative paths

#### Step 3: Migrate UI Components
1. Copy from `naut-customers` (most complete)
2. Ensure all Radix UI dependencies are listed
3. Export utilities (`cn` function)

#### Step 4: Migrate Block Components
1. Copy best versions (naut-customers for correct syntax)
2. Fix Tailwind syntax errors (`aspect-7/5` → `aspect-[7/5]`)
3. Export TypeScript interfaces
4. Include all blocks (add missing ones)

#### Step 5: Migrate CMS Components
1. Implement `createCmsComponent` factory pattern
2. Update components to use injected `db`
3. Ensure schema imports use `@naut/schemas`

#### Step 6: Migrate Link Components
1. Copy `DomainLink` from naut-preview
2. Copy `Link` component (fix syntax errors)
3. Make DomainLink optional/configurable

#### Step 7: Migrate App-Sidebar
1. Copy from naut-customers (has CMS menu)
2. Make CMS menu items optional (conditional rendering)

#### Step 8: Update Apps
1. Add `@naut/ui` to package.json dependencies
2. Update Tailwind configs to scan package
3. Replace imports: `@/components/*` → `@naut/ui`
4. Set up CMS component factory in each app
5. Remove local components folders

#### Step 9: Build & Test
1. Build `@naut/ui` package
2. Test each app
3. Fix any import/type errors
4. Verify Tailwind classes work correctly

---

## Detailed Implementation Plan

### 5.1 Package Dependencies

**`packages/ui/package.json` dependencies:**

```json
{
  "dependencies": {
    "@naut/schemas": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0",
    "framer-motion": "^12.0.0",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.5",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-dialog": "^1.1.5",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-popover": "^1.1.13",
    "@radix-ui/react-select": "^2.1.5",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.5",
    "@radix-ui/react-tooltip": "^1.1.7",
    "@radix-ui/react-visually-hidden": "^1.1.0",
    "@tiptap/extension-color": "^2.11.4",
    "@tiptap/extension-link": "^2.11.4",
    "@tiptap/extension-text-style": "^2.11.4",
    "@tiptap/extension-underline": "^2.11.4",
    "@tiptap/react": "^2.11.4",
    "@tiptap/starter-kit": "^2.11.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.0",
    "lucide-react": "^0.5.0",
    "@heroicons/react": "^2.2.0"
  },
  "peerDependencies": {
    "@vercel/postgres": "^0.10.0",
    "drizzle-orm": "^0.38.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.3"
  }
}
```

### 5.2 Component Fixes During Migration

**Issues to fix:**

1. **Tailwind Syntax Errors:**
   - `relative!` → `!relative` (Link.tsx)
   - `duration-0!` → `!duration-0` (MadonnaBanner.tsx)
   - `aspect-7/5` → `aspect-[7/5]` (all block components)
   - `outline-hidden` → `outline-none` (button.tsx)
   - `z-5` → `z-[5]` (CMS components)

2. **TypeScript Consistency:**
   - Export interfaces for better type safety
   - Use consistent prop patterns

3. **Import Paths:**
   - All CMS components: Use `@naut/schemas` (not `@/db/schema`)
   - Internal imports: Use relative paths

### 5.3 App-Specific Adaptations

#### DomainLink in naut-preview

**Solution:** Make Link component configurable:

**`packages/ui/src/components/link/Link.tsx`:**
```tsx
import NextLink from 'next/link';
import DomainLink from './DomainLink';

interface LinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  useDomainPrefix?: boolean; // New prop
}

export default function Link({ useDomainPrefix, ...props }: LinkProps) {
  if (useDomainPrefix) {
    return <DomainLink {...props} />;
  }
  return <NextLink {...props} />;
}
```

**In naut-preview:**
```tsx
import { Link } from '@naut/ui';

// Use domain prefix
<Link href="/page" useDomainPrefix />
```

#### CMS Sidebar Menu

**Solution:** Make it optional via props:

**`packages/ui/src/components/app-sidebar.tsx`:**
```tsx
interface AppSidebarProps {
  siteData: Site;
  cmsTypes?: CmsType[]; // Optional - only naut-customers provides this
  // ... other props
}

export function AppSidebar({ siteData, cmsTypes = [], ...props }: AppSidebarProps) {
  const menuItems = [/* base items */];
  
  // Only add CMS items if provided
  if (cmsTypes.length > 0) {
    const cmsMenuItems = cmsTypes.map(/* ... */);
    menuItems.push(...cmsMenuItems);
  }
  
  // ...
}
```

---

## Testing Strategy

### 6.1 Unit Testing

1. **Component Build Test:**
   ```bash
   cd packages/ui
   npm run build
   ```
   - Verify TypeScript compiles without errors
   - Verify all exports are generated correctly

2. **Import Test:**
   ```tsx
   // Test file in each app
   import { AchebeBlock, Text, Image } from '@naut/ui';
   // Should import without errors
   ```

### 6.2 Integration Testing

1. **Visual Regression:**
   - Compare rendered components before/after migration
   - Use screenshots or Storybook

2. **Tailwind Class Test:**
   - Verify all Tailwind classes are preserved
   - Check that custom colors/variables work

3. **CMS Component Test:**
   - Test CMS components with injected `db`
   - Verify data fetching works correctly

### 6.3 App-Specific Tests

1. **naut-site:**
   - Test all pages render correctly
   - Verify animations work (framer-motion)

2. **naut-customers:**
   - Test CMS sidebar menu
   - Test CMS entry pages
   - Verify editor functionality

3. **naut-preview:**
   - Test DomainLink routing
   - Test component preview pages
   - Verify domain prefix works

---

## Rollback Plan

If issues arise:

1. **Keep old components folders:**
   - Don't delete until migration is fully tested
   - Use git branches for safe experimentation

2. **Gradual Migration:**
   - Migrate one category at a time (e.g., blocks first)
   - Test each category before moving to next

3. **Dual Import Period:**
   - Allow both `@/components` and `@naut/ui` imports temporarily
   - Gradually migrate imports

---

## Potential Issues & Solutions

### Issue 1: Tailwind Classes Not Working

**Symptom:** Components render but styles are missing.

**Solutions:**
- Verify Tailwind config scans package path correctly
- Check PostCSS configuration
- Ensure CSS variables are defined in app's globals.css
- Use `!important` or check CSS specificity

### Issue 2: TypeScript Errors

**Symptom:** Type errors when importing from package.

**Solutions:**
- Verify `dist/index.d.ts` is generated correctly
- Check `package.json` exports field
- Ensure all types are exported from barrel file

### Issue 3: CMS Components Not Working

**Symptom:** CMS components fail to fetch data.

**Solutions:**
- Verify `db` instance is correctly injected
- Check schema imports use `@naut/schemas`
- Verify database connection in app

### Issue 4: Build Performance

**Symptom:** Slower builds after migration.

**Solutions:**
- Use Turbo's caching for package builds
- Consider pre-building package in CI
- Use Next.js `transpilePackages` option if needed

### Issue 5: Bundle Size

**Symptom:** Larger bundle sizes.

**Solutions:**
- Use tree-shaking friendly exports
- Consider code-splitting for large components
- Review dependencies (remove unused ones)

---

## Migration Checklist

### Pre-Migration
- [ ] Backup current components folders
- [ ] Create migration branch
- [ ] Document current component usage
- [ ] Identify all import paths

### Package Setup
- [ ] Create `packages/ui/package.json`
- [ ] Create `packages/ui/tsconfig.json`
- [ ] Create folder structure
- [ ] Set up barrel exports

### Component Migration
- [ ] Migrate base components (app-card, etc.)
- [ ] Migrate UI components
- [ ] Migrate block components
- [ ] Migrate CMS components (with factory pattern)
- [ ] Migrate link components
- [ ] Migrate app-sidebar
- [ ] Migrate text components
- [ ] Migrate image/video components
- [ ] Migrate banners
- [ ] Migrate headers
- [ ] Migrate heroes
- [ ] Migrate footers

### Fixes
- [ ] Fix all Tailwind syntax errors
- [ ] Standardize TypeScript interfaces
- [ ] Update all import paths
- [ ] Fix CMS component db injection

### App Updates
- [ ] Add `@naut/ui` to package.json (all apps)
- [ ] Update Tailwind configs (all apps)
- [ ] Replace imports in naut-site
- [ ] Replace imports in naut-customers
- [ ] Replace imports in naut-preview
- [ ] Set up CMS component factory (where needed)
- [ ] Test DomainLink in naut-preview
- [ ] Test CMS sidebar in naut-customers

### Testing
- [ ] Build package successfully
- [ ] Test naut-site builds
- [ ] Test naut-customers builds
- [ ] Test naut-preview builds
- [ ] Visual regression testing
- [ ] Test CMS functionality
- [ ] Test animations
- [ ] Test routing

### Cleanup
- [ ] Remove old components folders
- [ ] Update documentation
- [ ] Update import guides
- [ ] Remove unused dependencies

---

## Timeline Estimate

| Phase | Duration | Notes |
|-------|----------|-------|
| Package Setup | 2-3 hours | Structure, configs, dependencies |
| Component Migration | 1-2 days | Copy, fix, adapt components |
| CMS Component Handling | 4-6 hours | Implement factory pattern |
| App Updates | 4-6 hours | Update imports, configs |
| Testing & Fixes | 1-2 days | Fix issues, verify functionality |
| **Total** | **3-5 days** | Depending on complexity |

---

## Success Criteria

✅ All components available from `@naut/ui`  
✅ All apps build successfully  
✅ All apps render correctly  
✅ Tailwind classes work properly  
✅ CMS components function correctly  
✅ No visual regressions  
✅ TypeScript types work correctly  
✅ Bundle sizes acceptable  
✅ Build times acceptable  

---

## Next Steps

1. **Review this plan** with team
2. **Create migration branch**
3. **Start with Phase 1** (package setup)
4. **Migrate incrementally** (one category at a time)
5. **Test thoroughly** before removing old components
6. **Document** final structure for future reference

---

## Conclusion

This migration is **highly feasible** and will result in:
- ✅ Single source of truth for components
- ✅ Easier maintenance and updates
- ✅ Consistent components across apps
- ✅ Better code reusability
- ✅ Fixed syntax errors and inconsistencies

The main challenges (CMS components and Tailwind) have clear solutions. With proper planning and incremental migration, this can be completed successfully in 3-5 days.

