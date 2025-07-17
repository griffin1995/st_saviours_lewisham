import React from 'react'
import { motion, m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Download, Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

export interface PodcastEpisode {
  id: number
  title: string
  description: string
  host: string
  guest?: string
  date: string
  duration: string
  category: string
  audioUrl: string
  downloadUrl: string
  image: string
  featured?: boolean
  season?: number
  episode?: number
}

interface PodcastEpisodeCardProps {
  /**
   * Episode data
   */
  episode: PodcastEpisode
  
  /**
   * Whether this episode is currently playing
   */
  isPlaying?: boolean
  
  /**
   * Layout variant
   */
  variant?: 'featured' | 'horizontal' | 'vertical'
  
  /**
   * Callback when play/pause is clicked
   */
  onTogglePlay?: (episodeId: number) => void
  
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
 * PodcastEpisodeCard component for displaying podcast episodes
 * 
 * @example
 * <PodcastEpisodeCard
 *   episode={episode}
 *   variant="featured"
 *   isPlaying={false}
 *   onTogglePlay={handleTogglePlay}
 * />
 */
export default function PodcastEpisodeCard({
  episode,
  isPlaying = false,
  variant = 'horizontal',
  onTogglePlay,
  delay = 0,
  className
}: PodcastEpisodeCardProps) {
  const reducedMotion = prefersReducedMotion()

  const formatDate = (dateString: string, format: 'long' | 'short' = 'long') => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', format === 'long' ? { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    } : {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const handlePlayClick = () => {
    onTogglePlay?.(episode.id)
  }

  if (variant === 'featured') {
    return (
      <m.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay }}
        viewport={{ once: true }}
        className={className}
      >
        <Card variant="default" padding="none" className="bg-white overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          {/* Episode Image with Play Button */}
          <div className="relative h-64">
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Featured Badge */}
            {episode.featured && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                  Featured
                </span>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={handlePlayClick}
                className="w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-200 border-0"
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white" />
                ) : (
                  <Play className="h-10 w-10 text-white ml-1" />
                )}
              </Button>
            </div>
          </div>

          <CardContent>
            <div className="p-6 space-y-4">
              {/* Episode Meta */}
              <Flex align="center" gap="md" className="text-sm text-gray-500">
                <Flex align="center" gap="sm">
                  <Calendar className="h-4 w-4" />
                  <Text size="sm" color="muted">
                    {formatDate(episode.date)}
                  </Text>
                </Flex>
                <Flex align="center" gap="sm">
                  <Clock className="h-4 w-4" />
                  <Text size="sm" color="muted">
                    {episode.duration}
                  </Text>
                </Flex>
              </Flex>
              
              {/* Title */}
              <Heading level="h3" className="text-xl font-semibold hover:text-gold-600 transition-colors">
                {episode.title}
              </Heading>
              
              {/* Description */}
              <Text color="muted" className="leading-relaxed line-clamp-3">
                {episode.description}
              </Text>
              
              {/* Host and Category */}
              <Flex align="center" justify="between">
                <Flex align="center" gap="sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <Text size="sm" className="text-gray-700">
                    {episode.host}
                    {episode.guest && ` & ${episode.guest}`}
                  </Text>
                </Flex>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {episode.category}
                </span>
              </Flex>

              {/* Actions */}
              <Flex gap="sm">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handlePlayClick}
                  leftIcon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  className="flex-1"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Link href={episode.downloadUrl}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                  >
                    Download
                  </Button>
                </Link>
              </Flex>
            </div>
          </CardContent>
        </Card>
      </m.div>
    )
  }

  // Horizontal layout for episode list
  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="none" className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Episode Image */}
          <div className="relative w-full md:w-48 h-48 md:h-auto">
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="md"
                onClick={handlePlayClick}
                className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-200 border-0"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white ml-0.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Episode Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div className="flex-1">
                {/* Episode Meta */}
                <Flex align="center" gap="md" className="text-sm text-gray-500 mb-2">
                  {episode.season && episode.episode && (
                    <span className="font-medium">S{episode.season}E{episode.episode}</span>
                  )}
                  <Flex align="center" gap="sm">
                    <Calendar className="h-3 w-3" />
                    <Text size="sm" color="muted">
                      {formatDate(episode.date, 'short')}
                    </Text>
                  </Flex>
                  <Flex align="center" gap="sm">
                    <Clock className="h-3 w-3" />
                    <Text size="sm" color="muted">
                      {episode.duration}
                    </Text>
                  </Flex>
                </Flex>
                
                {/* Title */}
                <Heading level="h3" className="text-xl font-semibold mb-2 hover:text-gold-600 transition-colors">
                  {episode.title}
                </Heading>
                
                {/* Description */}
                <Text color="muted" className="mb-3 line-clamp-2">
                  {episode.description}
                </Text>
                
                {/* Host and Category */}
                <Flex align="center" gap="md">
                  <Flex align="center" gap="sm">
                    <User className="h-3 w-3 text-gray-500" />
                    <Text size="sm" className="text-gray-700">
                      {episode.host}
                      {episode.guest && ` & ${episode.guest}`}
                    </Text>
                  </Flex>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {episode.category}
                  </span>
                </Flex>
              </div>

              {/* Actions */}
              <Flex gap="sm" className="mt-4 md:mt-0 md:ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handlePlayClick}
                  leftIcon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Link href={episode.downloadUrl}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                  >
                    Download
                  </Button>
                </Link>
              </Flex>
            </div>
          </div>
        </div>
      </Card>
    </m.div>
  )
}

/**
 * PodcastEpisodeCardSkeleton for loading states
 */
export function PodcastEpisodeCardSkeleton({ variant = 'horizontal' }: { variant?: 'featured' | 'horizontal' }) {
  if (variant === 'featured') {
    return (
      <Card padding="none">
        <div className="h-64 bg-gray-200 animate-pulse" />
        <CardContent>
          <div className="p-6 space-y-4">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card padding="none">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-48 h-48 md:h-32 bg-gray-200 animate-pulse" />
        <div className="flex-1 p-6">
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            </div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}