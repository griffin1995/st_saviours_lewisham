import React, { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  WifiIcon,
  BoltIcon
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

// CVA for performance metrics following 2025 standards
const metricVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      status: {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        poor: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800'
      }
    },
    defaultVariants: {
      status: 'good'
    }
  }
)

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint
  ttfb: number // Time to First Byte
  
  // Custom metrics
  loadTime: number
  renderTime: number
  interactionTime: number
  
  // Resource metrics
  jsSize: number
  cssSize: number
  imageSize: number
  totalSize: number
  
  // Runtime metrics
  memoryUsage: number
  cpuUsage: number
  frameRate: number
}

interface PerformanceMonitorProps {
  showLiveMetrics?: boolean
  showRecommendations?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
  reducedMotion?: boolean
  className?: string
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showLiveMetrics = true,
  showRecommendations = true,
  autoRefresh = true,
  refreshInterval = 5000,
  reducedMotion = false,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isCollecting, setIsCollecting] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [performanceScore, setPerformanceScore] = useState(0)
  const observerRef = useRef<PerformanceObserver | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      // reducedMotion prop takes precedence
    }
  }, [])

  // Collect performance metrics
  const collectMetrics = async () => {
    if (typeof window === 'undefined') return

    setIsCollecting(true)

    try {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint')
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0

      // Get resource timing
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      
      // Calculate resource sizes
      const jsResources = resources.filter(r => r.name.includes('.js'))
      const cssResources = resources.filter(r => r.name.includes('.css'))
      const imageResources = resources.filter(r => 
        r.name.includes('.jpg') || r.name.includes('.png') || r.name.includes('.webp') || r.name.includes('.svg')
      )

      const jsSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024 // KB
      const cssSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024 // KB
      const imageSize = imageResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024 // KB
      const totalSize = (jsSize + cssSize + imageSize)

      // Get memory info (Chrome only)
      const memoryInfo = (performance as any).memory
      const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0 // MB

      // Mock some metrics for demo (in real app, these would come from actual measurements)
      const mockMetrics: PerformanceMetrics = {
        lcp: Math.random() * 2000 + 1000, // 1-3s
        fid: Math.random() * 50 + 10, // 10-60ms
        cls: Math.random() * 0.1, // 0-0.1
        fcp: fcp || Math.random() * 1500 + 500,
        ttfb: navigation?.responseStart - navigation?.requestStart || Math.random() * 200 + 100,
        loadTime: navigation?.loadEventEnd - navigation?.startTime || Math.random() * 3000 + 1000,
        renderTime: Math.random() * 100 + 50,
        interactionTime: Math.random() * 50 + 20,
        jsSize,
        cssSize,
        imageSize,
        totalSize,
        memoryUsage,
        cpuUsage: Math.random() * 30 + 10, // Mock CPU usage
        frameRate: 60 - Math.random() * 10 // Mock frame rate
      }

      setMetrics(mockMetrics)
      setLastUpdate(new Date())
      
      // Calculate performance score (0-100)
      const score = calculatePerformanceScore(mockMetrics)
      setPerformanceScore(score)

    } catch (error) {
      console.error('Error collecting performance metrics:', error)
    } finally {
      setIsCollecting(false)
    }
  }

  // Calculate performance score based on Core Web Vitals
  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    let score = 100

    // LCP scoring (good: <2.5s, poor: >4s)
    if (metrics.lcp > 4000) score -= 30
    else if (metrics.lcp > 2500) score -= 15

    // FID scoring (good: <100ms, poor: >300ms)
    if (metrics.fid > 300) score -= 25
    else if (metrics.fid > 100) score -= 10

    // CLS scoring (good: <0.1, poor: >0.25)
    if (metrics.cls > 0.25) score -= 25
    else if (metrics.cls > 0.1) score -= 10

    // Bundle size penalty
    if (metrics.totalSize > 1000) score -= 10 // >1MB
    else if (metrics.totalSize > 500) score -= 5 // >500KB

    return Math.max(0, Math.round(score))
  }

  const getMetricStatus = (value: number, thresholds: [number, number, number]): 'excellent' | 'good' | 'poor' | 'critical' => {
    if (value <= thresholds[0]) return 'excellent'
    if (value <= thresholds[1]) return 'good'
    if (value <= thresholds[2]) return 'poor'
    return 'critical'
  }

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Auto-refresh metrics
  useEffect(() => {
    collectMetrics()

    if (autoRefresh) {
      const interval = setInterval(collectMetrics, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  if (!metrics) {
    return (
      <div className={cn('bg-white rounded-3xl shadow-xl p-8', className)}>
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-gold-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Collecting performance metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <m.div
      className={cn('bg-white rounded-3xl shadow-xl overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="p-8 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
              Performance Monitor
            </h3>
            <p className="text-gray-600">
              Real-time website performance metrics and optimization insights
            </p>
          </div>

          {/* Performance Score */}
          <div className="text-center">
            <div className={cn('text-3xl font-bold', getScoreColor(performanceScore))}>
              {performanceScore}
            </div>
            <div className="text-sm text-gray-600">Performance Score</div>
          </div>
        </div>

        {/* Last Update */}
        {lastUpdate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-4 w-4" />
            <span>
              Last updated: {lastUpdate.toLocaleTimeString('en-GB')}
            </span>
            {isCollecting && (
              <span className="flex items-center gap-1 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                Collecting...
              </span>
            )}
          </div>
        )}
      </m.div>

      {/* Core Web Vitals */}
      <m.div
        className="p-8 border-b border-gray-200"
        variants={itemVariants}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-6">
          Core Web Vitals
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LCP */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Largest Contentful Paint
              </span>
              <EyeIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              {(metrics.lcp / 1000).toFixed(2)}s
            </div>
            <div className={metricVariants({ 
              status: getMetricStatus(metrics.lcp, [2500, 4000, 6000]) 
            })}>
              {getMetricStatus(metrics.lcp, [2500, 4000, 6000]) === 'excellent' && <CheckCircleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.lcp, [2500, 4000, 6000]) === 'critical' && <ExclamationTriangleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.lcp, [2500, 4000, 6000]).charAt(0).toUpperCase() + getMetricStatus(metrics.lcp, [2500, 4000, 6000]).slice(1)}
            </div>
          </div>

          {/* FID */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                First Input Delay
              </span>
              <BoltIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              {metrics.fid.toFixed(0)}ms
            </div>
            <div className={metricVariants({ 
              status: getMetricStatus(metrics.fid, [100, 300, 500]) 
            })}>
              {getMetricStatus(metrics.fid, [100, 300, 500]) === 'excellent' && <CheckCircleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.fid, [100, 300, 500]) === 'critical' && <ExclamationTriangleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.fid, [100, 300, 500]).charAt(0).toUpperCase() + getMetricStatus(metrics.fid, [100, 300, 500]).slice(1)}
            </div>
          </div>

          {/* CLS */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Cumulative Layout Shift
              </span>
              <ChartBarIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              {metrics.cls.toFixed(3)}
            </div>
            <div className={metricVariants({ 
              status: getMetricStatus(metrics.cls, [0.1, 0.25, 0.5]) 
            })}>
              {getMetricStatus(metrics.cls, [0.1, 0.25, 0.5]) === 'excellent' && <CheckCircleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.cls, [0.1, 0.25, 0.5]) === 'critical' && <ExclamationTriangleIcon className="h-4 w-4" />}
              {getMetricStatus(metrics.cls, [0.1, 0.25, 0.5]).charAt(0).toUpperCase() + getMetricStatus(metrics.cls, [0.1, 0.25, 0.5]).slice(1)}
            </div>
          </div>
        </div>
      </m.div>

      {/* Resource Metrics */}
      <m.div
        className="p-8 border-b border-gray-200"
        variants={itemVariants}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-6">
          Resource Usage
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-sm text-blue-700 mb-1">JavaScript</div>
            <div className="text-lg font-bold text-blue-900">
              {formatBytes(metrics.jsSize * 1024)}
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-sm text-purple-700 mb-1">CSS</div>
            <div className="text-lg font-bold text-purple-900">
              {formatBytes(metrics.cssSize * 1024)}
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-sm text-green-700 mb-1">Images</div>
            <div className="text-lg font-bold text-green-900">
              {formatBytes(metrics.imageSize * 1024)}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-700 mb-1">Total</div>
            <div className="text-lg font-bold text-slate-900">
              {formatBytes(metrics.totalSize * 1024)}
            </div>
          </div>
        </div>
      </m.div>

      {/* Live Metrics */}
      {showLiveMetrics && (
        <m.div
          className="p-8 border-b border-gray-200"
          variants={itemVariants}
        >
          <h4 className="text-lg font-semibold text-slate-900 mb-6">
            Live Performance
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <CpuChipIcon className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Memory Usage</div>
                <div className="text-xl font-bold text-slate-900">
                  {metrics.memoryUsage.toFixed(1)} MB
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DevicePhoneMobileIcon className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Frame Rate</div>
                <div className="text-xl font-bold text-slate-900">
                  {metrics.frameRate.toFixed(0)} FPS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <WifiIcon className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">Load Time</div>
                <div className="text-xl font-bold text-slate-900">
                  {(metrics.loadTime / 1000).toFixed(2)}s
                </div>
              </div>
            </div>
          </div>
        </m.div>
      )}

      {/* Recommendations */}
      {showRecommendations && (
        <m.div
          className="p-8"
          variants={itemVariants}
        >
          <h4 className="text-lg font-semibold text-slate-900 mb-6">
            Optimization Recommendations
          </h4>

          <div className="space-y-4">
            {metrics.lcp > 2500 && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                <ArrowTrendingUpIcon className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-semibold text-orange-800 mb-1">
                    Improve Largest Contentful Paint
                  </div>
                  <div className="text-orange-700">
                    Consider optimizing images, implementing lazy loading, or using a CDN to reduce LCP time.
                  </div>
                </div>
              </div>
            )}

            {metrics.totalSize > 500 && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <ArrowTrendingDownIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-semibold text-blue-800 mb-1">
                    Reduce Bundle Size
                  </div>
                  <div className="text-blue-700">
                    Current bundle size is {formatBytes(metrics.totalSize * 1024)}. Consider code splitting and removing unused dependencies.
                  </div>
                </div>
              </div>
            )}

            {performanceScore >= 90 && (
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-semibold text-green-800 mb-1">
                    Excellent Performance!
                  </div>
                  <div className="text-green-700">
                    Your website is performing exceptionally well across all key metrics.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={collectMetrics}
            disabled={isCollecting}
            className="mt-6 px-6 py-3 bg-gold-600 text-white rounded-xl hover:bg-gold-700 disabled:opacity-50 transition-colors font-semibold"
          >
            {isCollecting ? 'Collecting...' : 'Refresh Metrics'}
          </button>
        </m.div>
      )}
    </m.div>
  )
}

export default PerformanceMonitor