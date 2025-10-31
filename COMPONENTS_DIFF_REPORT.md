# Detailed Components Folder Differences Report

## Executive Summary

This comprehensive report details the differences between the `components` folders across three applications:
- **naut-site** (118 files)
- **naut-customers** (124 files)
- **naut-preview** (115 files)

**Total files with differences:**
- naut-site vs naut-customers: **97 files differ**
- naut-site vs naut-preview: **101 files differ**
- naut-customers vs naut-preview: **76 files differ**

---

## File Count Comparison

| Application | Total Files |
|------------|------------|
| naut-site | 118 |
| naut-customers | 124 |
| naut-preview | 115 |

---

## Files Present in Only One Application

### Files Only in `naut-site`
- None (all files in naut-site exist in at least one other application)

### Files Only in `naut-customers`
- `ui/badge.tsx` - Badge component for UI elements
- `ui/calendar.tsx` - Calendar component
- `ui/dropdown-menu.tsx` - Dropdown menu component
- `ui/pagination.tsx` - Pagination component
- `ui/popover.tsx` - Popover component
- `ui/switch.tsx` - Switch/toggle component

### Files Only in `naut-preview`
- `link/DomainLink.tsx` - Domain-aware link wrapper component

### Files Missing in `naut-preview` (but present in both `naut-site` and `naut-customers`)
- `blocks/DostoevskyBlock.tsx` - Stats/features block component
- `blocks/SertillangesBlock.tsx` - Image and rich text grid component
- `blocks/StevensonBlock.tsx` - Image carousel/slideshow component
- `headers/GoyaHeader.tsx` - Full-screen overlay header component

---

## Detailed Content Differences

### 1. `link/Link.tsx`

#### naut-site
```tsx
// Line 70
<h1 className={`${props.className} relative!`}>
```
**Issue:** Incorrect Tailwind syntax (`relative!` instead of `!relative`)

#### naut-customers
```tsx
// Line 70
<h1 className={`${props.className} !relative`}>
```
**Correct:** Proper Tailwind important modifier syntax

#### naut-preview
```tsx
// Line 5 - Different import
import DomainLink from './DomainLink'

// Line 86 - Uses DomainLink instead of Next.js Link
return (
  <DomainLink
    href={props.href}
    className={props.className}
    style={props.style}
  >
    {props.children}
  </DomainLink>
)
```
**Key Difference:** Uses custom `DomainLink` component that prefixes links with domain from URL params, enabling multi-tenant routing.

---

### 2. `app-sidebar.tsx`

#### naut-site
```tsx
// Lines 38-42
const menuItems = [
  { icon: PanelTop, label: "Sitios", href: `/` },
  { icon: Edit3, label: "Editor", href: `/sitio/${siteData.domain}/paginas` },
  { icon: BarChart2, label: "Analytics", href: `/sitio/${siteData.domain}/analytics` },
]
```
- Basic 3-item menu
- Uses `UserButton` from Clerk (line 74)
- No CMS functionality

#### naut-customers
```tsx
// Line 4 - Additional import
import { PanelTop, Edit3, BarChart2, Database } from "lucide-react"

// Lines 33-45 - Additional interface
interface CmsType {
  id: number;
  uid: string;
  name: string;
  description: string;
  tagline: string | null;
  siteDomain: string;
  spacer: boolean;
  categorySpacer: boolean;
  homeSpacer: boolean;
  invertHeaderColor: boolean;
  homeComponentName: string;
}

// Lines 47-50 - Extended props
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  siteData: Site;
  cmsTypes: CmsType[];
}

// Lines 52-65 - Dynamic CMS menu items
export function AppSidebar({ siteData, cmsTypes, ...props }: AppSidebarProps) {
  const menuItems = [
    { icon: PanelTop, label: "Sitios", href: `/` },
    { icon: Edit3, label: "Editor", href: `/sitio/${siteData.domain}/paginas` },
    { icon: BarChart2, label: "Analytics", href: `/sitio/${siteData.domain}/analytics` },
  ]

  const cmsMenuItems = cmsTypes.map((cmsType) => ({
    icon: Database,
    label: cmsType.name,
    href: `/sitio/${siteData.domain}/cms/${cmsType.uid}/1`
  }));
  
  menuItems.push(...cmsMenuItems);
```
**Key Difference:** Accepts `cmsTypes` prop and dynamically generates menu items for each CMS type with Database icon.

