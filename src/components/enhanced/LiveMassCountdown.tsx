/**
 * Live Mass Countdown Timer
 * Implements 2025 research recommendations for real-time service updates
 */
import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  ClockIcon,
  CalendarDaysIcon,
  PlayIcon,
  BellIcon,
  MapPinIcon
} from '@heroicons/react/24/solid'

interface MassTime {
  day: string
  time: string
  type: string
  language?: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface LiveMassCountdownProps {
  reducedMotion?: boolean
}

export function LiveMassCountdown({ reducedMotion = false }: LiveMassCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [nextMass, setNextMass] = useState<MassTime | null>(null)
  const [isLive, setIsLive] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Mass schedule - in a real app, this would come from an API
  const massSchedule: MassTime[] = [
    { day: 'Sunday', time: '08:00', type: 'Sunday Mass' },
    { day: 'Sunday', time: '10:00', type: 'Family Mass' },
    { day: 'Sunday', time: '12:00', type: 'Sunday Mass' },
    { day: 'Sunday', time: '18:00', type: 'Evening Mass' },
    { day: 'Monday', time: '09:00', type: 'Daily Mass' },
    { day: 'Tuesday', time: '09:00', type: 'Daily Mass' },
    { day: 'Wednesday', time: '09:00', type: 'Daily Mass' },
    { day: 'Wednesday', time: '19:00', type: 'Evening Mass' },
    { day: 'Thursday', time: '09:00', type: 'Daily Mass' },
    { day: 'Friday', time: '09:00', type: 'Daily Mass' },
    { day: 'Saturday', time: '09:00', type: 'Morning Mass' },
    { day: 'Saturday', time: '18:00', type: 'Vigil Mass' }
  ]

  const findNextMass = (): { mass: MassTime; date: Date } | null => {
    const now = new Date()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    // Check today's remaining masses
    const today = dayNames[now.getDay()]
    const todayMasses = massSchedule.filter(mass => mass.day === today)
    
    for (const mass of todayMasses) {
      const [hours, minutes] = mass.time.split(':').map(Number)
      const massTime = new Date(now)
      massTime.setHours(hours, minutes, 0, 0)
      
      if (massTime > now) {
        return { mass, date: massTime }
      }
    }
    
    // Check upcoming days (next 7 days)
    for (let i = 1; i <= 7; i++) {
      const checkDate = new Date(now)
      checkDate.setDate(now.getDate() + i)
      const dayName = dayNames[checkDate.getDay()]
      
      const dayMasses = massSchedule.filter(mass => mass.day === dayName)
      if (dayMasses.length > 0) {
        const firstMass = dayMasses[0]
        const [hours, minutes] = firstMass.time.split(':').map(Number)
        const massTime = new Date(checkDate)
        massTime.setHours(hours, minutes, 0, 0)
        
        return { mass: firstMass, date: massTime }
      }
    }
    
    return null
  }

  const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    
    return { days, hours, minutes, seconds }
  }

  const checkIfMassIsLive = (): boolean => {
    const now = new Date()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = dayNames[now.getDay()]
    const todayMasses = massSchedule.filter(mass => mass.day === today)
    
    for (const mass of todayMasses) {
      const [hours, minutes] = mass.time.split(':').map(Number)
      const massStart = new Date(now)
      massStart.setHours(hours, minutes, 0, 0)
      
      const massEnd = new Date(massStart)
      massEnd.setHours(massStart.getHours() + 1) // Assume 1 hour duration
      
      if (now >= massStart && now <= massEnd) {
        return true
      }
    }
    
    return false
  }

