import React, { useState, useRef, useEffect } from 'react'
import { Motion } from '@/lib/motion'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CameraIcon
} from '@heroicons/react/24/solid'

interface VirtualTourStop {
  id: string
  title: string
  description: string
  imageUrl: string
  audioUrl?: string
  hotspots?: Array<{
    x: number
    y: number
    title: string
    description: string
    nextStopId?: string
  }>
}

interface VirtualTourViewerProps {
  stops: VirtualTourStop[]
  autoplay?: boolean
  showAudio?: boolean
  reducedMotion?: boolean
  onComplete?: () => void
}

export const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({
  stops,
  autoplay = false,
  showAudio = true,
  reducedMotion = false,
  onComplete
}) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHotspots, setShowHotspots] = useState(true)
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null)
  const [panoramaRotation, setPanoramaRotation] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const currentStop = stops[currentStopIndex]

  // Auto-advance through stops
  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentStopIndex < stops.length - 1) {
        setCurrentStopIndex(prev => prev + 1)
      } else {
        setIsPlaying(false)
        onComplete?.()
      }
    }, 8000) // 8 seconds per stop

    return () => clearTimeout(timer)
  }, [currentStopIndex, isPlaying, stops.length, onComplete])

  // Audio control
  useEffect(() => {
    if (!audioRef.current || !currentStop.audioUrl) return

    if (isPlaying && !isMuted) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isMuted, currentStopIndex, currentStop.audioUrl])

  // Panorama auto-rotation
  useEffect(() => {
    if (!isPlaying || reducedMotion) return

    const rotationTimer = setInterval(() => {
      setPanoramaRotation(prev => (prev + 0.5) % 360)
    }, 100)

    return () => clearInterval(rotationTimer)
  }, [isPlaying, reducedMotion])

  const goToStop = (index: number) => {
    setCurrentStopIndex(Math.max(0, Math.min(stops.length - 1, index)))
    setSelectedHotspot(null)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      containerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleHotspotClick = (hotspot: any) => {
    setSelectedHotspot(hotspot)
    if (hotspot.nextStopId) {
      const nextIndex = stops.findIndex(stop => stop.id === hotspot.nextStopId)
      if (nextIndex !== -1) {
        goToStop(nextIndex)
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-96 md:h-[500px]'
      }`}
    >
      {/* Main Panorama View */}
      <div className="relative w-full h-full overflow-hidden">
        <Motion.img
          ref={imageRef}
          src={currentStop.imageUrl}
          alt={currentStop.title}
          className="w-full h-full object-cover"
          style={{
            transform: reducedMotion ? 'none' : `translateX(${-panoramaRotation * 2}px)`,
            width: '120%'
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8 }}
        />

        {/* Hotspots */}
        {showHotspots && currentStop.hotspots?.map((hotspot, index) => (
          <Motion.button
            key={index}
            className="absolute w-8 h-8 bg-gold-500 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleHotspotClick(hotspot)}
            whileHover={reducedMotion ? {} : { scale: 1.2 }}
            whileTap={reducedMotion ? {} : { scale: 0.9 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(212, 175, 55, 0.7)',
                '0 0 0 10px rgba(212, 175, 55, 0)',
                '0 0 0 0 rgba(212, 175, 55, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gold-400 rounded-full animate-ping opacity-75" />
          </Motion.button>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <h3 className="font-semibold text-lg">{currentStop.title}</h3>
            <p className="text-sm text-gray-300 max-w-md">{currentStop.description}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className="bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
              title={showHotspots ? 'Hide hotspots' : 'Show hotspots'}
            >
              <CameraIcon className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <ArrowsPointingOutIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-auto">
          <button
            onClick={() => goToStop(currentStopIndex - 1)}
            disabled={currentStopIndex === 0}
            className={`bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors ${
              currentStopIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-auto">
          <button
            onClick={() => goToStop(currentStopIndex + 1)}
            disabled={currentStopIndex === stops.length - 1}
            className={`bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors ${
              currentStopIndex === stops.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          {/* Progress Bar */}
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm">
                {currentStopIndex + 1} of {stops.length}
              </span>
              <div className="flex gap-2">
                {showAudio && currentStop.audioUrl && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-gold-400 transition-colors"
                    title={isMuted ? 'Unmute audio' : 'Mute audio'}
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="h-5 w-5" />
                    ) : (
                      <SpeakerWaveIcon className="h-5 w-5" />
                    )}
                  </button>
                )}
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-gold-400 transition-colors"
                  title={isPlaying ? 'Pause tour' : 'Play tour'}
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5" />
                  ) : (
                    <PlayIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
              <Motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStopIndex + 1) / stops.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Stop Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {stops.map((stop, index) => (
              <button
                key={stop.id}
                onClick={() => goToStop(index)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm transition-colors ${
                  index === currentStopIndex
                    ? 'bg-gold-600 text-white'
                    : 'bg-black/70 text-gray-300 hover:bg-black/80 hover:text-white'
                }`}
              >
                {stop.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotspot Detail Modal */}
      {selectedHotspot && (
        <Motion.div
          className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedHotspot.title}</h3>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedHotspot.description}</p>
            {selectedHotspot.nextStopId && (
              <button
                onClick={() => {
                  const nextIndex = stops.findIndex(stop => stop.id === selectedHotspot.nextStopId)
                  if (nextIndex !== -1) {
                    goToStop(nextIndex)
                    setSelectedHotspot(null)
                  }
                }}
                className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors"
              >
                Go to Next Area
              </button>
            )}
          </Motion.div>
        </Motion.div>
      )}

      {/* Audio Element */}
      {currentStop.audioUrl && (
        <audio
          ref={audioRef}
          src={currentStop.audioUrl}
          loop
          muted={isMuted}
          className="hidden"
        />
      )}
    </div>
  )
}