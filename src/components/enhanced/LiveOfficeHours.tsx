import React, { useState, useEffect } from 'react'
import { Motion } from '@/lib/motion'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface Schedule {
  [key: string]: { open: string; close: string }
}

interface LiveOfficeHoursProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  schedule: Schedule
  timezone?: string
  reducedMotion?: boolean
}

export const LiveOfficeHours: React.FC<LiveOfficeHoursProps> = ({
  position = 'top-right',
  schedule,
  timezone = 'Europe/London',
  reducedMotion = false
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [nextChange, setNextChange] = useState<string>('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      const day = now.toLocaleLowerCase('en-US', { weekday: 'long' })
      const todaySchedule = schedule[day]
      
      if (todaySchedule) {
        const [openHour, openMin] = todaySchedule.open.split(':').map(Number)
        const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number)
        
        const openTime = new Date(now)
        openTime.setHours(openHour, openMin, 0, 0)
        
        const closeTime = new Date(now)
        closeTime.setHours(closeHour, closeMin, 0, 0)
        
        const currentOpen = now >= openTime && now <= closeTime
        setIsOpen(currentOpen)
        
        if (currentOpen) {
          const timeUntilClose = closeTime.getTime() - now.getTime()
          const hoursLeft = Math.floor(timeUntilClose / (1000 * 60 * 60))
          const minutesLeft = Math.floor((timeUntilClose % (1000 * 60 * 60)) / (1000 * 60))
          setNextChange(`Closes in ${hoursLeft}h ${minutesLeft}m`)
        } else {
          const timeUntilOpen = openTime.getTime() - now.getTime()
          if (timeUntilOpen > 0) {
            const hoursLeft = Math.floor(timeUntilOpen / (1000 * 60 * 60))
            const minutesLeft = Math.floor((timeUntilOpen % (1000 * 60 * 60)) / (1000 * 60))
            setNextChange(`Opens in ${hoursLeft}h ${minutesLeft}m`)
          } else {
            setNextChange('Closed today')
          }
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [schedule])

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  return (
    <Motion.div
      className={`fixed ${positionClasses[position]} z-50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      whileHover={reducedMotion ? {} : { scale: 1.05 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
        <div className="text-white">
          <div className="flex items-center gap-2 mb-1">
            {isOpen ? (
              <CheckCircleIcon className="h-4 w-4 text-green-400" />
            ) : (
              <XCircleIcon className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm font-medium">
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <div className="text-xs text-gray-300 flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {nextChange}
          </div>
        </div>
      </div>
    </Motion.div>
  )
}