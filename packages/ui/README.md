# @naut/ui

Shared UI components package for Naut applications.

## Overview

This package contains all shared React components used across the Naut monorepo applications:
- `naut-site`
- `naut-customers`
- `naut-preview`

## Installation

This package is part of the Naut monorepo and uses pnpm workspaces. Install dependencies from the root:

```bash
pnpm install
```

## Usage

Import components from the package:

```tsx
import { AppCard, Text, Image, AchebeBlock } from '@naut/ui';
```

Or import specific components:

```tsx
import AchebeBlock from '@naut/ui/blocks/AchebeBlock';
```

## Development

Build the package:

```bash
cd packages/ui
pnpm build
```

Watch mode:

```bash
cd packages/ui
pnpm dev
```

## Structure

```
packages/ui/
├── src/
│   ├── components/     # All React components
│   ├── hooks/          # Shared React hooks
│   ├── utils/          # Utility functions
│   └── index.ts        # Main barrel export
└── dist/               # Compiled output
```

## Components

### Base Components
- AppCard, AppForm, AppSidebar
- FormAlertDialog, FormWrapper
- PopupEditor, SubmitButton

### UI Components (shadcn/ui)
- Button, Card, Dialog, etc.

### Content Components
- Blocks (47+ block components)
- Headers (8 header components)
- Heroes (12 hero components)
- Footers (4 footer components)
- Banners (2 banner components)

### CMS Components
- Article, Category, Home blocks

### Other
- Link, Image, Text, Video components

## License

Internal package for Naut monorepo.

