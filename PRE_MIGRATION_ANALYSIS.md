# Pre-Migration Analysis: Components Usage & Import Paths

**Date:** $(date +%Y-%m-%d)  
**Branch:** `migration/components-to-ui-package`  
**Status:** Pre-Migration Phase Complete ✅

---

## Executive Summary

This document captures the current state of components across all three applications before migration to `@naut/ui` package.

### Statistics
- **Total files using `@/components` imports:** 92 files
- **Total import statements:** 483 matches
- **Components in naut-site:** 118 files
- **Components in naut-customers:** 124 files  
- **Components in naut-preview:** 115 files
- **Unique components only in naut-customers:** 6 (UI components)
- **Unique components only in naut-preview:** 1 (DomainLink)

---

## 1. Component Inventory

### 1.1 Base Components (Root Level)
All apps have these components:
- `app-card.tsx`
- `app-form.tsx`
- `app-sidebar.tsx`
- `form-alert-dialog.tsx`
- `form-wrapper.tsx`
- `popup-editor.tsx`
- `submit-button.tsx`

### 1.2 Banner Components
- `MadonnaBanner.tsx` (all apps)
- `SheeranBanner.tsx` (all apps)

### 1.3 Block Components
Total: 47 unique block components

**All apps have:**
- AchebeBlock, AquinoBlock, AsimovBlock, AustenBlock, BronteBlock, CervantesBlock, CollinsBlock, DalioBlock, DickensBlock, DoyleBlock, DubnerBlock, DumasBlock, FitzgeraldBlock, ForteBlock, GladwellBlock, GoldingBlock, GrahamBlock, GreeneBlock, HarariBlock, HerbertBlock, HorowitzBlock, JohnBlock, KingBlock, KnightBlock, LevittBlock, LuBlock, LukeBlock, MalkielBlock, MarkBlock, MatthewBlock, MorinBlock, OrwellBlock, PragerBlock, ProustBlock, RandBlock, RiordanBlock, SciasciaBlock, ShakespeareBlock, SoleHerbertBlock, SubyBlock, ThielBlock, VargasBlock, VerneBlock, YarrosBlock

**Only in naut-site & naut-customers (missing in naut-preview):**
- DostoevskyBlock.tsx
- SertillangesBlock.tsx
- StevensonBlock.tsx

### 1.4 CMS Components
All apps have:
- `cms/article/MoscatiBlock.tsx`
- `cms/category/AcutisBlock.tsx`
- `cms/home/JuanDiegoBlock.tsx`

### 1.5 Footer Components
All apps have:
- ChecoFooter.tsx
- HamiltonFooter.tsx
- LaudaFooter.tsx
- SennaFooter.tsx

### 1.6 Header Components
**All apps have:**
- KoepkaHeader.tsx
- MatsuyamaHeader.tsx
- MickelsonHeader.tsx
- OchoaHeader.tsx
- OrtizHeader.tsx
- RoryHeader.tsx
- TigerHeader.tsx

**Only in naut-site & naut-customers:**
- GoyaHeader.tsx

### 1.7 Hero Components
All apps have:
- BowieHero.tsx
- DylanHero.tsx
- GilmourHero.tsx
- GrohlHero.tsx
- HendrixHero.tsx
- JaggerHero.tsx
- LennonHero.tsx
- MercuryHero.tsx
- PetersonHero.tsx
- TurnerHero.tsx
- VanhalenHero.tsx
- WatersHero.tsx

### 1.8 Image Components
All apps have:
- `image/Image.tsx`

### 1.9 Link Components
**All apps have:**
- IconLink.tsx
- Link.tsx
- LinkWrapper.tsx
- LoadingLink.tsx

**Only in naut-preview:**
- DomainLink.tsx (critical for multi-tenant routing)

### 1.10 Text Components
All apps have:
- RichText.tsx
- RichTextReader.tsx
- SmallRichTextReader.tsx
- StrongText.tsx
- Text.tsx

### 1.11 UI Components (shadcn/ui)
**All apps have:**
- accordion.tsx
- alert-dialog.tsx
- avatar.tsx
- button.tsx
- card.tsx
- dialog.tsx
- drawer.tsx
- flip-words.tsx
- form.tsx
- input.tsx
- label.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- table.tsx
- textarea.tsx
- toast.tsx
- toaster.tsx
- tooltip.tsx
- typography.tsx

**Only in naut-customers:**
- badge.tsx
- calendar.tsx
- dropdown-menu.tsx
- pagination.tsx
- popover.tsx
- switch.tsx

### 1.12 Video Components
All apps have:
- `video/YtVideo.tsx`

### 1.13 Header Link Components
All apps have:
- HeaderIconLink.tsx
- Headerlink.tsx

---

## 2. Import Path Analysis

### 2.1 Import Pattern Statistics
- **Total files with `@/components` imports:** 92 files
- **Total import statements:** 483 matches
- **Most common pattern:** `import ComponentName from "@/components/category/ComponentName"`

