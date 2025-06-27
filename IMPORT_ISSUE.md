# Import Path Issue - Need Help

## Problem Description
The application builds successfully but has runtime import path issues with shadcn/ui components.

## Error Details
```
Module not found: Can't resolve '@/lib/utils'
```

## Current Setup

### File Structure
```
app/
├── components/
│   └── ui/
│       ├── button.tsx (❌ Import error)
│       ├── card.tsx (❌ Import error)
│       ├── dialog.tsx (❌ Import error)
│       ├── input.tsx (❌ Import error)
│       └── badge.tsx (❌ Import error)
├── lib/
│   └── utils.ts (✅ File exists)
└── page.tsx
```

### Current Import Statements
```typescript
// In UI components:
import { cn } from "@/lib/utils"; // ❌ Not resolving
```

### Fixed Import Statements (Working)
```typescript
// What works:
import { cn } from "../../lib/utils"; // ✅ Relative path works
```

### TypeScript Config
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Build Status
- ✅ `npm run build` - Succeeds
- ❌ `npm run dev` - Runtime import errors
- ✅ Relative imports work fine

## What Works
- Build process completes successfully
- Relative imports resolve correctly
- All functionality works when imports are fixed

## Need Help With
1. Why `@/lib/utils` path alias doesn't resolve at runtime
2. How to properly configure Next.js 14.2.3 path aliases
3. Best practice for shadcn/ui component imports

## Environment
- Next.js: 14.2.3
- TypeScript: Latest
- Node.js: Latest
- shadcn/ui components with path aliases

## Repository
https://github.com/b1rdmania/launch-layer-mvp-propulsion-dex

## Current Workaround
Using relative imports instead of path aliases, but would prefer to use the standard `@/` alias pattern. 