#### naut-preview
```tsx
// Line 17 - UserButton commented out
// import { UserButton } from "@clerk/nextjs"

// Line 74 - UserButton usage commented out
{/* <UserButton /> */}
```
**Key Difference:** UserButton is commented out, likely for preview/public access scenarios.

---

### 3. `ui/button.tsx`

#### naut-site
```tsx
// Line 8
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
```
**Issue:** Uses `outline-hidden` which is not a valid Tailwind class (should be `outline-none`)

#### naut-customers & naut-preview
```tsx
// Line 8
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
```
**Correct:** Uses `outline-none` (valid Tailwind class)

---

### 4. Block Components - General Pattern

#### Pattern: TypeScript Interface Definitions

**naut-site** (e.g., `blocks/AchebeBlock.tsx`):
```tsx
// Lines 4-10
interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { image: string }[];
}

export default function AchebeBlock(props: Props) {
```

**naut-customers** (same file):
```tsx
// Lines 4-10 - Inline props definition
export default function AchebeBlock(props: {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { image: string }[];
}) {
```

**naut-preview** (same file):
```tsx
// Same pattern as naut-customers - inline props
export default function AchebeBlock(props: {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { image: string }[];
}) {
```

#### Pattern: Aspect Ratio Syntax

**naut-site** (`blocks/AchebeBlock.tsx`, line 37):
```tsx
className="w-full rounded-md sm:rounded-lg aspect-7/5 object-cover"
```
**Issue:** `aspect-7/5` is not valid Tailwind syntax

**naut-customers & naut-preview** (same file, line 35):
```tsx
className="w-full rounded-md sm:rounded-lg aspect-[7/5] object-cover"
```
**Correct:** Uses `aspect-[7/5]` with brackets for arbitrary values

---

### 5. `blocks/DostoevskyBlock.tsx` (Missing in naut-preview)

This file exists in both naut-site and naut-customers with identical content. It features:
- Stats display with animated cards
- Feature list with icons
- CTA button
- Uses framer-motion for animations
- Complex layout with 3 stat cards

**Why missing in naut-preview:** Likely intentionally excluded for simpler preview functionality.

---

### 6. `blocks/SertillangesBlock.tsx` (Missing in naut-preview)

#### naut-site & naut-customers
Both versions are identical:
```tsx
// Lines 6-13 - Interface definition
interface Props {
  edit: boolean;
  reference: any;
  content: {
    image: string;
    description: string;
  }[];
}

// Lines 18-36 - Custom styled-jsx for white text
<style jsx global>{`
  .white-rich-text .rich-text-container,
  .white-rich-text .rich-text-container h1,
  // ... all text elements set to white
  color: #ffffff !important;
`}</style>
```
- Grid layout with images and rich text
- Custom white text styling for dark backgrounds
- Uses RichText component

**Why missing in naut-preview:** Likely excluded to reduce preview complexity.

---

### 7. `blocks/StevensonBlock.tsx` (Missing in naut-preview)

#### naut-site
```tsx
// Lines 28-32 - Interface definition
interface Props {
  content: SlideContent[];
  edit: boolean;
  reference: any;
}

export default function StevensonBlock(props: Props) {
```

#### naut-customers
```tsx
// Lines 28-32 - Inline props
export default function StevensonBlock( props: {
  content: SlideContent[];
  edit: boolean;
  reference: any;
} ) {
```

**Functionality:** Image carousel/slideshow component with:
- Auto-advancing slides (200ms interval)
- Touch/mouse interaction to pause
- Image preloading to prevent flicker
- Crossfade transitions
- Full viewport height (`h-[100dvh]`)

**Why missing in naut-preview:** Likely excluded due to complex interaction requirements.

---

### 8. `blocks/VerneBlock.tsx` - Animation Differences

