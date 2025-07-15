import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button, Heading, Text, Flex } from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'
import type { GalleryImage } from './GalleryGrid'

interface ImageLightboxProps {
  /**
   * Currently selected image
   */
  image: GalleryImage | null
  
  /**
   * Array of all images for navigation
   */
  images: GalleryImage[]
  
  /**
   * Current image index
   */
  currentIndex: number
  
  /**
   * Callback to close lightbox
   */
  onClose: () => void
  
  /**
   * Callback for navigation
   */
  onNavigate: (direction: 'prev' | 'next') => void
  
  /**
   * Show navigation arrows
   */
  showNavigation?: boolean
}

/**
 * ImageLightbox component for full-screen image viewing
 * 
 * @example
 * <ImageLightbox
 *   image={selectedImage}
 *   images={galleryImages}
 *   currentIndex={lightboxIndex}
 *   onClose={closeLightbox}
 *   onNavigate={navigateLightbox}
 * />
 */
export default function ImageLightbox({
  image,
  images,
  currentIndex,
  onClose,
  onNavigate,
  showNavigation = true
}: ImageLightboxProps) {
  const reducedMotion = prefersReducedMotion()

  // Keyboard navigation
  useEffect(() => {
    if (!image) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (showNavigation && images.length > 1) {
            onNavigate('prev')
          }
          break
        case 'ArrowRight':
          if (showNavigation && images.length > 1) {
            onNavigate('next')
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [image, images.length, onClose, onNavigate, showNavigation])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [image])

  return (
    <AnimatePresence>
      {image && (
        <m.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={reducedMotion ? { duration: 0.2 } : { duration: 0.3 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 rounded-full text-white hover:bg-black/70 border-0"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            {showNavigation && images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate('prev')
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full text-white hover:bg-black/70 border-0"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate('next')
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full text-white hover:bg-black/70 border-0"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image Container */}
            <m.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={reducedMotion ? { duration: 0.2 } : { duration: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              {/* Main Image */}
              <div className="relative max-w-5xl max-h-[70vh] w-full h-full mb-6">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                  priority
                  sizes="100vw"
                />
              </div>

              {/* Image Details */}
              <m.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 0.4, delay: 0.1 }}
                className="text-center text-white max-w-2xl px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Heading level="h2" className="text-2xl font-semibold mb-2 text-white">
                  {image.title}
                </Heading>
                
                {image.description && (
                  <Text className="text-gray-300 mb-4 leading-relaxed">
                    {image.description}
                  </Text>
                )}
                
                <Flex justify="center" align="center" gap="md" wrap className="text-sm">
                  <Flex align="center" gap="sm" className="text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <Text size="sm" className="text-gray-400">
                      {new Date(image.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </Text>
                  </Flex>
                  
                  <span className="px-3 py-1 bg-gold-600 text-white rounded-full text-xs font-medium">
                    {image.category}
                  </span>
                  
                  {showNavigation && images.length > 1 && (
                    <Text size="sm" className="text-gray-400">
                      {currentIndex + 1} of {images.length}
                    </Text>
                  )}
                </Flex>
              </m.div>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}