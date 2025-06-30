import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'
import { Card, CardContent, Heading, Text, Button, Flex } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface ContactFormProps {
  /**
   * Form title
   */
  title?: string
  
  /**
   * Form description
   */
  description?: string
  
  /**
   * Form submission handler
   */
  onSubmit?: (formData: ContactFormData) => Promise<void>
  
  /**
   * Custom success message
   */
  successMessage?: string
  
  /**
   * Available subject options
   */
  subjectOptions?: Array<{ value: string; label: string }>
  
  /**
   * Additional CSS classes
   */
  className?: string
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const defaultSubjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'baptism', label: 'Baptism' },
  { value: 'marriage', label: 'Marriage' },
  { value: 'funeral', label: 'Funeral' },
  { value: 'confession', label: 'Confession' },
  { value: 'volunteer', label: 'Volunteer Opportunities' },
  { value: 'parish-groups', label: 'Parish Groups' },
  { value: 'venue-hire', label: 'Venue Hire' },
  { value: 'other', label: 'Other' }
]

/**
 * ContactForm component for parish contact forms
 * 
 * @example
 * <ContactForm
 *   title="Send Us a Message"
 *   description="We'd love to hear from you"
 *   onSubmit={handleFormSubmit}
 * />
 */
export default function ContactForm({
  title = "Send Us a Message",
  description,
  onSubmit,
  successMessage = "Thank you for your message. We'll get back to you soon!",
  subjectOptions = defaultSubjectOptions,
  className
}: ContactFormProps) {
  const reducedMotion = prefersReducedMotion()
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error state on change
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default behavior - simulate submission
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBaseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors bg-white text-gray-900"
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2"

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
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <Heading level="h2" className="text-3xl font-light">
                {title}
              </Heading>
              {description && (
                <Text color="muted">
                  {description}
                </Text>
              )}
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <Flex align="center" gap="sm">
                  <Check className="h-5 w-5 text-green-600" />
                  <Text color="default" className="text-green-800">
                    {successMessage}
                  </Text>
                </Flex>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <Flex align="center" gap="sm">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <Text color="default" className="text-red-800">
                    {errorMessage}
                  </Text>
                </Flex>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBaseClasses}
                    placeholder="Your full name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBaseClasses}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputBaseClasses}
                    placeholder="Your phone number"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className={labelClasses}>
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputBaseClasses}
                    disabled={isSubmitting}
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClasses}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={inputBaseClasses}
                  placeholder="Tell us how we can help you..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                rightIcon={isSubmitting ? undefined : <Send className="h-5 w-5" />}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * ContactFormData export for external use
 */
export type { ContactFormData }