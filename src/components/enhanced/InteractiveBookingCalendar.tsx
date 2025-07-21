import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  CalendarDaysIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/solid'
import { prefersReducedMotion } from '@/lib/utils'

interface BookingSlot {
  id: string
  date: string
  time: string
  duration: number
  venue: string
  available: boolean
  capacity: number
  rate: string
}

interface InteractiveBookingCalendarProps {
  venueId?: string
  onSlotSelect?: (slot: BookingSlot) => void
  reducedMotion?: boolean
  className?: string
}

// Mock booking data
const mockBookingSlots: BookingSlot[] = [
  {
    id: '1',
    date: '2025-01-27',
    time: '09:00',
    duration: 4,
    venue: 'Parish Hall',
    available: true,
    capacity: 100,
    rate: '£150'
  },
  {
    id: '2',
    date: '2025-01-27',
    time: '14:00',
    duration: 4,
    venue: 'Parish Hall',
    available: false,
    capacity: 100,
    rate: '£150'
  },
  {
    id: '3',
    date: '2025-01-28',
    time: '10:00',
    duration: 2,
    venue: 'Community Room',
    available: true,
    capacity: 30,
    rate: '£75'
  },
  {
    id: '4',
    date: '2025-01-29',
    time: '18:00',
    duration: 3,
    venue: 'Church Hall',
    available: true,
    capacity: 150,
    rate: '£200'
  }
]

export const InteractiveBookingCalendar: React.FC<InteractiveBookingCalendarProps> = ({
  venueId,
  onSlotSelect,
  reducedMotion = false,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null)
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>(mockBookingSlots)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        // Use the passed reducedMotion prop
      }
    }
  }, [])

  const handleSlotClick = (slot: BookingSlot) => {
    if (!slot.available) return
    
    setSelectedSlot(slot)
    setShowBookingModal(true)
    onSlotSelect?.(slot)
  }

  const handleBookingConfirm = () => {
    if (selectedSlot) {
      // Update slot availability
      setAvailableSlots(prev =>
        prev.map(slot =>
          slot.id === selectedSlot.id
            ? { ...slot, available: false }
            : slot
        )
      )
      setShowBookingModal(false)
      setSelectedSlot(null)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= lastDay || days.length < 42) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const getSlotForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return availableSlots.filter(slot => slot.date === dateStr)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

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

  return (
    <m.div
      className={`bg-white rounded-3xl shadow-xl p-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div>
          <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
            Booking Calendar
          </h3>
          <p className="text-gray-600">
            Select available dates and times for your venue booking
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          {['month', 'week', 'day'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as typeof viewMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </m.div>

      {/* Calendar Navigation */}
      <m.div
        className="flex items-center justify-between mb-6"
        variants={itemVariants}
      >
        <h4 className="text-xl font-semibold text-slate-900">
          {currentDate.toLocaleDateString('en-GB', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h4>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </m.div>

      {/* Calendar Grid */}
      <m.div variants={itemVariants}>
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth().map((date, index) => {
            const slots = getSlotForDate(date)
            const isCurrentMonth = date.getMonth() === currentDate.getMonth()
            const isToday = date.toDateString() === new Date().toDateString()
            const hasAvailableSlots = slots.some(slot => slot.available)

            return (
              <m.div
                key={index}
                className={`relative aspect-square border-2 rounded-xl p-2 cursor-pointer transition-all duration-200 ${
                  isCurrentMonth
                    ? hasAvailableSlots
                      ? 'border-green-200 bg-green-50 hover:border-green-300'
                      : slots.length > 0
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    : 'border-gray-100 bg-gray-50 text-gray-400'
                } ${isToday ? 'ring-2 ring-gold-400' : ''}`}
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
              >
                <div className="text-sm font-medium">
                  {date.getDate()}
                </div>
                
                {slots.length > 0 && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className={`text-xs px-1 py-0.5 rounded ${
                      hasAvailableSlots
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {slots.length} slot{slots.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </m.div>
            )
          })}
        </div>
      </m.div>

      {/* Available Slots List */}
      <m.div
        className="mt-8 pt-8 border-t border-gray-200"
        variants={itemVariants}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-4">
          Available Time Slots
        </h4>

        <div className="space-y-3">
          {availableSlots.filter(slot => slot.available).map((slot) => (
            <m.div
              key={slot.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleSlotClick(slot)}
              whileHover={reducedMotion ? {} : { x: 4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CalendarDaysIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {formatDate(slot.date)}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {slot.time} ({slot.duration}h)
                    </span>
                    <span className="flex items-center gap-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      {slot.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserGroupIcon className="h-4 w-4" />
                      {slot.capacity} capacity
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">{slot.rate}</div>
                <div className="text-sm text-green-600">Available</div>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <m.div
              className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Confirm Booking
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-slate-900 mb-2">
                    {formatDate(selectedSlot.date)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Time: {selectedSlot.time} ({selectedSlot.duration} hours)</div>
                    <div>Venue: {selectedSlot.venue}</div>
                    <div>Capacity: {selectedSlot.capacity} people</div>
                    <div>Rate: {selectedSlot.rate}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    This will reserve the time slot. You'll receive a confirmation email
                    with payment details.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookingConfirm}
                  className="flex-1 px-4 py-3 rounded-xl bg-gold-600 text-white hover:bg-gold-700 transition-colors font-semibold"
                >
                  Confirm Booking
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default InteractiveBookingCalendar