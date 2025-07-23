import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon
} from '@heroicons/react/24/solid'

interface LiveStreamingDashboardProps {
  isLive: boolean
  streamUrl?: string
  viewerCount: number
  streamTitle: string
  streamDescription: string
  nextStreamTime?: string
  reducedMotion?: boolean
  className?: string
}

interface StreamMetrics {
  viewers: number
  likes: number
  comments: number
  shares: number
  duration: string
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  isAdmin?: boolean
}

export const LiveStreamingDashboard: React.FC<LiveStreamingDashboardProps> = ({
  isLive = false,
  streamUrl,
  viewerCount = 0,
  streamTitle = "Sunday Mass",
  streamDescription = "Join us for our weekly celebration of the Eucharist",
  nextStreamTime,
  reducedMotion = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [metrics, setMetrics] = useState<StreamMetrics>({
    viewers: viewerCount,
    likes: 0,
    comments: 0,
    shares: 0,
    duration: '00:00'
  })
  const [currentTime, setCurrentTime] = useState(new Date())

  // Simulate live metrics updates
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 3) - 1,
          likes: prev.likes + Math.floor(Math.random() * 2)
        }))
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample chat messages
  useEffect(() => {
    if (isLive) {
      const sampleMessages: ChatMessage[] = [
        {
          id: '1',
          user: 'Mary O\'Connor',
          message: 'Good morning everyone! Blessed Sunday to all.',
          timestamp: new Date(Date.now() - 300000),
          isAdmin: false
        },
        {
          id: '2',
          user: 'Parish Admin',
          message: 'Welcome to our Sunday Mass. Please remember our community in your prayers.',
          timestamp: new Date(Date.now() - 240000),
          isAdmin: true
        },
        {
          id: '3',
          user: 'James Wilson',
          message: 'Beautiful music today! Thank you to our choir.',
          timestamp: new Date(Date.now() - 180000),
          isAdmin: false
        },
        {
          id: '4',
          user: 'Sarah Thompson',
          message: 'Praying for all those who cannot be with us in person today.',
          timestamp: new Date(Date.now() - 120000),
          isAdmin: false
        }
      ]
      setChatMessages(sampleMessages)
    }
  }, [isLive])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleLike = () => {
    setMetrics(prev => ({ ...prev, likes: prev.likes + 1 }))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: streamTitle,
          text: streamDescription,
          url: window.location.href
        })
        setMetrics(prev => ({ ...prev, shares: prev.shares + 1 }))
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: newMessage,
        timestamp: new Date(),
        isAdmin: false
      }
      setChatMessages(prev => [...prev, message])
      setNewMessage('')
      setMetrics(prev => ({ ...prev, comments: prev.comments + 1 }))
    }
  }

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <m.div
      className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Stream Player */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Live Badge */}
        {isLive && (
          <m.div
            className="absolute top-4 left-4 z-10"
            variants={!reducedMotion ? pulseVariants : {}}
            animate={!reducedMotion && isLive ? "pulse" : ""}
          >
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              LIVE
            </div>
          </m.div>
        )}

        {/* Viewer Count */}
        <m.div
          className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{formatViewerCount(metrics.viewers)} watching</span>
          </div>
        </m.div>

        {/* Live Stream Embed */}
        <div className="absolute inset-0">
          {isLive || streamUrl ? (
            <iframe
              src={streamUrl || "https://mcn.live/Camera/st-saviour%E2%80%99s-church-london"}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media; camera; microphone"
              title="St Saviour's Church Live Stream"
              style={{ border: 'none' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <TvIcon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stream Offline</h3>
                {nextStreamTime && (
                  <p className="text-gray-300">Next stream: {nextStreamTime}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Player Controls */}
        {isLive && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex items-center justify-between bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5" />
                  ) : (
                    <PlayIcon className="h-5 w-5 ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={handleMute}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="h-5 w-5" />
                  ) : (
                    <SpeakerWaveIcon className="h-5 w-5" />
                  )}
                </button>

                <span className="text-white text-sm">
                  {metrics.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stream Info and Controls */}
      <div className="p-6">
        <m.div
          className="space-y-4"
          variants={itemVariants}
        >
          {/* Stream Title and Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {streamTitle}
            </h2>
            <p className="text-gray-600">
              {streamDescription}
            </p>
          </div>

          {/* Engagement Metrics */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <HeartIcon className="h-5 w-5" />
                <span>{metrics.likes}</span>
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span>{metrics.comments}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
              >
                <ShareIcon className="h-5 w-5" />
                <span>{metrics.shares}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Watch on:</span>
              <DevicePhoneMobileIcon className="h-4 w-4" />
              <ComputerDesktopIcon className="h-4 w-4" />
              <TvIcon className="h-4 w-4" />
            </div>
          </div>

          {/* Live Chat */}
          <AnimatePresence>
            {showChat && (
              <m.div
                className="border-t border-gray-200 pt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-gray-900 mb-3">Live Chat</h3>
                
                {/* Chat Messages */}
                <div className="bg-gray-50 rounded-xl p-4 h-64 overflow-y-auto mb-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${
                          message.isAdmin ? 'text-gold-600' : 'text-gray-900'
                        }`}>
                          {message.user}
                        </span>
                        {message.isAdmin && (
                          <span className="text-xs bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Send a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-gold-600 text-white rounded-full hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </m.div>
  )
}

export default LiveStreamingDashboard