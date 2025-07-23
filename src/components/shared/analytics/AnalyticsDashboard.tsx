/**
 * Universal Analytics Dashboard Component
 * Centralizes tab navigation, chart rendering, and stats display
 * 
 * OFFICIAL PATTERNS USED:
 * - Chart Initialization: Chart.js docs "Create Chart.js Instance"
 * - Canvas Context: Chart.js docs "Create Basic Chart.js Bar Chart in HTML"
 * - Chart Configuration: Chart.js docs "Define Chart.js Configuration Object Structure"
 * - Chart Updates: Chart.js docs "Add or Remove Data in Chart.js"
 * - Chart Cleanup: Chart.js API destroy() method
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * - MassStatistics.tsx
 * - PodcastAnalytics.tsx  
 * - StreamingAnalytics.tsx
 * - LocationAnalytics.tsx
 * - SacramentalAnalytics.tsx
 * - InteractiveStatistics.tsx
 * - CommunityMetrics.tsx
 */

import React, { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { 
  ChartConfig, 
  createChartOptions, 
  createDoughnutOptions,
  initializeChart,
  destroyChart
} from './ChartOptionsProvider'
import { QuickStatsGrid, StatCard } from './QuickStatsGrid'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export interface DashboardTab {
  id: string
  label: string
  chart: ChartConfig
  stats?: StatCard[]
  description?: string
}

export interface AnalyticsDashboardProps {
  tabs: DashboardTab[]
  title: string
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  reducedMotion?: boolean
  className?: string
}

export function AnalyticsDashboard({
  tabs,
  title,
  subtitle,
  icon: IconComponent,
  reducedMotion = false,
  className = ''
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')
  const [chartInstance, setChartInstance] = useState<any>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Get active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab)

  // Dashboard animation
  const dashboardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? { duration: 0 } : { tension: 120, friction: 14 },
    delay: 200
  })

  // Tab animation variants
  const tabVariants = {
    inactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      color: '#d1d5db'
    },
    active: {
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      borderColor: '#d4af37',
      color: '#ffffff'
    },
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      scale: reducedMotion ? 1 : 1.02,
      transition: { duration: 0.2 }
    }
  }

  // Initialize and update chart
  // OFFICIAL PATTERN: Chart.js docs "Create Chart.js Instance" + canvas context from "Create Basic Chart.js Bar Chart in HTML"
  useEffect(() => {
    if (!chartRef.current || !activeTabData || !inView) return

    const initChart = async () => {
      try {
        const Chart = await initializeChart()
        if (!Chart) return

        // Destroy existing chart - OFFICIAL PATTERN: Chart.js API destroy() method
        if (chartInstance) {
          destroyChart(chartInstance)
        }

        // Get canvas context - OFFICIAL PATTERN: Chart.js docs "Create Basic Chart.js Bar Chart in HTML"
        const ctx = chartRef.current!.getContext('2d')
        const { type, data, title: chartTitle } = activeTabData.chart

        // Choose appropriate options based on chart type
        const options = type === 'doughnut' || type === 'pie' 
          ? createDoughnutOptions(chartTitle, reducedMotion)
          : createChartOptions(chartTitle, reducedMotion)

        // Create new chart instance - OFFICIAL PATTERN: Chart.js docs "Create Chart.js Instance"
        const newChart = new Chart(ctx!, {
          type,
          data,
          options
        })

        setChartInstance(newChart)
      } catch (error) {
        console.warn('Failed to initialize chart:', error)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initChart, 100)
    
    return () => {
      clearTimeout(timer)
      if (chartInstance) {
        destroyChart(chartInstance)
      }
    }
  }, [activeTab, activeTabData, inView, reducedMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance) {
        destroyChart(chartInstance)
      }
    }
  }, [])

  if (!tabs.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No analytics data available
      </div>
    )
  }

  return (
    <animated.div
      ref={ref}
      style={dashboardSpring}
      className={`space-y-8 ${className}`}
    >
      {/* Header */}
      <div className="text-center">
        <m.div
          className="w-20 h-20 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <IconComponent className="h-10 w-10 text-gold-400" />
        </m.div>
        
        <h3 className="text-3xl font-bold text-white mb-3">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Tabs Navigation */}
      {tabs.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <m.button
              key={tab.id}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            >
              {tab.label}
            </m.button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      {activeTabData && (
        <div className="space-y-8">
          {/* Quick Stats */}
          {activeTabData.stats && (
            <QuickStatsGrid
              stats={activeTabData.stats}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300">
            {activeTabData.description && (
              <div className="text-center mb-6">
                <p className="text-gray-300">
                  {activeTabData.description}
                </p>
              </div>
            )}
            
            <div className="relative h-96 w-full">
              {/* OFFICIAL PATTERN: Chart.js docs "Define HTML Canvas for Chart.js Rendering" */}
              <canvas
                ref={chartRef}
                className="w-full h-full"
                role="img"
                aria-label={`${activeTabData.chart.title || title} chart`}
              />
              
              {/* Loading State */}
              {!inView && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/60 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                    Loading chart...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-400">
        <p>Data updates automatically • Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </animated.div>
  )
}

/**
 * Helper to create tabs from chart configurations
 */
export const createDashboardTab = (
  id: string,
  label: string,
  chart: ChartConfig,
  stats?: StatCard[],
  description?: string
): DashboardTab => ({
  id,
  label,
  chart,
  stats,
  description
})

/**
 * Error boundary wrapper for analytics dashboard
 */
export function AnalyticsDashboardWithErrorBoundary(props: AnalyticsDashboardProps) {
  try {
    return <AnalyticsDashboard {...props} />
  } catch (error) {
    console.warn('Analytics dashboard error:', error)
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <div className="text-white/60 mb-4">
          <props.icon className="h-12 w-12 mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Analytics Temporarily Unavailable
        </h3>
        <p className="text-gray-400">
          We're working to restore the analytics dashboard. Please try again later.
        </p>
      </div>
    )
  }
}