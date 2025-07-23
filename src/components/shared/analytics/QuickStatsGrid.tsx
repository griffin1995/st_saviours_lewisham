/**
 * Quick Statistics Grid Component
 * Reusable statistics display grid used across all analytics components
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

import React from 'react'
import { m } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

export interface StatCard {
  title: string
  value: string | number
  change?: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface QuickStatsGridProps {
  stats: StatCard[]
  title?: string
  description?: string
  reducedMotion?: boolean
  className?: string
}

export function QuickStatsGrid({
  stats,
  title,
  description,
  reducedMotion = false,
  className = ''
}: QuickStatsGridProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Grid animation
  const gridSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    config: reducedMotion ? { duration: 0 } : { tension: 120, friction: 14 },
    delay: 100
  })

  // Stagger animation for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: reducedMotion ? 0 : i * 0.1,
        duration: reducedMotion ? 0.2 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: reducedMotion ? {} : {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  // Get trend colors and icons
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      default: return '→'
    }
  }

  return (
    <animated.div
      ref={ref}
      style={gridSpring}
      className={`space-y-6 ${className}`}
    >
      {/* Header */}
      {(title || description) && (
        <div className="text-center">
          {title && (
            <h3 className="text-2xl font-bold text-white mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          
          return (
            <m.div
              key={stat.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover="hover"
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:border-white/30 transition-colors duration-300">
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-5`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-white mb-1">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">
                      {stat.title}
                    </div>
                  </div>
                  
                  {/* Change/Trend */}
                  {stat.change && (
                    <div className={`text-sm flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                      <span className="text-xs">
                        {getTrendIcon(stat.trend)}
                      </span>
                      {stat.change}
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          )
        })}
      </div>
    </animated.div>
  )
}

/**
 * Pre-configured stat card templates for common use cases
 */
export const createAttendanceStat = (
  title: string,
  value: number,
  change: string,
  icon: React.ComponentType<{ className?: string }>,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): StatCard => ({
  title,
  value,
  change,
  icon,
  color: 'from-blue-600 to-blue-500',
  trend
})

export const createEngagementStat = (
  title: string,
  value: number,
  change: string,
  icon: React.ComponentType<{ className?: string }>,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): StatCard => ({
  title,
  value,
  change,
  icon,
  color: 'from-green-600 to-green-500',
  trend
})

export const createGrowthStat = (
  title: string,
  value: number,
  change: string,
  icon: React.ComponentType<{ className?: string }>,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): StatCard => ({
  title,
  value,
  change,
  icon,
  color: 'from-gold-600 to-gold-500',
  trend
})

export const createServiceStat = (
  title: string,
  value: number,
  change: string,
  icon: React.ComponentType<{ className?: string }>,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): StatCard => ({
  title,
  value,
  change,
  icon,
  color: 'from-purple-600 to-purple-500',
  trend
})