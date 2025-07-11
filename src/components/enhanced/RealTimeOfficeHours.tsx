import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface OfficeHoursProps {
  reducedMotion?: boolean
  className?: string
}

interface DaySchedule {
  day: string
  open: string
  close: string
  closed?: boolean
}

const schedule: DaySchedule[] = [
  { day: 'Monday', open: '09:00', close: '17:00' },
  { day: 'Tuesday', open: '09:00', close: '17:00' },
  { day: 'Wednesday', open: '09:00', close: '17:00' },
  { day: 'Thursday', open: '09:00', close: '17:00' },
  { day: 'Friday', open: '09:00', close: '17:00' },
  { day: 'Saturday', open: '10:00', close: '14:00' },
  { day: 'Sunday', open: '', close: '', closed: true }
]

export const RealTimeOfficeHours: React.FC<OfficeHoursProps> = ({
  reducedMotion = false,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [nextChange, setNextChange] = useState<string>('')
  const [timeUntilChange, setTimeUntilChange] = useState<string>('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      const dayOfWeek = now.getDay()
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const todaySchedule = schedule.find(s => s.day === dayNames[dayOfWeek])
      
      if (!todaySchedule || todaySchedule.closed) {
        setIsOpen(false)
        // Find next open day
        const nextOpenDay = findNextOpenDay(dayOfWeek)
        setNextChange(`Opens ${nextOpenDay}`)
        setTimeUntilChange(calculateTimeUntilNextOpen(dayOfWeek))
      } else {
        const currentHours = now.getHours()
        const currentMinutes = now.getMinutes()
        const currentTimeMinutes = currentHours * 60 + currentMinutes
        
        const openTimeMinutes = timeToMinutes(todaySchedule.open)
        const closeTimeMinutes = timeToMinutes(todaySchedule.close)
        
        const isCurrentlyOpen = currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes
        setIsOpen(isCurrentlyOpen)
        
        if (isCurrentlyOpen) {
          setNextChange(`Closes at ${formatTime(todaySchedule.close)}`)
          setTimeUntilChange(calculateTimeUntilClose(now, todaySchedule.close))
        } else if (currentTimeMinutes < openTimeMinutes) {
          setNextChange(`Opens at ${formatTime(todaySchedule.open)}`)
          setTimeUntilChange(calculateTimeUntilOpen(now, todaySchedule.open))
        } else {
          // After closing, show next open day
          const nextOpenDay = findNextOpenDay(dayOfWeek)
          setNextChange(`Opens ${nextOpenDay}`)
          setTimeUntilChange(calculateTimeUntilNextOpen(dayOfWeek))
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const formatTime = (time: string): string => {
    return time
  }

  const findNextOpenDay = (currentDay: number): string => {
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const nextSchedule = schedule.find(s => s.day === dayNames[nextDay])
      if (nextSchedule && !nextSchedule.closed) {
        return i === 1 ? 'tomorrow' : `on ${dayNames[nextDay]}`
      }
    }
    return 'Monday'
  }

  const calculateTimeUntilOpen = (now: Date, openTime: string): string => {
    const [openHours, openMinutes] = openTime.split(':').map(Number)
    const openDate = new Date(now)
    openDate.setHours(openHours, openMinutes, 0, 0)
    
    const diff = openDate.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`
    } else {
      return `in ${minutes}m`
    }
  }

  const calculateTimeUntilClose = (now: Date, closeTime: string): string => {
    const [closeHours, closeMinutes] = closeTime.split(':').map(Number)
    const closeDate = new Date(now)
    closeDate.setHours(closeHours, closeMinutes, 0, 0)
    
    const diff = closeDate.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`
    } else {
      return `in ${minutes}m`
    }
  }

  const calculateTimeUntilNextOpen = (currentDay: number): string => {
    const now = new Date()
    
    // Find next open day
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const nextSchedule = schedule.find(s => s.day === dayNames[nextDay])
      
      if (nextSchedule && !nextSchedule.closed) {
        const nextOpenDate = new Date(now)
        nextOpenDate.setDate(now.getDate() + i)
        const [openHours, openMinutes] = nextSchedule.open.split(':').map(Number)
        nextOpenDate.setHours(openHours, openMinutes, 0, 0)
        
        const diff = nextOpenDate.getTime() - now.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        
        if (days > 0) {
          return `in ${days}d ${hours}h`
        } else {
          return `in ${hours}h`
        }
      }
    }
    
    return 'Monday'
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="text-center space-y-4">
        {/* Current Status */}
        <motion.div
          className="flex items-center justify-center gap-3"
          variants={itemVariants}
        >
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isOpen ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
            variants={!reducedMotion && isOpen ? pulseVariants : {}}
            animate={!reducedMotion && isOpen ? "pulse" : ""}
          >
            {isOpen ? (
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-400" />
            )}
          </motion.div>
          <div className="text-left">
            <div className={`text-lg font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {isOpen ? 'Open Now' : 'Closed'}
            </div>
            <div className="text-sm text-gray-300">
              {nextChange}
            </div>
          </div>
        </motion.div>

        {/* Time Until Change */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="text-2xl font-bold text-white">
            {timeUntilChange}
          </div>
          <div className="text-sm text-gray-400">
            {isOpen ? 'until closing' : 'until opening'}
          </div>
        </motion.div>

        {/* Current Time */}
        <motion.div
          className="flex items-center justify-center gap-2 text-gray-300"
          variants={itemVariants}
        >
          <ClockIcon className="h-4 w-4" />
          <span className="text-sm">
            {currentTime.toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false
            })}
          </span>
        </motion.div>

        {/* Weekly Schedule */}
        <motion.div
          className="mt-6 space-y-2"
          variants={itemVariants}
        >
          <div className="text-sm font-semibold text-white text-center mb-3">
            Weekly Schedule
          </div>
          <div className="space-y-1">
            {schedule.map((day, index) => (
              <div
                key={day.day}
                className={`flex justify-between items-center text-xs px-3 py-1 rounded ${
                  day.day === currentTime.toLocaleDateString('en-GB', { weekday: 'long' })
                    ? 'bg-gold-500/20 text-gold-300'
                    : 'text-gray-400'
                }`}
              >
                <span>{day.day}</span>
                <span>
                  {day.closed ? 'Closed' : `${day.open} - ${day.close}`}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RealTimeOfficeHours