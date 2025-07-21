import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

// CVA for payment status following 2025 standards
const statusVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      status: {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
        refunded: 'bg-gray-100 text-gray-800'
      }
    },
    defaultVariants: {
      status: 'pending'
    }
  }
)

interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'bank' | 'digital' | 'cash'
  logo: string
  processingFee: number
  estimatedTime: string
  available: boolean
  popular?: boolean
}

interface BookingDetails {
  venueId: string
  venueName: string
  date: string
  duration: number
  basePrice: number
  additionalServices: Array<{
    name: string
    price: number
  }>
  discount?: {
    type: string
    amount: number
  }
}

interface PaymentIntegrationPreviewProps {
  booking?: BookingDetails
  showDemo?: boolean
  reducedMotion?: boolean
  className?: string
}

// Mock payment methods
const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    type: 'card',
    logo: '💳',
    processingFee: 2.9,
    estimatedTime: 'Instant',
    available: true,
    popular: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'digital',
    logo: '🅿️',
    processingFee: 3.4,
    estimatedTime: 'Instant',
    available: true
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    type: 'bank',
    logo: '🏦',
    processingFee: 0,
    estimatedTime: '1-3 business days',
    available: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    type: 'digital',
    logo: '🍎',
    processingFee: 2.9,
    estimatedTime: 'Instant',
    available: true
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    type: 'digital',
    logo: '🟢',
    processingFee: 2.9,
    estimatedTime: 'Instant',
    available: true
  },
  {
    id: 'cash',
    name: 'Cash (In Person)',
    type: 'cash',
    logo: '💷',
    processingFee: 0,
    estimatedTime: 'On booking day',
    available: true
  }
]

// Mock booking data
const mockBooking: BookingDetails = {
  venueId: 'parish-hall',
  venueName: 'Parish Hall',
  date: '2025-02-15',
  duration: 4,
  basePrice: 200,
  additionalServices: [
    { name: 'Audio/Visual Equipment', price: 50 },
    { name: 'Setup/Cleanup Service', price: 75 }
  ],
  discount: {
    type: 'Parish Member Discount',
    amount: 25
  }
}

