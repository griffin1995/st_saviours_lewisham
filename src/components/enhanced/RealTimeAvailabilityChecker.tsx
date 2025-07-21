import React, { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  WifiIcon,
  SignalIcon
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

// CVA for status indicators following 2025 standards
const statusVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      status: {
        available: 'bg-green-100 text-green-800',
        booked: 'bg-red-100 text-red-800', 
        maintenance: 'bg-orange-100 text-orange-800',
        pending: 'bg-yellow-100 text-yellow-800'
      }
    },
    defaultVariants: {
      status: 'available'
    }
  }
)

interface VenueAvailability {
  id: string
  name: string
  capacity: number
  status: 'available' | 'booked' | 'maintenance' | 'pending'
  nextAvailable?: string
  currentBooking?: {
    event: string
    endTime: string
    organizer: string
  }
  realTimeOccupancy?: number
  lastUpdated: Date
}

interface RealTimeAvailabilityCheckerProps {
  venues?: VenueAvailability[]
  autoRefresh?: boolean
  refreshInterval?: number
  showOccupancy?: boolean
  reducedMotion?: boolean
  className?: string
}

// Mock real-time data
const mockVenueData: VenueAvailability[] = [
  {
    id: 'parish-hall',
    name: 'Parish Hall',
    capacity: 120,
    status: 'available',
    realTimeOccupancy: 0,
    lastUpdated: new Date()
  },
  {
    id: 'community-room',
    name: 'Community Room',
    capacity: 30,
    status: 'booked',
    currentBooking: {
      event: 'Bible Study Group',
      endTime: '21:00',
      organizer: 'Fr. Michael'
    },
    nextAvailable: 'Tomorrow at 9:00 AM',
    realTimeOccupancy: 15,
    lastUpdated: new Date()
  },
  {
    id: 'church-hall',
    name: 'Church Hall',
    capacity: 150,
    status: 'maintenance',
    nextAvailable: 'Monday at 10:00 AM',
    realTimeOccupancy: 0,
    lastUpdated: new Date()
  },
  {
    id: 'meeting-room',
    name: 'Small Meeting Room',
    capacity: 12,
    status: 'pending',
    realTimeOccupancy: 0,
    lastUpdated: new Date()
  }
]

