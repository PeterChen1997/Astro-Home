# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` or `npm start` - Starts the Astro development server
- **Build**: `npm run build` - Builds the production version of the site
- **Preview**: `npm run preview` - Preview the built site locally (serves on all interfaces)
- **Static serve**: `npm run serve` - Serves the built dist folder using http-server
- **Storybook**: `npm run storybook` - Starts Storybook development server on port 6006
- **Build Storybook**: `npm run build-storybook` - Builds the Storybook static version

## Project Architecture

This is an Astro-based personal blog site with the following key characteristics:

### Core Framework & Integrations
- **Astro** as the main framework with island architecture
- **React** integration for interactive components
- **Tailwind CSS** for styling with dark mode support
- **Image optimization** using `@astrojs/image` and `astro-imagetools`
- **Content compression** via `astro-compress` (images excluded)

### Content Structure
- **Blog posts**: Stored as Markdown files in `src/pages/posts/*.md`
- **Pages**: Main pages in `src/pages/` (index.astro, posts.astro, projects.astro, links.astro)
- **Components**: Reusable Astro components in `src/components/`
- **Layouts**: Blog posts use `src/layouts/BlogPost.astro` layout

### Key Components
- `BaseHead.astro` - SEO meta tags and head elements
- `Header.astro` - Site navigation
- `Footer.astro` - Site footer
- `Main.astro` - Main content wrapper
- `PostCard.astro` - Blog post preview cards
- `Content.astro` - Content wrapper for blog posts
- `Comments` - Comment functionality (React component)
- `Subscribe` - Email subscription (React component)
- `ViewedCount` - Page view counter

### Styling System
- **Tailwind CSS** with class-based dark mode
- **Custom markdown styling** via `rehype-add-classes` plugin in astro.config.mjs
- **Responsive design** with mobile-first approach
- **Dark mode**: Toggle via class addition to HTML element

### Content Features
- **Blog posts**: Sorted by publication date, support for hero images, reading time calculation
- **RSS feed**: Available via `@astrojs/rss`
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **Image optimization**: Automatic optimization for all images

### Configuration
- **Site config**: Basic site settings in `src/config.ts`
- **Astro config**: Main configuration in `astro.config.mjs`
- **Tailwind config**: Basic config with dark mode enabled in `tailwind.config.cjs`

### Static Assets
- **Public folder**: Contains static images, audio files, and assets
- **Image assets**: Organized in `public/assets/imgs/` with hash-based filenames

### Interactive Features
- **Comments system**: React-based comments component
- **Email subscription**: Newsletter signup functionality
- **View tracking**: Page view counting system
- **Storybook**: Component documentation and testing

The site follows Astro's island architecture where most content is static by default, with interactive React components loaded only when needed using `client:*` directives.