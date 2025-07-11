import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  DownloadIcon,
  TagIcon,
  PhotoIcon,
  EyeIcon
} from '@heroicons/react/24/solid'

interface GalleryImage {
  src: string
  thumbnail: string
  alt: string
  title: string
  description?: string
  category: string
  tags: string[]
  date: string
  photographer?: string
  width: number
  height: number
}

interface EnhancedPhotoSwipeGalleryProps {
  images: GalleryImage[]
  title?: string
  description?: string
  reducedMotion?: boolean
  className?: string
}

const sampleImages: GalleryImage[] = [
  {
    src: '/images/gallery/church-exterior.jpg',
    thumbnail: '/images/gallery/thumbs/church-exterior.jpg',
    alt: 'St Saviour\'s Church exterior',
    title: 'Church Exterior',
    description: 'Beautiful Gothic architecture of St Saviour\'s Catholic Church',
    category: 'Architecture',
    tags: ['exterior', 'gothic', 'architecture'],
    date: '2024-01-15',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  },
  {
    src: '/images/gallery/sunday-mass.jpg',
    thumbnail: '/images/gallery/thumbs/sunday-mass.jpg',
    alt: 'Sunday Mass celebration',
    title: 'Sunday Mass',
    description: 'Our vibrant Sunday morning Mass celebration',
    category: 'Liturgy',
    tags: ['mass', 'liturgy', 'celebration'],
    date: '2024-02-10',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  },
  {
    src: '/images/gallery/baptism-ceremony.jpg',
    thumbnail: '/images/gallery/thumbs/baptism-ceremony.jpg',
    alt: 'Baptism ceremony',
    title: 'Baptism Ceremony',
    description: 'Welcoming new members into our faith community',
    category: 'Sacraments',
    tags: ['baptism', 'sacrament', 'family'],
    date: '2024-03-05',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  },
  {
    src: '/images/gallery/christmas-choir.jpg',
    thumbnail: '/images/gallery/thumbs/christmas-choir.jpg',
    alt: 'Christmas choir performance',
    title: 'Christmas Choir',
    description: 'Our choir\'s beautiful Christmas performance',
    category: 'Events',
    tags: ['choir', 'christmas', 'music'],
    date: '2023-12-24',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  },
  {
    src: '/images/gallery/youth-group.jpg',
    thumbnail: '/images/gallery/thumbs/youth-group.jpg',
    alt: 'Youth group activities',
    title: 'Youth Group',
    description: 'Our active youth ministry in action',
    category: 'Community',
    tags: ['youth', 'community', 'activities'],
    date: '2024-01-20',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  },
  {
    src: '/images/gallery/altar-flowers.jpg',
    thumbnail: '/images/gallery/thumbs/altar-flowers.jpg',
    alt: 'Beautiful altar flowers',
    title: 'Altar Flowers',
    description: 'Stunning floral arrangements for Sunday Mass',
    category: 'Decorations',
    tags: ['flowers', 'altar', 'decoration'],
    date: '2024-02-14',
    photographer: 'Parish Photography Team',
    width: 1200,
    height: 800
  }
]

export const EnhancedPhotoSwipeGallery: React.FC<EnhancedPhotoSwipeGalleryProps> = ({
  images = sampleImages,
  title = "Parish Photo Gallery",
  description = "Capturing the beauty and spirit of our parish community",
  reducedMotion = false,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const [loaded, setLoaded] = useState<Set<number>>(new Set())
  
  const lightboxRef = useRef<HTMLDivElement>(null)

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))]
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null)
          setIsZoomed(false)
          setZoomLevel(1)
          break
        case 'ArrowLeft':
          navigateImage(-1)
          break
        case 'ArrowRight':
          navigateImage(1)
          break
        case 'i':
        case 'I':
          setShowInfo(!showInfo)
          break
        case '+':
        case '=':
          setZoomLevel(prev => Math.min(prev + 0.5, 3))
          break
        case '-':
        case '_':
          setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
          break
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [selectedImage, showInfo])

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return
    
    const currentIndex = filteredImages.findIndex((_, index) => index === selectedImage)
    const newIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length
    setSelectedImage(newIndex)
    setIsZoomed(false)
    setZoomLevel(1)
  }

  const handleImageLoad = (index: number) => {
    setLoaded(prev => new Set(prev).add(index))
  }

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleDownload = (image: GalleryImage) => {
    const link = document.createElement('a')
    link.href = image.src
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: reducedMotion ? 0.2 : 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <PhotoIcon className="h-8 w-8 text-gold-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        variants={itemVariants}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gold-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10"
            variants={itemVariants}
            whileHover={!reducedMotion ? { y: -8 } : {}}
            onClick={() => setSelectedImage(index)}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">View Image</p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-gold-500/90 text-black text-xs font-medium rounded-full">
                  {image.category}
                </span>
              </div>
              
              {/* View Count */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs">
                <EyeIcon className="h-3 w-3" />
                <span>{Math.floor(Math.random() * 500) + 50}</span>
              </div>
            </div>
            
            {/* Image Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">{image.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {image.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TagIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {image.tags.slice(0, 2).join(', ')}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(image.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            ref={lightboxRef}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => {
              if (e.target === lightboxRef.current) {
                setSelectedImage(null)
                setIsZoomed(false)
                setZoomLevel(1)
              }
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedImage(null)
                setIsZoomed(false)
                setZoomLevel(1)
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigateImage(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => navigateImage(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-full max-h-full"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain cursor-zoom-in"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease'
                }}
                onClick={() => {
                  if (zoomLevel === 1) {
                    setZoomLevel(2)
                    setIsZoomed(true)
                  } else {
                    setZoomLevel(1)
                    setIsZoomed(false)
                  }
                }}
              />
            </motion.div>

            {/* Image Info Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {filteredImages[selectedImage].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        Category: {filteredImages[selectedImage].category}
                      </p>
                      <p className="text-sm text-gray-400">
                        Date: {new Date(filteredImages[selectedImage].date).toLocaleDateString()}
                      </p>
                      {filteredImages[selectedImage].photographer && (
                        <p className="text-sm text-gray-400">
                          Photo by: {filteredImages[selectedImage].photographer}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare(filteredImages[selectedImage])}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(filteredImages[selectedImage])}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-3 py-1 bg-black/50 rounded-full text-white text-sm hover:bg-black/70 transition-colors"
              >
                {showInfo ? 'Hide Info' : 'Show Info'}
              </button>
              <div className="px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                {selectedImage + 1} / {filteredImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default EnhancedPhotoSwipeGallery