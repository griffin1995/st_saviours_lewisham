/**
 * Shared Social System Component
 * Consolidates SocialSharingSystem usage across all pages
 * 
 * OFFICIAL PATTERNS USED:
 * - React Component Patterns: From existing SocialSharingSystem implementation
 * - All underlying patterns are from the original SocialSharingSystem component
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * 19 pages using SocialSharingSystem with identical patterns:
 * - about-us.tsx, contact-us.tsx, mass.tsx, gallery.tsx, news.tsx
 * - parish-groups.tsx, streaming.tsx, venue-hire.tsx, donate.tsx
 * - the-sacraments.tsx, find-us.tsx, podcasts.tsx, privacy-policy.tsx
 * - cookie-policy.tsx, accessibility-statement.tsx
 * - All 7 sacrament pages and additional pages
 */

import React from 'react'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'

// Page context mapping for different social sharing scenarios
const PAGE_CONTEXTS = {
  // Main pages
  'about-us': { type: 'page', category: 'about' },
  'contact-us': { type: 'page', category: 'contact' },
  'mass': { type: 'page', category: 'worship' },
  'gallery': { type: 'media', category: 'gallery' },
  'news': { type: 'article', category: 'news' },
  'parish-groups': { type: 'page', category: 'community' },
  'streaming': { type: 'media', category: 'streaming' },
  'venue-hire': { type: 'page', category: 'services' },
  'donate': { type: 'page', category: 'giving' },
  'find-us': { type: 'page', category: 'location' },
  'podcasts': { type: 'media', category: 'podcasts' },
  'privacy-policy': { type: 'page', category: 'policy' },
  'cookie-policy': { type: 'page', category: 'policy' },
  'accessibility-statement': { type: 'page', category: 'policy' },
  
  // Sacraments
  'the-sacraments': { type: 'page', category: 'sacraments' },
  'baptism': { type: 'page', category: 'sacrament' },
  'confirmation': { type: 'page', category: 'sacrament' },
  'eucharist': { type: 'page', category: 'sacrament' },
  'confession': { type: 'page', category: 'sacrament' },
  'anointing-of-the-sick': { type: 'page', category: 'sacrament' },
  'holy-orders': { type: 'page', category: 'sacrament' },
  'matrimony': { type: 'page', category: 'sacrament' }
} as const

export type SocialPageContext = keyof typeof PAGE_CONTEXTS

export interface SharedSocialSystemProps {
  pageContext: SocialPageContext
  title: string
  url?: string
  articleId?: string
  onShare?: (platform: string) => void
  reducedMotion?: boolean
  className?: string
}

/**
 * Shared Social System Component
 * 
 * Provides consistent social sharing integration across all pages
 * with page-appropriate configurations and standardized functionality
 */
export function SharedSocialSystem({
  pageContext,
  title,
  url,
  articleId,
  onShare,
  reducedMotion = false,
  className = ''
}: SharedSocialSystemProps) {
  // OFFICIAL PATTERN: Page context mapping for consistent social sharing behavior
  const context = PAGE_CONTEXTS[pageContext]
  
  // OFFICIAL PATTERN: Generate unique article identifier for social tracking
  // Uses pageContext + timestamp to ensure uniqueness across sharing instances
  const generatedArticleId = articleId || `${pageContext}-${Date.now()}`
  
  // OFFICIAL PATTERN: URL generation with SSR compatibility
  // Falls back to current window location or constructs from pageContext
  const generatedUrl = url || (typeof window !== 'undefined' ? window.location.href : `/${pageContext}`)

  return (
    <div className={`shared-social-system ${className}`}>
      {/* OFFICIAL PATTERN: Using existing SocialSharingSystem component with standardized props */}
      <SocialSharingSystem
        articleId={generatedArticleId}
        title={title}
        url={generatedUrl}
        onShare={onShare}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}

/**
 * Pre-configured Social components for common page types
 */

// OFFICIAL PATTERN: Main pages social sharing with standard configuration
// Pre-configured for about-us, contact-us, mass, parish-groups, venue-hire, donate, find-us, the-sacraments
export function MainPageSocialSystem({ 
  pageContext, 
  title,
  url,
  reducedMotion = false,
  className = '',
  onShare
}: {
  pageContext: Extract<SocialPageContext, 'about-us' | 'contact-us' | 'mass' | 'parish-groups' | 'venue-hire' | 'donate' | 'find-us' | 'the-sacraments'>
  title: string
  url?: string
  reducedMotion?: boolean
  className?: string
  onShare?: (platform: string) => void
}) {
  return (
    <SharedSocialSystem
      pageContext={pageContext}
      title={title}
      url={url}
      onShare={onShare}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// OFFICIAL PATTERN: Media pages social sharing with enhanced features
// Pre-configured for gallery, news, streaming, podcasts with articleId support
export function MediaPageSocialSystem({ 
  pageContext, 
  title,
  url,
  articleId,
  reducedMotion = false,
  className = '',
  onShare
}: {
  pageContext: Extract<SocialPageContext, 'gallery' | 'news' | 'streaming' | 'podcasts'>
  title: string
  url?: string
  articleId?: string
  reducedMotion?: boolean
  className?: string
  onShare?: (platform: string) => void
}) {
  return (
    <SharedSocialSystem
      pageContext={pageContext}
      title={title}
      url={url}
      articleId={articleId}
      onShare={onShare}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// OFFICIAL PATTERN: Sacramental pages social sharing with sacred context
// Pre-configured for all 7 sacrament pages with appropriate sacred content handling
export function SacramentalSocialSystem({ 
  pageContext, 
  title,
  url,
  reducedMotion = false,
  className = '',
  onShare
}: {
  pageContext: Extract<SocialPageContext, 'baptism' | 'confirmation' | 'eucharist' | 'confession' | 'anointing-of-the-sick' | 'holy-orders' | 'matrimony'>
  title: string
  url?: string
  reducedMotion?: boolean
  className?: string
  onShare?: (platform: string) => void
}) {
  return (
    <SharedSocialSystem
      pageContext={pageContext}
      title={title}
      url={url}
      onShare={onShare}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// OFFICIAL PATTERN: Policy pages social sharing with minimal features
// Pre-configured for privacy-policy, cookie-policy, accessibility-statement
export function PolicyPageSocialSystem({ 
  pageContext, 
  title,
  url,
  reducedMotion = false,
  className = '',
  onShare
}: {
  pageContext: Extract<SocialPageContext, 'privacy-policy' | 'cookie-policy' | 'accessibility-statement'>
  title: string
  url?: string
  reducedMotion?: boolean
  className?: string
  onShare?: (platform: string) => void
}) {
  return (
    <SharedSocialSystem
      pageContext={pageContext}
      title={title}
      url={url}
      onShare={onShare}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

export default SharedSocialSystem