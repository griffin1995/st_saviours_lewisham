import React from 'react'
import { m} from 'framer-motion'
import { Calendar, Clock, User, ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex } from '@/components/ui'
import { cn, formatDate, truncateText, prefersReducedMotion } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface NewsCardProps {
  /**
   * Article title
   */
  title: string
  
  /**
   * Article excerpt/summary
   */
  excerpt: string
  
  /**
   * Article content (for full article view)
   */
  content?: string
  
  /**
   * Publication date
   */
  date: string | Date
  
  /**
   * Author name
   */
  author?: string
  
  /**
   * Reading time estimate
   */
  readTime?: number
  
  /**
   * Article category
   */
  category?: string
  
  /**
   * Featured image
   */
  image?: string
  
  /**
   * Article slug for linking
   */
  slug?: string
  
  /**
   * External link URL
   */
  href?: string
  
  /**
   * Whether this is a featured article
   */
  featured?: boolean
  
  /**
   * Card layout variant
   */
  variant?: 'default' | 'compact' | 'horizontal' | 'minimal'
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Custom click handler
   */
  onClick?: () => void
}

// Category colors
const categoryColors = {
  'Announcement': 'bg-blue-100 text-blue-800',
  'Liturgical Season': 'bg-purple-100 text-purple-800',
  'Sacraments': 'bg-green-100 text-green-800',
  'Social': 'bg-orange-100 text-orange-800',
  'Youth': 'bg-yellow-100 text-yellow-800',
  'Community': 'bg-pink-100 text-pink-800',
  'Education': 'bg-indigo-100 text-indigo-800'
}

// Variant configurations (moved outside component for skeleton access)
const variantConfig = {
  default: {
    cardClass: 'h-full',
    imageHeight: 'h-48',
    contentPadding: 'p-6',
    excerptLines: 'line-clamp-3'
  },
  compact: {
    cardClass: 'h-full',
    imageHeight: 'h-32',
    contentPadding: 'p-4',
    excerptLines: 'line-clamp-2'
  },
  horizontal: {
    cardClass: 'h-full',
    imageHeight: 'h-full',
    contentPadding: 'p-6',
    excerptLines: 'line-clamp-2'
  },
  minimal: {
    cardClass: 'h-full',
    imageHeight: 'h-0',
    contentPadding: 'p-4',
    excerptLines: 'line-clamp-2'
  }
}

/**
 * NewsCard component for displaying parish news and articles
 * 
 * @example
 * <NewsCard
 *   title="Parish Christmas Service"
 *   excerpt="Join us for our special Christmas Eve service..."
 *   date="2025-01-10"
 *   author="Fr. Krzysztof"
 *   category="Announcement"
 *   slug="christmas-service-2025"
 * />
 */
