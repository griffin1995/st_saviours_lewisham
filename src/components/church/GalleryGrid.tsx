import React, { useState } from 'react'
import { m} from 'framer-motion'
import Image from 'next/image'
import { Camera, Calendar, Filter } from 'lucide-react'
import { Button, Card, CardContent, Heading, Text, Grid, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

export interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  category: string
  date: string
  description?: string
}

interface GalleryGridProps {
  /**
   * Array of gallery images
   */
  images: GalleryImage[]
  
  /**
   * Available categories for filtering
   */
  categories?: string[]
  
  /**
   * Grid layout columns
   */
  columns?: 2 | 3 | 4
  
  /**
   * Show category filter
   */
  showFilter?: boolean
  
  /**
   * Callback when image is clicked
   */
  onImageClick?: (image: GalleryImage, index: number) => void
  
  /**
   * Initial category filter
   */
  initialCategory?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * GalleryGrid component for displaying filterable image galleries
 * 
 * @example
 * <GalleryGrid
 *   images={galleryImages}
 *   categories={['All', 'Events', 'Church']}
 *   columns={3}
 *   onImageClick={handleImageClick}
 * />
 */
export default function GalleryGrid({
  images,
  categories = ['All'],
  columns = 3,
  showFilter = true,
  onImageClick,
  initialCategory = 'All',
  className
}: GalleryGridProps) {
  const reducedMotion = prefersReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  const filteredImages = images.filter(image => 
    selectedCategory === 'All' || image.category === selectedCategory
  )

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  const handleImageClick = (image: GalleryImage) => {
    if (onImageClick) {
      const index = filteredImages.findIndex(img => img.id === image.id)
      onImageClick(image, index)
    }
  }

  return (
    <div className={className}>
      {/* Category Filter */}
      {showFilter && categories.length > 1 && (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Flex justify="center" gap="sm" wrap className="mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                leftIcon={<Filter className="h-4 w-4" />}
                className="min-w-0"
              >
                {category}
              </Button>
            ))}
          </Flex>
          
          <div className="text-center">
            <Heading level="h2" className="mb-4">
              {selectedCategory === 'All' ? 'All Photos' : selectedCategory}
            </Heading>
            <Text size="xl" color="muted" className="max-w-3xl mx-auto">
              {selectedCategory === 'All' 
                ? 'Browse our complete collection of parish life moments'
                : `Photos from our ${selectedCategory.toLowerCase()}`
              }
            </Text>
          </div>
        </m.div>
      )}

      {/* Empty State */}
      {filteredImages.length === 0 ? (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <Heading level="h3" color="muted" className="mb-2">
            No photos found
          </Heading>
          <Text color="muted">
            No photos available in this category at the moment.
          </Text>
        </m.div>
      ) : (
        /* Gallery Grid */
        <div className={cn('grid gap-6', gridColsClass[columns])}>
          {filteredImages.map((image, index) => (
            <m.div
              key={image.id}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Heading level="h4" className="text-lg font-semibold mb-1 text-white">
                    {image.title}
                  </Heading>
                  <Flex align="center" gap="sm" className="text-sm text-gray-200">
                    <Calendar className="h-3 w-3" />
                    <Text size="sm" className="text-gray-200">
                      {new Date(image.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </Text>
                  </Flex>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      )}
    </div>
  )
}