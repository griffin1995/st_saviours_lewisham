import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon as MapPin, ArrowTopRightOnSquareIcon as ExternalLink, ArrowTopRightOnSquareIcon as Navigation } from '@heroicons/react/24/solid'
import { Card, CardContent, Button, Text, Heading, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface MapEmbedProps {
  /**
   * Address for the map
   */
  address: string
  
  /**
   * Postcode for navigation
   */
  postcode: string
  
  /**
   * Google Maps embed URL (optional)
   */
  embedUrl?: string
  
  /**
   * Map height
   */
  height?: 'sm' | 'md' | 'lg'
  
  /**
   * Show directions button
   */
  showDirections?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * MapEmbed component for displaying location maps
 * 
 * @example
 * <MapEmbed
 *   address="St Saviour's Catholic Church, Lewisham High Street, London"
 *   postcode="SE13 6EE"
 *   height="md"
 *   showDirections={true}
 * />
 */
export default function MapEmbed({
  address,
  postcode,
  embedUrl,
  height = 'md',
  showDirections = true,
  className
}: MapEmbedProps) {
  const reducedMotion = prefersReducedMotion()
  const [mapLoaded, setMapLoaded] = useState(false)

  const heightClasses = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-[32rem]'
  }

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank')
  }

  const handleViewOnMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank')
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="none" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300 shadow-lg overflow-hidden">
        {/* Map Container */}
        <div className={cn('relative', heightClasses[height])}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="w-full h-full"
            />
          ) : (
            /* Fallback Map Placeholder */
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <Heading level="h3" className="text-gray-600 mb-2">
                    Interactive Map
                  </Heading>
                  <Text color="muted" className="max-w-sm">
                    Google Maps integration showing exact location and directions
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text weight="bold" className="text-gray-700">
                    {address}
                  </Text>
                  <Text size="sm" className="text-gray-600">
                    Postcode: {postcode}
                  </Text>
                </div>
              </div>
            </div>
          )}

          {/* Map Overlay Controls */}
          {showDirections && (
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleGetDirections}
                leftIcon={<Navigation className="h-4 w-4" />}
                className="shadow-lg"
              >
                Directions
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleViewOnMaps}
                leftIcon={<ExternalLink className="h-4 w-4" />}
                className="shadow-lg bg-white"
              >
                View in Maps
              </Button>
            </div>
          )}
        </div>

        {/* Map Footer */}
        <CardContent>
          <div className="py-4">
            <Flex align="center" justify="between" wrap>
              <div>
                <Text weight="bold" className="text-white">
                  St Saviour's Catholic Church
                </Text>
                <Text size="sm" className="text-gray-200">
                  {address}
                </Text>
              </div>
              <div className="text-right">
                <Text size="sm" weight="bold" className="text-white">
                  {postcode}
                </Text>
                <Text size="sm" className="text-gray-300">
                  For Sat Nav
                </Text>
              </div>
            </Flex>

            {showDirections && (
              <div className="mt-4 pt-4 border-t border-slate-600">
                <Flex gap="sm" wrap justify="center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGetDirections}
                    leftIcon={<Navigation className="h-4 w-4" />}
                  >
                    Get Directions
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleViewOnMaps}
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                  >
                    View on Google Maps
                  </Button>
                </Flex>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </m.div>
  )
}

/**
 * MapEmbedSkeleton for loading states
 */
export function MapEmbedSkeleton({ height = 'md' }: { height?: MapEmbedProps['height'] }) {
  const heightClasses = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-[32rem]'
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className={cn('bg-gray-200 animate-pulse', heightClasses[height])} />
      <CardContent>
        <div className="py-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            </div>
            <div className="space-y-2 text-right">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}