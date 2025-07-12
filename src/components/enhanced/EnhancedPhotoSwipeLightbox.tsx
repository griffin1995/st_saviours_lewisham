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
  MagnifyingGlassMinusIcon
} from '@heroicons/react/24/solid'

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  category: string
  date: string
  description?: string
  photographer?: string
  tags?: string[]
}

interface EnhancedPhotoSwipeLightboxProps {
  image: GalleryImage | null
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  reducedMotion?: boolean
}

export const EnhancedPhotoSwipeLightbox: React.FC<EnhancedPhotoSwipeLightboxProps> = ({
  image,
  images,
  currentIndex,
  onClose,
  onNavigate,
  reducedMotion = false
}) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset state when image changes
  useEffect(() => {
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
    setIsInfoVisible(false)
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!image) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onNavigate('prev')
          break
        case 'ArrowRight':
          onNavigate('next')
          break
        case 'i':
        case 'I':
          setIsInfoVisible(!isInfoVisible)
          break
        case '+':
        case '=':
          handleZoom('in')
          break
        case '-':
          handleZoom('out')
          break
        case '0':
          setZoomLevel(1)
          setPanPosition({ x: 0, y: 0 })
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose, onNavigate, isInfoVisible])

  const handleZoom = (direction: 'in' | 'out') => {
    const factor = direction === 'in' ? 1.2 : 0.8
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel * factor))
    setZoomLevel(newZoom)
    
    if (newZoom === 1) {
      setPanPosition({ x: 0, y: 0 })
    }
  }

  const handleShare = async () => {
    if (!image) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description || image.title,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleDownload = () => {
    if (!image) return

    const link = document.createElement('a')
    link.href = image.src
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!image) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: reducedMotion ? 0.1 : 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: reducedMotion ? 0.1 : 0.2 }
    }
  }

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      scale: reducedMotion ? 1 : 0.8,
      y: reducedMotion ? 0 : 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: reducedMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: reducedMotion ? 1 : 0.9,
      transition: { duration: reducedMotion ? 0.1 : 0.2 }
    }
  }

  return (
    <AnimatePresence>
      <m.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {currentIndex + 1} of {images.length}
              </span>
              <h3 className="font-medium">{image.title}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsInfoVisible(!isInfoVisible)
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Toggle info"
              >
                <InformationCircleIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare()
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Share"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload()
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Download"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div 
          ref={containerRef}
          className="flex items-center justify-center min-h-screen p-4 pt-16 pb-20"
          onClick={(e) => e.stopPropagation()}
        >
          <m.div
            className="relative max-w-screen-lg max-h-full"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img
              ref={imageRef}
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
              onClick={() => handleZoom('in')}
              draggable={false}
            />
          </m.div>
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('prev')
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('next')
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
                title="Like"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
              
              <span className="text-sm text-gray-300">
                {image.category} • {new Date(image.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoom('out')
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Zoom out"
              >
                <MagnifyingGlassMinusIcon className="h-5 w-5" />
              </button>
              
              <span className="text-sm text-gray-300 min-w-[4rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoom('in')
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Zoom in"
              >
                <MagnifyingGlassPlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {isInfoVisible && (
            <m.div
              className="absolute right-4 top-20 bottom-20 w-80 bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-white overflow-y-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {image.description}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span>{image.category}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span>{new Date(image.date).toLocaleDateString()}</span>
                  </div>
                  
                  {image.photographer && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Photographer:</span>
                      <span>{image.photographer}</span>
                    </div>
                  )}
                </div>
                
                {image.tags && image.tags.length > 0 && (
                  <div>
                    <span className="text-gray-400 text-sm mb-2 block">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/10 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-400">
          <div>ESC: Close • ←→: Navigate • I: Info • +/-: Zoom • 0: Reset</div>
        </div>
      </m.div>
    </AnimatePresence>
  )
}

export default EnhancedPhotoSwipeLightbox