  useEffect(() => {
    const updateCountdown = () => {
      const nextMassData = findNextMass()
      if (nextMassData) {
        setNextMass(nextMassData.mass)
        setTimeRemaining(calculateTimeRemaining(nextMassData.date))
      }
      setIsLive(checkIfMassIsLive())
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  // Countdown animation
  const countdownSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 100
  })

  // Live indicator animation
  const liveSpring = useSpring({
    scale: isLive ? 1.1 : 1,
    config: { tension: 300, friction: 10 },
    loop: isLive && !reducedMotion
  })

  const formatTime = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const getTimeUnit = (value: number, unit: string): string => {
    return value === 1 ? unit : `${unit}s`
  }

  return (
    <animated.div ref={ref} style={countdownSpring} className="space-y-6">
      {/* Live Mass Indicator */}
      {isLive && (
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-center"
        >
          <animated.div style={liveSpring} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
            <span className={`${typographyScale.h3} text-white font-bold`}>
              LIVE NOW
            </span>
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
          </animated.div>
          <p className={`${typographyScale.bodyLarge} text-white mb-4`}>
            Mass is currently being celebrated
          </p>
          <Motion.button
            className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
          >
            <PlayIcon className="h-5 w-5 inline mr-2" />
            Watch Live Stream
          </Motion.button>
        </m.div>
      )}

      {/* Next Mass Countdown */}
      {!isLive && nextMass && (
        <div className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <m.div
              className="w-20 h-20 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <ClockIcon className="h-10 w-10 text-gold-400" />
            </m.div>
            
            <h3 className={`${typographyScale.h2} text-white mb-4`}>
              Next Mass
            </h3>
            <div className="flex items-center justify-center gap-4 mb-2">
              <CalendarDaysIcon className="h-5 w-5 text-gold-400" />
              <span className={`${typographyScale.bodyLarge} text-white font-medium`}>
                {nextMass.day} at {nextMass.time.replace(':', ':')}
              </span>
            </div>
            <p className={`${typographyScale.body} text-gray-300`}>
              {nextMass.type}
              {nextMass.language && ` (${nextMass.language})`}
            </p>
          </div>

          {/* Countdown Display */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { value: timeRemaining.days, label: 'Days' },
              { value: timeRemaining.hours, label: 'Hours' },
              { value: timeRemaining.minutes, label: 'Minutes' },
              { value: timeRemaining.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <m.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white/10 rounded-2xl p-4 border border-slate-600">
                  <Motion.span
                    className={`${typographyScale.h1} text-gold-400 font-bold block`}
                    key={item.value} // Re-animate on value change
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatTime(item.value)}
                  </Motion.span>
                  <span className={`${typographyScale.caption} text-gray-300 uppercase tracking-wider`}>
                    {getTimeUnit(item.value, item.label.slice(0, -1))}
                  </span>
                </div>
              </m.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion.button
              className="flex items-center justify-center gap-3 bg-gold-700 text-black px-6 py-3 rounded-xl font-semibold hover:bg-gold-600 transition-colors duration-300"
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <BellIcon className="h-5 w-5" />
              Set Reminder
            </Motion.button>
            
            <Motion.button
              className="flex items-center justify-center gap-3 bg-white/10 border border-slate-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/15 transition-colors duration-300"
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <MapPinIcon className="h-5 w-5" />
              Get Directions
            </Motion.button>
          </div>
        </div>
      )}

      {/* Today's Schedule Preview */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6"
      >
        <h4 className={`${typographyScale.h4} text-white mb-4 text-center`}>
          Today's Mass Schedule
        </h4>
        
        <div className="space-y-3">
          {(() => {
            const now = new Date()
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const today = dayNames[now.getDay()]
            const todayMasses = massSchedule.filter(mass => mass.day === today)
            
            if (todayMasses.length === 0) {
              return (
                <div className="text-center py-8">
                  <p className={`${typographyScale.body} text-gray-300`}>
                    No scheduled Masses today
                  </p>
                </div>
              )
            }
            
            return todayMasses.map((mass, index) => {
              const [hours, minutes] = mass.time.split(':').map(Number)
              const massTime = new Date(now)
              massTime.setHours(hours, minutes, 0, 0)
              const isPast = massTime < now
              const isCurrent = massTime <= now && massTime > new Date(now.getTime() - 60 * 60 * 1000) // Within last hour
              
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                    ${isCurrent 
                      ? 'bg-red-600/20 border-red-500' 
                      : isPast 
                        ? 'bg-white/5 border-slate-700 opacity-60' 
                        : 'bg-white/10 border-slate-600 hover:border-gold-500/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isCurrent 
                        ? 'bg-red-500 text-white' 
                        : isPast 
                          ? 'bg-gray-600 text-gray-300' 
                          : 'bg-gold-700/20 text-gold-400'
                      }
                    `}>
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className={`${typographyScale.body} ${isPast ? 'text-gray-400' : 'text-white'} font-medium`}>
                        {mass.time.replace(':', ':')}
                      </p>
                      <p className={`${typographyScale.caption} ${isPast ? 'text-gray-500' : 'text-gray-300'}`}>
                        {mass.type}
                      </p>
                    </div>
                  </div>
                  
                  {isCurrent && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className={`${typographyScale.caption} text-red-400 font-medium`}>
                        LIVE
                      </span>
                    </div>
                  )}
                  
                  {isPast && !isCurrent && (
                    <span className={`${typographyScale.caption} text-gray-500`}>
                      Completed
                    </span>
                  )}
                </m.div>
              )
            })
          })()}
        </div>
      </m.div>
    </animated.div>
  )
}

export default LiveMassCountdown