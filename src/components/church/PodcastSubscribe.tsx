import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rss, ExternalLink } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Grid, Flex } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

interface PlatformLink {
  name: string
  url: string
  icon?: React.ReactNode
}

interface PodcastSubscribeProps {
  /**
   * Platform subscription links
   */
  platforms?: PlatformLink[]
  
  /**
   * Contact page URL for questions
   */
  contactUrl?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultPlatforms: PlatformLink[] = [
  { name: 'Apple Podcasts', url: '#' },
  { name: 'Spotify', url: '#' },
  { name: 'Google Podcasts', url: '#' },
  { name: 'RSS Feed', url: '#' }
]

/**
 * PodcastSubscribe component for subscription section
 * 
 * @example
 * <PodcastSubscribe
 *   platforms={[
 *     { name: "Apple Podcasts", url: "https://..." },
 *     { name: "Spotify", url: "https://..." }
 *   ]}
 *   contactUrl="/contact-us"
 * />
 */
export default function PodcastSubscribe({
  platforms = defaultPlatforms,
  contactUrl = '/contact-us',
  className
}: PodcastSubscribeProps) {
  const reducedMotion = prefersReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center">
            <Rss className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Heading and Description */}
        <div className="space-y-6">
          <Heading level="h2" className="text-3xl lg:text-4xl font-light text-white">
            Never Miss an Episode
          </Heading>
          <Text size="xl" className="text-gray-200 max-w-3xl mx-auto">
            Subscribe to our podcast on your favorite platform and join our community of faith-filled listeners.
          </Text>
        </div>

        {/* Platform Links */}
        <div className="max-w-2xl mx-auto">
          <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={platform.url}
                  target={platform.url.startsWith('#') ? '_self' : '_blank'}
                  rel={platform.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                >
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 border-0"
                    rightIcon={!platform.url.startsWith('#') ? <ExternalLink className="h-4 w-4" /> : undefined}
                  >
                    {platform.icon && (
                      <span className="mr-2">{platform.icon}</span>
                    )}
                    {platform.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </Grid>
        </div>

        {/* Contact Information */}
        <div className="pt-4">
          <Text className="text-gray-300">
            Questions or topic suggestions?{' '}
            <Link 
              href={contactUrl}
              className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
            >
              Contact us
            </Link>
          </Text>
        </div>

        {/* Additional Features */}
        <div className="max-w-4xl mx-auto pt-8">
          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-3">
            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                    <Rss className="h-6 w-6 text-white" />
                  </div>
                  <Heading level="h3" className="text-lg font-semibold text-white">
                    Weekly Episodes
                  </Heading>
                  <Text size="sm" className="text-gray-300">
                    New episodes every Sunday featuring homilies, discussions, and spiritual insights.
                  </Text>
                </div>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                  <Heading level="h3" className="text-lg font-semibold text-white">
                    Cross-Platform
                  </Heading>
                  <Text size="sm" className="text-gray-300">
                    Available on all major podcast platforms for seamless listening across devices.
                  </Text>
                </div>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                  <Heading level="h3" className="text-lg font-semibold text-white">
                    Free Download
                  </Heading>
                  <Text size="sm" className="text-gray-300">
                    Download episodes for offline listening during commutes, travel, or quiet time.
                  </Text>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * PodcastSubscribeSkeleton for loading states
 */
export function PodcastSubscribeSkeleton() {
  return (
    <div className="text-center space-y-8">
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse" />
      
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-80 mx-auto" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-96 mx-auto" />
      </div>

      <div className="max-w-2xl mx-auto">
        <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </Grid>
      </div>

      <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
    </div>
  )
}