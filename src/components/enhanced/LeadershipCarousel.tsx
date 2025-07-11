/**
 * Leadership Carousel with Embla Carousel
 * Implements 2025 research recommendations for professional team presentation
 */
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useSpring, animated, config } from '@react-spring/web'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { PhotoSwipeLightbox, EnhancedImage } from './PhotoSwipeLightbox'

interface Leader {
  name: string
  role: string
  description: string
  icon: React.ComponentType<any>
  image: string
}

interface PriestBiography {
  id: number
  name: string
  title: string
  bio: string
  image: string
  ordination: string
  diocese: string
  specialties: string[]
}

interface LeadershipCarouselProps {
  leaders: Leader[]
  priestBiographies?: PriestBiography[]
  autoplay?: boolean
  reducedMotion?: boolean
}

function LeaderCard({ leader, index, reducedMotion }: { 
  leader: Leader
  index: number
  reducedMotion?: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Card hover animation
  const cardSpring = useSpring({
    transform: isHovered && !reducedMotion ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0px)',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(212, 175, 55, 0.25)' 
      : '0 10px 25px rgba(0, 0, 0, 0.1)',
    config: config.wobbly
  })

  // Image hover animation
  const imageSpring = useSpring({
    transform: isHovered && !reducedMotion ? 'scale(1.1)' : 'scale(1)',
    config: config.gentle
  })

  return (
    <animated.div
      style={cardSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="embla__slide flex-shrink-0 w-full"
    >
      <Motion.div
        className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-8 text-center h-full group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {/* Enhanced Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
          <animated.div style={imageSpring} className="w-full h-full">
            <EnhancedImage
              src={leader.image}
              width={300}
              height={300}
              alt={leader.name}
              caption={`${leader.name} - ${leader.role}`}
              className="w-full h-full"
            />
          </animated.div>
          
          {/* Gold ring overlay */}
          <div className="absolute inset-0 border-4 border-gold-700/0 group-hover:border-gold-700/50 rounded-2xl transition-all duration-300" />
        </div>

        {/* Leader Information */}
        <div className="space-y-4">
          <div>
            <h3 className={`${typographyScale.h3} text-white mb-2 group-hover:text-gold-300 transition-colors duration-300`}>
              {leader.name}
            </h3>
            <p className={`${typographyScale.body} text-gold-300 font-semibold mb-4`}>
              {leader.role}
            </p>
          </div>
          
          <p className={`${typographyScale.body} text-gray-100 leading-relaxed`}>
            {leader.description}
          </p>
        </div>

        {/* Decorative icon */}
        <Motion.div
          className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mt-6"
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <leader.icon className="h-6 w-6 text-gold-400" />
        </Motion.div>
      </Motion.div>
    </animated.div>
  )
}

function CarouselButton({ 
  onClick, 
  direction, 
  disabled, 
  reducedMotion 
}: { 
  onClick: () => void
  direction: 'prev' | 'next'
  disabled: boolean
  reducedMotion?: boolean
}) {
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon

  return (
    <Motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-10
        ${direction === 'prev' ? 'left-4' : 'right-4'}
        w-12 h-12 bg-gold-700 hover:bg-gold-600 text-black
        rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center transition-all duration-300
      `}
      whileHover={reducedMotion ? {} : { scale: 1.1 }}
      whileTap={reducedMotion ? {} : { scale: 0.9 }}
    >
      <Icon className="h-6 w-6" />
    </Motion.button>
  )
}

export function LeadershipCarousel({ 
  leaders, 
  priestBiographies = [],
  autoplay = true,
  reducedMotion = false 
}: LeadershipCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false,
      duration: reducedMotion ? 10 : 30
    },
    autoplay && !reducedMotion ? [Autoplay({ delay: 6000, stopOnInteraction: true })] : []
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Prepare images for PhotoSwipe
  const carouselImages = leaders.map(leader => ({
    src: leader.image,
    width: 600,
    height: 600,
    alt: leader.name,
    caption: `${leader.name} - ${leader.role}: ${leader.description}`
  }))

  return (
    <div className="space-y-8">
      {/* Main Carousel */}
      <PhotoSwipeLightbox galleryId="leadership-gallery" images={carouselImages}>
        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {leaders.map((leader, index) => (
                <LeaderCard
                  key={index}
                  leader={leader}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <CarouselButton
            onClick={scrollPrev}
            direction="prev"
            disabled={!canScrollPrev}
            reducedMotion={reducedMotion}
          />
          <CarouselButton
            onClick={scrollNext}
            direction="next"
            disabled={!canScrollNext}
            reducedMotion={reducedMotion}
          />
        </div>
      </PhotoSwipeLightbox>

      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2">
        {leaders.map((_, index) => (
          <Motion.button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === selectedIndex 
                ? 'bg-gold-700 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
            whileHover={reducedMotion ? {} : { scale: 1.2 }}
            whileTap={reducedMotion ? {} : { scale: 0.9 }}
          />
        ))}
      </div>

      {/* Detailed Priest Biographies */}
      {priestBiographies.length > 0 && (
        <div className="mt-16 space-y-8">
          <Motion.h3
            className={`${typographyScale.h2} text-white text-center mb-12`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Detailed Biographies
          </Motion.h3>

          {priestBiographies.map((priest, index) => (
            <Motion.div
              key={priest.id}
              className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-8 group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Priest Photo and Details */}
                <div className="text-center md:text-left">
                  <div className="w-32 h-32 bg-gray-300 rounded-xl mx-auto md:mx-0 mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={priest.image}
                      alt={priest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className={`${typographyScale.h4} text-white mb-2`}>
                    {priest.name}
                  </h4>
                  <p className={`${typographyScale.body} text-gold-300 font-semibold mb-4`}>
                    {priest.title}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className={`${typographyScale.caption} text-gray-300`}>
                      <strong>Ordained:</strong> {priest.ordination}
                    </p>
                    <p className={`${typographyScale.caption} text-gray-300`}>
                      <strong>Diocese:</strong> {priest.diocese}
                    </p>
                  </div>
                </div>

                {/* Biography Content */}
                <div className="md:col-span-2">
                  <p className={`${typographyScale.body} text-gray-100 leading-relaxed mb-6`}>
                    {priest.bio}
                  </p>
                  <div>
                    <p className={`${typographyScale.body} text-white font-semibold mb-3`}>
                      Areas of Ministry:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {priest.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gold-700/20 text-gold-300 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LeadershipCarousel