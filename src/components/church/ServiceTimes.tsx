import React from 'react'
import { motion } from 'framer-motion'
import { Motion } from '@/lib/motion'
import { ClockIcon as Clock, CalendarDaysIcon as Calendar, MapPinIcon as MapPin } from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Grid, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface Service {
  time: string
  type: string
  description?: string
  location?: string
}

interface ServiceDay {
  day: string
  services: Service[]
}

interface ServiceTimesProps {
  /**
   * Array of service days with their respective services
   */
  serviceTimes: ServiceDay[]
  
  /**
   * Whether to highlight today's services
   */
  highlightToday?: boolean
  
  /**
   * Layout style for the service times
   */
  layout?: 'grid' | 'list' | 'compact'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * ServiceTimes component for displaying Mass times and church services
 * 
 * @example
 * <ServiceTimes 
 *   serviceTimes={massTimesData}
 *   highlightToday={true}
 *   layout="grid"
 * />
 */
export default function ServiceTimes({
  serviceTimes,
  highlightToday = false,
  layout = 'grid',
  className
}: ServiceTimesProps) {
  const reducedMotion = prefersReducedMotion()

  // Get current day for highlighting
  const today = new Date().getDay()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = dayNames[today]

  // For grid layout, separate weekend and weekdays
  const weekendDays = serviceTimes.filter(day => day.day === 'Saturday' || day.day === 'Sunday')
  const weekdayDays = serviceTimes.filter(day => !['Saturday', 'Sunday'].includes(day.day))

  // Layout configurations
  const layoutConfigs = {
    grid: {
      containerClass: 'space-y-6',
      cardClass: 'h-full'
    },
    list: {
      containerClass: 'space-y-4',
      cardClass: 'w-full'
    },
    compact: {
      containerClass: 'grid md:grid-cols-2 gap-4',
      cardClass: 'h-full'
    }
  }

  const config = layoutConfigs[layout]

  const renderServiceCard = (dayData: ServiceDay, index: number, isWeekend: boolean = false) => {
    const isToday = highlightToday && dayData.day === currentDay
    
    return (
      <motion.div
        key={dayData.day}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={reducedMotion 
          ? { duration: 0.3 }
          : { duration: 0.5, delay: index * 0.1 }
        }
        viewport={{ once: true }}
      >
        <Card 
          variant={isToday ? 'elevated' : 'default'}
          padding="lg" 
          className={cn(
            'h-full transition-all duration-300 bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white',
            isToday && 'ring-2 ring-white border-white'
          )}
        >
          <CardContent>
            <div className="space-y-4">
              {/* Day Header */}
              <Flex align="center" justify="between">
                <Heading 
                  level="h3" 
                  className={cn(
                    "font-bold text-white",
                    isWeekend ? "text-xl" : "text-lg"
                  )}
                >
                  {dayData.day}
                </Heading>
                {isToday && (
                  isWeekend ? (
                    // Full badge for weekend cards (larger)
                    <div className="flex items-center px-3 py-1 bg-slate-700 text-white rounded-full text-sm font-medium">
                      <Calendar className="h-4 w-4 mr-1 text-white" />
                      Today
                    </div>
                  ) : (
                    // Compact indicator for weekday cards (smaller)
                    <div className="w-3 h-3 bg-slate-700 rounded-full flex items-center justify-center" title="Today">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )
                )}
              </Flex>

              {/* Services */}
              <div className="space-y-3">
                {dayData.services.length > 0 ? (
                  dayData.services.map((service, serviceIndex) => (
                    <motion.div
                      key={serviceIndex}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={reducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 0.3, delay: (index * 0.1) + (serviceIndex * 0.05) }
                      }
                      viewport={{ once: true }}
                      className="p-3 rounded-lg border transition-colors bg-white/10 border-slate-600"
                    >
                      <Flex align="start" justify="between">
                        <div className="space-y-1">
                          <Flex align="center" gap="sm">
                            <Clock className="h-4 w-4 text-white" />
                            <Text 
                              weight="semibold" 
                              className="text-lg text-white"
                            >
                              {service.time}
                            </Text>
                          </Flex>
                          
                          <Text 
                            weight="medium"
                            className="text-gray-200"
                          >
                            {service.type}
                          </Text>
                          
                          {service.description && (
                            <Text 
                              size="sm" 
                              className="italic text-gray-300"
                            >
                              {service.description}
                            </Text>
                          )}
                          
                          {service.location && (
                            <Flex align="center" gap="sm">
                              <MapPin className="h-3 w-3 text-white" />
                              <Text size="sm" className="text-gray-300">
                                {service.location}
                              </Text>
                            </Flex>
                          )}
                        </div>
                      </Flex>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <Text className="italic text-gray-300">
                      No services scheduled
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {layout === 'grid' ? (
        <div className="space-y-6">
          {/* Weekend Row - Saturday & Sunday */}
          <div className="grid md:grid-cols-2 gap-8">
            {weekendDays.map((dayData, index) => renderServiceCard(dayData, index, true))}
          </div>
          
          {/* Weekdays Row */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {weekdayDays.map((dayData, index) => renderServiceCard(dayData, index + 2, false))}
          </div>
        </div>
      ) : (
        <div className={config.containerClass}>
          {serviceTimes.map((dayData, index) => renderServiceCard(dayData, index, false))}
        </div>
      )}
    </div>
  )
}

/**
 * TodaysServices component - shows only today's services
 */
export function TodaysServices({ serviceTimes, className }: Pick<ServiceTimesProps, 'serviceTimes' | 'className'>) {
  const today = new Date().getDay()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = dayNames[today]
  
  const todaysServices = serviceTimes.find(day => day.day === currentDay)
  
  if (!todaysServices || todaysServices.services.length === 0) {
    return (
      <Card padding="lg" className={cn(className, "bg-white/10 backdrop-blur-sm border border-slate-600")}>
        <CardContent>
          <div className="text-center space-y-4">
            <Heading level="h3" className="text-xl text-white">
              {currentDay}'s Services
            </Heading>
            <Text className="text-gray-200">
              No services scheduled for today
            </Text>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <ServiceTimes
      serviceTimes={[todaysServices]}
      highlightToday={true}
      layout="list"
      className={className}
    />
  )
}

/**
 * WeeklyServices component - compact weekly overview
 */
export function WeeklyServices({ serviceTimes, className }: Pick<ServiceTimesProps, 'serviceTimes' | 'className'>) {
  return (
    <ServiceTimes
      serviceTimes={serviceTimes}
      highlightToday={true}
      layout="compact"
      className={className}
    />
  )
}