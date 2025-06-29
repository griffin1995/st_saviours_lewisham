import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Play, Star } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Grid, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface StreamScheduleItem {
  id: string
  title: string
  time: string
  date: string
  description: string
  isLive?: boolean
  nextStream?: string | null
  featured?: boolean
}

interface StreamingScheduleProps {
  /**
   * List of scheduled streams
   */
  streams: StreamScheduleItem[]
  
  /**
   * Callback when user wants to set reminder
   */
  onSetReminder?: (streamId: string) => void
  
  /**
   * Callback when user wants to watch stream
   */
  onWatchStream?: (streamId: string) => void
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * StreamingSchedule component displaying upcoming streams
 * 
 * @example
 * <StreamingSchedule
 *   streams={[
 *     {
 *       id: "sunday-mass",
 *       title: "Sunday Mass",
 *       time: "11:30 AM",
 *       date: "Every Sunday",
 *       description: "Join us for our principal Sunday Mass",
 *       featured: true
 *     }
 *   ]}
 *   onSetReminder={handleReminder}
 *   onWatchStream={handleWatch}
 * />
 */
export default function StreamingSchedule({
  streams,
  onSetReminder,
  onWatchStream,
  className
}: StreamingScheduleProps) {
  const reducedMotion = prefersReducedMotion()

  const formatNextStream = (nextStream: string | null) => {
    if (!nextStream) return null
    
    const date = new Date(nextStream)
    const now = new Date()
    const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return `Next: ${date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`
    } else {
      return `Next: ${date.toLocaleDateString([], { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      })}`
    }
  }

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="text-center mb-12">
        <Heading level="h2" align="center" className="mb-6">
          Streaming Schedule
        </Heading>
        <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
          Join us online for Mass, prayer services, and special celebrations throughout the week.
        </Text>
      </div>

      <Grid cols={2} gap="lg">
        {streams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { 
              duration: 0.6, 
              delay: index * 0.1 
            }}
            viewport={{ once: true }}
            className={cn(
              stream.featured ? "md:col-span-2" : "",
              stream.featured ? "row-span-1" : ""
            )}
          >
            <Card 
              variant="default" 
              padding="lg" 
              className={cn(
                "h-full",
                stream.featured ? "bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200" : "bg-white",
                stream.isLive ? "ring-2 ring-green-500 ring-opacity-50" : ""
              )}
            >
              <CardContent>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {stream.featured && (
                          <Star className="h-5 w-5 text-gold-600 fill-current" />
                        )}
                        <Heading level="h3" className="text-xl font-semibold">
                          {stream.title}
                        </Heading>
                      </div>
                      
                      <Flex align="center" gap="sm" className="text-gray-600">
                        <Clock className="h-4 w-4" />
                        <Text size="sm">
                          {stream.time}
                        </Text>
                        <span className="text-gray-400">•</span>
                        <Calendar className="h-4 w-4" />
                        <Text size="sm">
                          {stream.date}
                        </Text>
                      </Flex>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {stream.isLive && (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Live Now
                        </span>
                      )}
                      {stream.featured && !stream.isLive && (
                        <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <Text size="sm" color="muted" className="leading-relaxed">
                    {stream.description}
                  </Text>

                  {/* Next Stream Info */}
                  {stream.nextStream && !stream.isLive && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <Text size="sm" weight="medium" className="text-blue-800">
                        {formatNextStream(stream.nextStream)}
                      </Text>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2">
                    <Flex gap="sm" wrap>
                      {stream.isLive ? (
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<Play className="h-4 w-4" />}
                          onClick={() => onWatchStream?.(stream.id)}
                        >
                          Watch Live
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Calendar className="h-4 w-4" />}
                          onClick={() => onSetReminder?.(stream.id)}
                        >
                          Set Reminder
                        </Button>
                      )}
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </motion.div>
  )
}

/**
 * StreamingScheduleSkeleton for loading states
 */
export function StreamingScheduleSkeleton() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto" />
      </div>
      
      <Grid cols={2} gap="lg">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} padding="lg">
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  )
}