import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon,
  ShareIcon,
  HeartIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { Button, Text, Heading, Badge } from '@/components/ui'
import { useChurchStore } from '@/stores/churchStore'
import { useCreateEventMutation, useUpdateEventMutation } from '@/hooks/useData'

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    endTime?: string
    location: string
    category: string
    registrationRequired: boolean
    attendees?: number
    maxAttendees?: number
    image?: string
    price?: number
    organizer?: string
    tags?: string[]
  }
  variant?: 'default' | 'compact' | 'featured' | 'list'
  showActions?: boolean
  showRegistration?: boolean
  onRegister?: (eventId: string) => void
  className?: string
}

const categoryColors = {
  'Liturgical': 'blue',
  'Social': 'green', 
  'Educational': 'purple',
  'Sacraments': 'amber',
  'Youth': 'pink',
  'Charity': 'red',
  'Music': 'indigo',
  'Prayer': 'emerald'
} as const

const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = 'default',
  showActions = true,
  showRegistration = true,
  onRegister,
  className = ''
}) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  
  const addNotification = useChurchStore((state: any) => state.actions.addNotification)
  const reducedMotion = useChurchStore((state: any) => state.ui.reducedMotion)
  
  // Format date and time
  const eventDate = new Date(event.date)
  const isUpcoming = eventDate >= new Date()
  const isPast = eventDate < new Date()
  const isToday = eventDate.toDateString() === new Date().toDateString()
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  const formatTime = (time: string) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  // Calculate availability
  const spotsRemaining = event.maxAttendees ? event.maxAttendees - (event.attendees || 0) : null
  const isFullyBooked = spotsRemaining === 0
  const isAlmostFull = spotsRemaining && spotsRemaining <= 5

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: reducedMotion ? 0.2 : 0.5,
        ease: 'easeOut'
      }
    },
    hover: reducedMotion ? {} : {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  const imageVariants = {
    hover: reducedMotion ? {} : {
      scale: 1.1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const actionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: reducedMotion ? 0.1 : 0.2,
        ease: 'easeOut'
      }
    }
  }

  // Handlers
  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    addNotification({
      type: 'success',
      message: isFavorited ? 'Removed from favorites' : 'Added to favorites',
      dismissible: true
    })
  }

  const handleRegister = async () => {
    if (isFullyBooked || isPast) return
    
    setIsRegistering(true)
    try {
      if (onRegister) {
        await onRegister(event.id)
      }
      addNotification({
        type: 'success',
        message: 'Successfully registered for event',
        dismissible: true
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to register for event',
        dismissible: true
      })
    } finally {
      setIsRegistering(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      addNotification({
        type: 'success',
        message: 'Link copied to clipboard',
        dismissible: true
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to copy link',
        dismissible: true
      })
    }
    setShowShareMenu(false)
  }

  // Render variants
  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true }}
        className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <Heading level="h4" className="text-sm font-semibold text-gray-900 truncate">
                  {event.title}
                </Heading>
                <Text size="xs" className="text-gray-500 mt-1">
                  {formatDate(eventDate)} • {formatTime(event.time)}
                </Text>
              </div>
              <Badge variant={categoryColors[event.category as keyof typeof categoryColors] || 'blue'} size="sm">
                {event.category}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Heading level="h3" className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </Heading>
                    <Text className="text-gray-600 mt-1 line-clamp-2">
                      {event.description}
                    </Text>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {formatDate(eventDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {formatTime(event.time)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={categoryColors[event.category as keyof typeof categoryColors] || 'blue'}>
                      {event.category}
                    </Badge>
                    {showActions && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleFavorite}
                          className="p-2"
                        >
                          {isFavorited ? (
                            <HeartIcon className="h-4 w-4 text-red-500" />
                          ) : (
                            <HeartOutline className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleShare}
                          className="p-2"
                        >
                          <ShareIcon className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}
    >
      {/* Event Image */}
      {event.image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            variants={imageVariants}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              variants={actionVariants}
              initial="hidden"
              whileInView="visible"
              onClick={handleFavorite}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              {isFavorited ? (
                <HeartIcon className="h-4 w-4 text-red-500" />
              ) : (
                <HeartOutline className="h-4 w-4 text-gray-600" />
              )}
            </motion.button>
            
            <div className="relative">
              <motion.button
                variants={actionVariants}
                initial="hidden"
                whileInView="visible"
                onClick={handleShare}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ShareIcon className="h-4 w-4 text-gray-600" />
              </motion.button>
              
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[120px] z-10"
                  >
                    <button
                      onClick={() => copyToClipboard(window.location.href)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      Copy Link
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {isToday && (
              <Badge variant="red" className="bg-red-500 text-white">
                Today
              </Badge>
            )}
            {isFullyBooked && (
              <Badge variant="gray" className="bg-gray-500 text-white">
                Full
              </Badge>
            )}
            {isAlmostFull && !isFullyBooked && (
              <Badge variant="amber" className="bg-amber-500 text-white">
                {spotsRemaining} spots left
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={categoryColors[event.category as keyof typeof categoryColors] || 'blue'}>
                {event.category}
              </Badge>
              {event.price && (
                <Badge variant="green" className="bg-green-100 text-green-800">
                  £{event.price}
                </Badge>
              )}
            </div>
            <Heading level="h3" className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {event.title}
            </Heading>
          </div>
        </div>
        
        {/* Description */}
        <Text className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </Text>
        
        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDaysIcon className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{formatDate(eventDate)}</span>
            {isToday && <span className="text-red-500 font-semibold">(Today)</span>}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 text-green-500" />
            <span>
              {formatTime(event.time)}
              {event.endTime && ` - ${formatTime(event.endTime)}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 text-purple-500" />
            <span>{event.location}</span>
          </div>
          
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <UserGroupIcon className="h-4 w-4 text-amber-500" />
              <span>
                {event.attendees || 0} / {event.maxAttendees} registered
              </span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-3">
            {showRegistration && event.registrationRequired && isUpcoming && (
              <Button
                onClick={handleRegister}
                disabled={isFullyBooked || isRegistering}
                variant={isFullyBooked ? "secondary" : "primary"}
                size="sm"
                className="flex-1"
              >
                {isRegistering ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : isFullyBooked ? (
                  <>
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Fully Booked
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Register
                  </>
                )}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="px-4"
            >
              Learn More
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default EventCard