import React from 'react'
import { motion, m } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { Card, CardContent, Text, Flex } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

interface PodcastSearchProps {
  /**
   * Current search term
   */
  searchTerm: string
  
  /**
   * Selected category filter
   */
  selectedCategory: string
  
  /**
   * Available categories
   */
  categories: string[]
  
  /**
   * Callback when search term changes
   */
  onSearchChange: (value: string) => void
  
  /**
   * Callback when category filter changes
   */
  onCategoryChange: (category: string) => void
  
  /**
   * Number of results found
   */
  resultsCount?: number
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * PodcastSearch component for filtering podcast episodes
 * 
 * @example
 * <PodcastSearch
 *   searchTerm={search}
 *   selectedCategory={category}
 *   categories={["All", "Spiritual Formation", "Liturgy"]}
 *   onSearchChange={setSearch}
 *   onCategoryChange={setCategory}
 *   resultsCount={filteredEpisodes.length}
 * />
 */
export default function PodcastSearch({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  resultsCount,
  className
}: PodcastSearchProps) {
  const reducedMotion = prefersReducedMotion()

  return (
    <m.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="lg" className="bg-white">
        <CardContent>
          <Flex direction="col" gap="lg" className="lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search episodes by title, description, or host..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <Flex align="center" gap="md">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Flex>
          </Flex>

          {/* Results Count */}
          {resultsCount !== undefined && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Text size="sm" color="muted">
                {resultsCount === 0 ? (
                  'No episodes found matching your criteria'
                ) : resultsCount === 1 ? (
                  '1 episode found'
                ) : (
                  `${resultsCount} episodes found`
                )}
                {searchTerm && (
                  <span> for "{searchTerm}"</span>
                )}
                {selectedCategory !== 'All' && (
                  <span> in {selectedCategory}</span>
                )}
              </Text>
            </div>
          )}
        </CardContent>
      </Card>
    </m.div>
  )
}

/**
 * PodcastSearchSkeleton for loading states
 */
export function PodcastSearchSkeleton() {
  return (
    <Card padding="lg">
      <CardContent>
        <Flex direction="col" gap="lg" className="lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <Flex align="center" gap="md">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  )
}