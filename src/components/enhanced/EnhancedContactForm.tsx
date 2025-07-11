/**
 * Enhanced Contact Form with React Hook Form
 * Implements 2025 research recommendations for professional form handling
 */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  HeartIcon,
  CalendarDaysIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid'

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  contactReason: z.enum([
    'general',
    'pastoral',
    'mass-intentions',
    'sacraments',
    'emergency',
    'volunteer',
    'events',
    'other'
  ]),
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  preferredContact: z.enum(['email', 'phone', 'inPerson']),
  language: z.enum(['english', 'spanish', 'portuguese']).optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  availability: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'You must agree to our privacy policy')
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface EnhancedContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  reducedMotion?: boolean
}

export function EnhancedContactForm({ onSubmit, reducedMotion = false }: EnhancedContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  })

  const watchedContactReason = watch('contactReason')
  const watchedUrgency = watch('urgency')

  // Form animation
  const formSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 200
  })

  // Success animation
  const successSpring = useSpring({
    opacity: submitSuccess ? 1 : 0,
    scale: submitSuccess ? 1 : 0.8,
    config: config.wobbly
  })

  const contactReasons = [
    { value: 'general', label: 'General Inquiry', icon: InformationCircleIcon, description: 'General questions about our parish' },
    { value: 'pastoral', label: 'Pastoral Care', icon: HeartIcon, description: 'Spiritual guidance and support' },
    { value: 'mass-intentions', label: 'Mass Intentions', icon: CalendarDaysIcon, description: 'Request Mass to be offered' },
    { value: 'sacraments', label: 'Sacraments', icon: CheckCircleIcon, description: 'Baptism, marriage, confirmation' },
    { value: 'emergency', label: 'Emergency', icon: ExclamationTriangleIcon, description: 'Urgent pastoral care needed' },
    { value: 'volunteer', label: 'Volunteering', icon: UserIcon, description: 'Join our parish ministries' },
    { value: 'events', label: 'Events', icon: CalendarDaysIcon, description: 'Parish events and activities' },
    { value: 'other', label: 'Other', icon: ChatBubbleLeftEllipsisIcon, description: 'Something else' }
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-300', description: 'Response within 3-5 days' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', description: 'Response within 1-2 days' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-300', description: 'Response within 24 hours' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800 border-red-300', description: 'Immediate response needed' }
  ]

  const onFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      setSubmitSuccess(true)
      reset()
      setTimeout(() => {
        setSubmitSuccess(false)
        setCurrentStep(1)
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (submitSuccess) {
    return (
      <animated.div style={successSpring} className="text-center py-12">
        <Motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircleIcon className="h-10 w-10 text-white" />
        </Motion.div>
        <h3 className={`${typographyScale.h3} text-slate-900 mb-4`}>
          Message Sent Successfully!
        </h3>
        <p className={`${typographyScale.body} text-gray-600 max-w-md mx-auto`}>
          Thank you for contacting us. We'll get back to you as soon as possible based on the urgency level you selected.
        </p>
      </animated.div>
    )
  }

  return (
    <animated.div ref={ref} style={formSpring} className="space-y-6">
      {/* Form Header */}
      <div className="text-center">
        <h3 className={`${typographyScale.h2} text-slate-900 mb-4`}>
          Send Us a Message
        </h3>
        <p className={`${typographyScale.body} text-gray-600 mb-6`}>
          Complete this form and we'll respond according to your needs and urgency level.
        </p>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                ${currentStep >= step 
                  ? 'bg-gold-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step}
              </div>
              {step < 3 && (
                <div className={`
                  w-12 h-1 mx-2 transition-all duration-300
                  ${currentStep > step ? 'bg-gold-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h4 className={`${typographyScale.h4} text-slate-900 mb-4`}>
              Your Information
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('name')}
                    type="text"
                    className={`
                      w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-300
                      ${errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-gold-500 focus:ring-gold-200'
                      }
                      focus:outline-none focus:ring-2
                    `}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                  Email Address *
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className={`
                      w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-300
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-gold-500 focus:ring-gold-200'
                      }
                      focus:outline-none focus:ring-2
                    `}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                Phone Number (Optional)
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 focus:outline-none transition-all duration-300"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-3 block`}>
                Preferred Contact Method *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'email', label: 'Email', icon: EnvelopeIcon },
                  { value: 'phone', label: 'Phone', icon: PhoneIcon },
                  { value: 'inPerson', label: 'In Person', icon: UserIcon }
                ].map((method) => (
                  <label key={method.value} className="relative cursor-pointer">
                    <input
                      {...register('preferredContact')}
                      type="radio"
                      value={method.value}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gold-300 transition-all duration-300 peer-checked:border-gold-500 peer-checked:bg-gold-50">
                      <method.icon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-700">{method.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Motion.div>
        )}

        {/* Step 2: Inquiry Details */}
        {currentStep === 2 && (
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h4 className={`${typographyScale.h4} text-slate-900 mb-4`}>
              Inquiry Details
            </h4>

            {/* Contact Reason */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-3 block`}>
                Reason for Contact *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {contactReasons.map((reason) => (
                  <label key={reason.value} className="relative cursor-pointer">
                    <input
                      {...register('contactReason')}
                      type="radio"
                      value={reason.value}
                      className="sr-only peer"
                    />
                    <div className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gold-300 transition-all duration-300 peer-checked:border-gold-500 peer-checked:bg-gold-50">
                      <reason.icon className="h-6 w-6 text-gray-600 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{reason.label}</p>
                        <p className="text-sm text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-3 block`}>
                Urgency Level *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {urgencyLevels.map((urgency) => (
                  <label key={urgency.value} className="relative cursor-pointer">
                    <input
                      {...register('urgency')}
                      type="radio"
                      value={urgency.value}
                      className="sr-only peer"
                    />
                    <div className={`
                      p-4 border-2 rounded-xl text-center transition-all duration-300
                      hover:scale-105 peer-checked:scale-105 peer-checked:shadow-lg
                      ${urgency.color} border-current
                    `}>
                      <p className="font-medium">{urgency.label}</p>
                      <p className="text-xs mt-1">{urgency.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Preference */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-3 block`}>
                Language Preference
              </label>
              <select
                {...register('language')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 focus:outline-none transition-all duration-300"
              >
                <option value="">Select language</option>
                <option value="english">English</option>
                <option value="spanish">Español (Spanish)</option>
                <option value="portuguese">Português (Portuguese)</option>
              </select>
            </div>
          </Motion.div>
        )}

        {/* Step 3: Message */}
        {currentStep === 3 && (
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h4 className={`${typographyScale.h4} text-slate-900 mb-4`}>
              Your Message
            </h4>

            {/* Subject */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                Subject *
              </label>
              <input
                {...register('subject')}
                type="text"
                className={`
                  w-full px-4 py-3 border rounded-xl transition-all duration-300
                  ${errors.subject 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-gold-500 focus:ring-gold-200'
                  }
                  focus:outline-none focus:ring-2
                `}
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                Message *
              </label>
              <textarea
                {...register('message')}
                rows={6}
                className={`
                  w-full px-4 py-3 border rounded-xl transition-all duration-300 resize-vertical
                  ${errors.message 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-gold-500 focus:ring-gold-200'
                  }
                  focus:outline-none focus:ring-2
                `}
                placeholder="Please provide details about your inquiry..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className={`${typographyScale.body} text-slate-700 font-medium mb-2 block`}>
                Best Times to Contact You (Optional)
              </label>
              <textarea
                {...register('availability')}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 focus:outline-none transition-all duration-300"
                placeholder="e.g., Weekday mornings, weekends, after 6pm..."
              />
            </div>

            {/* Consent */}
            <div className="flex items-start space-x-3">
              <input
                {...register('consent')}
                type="checkbox"
                className="mt-1 h-4 w-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
              />
              <label className={`${typographyScale.caption} text-gray-700`}>
                I agree to the <a href="/privacy-policy" className="text-gold-600 hover:text-gold-700 underline">privacy policy</a> and 
                consent to my personal data being processed for the purpose of responding to my inquiry. *
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-600 text-sm">{errors.consent.message}</p>
            )}
          </Motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gold-600 text-white rounded-xl font-medium hover:bg-gold-700 transition-all duration-300"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`
                  px-8 py-3 rounded-xl font-medium transition-all duration-300
                  ${isSubmitting || !isValid
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gold-600 text-white hover:bg-gold-700 hover:scale-105'
                  }
                `}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            )}
          </div>
        </div>
      </form>
    </animated.div>
  )
}

export default EnhancedContactForm