### 2.2 Import Categories

#### Static Imports (Most Common)
```tsx
import TigerHeader from "@/components/headers/TigerHeader";
import ChecoFooter from "@/components/footers/ChecoFooter";
import HendrixHero from "@/components/heroes/HendrixHero";
import AchebeBlock from "@/components/blocks/AchebeBlock";
```

**Files with most imports:**
- `apps/naut-site/app/[[...page]]/page.tsx` - 71 imports
- `apps/naut-preview/app/[domain]/page.tsx` - 67 imports
- `apps/naut-preview/app/[domain]/[...page]/page.tsx` - 67 imports
- `apps/naut-customers/app/editor/[domain]/[[...page]]/page.tsx` - 72 imports

#### Dynamic Imports (Special Case)
**Location:** `apps/naut-preview/app/components/[category]/page.tsx`

**Pattern:**
```tsx
import(`@/components/banners/${component.name}`);
import(`@/components/blocks/${component.name}`);
import(`@/components/footers/${component.name}`);
import(`@/components/headers/${component.name}`);
import(`@/components/heroes/${component.name}`);
```

**Note:** This dynamic import pattern will need special handling during migration to support the preview app's component gallery.

### 2.3 Files Using Components (By Category)

#### App Pages (Main consumers)
- `apps/naut-site/app/[[...page]]/page.tsx` - 71 component imports
- `apps/naut-preview/app/[domain]/page.tsx` - 67 component imports
- `apps/naut-preview/app/[domain]/[...page]/page.tsx` - 67 component imports
- `apps/naut-customers/app/editor/[domain]/[[...page]]/page.tsx` - 72 component imports
- `apps/naut-customers/app/sitio/[domain]/layout.tsx` - 2 imports
- `apps/naut-customers/app/page.tsx` - 1 import

#### Component Files (Internal dependencies)
- Component files import from other components using relative paths
- Examples: `../text/Text`, `../image/Image`, `../link/Link`

#### CMS Pages
- `apps/naut-customers/app/sitio/[domain]/cms/[type]/nuevo/new-entry-form.tsx` - 7 imports
- `apps/naut-customers/app/sitio/[domain]/cms/[type]/editar/[entryId]/edit-entry-form.tsx` - 9 imports
- `apps/naut-customers/app/sitio/[domain]/cms/[type]/[page]/page.tsx` - 4 imports

#### Other Pages
- `apps/naut-customers/app/sitio/[domain]/paginas/page.tsx` - 3 imports
- `apps/naut-customers/app/sitio/[domain]/analytics/page.tsx` - 4 imports

---

## 3. Component Usage Patterns

### 3.1 Static Component Mapping
**Location:** `apps/naut-site/app/[[...page]]/page.tsx` and similar files

Large switch/case or object mapping that maps component names to actual imports:
```tsx
const componentMap = {
  TigerHeader,
  ChecoFooter,
  HendrixHero,
  // ... 70+ components
};
```

### 3.2 Dynamic Component Loading
**Location:** `apps/naut-preview/app/components/[category]/page.tsx`

Uses `next/dynamic` with template strings to load components dynamically:
```tsx
const importers = {
  [component.name]: dynamic(() => import(`@/components/category/${component.name}`))
};
```

### 3.3 Component Registry
**Location:** `apps/naut-preview/nautComponents.ts`

Defines component metadata and props for preview functionality:
- Categories: banners, blocks, footers, headers, heroes
- Each component has name and default props

---

## 4. Special Considerations

### 4.1 App-Specific Features

#### naut-preview: DomainLink
- **File:** `apps/naut-preview/components/link/DomainLink.tsx`
- **Purpose:** Multi-tenant routing - prefixes links with domain
- **Usage:** Used in `Link.tsx` component
- **Migration Note:** Must preserve this functionality, make it optional/configurable

#### naut-customers: CMS Sidebar Menu
- **File:** `apps/naut-customers/components/app-sidebar.tsx`
- **Feature:** Includes CMS menu items based on CMS types
- **Migration Note:** Make CMS menu optional via props

#### naut-preview: Dynamic Component Imports
- **File:** `apps/naut-preview/app/components/[category]/page.tsx`
- **Feature:** Dynamically imports components for preview gallery
- **Migration Note:** Must support dynamic imports from `@naut/ui` package

### 4.2 Database Dependencies (CMS Components)
**Affected Components:**
- `cms/article/MoscatiBlock.tsx`
- `cms/category/AcutisBlock.tsx`
- `cms/home/JuanDiegoBlock.tsx`

**Current Pattern:**
```tsx
import { db } from "@/db";
import { cmsEntry, cmsType } from "@naut/schemas";
```

**Migration Solution:** Use factory pattern with dependency injection (see migration plan)

### 4.3 Tailwind Configuration Differences
- **naut-site:** Uses Tailwind v4
- **naut-customers:** Uses Tailwind v3
- **naut-preview:** Uses Tailwind v3

**Migration Note:** All apps need to scan `packages/ui/src/**/*` in their Tailwind configs

