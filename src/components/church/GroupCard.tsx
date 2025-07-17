import React from 'react'
import { motion, m } from 'framer-motion'
import { Clock, MapPin, Users, Mail, Phone, ExternalLink } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface GroupCardProps {
  /**
   * Group name
   */
  name: string
  
  /**
   * Icon component for the group
   */
  icon: React.ComponentType<{ className?: string }>
  
  /**
   * Group description
   */
  description: string
  
  /**
   * Meeting time information
   */
  meetingTime: string
  
  /**
   * Contact information
   */
  contact: string
  
  /**
   * List of activities
   */
  activities: string[]
  
  /**
   * Who the group is open to
   */
  openTo: string
  
  /**
   * Color theme for the group icon
   */
  color?: 'red' | 'blue' | 'green' | 'purple' | 'pink' | 'amber' | 'indigo' | 'teal'
  
  /**
   * Contact email if available
   */
  email?: string
  
  /**
   * Contact phone if available
   */
  phone?: string
  
  /**
   * Meeting location if specified
   */
  location?: string
  
  /**
   * Card layout variant
   */
  variant?: 'default' | 'compact' | 'featured'
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Learn more action handler
   */
  onLearnMore?: () => void
}

// Color configurations for group icons
const colorConfig = {
  red: 'bg-red-600',
  blue: 'bg-blue-600', 
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  pink: 'bg-pink-600',
  amber: 'bg-amber-600',
  indigo: 'bg-indigo-600',
  teal: 'bg-teal-600'
}

/**
 * GroupCard component for displaying parish groups
 * 
 * @example
 * <GroupCard
 *   name="Parish Choir"
 *   icon={Music}
 *   description="Leading worship through music at Sunday Mass"
 *   meetingTime="Thursdays, 7:00 PM"
 *   contact="choir@saintsaviours.org.uk"
 *   activities={["Sunday Mass music", "Christmas concerts"]}
 *   openTo="All ages and abilities"
 *   color="blue"
 * />
 */
export default function GroupCard({
  name,
  icon: Icon,
  description,
  meetingTime,
  contact,
  activities,
  openTo,
  color = 'blue',
  email,
  phone,
  location,
  variant = 'default',
  className,
  onLearnMore
}: GroupCardProps) {
  const reducedMotion = prefersReducedMotion()

  // Determine if contact is an email or phone
  const isEmail = contact.includes('@')
  const isPhone = contact.includes('8852') || contact.includes('tel:')
  
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore()
    } else if (isEmail) {
      window.location.href = `mailto:${contact}`
    } else if (isPhone) {
      window.location.href = `tel:${contact.replace(/\s/g, '')}`
    }
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card 
        variant={variant === 'featured' ? 'elevated' : 'default'}
        padding="lg"
        className={cn(
          'h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          'bg-white border border-gray-200'
        )}
      >
        <CardContent>
          <div className="space-y-6">
            {/* Header with Icon and Title */}
            <Flex align="center" gap="md">
              <div className={cn(
                'w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300',
                colorConfig[color]
              )}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <Heading level="h3" className="text-xl font-semibold mb-1">
                  {name}
                </Heading>
                <Text size="sm" color="muted">
                  {openTo}
                </Text>
              </div>
            </Flex>

            {/* Description */}
            <Text color="muted" className="leading-relaxed">
              {description}
            </Text>

            {/* Meeting Details */}
            <div className="space-y-3">
              <Flex align="center" gap="sm">
                <Clock className="h-4 w-4 text-gold-600" />
                <Text size="sm" weight="medium">
                  {meetingTime}
                </Text>
              </Flex>
              
              {location && (
                <Flex align="center" gap="sm">
                  <MapPin className="h-4 w-4 text-gold-600" />
                  <Text size="sm" color="muted">
                    {location}
                  </Text>
                </Flex>
              )}

              <Flex align="center" gap="sm">
                {isEmail ? (
                  <Mail className="h-4 w-4 text-gold-600" />
                ) : isPhone ? (
                  <Phone className="h-4 w-4 text-gold-600" />
                ) : (
                  <Users className="h-4 w-4 text-gold-600" />
                )}
                <Text size="sm" color="muted">
                  {contact}
                </Text>
              </Flex>
            </div>

            {/* Activities */}
            <div>
              <Heading level="h4" className="font-semibold text-gray-900 mb-3">
                Activities
              </Heading>
              <div className="grid grid-cols-1 gap-2">
                {activities.map((activity, idx) => (
                  <Flex key={idx} align="center" gap="sm">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0" />
                    <Text size="sm" color="muted">
                      {activity}
                    </Text>
                  </Flex>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <Flex align="center" justify="between">
                <Text size="sm" weight="medium" color="muted">
                  Open to: {openTo}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLearnMore}
                  rightIcon={isEmail || isPhone ? <ExternalLink className="h-4 w-4" /> : undefined}
                  className="text-gold-600 hover:text-gold-700"
                >
                  {isEmail ? 'Contact' : isPhone ? 'Call' : 'Learn More'}
                </Button>
              </Flex>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  )
}

/**
 * GroupCardSkeleton for loading states
 */
export function GroupCardSkeleton({ variant = 'default' }: { variant?: GroupCardProps['variant'] }) {
  return (
    <Card padding="lg" className="h-full">
      <CardContent>
        <div className="space-y-6">
          <Flex align="center" gap="md">
            <div className="w-14 h-14 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </Flex>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}