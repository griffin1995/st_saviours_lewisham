import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { Card, CardContent, Heading, Text, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

export interface Sacrament {
  name: string
  icon: LucideIcon
  description: string
  details: string
  link: string
  color: string
}

interface SacramentCardProps {
  /**
   * Sacrament data
   */
  sacrament: Sacrament
  
  /**
   * Animation delay for stagger effects
   */
  delay?: number
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * SacramentCard component for displaying individual sacraments
 * 
 * @example
 * <SacramentCard
 *   sacrament={{
 *     name: "Baptism",
 *     icon: Droplets,
 *     description: "The gateway to life in the Spirit",
 *     details: "Through Baptism we are freed from sin",
 *     link: "/the-sacraments/baptism",
 *     color: "blue"
 *   }}
 *   delay={0.1}
 * />
 */
export default function SacramentCard({
  sacrament,
  delay = 0,
  className
}: SacramentCardProps) {
  const reducedMotion = prefersReducedMotion()

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      amber: 'bg-amber-600 hover:bg-amber-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700',
      pink: 'bg-pink-600 hover:bg-pink-700',
      gold: 'bg-gold-600 hover:bg-gold-700'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gold-600 hover:bg-gold-700'
  }

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay }}
      viewport={{ once: true }}
      className={cn('group', className)}
    >
      <Link href={sacrament.link}>
        <Card 
          variant="default" 
          padding="lg" 
          className="bg-white h-full hover:shadow-xl transition-all duration-500 group-hover:scale-105"
        >
          <CardContent>
            <div className="space-y-4">
              {/* Icon and Title */}
              <Flex align="center" gap="md">
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center transition-colors',
                  getColorClasses(sacrament.color)
                )}>
                  <sacrament.icon className="h-6 w-6 text-white" />
                </div>
                <Heading 
                  level="h3" 
                  className="text-xl font-serif font-semibold group-hover:text-gray-700 transition-colors"
                >
                  {sacrament.name}
                </Heading>
              </Flex>
              
              {/* Description */}
              <Text color="muted" className="leading-relaxed flex-1">
                {sacrament.description}
              </Text>
              
              {/* Details */}
              <Text size="sm" className="text-gray-500 italic">
                {sacrament.details}
              </Text>
              
              {/* Learn More Link */}
              <Flex 
                align="center" 
                gap="sm" 
                className="text-gold-600 hover:text-gold-700 font-semibold transition-all group-hover:translate-x-1 transform duration-300"
              >
                <Text className="text-gold-600 group-hover:text-gold-700">
                  Learn More
                </Text>
                <ArrowRight className="h-4 w-4" />
              </Flex>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

/**
 * SacramentCardSkeleton for loading states
 */
export function SacramentCardSkeleton() {
  return (
    <Card padding="lg">
      <CardContent>
        <div className="space-y-4">
          <Flex align="center" gap="md">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
          </Flex>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </CardContent>
    </Card>
  )
}