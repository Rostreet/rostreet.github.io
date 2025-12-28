# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Start the development server (default port 3000):
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run production server:
```bash
npm start
```

Lint code:
```bash
npm run lint
```

## Project Architecture

This is a personal blog built with **Next.js 16** using the **App Router** architecture and **React Server Components**.

### Tech Stack

- **Next.js 16.1.1** - App Router with React Server Components
- **React 19.2.3** - Latest React with improved Server Components
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first CSS framework
- **lucide-react** - Icon library

### Directory Structure

```
app/
├── layout.tsx          # Root layout with Navigation and Footer
├── page.tsx            # Homepage with post listing and infinite scroll
├── globals.css         # Global styles with CSS variables for theming
├── about/
│   └── page.tsx        # About page
└── posts/
    ├── page.tsx        # Posts index page
    └── [slug]/
        └── page.tsx    # Dynamic blog post pages with SSG
components/
├── Navigation.tsx      # Sticky navigation with dark mode toggle (client component)
├── Footer.tsx          # Site footer
├── ReadingProgressBar.tsx  # Reading progress indicator (client component)
├── BackToTop.tsx       # Scroll to top button (client component)
├── TableOfContents.tsx # Article table of contents (client component)
├── ShareButton.tsx     # Native share functionality (client component)
└── PostCardSkeleton.tsx # Loading skeleton for post cards
lib/
└── theme.ts            # Theme utilities (currently unused)
```

## Important: Next.js 16 Breaking Changes

### params is Now a Promise

In Next.js 16, the `params` prop in dynamic routes is now a **Promise** and must be awaited:

```typescript
// ❌ Old way (doesn't work in Next.js 16)
export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  // ...
}

// ✅ Correct way for Next.js 16
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  // ...
}
```

**Error Message**: If you see "Route used `params.slug`. `params` is a Promise and must be unwrapped with `await`", you need to await the params.

### Server Components Cannot Use Event Handlers

Server Components cannot contain interactive elements like `onClick`, `onChange`, etc. These must be moved to Client Components:

```typescript
// ❌ Wrong: Event handler in Server Component
export default function BlogPost() {
  return (
    <button onClick={() => console.log('click')}>
      Click me
    </button>
  );
}

// ✅ Correct: Move to Client Component
// components/ShareButton.tsx
'use client';
export default function ShareButton() {
  return (
    <button onClick={() => console.log('click')}>
      Click me
    </button>
  );
}
```

## Key Architecture Patterns

### 1. Server vs Client Components

**Server Components** (default):
- `app/layout.tsx`
- `app/page.tsx`
- `app/posts/[slug]/page.tsx` (async function with awaited params)

**Client Components** (use `'use client'` directive):
- `components/Navigation.tsx` - Theme switching and pathname detection
- `components/ReadingProgressBar.tsx` - Scroll tracking and state
- `components/BackToTop.tsx` - Scroll visibility and click handler
- `components/TableOfContents.tsx` - IntersectionObserver for active heading
- `components/ShareButton.tsx` - Navigator.share API
- `components/PostCardSkeleton.tsx` - Loading state
- `app/page.tsx` - Infinite scroll and filtering

### 2. Theming System

- Uses CSS custom properties for light/dark mode
- Theme state persisted in localStorage
- Anti-FOUC (flash of unstyled content) script in `app/layout.tsx` head
- CSS variables defined in `app/globals.css` with `.dark` class selector

### 3. Styyling Approach

- **Tailwind CSS v4** with inline theme configuration using `@theme inline`
- **Transparent backgrounds** for UI elements (TableOfContents, BackToTop, ShareButton)
- CSS custom properties mapped to Tailwind colors
- Paper texture effects using SVG filters in `app/globals.css`
- Custom animations (`animate-fade-in`, `animate-slide-in`)

### 4. Data Management

- Posts are currently hardcoded in `app/page.tsx` and `app/posts/[slug]/page.tsx`
- Uses `generateStaticParams()` for static generation of blog post pages
- Category filtering and search handled client-side in homepage
- All blog post pages are pre-rendered at build time (SSG)

### 5. Path Aliases

- `@/*` maps to project root (configured in `tsconfig.json`)

## Component Details

### ReadingProgressBar

Fixed position bar at the top showing scroll progress through the article.

### BackToTop

Floating button that appears after scrolling down 300px, uses transparent background with border.

### TableOfContents

- Automatically extracts headings from article content
- Highlights active heading based on scroll position
- Uses IntersectionObserver API
- No background color, transparent design
- Smooth scroll to heading on click

### ShareButton

Uses the native Web Share API (`navigator.share`) for sharing functionality.

## Theme Implementation Details

The blog has a custom paper-texture visual design:

- Background uses SVG noise filter for texture
- Radial gradients for vignette effect
- Cards have backdrop blur and subtle shadows
- Different opacity values for dark mode (`body::before` opacity: 0.4 light, 0.15 dark)
- UI elements use transparent backgrounds with borders for consistency

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- `jsx: "react-jsx"` for new JSX transform
- Path alias: `@/*` -> `./*`

## Language and Content

- **Primary language**: Chinese (zh-CN)
- Blog author: Zhai Changhao (全栈开发者 - Full Stack Developer)
- Content categories include: 前端开发, React, TypeScript

## Common Tasks

### Adding a New Blog Post

1. Add post metadata to `app/page.tsx` in the `allPosts` array
2. Add post content to `app/posts/[slug]/page.tsx` in the `posts` object
3. Use the same slug in both places
4. The post will be automatically generated on next build

### Modifying Styles

- Global styles: `app/globals.css`
- Component styles: Use Tailwind utility classes
- Theme colors: Defined in `app/globals.css` CSS variables

### Debugging Tips

- If dynamic route shows "文章未找到", check if params is properly awaited
- If event handlers don't work, ensure component has `'use client'` directive
- Check browser console for Hydration errors (mismatch between server and client)
