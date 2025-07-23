/**
 * Shared Scripture Section Component
 * Consolidates Scripture Card usage across all 22 pages
 * 
 * OFFICIAL PATTERNS USED:
 * - React Component Patterns: From existing ScriptureCard implementation
 * - All underlying patterns are from the original ScriptureCard component
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * All 22 modernized pages using ScriptureCard with identical patterns:
 * - about-us.tsx, contact-us.tsx, mass.tsx, gallery.tsx, news.tsx
 * - parish-groups.tsx, streaming.tsx, venue-hire.tsx, donate.tsx
 * - the-sacraments.tsx, find-us.tsx, podcasts.tsx, privacy-policy.tsx
 * - cookie-policy.tsx, accessibility-statement.tsx
 * - All 7 sacrament pages (baptism, confirmation, eucharist, etc.)
 */

import React from 'react'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'

// Theme mapping for different page contexts
const PAGE_THEMES = {
  // Main pages
  'about-us': 'mission',
  'contact-us': 'communication',
  'mass': 'eucharist',
  'gallery': 'beauty',
  'news': 'community',
  'parish-groups': 'fellowship',
  'streaming': 'worship',
  'venue-hire': 'hospitality',
  'donate': 'generosity',
  'find-us': 'hospitality',
  'podcasts': 'wisdom',
  'privacy-policy': 'trust',
  'cookie-policy': 'choice',
  'accessibility-statement': 'inclusivity',
  
  // Sacraments
  'the-sacraments': 'sacraments',
  'baptism': 'baptism',
  'confirmation': 'confirmation',
  'eucharist': 'eucharist',
  'confession': 'forgiveness',
  'anointing-of-the-sick': 'healing',
  'holy-orders': 'calling',
  'matrimony': 'marriage'
} as const

export type PageTheme = keyof typeof PAGE_THEMES

export interface SharedScriptureSectionProps {
  pageTheme: PageTheme
  showReflection?: boolean
  showAudio?: boolean
  reducedMotion?: boolean
  className?: string
}

/**
 * Shared Scripture Section Component
 * 
 * Provides consistent Scripture Card integration across all pages
 * with page-appropriate themes and standardized styling
 */
export function SharedScriptureSection({
  pageTheme,
  showReflection = true,
  showAudio = false,
  reducedMotion = false,
  className = ''
}: SharedScriptureSectionProps) {
  const theme = PAGE_THEMES[pageTheme]

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* OFFICIAL PATTERN: Using existing ScriptureCard component with standardized props */}
      <ScriptureCard
        displayMode="themed"
        theme={theme}
        showReflection={showReflection}
        showAudio={showAudio}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}

/**
 * Pre-configured Scripture sections for common page types
 */

// Sacramental pages - enhanced reflection
export function SacramentalScriptureSection({ 
  pageTheme, 
  reducedMotion = false,
  className = '' 
}: {
  pageTheme: Extract<PageTheme, 'baptism' | 'confirmation' | 'eucharist' | 'confession' | 'anointing-of-the-sick' | 'holy-orders' | 'matrimony'>
  reducedMotion?: boolean
  className?: string
}) {
  return (
    <SharedScriptureSection
      pageTheme={pageTheme}
      showReflection={true}
      showAudio={true}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// Main pages - standard reflection
export function MainPageScriptureSection({ 
  pageTheme, 
  reducedMotion = false,
  className = '' 
}: {
  pageTheme: Extract<PageTheme, 'about-us' | 'contact-us' | 'mass' | 'gallery' | 'news' | 'parish-groups' | 'streaming' | 'venue-hire' | 'donate' | 'find-us' | 'podcasts' | 'the-sacraments'>
  reducedMotion?: boolean
  className?: string
}) {
  return (
    <SharedScriptureSection
      pageTheme={pageTheme}
      showReflection={true}
      showAudio={false}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// Policy pages - minimal reflection
export function PolicyPageScriptureSection({ 
  pageTheme, 
  reducedMotion = false,
  className = '' 
}: {
  pageTheme: Extract<PageTheme, 'privacy-policy' | 'cookie-policy' | 'accessibility-statement'>
  reducedMotion?: boolean
  className?: string
}) {
  return (
    <SharedScriptureSection
      pageTheme={pageTheme}
      showReflection={false}
      showAudio={false}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

export default SharedScriptureSection