export const PaymentIntegrationPreview: React.FC<PaymentIntegrationPreviewProps> = ({
  booking = mockBooking,
  showDemo = true,
  reducedMotion = false,
  className = ''
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'processing' | 'complete'>('method')
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending')
  const [securityVerified, setSecurityVerified] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      // reducedMotion prop takes precedence
    }
  }, [])

  // Calculate total price
  const subtotal = booking.basePrice + booking.additionalServices.reduce((sum, service) => sum + service.price, 0)
  const discountAmount = booking.discount?.amount || 0
  const totalBeforeFees = subtotal - discountAmount
  const processingFee = selectedPaymentMethod ? (totalBeforeFees * selectedPaymentMethod.processingFee) / 100 : 0
  const finalTotal = totalBeforeFees + processingFee

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
    setPaymentStep('details')
  }

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) return
    
    setPaymentStep('processing')
    setPaymentStatus('processing')
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('completed')
      setPaymentStep('complete')
      setSecurityVerified(true)
    }, 3000)
  }

  const resetPayment = () => {
    setSelectedPaymentMethod(null)
    setPaymentStep('method')
    setPaymentStatus('pending')
    setSecurityVerified(false)
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
              Payment Integration Preview
            </h3>
            <p className="text-gray-600">
              Secure, integrated payment processing for venue bookings
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              SSL Secured
            </span>
          </div>
        </div>

        {showDemo && (
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <div className="font-semibold mb-1">Demo Mode</div>
                <div>
                  This is a preview of our payment integration. No actual payments will be processed.
                </div>
              </div>
            </div>
          </div>
        )}
      </m.div>

      {/* Booking Summary */}
      <m.div
        className="p-8 bg-gray-50 border-b border-gray-200"
        variants={itemVariants}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-4">
          Booking Summary
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{booking.venueName}</span>
            <span className="font-medium">£{booking.basePrice}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{new Date(booking.date).toLocaleDateString('en-GB')} • {booking.duration} hours</span>
          </div>

          {booking.additionalServices.map((service) => (
            <div key={service.name} className="flex justify-between text-sm">
              <span className="text-gray-600">{service.name}</span>
              <span>£{service.price}</span>
            </div>
          ))}

          {booking.discount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>{booking.discount.type}</span>
              <span>-£{booking.discount.amount}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>£{totalBeforeFees}</span>
            </div>
            
            {selectedPaymentMethod && processingFee > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing fee ({selectedPaymentMethod.processingFee}%)</span>
                <span>£{processingFee.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-semibold text-slate-900 mt-2">
              <span>Total</span>
              <span>£{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </m.div>

      {/* Payment Steps */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Payment Method Selection */}
          {paymentStep === 'method' && (
            <m.div
              key="method-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
            >
              <h4 className="text-lg font-semibold text-slate-900 mb-6">
                Choose Payment Method
              </h4>

              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method)}
                    disabled={!method.available}
                    className={cn(
                      'p-4 border-2 rounded-xl text-left transition-all duration-200',
                      method.available
                        ? 'border-gray-200 hover:border-gold-300 hover:bg-gold-50'
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{method.logo}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">
                              {method.name}
                            </span>
                            {method.popular && (
                              <span className="px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded-full font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {method.processingFee > 0 ? `${method.processingFee}% fee` : 'No fees'} • {method.estimatedTime}
                          </div>
                        </div>
                      </div>

                      {method.type === 'digital' && (
                        <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {/* Step 2: Payment Details */}
          {paymentStep === 'details' && selectedPaymentMethod && (
            <m.div
              key="payment-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-slate-900">
                  Payment Details
                </h4>
                <button
                  onClick={() => setPaymentStep('method')}
                  className="text-gold-600 hover:text-gold-700 text-sm font-medium"
                >
                  Change method
                </button>
              </div>

              {/* Selected Method Display */}
              <div className="p-4 bg-gold-50 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedPaymentMethod.logo}</span>
                  <div>
                    <div className="font-medium text-slate-900">
                      {selectedPaymentMethod.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Processing time: {selectedPaymentMethod.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Payment Form */}
              {selectedPaymentMethod.type === 'card' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                        disabled={showDemo}
                      />
                      <CreditCardIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                        disabled={showDemo}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                        disabled={showDemo}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Features */}
              <div className="p-4 bg-green-50 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <LockClosedIcon className="h-5 w-5 text-green-600" />
                  <div className="text-sm">
                    <div className="font-semibold text-green-800">
                      Your payment is secure
                    </div>
                    <div className="text-green-700">
                      256-bit SSL encryption • PCI DSS compliant • No card details stored
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePaymentSubmit}
                className="w-full py-4 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-semibold text-lg"
              >
                Pay £{finalTotal.toFixed(2)}
              </button>
            </m.div>
          )}

          {/* Step 3: Processing */}
          {paymentStep === 'processing' && (
            <m.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
              className="text-center py-12"
            >
              <m.div
                className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center"
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={reducedMotion ? {} : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <ArrowPathIcon className="h-8 w-8 text-blue-600" />
              </m.div>

              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Processing Payment
              </h4>
              <p className="text-gray-600">
                Please wait while we securely process your payment...
              </p>

              <div className={statusVariants({ status: 'processing' })}>
                <ClockIcon className="h-4 w-4" />
                Processing
              </div>
            </m.div>
          )}

          {/* Step 4: Complete */}
          {paymentStep === 'complete' && (
            <m.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.3 }}
              className="text-center py-12"
            >
              <m.div
                className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                animate={reducedMotion ? {} : {
                  scale: [1, 1.1, 1],
                }}
                transition={reducedMotion ? {} : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </m.div>

              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Payment Successful!
              </h4>
              <p className="text-gray-600 mb-6">
                Your booking has been confirmed. You'll receive an email confirmation shortly.
              </p>

              <div className={statusVariants({ status: 'completed' })}>
                <CheckCircleIcon className="h-4 w-4" />
                Payment Completed
              </div>

              {showDemo && (
                <button
                  onClick={resetPayment}
                  className="mt-6 px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Try Again
                </button>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  )
}

export default PaymentIntegrationPreview