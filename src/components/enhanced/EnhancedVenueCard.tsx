import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  CalendarDaysIcon,
  ClockIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  SparklesIcon
} from '@heroicons/react/24/solid'

interface Venue {
  id: string
  name: string
  description: string
  capacity: string
  area: string
  image: string
  features: string[]
  hourlyRate: string
  halfDayRate: string
  fullDayRate: string
  suitableFor: string[]
}

interface EnhancedVenueCardProps {
  venue: Venue
  imagePosition?: 'left' | 'right'
  onBookClick: (venueId: string) => void
  reducedMotion?: boolean
  featured?: boolean
  className?: string
}

export const EnhancedVenueCard: React.FC<EnhancedVenueCardProps> = ({
  venue,
  imagePosition = 'left',
  onBookClick,
  reducedMotion = false,
  featured = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedRate, setSelectedRate] = useState<'hourly' | 'halfDay' | 'fullDay'>('halfDay')
  const [isLiked, setIsLiked] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const rateOptions = [
    { key: 'hourly', label: 'Per Hour', value: venue.hourlyRate },
    { key: 'halfDay', label: 'Half Day', value: venue.halfDayRate },
    { key: 'fullDay', label: 'Full Day', value: venue.fullDayRate }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const imageVariants = {
    hover: {
      scale: reducedMotion ? 1 : 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const PricingBadge: React.FC<{ option: typeof rateOptions[0], isSelected: boolean }> = ({ option, isSelected }) => (
    <button
      onClick={() => setSelectedRate(option.key as any)}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isSelected
          ? 'bg-gold-600 text-white shadow-lg'
          : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
      }`}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs opacity-75">{option.label}</span>
        <span className="font-bold">{option.value}</span>
      </div>
      {isSelected && (
        <m.div
          className="absolute inset-0 bg-gold-600 rounded-full -z-10"
          layoutId="selectedRate"
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  )

  return (
    <m.div
      className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
        featured ? 'ring-2 ring-gold-500 ring-opacity-50' : ''
      } ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={!reducedMotion ? { y: -4 } : {}}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            Featured
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <HeartIcon className="h-4 w-4" />
        </button>
        <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors">
          <ShareIcon className="h-4 w-4" />
        </button>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 ${imagePosition === 'right' ? 'lg:grid-flow-col-dense' : ''}`}>
        {/* Image Section */}
        <div className={`relative aspect-[4/3] lg:aspect-square overflow-hidden ${imagePosition === 'right' ? 'lg:col-start-2' : ''}`}>
          <m.div variants={imageVariants} animate={isHovered ? 'hover' : 'initial'}>
            <Image
              src={venue.image}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </m.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Capacity & Area Info */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <UsersIcon className="h-4 w-4" />
                <span className="text-sm">{venue.capacity}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <BuildingOfficeIcon className="h-4 w-4" />
                <span className="text-sm">{venue.area}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-between">
          <m.div variants={itemVariants} className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{venue.name}</h3>
              <p className="text-gray-600 leading-relaxed">{venue.description}</p>
            </div>

            {/* Interactive Pricing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CurrencyPoundIcon className="h-5 w-5 text-gold-600" />
                <span className="font-semibold text-gray-900">Pricing Options</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {rateOptions.map((option) => (
                  <PricingBadge
                    key={option.key}
                    option={option}
                    isSelected={selectedRate === option.key}
                  />
                ))}
              </div>
              
              {/* Selected Rate Display */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {rateOptions.find(r => r.key === selectedRate)?.label} Rate:
                  </span>
                  <span className="text-2xl font-bold text-gold-600">
                    {rateOptions.find(r => r.key === selectedRate)?.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Toggle */}
            <div>
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
              >
                <SparklesIcon className="h-4 w-4" />
                {showFeatures ? 'Hide' : 'Show'} Features
              </button>
              
              <AnimatePresence>
                {showFeatures && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {venue.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suitable For Tags */}
            <div>
              <span className="text-sm font-medium text-gray-700 mb-2 block">Perfect for:</span>
              <div className="flex flex-wrap gap-2">
                {venue.suitableFor.slice(0, 3).map((use, index) => (
                  <span
                    key={index}
                    className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {use}
                  </span>
                ))}
                {venue.suitableFor.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    +{venue.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </m.div>

          {/* Action Buttons */}
          <m.div variants={itemVariants} className="pt-6 space-y-3">
            <button
              onClick={() => onBookClick(venue.id)}
              className="w-full bg-gold-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gold-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              Book This Venue
            </button>
            
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Schedule Viewing
            </button>
          </m.div>
        </div>
      </div>

      {/* Animated Background Shapes */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <m.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-gold-200 rounded-full opacity-20"
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <m.div
            className="absolute -bottom-5 -left-5 w-16 h-16 bg-blue-200 rounded-full opacity-20"
            animate={{
              y: [0, 10, 0],
              x: [0, -5, 0],
            }}
            transition={{
              duration: 5,
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

export default EnhancedVenueCard