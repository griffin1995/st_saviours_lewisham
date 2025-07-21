import React, { useState, useEffect, useMemo } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import { 
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  UsersIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  ClockIcon,
  WifiIcon,
  SpeakerWaveIcon,
  CameraIcon,
  BuildingOfficeIcon,
  StarIcon,
  ArrowsRightLeftIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

// CVA for comparison features following 2025 standards
const featureVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm',
  {
    variants: {
      available: {
        true: 'bg-green-100 text-green-800',
        false: 'bg-gray-100 text-gray-500'
      }
    },
    defaultVariants: {
      available: true
    }
  }
)

interface VenueFeatures {
  wifi: boolean
  audioSystem: boolean
  kitchen: boolean
  parking: boolean
  accessibility: boolean
  airConditioning: boolean
  projector: boolean
  stage: boolean
}

interface VenueComparison {
  id: string
  name: string
  description: string
  capacity: {
    seated: number
    standing: number
  }
  area: string
  image: string
  features: VenueFeatures
  pricing: {
    hourly: number
    halfDay: number
    fullDay: number
  }
  location: string
  rating: number
  reviewCount: number
  suitableFor: string[]
  availability: 'high' | 'medium' | 'low'
}

interface VenueComparisonToolProps {
  venues?: VenueComparison[]
  maxComparisons?: number
  reducedMotion?: boolean
  className?: string
}

// Mock venue data for comparison
const mockVenues: VenueComparison[] = [
  {
    id: 'parish-hall',
    name: 'Parish Hall',
    description: 'Our main celebration space with high ceilings and beautiful natural lighting',
    capacity: { seated: 120, standing: 150 },
    area: '200 sqm',
    image: '/images/st_saviours_interior_1939_archive_photo.jpeg',
    features: {
      wifi: true,
      audioSystem: true,
      kitchen: true,
      parking: true,
      accessibility: true,
      airConditioning: false,
      projector: true,
      stage: false
    },
    pricing: { hourly: 50, halfDay: 200, fullDay: 350 },
    location: 'Main Building',
    rating: 4.8,
    reviewCount: 24,
    suitableFor: ['Weddings', 'Receptions', 'Community Events', 'Conferences'],
    availability: 'medium'
  },
  {
    id: 'community-room',
    name: 'Community Room',
    description: 'Intimate space perfect for smaller gatherings and meetings',
    capacity: { seated: 30, standing: 40 },
    area: '60 sqm',
    image: '/images/chapel_st_patrick_st_saviours.jpeg',
    features: {
      wifi: true,
      audioSystem: false,
      kitchen: false,
      parking: true,
      accessibility: true,
      airConditioning: true,
      projector: true,
      stage: false
    },
    pricing: { hourly: 25, halfDay: 100, fullDay: 180 },
    location: 'Ground Floor',
    rating: 4.6,
    reviewCount: 18,
    suitableFor: ['Meetings', 'Small Celebrations', 'Classes', 'Workshops'],
    availability: 'high'
  },
  {
    id: 'church-hall',
    name: 'Church Hall',
    description: 'Large multi-purpose space with stage and professional audio equipment',
    capacity: { seated: 150, standing: 200 },
    area: '300 sqm',
    image: '/images/st_saviours_frontage_war_memorial.jpeg',
    features: {
      wifi: true,
      audioSystem: true,
      kitchen: true,
      parking: true,
      accessibility: true,
      airConditioning: false,
      projector: true,
      stage: true
    },
    pricing: { hourly: 60, halfDay: 250, fullDay: 450 },
    location: 'Adjacent Building',
    rating: 4.9,
    reviewCount: 31,
    suitableFor: ['Concerts', 'Large Events', 'Performances', 'Exhibitions'],
    availability: 'low'
  }
]

