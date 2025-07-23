import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  EnvelopeIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/solid'
import { Button, Text, Heading } from '@/components/ui'

// Enhanced validation schema
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .optional(),
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest'),
  frequency: z.enum(['weekly', 'monthly', 'special'], {
    message: 'Please select a frequency preference'
  }),
  consent: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must agree to receive newsletters'
    })
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'sidebar'
  showInterests?: boolean
  className?: string
}

const interestOptions = [
  { id: 'masses', label: 'Mass Times & Services', icon: '⛪' },
  { id: 'events', label: 'Parish Events', icon: '📅' },
  { id: 'sacraments', label: 'Sacrament Information', icon: '✝️' },
  { id: 'community', label: 'Community News', icon: '👥' },
  { id: 'youth', label: 'Youth Ministry', icon: '🌟' },
  { id: 'charity', label: 'Charity & Outreach', icon: '💖' }
]

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  variant = 'default',
  showInterests = true,
  className = ''
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
      frequency: 'monthly'
    },
    mode: 'onChange'
  })

  const watchedInterests = watch('interests')

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        
        // Analytics tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: 'newsletter_form',
            value: 1
          })
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  }

  if (submitStatus === 'success') {
    return (
      <m.div
        variants={successVariants}
        initial="hidden"
        animate="visible"
        className={`text-center space-y-4 p-6 bg-green-50 border border-green-200 rounded-xl ${className}`}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckIcon className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <Heading level="h3" className="text-green-800 mb-2">
            Welcome to Our Community!
          </Heading>
          <Text className="text-green-700">
            Thank you for subscribing. You'll receive a confirmation email shortly.
          </Text>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSubmitStatus('idle')}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          Subscribe Another Email
        </Button>
      </m.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <m.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mx-auto">
            <SparklesIcon className="h-6 w-6 text-gold-600" />
          </div>
          <Heading level="h3" className="text-slate-800">
            Stay Connected
          </Heading>
          <Text size="sm" className="text-gray-600">
            Get the latest news, events, and spiritual reflections from St Saviour's
          </Text>
        </div>

        {/* Email and Name Fields - Side by Side on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`
                  w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200
                  focus:ring-2 focus:ring-gold-500 focus:border-gold-500
                  ${errors.email ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="your@email.com"
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <m.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 text-sm flex items-center gap-1"
                >
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  {errors.email.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>

          {/* First Name Field */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name (Optional)
            </label>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Your first name"
            />
            <AnimatePresence>
              {errors.firstName && (
                <m.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 text-sm"
                >
                  {errors.firstName.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Interests Selection */}
        {showInterests && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              What interests you? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <label
                  key={interest.id}
                  className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${watchedInterests?.includes(interest.id) 
                      ? 'border-gold-500 bg-gold-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    {...register('interests')}
                    type="checkbox"
                    value={interest.id}
                    className="sr-only"
                  />
                  <span className="text-lg mr-3">{interest.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {interest.label}
                  </span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {errors.interests && (
                <m.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 text-sm"
                >
                  {errors.interests.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Frequency Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            How often would you like to hear from us? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: 'weekly', label: 'Weekly', desc: 'Every Sunday' },
              { value: 'monthly', label: 'Monthly', desc: 'Once a month' },
              { value: 'special', label: 'Special Events', desc: 'Major occasions only' }
            ].map((option) => (
              <label
                key={option.value}
                className="flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-200 text-center hover:border-gray-300"
              >
                <input
                  {...register('frequency')}
                  type="radio"
                  value={option.value}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
                <span className="text-xs text-gray-500">{option.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('consent')}
              type="checkbox"
              className="mt-0.5 h-4 w-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
            />
            <span className="text-sm text-gray-600">
              I agree to receive newsletters and communications from St Saviour's Catholic Church. 
              You can unsubscribe at any time.
            </span>
          </label>
          <AnimatePresence>
            {errors.consent && (
              <m.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 text-sm"
              >
                {errors.consent.message}
              </m.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid || isSubmitting}
          className="w-full bg-gold-600 hover:bg-gold-700 text-white"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </div>
          ) : (
            'Join Our Community'
          )}
        </Button>

        {/* Error Message */}
        <AnimatePresence>
          {submitStatus === 'error' && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                <Text size="sm" className="text-red-700">
                  Something went wrong. Please try again later.
                </Text>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.form>
    </AnimatePresence>
  )
}

export default NewsletterForm