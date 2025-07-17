import React from 'react'
import { motion, m } from 'framer-motion'
import Image from 'next/image'
import { Users, Building, CheckCircle, Calendar } from 'lucide-react'
import { Card, CardContent, Button, Heading, Text, Flex, Grid } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

export interface Venue {
  id: string
  name: string
  description: string
  capacity: string
  area: string
  image: string
  features: string[]
  hourlyRate: string
  halfDayRate: string
  fullDayRate: string
  suitableFor: string[]
}

interface VenueCardProps {
  /**
   * Venue data
   */
  venue: Venue
  
  /**
   * Card layout variant
   */
  variant?: 'default' | 'featured' | 'compact'
  
  /**
   * Image position for default variant
   */
  imagePosition?: 'left' | 'right'
  
  /**
   * Booking click handler
   */
  onBookClick?: (venueId: string) => void
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * VenueCard component for displaying venue information
 * 
 * @example
 * <VenueCard
 *   venue={venueData}
 *   variant="default"
 *   imagePosition="left"
 *   onBookClick={handleBooking}
 * />
 */
export default function VenueCard({
  venue,
  variant = 'default',
  imagePosition = 'left',
  onBookClick,
  className
}: VenueCardProps) {
  const reducedMotion = prefersReducedMotion()

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(venue.id)
    }
  }

  if (variant === 'compact') {
    return (
      <m.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
        viewport={{ once: true }}
        className={className}
      >
        <Card variant="default" padding="lg" className="h-full bg-white hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <Heading level="h3" className="font-semibold">
                {venue.name}
              </Heading>
              
              <Text color="muted" className="line-clamp-3">
                {venue.description}
              </Text>
              
              <Flex align="center" justify="between" className="text-sm">
                <Flex align="center" gap="sm">
                  <Users className="h-4 w-4 text-gold-600" />
                  <Text size="sm" color="muted">{venue.capacity}</Text>
                </Flex>
                <Text weight="bold" className="text-gold-600">
                  {venue.fullDayRate}/day
                </Text>
              </Flex>
              
              <Button
                variant="primary"
                size="sm"
                onClick={handleBookClick}
                leftIcon={<Calendar className="h-4 w-4" />}
                className="w-full justify-center"
              >
                Book Venue
              </Button>
            </div>
          </CardContent>
        </Card>
      </m.div>
    )
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card 
        variant={variant === 'featured' ? 'elevated' : 'default'} 
        padding="none" 
        className="bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-0",
          imagePosition === 'right' && "lg:grid-flow-col-dense"
        )}>
          {/* Image */}
          <div className={cn(
            "relative h-64 lg:h-auto",
            imagePosition === 'right' && "lg:col-start-2"
          )}>
            <Image
              src={venue.image}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          {/* Content */}
          <div className={cn(
            "p-8 lg:p-12",
            imagePosition === 'right' && "lg:col-start-1"
          )}>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Heading level="h3" className="text-2xl lg:text-3xl font-light mb-4">
                    {venue.name}
                  </Heading>
                  <Text size="lg" color="muted" className="leading-relaxed">
                    {venue.description}
                  </Text>
                </div>
                
                {/* Capacity and Area */}
                <Grid cols={2} gap="md">
                  <Flex align="center" gap="sm">
                    <Users className="h-5 w-5 text-gold-600" />
                    <Text color="default">{venue.capacity}</Text>
                  </Flex>
                  <Flex align="center" gap="sm">
                    <Building className="h-5 w-5 text-gold-600" />
                    <Text color="default">{venue.area}</Text>
                  </Flex>
                </Grid>

                {/* Features */}
                <div>
                  <Heading level="h4" className="font-semibold mb-3">
                    Features
                  </Heading>
                  <Grid cols={2} gap="sm">
                    {venue.features.map((feature, idx) => (
                      <Flex key={idx} align="center" gap="sm">
                        <CheckCircle className="h-4 w-4 text-gold-600 flex-shrink-0" />
                        <Text size="sm" color="muted">{feature}</Text>
                      </Flex>
                    ))}
                  </Grid>
                </div>

                {/* Pricing */}
                <div>
                  <Heading level="h4" className="font-semibold mb-3">
                    Pricing
                  </Heading>
                  <Grid cols={3} gap="md">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Text weight="bold" className="text-lg">{venue.hourlyRate}</Text>
                      <Text size="sm" color="muted">per hour</Text>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Text weight="bold" className="text-lg">{venue.halfDayRate}</Text>
                      <Text size="sm" color="muted">half day</Text>
                    </div>
                    <div className="text-center p-3 bg-gold-50 rounded-lg border-2 border-gold-200">
                      <Text weight="bold" className="text-lg">{venue.fullDayRate}</Text>
                      <Text size="sm" className="text-gold-600">full day</Text>
                    </div>
                  </Grid>
                </div>

                {/* Suitable For */}
                <div>
                  <Heading level="h4" className="font-semibold mb-2">
                    Perfect for
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {venue.suitableFor.map((use, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-600"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookClick}
                  leftIcon={<Calendar className="h-5 w-5" />}
                  className="w-full sm:w-auto"
                >
                  Book This Venue
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </m.div>
  )
}

/**
 * VenueCardSkeleton for loading states
 */
export function VenueCardSkeleton({ variant = 'default' }: { variant?: VenueCardProps['variant'] }) {
  if (variant === 'compact') {
    return (
      <Card padding="lg" className="h-full">
        <CardContent>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="h-64 lg:h-80 bg-gray-200 animate-pulse" />
        <div className="p-8 lg:p-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    </Card>
  )
}