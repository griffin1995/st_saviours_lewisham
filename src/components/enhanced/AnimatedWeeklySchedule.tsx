import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  CalendarDaysIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  UserGroupIcon,
  SparklesIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/solid'

interface ScheduleItem {
  day: string
  group: string
  time: string
  location?: string
  frequency?: string
  description?: string
  attendees?: number
}

interface AnimatedWeeklyScheduleProps {
  schedule: ScheduleItem[]
  reducedMotion?: boolean
  className?: string
}

const enhancedSchedule: ScheduleItem[] = [
  { 
    day: "Sunday", 
    group: "Coffee After Mass", 
    time: "After 11:30 AM Mass",
    location: "Parish Hall",
    frequency: "Weekly",
    description: "Community fellowship time",
    attendees: 45
  },
  { 
    day: "Sunday", 
    group: "Youth Group", 
    time: "6:00 PM",
    location: "Community Room",
    frequency: "Weekly",
    description: "Fun, friendship, and faith for ages 11-18",
    attendees: 15
  },
  { 
    day: "Tuesday", 
    group: "Scripture Study Group", 
    time: "7:30 PM",
    location: "Community Room",
    frequency: "Weekly",
    description: "Weekly Bible study and prayer",
    attendees: 12
  },
  { 
    day: "Wednesday", 
    group: "St Vincent de Paul Society", 
    time: "7:30 PM",
    location: "Parish Office",
    frequency: "2nd Wednesday",
    description: "Caring for those in need",
    attendees: 8
  },
  { 
    day: "Thursday", 
    group: "Parish Choir", 
    time: "7:00 PM",
    location: "Church",
    frequency: "Weekly",
    description: "Music ministry practice",
    attendees: 20
  },
  { 
    day: "Friday", 
    group: "Mother & Toddler Group", 
    time: "10:00 AM",
    location: "Parish Hall",
    frequency: "Weekly",
    description: "Social time for parents and children",
    attendees: 18
  },
  { 
    day: "Saturday", 
    group: "Justice & Peace Group", 
    time: "10:00 AM",
    location: "Community Room",
    frequency: "1st Saturday",
    description: "Working for social justice",
    attendees: 10
  }
]

export const AnimatedWeeklySchedule: React.FC<AnimatedWeeklyScheduleProps> = ({
  schedule = enhancedSchedule,
  reducedMotion = false,
  className = ''
}) => {
  const [currentDay, setCurrentDay] = useState(0)
  const [view, setView] = useState<'week' | 'day' | 'list'>('week')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [autoAdvance, setAutoAdvance] = useState(true)

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDayName = days[new Date().getDay()]

  // Group schedule by day
  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = schedule.filter(item => item.day === day)
    return acc
  }, {} as Record<string, ScheduleItem[]>)

  // Auto-advance through days
  useEffect(() => {
    if (!autoAdvance || view !== 'day') return

    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % days.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoAdvance, view])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  const dayVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.5 }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: reducedMotion ? 0.1 : 0.3 }
    }
  }

  const ViewToggle: React.FC = () => (
    <div className="flex bg-gray-100 rounded-full p-1">
      {(['week', 'day', 'list'] as const).map((viewType) => (
        <button
          key={viewType}
          onClick={() => setView(viewType)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            view === viewType
              ? 'bg-gold-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
        </button>
      ))}
    </div>
  )

  const ScheduleCard: React.FC<{ item: ScheduleItem; index: number }> = ({ item, index }) => (
    <m.div
      className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      variants={itemVariants}
      whileHover={!reducedMotion ? { y: -2, scale: 1.02 } : {}}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{item.group}</h4>
          <span className="text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded-full font-medium">
            {item.frequency}
          </span>
        </div>

        {/* Time and Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 text-gold-600" />
            <span>{item.time}</span>
          </div>
          {item.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 text-blue-600" />
              <span>{item.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
        )}

        {/* Attendees */}
        {item.attendees && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <UserGroupIcon className="h-3 w-3" />
            <span>~{item.attendees} regular attendees</span>
          </div>
        )}
      </div>
    </m.div>
  )

  const DayView: React.FC = () => {
    const todaysSchedule = scheduleByDay[days[currentDay]]
    
    return (
      <div className="space-y-6">
        {/* Day Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentDay((prev) => (prev - 1 + days.length) % days.length)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          
          <AnimatePresence mode="wait">
            <m.div
              key={currentDay}
              variants={dayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{days[currentDay]}</h3>
              {days[currentDay] === currentDayName && (
                <span className="text-sm text-gold-600 font-medium">Today</span>
              )}
            </m.div>
          </AnimatePresence>
          
          <button
            onClick={() => setCurrentDay((prev) => (prev + 1) % days.length)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Schedule Items */}
        <m.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {todaysSchedule.length > 0 ? (
            todaysSchedule.map((item, index) => (
              <ScheduleCard key={`${item.group}-${index}`} item={item} index={index} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No scheduled groups on {days[currentDay]}</p>
            </div>
          )}
        </m.div>

        {/* Auto-advance Toggle */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              autoAdvance 
                ? 'bg-gold-100 text-gold-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {autoAdvance ? 'Auto-cycling on' : 'Auto-cycling off'}
          </button>
        </div>
      </div>
    )
  }

  const WeekView: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
      {days.map((day, dayIndex) => (
        <m.div
          key={day}
          className={`rounded-2xl p-4 ${
            day === currentDayName 
              ? 'bg-gold-50 border-2 border-gold-200' 
              : 'bg-gray-50 border border-gray-200'
          }`}
          variants={itemVariants}
          whileHover={!reducedMotion ? { scale: 1.02 } : {}}
        >
          <h4 className={`font-semibold mb-3 ${
            day === currentDayName ? 'text-gold-800' : 'text-gray-900'
          }`}>
            {day}
            {day === currentDayName && (
              <span className="ml-2 text-xs bg-gold-600 text-white px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </h4>
          
          <div className="space-y-2">
            {scheduleByDay[day].map((item, index) => (
              <div
                key={`${item.group}-${index}`}
                className="bg-white rounded-lg p-3 shadow-sm"
              >
                <h5 className="font-medium text-sm text-gray-900 mb-1">{item.group}</h5>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <ClockIcon className="h-3 w-3" />
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
            {scheduleByDay[day].length === 0 && (
              <p className="text-xs text-gray-400 italic">No groups meeting</p>
            )}
          </div>
        </m.div>
      ))}
    </div>
  )

  const ListView: React.FC = () => (
    <m.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {schedule.map((item, index) => (
        <ScheduleCard key={`${item.group}-${index}`} item={item} index={index} />
      ))}
    </m.div>
  )

  return (
    <m.div
      className={`bg-white rounded-3xl shadow-xl overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Weekly Schedule</h3>
            <p className="text-gray-300">Find your perfect group meeting time</p>
          </div>
          
          <ViewToggle />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-400">{schedule.length}</div>
            <div className="text-xs text-gray-300">Active Groups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-400">
              {schedule.reduce((sum, item) => sum + (item.attendees || 0), 0)}
            </div>
            <div className="text-xs text-gray-300">Weekly Attendees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-400">7</div>
            <div className="text-xs text-gray-300">Days Active</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {view === 'week' && <WeekView />}
          {view === 'day' && <DayView />}
          {view === 'list' && <ListView />}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-4 w-4 text-gold-600" />
            <span>All groups welcome new members</span>
          </div>
          <div className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            <span>Visit anytime</span>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <m.div
            className="absolute top-20 right-10 w-3 h-3 bg-gold-400 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <m.div
            className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      )}
    </m.div>
  )
}

export default AnimatedWeeklySchedule