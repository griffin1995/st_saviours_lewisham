import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface FormAnalytics {
  formId: string
  sessionId: string
  startTime: number
  endTime?: number
  fieldInteractions: {
    [fieldName: string]: {
      focusCount: number
      focusTime: number
      blurCount: number
      keystrokes: number
      errors: string[]
      completed: boolean
    }
  }
  abandonment: {
    abandoned: boolean
    abandonedAt?: string
    timeSpent: number
  }
  completion: {
    completed: boolean
    completionTime?: number
    submissionAttempts: number
  }
  userAgent: string
  screenSize: {
    width: number
    height: number
  }
}

interface AdvancedFormAnalyticsProps {
  formRef: React.RefObject<HTMLFormElement>
  onAnalyticsUpdate?: (analytics: FormAnalytics) => void
  trackingEnabled?: boolean
}

export const AdvancedFormAnalytics: React.FC<AdvancedFormAnalyticsProps> = ({
  formRef,
  onAnalyticsUpdate,
  trackingEnabled = true
}) => {
  const [analytics, setAnalytics] = useState<FormAnalytics>({
    formId: `form_${Date.now()}`,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    fieldInteractions: {},
    abandonment: {
      abandoned: false,
      timeSpent: 0
    },
    completion: {
      completed: false,
      submissionAttempts: 0
    },
    userAgent: navigator.userAgent,
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })

  const fieldRefs = useRef<{[key: string]: HTMLElement}>({})
  const fieldTimers = useRef<{[key: string]: number}>({})
  const pageVisibilityTimer = useRef<number>()
  const mouseMoveTimer = useRef<number>()
  const lastActivity = useRef<number>(Date.now())

  useEffect(() => {
    if (!trackingEnabled || !formRef.current) return

    const form = formRef.current
    
    // Initialize field tracking
    const initializeFieldTracking = () => {
      const fields = form.querySelectorAll('input, textarea, select')
      fields.forEach((field) => {
        const fieldName = field.getAttribute('name') || field.getAttribute('id') || 'unknown'
        fieldRefs.current[fieldName] = field as HTMLElement
        
        // Initialize field analytics
        setAnalytics(prev => ({
          ...prev,
          fieldInteractions: {
            ...prev.fieldInteractions,
            [fieldName]: {
              focusCount: 0,
              focusTime: 0,
              blurCount: 0,
              keystrokes: 0,
              errors: [],
              completed: false
            }
          }
        }))

        // Field focus tracking
        field.addEventListener('focus', () => {
          fieldTimers.current[fieldName] = Date.now()
          lastActivity.current = Date.now()
          
          setAnalytics(prev => ({
            ...prev,
            fieldInteractions: {
              ...prev.fieldInteractions,
              [fieldName]: {
                ...prev.fieldInteractions[fieldName],
                focusCount: prev.fieldInteractions[fieldName].focusCount + 1
              }
            }
          }))
        })

        // Field blur tracking
        field.addEventListener('blur', () => {
          const focusTime = Date.now() - (fieldTimers.current[fieldName] || Date.now())
          const value = (field as HTMLInputElement).value
          
          setAnalytics(prev => ({
            ...prev,
            fieldInteractions: {
              ...prev.fieldInteractions,
              [fieldName]: {
                ...prev.fieldInteractions[fieldName],
                blurCount: prev.fieldInteractions[fieldName].blurCount + 1,
                focusTime: prev.fieldInteractions[fieldName].focusTime + focusTime,
                completed: value.length > 0
              }
            }
          }))
        })

        // Keystroke tracking
        field.addEventListener('keydown', () => {
          lastActivity.current = Date.now()
          
          setAnalytics(prev => ({
            ...prev,
            fieldInteractions: {
              ...prev.fieldInteractions,
              [fieldName]: {
                ...prev.fieldInteractions[fieldName],
                keystrokes: prev.fieldInteractions[fieldName].keystrokes + 1
              }
            }
          }))
        })

        // Error tracking
        field.addEventListener('invalid', (e) => {
          const errorMessage = (e.target as HTMLInputElement).validationMessage
          
          setAnalytics(prev => ({
            ...prev,
            fieldInteractions: {
              ...prev.fieldInteractions,
              [fieldName]: {
                ...prev.fieldInteractions[fieldName],
                errors: [...prev.fieldInteractions[fieldName].errors, errorMessage]
              }
            }
          }))
        })
      })
    }

    // Form submission tracking
    const handleSubmit = (e: Event) => {
      const completionTime = Date.now() - analytics.startTime
      
      setAnalytics(prev => ({
        ...prev,
        completion: {
          ...prev.completion,
          submissionAttempts: prev.completion.submissionAttempts + 1
        }
      }))

      // If form is valid, mark as completed
      if (form.checkValidity()) {
        setAnalytics(prev => ({
          ...prev,
          endTime: Date.now(),
          completion: {
            ...prev.completion,
            completed: true,
            completionTime
          }
        }))
      }
    }

    // Abandonment tracking
    const checkAbandonment = () => {
      const timeSinceActivity = Date.now() - lastActivity.current
      const timeSpent = Date.now() - analytics.startTime
      
      // Consider abandoned if inactive for 5 minutes
      if (timeSinceActivity > 300000 && !analytics.completion.completed) {
        setAnalytics(prev => ({
          ...prev,
          abandonment: {
            abandoned: true,
            abandonedAt: new Date().toISOString(),
            timeSpent
          }
        }))
      }
    }

    // Page visibility tracking
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pageVisibilityTimer.current = Date.now()
      } else {
        lastActivity.current = Date.now()
      }
    }

    // Mouse movement tracking
    const handleMouseMove = () => {
      lastActivity.current = Date.now()
    }

    // Initialize tracking
    initializeFieldTracking()
    form.addEventListener('submit', handleSubmit)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('mousemove', handleMouseMove)

    // Set up abandonment checking
    const abandonmentInterval = setInterval(checkAbandonment, 60000) // Check every minute

    // Cleanup
    return () => {
      form.removeEventListener('submit', handleSubmit)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(abandonmentInterval)
    }
  }, [trackingEnabled, formRef, analytics.startTime, analytics.completion.completed])

  // Update analytics callback
  useEffect(() => {
    if (onAnalyticsUpdate) {
      onAnalyticsUpdate(analytics)
    }
  }, [analytics, onAnalyticsUpdate])

  // Send analytics to server
  const sendAnalytics = async (analyticsData: FormAnalytics) => {
    try {
      // In a real implementation, this would send to your analytics endpoint
      console.log('Form Analytics:', analyticsData)
      
      // Example: Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_analytics', {
          form_id: analyticsData.formId,
          session_id: analyticsData.sessionId,
          completion_time: analyticsData.completion.completionTime,
          abandoned: analyticsData.abandonment.abandoned,
          field_count: Object.keys(analyticsData.fieldInteractions).length,
          total_keystrokes: Object.values(analyticsData.fieldInteractions)
            .reduce((sum, field) => sum + field.keystrokes, 0)
        })
      }

      // Example: Send to custom analytics endpoint
      await fetch('/api/form-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }

  // Send analytics on completion or abandonment
  useEffect(() => {
    if (analytics.completion.completed || analytics.abandonment.abandoned) {
      sendAnalytics(analytics)
    }
  }, [analytics.completion.completed, analytics.abandonment.abandoned])

  if (!trackingEnabled) return null

  return (
    <div className="hidden">
      {/* Analytics tracking component - invisible */}
      <div data-analytics-session={analytics.sessionId} />
    </div>
  )
}

