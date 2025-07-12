import React, { useState } from 'react'
import { Motion } from '@/lib/motion'
import { HeartIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardContent } from '@/components/ui'

interface PrayerRequestWidgetProps {
  position?: 'floating' | 'inline'
  theme?: 'reverent' | 'modern' | 'classic'
  autoShow?: boolean
  onClose?: () => void
  features?: {
    categories?: string[]
    anonymous?: boolean
    emailNotification?: boolean
    prayerChain?: boolean
  }
  reducedMotion?: boolean
}

export const PrayerRequestWidget: React.FC<PrayerRequestWidgetProps> = ({
  position = 'floating',
  theme = 'reverent',
  autoShow = false,
  onClose,
  features = {},
  reducedMotion = false
}) => {
  const [isOpen, setIsOpen] = useState(autoShow)
  const [request, setRequest] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(features.anonymous || false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = features.categories || ['Healing', 'Guidance', 'Thanksgiving', 'Peace']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    alert('Prayer request submitted successfully')
    
    // Reset form
    setRequest('')
    setSelectedCategory('')
    setEmail('')
    setIsSubmitting(false)
    setIsOpen(false)
    onClose?.()
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  if (!isOpen && position === 'floating') return null

  const containerClass = position === 'floating' 
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
    : 'w-full'

  return (
    <div className={containerClass}>
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
        className={position === 'floating' ? 'w-full max-w-md mx-4' : 'w-full'}
      >
        <Card className="bg-slate-900/95 backdrop-blur-sm border-gold-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-600/20 rounded-xl flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Prayer Request</h3>
                  <p className="text-gray-300 text-sm">Share your prayer intentions</p>
                </div>
              </div>
              {position === 'floating' && (
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        selectedCategory === category
                          ? 'bg-gold-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prayer Request Text */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Prayer Request
                </label>
                <textarea
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="Please share what you would like us to pray for..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Email (if not anonymous) */}
              {!isAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
              )}

              {/* Options */}
              <div className="space-y-2">
                {features.anonymous && (
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    Submit anonymously
                  </label>
                )}
                {features.prayerChain && (
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" className="rounded" />
                    Include in parish prayer chain
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !request.trim()}
                className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                leftIcon={<PaperAirplaneIcon className="h-4 w-4" />}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
              </Button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Your prayer request will be handled with care and confidentiality
            </p>
          </CardContent>
        </Card>
      </Motion.div>
    </div>
  )
}