import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/solid'

interface Testimonial {
  id: string
  name: string
  event: string
  venue: string
  rating: number
  text: string
  date: string
  image?: string
  eventType: 'wedding' | 'birthday' | 'corporate' | 'community' | 'religious'
}

interface AnimatedTestimonialsProps {
  testimonials?: Testimonial[]
  autoPlay?: boolean
  autoPlayDelay?: number
  reducedMotion?: boolean
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Michael Thompson',
    event: 'Wedding Reception',
    venue: 'Parish Hall',
    rating: 5,
    text: 'St Saviour\'s Parish Hall was the perfect venue for our wedding reception. The Victorian architecture provided such a beautiful backdrop, and the staff went above and beyond to help make our day special. The sound system was excellent for speeches and dancing!',
    date: '2024-08-15',
    eventType: 'wedding'
  },
  {
    id: '2',
    name: 'Margaret Williams',
    event: '80th Birthday Celebration',
    venue: 'Community Room',
    rating: 5,
    text: 'We celebrated my mother\'s 80th birthday in the Community Room and it was absolutely perfect. The intimate setting with those beautiful stained glass windows created such a warm atmosphere. The kitchen facilities made catering so much easier.',
    date: '2024-09-22',
    eventType: 'birthday'
  },
  {
    id: '3',
    name: 'James Anderson - Lewisham Rotary Club',
    event: 'Monthly Committee Meeting',
    venue: 'Community Room',
    rating: 5,
    text: 'We\'ve been using the Community Room for our monthly meetings for over a year now. It\'s professional, well-maintained, and the booking process is always smooth. Great value for money and supports a wonderful cause.',
    date: '2024-10-10',
    eventType: 'corporate'
  },
  {
    id: '4',
    name: 'Emma Clarke',
    event: 'Baby Shower',
    venue: 'Parish Hall',
    rating: 5,
    text: 'The Parish Hall was amazing for my baby shower! We had 40 guests and there was plenty of space. The decorations looked fantastic against the hall\'s beautiful features. The staff were so helpful with setup and cleanup.',
    date: '2024-07-30',
    eventType: 'community'
  },
  {
    id: '5',
    name: 'Father David & St Mary\'s Parish',
    event: 'Ecumenical Prayer Service',
    venue: 'Church Garden',
    rating: 5,
    text: 'The Church Garden provided a truly peaceful setting for our ecumenical prayer service. The mature trees and well-maintained grounds created the perfect atmosphere for reflection and worship. A blessed space indeed.',
    date: '2024-06-18',
    eventType: 'religious'
  }
]

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials = defaultTestimonials,
  autoPlay = true,
  autoPlayDelay = 6000,
  reducedMotion = false,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isPlaying || reducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoPlayDelay)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayDelay, testimonials.length, reducedMotion])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'wedding': return 'text-pink-600 bg-pink-100'
      case 'birthday': return 'text-purple-600 bg-purple-100'
      case 'corporate': return 'text-blue-600 bg-blue-100'
      case 'community': return 'text-green-600 bg-green-100'
      case 'religious': return 'text-gold-600 bg-gold-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: reducedMotion ? 0 : 50,
      scale: reducedMotion ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: reducedMotion ? 0.2 : 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: reducedMotion ? 0 : -50,
      scale: reducedMotion ? 1 : 0.95,
      transition: { duration: reducedMotion ? 0.1 : 0.3 }
    }
  }

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'text-gold-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )

  return (
    <m.div
      className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2">What Our Clients Say</h3>
            <p className="text-gray-300">Real experiences from real events</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <div className="w-4 h-4 flex gap-1">
                  <div className="w-1.5 h-4 bg-white rounded"></div>
                  <div className="w-1.5 h-4 bg-white rounded"></div>
                </div>
              ) : (
                <div className="w-4 h-4 border-l-4 border-l-white border-y-2 border-y-transparent border-r-0"></div>
              )}
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gold-500 w-8' 
                  : 'bg-white/30 hover:bg-white/50 w-4'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="relative p-8 min-h-[300px]">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Quote */}
            <div className="relative">
              <ChatBubbleLeftEllipsisIcon className="absolute -top-2 -left-2 h-8 w-8 text-gold-200" />
              <blockquote className="text-lg text-gray-700 leading-relaxed pl-6">
                "{currentTestimonial.text}"
              </blockquote>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(currentTestimonial.eventType)}`}>
                  {currentTestimonial.event}
                </span>
                <span className="text-gray-500 text-sm">at {currentTestimonial.venue}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{currentTestimonial.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDaysIcon className="h-4 w-4" />
                    {new Date(currentTestimonial.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <StarRating rating={currentTestimonial.rating} />
              </div>
            </div>

            {/* Satisfaction Badge */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <HeartIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">
                Verified review from a satisfied client
              </span>
            </div>
          </m.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
            title="Previous testimonial"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
            title="Next testimonial"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-50 px-8 py-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gold-600">98%</div>
            <div className="text-sm text-gray-600">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold-600">250+</div>
            <div className="text-sm text-gray-600">Events Hosted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold-600">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <m.div
            className="absolute top-10 right-10 w-2 h-2 bg-gold-400 rounded-full opacity-30"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <m.div
            className="absolute bottom-20 left-10 w-3 h-3 bg-blue-400 rounded-full opacity-20"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      )}
    </m.div>
  )
}

export default AnimatedTestimonials