#### naut-site & naut-customers
```tsx
// Import framer-motion
import { motion } from "framer-motion";

// Lines 37-50 - Wrapped in motion.div
{props.isSubtitle ? (
  <motion.div
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: 10, scale: 0.99 }}
    viewport={{ amount: 0.9, once: true }}
    className="transition-none"
  >
    <Text ... />
  </motion.div>
) : ""}

// Lines 96-101 - Each content item wrapped in motion.div
{props.content.map((item, index) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: 10, scale: 0.99 }}
    viewport={{ amount: 0.9, once: true }}
    className="transition-none"
    key={item.name}
  >
```

**Features:**
- Scroll-triggered animations
- Opacity, translate, and scale transitions
- Motion effects on subtitle, title, description, and content items
- CTA button with animation

#### naut-preview
```tsx
// NO framer-motion import
// NO motion.div wrappers

// Lines 34-42 - Direct Text component without animation
{props.isSubtitle ? (
  <Text
    edit={props.edit}
    name={props.reference.subtitle}
    className="text-base font-semibold leading-7 text-color1 text-center font-font2"
  >
    {props.subtitle}
  </Text>
) : ""}

// Lines 72-107 - Direct div without animation
{props.content.map((item, index) => (
  <div key={item.name}>
```

**Also:**
- Missing CTA functionality (no `ctaText` or `ctaLink` props)
- Missing Link import and CTA button rendering
- Simpler interface - no `ctaText` or `ctaLink` in Props interface

**Key Difference:** naut-preview version lacks all animations and CTA functionality for performance/simplicity.

---

### 9. `banners/MadonnaBanner.tsx`

#### naut-site
```tsx
// Lines 4-10 - Separate interface
interface Props {
  edit: boolean;
  reference: any;
  href: string;
  image?: string;
}

export default function MadonnaBanner(props: Props) {

// Line 17 - Incorrect Tailwind syntax
<svg className="duration-0! text-white w-8 h-8 sm:w-10 sm:h-10" ...
```
**Issue:** `duration-0!` should be `!duration-0`

#### naut-customers & naut-preview
```tsx
// Lines 4-4 - Inline props
export default function MadonnaBanner(props: { href: string, edit: boolean, image?: string, reference: any }) {

// Line 10 - Correct Tailwind syntax
<svg className="!duration-0 text-white w-8 h-8 sm:w-10 sm:h-10" ...
```
**Correct:** Proper Tailwind important modifier placement

---

### 10. `headers/GoyaHeader.tsx` (Missing in naut-preview)

#### naut-site
```tsx
// Lines 8-15 - Separate interface
interface Props {
  edit: boolean;
  reference: any;
  title: string;
  navigation: { name: string; href: string }[];
  navigationTitle: string;
  description: string;
}

export default function GoyaHeader(props: Props) {
```

#### naut-customers
```tsx
// Lines 8-15 - Inline props
export default function GoyaHeader(props: {
  edit: boolean;
  reference: any;
  title: string;
  navigation: { name: string; href: string }[];
  navigationTitle: string;
  description: string;
}) {
```

**Functionality:** Complex header component with:
- Full-screen black overlay on initial load (7.5 seconds)
- Rich text editor support
- Navigation menu overlay
- Custom styled-jsx for rich text formatting
- PopupEditor integration for editing
- Hidden form inputs for data persistence

**Why missing in naut-preview:** Likely too complex for preview environment.

---

### 11. `footers/ChecoFooter.tsx`

#### naut-site
```tsx
// Lines 68-72 - Separate interface
interface Props {
  navigation: { name: string; href: string }[];
  social: { name: string; href: string }[];
  edit: boolean;
}

export default function ChecoFooter(props: Props) {

// Line 116 - Hardcoded year
en 2025
```

#### naut-customers
```tsx
// Lines 68-68 - Inline props with `any` type
export default function ChecoFooter(props: any) {

// Line 110 - Hardcoded year
en 2024
```

#### naut-preview
```tsx
// Lines 68-72 - Separate interface (exported)
export interface Props {
  navigation: { name: string; href: string }[];
  social: { name: string; href: string }[];
  edit: boolean;
}

export default function ChecoFooter(props: Props) {

// Line 116 - Dynamic year
en {new Date().getFullYear()}
```

