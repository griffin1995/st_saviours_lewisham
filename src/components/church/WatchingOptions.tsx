import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, Tv, Wifi, Volume2 } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Grid, Flex } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

interface WatchingOption {
  id: string
  icon: LucideIcon
  iconColor: string
  title: string
  description: string
  action?: string
  onAction?: () => void
}

interface WatchingOptionsProps {
  /**
   * List of watching options
   */
  options?: WatchingOption[]
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultOptions: WatchingOption[] = [
  {
    id: 'website',
    icon: Monitor,
    iconColor: 'bg-blue-600',
    title: 'Website',
    description: 'Watch directly on our website using any web browser on your computer or laptop.',
    action: 'Watch Here'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    iconColor: 'bg-green-600',
    title: 'Mobile & Tablet',
    description: 'Access our mobile-optimized streaming page on your smartphone or tablet.',
    action: 'View Mobile'
  },
  {
    id: 'youtube',
    icon: Tv,
    iconColor: 'bg-red-600',
    title: 'YouTube Live',
    description: 'Watch on YouTube Live for better integration with your smart TV or streaming device.',
    action: 'Watch on YouTube'
  },
  {
    id: 'facebook',
    icon: Wifi,
    iconColor: 'bg-blue-700',
    title: 'Facebook Live',
    description: 'Join our Facebook Live stream to interact with other viewers in real-time.',
    action: 'Watch on Facebook'
  }
]

/**
 * WatchingOptions component showing different ways to watch streams
 * 
 * @example
 * <WatchingOptions
 *   options={[
 *     {
 *       id: "website",
 *       icon: Monitor,
 *       iconColor: "bg-blue-600",
 *       title: "Website",
 *       description: "Watch directly on our website",
 *       action: "Watch Here"
 *     }
 *   ]}
 * />
 */
export default function WatchingOptions({
  options = defaultOptions,
  className
}: WatchingOptionsProps) {
  const reducedMotion = prefersReducedMotion()

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
          How to Watch
        </Heading>
        <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
          Our streaming service is accessible on multiple platforms and devices.
        </Text>
      </div>

      <Grid cols={4} gap="lg">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { 
              duration: 0.6, 
              delay: index * 0.1 
            }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="bg-white h-full text-center">
              <CardContent>
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${option.iconColor} rounded-full flex items-center justify-center mx-auto`}>
                    <option.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <Heading level="h3" className="text-lg font-semibold">
                    {option.title}
                  </Heading>

                  {/* Description */}
                  <Text size="sm" color="muted" className="leading-relaxed">
                    {option.description}
                  </Text>

                  {/* Action Button */}
                  {option.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={option.onAction}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      {option.action}
                    </Button>
                  )}
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
 * TechnicalRequirements component for streaming requirements
 */
export function TechnicalRequirements({ className }: { className?: string }) {
  const reducedMotion = prefersReducedMotion()

  const requirements = [
    {
      icon: Wifi,
      title: 'Internet Connection',
      items: [
        'Minimum: 1 Mbps for standard quality',
        'Recommended: 3 Mbps for HD quality',
        'Automatic quality adjustment available',
        'Works with Wi-Fi or mobile data'
      ]
    },
    {
      icon: Volume2,
      title: 'Audio & Video',
      items: [
        'High-quality audio with multiple microphones',
        'HD video with professional cameras',
        'Closed captions available on request',
        'Multiple camera angles during Mass'
      ]
    }
  ]

  const browsers = [
    'Chrome (recommended)',
    'Firefox',
    'Safari',
    'Edge',
    'Mobile browsers',
    'Smart TV browsers'
  ]

  const troubleshooting = [
    'Refresh your browser',
    'Try a different browser',
    'Check your internet connection',
    'Contact us for support'
  ]

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="text-center mb-12">
        <Heading level="h2" align="center" className="mb-6 text-white">
          Technical Requirements
        </Heading>
        <Text size="xl" align="center" className="text-gray-300 max-w-3xl mx-auto">
          Ensure the best streaming experience with these technical specifications.
        </Text>
      </div>

      <Grid cols={2} gap="xl">
        {/* Requirements */}
        <div className="space-y-6">
          {requirements.map((req, index) => (
            <Flex key={index} align="start" gap="md">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <req.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <Heading level="h3" className="text-lg font-semibold text-gold-400 mb-2">
                  {req.title}
                </Heading>
                <ul className="space-y-1">
                  {req.items.map((item, idx) => (
                    <li key={idx}>
                      <Text size="sm" className="text-gray-300">
                        • {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Flex>
          ))}
        </div>

        {/* Browsers and Troubleshooting */}
        <div className="space-y-6">
          <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm">
            <CardContent>
              <Heading level="h3" className="text-lg font-semibold text-gold-400 mb-4">
                Supported Browsers
              </Heading>
              <Grid cols={2} gap="sm">
                {browsers.map((browser, index) => (
                  <Text key={index} size="sm" className="text-gray-300">
                    • {browser}
                  </Text>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm">
            <CardContent>
              <Heading level="h3" className="text-lg font-semibold text-gold-400 mb-4">
                Having Issues?
              </Heading>
              <Text size="sm" className="text-gray-300 mb-3">
                If you experience technical difficulties with our stream:
              </Text>
              <ul className="space-y-1">
                {troubleshooting.map((step, index) => (
                  <li key={index}>
                    <Text size="sm" className="text-gray-300">
                      • {step}
                    </Text>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </motion.div>
  )
}

/**
 * Skeleton components for loading states
 */
export function WatchingOptionsSkeleton() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-80 mx-auto" />
      </div>
      
      <Grid cols={4} gap="lg">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} padding="lg" className="text-center">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-20 mx-auto" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mx-auto" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  )
}