export default function NewsCard({
  title,
  excerpt,
  content,
  date,
  author = 'Parish Office',
  readTime,
  category,
  image,
  slug,
  href,
  featured = false,
  variant = 'default',
  className,
  onClick
}: NewsCardProps) {
  const reducedMotion = prefersReducedMotion()

  const config = variantConfig[variant]

  // Generate link URL
  const linkUrl = href || (slug ? `/news/${slug}` : '#')

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.open(href, '_blank')
    }
  }

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (slug && !href && !onClick) {
      return (
        <Link href={linkUrl} className="block h-full">
          {children}
        </Link>
      )
    }
    
    if (onClick || href) {
      return (
        <button onClick={handleClick} className="block h-full w-full text-left">
          {children}
        </button>
      )
    }
    
    return <div className="h-full">{children}</div>
  }

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
    >
      <CardWrapper>
        <Card 
          variant={featured ? 'elevated' : 'default'}
          padding="none"
          className={cn(
            config.cardClass,
            'overflow-hidden group transition-all duration-300',
            (slug || href || onClick) && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
            variant === 'horizontal' && 'md:flex md:flex-row'
          )}
        >
          {/* Article Image */}
          {image && variant !== 'minimal' && (
            <div className={cn(
              'relative overflow-hidden',
              variant === 'horizontal' ? 'md:w-1/3 md:flex-shrink-0' : config.imageHeight
            )}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Category badge overlay */}
              {category && (
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                    categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
                  )}>
                    {category}
                  </span>
                </div>
              )}

              {/* Featured badge */}
              {featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}

          <CardContent className={cn(
            config.contentPadding,
            variant === 'horizontal' && 'md:flex-1 md:flex md:flex-col md:justify-between'
          )}>
            <div className="space-y-4">
              {/* Category and Featured (if no image) */}
              {!image && (
                <Flex align="center" gap="sm" wrap>
                  {category && (
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
                    )}>
                      {category}
                    </span>
                  )}
                  {featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                      Featured
                    </span>
                  )}
                </Flex>
              )}

              {/* Title */}
              <Heading 
                level={featured ? 'h2' : 'h3'} 
                className={cn(
                  'group-hover:text-gold-600 transition-colors',
                  featured ? 'text-2xl' : variant === 'compact' ? 'text-lg' : 'text-xl'
                )}
              >
                {title}
              </Heading>

              {/* Excerpt */}
              <Text 
                color="muted" 
                className={config.excerptLines}
                size={variant === 'compact' ? 'sm' : 'base'}
              >
                {excerpt}
              </Text>

              {/* Meta information */}
              <div className="space-y-2">
                <Flex align="center" gap="md" wrap>
                  {/* Date */}
                  <Flex align="center" gap="sm">
                    <Calendar className="h-4 w-4 text-gold-600" />
                    <Text size="sm" color="muted">
                      {formatDate(date)}
                    </Text>
                  </Flex>

                  {/* Author */}
                  <Flex align="center" gap="sm">
                    <User className="h-4 w-4 text-gold-600" />
                    <Text size="sm" color="muted">
                      {author}
                    </Text>
                  </Flex>

                  {/* Read time */}
                  {readTime && (
                    <Flex align="center" gap="sm">
                      <Clock className="h-4 w-4 text-gold-600" />
                      <Text size="sm" color="muted">
                        {readTime} min read
                      </Text>
                    </Flex>
                  )}
                </Flex>

                {/* Read more link */}
                {(slug || href || onClick) && variant !== 'minimal' && (
                  <Flex align="center" gap="sm" className="pt-2">
                    <Text 
                      size="sm" 
                      weight="medium" 
                      className="text-gold-600 group-hover:text-gold-700 transition-colors"
                    >
                      Read more
                    </Text>
                    {href ? (
                      <ExternalLink className="h-4 w-4 text-gold-600 group-hover:text-gold-700 transition-colors" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-gold-600 group-hover:text-gold-700 group-hover:translate-x-1 transition-all" />
                    )}
                  </Flex>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    </m.div>
  )
}

/**
 * NewsCardSkeleton for loading states
 */
export function NewsCardSkeleton({ variant = 'default' }: { variant?: NewsCardProps['variant'] }) {
  const config = variantConfig[variant || 'default']
  
  return (
    <Card padding="none" className={config.cardClass}>
      {variant !== 'minimal' && (
        <div className={cn('bg-gray-200 animate-pulse', config.imageHeight)} />
      )}
      <CardContent className={config.contentPadding}>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * NewsList component for displaying multiple news cards
 */
export function NewsList({ 
  articles, 
  variant = 'default',
  className 
}: { 
  articles: NewsCardProps[]
  variant?: NewsCardProps['variant']
  className?: string 
}) {
  return (
    <div className={cn(
      variant === 'horizontal' 
        ? 'space-y-6' 
        : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      className
    )}>
      {articles.map((article, index) => (
        <NewsCard
          key={article.slug || index}
          {...article}
          variant={variant}
        />
      ))}
    </div>
  )
}