**Key Differences:**
1. **Type safety:** naut-customers uses `any`, others use proper interface
2. **Year display:** naut-preview dynamically calculates year, others are hardcoded
3. **Export:** naut-preview exports the Props interface

---

### 12. `cms/article/MoscatiBlock.tsx` - Import Path Differences

#### naut-site & naut-preview
```tsx
// Line 3
import { cmsEntry, cmsType, cmsEntryContent, cmsField, cmsCategory, cmsEntryCategory } from "@naut/schemas";
```

#### naut-customers
```tsx
// Line 3
import { cmsEntry, cmsType, cmsEntryContent, cmsField, cmsCategory, cmsEntryCategory } from "@/db/schema";
```

**Key Difference:** 
- naut-site and naut-preview use monorepo package `@naut/schemas`
- naut-customers uses local schema import `@/db/schema`

**Also:**
- naut-site: Line 43 uses `z-5` (incorrect - should be `z-[5]`)
- naut-customers & naut-preview: Line 43 uses `z-[5]` (correct Tailwind syntax)

**Same pattern applies to:**
- `cms/category/AcutisBlock.tsx`
- `cms/home/JuanDiegoBlock.tsx`

---

### 13. `heroes/BowieHero.tsx`

#### naut-site
```tsx
// Lines 1-5 - Full interface
interface Props {
  edit: boolean;
  reference: any;
}

export default function BowieHero(props: Props) {
  return (
    <h1>Bowie</h1>
  )
}
```

#### naut-customers & naut-preview
```tsx
// No props, no interface
export default function BowieHero() {
  return (
    <h1>Bowie</h1>
  )
}
```

**Key Difference:** naut-site version accepts props but doesn't use them, while others have no props.

---

### 14. `app-card.tsx`, `app-form.tsx`, `form-wrapper.tsx`, etc.

These files appear to be **identical** across all three applications. They are shared utilities/components.

---

## Summary of Pattern Differences

### 1. TypeScript Interface Patterns

| Application | Pattern | Example |
|------------|---------|---------|
| **naut-site** | Separate `interface Props` | `interface Props { ... }`<br>`export default function Component(props: Props)` |
| **naut-customers** | Inline props definition | `export default function Component(props: { ... })` |
| **naut-preview** | Mixed - inline props, but some exported interfaces | Similar to naut-customers, but exports interfaces in some cases |

### 2. Tailwind CSS Syntax Issues

#### naut-site Issues:
- `relative!` → should be `!relative`
- `duration-0!` → should be `!duration-0`
- `aspect-7/5` → should be `aspect-[7/5]`
- `outline-hidden` → should be `outline-none`
- `z-5` → should be `z-[5]`

#### naut-customers & naut-preview:
- All use correct Tailwind syntax

### 3. Import Path Differences

| Component Type | naut-site | naut-customers | naut-preview |
|---------------|-----------|----------------|--------------|
| CMS schemas | `@naut/schemas` | `@/db/schema` | `@naut/schemas` |

### 4. Animation Library Usage

- **naut-site & naut-customers:** Use `framer-motion` extensively in blocks
- **naut-preview:** No `framer-motion` usage (performance optimization)

### 5. Functionality Differences

| Feature | naut-site | naut-customers | naut-preview |
|---------|-----------|----------------|--------------|
| CMS sidebar menu | ❌ | ✅ | ❌ |
| Domain-aware routing | ❌ | ❌ | ✅ |
| UserButton (Clerk) | ✅ | ✅ | ❌ (commented) |
| Framer Motion animations | ✅ | ✅ | ❌ |
| Year in footer | Hardcoded (2025) | Hardcoded (2024) | Dynamic |
| CTA buttons in blocks | ✅ | ✅ | ❌ (in VerneBlock) |

---

## Detailed File-by-File Comparison

### Identical Files (Across All Three)
These files are identical in all three applications:
- `app-card.tsx`
- `app-form.tsx`
- `form-wrapper.tsx`
- `form-alert-dialog.tsx`
- `popup-editor.tsx`
- `submit-button.tsx`
- `image/Image.tsx`
- `video/YtVideo.tsx`
- Most `text/*` components (RichText, Text, etc.)
- Most `ui/*` components (except badge, calendar, dropdown-menu, pagination, popover, switch)

