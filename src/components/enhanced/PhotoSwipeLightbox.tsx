import React, { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'

// Define PhotoSwipe interfaces to avoid TypeScript errors
interface PhotoSwipeItem {
  src: string
  width: number
  height: number
  alt?: string
  caption?: string
}

interface PhotoSwipeOptions {
  gallery?: string
  children?: string
  pswpModule?: any
  bgOpacity?: number
  showHideOpacity?: boolean
  arrowKeys?: boolean
  escKey?: boolean
  clickToCloseNonZoomable?: boolean
  maxSpreadZoom?: number
  returnFocus?: boolean
  trapFocus?: boolean
  wheelToZoom?: boolean
  pinchToClose?: boolean
  closeOnVerticalDrag?: boolean
  padding?: { top: number; bottom: number; left: number; right: number }
  loop?: boolean
  zoom?: boolean
  preload?: [number, number]
  easing?: string
  showAnimationDuration?: number
  hideAnimationDuration?: number
  counter?: boolean
  arrowPrevSVG?: string
  arrowNextSVG?: string
  closeSVG?: string
  zoomSVG?: string
}

interface PhotoSwipeLightboxProps {
  galleryId: string
  images: PhotoSwipeItem[]
  options?: PhotoSwipeOptions
  children: React.ReactNode
  className?: string
}

export const PhotoSwipeLightbox: React.FC<PhotoSwipeLightboxProps> = ({
  galleryId,
  images,
  options = {},
  children,
  className = ''
}) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [PhotoSwipe, setPhotoSwipe] = useState<any>(null)
  const [lightboxInstance, setLightboxInstance] = useState<any>(null)

  useEffect(() => {
    // Dynamic import of PhotoSwipe for better performance
    const loadPhotoSwipe = async () => {
      try {
        const { default: PhotoSwipeModule } = await import('photoswipe')
        const { default: PhotoSwipeLightboxModule } = await import('photoswipe/lightbox')
        
        setPhotoSwipe({ PhotoSwipeModule, PhotoSwipeLightboxModule })
      } catch (error) {
        console.warn('PhotoSwipe not available, falling back to simple modal')
      }
    }

    loadPhotoSwipe()
  }, [])

  useEffect(() => {
    if (!PhotoSwipe || !galleryRef.current) return

    const { PhotoSwipeLightboxModule } = PhotoSwipe

    const lightbox = new PhotoSwipeLightboxModule({
      gallery: `#${galleryId}`,
      children: 'a',
      pswpModule: PhotoSwipe.PhotoSwipeModule,
      bgOpacity: 0.9,
      showHideOpacity: true,
      arrowKeys: true,
      escKey: true,
      clickToCloseNonZoomable: true,
      maxSpreadZoom: 3,
      returnFocus: true,
      trapFocus: true,
      wheelToZoom: true,
      pinchToClose: true,
      closeOnVerticalDrag: true,
      padding: { top: 20, bottom: 40, left: 100, right: 100 },
      loop: true,
      zoom: true,
      preload: [1, 3],
      easing: 'cubic-bezier(0.4, 0, 0.22, 1)',
      showAnimationDuration: 333,
      hideAnimationDuration: 333,
      counter: true,
      ...options
    })

    // Custom UI elements with Catholic styling
    lightbox.on('uiRegister', () => {
      // Add custom close button
      lightbox.pswp.ui.registerElement({
        name: 'custom-close',
        order: 9,
        isButton: true,
        html: `
          <svg class="pswp__icn" viewBox="0 0 24 24" width="24" height="24">
            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" fill="currentColor"/>
          </svg>
        `,
        onInit: (el: HTMLElement) => {
          el.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: rgba(212, 175, 55, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.2s ease;
          `
          el.addEventListener('mouseenter', () => {
            el.style.background = 'rgba(212, 175, 55, 1)'
            el.style.transform = 'scale(1.1)'
          })
          el.addEventListener('mouseleave', () => {
            el.style.background = 'rgba(212, 175, 55, 0.9)'
            el.style.transform = 'scale(1)'
          })
        },
        onClick: () => {
          lightbox.pswp.close()
        }
      })

      // Custom caption styling
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: '',
        onInit: (el: HTMLElement) => {
          el.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            padding: 40px 20px 20px;
            color: white;
            text-align: center;
            z-index: 1000;
          `
        }
      })
    })

    // Update caption content when slide changes
    lightbox.on('change', () => {
      const customCaption = lightbox.pswp.element?.querySelector('.pswp__custom-caption')
      if (customCaption && lightbox.pswp.currSlide) {
        const slideData = lightbox.pswp.currSlide.data
        if (slideData.caption) {
          customCaption.innerHTML = `
            <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px; color: #d4af37;">
              ${slideData.alt || 'Gallery Image'}
            </div>
            <div style="font-size: 14px; opacity: 0.9;">
              ${slideData.caption}
            </div>
          `
        }
      }
    })

    lightbox.init()
    setLightboxInstance(lightbox)

    return () => {
      if (lightbox) {
        lightbox.destroy()
      }
    }
  }, [PhotoSwipe, galleryId, options])

  // Fallback modal for when PhotoSwipe is not available
  const [fallbackModal, setFallbackModal] = useState<{
    isOpen: boolean
    currentImage: PhotoSwipeItem | null
  }>({
    isOpen: false,
    currentImage: null
  })

  const handleImageClick = (image: PhotoSwipeItem, event: React.MouseEvent) => {
    if (!PhotoSwipe) {
      event.preventDefault()
      setFallbackModal({
        isOpen: true,
        currentImage: image
      })
    }
  }

  const closeFallbackModal = () => {
    setFallbackModal({ isOpen: false, currentImage: null })
  }

  return (
    <>
      <div
        id={galleryId}
        className={className}
        ref={galleryRef}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === 'a') {
            const imageData = images[index]
            if (imageData) {
              return React.cloneElement(child, {
                ...child.props,
                'data-pswp-src': imageData.src,
                'data-pswp-width': imageData.width,
                'data-pswp-height': imageData.height,
                'data-pswp-alt': imageData.alt,
                'data-pswp-caption': imageData.caption,
                onClick: (e: React.MouseEvent) => {
                  if (child.props.onClick) {
                    child.props.onClick(e)
                  }
                  handleImageClick(imageData, e)
                }
              })
            }
          }
          return child
        })}
      </div>

      {/* Fallback modal */}
      {fallbackModal.isOpen && fallbackModal.currentImage && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeFallbackModal}
        >
          <div className="relative max-w-4xl max-h-screen p-4">
            <button
              onClick={closeFallbackModal}
              className="absolute top-4 right-4 w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-black hover:bg-gold-500 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <m.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={fallbackModal.currentImage.src}
              alt={fallbackModal.currentImage.alt}
              className="w-full h-auto max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {fallbackModal.currentImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white text-center">
                <div className="text-lg font-medium text-gold-400 mb-2">
                  {fallbackModal.currentImage.alt}
                </div>
                <div className="text-sm opacity-90">
                  {fallbackModal.currentImage.caption}
                </div>
              </div>
            )}
          </div>
        </m.div>
      )}
    </>
  )
}

// Enhanced Image component with lazy loading and fade-in animation
interface EnhancedImageProps {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  className?: string
  loading?: 'lazy' | 'eager'
  reducedMotion?: boolean
}

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
  loading = 'lazy',
  reducedMotion = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <m.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <img
        ref={imgRef}
        src={isIntersecting ? src : ''}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      
      {/* Caption overlay */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white text-sm">{caption}</p>
        </div>
      )}
    </m.div>
  )
}

export default PhotoSwipeLightbox