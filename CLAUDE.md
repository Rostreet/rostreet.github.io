# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Start the development server (default port 3000):
```bash
bun run dev
```

Build for production (static export):
```bash
bun run build
```

Build and check deployment readiness:
```bash
bun run deploy
```

Run production server:
```bash
bun start
```

Lint code:
```bash
bun run lint
```

Install dependencies:
```bash
bun install
```

## Deployment

This project is configured to deploy to **GitHub Pages** using GitHub Actions.

### Quick Deploy

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings (Source: GitHub Actions)
3. GitHub Actions will automatically build and deploy on push to `main` branch
4. Access your blog at `https://your-username.github.io/` or `https://your-username.github.io/repo-name/`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Architecture

This is a personal blog built with **Next.js 16** using the **App Router** architecture and **React Server Components**, powered by **Bun** for fast development and builds.

### Tech Stack

- **Bun** - Fast JavaScript runtime and package manager (replaces Node.js and npm)
- **Next.js 16.1.1** - App Router with React Server Components
- **React 19.2.3** - Latest React with improved Server Components
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first CSS framework
- **lucide-react** - Icon library

### Directory Structure

```
app/
├── layout.tsx          # Root layout with Navigation and Footer
├── page.tsx            # Homepage with post listing, search, and filtering
├── globals.css         # Global styles with CSS variables for theming
├── about/
│   └── page.tsx        # About page
├── photography/
│   └── page.tsx        # Photography portfolio page with masonry layout
└── posts/
    ├── page.tsx        # Posts index page
    └── [slug]/
        └── page.tsx    # Dynamic blog post pages with SSG
components/
├── Navigation.tsx      # Sticky navigation with dark mode toggle and RSS icon (client component)
├── Footer.tsx          # Site footer (minimal design)
├── Icons.tsx           # Custom icon components (Bilibili, Juejin)
├── ReadingProgressBar.tsx  # Reading progress indicator (client component)
├── BackToTop.tsx       # Scroll to top button (client component)
├── TableOfContents.tsx # Article table of contents (client component)
├── ShareButton.tsx     # Native share functionality (client component)
└── PostCardSkeleton.tsx # Loading skeleton for post cards
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
- `app/page.tsx` - Infinite scroll, search, and filtering
- `app/photography/page.tsx` - Photo gallery with modal and state management

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
- Custom animations:
  - `animate-fade-in` - Fade in with slight upward movement
  - `animate-slide-in` - Slide in from right
  - `animate-waterfall` - Waterfall effect from top (used in photography page)

### 4. Data Management

- Posts are currently hardcoded in `app/page.tsx` and `app/posts/[slug]/page.tsx`
- Photography works are hardcoded in `app/photography/page.tsx`
- Uses `generateStaticParams()` for static generation of blog post pages
- Category filtering and search handled client-side in homepage with:
  - Real-time result statistics
  - Category badges showing post count
  - Keyboard navigation support (Tab key)
  - Integrated search and filter UI
- All blog post pages are pre-rendered at build time (SSG)

### 5. Path Aliases

- `@/*` maps to project root (configured in `tsconfig.json`)

### 6. Custom Icons

- **Custom SVG icons** are centralized in `components/Icons.tsx`
- Includes social media icons: `BilibiliIcon`, `JuejinIcon`
- Icons accept `className` prop for consistent styling with Tailwind classes
- Used throughout the app (Footer, About page) alongside lucide-react icons

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

### Footer

Minimal site footer containing:
- Copyright information with dynamic year
- Clean, simple design (no social links)
- Responsive layout with centered content

### Photography Page

Photo portfolio page (`app/photography/page.tsx`):
- **Masonry Layout**: CSS columns with 5 columns per row
- **Waterfall Animation**: Photos flow down from top with staggered delays
- **Photo Modal**: Click to open detailed view with:
  - Left side: Large photo display
  - Right side: Photo metadata (location, date, camera, lens, description)
- **Responsive Design**: Photos have varying heights (200-320px)
- **Hover Effects**: Scale transform and gradient overlay

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

## Code Style

- **Double quotes** for strings and imports (consistent with Prettier/ESLint config)
- **Trailing commas** in multi-line arrays/objects
- **Semicolons** required
- Use **TypeScript strict mode** for type safety

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

### Adding Photography Works

1. Add photo data to `app/photography/page.tsx` in the `photos` array
2. Each photo object should include:
   - `id`: Unique identifier
   - `src`: Image URL
   - `title`: Photo title
   - `location`: Shooting location
   - `date`: Shooting date
   - `description`: Photo description
   - `camera`: Camera model
   - `lens`: Lens (optional)
   - `height`: Photo height in pixels (for masonry layout)
3. Photos will automatically display in masonry layout with waterfall animation

### Generating RSS Feed

The blog automatically generates RSS feed during build time. To manually regenerate:

```bash
bun run generate-rss
```

The RSS feed includes:
- All blog posts with full content
- Article metadata (title, date, category, author)
- Generated at `public/rss.xml`
- Accessible at `/rss.xml` on the deployed site

### Adding or Updating Social Links

The blog has social links in the About page (`app/about/page.tsx`):
- Update the social link `<a>` tags in the contact section
- Import necessary icons from lucide-react or `@/components/Icons`

To add a new social media platform:
1. Create a custom icon in `components/Icons.tsx` if not available in lucide-react
2. Import the icon in the About page
3. Add the link with proper href and aria-label

Note: The Footer is minimal and does not contain social links.

### Modifying Styles

- Global styles: `app/globals.css`
- Component styles: Use Tailwind utility classes
- Theme colors: Defined in `app/globals.css` CSS variables

### Debugging Tips

- If dynamic route shows "文章未找到", check if params is properly awaited
- If event handlers don't work, ensure component has `'use client'` directive
- Check browser console for Hydration errors (mismatch between server and client)

### Adding Custom Icons

The project uses custom SVG icons for social media platforms. To add a new custom icon:

1. Create the icon component in `components/Icons.tsx`:

```typescript
export const CustomIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="..." fill="currentColor" />
  </svg>
);
```

2. Import and use the icon in any component:

```typescript
import { CustomIcon } from "./Icons";

// Usage
<CustomIcon className="w-5 h-5" />
```

**Available custom icons:**
- `BilibiliIcon` - Bilibili social media platform
- `JuejinIcon` - Juejin (稀土掘金) technical community
