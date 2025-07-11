import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon as QuoteIcon } from '@heroicons/react/24/outline'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
  date: string
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[]
  autoPlay?: boolean
  interval?: number
  reducedMotion?: boolean
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Santos',
    role: 'Parishioner for 15 years',
    content: 'St Saviour\'s has been my spiritual home for over a decade. The warmth of the community and the depth of spiritual guidance I receive here have transformed my faith journey.',
    rating: 5,
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'James Mitchell',
    role: 'Youth Ministry Leader',
    content: 'Working with the youth at St Saviour\'s has been incredibly rewarding. The parish\'s commitment to nurturing young Catholics is truly inspiring.',
    rating: 5,
    date: '2024-02-03'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'New Parishioner',
    content: 'As someone new to the area, I was welcomed with open arms at St Saviour\'s. The community immediately made me feel at home and supported my spiritual growth.',
    rating: 5,
    date: '2024-03-10'
  },
  {
    id: '4',
    name: 'Robert O\'Connor',
    role: 'Parish Council Member',
    content: 'The leadership and vision at St Saviour\'s creates an environment where faith can flourish. I\'m proud to be part of this vibrant Catholic community.',
    rating: 5,
    date: '2024-01-28'
  },
  {
    id: '5',
    name: 'Grace Okafor',
    role: 'Volunteer Coordinator',
    content: 'The spirit of service at St Saviour\'s is remarkable. Everyone here is eager to help others and live out the Gospel message through action.',
    rating: 5,
    date: '2024-02-14'
  }
]

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials = defaultTestimonials,
  autoPlay = true,
  interval = 5000,
  reducedMotion = false,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay || isHovered || reducedMotion) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isHovered, testimonials.length, reducedMotion])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Animation variants
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

  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  }

  const buttonVariants = {
    hover: reducedMotion ? {} : { scale: 1.1 },
    tap: reducedMotion ? {} : { scale: 0.9 }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <m.div
      className={`relative w-full max-w-4xl mx-auto ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main testimonial display */}
      <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12 min-h-[300px] flex items-center">
        {/* Quote icon */}
        <div className="absolute top-6 left-6 opacity-20">
          <QuoteIcon className="h-12 w-12 text-gold-400" />
        </div>

        {/* Navigation arrows */}
        <m.button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </m.button>

        <m.button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </m.button>

        {/* Testimonial content */}
        <div className="w-full mx-16">
          <AnimatePresence mode="wait" custom={1}>
            <m.div
              key={currentIndex}
              custom={1}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: reducedMotion ? 0.1 : 0.3 },
                scale: { duration: reducedMotion ? 0.1 : 0.3 }
              }}
              className="text-center"
            >
              {/* Rating stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating
                        ? 'text-gold-400'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-lg lg:text-xl text-white font-light leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author info */}
              <div className="flex flex-col items-center">
                {currentTestimonial.image && (
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-gold-400"
                  />
                )}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gold-300 text-sm">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <m.button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gold-400 scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator */}
      {autoPlay && !reducedMotion && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden">
          <m.div
            className="h-full bg-gold-400"
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '0%' : '100%' }}
            transition={{
              duration: interval / 1000,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        </div>
      )}
    </m.div>
  )
}

export default TestimonialsCarousel