export const RealTimeAvailabilityChecker: React.FC<RealTimeAvailabilityCheckerProps> = ({
  venues = mockVenueData,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
  showOccupancy = true,
  reducedMotion = false,
  className = ''
}) => {
  const [venueData, setVenueData] = useState<VenueAvailability[]>(venues)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected')
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      // reducedMotion prop takes precedence
    }
  }, [])

  // Simulate real-time updates
  const updateVenueData = useCallback(() => {
    setIsRefreshing(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setVenueData(prev => prev.map(venue => ({
        ...venue,
        realTimeOccupancy: Math.floor(Math.random() * venue.capacity * 0.8),
        lastUpdated: new Date()
      })))
      setIsRefreshing(false)
      setLastRefresh(new Date())
    }, 1000)
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      updateVenueData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, updateVenueData])

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      const random = Math.random()
      if (random < 0.05) { // 5% chance of disconnection
        setConnectionStatus('disconnected')
        setTimeout(() => {
          setConnectionStatus('reconnecting')
          setTimeout(() => {
            setConnectionStatus('connected')
          }, 2000)
        }, 1000)
      }
    }, 10000)

    return () => clearInterval(connectionInterval)
  }, [])

  const getStatusIcon = (status: VenueAvailability['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'booked':
        return <XMarkIcon className="h-4 w-4" />
      case 'maintenance':
        return <InformationCircleIcon className="h-4 w-4" />
      case 'pending':
        return <ClockIcon className="h-4 w-4" />
      default:
        return <InformationCircleIcon className="h-4 w-4" />
    }
  }

  const getStatusText = (status: VenueAvailability['status']) => {
    switch (status) {
      case 'available':
        return 'Available Now'
      case 'booked':
        return 'Currently Booked'
      case 'maintenance':
        return 'Under Maintenance'
      case 'pending':
        return 'Booking Pending'
      default:
        return 'Unknown Status'
    }
  }

  const getOccupancyPercentage = (occupancy: number, capacity: number) => {
    return Math.round((occupancy / capacity) * 100)
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
      className={cn('bg-white rounded-3xl shadow-xl p-8', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header with real-time status */}
      <m.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div>
          <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
            Real-Time Availability
          </h3>
          <p className="text-gray-600">
            Live venue status and occupancy information
          </p>
        </div>

        {/* Connection Status & Refresh */}
        <div className="flex items-center gap-4">
          {/* Connection Indicator */}
          <div className="flex items-center gap-2">
            {connectionStatus === 'connected' && (
              <div className="flex items-center gap-2 text-green-600">
                <SignalIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Live</span>
              </div>
            )}
            {connectionStatus === 'disconnected' && (
              <div className="flex items-center gap-2 text-red-600">
                <WifiIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Offline</span>
              </div>
            )}
            {connectionStatus === 'reconnecting' && (
              <div className="flex items-center gap-2 text-orange-600">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Reconnecting</span>
              </div>
            )}
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={updateVenueData}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            aria-label="Refresh venue data"
          >
            <ArrowPathIcon className={cn(
              'h-5 w-5 text-gray-600',
              isRefreshing && 'animate-spin'
            )} />
          </button>
        </div>
      </m.div>

      {/* Last Updated Info */}
      <m.div
        className="mb-6 p-3 bg-gray-50 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ClockIcon className="h-4 w-4" />
          <span>
            Last updated: {lastRefresh.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
          {autoRefresh && (
            <span className="text-gray-500">
              • Auto-refresh every {refreshInterval / 1000}s
            </span>
          )}
        </div>
      </m.div>

      {/* Venue Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {venueData.map((venue, index) => (
            <m.div
              key={venue.id}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {venue.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Capacity: {venue.capacity} people
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={statusVariants({ status: venue.status })}>
                  {getStatusIcon(venue.status)}
                  {getStatusText(venue.status)}
                </div>
              </div>

              {/* Current Booking Info */}
              {venue.currentBooking && (
                <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                  <div className="text-sm">
                    <div className="font-semibold text-blue-900 mb-1">
                      {venue.currentBooking.event}
                    </div>
                    <div className="text-blue-700 space-y-1">
                      <div>Ends at: {venue.currentBooking.endTime}</div>
                      <div>Organizer: {venue.currentBooking.organizer}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Real-time Occupancy */}
              {showOccupancy && venue.realTimeOccupancy !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Current Occupancy</span>
                    <span className="font-semibold text-slate-900">
                      {venue.realTimeOccupancy} / {venue.capacity}
                      {' '}({getOccupancyPercentage(venue.realTimeOccupancy, venue.capacity)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <m.div
                      className={cn(
                        'h-2 rounded-full transition-all duration-500',
                        getOccupancyPercentage(venue.realTimeOccupancy, venue.capacity) > 80
                          ? 'bg-red-500'
                          : getOccupancyPercentage(venue.realTimeOccupancy, venue.capacity) > 60
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      )}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${getOccupancyPercentage(venue.realTimeOccupancy, venue.capacity)}%` 
                      }}
                      transition={{ duration: reducedMotion ? 0.3 : 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              {/* Next Available */}
              {venue.nextAvailable && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Next available: {venue.nextAvailable}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                {venue.status === 'available' && (
                  <button className="flex-1 px-4 py-2 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-semibold">
                    Book Now
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Real-time Disclaimer */}
      <m.div
        className="mt-6 p-4 bg-blue-50 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <div className="font-semibold mb-1">Real-time Information</div>
            <div>
              Venue availability and occupancy data is updated every 30 seconds. 
              For urgent bookings, please contact the parish office directly.
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export default RealTimeAvailabilityChecker