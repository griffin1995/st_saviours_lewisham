import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated, useTrail } from '@react-spring/web'
import { Motion } from '@/lib/motion'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid'
import { Button } from '@/components/ui'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  urgency: 'low' | 'medium' | 'high' | 'emergency'
  contactReason: string
  preferredContact: 'email' | 'phone' | 'either'
  message: string
  anonymous?: boolean
  emailNotification?: boolean
}

interface AdvancedContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  reducedMotion?: boolean
}

export const AdvancedContactForm: React.FC<AdvancedContactFormProps> = ({
  onSubmit,
  reducedMotion = false
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    urgency: 'medium',
    contactReason: '',
    preferredContact: 'email',
    message: '',
    anonymous: false,
    emailNotification: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [progress, setProgress] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const steps = [
    { title: 'Basic Information', fields: ['name', 'email', 'phone'] },
    { title: 'Contact Preferences', fields: ['urgency', 'contactReason', 'preferredContact'] },
    { title: 'Your Message', fields: ['message'] },
    { title: 'Review & Submit', fields: [] }
  ]

  // React Spring animations
  const progressSpring = useSpring({
    width: `${(currentStep / (steps.length - 1)) * 100}%`,
    config: { tension: 300, friction: 40 }
  })

  const formSpring = useSpring({
    transform: `translateX(${currentStep * -100}%)`,
    config: { tension: 200, friction: 25 }
  })

  const fieldsTrail = useTrail(steps[currentStep]?.fields.length || 1, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 30 },
    reset: true
  })

  // Validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.length >= 2 ? '' : 'Name must be at least 2 characters'
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address'
      case 'phone':
        return !value || /^[\d\s\+\-\(\)]+$/.test(value) ? '' : 'Please enter a valid phone number'
      case 'message':
        return value.length >= 10 ? '' : 'Message must be at least 10 characters'
      default:
        return ''
    }
  }

  const updateField = (field: keyof ContactFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    const error = validateField(field, value)
    setValidationErrors(prev => ({ ...prev, [field]: error }))
    
    // Update progress
    const totalFields = steps.flatMap(step => step.fields).length
    const completedFields = Object.values(formData).filter(val => val && val !== '').length
    setProgress((completedFields / totalFields) * 100)
  }

  const canProceed = () => {
    const currentFields = steps[currentStep].fields
    return currentFields.every(field => {
      const value = formData[field as keyof ContactFormData]
      return value && value !== '' && !validateField(field, value as string)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactReasons = [
    'General inquiry',
    'Mass times and services',
    'Sacrament preparation',
    'Wedding planning',
    'Funeral arrangements',
    'Baptism information',
    'Parish groups',
    'Volunteer opportunities',
    'Pastoral care',
    'Other'
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', desc: 'Response within 3-5 days', color: 'green' },
    { value: 'medium', label: 'Standard', desc: 'Response within 1-2 days', color: 'blue' },
    { value: 'high', label: 'High Priority', desc: 'Response within 24 hours', color: 'amber' },
    { value: 'emergency', label: 'Emergency', desc: 'Immediate pastoral care needed', color: 'red' }
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-gold-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentStep ? (
                  <CheckCircleIcon className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-0.5 mx-2 ${
                  index < currentStep ? 'bg-gold-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <animated.div 
            style={progressSpring}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </p>
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="relative overflow-hidden">
        <animated.div style={formSpring} className="flex w-full">
          {/* Step 1: Basic Information */}
          <div className="w-full flex-shrink-0 space-y-6">
            {currentStep === 0 && fieldsTrail.map((style, index) => {
              const field = steps[0].fields[index]
              return (
                <animated.div key={field} style={style}>
                  {field === 'name' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <UserIcon className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          validationErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                      )}
                    </div>
                  )}
                  {field === 'email' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <EnvelopeIcon className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          validationErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                        required
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                      )}
                    </div>
                  )}
                  {field === 'phone' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <PhoneIcon className="h-4 w-4 inline mr-2" />
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="020 1234 5678"
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                      )}
                    </div>
                  )}
                </animated.div>
              )
            })}
          </div>

          {/* Step 2: Contact Preferences */}
          <div className="w-full flex-shrink-0 space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <ExclamationTriangleIcon className="h-4 w-4 inline mr-2" />
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {urgencyLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => updateField('urgency', level.value)}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          formData.urgency === level.value
                            ? `border-${level.color}-500 bg-${level.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-medium text-${level.color}-700`}>{level.label}</div>
                        <div className="text-xs text-gray-600">{level.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ChatBubbleLeftIcon className="h-4 w-4 inline mr-2" />
                    Reason for Contact
                  </label>
                  <select
                    value={formData.contactReason}
                    onChange={(e) => updateField('contactReason', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a reason...</option>
                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'email', label: 'Email', icon: EnvelopeIcon },
                      { value: 'phone', label: 'Phone', icon: PhoneIcon },
                      { value: 'either', label: 'Either', icon: ChatBubbleLeftIcon }
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => updateField('preferredContact', method.value)}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          formData.preferredContact === method.value
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <method.icon className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{method.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Step 3: Message */}
          <div className="w-full flex-shrink-0">
            {currentStep === 2 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={6}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none ${
                    validationErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Please share what you would like to discuss or ask about..."
                  required
                />
                {validationErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                )}
                
                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => updateField('anonymous', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Submit anonymously</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.emailNotification}
                      onChange={(e) => updateField('emailNotification', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Send me email confirmation</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Review */}
          <div className="w-full flex-shrink-0">
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Review Your Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div><strong>Name:</strong> {formData.anonymous ? 'Anonymous' : formData.name}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  {formData.phone && <div><strong>Phone:</strong> {formData.phone}</div>}
                  <div><strong>Urgency:</strong> {urgencyLevels.find(l => l.value === formData.urgency)?.label}</div>
                  <div><strong>Reason:</strong> {formData.contactReason}</div>
                  <div><strong>Preferred Contact:</strong> {formData.preferredContact}</div>
                  <div><strong>Message:</strong></div>
                  <div className="bg-white p-3 rounded border">{formData.message}</div>
                </div>
              </div>
            )}
          </div>
        </animated.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            Previous
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={!canProceed() || isSubmitting}
            className="bg-gold-600 hover:bg-gold-700 text-white"
          >
            {isSubmitting ? (
              <>
                <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : currentStep === steps.length - 1 ? (
              'Submit Message'
            ) : (
              'Next Step'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}