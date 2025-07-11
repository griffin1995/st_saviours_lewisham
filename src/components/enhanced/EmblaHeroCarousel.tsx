import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/solid'

interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  cta?: {
    text: string
    action: () => void
  }
  overlay?: 'light' | 'medium' | 'dark'
}

interface EmblaHeroCarouselProps {
  slides: HeroSlide[]
  options?: EmblaOptionsType
  autoPlay?: boolean
  autoPlayDelay?: number
  reducedMotion?: boolean
  className?: string
  onSlideChange?: (index: number) => void
}

const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    image: '/images/pexels-pixabay-208216.jpg',
    title: 'Welcome to St Saviour\'s',
    subtitle: 'A Place of Faith, Hope & Community',
    description: 'Join our vibrant Catholic community where faith meets fellowship. All are welcome in God\'s house.',
    overlay: 'medium'
  },
  {
    id: '2',
    image: '/images/pexels-jibarofoto-2014775.jpg',
    title: 'Sunday Mass',
    subtitle: 'Worship with Us',
    description: 'Experience the beauty of the Mass in our historic church. Multiple service times available.',
    overlay: 'medium'
  },
  {
    id: '3',
    image: '/images/st_saviours_interior_1939_archive_photo.jpeg',
    title: 'Rich History',
    subtitle: 'Over 150 Years of Faith',
    description: 'Discover the heritage and traditions that make St Saviour\'s a cornerstone of our community.',
    overlay: 'dark'
  }
]

export const EmblaHeroCarousel: React.FC<EmblaHeroCarouselProps> = ({
  slides = defaultSlides,
  options = { loop: true },
  autoPlay = true,
  autoPlayDelay = 5000,
  reducedMotion = false,
  className = '',
  onSlideChange
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const autoplayPlugin = useCallback(() => {
    return Autoplay({
      delay: autoPlayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: autoPlay && !reducedMotion
    })
  }, [autoPlayDelay, autoPlay, reducedMotion])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      duration: reducedMotion ? 0 : 30
    },
    reducedMotion ? [] : [autoplayPlugin(), Fade()]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const toggleAutoplay = useCallback(() => {
    const autoplayInstance = emblaApi?.plugins()?.autoplay
    if (!autoplayInstance) return

    if (isPlaying) {
      autoplayInstance.stop()
    } else {
      autoplayInstance.play()
    }
    setIsPlaying(!isPlaying)
  }, [emblaApi, isPlaying])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setCurrentIndex(index)
    if (onSlideChange) onSlideChange(index)
  }, [emblaApi, onSlideChange])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image()
      img.onload = () => {
        setLoadedImages(prev => {
          const newSet = new Set(prev)
          newSet.add(slide.image)
          return newSet
        })
      }
      img.src = slide.image
    })
  }, [slides])

  const getOverlayClass = (overlay: string = 'medium') => {
    switch (overlay) {
      case 'light':
        return 'bg-black/20'
      case 'medium':
        return 'bg-black/40'
      case 'dark':
        return 'bg-black/60'
      default:
        return 'bg-black/40'
    }
  }

  const buttonVariants = {
    hover: reducedMotion ? {} : { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' },
    tap: reducedMotion ? {} : { scale: 0.9 }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.8,
        staggerChildren: reducedMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.6 }
    }
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Embla viewport */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide relative h-full flex-shrink-0 flex-grow-0 basis-full"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages.has(slide.image) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Overlay */}
                <div className={`absolute inset-0 ${getOverlayClass(slide.overlay)}`} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <AnimatePresence mode="wait">
                    {currentIndex === index && (
                      <motion.div
                        key={slide.id}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="text-white"
                      >
                        <motion.h2
                          variants={itemVariants}
                          className="text-lg sm:text-xl md:text-2xl font-light text-gold-300 mb-4"
                        >
                          {slide.subtitle}
                        </motion.h2>
                        
                        <motion.h1
                          variants={itemVariants}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.p
                          variants={itemVariants}
                          className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed mb-8 max-w-3xl mx-auto"
                        >
                          {slide.description}
                        </motion.p>

                        {slide.cta && (
                          <motion.div
                            variants={itemVariants}
                            className="flex justify-center"
                          >
                            <motion.button
                              onClick={slide.cta.action}
                              className="bg-gold-600 hover:bg-gold-500 text-black font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-lg shadow-lg"
                              whileHover={reducedMotion ? {} : { scale: 1.05 }}
                              whileTap={reducedMotion ? {} : { scale: 0.95 }}
                            >
                              {slide.cta.text}
                            </motion.button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-20">
        <motion.button
          onClick={scrollPrev}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-20">
        <motion.button
          onClick={scrollNext}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Dots pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gold-400 scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      {autoPlay && !reducedMotion && (
        <div className="absolute bottom-8 right-8 z-20">
          <motion.button
            onClick={toggleAutoplay}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6 text-white" />
            ) : (
              <PlayIcon className="h-6 w-6 text-white" />
            )}
          </motion.button>
        </div>
      )}

      {/* Loading indicator */}
      {loadedImages.size < slides.length && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-30">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmblaHeroCarousel