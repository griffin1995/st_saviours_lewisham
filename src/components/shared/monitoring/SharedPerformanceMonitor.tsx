/**
 * Shared Performance Monitor Component
 * Consolidates PerformanceMonitor usage across all pages
 * 
 * OFFICIAL PATTERNS USED:
 * - React Performance API: From existing PerformanceMonitor implementation
 * - Core Web Vitals: From existing performance metrics collection
 * - All underlying patterns are from the original PerformanceMonitor component
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * 11 pages using PerformanceMonitor with similar patterns:
 * - accessibility-statement.tsx, _app.tsx, cookie-policy.tsx, donate.tsx
 * - gallery.tsx, news.tsx, parish-groups.tsx, privacy-policy.tsx
 * - streaming.tsx, the-sacraments.tsx, venue-hire.tsx
 */

import React from 'react'
import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'

// Page context mapping for different performance monitoring scenarios
const PAGE_MONITORING_CONFIGS = {
  // App-level monitoring
  'app': {
    showLiveMetrics: true,
    showRecommendations: true,
    autoRefresh: true,
    refreshInterval: 10000 // Less frequent for app-level
  },
  
  // Main content pages
  'about-us': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'contact-us': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'mass': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'gallery': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 3000 }, // More frequent for media
  'news': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'parish-groups': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'streaming': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 2000 }, // Frequent for streaming
  'venue-hire': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'donate': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 4000 },
  'find-us': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'podcasts': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 4000 },
  
  // Sacraments
  'the-sacraments': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 },
  'baptism': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'confirmation': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'eucharist': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'confession': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'anointing-of-the-sick': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'holy-orders': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  'matrimony': { showLiveMetrics: true, showRecommendations: false, autoRefresh: true, refreshInterval: 6000 },
  
  // Policy pages - minimal monitoring
  'privacy-policy': { showLiveMetrics: false, showRecommendations: true, autoRefresh: true, refreshInterval: 8000 },
  'cookie-policy': { showLiveMetrics: false, showRecommendations: true, autoRefresh: true, refreshInterval: 8000 },
  'accessibility-statement': { showLiveMetrics: true, showRecommendations: true, autoRefresh: true, refreshInterval: 5000 }
} as const

export type MonitoringPageContext = keyof typeof PAGE_MONITORING_CONFIGS

export interface SharedPerformanceMonitorProps {
  pageContext: MonitoringPageContext
  reducedMotion?: boolean
  className?: string
  // Override options
  overrideConfig?: {
    showLiveMetrics?: boolean
    showRecommendations?: boolean
    autoRefresh?: boolean
    refreshInterval?: number
  }
}

/**
 * Shared Performance Monitor Component
 * 
 * Provides consistent performance monitoring across all pages
 * with page-appropriate configurations and standardized behavior
 */
export function SharedPerformanceMonitor({
  pageContext,
  reducedMotion = false,
  className = '',
  overrideConfig
}: SharedPerformanceMonitorProps) {
  // OFFICIAL PATTERN: Page-specific configuration with override support
  const baseConfig = PAGE_MONITORING_CONFIGS[pageContext]
  const finalConfig = overrideConfig ? { ...baseConfig, ...overrideConfig } : baseConfig

  return (
    <div className={`shared-performance-monitor ${className}`}>
      {/* OFFICIAL PATTERN: Using existing PerformanceMonitor component with standardized props */}
      <PerformanceMonitor
        showLiveMetrics={finalConfig.showLiveMetrics}
        showRecommendations={finalConfig.showRecommendations}
        autoRefresh={finalConfig.autoRefresh}
        refreshInterval={finalConfig.refreshInterval}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}

/**
 * Pre-configured Performance Monitor components for common page types
 */

// OFFICIAL PATTERN: App-level performance monitoring with global settings
// Pre-configured for _app.tsx with appropriate refresh intervals
export function AppLevelPerformanceMonitor({ 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedPerformanceMonitorProps['overrideConfig']
}) {
  return (
    <SharedPerformanceMonitor
      pageContext="app"
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Main pages performance monitoring with standard settings
// Pre-configured for content pages with balanced monitoring
export function MainPagePerformanceMonitor({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<MonitoringPageContext, 'about-us' | 'contact-us' | 'mass' | 'news' | 'parish-groups' | 'venue-hire' | 'donate' | 'find-us' | 'podcasts' | 'the-sacraments'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedPerformanceMonitorProps['overrideConfig']
}) {
  return (
    <SharedPerformanceMonitor
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Media pages performance monitoring with enhanced tracking
// Pre-configured for gallery and streaming pages with frequent updates
export function MediaPagePerformanceMonitor({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<MonitoringPageContext, 'gallery' | 'streaming'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedPerformanceMonitorProps['overrideConfig']
}) {
  return (
    <SharedPerformanceMonitor
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Sacramental pages performance monitoring with minimal overhead
// Pre-configured for all 7 sacrament pages with less frequent monitoring
export function SacramentalPerformanceMonitor({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<MonitoringPageContext, 'baptism' | 'confirmation' | 'eucharist' | 'confession' | 'anointing-of-the-sick' | 'holy-orders' | 'matrimony'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedPerformanceMonitorProps['overrideConfig']
}) {
  return (
    <SharedPerformanceMonitor
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

// OFFICIAL PATTERN: Policy pages performance monitoring with minimal features
// Pre-configured for privacy, cookie, and accessibility pages
export function PolicyPagePerformanceMonitor({ 
  pageContext, 
  reducedMotion = false,
  className = '',
  overrideConfig
}: {
  pageContext: Extract<MonitoringPageContext, 'privacy-policy' | 'cookie-policy' | 'accessibility-statement'>
  reducedMotion?: boolean
  className?: string
  overrideConfig?: SharedPerformanceMonitorProps['overrideConfig']
}) {
  return (
    <SharedPerformanceMonitor
      pageContext={pageContext}
      reducedMotion={reducedMotion}
      className={className}
      overrideConfig={overrideConfig}
    />
  )
}

export default SharedPerformanceMonitor