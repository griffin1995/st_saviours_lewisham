import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Plyr from 'plyr-react'
import 'plyr/dist/plyr.css'
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface AudioPlayerProps {
  episode: {
    id: number
    title: string
    host: string
    duration: string
    audioUrl: string
    image?: string
  }
  onTimeUpdate?: (currentTime: number, duration: number) => void
  onPlayStateChange?: (isPlaying: boolean) => void
  className?: string
}

export default function AdvancedAudioPlayer({ 
  episode, 
  onTimeUpdate, 
  onPlayStateChange,
  className = '' 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showWaveform, setShowWaveform] = useState(true)
  const [waveformData, setWaveformData] = useState<number[]>([])
  const playerRef = useRef<Plyr | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generate waveform visualization data
  useEffect(() => {
    const generateWaveform = () => {
      const points = 100
      const waveform = Array.from({ length: points }, (_, i) => {
        const progress = i / points
        const amplitude = Math.sin(progress * Math.PI * 8) * 0.5 + 0.5
        const noise = Math.random() * 0.3
        return Math.max(0.1, amplitude + noise) * 100
      })
      setWaveformData(waveform)
    }
    
    generateWaveform()
  }, [episode.id])

  // Plyr configuration
  const plyrOptions = {
    controls: [
      'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'duration', 
      'mute', 'volume', 'settings', 'download'
    ],
    settings: ['speed'],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
    keyboard: { focused: true, global: true },
    tooltips: { controls: true, seek: true },
    captions: { active: true, update: true },
    fullscreen: { enabled: false },
    ratio: null,
    displayDuration: true,
    invertTime: false,
    toggleInvert: true,
    clickToPlay: true,
    hideControls: true,
    resetOnEnd: false,
    disableContextMenu: false
  }

  const handlePlayPause = () => {
    if (playerRef.current) {
      const player = playerRef.current.plyr
      if (player) {
        if (isPlaying) {
          player.pause()
        } else {
          player.play()
        }
      }
    }
  }

  const handleSkip = (seconds: number) => {
    if (playerRef.current) {
      const player = playerRef.current.plyr
      if (player) {
        player.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (playerRef.current) {
      const player = playerRef.current.plyr
      if (player) {
        player.volume = newVolume
      }
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (playerRef.current) {
      const player = playerRef.current.plyr
      if (player) {
        player.muted = !isMuted
      }
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleWaveformClick = (index: number) => {
    const clickPosition = index / waveformData.length
    const newTime = clickPosition * duration
    if (playerRef.current) {
      const player = playerRef.current.plyr
      if (player) {
        player.currentTime = newTime
      }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Player Card */}
      <Card variant="default" padding="lg" className="bg-slate-900 border border-slate-700">
        <CardContent>
          <div className="space-y-6">
            {/* Episode Info */}
            <div className="flex items-start gap-4">
              {episode.image && (
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800">
                    <img 
                      src={episode.image} 
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
              <div className="flex-1 min-w-0">
                <Heading level="h3" color="white" className="text-lg font-semibold truncate">
                  {episode.title}
                </Heading>
                <Text size="sm" className="text-gray-400">
                  Hosted by {episode.host}
                </Text>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-gray-400">
                    <ClockIcon className="h-4 w-4" />
                    <Text size="sm">{episode.duration}</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`transition-colors ${
                        isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <HeartIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`transition-colors ${
                        isBookmarked ? 'text-gold-400' : 'text-gray-400 hover:text-gold-400'
                      }`}
                    >
                      <BookmarkIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <ShareIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <AnimatePresence>
              {showWaveform && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-end justify-center gap-0.5 h-16 bg-slate-800 rounded-lg p-2 cursor-pointer">
                    {waveformData.map((height, index) => {
                      const progress = currentTime / duration
                      const isPlayed = index / waveformData.length <= progress
                      return (
                        <motion.div
                          key={index}
                          className={`w-1 rounded-full transition-colors ${
                            isPlayed 
                              ? 'bg-gradient-to-t from-gold-500 to-gold-400' 
                              : 'bg-slate-600 hover:bg-slate-500'
                          }`}
                          style={{ height: `${height}%` }}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleWaveformClick(index)}
                          animate={isPlaying && isPlayed ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Skip Backward */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSkip(-15)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Skip backward 15 seconds"
                >
                  <BackwardIcon className="h-6 w-6" />
                </motion.button>

                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-slate-900 hover:bg-gold-400 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6" />
                  ) : (
                    <PlayIcon className="h-6 w-6 ml-0.5" />
                  )}
                </motion.button>

                {/* Skip Forward */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSkip(30)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Skip forward 30 seconds"
                >
                  <ForwardIcon className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Time Display */}
              <div className="flex items-center gap-2 text-gray-400">
                <Text size="sm">{formatTime(currentTime)}</Text>
                <Text size="sm">/</Text>
                <Text size="sm">{formatTime(duration)}</Text>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMuteToggle}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="h-5 w-5" />
                  ) : (
                    <SpeakerWaveIcon className="h-5 w-5" />
                  )}
                </motion.button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Volume control"
                />
              </div>
            </div>

            {/* Hidden Plyr Player */}
            <div className="hidden">
              <Plyr
                ref={playerRef}
                source={{
                  type: 'audio',
                  sources: [{ src: episode.audioUrl, type: 'audio/mp3' }]
                }}
                options={plyrOptions}
                onReady={(player) => {
                  audioRef.current = player.media as HTMLAudioElement
                  setDuration(player.duration || 0)
                }}
                onPlay={() => {
                  setIsPlaying(true)
                  onPlayStateChange?.(true)
                }}
                onPause={() => {
                  setIsPlaying(false)
                  onPlayStateChange?.(false)
                }}
                onTimeUpdate={(event) => {
                  const time = (event.target as HTMLAudioElement).currentTime
                  setCurrentTime(time)
                  onTimeUpdate?.(time, duration)
                }}
                onLoadedMetadata={(event) => {
                  const dur = (event.target as HTMLAudioElement).duration
                  setDuration(dur)
                }}
              />
            </div>

            {/* Playback Speed and Settings */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Text className="text-gray-400">Speed:</Text>
                <select
                  value={playbackRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value)
                    setPlaybackRate(rate)
                    if (playerRef.current) {
                      const player = playerRef.current.plyr
                      if (player) {
                        player.speed = rate
                      }
                    }
                  }}
                  className="bg-slate-700 text-white rounded px-2 py-1 text-sm border border-slate-600 focus:border-gold-500 focus:outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={1.75}>1.75x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWaveform(!showWaveform)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                <span className="ml-1 text-xs">Waveform</span>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}