// Analytics Dashboard Component (for admin use)
export const FormAnalyticsDashboard: React.FC<{
  analytics: FormAnalytics[]
  className?: string
}> = ({ analytics, className = '' }) => {
  const totalSessions = analytics.length
  const completedSessions = analytics.filter(a => a.completion.completed).length
  const abandonedSessions = analytics.filter(a => a.abandonment.abandoned).length
  const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
  const averageCompletionTime = analytics
    .filter(a => a.completion.completionTime)
    .reduce((sum, a) => sum + (a.completion.completionTime || 0), 0) / completedSessions || 0

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6">Form Analytics Dashboard</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-300">{totalSessions}</div>
          <div className="text-sm text-gray-300">Total Sessions</div>
        </div>
        
        <div className="bg-green-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-300">{completedSessions}</div>
          <div className="text-sm text-gray-300">Completed</div>
        </div>
        
        <div className="bg-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-300">{abandonedSessions}</div>
          <div className="text-sm text-gray-300">Abandoned</div>
        </div>
        
        <div className="bg-gold-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gold-300">{completionRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-300">Completion Rate</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-white mb-2">Average Completion Time</h4>
          <div className="text-2xl font-bold text-gold-300">
            {Math.round(averageCompletionTime / 1000)}s
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-white mb-2">Most Problematic Fields</h4>
          <div className="space-y-2">
            {/* This would show fields with most errors/abandonment */}
            <div className="text-sm text-gray-300">
              Analytics would show detailed field-level insights here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFormAnalytics