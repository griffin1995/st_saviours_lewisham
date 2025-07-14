import React from 'react'
import { motion } from 'framer-motion'
import { Motion } from '@/lib/motion'
import { Calendar, Clock, MapPin, Users, ExternalLink, Phone, Mail } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex } from '@/components/ui'
import { cn, formatDate, formatTime, prefersReducedMotion } from '@/lib/utils'
import Image from 'next/image'

interface EventCardProps {
  /**
   * Event title
   */
  title: string
  
  /**
   * Event description
   */
  description: string
  
  /**
   * Event date
   */
  date: string | Date
  
  /**
   * Start time
   */
  startTime?: string
  
  /**
   * End time
   */
  endTime?: string
  
  /**
   * Event location
   */
  location?: string
  
  /**
   * Event category/type
   */
  category?: string
  
  /**
   * Maximum attendees
   */
  capacity?: number
  
  /**
   * Current number of attendees
   */
  attendees?: number
  
  /**
   * Contact person
   */
  contact?: {
    name: string
    phone?: string
    email?: string
  }
  
  /**
   * Event image
   */
  image?: string
  
  /**
   * Registration required
   */
  registrationRequired?: boolean
  
  /**
   * Registration link or callback
   */
  onRegister?: () => void
  registrationLink?: string
  
  /**
   * Event status
   */
  status?: 'upcoming' | 'today' | 'cancelled' | 'full'
  
  /**
   * Card layout variant
   */
  variant?: 'default' | 'compact' | 'featured'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

// Variant configurations (moved outside component for skeleton access)
const variantConfig = {
  default: {
    cardClass: 'h-full',
    imageHeight: 'h-48',
    contentPadding: 'p-6'
  },
  compact: {
    cardClass: 'h-full',
    imageHeight: 'h-32',
    contentPadding: 'p-4'
  },
  featured: {
    cardClass: 'h-full',
    imageHeight: 'h-64',
    contentPadding: 'p-8'
  }
}

/**
 * EventCard component for displaying parish events
 * 
 * @example
 * <EventCard
 *   title="Parish Coffee Morning"
 *   description="Join us for coffee and fellowship"
 *   date="2025-01-15"
 *   startTime="10:00"
 *   location="Parish Hall"
 *   category="Social"
 *   registrationRequired={false}
 * />
 */
export default function EventCard({
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  category,
  capacity,
  attendees,
  contact,
  image,
  registrationRequired = false,
  onRegister,
  registrationLink,
  status = 'upcoming',
  variant = 'default',
  className
}: EventCardProps) {
  const reducedMotion = prefersReducedMotion()

  // Status styling
  const statusConfig = {
    upcoming: {
      badge: 'bg-blue-100 text-blue-800',
      label: 'Upcoming'
    },
    today: {
      badge: 'bg-gold-100 text-gold-800',
      label: 'Today'
    },
    cancelled: {
      badge: 'bg-red-100 text-red-800',
      label: 'Cancelled'
    },
    full: {
      badge: 'bg-gray-100 text-gray-800',
      label: 'Full'
    }
  }

  // Category colors
  const categoryColors = {
    'Social': 'bg-blue-100 text-blue-800',
    'Liturgical': 'bg-purple-100 text-purple-800',
    'Sacraments': 'bg-green-100 text-green-800',
    'Education': 'bg-orange-100 text-orange-800',
    'Charity': 'bg-pink-100 text-pink-800',
    'Youth': 'bg-yellow-100 text-yellow-800',
    'Music': 'bg-indigo-100 text-indigo-800'
  }

  const config = variantConfig[variant]

  const handleRegister = () => {
    if (registrationLink) {
      window.open(registrationLink, '_blank')
    } else if (onRegister) {
      onRegister()
    }
  }

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card 
        variant={variant === 'featured' ? 'elevated' : 'default'}
        padding="none"
        className={cn(
          config.cardClass,
          'overflow-hidden group transition-all duration-300',
          variant === 'featured' && 'hover:shadow-2xl hover:-translate-y-1'
        )}
      >
        {/* Event Image */}
        {image && (
          <div className={cn('relative overflow-hidden', config.imageHeight)}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Status badge overlay */}
            <div className="absolute top-4 left-4">
              <span className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                statusConfig[status].badge
              )}>
                {statusConfig[status].label}
              </span>
            </div>

