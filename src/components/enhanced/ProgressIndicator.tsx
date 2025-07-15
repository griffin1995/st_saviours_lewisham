import React, { useEffect, useState } from 'react'
import { Motion } from '@/lib/motion'

interface ProgressIndicatorProps {
  sections: string[]
  activeSection: number
  position?: 'left' | 'right'
  reducedMotion?: boolean
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  sections,
  activeSection,
  position = 'left',
  reducedMotion = false
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const positionClasses = {
    left: 'left-6',
    right: 'right-6'
  }

  return (
    <div className={`fixed ${positionClasses[position]} top-1/2 transform -translate-y-1/2 z-40`}>
      <div className="bg-black/20 backdrop-blur-sm rounded-full p-4">
        {/* Progress Bar */}
        <div className="relative w-1 h-48 bg-white/20 rounded-full mb-4">
          <m.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-400 to-gold-600 rounded-full"
            style={{ height: `${scrollProgress}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${scrollProgress}%` }}
            transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
          />
        </div>

        {/* Section Indicators */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const isActive = index === activeSection
            const isPassed = index < activeSection

            return (
              <m.div
                key={index}
                className="flex items-center gap-3"
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
              >
                <div className="relative">
                  <m.div
                    className={`w-3 h-3 rounded-full border-2 ${
                      isActive
                        ? 'bg-gold-400 border-gold-400'
                        : isPassed
                        ? 'bg-green-400 border-green-400'
                        : 'bg-transparent border-white/40'
                    }`}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      boxShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.5)' : 'none'
                    }}
                    transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
                  />
                  
                  {isActive && (
                    <m.div
                      className="absolute inset-0 w-3 h-3 rounded-full bg-gold-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: reducedMotion ? 0 : 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  )}
                </div>

                {/* Section Label (shows on hover) */}
                <m.div
                  className={`text-xs text-white bg-black/60 px-2 py-1 rounded whitespace-nowrap ${
                    position === 'left' ? 'ml-2' : 'mr-2'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
                >
                  {section}
                </m.div>
              </m.div>
            )
          })}
        </div>

        {/* Scroll Percentage */}
        <div className="mt-4 text-center">
          <div className="text-xs text-white/60">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  )
}