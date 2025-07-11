/**
 * Interactive Mass Calendar Component
 * Implements 2025 research recommendations for service scheduling
 */
import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon 
} from '@heroicons/react/24/solid'

interface MassService {
  time: string
  type: string
  language?: string
  special?: string
}

interface DaySchedule {
  date: Date
  services: MassService[]
  isToday: boolean
  hasSpecialService: boolean
}

interface InteractiveMassCalendarProps {
  currentMonth?: Date
  reducedMotion?: boolean
}

export function InteractiveMassCalendar({ 
  currentMonth = new Date(), 
  reducedMotion = false 
}: InteractiveMassCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMonth, setViewMonth] = useState(currentMonth)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Generate calendar days
  const generateCalendarDays = (): DaySchedule[] => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days: DaySchedule[] = []
    const today = new Date()
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      const isToday = currentDate.toDateString() === today.toDateString()
      const dayOfWeek = currentDate.getDay()
      
      // Generate realistic Mass schedule
      const services: MassService[] = []
      
      if (dayOfWeek === 0) { // Sunday
        services.push(
          { time: '8:00 AM', type: 'Sunday Mass' },
          { time: '10:00 AM', type: 'Family Mass' },
          { time: '12:00 PM', type: 'Sunday Mass' },
          { time: '6:00 PM', type: 'Evening Mass' }
        )
      } else if (dayOfWeek === 6) { // Saturday
        services.push(
          { time: '9:00 AM', type: 'Morning Mass' },
          { time: '6:00 PM', type: 'Vigil Mass' }
        )
      } else { // Weekdays
        services.push({ time: '9:00 AM', type: 'Daily Mass' })
        if (dayOfWeek === 3) { // Wednesday
          services.push({ time: '7:00 PM', type: 'Evening Mass' })
        }
      }
      
      // Add special services for certain dates
      const hasSpecialService = Math.random() > 0.9
      if (hasSpecialService) {
        services.push({ 
          time: '7:30 PM', 
          type: 'Special Service', 
          special: 'Adoration' 
        })
      }
      
      days.push({
        date: currentDate,
        services,
        isToday,
        hasSpecialService
      })
    }
    
    return days
  }

  const [calendarDays, setCalendarDays] = useState<DaySchedule[]>([])

  useEffect(() => {
    setCalendarDays(generateCalendarDays())
  }, [viewMonth])

  // Calendar animation
  const calendarSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 200
  })

  // Navigation functions
  const goToPreviousMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <animated.div ref={ref} style={calendarSpring} className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6">
        <Motion.button
          onClick={goToPreviousMonth}
          className="w-10 h-10 bg-gold-700 hover:bg-gold-600 text-black rounded-full flex items-center justify-center transition-all duration-300"
          whileHover={reducedMotion ? {} : { scale: 1.1 }}
          whileTap={reducedMotion ? {} : { scale: 0.9 }}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Motion.button>

        <div className="text-center">
          <h3 className={`${typographyScale.h3} text-white mb-2`}>
            {monthNames[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </h3>
          <p className={`${typographyScale.caption} text-gray-300`}>
            Click any date to view services
          </p>
        </div>

        <Motion.button
          onClick={goToNextMonth}
          className="w-10 h-10 bg-gold-700 hover:bg-gold-600 text-black rounded-full flex items-center justify-center transition-all duration-300"
          whileHover={reducedMotion ? {} : { scale: 1.1 }}
          whileTap={reducedMotion ? {} : { scale: 0.9 }}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Motion.button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center py-2">
              <span className={`${typographyScale.caption} text-gray-300 font-semibold`}>
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <Motion.button
              key={index}
              onClick={() => setSelectedDate(day.date)}
              className={`
                relative p-3 rounded-xl text-left transition-all duration-300 group
                ${day.isToday 
                  ? 'bg-gold-700 text-black' 
                  : day.date.getMonth() === viewMonth.getMonth()
                    ? 'bg-white/5 hover:bg-white/15 text-white'
                    : 'bg-transparent text-gray-500'
                }
                ${day.hasSpecialService ? 'ring-2 ring-gold-500/50' : ''}
                ${selectedDate?.toDateString() === day.date.toDateString() 
                  ? 'ring-2 ring-white' : ''
                }
              `}
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
            >
              <div className="space-y-1">
                <span className={`${typographyScale.body} font-medium`}>
                  {day.date.getDate()}
                </span>
                
                {day.services.length > 0 && (
                  <div className="space-y-1">
                    {day.services.slice(0, 2).map((service, serviceIndex) => (
                      <div 
                        key={serviceIndex}
                        className={`text-xs px-2 py-1 rounded-md ${
                          day.isToday 
                            ? 'bg-black/20 text-black' 
                            : 'bg-white/20 text-gray-200'
                        }`}
                      >
                        {service.time.split(' ')[0]}
                      </div>
                    ))}
                    {day.services.length > 2 && (
                      <div className={`text-xs text-center ${
                        day.isToday ? 'text-black/70' : 'text-gray-400'
                      }`}>
                        +{day.services.length - 2}
                      </div>
                    )}
                  </div>
                )}

                {day.hasSpecialService && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
                )}
              </div>
            </Motion.button>
          ))}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center">
              <CalendarDaysIcon className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h4 className={`${typographyScale.h4} text-white mb-1`}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              <p className={`${typographyScale.caption} text-gray-300`}>
                Service schedule
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {calendarDays
              .find(day => day.date.toDateString() === selectedDate.toDateString())
              ?.services.map((service, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-slate-600 hover:border-gold-500/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-gold-400" />
                    <div>
                      <p className={`${typographyScale.body} text-white font-medium`}>
                        {service.time}
                      </p>
                      <p className={`${typographyScale.caption} text-gray-300`}>
                        {service.type}
                        {service.language && ` (${service.language})`}
                        {service.special && ` - ${service.special}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span className={`${typographyScale.caption} text-gray-400`}>
                      Main Church
                    </span>
                  </div>
                </Motion.div>
              ))}
          </div>
        </Motion.div>
      )}
    </animated.div>
  )
}

export default InteractiveMassCalendar