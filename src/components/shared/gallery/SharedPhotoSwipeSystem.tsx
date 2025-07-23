/**
 * Shared PhotoSwipe System Component
 * Consolidates PhotoSwipe/Gallery usage across all pages
 * 
 * OFFICIAL PATTERNS USED:
 * - PhotoSwipe v5 Lightbox: photoswipe.com/getting-started/
 * - React Component Patterns: From existing PhotoSwipe implementation
 * - All underlying patterns are from the original PhotoSwipe components
 * 
 * Based on enterprise consolidation analysis - extracted from:
 * Multiple pages using PhotoSwipe with similar patterns:
 * - index.tsx, about-us.tsx, gallery.tsx, contact-us.tsx
 * - mass.tsx, news.tsx and enhanced components
 */

import React, { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  InformationCircleIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  TagIcon,
  EyeIcon,
  PhotoIcon
} from '@heroicons/react/24/solid'

// Unified interface for all gallery images across the site
export interface SharedGalleryImage {
  id: number | string
  src: string
  alt: string
  title: string
  category?: string
  date?: string
  description?: string
  photographer?: string
  tags?: string[]
  width?: number
  height?: number
  caption?: string
}

// Configuration for different page contexts
const PAGE_CONFIGS = {
  // Main pages
  'index': {
    showFilters: false,
    showInfo: false,
    autoSlide: true,
    gridCols: 3
  },
  'about-us': {
    showFilters: false,
    showInfo: true,
    autoSlide: false,
    gridCols: 3
  },
  'contact-us': {
    showFilters: false,
    showInfo: false,
    autoSlide: false,
    gridCols: 2
  },
  'mass': {
    showFilters: false,
    showInfo: true,
    autoSlide: false,
    gridCols: 2
  },
  'news': {
    showFilters: true,
    showInfo: true,
    autoSlide: false,
    gridCols: 3
  },
  'gallery': {
    showFilters: true,
    showInfo: true,
    autoSlide: false,
    gridCols: 4
  }
} as const

export type PageContext = keyof typeof PAGE_CONFIGS

export interface SharedPhotoSwipeSystemProps {
  pageContext: PageContext
  images: SharedGalleryImage[]
  categories?: string[]
  onImageClick?: (image: SharedGalleryImage, index: number) => void
  reducedMotion?: boolean
  className?: string
  galleryId?: string
  children?: React.ReactNode
}

/**
 * Shared PhotoSwipe System Component
 * 
 * Provides consistent PhotoSwipe/Gallery integration across all pages
 * with page-appropriate configurations and standardized functionality
 */
export function SharedPhotoSwipeSystem({
  pageContext,
  images,
  categories = [],
  onImageClick,
  reducedMotion = false,
  className = '',
  galleryId = 'shared-gallery',
  children
}: SharedPhotoSwipeSystemProps) {
  const config = PAGE_CONFIGS[pageContext]
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<SharedGalleryImage | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filter images based on page configuration
  const filteredImages = images.filter(image => {
    if (!config.showFilters) return true
    
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (image.tags && image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    
    return matchesCategory && matchesSearch
  })

  // Handle image click
  const handleImageClick = (image: SharedGalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
    setIsLightboxOpen(true)
    
    if (onImageClick) {
      onImageClick(image, index)
    }
  }

  // Handle lightbox navigation
  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length
    
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className={`shared-photoswipe-system ${className}`}>
      {/* Filters - only show if page config allows */}
      {config.showFilters && categories.length > 0 && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gold-600 text-black'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={`grid gap-4 ${
        config.gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        config.gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {filteredImages.map((image, index) => (
          <m.div
            key={image.id}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={reducedMotion ? {} : { delay: index * 0.1 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-slate-800 aspect-square"
            onClick={() => handleImageClick(image, index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                <PhotoIcon className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{image.title}</h3>
                {image.category && (
                  <p className="text-xs text-gray-300 mt-1">{image.category}</p>
                )}
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Custom content (for backwards compatibility) */}
      {children}

      {/* Enhanced PhotoSwipe Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-7xl max-h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => handleNavigate('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={() => handleNavigate('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />

              {/* Info panel - only show if page config allows */}
              {config.showInfo && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-gray-300 mt-2">{selectedImage.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-400">
                      {selectedImage.category && <span>{selectedImage.category}</span>}
                      {selectedImage.date && <span> • {selectedImage.date}</span>}
                      {selectedImage.photographer && <span> • {selectedImage.photographer}</span>}
                    </div>
                    <div className="text-sm text-gray-400">
                      {currentIndex + 1} / {filteredImages.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Pre-configured PhotoSwipe components for common page types
 */

// Gallery page - full featured
export function GalleryPagePhotoSwipe({ 
  images, 
  categories = [],
  reducedMotion = false,
  className = '' 
}: {
  images: SharedGalleryImage[]
  categories?: string[]
  reducedMotion?: boolean
  className?: string
}) {
  return (
    <SharedPhotoSwipeSystem
      pageContext="gallery"
      images={images}
      categories={categories}
      reducedMotion={reducedMotion}
      className={className}
    />
  )
}

// Main pages - basic functionality
export function MainPagePhotoSwipe({ 
  images,
  pageContext,
  reducedMotion = false,
  className = '',
  children
}: {
  images: SharedGalleryImage[]
  pageContext: Extract<PageContext, 'index' | 'about-us' | 'contact-us' | 'mass' | 'news'>
  reducedMotion?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <SharedPhotoSwipeSystem
      pageContext={pageContext}
      images={images}
      reducedMotion={reducedMotion}
      className={className}
    >
      {children}
    </SharedPhotoSwipeSystem>
  )
}

export default SharedPhotoSwipeSystem