import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin } from 'lucide-react'
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

  // Layout configurations
  const layoutConfigs = {
    grid: {
      containerClass: 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
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

  return (
    <div className={cn('w-full', className)}>
      <div className={config.containerClass}>
        {serviceTimes.map((dayData, index) => {
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
                  config.cardClass,
                  'transition-all duration-300',
                  isToday && 'ring-2 ring-gold-500 border-gold-300'
                )}
              >
                <CardContent>
                  <div className="space-y-4">
                    {/* Day Header */}
                    <Flex align="center" justify="between">
                      <Heading 
                        level="h3" 
                        className={cn(
                          'text-xl font-bold',
                          isToday && 'text-gold-600'
                        )}
                      >
                        {dayData.day}
                      </Heading>
                      {isToday && (
                        <div className="flex items-center px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium">
                          <Calendar className="h-4 w-4 mr-1" />
                          Today
                        </div>
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
                            className={cn(
                              'p-3 rounded-lg border transition-colors',
                              isToday 
                                ? 'bg-gold-50 border-gold-200' 
                                : 'bg-gray-50 border-gray-200'
                            )}
                          >
                            <Flex align="start" justify="between">
                              <div className="space-y-1">
                                <Flex align="center" gap="sm">
                                  <Clock className="h-4 w-4 text-gold-600" />
                                  <Text 
                                    weight="semibold" 
                                    className={cn(
                                      'text-lg',
                                      isToday ? 'text-gold-700' : 'text-slate-900'
                                    )}
                                  >
                                    {service.time}
                                  </Text>
                                </Flex>
                                
                                <Text 
                                  weight="medium"
                                  className={cn(
                                    isToday ? 'text-gold-600' : 'text-gray-700'
                                  )}
                                >
                                  {service.type}
                                </Text>
                                
                                {service.description && (
                                  <Text 
                                    size="sm" 
                                    color="muted"
                                    className="italic"
                                  >
                                    {service.description}
                                  </Text>
                                )}
                                
                                {service.location && (
                                  <Flex align="center" gap="sm">
                                    <MapPin className="h-3 w-3 text-gray-500" />
                                    <Text size="sm" color="muted">
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
                          <Text color="muted" className="italic">
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
        })}
      </div>
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
      <Card padding="lg" className={className}>
        <CardContent>
          <div className="text-center space-y-4">
            <Heading level="h3" className="text-xl">
              {currentDay}'s Services
            </Heading>
            <Text color="muted">
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