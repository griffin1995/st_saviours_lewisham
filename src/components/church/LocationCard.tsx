import React from 'react'
import { m} from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, Heading, Text, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface LocationInfo {
  title: string
  subtitle?: string
  items: string[]
  details?: string[]
  highlight?: string
}

interface LocationCardProps {
  /**
   * Transport method icon
   */
  icon: LucideIcon
  
  /**
   * Icon background color
   */
  iconColor: string
  
  /**
   * Card title
   */
  title: string
  
  /**
   * Location information
   */
  locationInfo: LocationInfo
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * LocationCard component for displaying transport/direction information
 * 
 * @example
 * <LocationCard
 *   icon={Train}
 *   iconColor="bg-green-600"
 *   title="By Train"
 *   locationInfo={{
 *     title: "Lewisham Station",
 *     subtitle: "2 minutes walk",
 *     items: ["National Rail from London Bridge", "DLR from Canary Wharf"],
 *     details: ["National Rail & DLR"]
 *   }}
 * />
 */
export default function LocationCard({
  icon: Icon,
  iconColor,
  title,
  locationInfo,
  className
}: LocationCardProps) {
  const reducedMotion = prefersReducedMotion()

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="lg" className="bg-gray-50 h-full">
        <CardContent>
          <div className="space-y-4">
            {/* Icon */}
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
              <Icon className="h-6 w-6 text-white" />
            </div>

            {/* Title */}
            <Heading level="h3" className="text-xl font-semibold">
              {title}
            </Heading>

            {/* Location Info */}
            <div className="space-y-3 text-gray-600">
              {/* Main location */}
              <div>
                <Text weight="bold" className="text-gray-900">
                  {locationInfo.title}
                </Text>
                {locationInfo.subtitle && (
                  <Text size="sm" color="muted">
                    {locationInfo.subtitle}
                  </Text>
                )}
                {locationInfo.details && locationInfo.details.length > 0 && (
                  <Text size="sm" color="muted">
                    {locationInfo.details.join(' • ')}
                  </Text>
                )}
              </div>

              {/* Services/Routes */}
              {locationInfo.items && locationInfo.items.length > 0 && (
                <div>
                  <Text weight="bold" className="text-gray-900 mb-2">
                    Services:
                  </Text>
                  <div className="space-y-1">
                    {locationInfo.items.map((item, index) => (
                      <Text key={index} size="sm" color="muted">
                        • {item}
                      </Text>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlight */}
              {locationInfo.highlight && (
                <div className="pt-2">
                  <Text size="sm" weight="bold" className="text-blue-600">
                    {locationInfo.highlight}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  )
}

/**
 * BusRoutesGrid component for displaying bus route numbers
 */
export function BusRoutesGrid({ routes }: { routes: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 text-sm">
      {routes.map((route, index) => (
        <span
          key={index}
          className="bg-red-100 text-red-800 px-2 py-1 rounded text-center font-medium"
        >
          {route}
        </span>
      ))}
    </div>
  )
}

/**
 * LocationCardSkeleton for loading states
 */
export function LocationCardSkeleton() {
  return (
    <Card padding="lg" className="bg-gray-50 h-full">
      <CardContent>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}