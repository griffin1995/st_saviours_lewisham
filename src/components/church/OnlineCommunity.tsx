import React from 'react'
import { m } from 'framer-motion'
import { Heart, Users, Bell, MessageCircle, Hand, Rss } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, Heading, Text, Button, Grid } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

interface CommunityFeature {
  id: string
  icon: LucideIcon
  iconColor: string
  title: string
  description: string
  action?: string
  actionHref?: string
  onClick?: () => void
  status?: string
  statusColor?: string
}

interface OnlineCommunityProps {
  /**
   * List of community features
   */
  features?: CommunityFeature[]
  
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultFeatures: CommunityFeature[] = [
  {
    id: 'live-chat',
    icon: MessageCircle,
    iconColor: 'text-red-600',
    title: 'Live Chat',
    description: 'Participate in live chat during streams to share prayers, requests, and fellowship with other viewers.',
    status: 'Available During Streams',
    statusColor: 'text-red-600'
  },
  {
    id: 'prayer-requests',
    icon: Hand,
    iconColor: 'text-blue-600',
    title: 'Prayer Requests',
    description: 'Submit prayer requests through our online form and we\'ll include them in our prayers during Mass.',
    action: 'Submit Request',
    actionHref: '/contact-us'
  },
  {
    id: 'notifications',
    icon: Bell,
    iconColor: 'text-green-600',
    title: 'Notifications',
    description: 'Subscribe to receive notifications before each stream so you never miss a service.',
    action: 'Enable Notifications'
  },
  {
    id: 'community',
    icon: Users,
    iconColor: 'text-purple-600',
    title: 'Community Hub',
    description: 'Connect with other parishioners through our online community platform and discussion groups.',
    action: 'Join Community'
  },
  {
    id: 'newsletter',
    icon: Rss,
    iconColor: 'text-orange-600',
    title: 'Newsletter',
    description: 'Stay updated with parish news, events, and spiritual reflections delivered to your inbox.',
    action: 'Subscribe Now'
  },
  {
    id: 'devotions',
    icon: Heart,
    iconColor: 'text-pink-600',
    title: 'Daily Devotions',
    description: 'Access daily prayers, scripture readings, and spiritual reflections to deepen your faith journey.',
    action: 'View Devotions'
  }
]

/**
 * OnlineCommunity component showing community features and interactions
 * 
 * @example
 * <OnlineCommunity
 *   features={[
 *     {
 *       id: "chat",
 *       icon: MessageCircle,
 *       iconColor: "text-blue-600",
 *       title: "Live Chat",
 *       description: "Chat during streams",
 *       action: "Join Chat"
 *     }
 *   ]}
 * />
 */
export default function OnlineCommunity({
  features = defaultFeatures,
  className
}: OnlineCommunityProps) {
  const reducedMotion = prefersReducedMotion()

  const handleFeatureAction = (feature: CommunityFeature) => {
    if (feature.onClick) {
      feature.onClick()
    } else if (feature.actionHref) {
      // Link component will handle this
    } else {
      // Default action for features without specific handlers
      console.log(`Action for ${feature.id}`)
    }
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="text-center mb-12">
        <Heading level="h2" align="center" className="mb-6">
          Join Our Online Community
        </Heading>
        <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
          Watching online doesn't mean worshipping alone. Connect with other viewers 
          and participate in our digital parish community.
        </Text>
      </div>

      <Grid cols={3} gap="lg">
        {features.map((feature, index) => (
          <m.div
            key={feature.id}
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
                  <feature.icon className={`h-12 w-12 ${feature.iconColor} mx-auto`} />

                  {/* Title */}
                  <Heading level="h3" className="text-lg font-semibold">
                    {feature.title}
                  </Heading>

                  {/* Description */}
                  <Text size="sm" color="muted" className="leading-relaxed">
                    {feature.description}
                  </Text>

                  {/* Status or Action */}
                  {feature.status ? (
                    <span className={`font-semibold text-sm ${feature.statusColor || 'text-gray-600'}`}>
                      {feature.status}
                    </span>
                  ) : feature.action && (
                    feature.actionHref ? (
                      <Link href={feature.actionHref}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${feature.iconColor} hover:${feature.iconColor}/80 font-semibold`}
                        >
                          {feature.action}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeatureAction(feature)}
                        className={`${feature.iconColor} hover:${feature.iconColor}/80 font-semibold`}
                      >
                        {feature.action}
                      </Button>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </Grid>
    </m.div>
  )
}

/**
 * OnlineCommunitySkeleton for loading states
 */
export function OnlineCommunitySkeleton() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto" />
      </div>
      
      <Grid cols={3} gap="lg">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} padding="lg" className="text-center">
            <CardContent>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mx-auto" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mx-auto" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-20 mx-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  )
}