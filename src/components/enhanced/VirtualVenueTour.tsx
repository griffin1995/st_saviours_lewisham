import React, { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  EyeIcon,
  CameraIcon,
  MapPinIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import { prefersReducedMotion } from '@/lib/utils'

interface TourPoint {
  id: string
  name: string
  description: string
  position: { x: number; y: number }
  image: string
  audio?: string
  details: string[]
}

interface VenueSpace {
  id: string
  name: string
  description: string
  capacity: string
  features: string[]
  images: string[]
  tourPoints: TourPoint[]
  panorama?: string
}

interface VirtualVenueTourProps {
  venue?: VenueSpace
  autoPlay?: boolean
  reducedMotion?: boolean
  className?: string
}

// Mock venue data
const mockVenueData: VenueSpace = {
  id: 'parish-hall',
  name: 'Parish Hall',
  description: 'Our main venue space perfect for weddings, celebrations, and community events',
  capacity: '120 seated, 150 standing',
  features: ['Full kitchen access', 'Audio/visual equipment', 'Dance floor', 'Parking available'],
  images: [
    '/images/st_saviours_interior_1939_archive_photo.jpeg',
    '/images/chapel_st_patrick_st_saviours.jpeg',
    '/images/st_saviours_frontage_war_memorial.jpeg'
  ],
  tourPoints: [
    {
      id: 'entrance',
      name: 'Main Entrance',
      description: 'Welcome area with reception space',
      position: { x: 25, y: 30 },
      image: '/images/st_saviours_frontage_war_memorial.jpeg',
      details: [
        'Wheelchair accessible entrance',
        'Coat hanging area',
        'Reception desk available'
      ]
    },
    {
      id: 'main-hall',
      name: 'Main Hall Area',
      description: 'Central celebration space with high ceilings',
      position: { x: 50, y: 45 },
      image: '/images/st_saviours_interior_1939_archive_photo.jpeg',
      details: [
        'Capacity for 120 seated guests',
        'Beautiful high ceilings',
        'Natural lighting from large windows',
        'Hardwood flooring suitable for dancing'
      ]
    },
    {
      id: 'altar-area',
      name: 'Altar & Sanctuary',
      description: 'Sacred space for ceremonies',
      position: { x: 75, y: 25 },
      image: '/images/chapel_st_patrick_st_saviours.jpeg',
      details: [
        'Beautiful altar space',
        'Perfect for religious ceremonies',
        'Excellent acoustics',
        'Professional lighting available'
      ]
    }
  ]
}

export const VirtualVenueTour: React.FC<VirtualVenueTourProps> = ({
  venue = mockVenueData,
  autoPlay = false,
  reducedMotion = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedTourPoint, setSelectedTourPoint] = useState<TourPoint | null>(null)
  const [viewMode, setViewMode] = useState<'gallery' | 'interactive' | 'panorama'>('gallery')
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-advance images
  useEffect(() => {
    if (isPlaying && viewMode === 'gallery') {
      const interval = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % venue.images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, venue.images.length, viewMode])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen()
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleTourPointClick = (point: TourPoint) => {
    setSelectedTourPoint(point)
    setViewMode('interactive')
  }

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentImage(prev => (prev + 1) % venue.images.length)
    } else {
      setCurrentImage(prev => (prev - 1 + venue.images.length) % venue.images.length)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  return (
    <m.div
      ref={containerRef}
      className={`bg-white rounded-3xl shadow-xl overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="p-6 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900">
              Virtual Venue Tour
            </h3>
            <p className="text-gray-600 mt-1">
              Explore {venue.name} in 360° detail
            </p>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            {['gallery', 'interactive', 'panorama'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as typeof viewMode)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                {mode === 'gallery' && <CameraIcon className="h-4 w-4" />}
                {mode === 'interactive' && <MapPinIcon className="h-4 w-4" />}
                {mode === 'panorama' && <EyeIcon className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Venue Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="font-semibold text-slate-900">Capacity</div>
            <div className="text-gray-600">{venue.capacity}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="font-semibold text-slate-900">Features</div>
            <div className="text-gray-600">{venue.features.length} amenities</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="font-semibold text-slate-900">Tour Points</div>
            <div className="text-gray-600">{venue.tourPoints.length} locations</div>
          </div>
        </div>
      </m.div>

      {/* Main Tour Area */}
      <m.div
        className="relative aspect-video bg-slate-900"
        variants={itemVariants}
      >
        {/* Gallery View */}
        {viewMode === 'gallery' && (
          <div className="relative w-full h-full">
            <Image
              src={venue.images[currentImage]}
              alt={`${venue.name} - View ${currentImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Image Navigation */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button
                onClick={() => handleImageNavigation('prev')}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                onClick={() => handleImageNavigation('next')}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {venue.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImage
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Interactive View */}
        {viewMode === 'interactive' && (
          <div className="relative w-full h-full">
            <Image
              src={venue.images[0]}
              alt={`${venue.name} Interactive Tour`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Tour Points */}
            {venue.tourPoints.map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${point.position.x}%`,
                  top: `${point.position.y}%`
                }}
                onMouseEnter={() => setShowTooltip(point.id)}
                onMouseLeave={() => setShowTooltip(null)}
                onClick={() => handleTourPointClick(point)}
              >
                <m.div
                  className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={reducedMotion ? {} : {
                    scale: [1, 1.2, 1],
                  }}
                  transition={reducedMotion ? {} : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={reducedMotion ? {} : { scale: 1.3 }}
                >
                  <MapPinIcon className="h-4 w-4" />
                </m.div>

                {/* Tooltip */}
                {showTooltip === point.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                    <div className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                      {point.name}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Panorama View */}
        {viewMode === 'panorama' && (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-800">
            <div className="text-center text-white">
              <EyeIcon className="h-16 w-16 mx-auto mb-4 text-white/60" />
              <h4 className="text-xl font-semibold mb-2">360° Panorama</h4>
              <p className="text-white/80">
                Interactive panoramic view coming soon
              </p>
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-gold-400 transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleMute}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-gold-400 transition-colors"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-5 w-5" />
              ) : (
                <SpeakerWaveIcon className="h-5 w-5" />
              )}
            </button>

            <div className="text-white text-sm">
              {currentImage + 1} / {venue.images.length}
            </div>
          </div>

          <button
            onClick={handleFullscreen}
            className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-gold-400 transition-colors"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </m.div>

      {/* Tour Point Details Modal */}
      <AnimatePresence>
        {selectedTourPoint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <m.div
              className="bg-white rounded-3xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-slate-900">
                  {selectedTourPoint.name}
                </h4>
                <button
                  onClick={() => setSelectedTourPoint(null)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src={selectedTourPoint.image}
                  alt={selectedTourPoint.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <p className="text-gray-600 mb-4">
                {selectedTourPoint.description}
              </p>

              <div className="space-y-2">
                <h5 className="font-semibold text-slate-900">Features:</h5>
                <ul className="space-y-1">
                  {selectedTourPoint.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <InformationCircleIcon className="h-4 w-4 text-gold-500 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        muted={isMuted}
      />
    </m.div>
  )
}

export default VirtualVenueTour