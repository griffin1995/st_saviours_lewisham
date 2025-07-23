import React, { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MapIcon,
  BookOpenIcon,
  HeartIcon,
  ArrowPathIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface TourStop {
  id: string
  title: string
  description: string
  image: string
  audioDescription?: string
  spiritualReflection?: string
  historicalNote?: string
  coordinates: { x: number; y: number }
}

interface VirtualChurchTourProps {
  className?: string
}

export default function VirtualChurchTour({ className = '' }: VirtualChurchTourProps) {
  const [currentStop, setCurrentStop] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [tourStarted, setTourStarted] = useState(false)
  const [showReflection, setShowReflection] = useState(false)
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const [progress, setProgress] = useState(0)

  const tourStops: TourStop[] = [
    {
      id: 'entrance',
      title: 'Church Entrance',
      description: 'Welcome to St Saviour\'s Catholic Church. Notice the beautiful stonework and welcoming doors that have greeted worshippers for over a century.',
      image: '/images/church-entrance.jpg',
      audioDescription: 'As you approach our church, you\'ll see the traditional Gothic architecture...',
      spiritualReflection: 'Each time we cross this threshold, we enter into sacred space, leaving the world behind to encounter the divine.',
      historicalNote: 'Built in 1898, these doors have welcomed thousands of faithful through joy and sorrow.',
      coordinates: { x: 50, y: 80 }
    },
    {
      id: 'nave',
      title: 'The Nave',
      description: 'The main worship space where our community gathers for Mass. The wooden pews and soaring ceiling create an atmosphere of reverence and prayer.',
      image: '/images/church-nave.jpg',
      audioDescription: 'The nave stretches before you with seating for 300 worshippers...',
      spiritualReflection: 'In this sacred space, countless prayers have been offered, joys celebrated, and sorrows shared.',
      historicalNote: 'The original pews were crafted by local artisans using oak from the English countryside.',
      coordinates: { x: 50, y: 60 }
    },
    {
      id: 'altar',
      title: 'The Sanctuary',
      description: 'The focal point of our worship, where the Eucharist is celebrated daily. The altar represents the table of the Lord where all are welcome.',
      image: '/images/church-altar.jpg',
      audioDescription: 'The sanctuary rises before you, bathed in natural light from the stained glass...',
      spiritualReflection: 'Here, bread and wine become the Body and Blood of Christ, uniting us with the divine and each other.',
      historicalNote: 'The marble altar was consecrated in 1901 and contains relics of three saints.',
      coordinates: { x: 50, y: 20 }
    },
    {
      id: 'chapel',
      title: 'Side Chapel',
      description: 'A quiet space for personal prayer and reflection. The statue of Our Lady provides comfort and peace to all who visit.',
      image: '/images/side-chapel.jpg',
      audioDescription: 'To your left, you\'ll find our peaceful side chapel dedicated to Our Lady...',
      spiritualReflection: 'In the silence of this chapel, Mary intercedes for all who bring their prayers and petitions.',
      historicalNote: 'This chapel was added in 1923 in thanksgiving for the end of the Great War.',
      coordinates: { x: 20, y: 40 }
    },
    {
      id: 'windows',
      title: 'Stained Glass Windows',
      description: 'Beautiful stained glass windows depicting scenes from the life of Christ and the saints, flooding the church with colorful light.',
      image: '/images/stained-glass.jpg',
      audioDescription: 'Look up to see the magnificent stained glass windows...',
      spiritualReflection: 'Like these windows, we are called to let the light of Christ shine through us into the world.',
      historicalNote: 'Created by renowned artist William Morris in 1905, these windows survived both World Wars.',
      coordinates: { x: 80, y: 30 }
    }
  ]

  useEffect(() => {
    // Initialize PhotoSwipe lightbox
    if (typeof window !== 'undefined') {
      lightboxRef.current = new PhotoSwipeLightbox({
        gallery: '#tour-gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
        bgOpacity: 0.8,
        showHideAnimationType: 'fade'
      })
      lightboxRef.current.init()
    }

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy()
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying && tourStarted) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            nextStop()
            return 0
          }
          return newProgress
        })
      }, 80) // 8 seconds per stop
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, tourStarted])

  const startTour = () => {
    setTourStarted(true)
    setIsPlaying(true)
    setCurrentStop(0)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextStop = () => {
    if (currentStop < tourStops.length - 1) {
      setCurrentStop(currentStop + 1)
      setProgress(0)
    } else {
      setIsPlaying(false)
      setProgress(100)
    }
  }

  const prevStop = () => {
    if (currentStop > 0) {
      setCurrentStop(currentStop - 1)
      setProgress(0)
    }
  }

  const goToStop = (index: number) => {
    setCurrentStop(index)
    setProgress(0)
  }

  const resetTour = () => {
    setCurrentStop(0)
    setProgress(0)
    setIsPlaying(false)
    setTourStarted(false)
    setShowReflection(false)
  }

  const currentStopData = tourStops[currentStop]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tour Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <m.div
            animate={{ rotate: tourStarted ? 360 : 0 }}
            transition={{ duration: 2, repeat: tourStarted ? Infinity : 0, ease: "linear" }}
          >
            <MapIcon className="h-8 w-8 text-gold-400" />
          </m.div>
          <Heading level="h2" color="white" className="text-2xl font-bold">
            Virtual Church Tour
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Experience the sacred beauty of St Saviour's from wherever you are. 
          Follow our guided tour to explore the spiritual and historical significance of our church.
        </Text>
      </m.div>

      {!tourStarted ? (
        /* Start Tour Interface */
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <Card variant="default" padding="xl" className="bg-white/10 backdrop-blur-sm border border-slate-600 max-w-2xl mx-auto">
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tourStops.map((stop, index) => (
                    <m.div
                      key={stop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center space-y-2"
                    >
                      <div className="w-12 h-12 mx-auto bg-gold-500/20 rounded-full flex items-center justify-center">
                        <Text className="text-gold-400 font-bold">{index + 1}</Text>
                      </div>
                      <Text size="sm" className="text-gray-300">{stop.title}</Text>
                    </m.div>
                  ))}
                </div>
                
                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={startTour}
                    leftIcon={<PlayIcon className="h-5 w-5" />}
                    className="bg-gold-500 hover:bg-gold-600 text-slate-900"
                  >
                    Begin Virtual Tour
                  </Button>
                </m.div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      ) : (
        /* Active Tour Interface */
        <div className="space-y-6">
          {/* Progress Bar */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-slate-700 rounded-full h-2"
          >
            <m.div
              className="bg-gold-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStop * 100) + progress) / tourStops.length}%` }}
              transition={{ duration: 0.3 }}
            />
          </m.div>

          {/* Main Tour Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image and Controls */}
            <m.div
              key={currentStop}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Tour Image */}
              <div 
                id="tour-gallery"
                className="relative aspect-video rounded-lg overflow-hidden bg-slate-800"
              >
                <a
                  href={currentStopData.image}
                  data-pswp-width="1200"
                  data-pswp-height="800"
                  className="block w-full h-full"
                >
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <EyeIcon className="h-12 w-12 text-gold-400 mx-auto" />
                      <Text className="text-gray-300">Click to view in gallery</Text>
                    </div>
                  </div>
                </a>
                
                {/* Tour Stop Indicator */}
                <div 
                  className="absolute w-4 h-4 bg-gold-500 rounded-full border-2 border-white shadow-lg"
                  style={{
                    left: `${currentStopData.coordinates.x}%`,
                    top: `${currentStopData.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <m.div
                    className="w-full h-full bg-gold-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <m.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayPause}
                    className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-slate-900 hover:bg-gold-600 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5 ml-0.5" />
                    )}
                  </m.button>
                  
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {audioEnabled ? (
                      <SpeakerWaveIcon className="h-5 w-5" />
                    ) : (
                      <SpeakerXMarkIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Text size="sm" className="text-gray-400">
                    {currentStop + 1} of {tourStops.length}
                  </Text>
                  <button
                    onClick={resetTour}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </m.div>

            {/* Content */}
            <m.div
              key={currentStop}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
                <CardContent>
                  <div className="space-y-4">
                    <Heading level="h3" color="white" className="text-xl font-bold">
                      {currentStopData.title}
                    </Heading>
                    
                    <Text className="text-gray-200">
                      {currentStopData.description}
                    </Text>

                    {currentStopData.historicalNote && (
                      <div className="border-l-4 border-gold-500 pl-4">
                        <Text size="sm" className="text-gold-200 italic">
                          Historical Note: {currentStopData.historicalNote}
                        </Text>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setShowReflection(!showReflection)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <BookOpenIcon className="h-4 w-4" />
                        <Text size="sm">Spiritual Reflection</Text>
                      </m.button>
                      
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gold-500/20 text-gold-300 rounded-lg hover:bg-gold-500/30 transition-colors"
                      >
                        <StarIcon className="h-4 w-4" />
                        <Text size="sm">Bookmark</Text>
                      </m.button>
                    </div>

                    <AnimatePresence>
                      {showReflection && currentStopData.spiritualReflection && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <HeartIcon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <Text size="sm" className="text-purple-200 italic">
                                {currentStopData.spiritualReflection}
                              </Text>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2">
                {tourStops.map((_, index) => (
                  <m.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => goToStop(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentStop
                        ? 'bg-gold-500 scale-125'
                        : index < currentStop
                        ? 'bg-gold-600/60'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </m.div>
          </div>
        </div>
      )}
    </div>
  )
}