export const VenueComparisonTool: React.FC<VenueComparisonToolProps> = ({
  venues = mockVenues,
  maxComparisons = 3,
  reducedMotion = false,
  className = ''
}) => {
  const [selectedVenues, setSelectedVenues] = useState<VenueComparison[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [sortBy, setSortBy] = useState<'capacity' | 'price' | 'rating'>('capacity')

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      // reducedMotion prop takes precedence
    }
  }, [])

  const addToComparison = (venue: VenueComparison) => {
    if (selectedVenues.length < maxComparisons && !selectedVenues.find(v => v.id === venue.id)) {
      setSelectedVenues(prev => [...prev, venue])
    }
  }

  const removeFromComparison = (venueId: string) => {
    setSelectedVenues(prev => prev.filter(v => v.id !== venueId))
  }

  const clearComparison = () => {
    setSelectedVenues([])
    setCompareMode(false)
  }

  // Sorted venues for selection
  const sortedVenues = useMemo(() => {
    return [...venues].sort((a, b) => {
      switch (sortBy) {
        case 'capacity':
          return b.capacity.seated - a.capacity.seated
        case 'price':
          return a.pricing.hourly - b.pricing.hourly
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }, [venues, sortBy])

  const getFeatureIcon = (feature: keyof VenueFeatures) => {
    const iconMap: Record<keyof VenueFeatures, React.ElementType> = {
      wifi: WifiIcon,
      audioSystem: SpeakerWaveIcon,
      kitchen: BuildingOfficeIcon,
      parking: MapPinIcon,
      accessibility: UsersIcon,
      airConditioning: BuildingOfficeIcon,
      projector: CameraIcon,
      stage: BuildingOfficeIcon
    }
    const IconComponent = iconMap[feature]
    return <IconComponent className="h-4 w-4" />
  }

  const getFeatureLabel = (feature: keyof VenueFeatures) => {
    const labelMap: Record<keyof VenueFeatures, string> = {
      wifi: 'WiFi',
      audioSystem: 'Audio System',
      kitchen: 'Kitchen Access',
      parking: 'Parking',
      accessibility: 'Wheelchair Access',
      airConditioning: 'Air Conditioning',
      projector: 'Projector',
      stage: 'Stage/Platform'
    }
    return labelMap[feature]
  }

  const getAvailabilityColor = (availability: VenueComparison['availability']) => {
    switch (availability) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-orange-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  return (
    <m.div
      className={cn('bg-white rounded-3xl shadow-xl overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <m.div
        className="p-8 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
              Venue Comparison Tool
            </h3>
            <p className="text-gray-600">
              Compare features, pricing, and availability to find the perfect venue
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="capacity">Capacity</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Selected Venues Summary */}
        {selectedVenues.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-gold-50 rounded-xl">
            <div className="flex items-center gap-3">
              <ArrowsRightLeftIcon className="h-5 w-5 text-gold-600" />
              <span className="font-medium text-gold-900">
                {selectedVenues.length} venue{selectedVenues.length !== 1 ? 's' : ''} selected for comparison
              </span>
            </div>
            <div className="flex gap-2">
              {selectedVenues.length >= 2 && (
                <button
                  onClick={() => setCompareMode(true)}
                  className="px-4 py-2 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-semibold"
                >
                  Compare Now
                </button>
              )}
              <button
                onClick={clearComparison}
                className="px-4 py-2 border border-gold-300 text-gold-700 rounded-xl hover:bg-gold-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </m.div>

      {/* Comparison View */}
      <AnimatePresence mode="wait">
        {compareMode ? (
          <m.div
            key="comparison"
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
          >
            {/* Back Button */}
            <button
              onClick={() => setCompareMode(false)}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowsRightLeftIcon className="h-4 w-4 rotate-180" />
              Back to venue selection
            </button>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 border-b-2 border-gray-200">
                      Features
                    </td>
                    {selectedVenues.map((venue) => (
                      <td key={venue.id} className="p-4 border-b-2 border-gray-200">
                        <div className="text-center">
                          <div className="relative w-20 h-20 mx-auto mb-3 rounded-xl overflow-hidden">
                            <Image
                              src={venue.image}
                              alt={venue.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="font-semibold text-slate-900">{venue.name}</div>
                          <div className="text-sm text-gray-600">{venue.location}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Capacity Row */}
                  <tr>
                    <td className="p-4 font-medium text-gray-700 border-b border-gray-100">
                      Capacity
                    </td>
                    {selectedVenues.map((venue) => (
                      <td key={venue.id} className="p-4 text-center border-b border-gray-100">
                        <div className="text-slate-900 font-semibold">
                          {venue.capacity.seated} seated
                        </div>
                        <div className="text-sm text-gray-600">
                          {venue.capacity.standing} standing
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Pricing Row */}
                  <tr>
                    <td className="p-4 font-medium text-gray-700 border-b border-gray-100">
                      Pricing
                    </td>
                    {selectedVenues.map((venue) => (
                      <td key={venue.id} className="p-4 text-center border-b border-gray-100">
                        <div className="space-y-1 text-sm">
                          <div>£{venue.pricing.hourly}/hour</div>
                          <div>£{venue.pricing.halfDay}/half day</div>
                          <div>£{venue.pricing.fullDay}/full day</div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr>
                    <td className="p-4 font-medium text-gray-700 border-b border-gray-100">
                      Rating
                    </td>
                    {selectedVenues.map((venue) => (
                      <td key={venue.id} className="p-4 text-center border-b border-gray-100">
                        <div className="flex items-center justify-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{venue.rating}</span>
                          <span className="text-sm text-gray-600">
                            ({venue.reviewCount})
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features Rows */}
                  {Object.keys(mockVenues[0].features).map((feature) => (
                    <tr key={feature}>
                      <td className="p-4 font-medium text-gray-700 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          {getFeatureIcon(feature as keyof VenueFeatures)}
                          {getFeatureLabel(feature as keyof VenueFeatures)}
                        </div>
                      </td>
                      {selectedVenues.map((venue) => (
                        <td key={venue.id} className="p-4 text-center border-b border-gray-100">
                          {venue.features[feature as keyof VenueFeatures] ? (
                            <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XMarkIcon className="h-5 w-5 text-gray-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {selectedVenues.map((venue) => (
                <button
                  key={venue.id}
                  className="px-6 py-3 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-semibold"
                >
                  Book {venue.name}
                </button>
              ))}
            </div>
          </m.div>
        ) : (
          /* Venue Selection Grid */
          <m.div
            key="selection"
            className="p-8"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVenues.map((venue, index) => {
                const isSelected = selectedVenues.find(v => v.id === venue.id)
                const canAdd = selectedVenues.length < maxComparisons

                return (
                  <m.div
                    key={venue.id}
                    className={cn(
                      'border-2 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer',
                      isSelected
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-gray-200 hover:border-gold-300'
                    )}
                    variants={itemVariants}
                    whileHover={reducedMotion ? {} : { y: -4 }}
                    onClick={() => isSelected ? removeFromComparison(venue.id) : canAdd && addToComparison(venue)}
                  >
                    {/* Image */}
                    <div className="relative aspect-video">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Selection Overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gold-500/20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                            <CheckIcon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Availability Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium bg-white/90',
                          getAvailabilityColor(venue.availability)
                        )}>
                          {venue.availability} availability
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {venue.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {venue.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{venue.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        {venue.description}
                      </p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4 text-gray-500" />
                          <span>{venue.capacity.seated} seated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CurrencyPoundIcon className="h-4 w-4 text-gray-500" />
                          <span>£{venue.pricing.hourly}/hour</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        className={cn(
                          'w-full py-2 rounded-xl font-medium transition-colors',
                          isSelected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : canAdd
                            ? 'bg-gold-600 text-white hover:bg-gold-700'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        )}
                        disabled={!canAdd && !isSelected}
                      >
                        {isSelected ? 'Remove from Comparison' : 
                         canAdd ? 'Add to Compare' : 
                         `Max ${maxComparisons} venues`}
                      </button>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default VenueComparisonTool