            {/* Category badge */}
            {category && (
              <div className="absolute top-4 right-4">
                <span className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
                )}>
                  {category}
                </span>
              </div>
            )}
          </div>
        )}

        <CardContent className={config.contentPadding}>
          <div className="space-y-4">
            {/* Title and Status (if no image) */}
            <div className="space-y-2">
              <Flex align="start" justify="between">
                <Heading 
                  level={variant === 'featured' ? 'h2' : 'h3'} 
                  className={cn(
                    'group-hover:text-gold-600 transition-colors',
                    variant === 'featured' ? 'text-2xl' : 'text-xl'
                  )}
                >
                  {title}
                </Heading>
                
                {!image && (
                  <span className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    statusConfig[status].badge
                  )}>
                    {statusConfig[status].label}
                  </span>
                )}
              </Flex>

              {!image && category && (
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
                )}>
                  {category}
                </span>
              )}
            </div>

            {/* Description */}
            <Text 
              color="muted" 
              className={cn(
                'line-clamp-3',
                variant === 'compact' && 'line-clamp-2'
              )}
            >
              {description}
            </Text>

            {/* Event Details */}
            <div className="space-y-2">
              {/* Date and Time */}
              <Flex align="center" gap="sm">
                <Calendar className="h-4 w-4 text-gold-600" />
                <Text weight="medium">
                  {formatDate(date)}
                  {startTime && ` at ${formatTime(startTime)}`}
                  {endTime && ` - ${formatTime(endTime)}`}
                </Text>
              </Flex>

              {/* Location */}
              {location && (
                <Flex align="center" gap="sm">
                  <MapPin className="h-4 w-4 text-gold-600" />
                  <Text color="muted">{location}</Text>
                </Flex>
              )}

              {/* Capacity */}
              {capacity && (
                <Flex align="center" gap="sm">
                  <Users className="h-4 w-4 text-gold-600" />
                  <Text color="muted">
                    {attendees ? `${attendees}/${capacity}` : `Up to ${capacity}`} attendees
                  </Text>
                </Flex>
              )}

              {/* Contact */}
              {contact && (
                <div className="pt-2 border-t border-gray-200">
                  <Text size="sm" weight="medium" className="mb-1">
                    Contact: {contact.name}
                  </Text>
                  <div className="space-y-1">
                    {contact.phone && (
                      <Flex align="center" gap="sm">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <Text size="sm" color="muted">{contact.phone}</Text>
                      </Flex>
                    )}
                    {contact.email && (
                      <Flex align="center" gap="sm">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <Text size="sm" color="muted">{contact.email}</Text>
                      </Flex>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Registration */}
            {registrationRequired && status !== 'cancelled' && status !== 'full' && (
              <div className="pt-4">
                <Button
                  variant="primary"
                  size={variant === 'compact' ? 'sm' : 'md'}
                  fullWidth
                  onClick={handleRegister}
                  rightIcon={registrationLink ? <ExternalLink className="h-4 w-4" /> : undefined}
                >
                  {status === 'today' ? 'Register Now' : 'Register'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * EventCardSkeleton for loading states
 */
export function EventCardSkeleton({ variant = 'default' }: { variant?: EventCardProps['variant'] }) {
  const config = variantConfig[variant || 'default']
  
  return (
    <Card padding="none" className={config.cardClass}>
      <div className={cn('bg-gray-200 animate-pulse', config.imageHeight)} />
      <CardContent className={config.contentPadding}>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}