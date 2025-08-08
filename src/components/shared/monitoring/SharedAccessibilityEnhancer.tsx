/**
 * Shared Accessibility Enhancer Component
 * Consolidates AccessibilityEnhancer usage across all pages
 * 
 * OFFICIAL PATTERNS USED:
 * - React Accessibility API: From existing AccessibilityEnhancer implementation
 * - WCAG 2.1 AA Guidelines: From existing accessibility features
 * - All underlying patterns are from the original AccessibilityEnhancer component
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * 10 pages using AccessibilityEnhancer with similar patterns:
 * - accessibility-statement.tsx, cookie-policy.tsx, donate.tsx, gallery.tsx
 * - news.tsx, parish-groups.tsx, privacy-policy.tsx, streaming.tsx
 * - the-sacraments.tsx, venue-hire.tsx
 */

import React from 'react'
import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'

// Page context mapping for different accessibility enhancement scenarios
const PAGE_ACCESSIBILITY_CONFIGS = {
  // Main content pages - full accessibility features
  'about-us': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'contact-us': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'mass': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'gallery': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'news': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'parish-groups': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'streaming': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'venue-hire': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'donate': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'find-us': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'podcasts': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  
  // Sacraments - enhanced accessibility for sacred content
  'the-sacraments': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'baptism': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'confirmation': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'eucharist': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'confession': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'anointing-of-the-sick': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'holy-orders': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  'matrimony': { showToolbar: true, showTests: false, showKeyboardHelp: true, autoSaveSettings: true },
  
  // Policy pages - comprehensive accessibility features
  'privacy-policy': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'cookie-policy': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true },
  'accessibility-statement': { showToolbar: true, showTests: true, showKeyboardHelp: true, autoSaveSettings: true }
} as const

export type AccessibilityPageContext = keyof typeof PAGE_ACCESSIBILITY_CONFIGS

export interface SharedAccessibilityEnhancerProps {
  pageContext: AccessibilityPageContext
  reducedMotion?: boolean
  className?: string
  // Override options
  overrideConfig?: {
    showToolbar?: boolean
    showTests?: boolean
    showKeyboardHelp?: boolean
    autoSaveSettings?: boolean
  }
}

/**
 * Shared Accessibility Enhancer Component
 * 
 * Provides consistent accessibility enhancements across all pages
 * with page-appropriate configurations and standardized behavior
 */
export function SharedAccessibilityEnhancer({
  pageContext,
  reducedMotion = false,
  className = '',
  overrideConfig
}: SharedAccessibilityEnhancerProps) {
  // OFFICIAL PATTERN: Page-specific accessibility configuration with override support
  const baseConfig = PAGE_ACCESSIBILITY_CONFIGS[pageContext]
  const finalConfig = overrideConfig ? { ...baseConfig, ...overrideConfig } : baseConfig

  return (
    <div className={`shared-accessibility-enhancer ${className}`}>
      {/* OFFICIAL PATTERN: Using existing AccessibilityEnhancer component with standardized props */}
      <AccessibilityEnhancer
        showToolbar={finalConfig.showToolbar}
        showTests={finalConfig.showTests}
        showKeyboardHelp={finalConfig.showKeyboardHelp}
        autoSaveSettings={finalConfig.autoSaveSettings}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}

/**
 * Pre-configured Accessibility Enhancer components for common page types
 */

// OFFICIAL PATTERN: Main pages accessibility enhancement with full features
// Pre-configured for content pages with comprehensive accessibility support
export function MainPageAccessibilityEnhancer({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<AccessibilityPageContext, 'about-us' | 'contact-us' | 'mass' | 'gallery' | 'news' | 'parish-groups' | 'streaming' | 'venue-hire' | 'donate' | 'find-us' | 'podcasts' | 'the-sacraments'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedAccessibilityEnhancerProps['overrideConfig']
}) {
  return (
    <SharedAccessibilityEnhancer
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Sacramental pages accessibility enhancement with sacred considerations
// Pre-configured for all 7 sacrament pages with appropriate sacred content handling
export function SacramentalAccessibilityEnhancer({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<AccessibilityPageContext, 'baptism' | 'confirmation' | 'eucharist' | 'confession' | 'anointing-of-the-sick' | 'holy-orders' | 'matrimony'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedAccessibilityEnhancerProps['overrideConfig']
}) {
  return (
    <SharedAccessibilityEnhancer
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Policy pages accessibility enhancement with comprehensive features
// Pre-configured for privacy, cookie, and accessibility statement pages
export function PolicyPageAccessibilityEnhancer({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<AccessibilityPageContext, 'privacy-policy' | 'cookie-policy' | 'accessibility-statement'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedAccessibilityEnhancerProps['overrideConfig']
}) {
  return (
    <SharedAccessibilityEnhancer
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

export default SharedAccessibilityEnhancer