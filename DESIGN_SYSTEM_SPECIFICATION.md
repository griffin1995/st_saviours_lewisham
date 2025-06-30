# St Saviour's Website - Design System Specification

## Overview
This document defines the exact design system, colors, typography, and styling requirements for the St Saviour's Catholic Church website rebuild using 2025 best practices.

## Color Palette

### Primary Colors
- **Primary Blue**: `slate-900` (#0f172a) - Main brand color for headings, buttons, navigation
- **Gold Accent**: `gold-500` (#eab308) - Secondary accent color for highlights, CTAs
- **Background**: `white` (#ffffff) - Primary background for all content areas

### Supporting Colors
- **Text Primary**: `slate-900` (#0f172a) - Main headings and important text
- **Text Secondary**: `gray-600` (#4b5563) - Body text, descriptions, secondary content
- **Text Light**: `gray-500` (#6b7280) - Captions, metadata, subtle text

### Interaction Colors
- **Gold Hover**: `gold-600` (#d97706) - Hover state for gold elements
- **Blue Hover**: `slate-800` (#1e293b) - Hover state for blue elements
- **Success**: `green-600` (#059669)
- **Warning**: `amber-600` (#d97706)
- **Error**: `red-600` (#dc2626)

## Typography

### Font Families
- **Primary**: `font-serif` - For headings and elegant text
- **Secondary**: `font-sans` - For body text and UI elements
- **Monospace**: `font-mono` - For code and technical content

### Heading Scale
- **H1**: `text-4xl lg:text-6xl font-serif font-light text-slate-900`
- **H2**: `text-3xl lg:text-4xl font-serif font-light text-slate-900`
- **H3**: `text-2xl lg:text-3xl font-serif font-medium text-slate-900`
- **H4**: `text-xl lg:text-2xl font-serif font-medium text-slate-900`

### Body Text
- **Large**: `text-xl text-gray-600 leading-relaxed`
- **Regular**: `text-lg text-gray-600 leading-relaxed`
- **Small**: `text-base text-gray-600`
- **Caption**: `text-sm text-gray-500`

## Layout System

### Page Structure
```
1. Navigation (sticky, white background)
2. Hero Section (full height, image background with slate-900 overlay)
3. Content Sections (white background, consistent padding)
4. Footer (slate-900 background, white text)
```

### Section Spacing
- **Large Sections**: `py-24` (96px top/bottom padding)
- **Medium Sections**: `py-16` (64px top/bottom padding)
- **Small Sections**: `py-12` (48px top/bottom padding)

### Container Widths
- **Default**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Narrow**: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
- **Wide**: `max-w-8xl mx-auto px-4 sm:px-6 lg:px-8`

## Component Specifications

### Hero Sections
```css
Background: Image with slate-900 overlay (70% opacity)
Height: h-[70vh] for pages, h-screen for homepage
Text: White on dark overlay
Animation: Fade up on load
```

### Cards
```css
Background: white
Border: border border-gray-200
Radius: rounded-2xl
Shadow: shadow-lg hover:shadow-xl
Padding: p-8
Hover: Scale and shadow enhancement
```

### Buttons
```css
Primary: bg-gradient-to-r from-gold-600 to-gold-500 text-white
Secondary: border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white
Outline: border border-gray-300 text-gray-700 hover:bg-gray-50
```

### Icons
```css
Size: h-6 w-6 (default), h-8 w-8 (large), h-4 w-4 (small)
Color: Matches parent text color
Style: Lucide React icons
```

## Animation Guidelines

### Motion Preferences
- Always check for `prefers-reduced-motion`
- Provide static alternatives for all animations
- Use Framer Motion for consistent animations

### Animation Types
```javascript
// Fade in
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.6 }

// Slide up
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.8 }

// Stagger children
container: { staggerChildren: 0.1 }
```

## Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements

### Implementation
- Semantic HTML elements
- ARIA labels and descriptions
- Alt text for all images
- Proper heading hierarchy
- Focus management

## Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interfaces (44px minimum touch targets)

## Component Library Structure

### Base Components
- Button
- Card
- Input
- Select
- TextArea
- Modal
- Alert

### Layout Components
- PageLayout
- ContentSection
- Container
- Grid
- Flex

### Church-Specific Components
- HeroSection
- ServiceTimes
- EventCard
- NewsCard
- PriestCard
- ContactInfo

## File Organization

### Component Structure
```
/src/components/
├── ui/           # Base UI components
├── layout/       # Layout components  
├── church/       # Church-specific components
├── forms/        # Form components
└── navigation/   # Navigation components
```

### Styling Approach
- Tailwind CSS for utility classes
- CSS modules for component-specific styles
- No styled-components or CSS-in-JS
- Consistent class naming conventions

## Performance Standards

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds  
- **CLS**: < 0.1

### Image Optimization
- Next.js Image component for all images
- WebP/AVIF formats with fallbacks
- Proper sizing and lazy loading
- Alt text for accessibility

### Bundle Size Targets
- Initial JS bundle: < 150kB gzipped
- Page-specific bundles: < 50kB gzipped
- CSS bundle: < 20kB gzipped

This specification will guide the complete rebuild of the St Saviour's website with modern 2025 standards.