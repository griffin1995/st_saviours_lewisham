import React from 'react'
import { motion, m } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, Heading, Text, Grid, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface SacramentEffect {
  title: string
  description: string
}

interface SacramentRequirement {
  title: string
  items: string[]
}

interface SacramentInfoProps {
  /**
   * Sacrament icon
   */
  icon: LucideIcon
  
  /**
   * Main title
   */
  title: string
  
  /**
   * Subtitle/description
   */
  subtitle: string
  
  /**
   * Main content paragraphs
   */
  content: string[]
  
  /**
   * Biblical quote or spiritual quote
   */
  quote?: {
    text: string
    source: string
  }
  
  /**
   * Effects of the sacrament
   */
  effects?: SacramentEffect[]
  
  /**
   * Requirements or preparation steps
   */
  requirements?: SacramentRequirement[]
  
  /**
   * Contact information
   */
  contactInfo?: {
    title: string
    description: string
    phone?: string
    email?: string
  }
  
  /**
   * Background color for the effects section
   */
  effectsColor?: string
  
  /**
   * Theme variant for different background colors
   */
  theme?: 'light' | 'dark'
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * SacramentInfo component for individual sacrament pages
 * 
 * @example
 * <SacramentInfo
 *   icon={Droplets}
 *   title="Born Again in Christ"
 *   subtitle="The first sacrament of forgiveness"
 *   content={[
 *     "Baptism is the first and chief sacrament...",
 *     "In this sacrament, we are cleansed..."
 *   ]}
 *   quote={{
 *     text: "Go therefore and make disciples...",
 *     source: "Matthew 28:19"
 *   }}
 *   effects={[
 *     { title: "Forgiveness of Sin", description: "Original sin is washed away" }
 *   ]}
 *   effectsColor="blue"
 * />
 */
export default function SacramentInfo({
  icon: Icon,
  title,
  subtitle,
  content,
  quote,
  effects,
  requirements,
  contactInfo,
  effectsColor = 'blue',
  theme = 'light',
  className
}: SacramentInfoProps) {
  const reducedMotion = prefersReducedMotion()

  const getEffectsColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-900 border-blue-100',
      red: 'bg-red-50 text-red-900 border-red-100',
      amber: 'bg-amber-50 text-amber-900 border-amber-100',
      green: 'bg-green-50 text-green-900 border-green-100',
      purple: 'bg-purple-50 text-purple-900 border-purple-100',
      indigo: 'bg-indigo-50 text-indigo-900 border-indigo-100',
      pink: 'bg-pink-50 text-pink-900 border-pink-100',
      gold: 'bg-gold-50 text-gold-900 border-gold-100'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      red: 'text-red-600',
      amber: 'text-amber-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600',
      pink: 'text-pink-600',
      gold: 'text-gold-600'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.gold
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Grid cols={2} gap="xl" className="grid-cols-1 lg:grid-cols-2 items-center">
        {/* Content */}
        <div className="space-y-6">
          <div className="relative">
            {theme === 'dark' && (
              <m.div
                className="absolute -left-4 top-0 w-1 h-12 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
                initial={reducedMotion ? { opacity: 0 } : { height: 0 }}
                whileInView={reducedMotion ? { opacity: 1 } : { height: 48 }}
                transition={reducedMotion 
                  ? { duration: 0.3 }
                  : { duration: 1, delay: 0.3 }
                }
                viewport={{ once: true }}
              />
            )}
            <Heading 
              level="h2" 
              className={cn(
                "text-3xl font-light",
                theme === 'dark' ? "text-white" : "text-gray-900"
              )}
            >
              {title}
            </Heading>
          </div>
          
          {subtitle && (
            <Text 
              size="lg" 
              className={cn(
                "leading-relaxed",
                theme === 'dark' ? "text-gray-200" : "text-gray-600"
              )}
            >
              {subtitle}
            </Text>
          )}
          
          <div className="space-y-4">
            {content.map((paragraph, index) => (
              <Text 
                key={index} 
                className={cn(
                  "leading-relaxed",
                  theme === 'dark' ? "text-gray-100" : "text-gray-600"
                )}
              >
                {paragraph}
              </Text>
            ))}
          </div>
          
          {quote && (
            <Flex align="center" gap="sm" className={getIconColor(effectsColor)}>
              <Icon className="h-5 w-5 flex-shrink-0" />
              <Text 
                className={cn(
                  "italic",
                  theme === 'dark' ? "text-gray-200" : "text-gray-600"
                )}
              >
                "{quote.text}" - {quote.source}
              </Text>
            </Flex>
          )}
        </div>

        {/* Effects Section */}
        {effects && effects.length > 0 && (
          <Card 
            variant="default" 
            padding="lg" 
            className={cn(
              'border',
              theme === 'dark' 
                ? 'bg-white/10 backdrop-blur-sm border-slate-600 text-white'
                : getEffectsColorClasses(effectsColor)
            )}
          >
            <CardContent>
              <div className="space-y-4">
                <Heading 
                  level="h3" 
                  className={cn(
                    "text-xl font-semibold",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}
                >
                  Effects of {title.includes('in') ? title.split(' in ')[0] : title}
                </Heading>
                <div className="space-y-3">
                  {effects.map((effect, index) => (
                    <div key={index}>
                      <Text 
                        weight="bold" 
                        className={cn(
                          "mb-1",
                          theme === 'dark' ? "text-white" : "text-gray-900"
                        )}
                      >
                        • {effect.title}
                      </Text>
                      <Text 
                        size="sm" 
                        className={theme === 'dark' ? "text-gray-200" : "text-gray-600"}
                      >
                        {effect.description}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Section Divider */}
      {requirements && requirements.length > 0 && theme === 'dark' && (
        <div className="flex justify-center py-20">
          <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
        </div>
      )}

      {/* Requirements Section */}
      {requirements && requirements.length > 0 && (
        <div className={theme === 'dark' ? "mt-8" : "mt-12"}>
          <Heading 
            level="h3" 
            className={cn(
              "text-2xl font-light mb-8 text-center",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}
          >
            Preparation & Requirements
          </Heading>
          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((requirement, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
              >
                <Card 
                  variant="default" 
                  padding="lg" 
                  className={cn(
                    "h-full",
                    theme === 'dark' 
                      ? "bg-white/10 backdrop-blur-sm border border-slate-600" 
                      : "bg-white"
                  )}
                >
                  <CardContent>
                    <div className="space-y-4">
                      <Heading 
                        level="h4" 
                        className={cn(
                          "text-lg font-semibold",
                          theme === 'dark' ? "text-white" : "text-gray-900"
                        )}
                      >
                        {requirement.title}
                      </Heading>
                      <div className="space-y-2">
                        {requirement.items.map((item, idx) => (
                          <Text 
                            key={idx} 
                            size="sm" 
                            className={theme === 'dark' ? "text-gray-200" : "text-gray-600"}
                          >
                            • {item}
                          </Text>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </Grid>
        </div>
      )}

      {/* Contact Information */}
      {contactInfo && (
        <div className="mt-12">
          <Card variant="default" padding="lg" className="bg-slate-900 text-white">
            <CardContent>
              <div className="text-center space-y-4">
                <Heading level="h3" className="text-2xl font-light text-white">
                  {contactInfo.title}
                </Heading>
                <Text className="text-gray-300 max-w-2xl mx-auto">
                  {contactInfo.description}
                </Text>
                <Flex justify="center" gap="md" wrap>
                  {contactInfo.phone && (
                    <a href={`tel:${contactInfo.phone}`}>
                      <Text className="text-gold-400 hover:text-gold-300 font-medium">
                        📞 {contactInfo.phone}
                      </Text>
                    </a>
                  )}
                  {contactInfo.email && (
                    <a href={`mailto:${contactInfo.email}`}>
                      <Text className="text-gold-400 hover:text-gold-300 font-medium">
                        ✉️ {contactInfo.email}
                      </Text>
                    </a>
                  )}
                </Flex>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </m.div>
  )
}

/**
 * SacramentInfoSkeleton for loading states
 */
export function SacramentInfoSkeleton() {
  return (
    <div className="space-y-12">
      <Grid cols={2} gap="xl" className="grid-cols-1 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-full" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
        <Card padding="lg">
          <CardContent>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}