import React from 'react'
import { m } from 'framer-motion'
import { Play, Bell, Calendar } from 'lucide-react'
import { Card, CardContent, Button, Heading, Text, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface StreamingStatusProps {
  /**
   * Whether the stream is currently live
   */
  isLive: boolean
  
  /**
   * Current viewer count (if live)
   */
  viewerCount?: number
  
  /**
   * Next scheduled stream info
   */
  nextStream?: {
    title: string
    time: string
    date: string
  }
  
  /**
   * Callback for reminder signup
   */
  onSetReminder?: () => void
  
  /**
   * Callback for viewing schedule
   */
  onViewSchedule?: () => void
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * StreamingStatus component showing live stream status and video player
 * 
 * @example
 * <StreamingStatus
 *   isLive={false}
 *   nextStream={{
 *     title: "Sunday Mass",
 *     time: "11:30 AM", 
 *     date: "Tomorrow"
 *   }}
 *   onSetReminder={handleReminder}
 *   onViewSchedule={handleSchedule}
 * />
 */
export default function StreamingStatus({
  isLive,
  viewerCount,
  nextStream,
  onSetReminder,
  onViewSchedule,
  className
}: StreamingStatusProps) {
  const reducedMotion = prefersReducedMotion()

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      {/* Status Banner */}
      <Card
        variant="default"
        padding="lg"
        className={cn(
          "mb-8 text-center text-white",
          isLive 
            ? "bg-gradient-to-r from-green-600 to-green-700" 
            : "bg-gradient-to-r from-red-600 to-red-700"
        )}
      >
        <CardContent>
          <Flex align="center" justify="center" className="mb-4">
            <div 
              className={cn(
                "w-4 h-4 rounded-full mr-3",
                isLive ? "bg-white animate-pulse" : "bg-white animate-pulse"
              )}
            />
            <Heading level="h2" className="text-2xl font-semibold text-white">
              {isLive ? 'Live Now' : 'Currently Offline'}
            </Heading>
            {isLive && viewerCount && (
              <Text className="ml-4 text-white/90">
                {viewerCount} watching
              </Text>
            )}
          </Flex>
          
          <Text className={cn(
            "mb-6",
            isLive ? "text-green-100" : "text-red-100"
          )}>
            {isLive 
              ? "Join us now for live worship and community."
              : "We'll be live for our next scheduled service. Check the schedule below for upcoming streams."
            }
          </Text>
          
          {nextStream && !isLive && (
            <div className="mb-6">
              <Text className="text-white/90 mb-2">Next Stream:</Text>
              <Text className="text-white font-semibold">
                {nextStream.title} - {nextStream.time} on {nextStream.date}
              </Text>
            </div>
          )}
          
          <Flex justify="center" gap="md" wrap>
            {isLive ? (
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<Play className="h-5 w-5" />}
                className="bg-white text-green-600 hover:bg-green-50"
              >
                Watch Live
              </Button>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<Bell className="h-5 w-5" />}
                  onClick={onSetReminder}
                  className="bg-white text-red-600 hover:bg-red-50"
                >
                  Set Reminder
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                  onClick={onViewSchedule}
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  View Schedule
                </Button>
              </>
            )}
          </Flex>
        </CardContent>
      </Card>

      {/* Video Player */}
      <Card variant="default" padding="none" className="bg-black aspect-video">
        <div className="w-full h-full flex items-center justify-center text-white">
          {isLive ? (
            <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-20 w-20 mx-auto mb-4 text-white/70" />
                <Heading level="h3" className="text-xl font-semibold mb-2 text-white">
                  Live Stream Player
                </Heading>
                <Text className="text-gray-300">
                  Video stream would load here
                </Text>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Play className="h-20 w-20 mx-auto mb-4 opacity-50" />
              <Heading level="h3" className="text-xl font-semibold mb-2 text-white">
                Stream Will Appear Here
              </Heading>
              <Text className="text-gray-300">
                Our live stream will be available 15 minutes before each scheduled service.
              </Text>
            </div>
          )}
        </div>
      </Card>
    </m.div>
  )
}

/**
 * StreamingStatusSkeleton for loading states
 */
export function StreamingStatusSkeleton() {
  return (
    <div className="space-y-8">
      <Card padding="lg">
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-gray-200 rounded-full mr-3 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
            <div className="flex justify-center gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card padding="none">
        <div className="aspect-video bg-gray-200 animate-pulse rounded-lg" />
      </Card>
    </div>
  )
}