---

## 5. Backup Information

### 5.1 Component Folders Backup
All component folders are preserved in their current locations:
- `apps/naut-site/components/` - 118 files
- `apps/naut-customers/components/` - 124 files
- `apps/naut-preview/components/` - 115 files

**Backup Strategy:** 
- ✅ Git branch created: `migration/components-to-ui-package`
- ✅ Components remain in place until migration is complete and tested
- ✅ Can be restored from git history if needed

### 5.2 Import Path Backup
All current import paths documented above. Migration will:
1. Keep old imports working temporarily (if needed)
2. Gradually replace with `@naut/ui` imports
3. Remove old component folders only after successful migration

---

## 6. Component File Count by Category

| Category | naut-site | naut-customers | naut-preview | Total Unique |
|----------|-----------|----------------|--------------|--------------|
| Blocks | 47 | 47 | 44 | 47 |
| Headers | 8 | 8 | 7 | 8 |
| Heroes | 12 | 12 | 12 | 12 |
| Footers | 4 | 4 | 4 | 4 |
| Banners | 2 | 2 | 2 | 2 |
| CMS | 3 | 3 | 3 | 3 |
| UI | 22 | 28 | 22 | 28 |
| Link | 4 | 4 | 5 | 5 |
| Text | 5 | 5 | 5 | 5 |
| Base | 7 | 7 | 7 | 7 |
| Other | 4 | 4 | 4 | 4 |
| **Total** | **118** | **124** | **115** | **~125** |

---

## 7. Migration Readiness Checklist

### Pre-Migration Tasks ✅
- [x] Created migration branch: `migration/components-to-ui-package`
- [x] Documented current component usage
- [x] Identified all import paths (483 matches across 92 files)
- [x] Analyzed component distribution across apps
- [x] Identified app-specific features
- [x] Documented dynamic import patterns
- [x] Identified database dependencies
- [x] Documented Tailwind configuration differences

### Next Steps
- [ ] Create `packages/ui` package structure
- [ ] Set up package.json and tsconfig.json
- [ ] Migrate components incrementally
- [ ] Update import paths in apps
- [ ] Test each app after migration
- [ ] Remove old component folders

---

## 8. Critical Migration Notes

### 8.1 Must Preserve
1. **DomainLink functionality** (naut-preview)
2. **CMS sidebar menu** (naut-customers)
3. **Dynamic import pattern** (naut-preview gallery)
4. **Database access** (CMS components)

### 8.2 Must Fix
1. **Tailwind syntax errors** (e.g., `relative!` → `!relative`)
2. **TypeScript interface exports** (for better type safety)
3. **Import path consistency** (use `@naut/schemas` not `@/db/schema`)

### 8.3 Must Configure
1. **Tailwind content paths** (add package path to all apps)
2. **Package exports** (support both barrel and individual exports)
3. **CMS component factory** (dependency injection pattern)

---

## 9. Files Requiring Special Attention

### High Priority (Many imports)
1. `apps/naut-site/app/[[...page]]/page.tsx` - 71 imports
2. `apps/naut-preview/app/[domain]/page.tsx` - 67 imports
3. `apps/naut-preview/app/[domain]/[...page]/page.tsx` - 67 imports
4. `apps/naut-customers/app/editor/[domain]/[[...page]]/page.tsx` - 72 imports

### Medium Priority (Special patterns)
1. `apps/naut-preview/app/components/[category]/page.tsx` - Dynamic imports
2. `apps/naut-preview/nautComponents.ts` - Component registry
3. `apps/naut-customers/components/app-sidebar.tsx` - CMS menu integration

### Component Files (Internal dependencies)
- All component files that import other components
- Need to update relative imports to work within package structure

---

## 10. Import Path Replacement Strategy

### Pattern 1: Static Imports
**Before:**
```tsx
import TigerHeader from "@/components/headers/TigerHeader";
```

**After:**
```tsx
import { TigerHeader } from "@naut/ui";
// OR
import TigerHeader from "@naut/ui/headers/TigerHeader";
```

### Pattern 2: Dynamic Imports
**Before:**
```tsx
import(`@/components/blocks/${component.name}`);
```

**After:**
```tsx
import(`@naut/ui/blocks/${component.name}`);
```

### Pattern 3: Component Registry
**Before:**
```tsx
import { nautComponents } from "@/nautComponents";
```

**After:**
```tsx
import { nautComponents } from "@naut/ui/registry";
// OR keep in app but update component paths
```

---

## Conclusion

This pre-migration analysis provides a complete picture of:
- ✅ All components and their locations
- ✅ All import paths and usage patterns  
- ✅ App-specific features that need preservation
- ✅ Special cases (dynamic imports, CMS, etc.)
- ✅ Migration readiness checklist

**Status:** Ready to proceed with Phase 1 (Package Setup & Structure)

---

**Document Version:** 1.0  
**Last Updated:** $(date +%Y-%m-%d)  
**Next Review:** After Phase 1 completion

