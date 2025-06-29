import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, Users, ChevronDown } from 'lucide-react'
import { Card, CardContent, Button, Text, Heading } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'
import { getContactPhone } from '@/lib/cms-content'
import type { Venue } from './VenueCard'

interface VenueEnquiryFormProps {
  /**
   * Available venues for selection
   */
  venues: Venue[]
  
  /**
   * Pre-selected venue ID
   */
  selectedVenueId?: string
  
  /**
   * Form submission handler
   */
  onSubmit?: (data: VenueEnquiryData) => Promise<void>
  
  /**
   * Form title
   */
  title?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export interface VenueEnquiryData {
  name: string
  email: string
  phone: string
  venueId: string
  eventDate: string
  expectedGuests: number
  eventDetails: string
}

/**
 * VenueEnquiryForm component for venue booking enquiries
 * 
 * @example
 * <VenueEnquiryForm
 *   venues={venueList}
 *   selectedVenueId="parish-hall"
 *   onSubmit={handleEnquiry}
 *   title="Quick Enquiry"
 * />
 */
export default function VenueEnquiryForm({
  venues,
  selectedVenueId,
  onSubmit,
  title = "Quick Enquiry",
  className
}: VenueEnquiryFormProps) {
  const reducedMotion = prefersReducedMotion()
  
  const [formData, setFormData] = useState<VenueEnquiryData>({
    name: '',
    email: '',
    phone: '',
    venueId: selectedVenueId || '',
    eventDate: '',
    expectedGuests: 0,
    eventDetails: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof VenueEnquiryData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VenueEnquiryData, string>> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    
    if (!formData.venueId) {
      newErrors.venueId = 'Please select a venue'
    }
    
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required'
    }
    
    if (formData.expectedGuests <= 0) {
      newErrors.expectedGuests = 'Number of guests is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (!onSubmit) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        venueId: selectedVenueId || '',
        eventDate: '',
        expectedGuests: 0,
        eventDetails: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Enquiry submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof VenueEnquiryData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="lg" className="bg-white">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Header */}
            <div>
              <Heading level="h3" className="text-2xl font-semibold mb-2">
                {title}
              </Heading>
              <Text color="muted">
                Tell us about your event and we'll get back to you within 24 hours
              </Text>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors",
                    errors.name ? "border-red-300" : "border-gray-300"
                  )}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <Text size="sm" className="text-red-600 mt-1">
                    {errors.name}
                  </Text>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors",
                    errors.email ? "border-red-300" : "border-gray-300"
                  )}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <Text size="sm" className="text-red-600 mt-1">
                    {errors.email}
                  </Text>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors",
                  errors.phone ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Your phone number"
              />
              {errors.phone && (
                <Text size="sm" className="text-red-600 mt-1">
                  {errors.phone}
                </Text>
              )}
            </div>

            {/* Venue Selection */}
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-slate-900 mb-2">
                Select Venue *
              </label>
              <div className="relative">
                <select
                  id="venue"
                  value={formData.venueId}
                  onChange={(e) => handleInputChange('venueId', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white transition-colors",
                    errors.venueId ? "border-red-300" : "border-gray-300"
                  )}
                >
                  <option value="">Choose a venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name} - {venue.capacity}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.venueId && (
                <Text size="sm" className="text-red-600 mt-1">
                  {errors.venueId}
                </Text>
              )}
            </div>

            {/* Event Date and Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-slate-900 mb-2">
                  Event Date *
                </label>
                <input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors",
                    errors.eventDate ? "border-red-300" : "border-gray-300"
                  )}
                />
                {errors.eventDate && (
                  <Text size="sm" className="text-red-600 mt-1">
                    {errors.eventDate}
                  </Text>
                )}
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-slate-900 mb-2">
                  Expected Guests *
                </label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.expectedGuests || ''}
                  onChange={(e) => handleInputChange('expectedGuests', parseInt(e.target.value) || 0)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors",
                    errors.expectedGuests ? "border-red-300" : "border-gray-300"
                  )}
                  placeholder="Number of guests"
                />
                {errors.expectedGuests && (
                  <Text size="sm" className="text-red-600 mt-1">
                    {errors.expectedGuests}
                  </Text>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-slate-900 mb-2">
                Tell us about your event
              </label>
              <textarea
                id="details"
                rows={4}
                value={formData.eventDetails}
                onChange={(e) => handleInputChange('eventDetails', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                placeholder="Please describe your event, any special requirements, equipment needed, etc."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              leftIcon={<Mail className="h-5 w-5" />}
              className="w-full justify-center"
            >
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </Button>

            {/* Contact Info */}
            <div className="text-center border-t border-gray-200 pt-4">
              <Text size="sm" color="muted">
                Or call us directly on{' '}
                <a href={`tel:${getContactPhone().replace(/\s/g, '')}`} className="text-gold-600 hover:text-gold-700 font-medium">
                  {getContactPhone()}
                </a>
              </Text>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}