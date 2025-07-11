/**
 * Reading Progress Indicator Component
 * Implements 2025 research recommendations for article reading experience
 */
import React, { useState, useEffect } from 'react'
import { Motion } from '@/lib/motion'

interface ReadingProgressIndicatorProps {
  className?: string
}

export function ReadingProgressIndicator({ className = '' }: ReadingProgressIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <Motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </Motion.div>
  )
}

export default ReadingProgressIndicator