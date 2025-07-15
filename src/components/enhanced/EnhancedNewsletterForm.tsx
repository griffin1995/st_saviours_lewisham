/**
 * Enhanced Newsletter Form Component
 * Implements 2025 research recommendations for newsletter subscription
 */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  EnvelopeIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid'
import { Button } from '@/components/ui'

interface NewsletterFormData {
  email: string
  firstName: string
  lastName: string
  preferences: string[]
  frequency: 'weekly' | 'monthly'
  language: 'en' | 'es' | 'pt' | 'pl'
}

interface EnhancedNewsletterFormProps {
  onSubmit: (data: NewsletterFormData) => void
  reducedMotion?: boolean
  className?: string
}

export function EnhancedNewsletterForm({ 
  onSubmit, 
  reducedMotion = false, 
  className = '' 
}: EnhancedNewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<NewsletterFormData>({
    defaultValues: {
      frequency: 'weekly',
      language: 'en',
      preferences: []
    }
  })

  const handleFormSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onSubmit(data)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const preferences = [
    { id: 'parish-news', label: 'Parish News & Updates' },
    { id: 'events', label: 'Upcoming Events' },
    { id: 'spiritual', label: 'Spiritual Reflections' },
    { id: 'youth', label: 'Youth Ministry' },
    { id: 'community', label: 'Community Stories' }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'pl', label: 'Polish' }
  ]

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block ${typographyScale.body} text-white mb-2`}>
              First Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white placeholder-gray-300"
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block ${typographyScale.body} text-white mb-2`}>
              Last Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white placeholder-gray-300"
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={`block ${typographyScale.body} text-white mb-2`}>
            Email Address
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white placeholder-gray-300"
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Preferences */}
        <div>
          <label className={`block ${typographyScale.body} text-white mb-3`}>
            Newsletter Preferences
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {preferences.map((pref) => (
              <label key={pref.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  {...register('preferences')}
                  type="checkbox"
                  value={pref.id}
                  className="h-5 w-5 text-gold-600 focus:ring-gold-500 border-gray-300 rounded bg-white/20"
                />
                <span className={`${typographyScale.body} text-gray-300`}>
                  {pref.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Frequency and Language */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block ${typographyScale.body} text-white mb-2`}>
              Frequency
            </label>
            <select
              {...register('frequency')}
              className="w-full px-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
            >
              <option value="weekly" className="bg-slate-800 text-white">Weekly</option>
              <option value="monthly" className="bg-slate-800 text-white">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className={`block ${typographyScale.body} text-white mb-2`}>
              Language
            </label>
            <select
              {...register('language')}
              className="w-full px-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value} className="bg-slate-800 text-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <m.div
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full bg-gold-600 hover:bg-gold-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </div>
            ) : (
              'Subscribe to Newsletter'
            )}
          </Button>
        </m.div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-600/20 border border-green-600 rounded-lg"
          >
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
            <span className={`${typographyScale.body} text-green-400`}>
              Successfully subscribed! Check your email for confirmation.
            </span>
          </m.div>
        )}

        {submitStatus === 'error' && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-600/20 border border-red-600 rounded-lg"
          >
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            <span className={`${typographyScale.body} text-red-400`}>
              Subscription failed. Please try again later.
            </span>
          </m.div>
        )}
      </form>
    </div>
  )
}

export default EnhancedNewsletterForm