### Files with Minor Differences
These files differ only in TypeScript patterns or Tailwind syntax:
- All 47 block components (except missing ones in naut-preview)
- Both banner components
- All 4 footer components
- All 12 hero components
- All 8 header components (except GoyaHeader missing in naut-preview)
- `link/Link.tsx`
- `app-sidebar.tsx`

### Files with Significant Differences
- `blocks/VerneBlock.tsx` - Animation differences (naut-preview has no animations)
- `cms/*` components - Import path differences
- `footers/ChecoFooter.tsx` - Year display and type differences

---

## Code Quality Issues Summary

### naut-site Issues:
1. **Tailwind Syntax Errors:**
   - `relative!` → `!relative` (Link.tsx)
   - `duration-0!` → `!duration-0` (MadonnaBanner.tsx)
   - `aspect-7/5` → `aspect-[7/5]` (All block components)
   - `outline-hidden` → `outline-none` (button.tsx)
   - `z-5` → `z-[5]` (MoscatiBlock.tsx)

2. **TypeScript Patterns:**
   - Uses separate interface definitions (consistent but verbose)

### naut-customers Issues:
1. **Type Safety:**
   - `ChecoFooter.tsx` uses `any` type instead of proper interface

2. **Import Paths:**
   - Uses local schema imports instead of monorepo package

### naut-preview Issues:
1. **Missing Components:**
   - 3 block components missing
   - 1 header component missing

2. **Reduced Functionality:**
   - No animations (performance optimization)
   - Missing CTA functionality in some blocks

---

## Recommendations

### High Priority

1. **Fix Tailwind Syntax in naut-site:**
   - Search and replace all instances of incorrect syntax
   - `relative!` → `!relative`
   - `duration-0!` → `!duration-0`
   - `aspect-7/5` → `aspect-[7/5]`
   - `outline-hidden` → `outline-none`
   - `z-5` → `z-[5]`

2. **Standardize Import Paths:**
   - Consider unifying CMS schema imports to use `@naut/schemas` package
   - Or document why naut-customers uses local imports

3. **Fix Type Safety:**
   - Replace `any` type in `ChecoFooter.tsx` (naut-customers) with proper interface

### Medium Priority

4. **Standardize TypeScript Patterns:**
   - Decide on one pattern (separate interfaces vs inline props)
   - Apply consistently across all apps

5. **Sync Missing Components:**
   - Evaluate if missing components in naut-preview should be added
   - Document why they're excluded if intentional

6. **Standardize Footer Year:**
   - Use dynamic year calculation (`new Date().getFullYear()`) in all apps

### Low Priority

7. **Component Documentation:**
   - Document why naut-preview has DomainLink
   - Document why UserButton is commented out
   - Document CMS functionality differences

8. **Consider Shared Components:**
   - Many components differ only in minor ways
   - Consider extracting shared components to monorepo package
   - Use conditional rendering for app-specific differences

---

## Statistics

- **Total files analyzed:** 118-124 per application
- **Files with differences:** ~97-101 files
- **Identical files:** ~20-30 files
- **Files only in one app:** 7 files (6 in naut-customers, 1 in naut-preview)
- **Files missing in naut-preview:** 4 files
- **Tailwind syntax errors in naut-site:** ~5 patterns across multiple files
- **TypeScript pattern differences:** All block components differ
- **Import path differences:** 3 CMS components

---

## Conclusion

The components folders across the three applications share significant code but have diverged in several ways:

1. **Code Quality:** naut-site has multiple Tailwind syntax errors that need fixing
2. **Architecture:** Different import strategies (monorepo packages vs local imports)
3. **Functionality:** Each app has unique features (CMS menus, domain routing, etc.)
4. **Performance:** naut-preview intentionally reduces features (animations, complex components)
5. **Type Safety:** Inconsistent TypeScript patterns and some use of `any` types

The differences suggest these applications serve different purposes:
- **naut-site:** Main application (may need code quality fixes)
- **naut-customers:** Extended with CMS functionality
- **naut-preview:** Lightweight preview version with domain routing

Most differences are intentional adaptations for each app's specific needs, but some represent code quality issues that should be addressed.
