import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Shield, ChevronDown } from 'lucide-react'
import { Card, CardContent, Button, Text, Heading, Flex, Grid } from '@/components/ui'
import { cn, prefersReducedMotion } from '@/lib/utils'

interface DonationFormProps {
  /**
   * Form title
   */
  title?: string
  
  /**
   * Available donation amounts
   */
  amounts?: number[]
  
  /**
   * Available causes/designations
   */
  causes?: Array<{
    value: string
    label: string
    description?: string
  }>
  
  /**
   * Default donation amount
   */
  defaultAmount?: number
  
  /**
   * Form submission handler
   */
  onSubmit?: (data: DonationFormData) => Promise<void>
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export interface DonationFormData {
  amount: number
  type: 'one-time' | 'monthly'
  designation: string
  giftAid: boolean
  email?: string
  name?: string
}

const defaultAmounts = [10, 20, 50, 100, 250, 500]

const defaultCauses = [
  { value: 'general', label: 'General Parish Fund', description: 'Support daily operations and parish needs' },
  { value: 'building', label: 'Building Maintenance', description: 'Preserve our beautiful church building' },
  { value: 'outreach', label: 'Community Outreach', description: 'Support those in need in our community' },
  { value: 'youth', label: 'Youth Programs', description: 'Fund activities for children and young people' },
  { value: 'music', label: 'Music Ministry', description: 'Support our choir and liturgical music' }
]

/**
 * DonationForm component for online giving
 * 
 * @example
 * <DonationForm
 *   title="Make a Donation"
 *   amounts={[10, 20, 50, 100]}
 *   onSubmit={handleDonation}
 * />
 */
export default function DonationForm({
  title = "Make a Donation Online",
  amounts = defaultAmounts,
  causes = defaultCauses,
  defaultAmount = 20,
  onSubmit,
  className
}: DonationFormProps) {
  const reducedMotion = prefersReducedMotion()
  
  const [formData, setFormData] = useState<DonationFormData>({
    amount: defaultAmount,
    type: 'one-time',
    designation: 'general',
    giftAid: false
  })
  
  const [customAmount, setCustomAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubmit) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Donation submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAmountChange = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }))
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({ ...prev, amount: numValue }))
    }
  }

  const presetAmounts = amounts.slice(0, 6)
  const firstRow = presetAmounts.slice(0, 3)
  const secondRow = presetAmounts.slice(3, 6)

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card variant="default" padding="lg" className="bg-white shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Header */}
            <div className="text-center">
              <Heading level="h3" className="text-2xl font-semibold mb-2">
                {title}
              </Heading>
              <Text color="muted">
                Quick, secure, and convenient online giving
              </Text>
            </div>

            {/* Donation Type */}
            <div className="space-y-3">
              <Text weight="bold" className="text-slate-900">
                Donation Type
              </Text>
              <Grid cols={2} gap="sm">
                <Button
                  type="button"
                  variant={formData.type === 'one-time' ? 'primary' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, type: 'one-time' }))}
                  className="justify-center"
                >
                  One-time
                </Button>
                <Button
                  type="button"
                  variant={formData.type === 'monthly' ? 'primary' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, type: 'monthly' }))}
                  className="justify-center"
                >
                  Monthly
                </Button>
              </Grid>
            </div>

            {/* Amount Selection */}
            <div className="space-y-3">
              <Text weight="bold" className="text-slate-900">
                Donation Amount
              </Text>
              
              {/* First row of amounts */}
              <Grid cols={3} gap="sm">
                {firstRow.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount && !customAmount ? 'primary' : 'outline'}
                    onClick={() => handleAmountChange(amount)}
                    className="justify-center"
                  >
                    £{amount}
                  </Button>
                ))}
              </Grid>
              
              {/* Second row of amounts */}
              <Grid cols={3} gap="sm">
                {secondRow.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount && !customAmount ? 'primary' : 'outline'}
                    onClick={() => handleAmountChange(amount)}
                    className="justify-center"
                  >
                    £{amount}
                  </Button>
                ))}
              </Grid>
              
              {/* Custom amount input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  £
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  placeholder="Other amount"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="space-y-3">
              <Text weight="bold" className="text-slate-900">
                Designation (Optional)
              </Text>
              <div className="relative">
                <select 
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white transition-colors"
                >
                  {causes.map((cause) => (
                    <option key={cause.value} value={cause.value}>
                      {cause.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Additional Details Toggle */}
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="text-slate-900 p-0 h-auto font-normal"
                rightIcon={<ChevronDown className={cn("h-4 w-4 transition-transform", showDetails && "rotate-180")} />}
              >
                Additional Details (Optional)
              </Button>
            </div>

            {/* Additional Details Form */}
            {showDetails && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 0.3 }}
                className="space-y-4 border-t border-gray-200 pt-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                {/* Gift Aid */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="giftAid"
                    checked={formData.giftAid}
                    onChange={(e) => setFormData(prev => ({ ...prev, giftAid: e.target.checked }))}
                    className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="giftAid" className="text-sm font-medium text-slate-900 cursor-pointer">
                      I am a UK taxpayer and would like Gift Aid to be reclaimed
                    </label>
                    <Text size="sm" color="muted" className="mt-1">
                      This increases your donation by 25% at no extra cost to you
                    </Text>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || formData.amount <= 0}
              leftIcon={<CreditCard className="h-5 w-5" />}
              className="w-full justify-center"
            >
              {isSubmitting ? 'Processing...' : 
                `Donate £${formData.amount}${formData.type === 'monthly' ? ' Monthly' : ''}`
              }
            </Button>

            {/* Security Notice */}
            <Flex align="center" justify="center" gap="sm" className="text-gray-600">
              <Shield className="h-4 w-4" />
              <Text size="sm">
                Secure payment processing powered by Stripe
              </Text>
            </Flex>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}