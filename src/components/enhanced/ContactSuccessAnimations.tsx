import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  HeartIcon,
  SparklesIcon,
  FaceSmileIcon,
  HandRaisedIcon
} from '@heroicons/react/24/solid'

interface ContactSuccessAnimationsProps {
  isVisible: boolean
  onClose: () => void
  contactMethod: 'form' | 'phone' | 'email' | 'chat'
  contactData?: {
    name?: string
    email?: string
    phone?: string
    message?: string
  }
  reducedMotion?: boolean
}

interface ParticleProps {
  delay: number
  duration: number
  x: number
  y: number
  size: number
  color: string
}

const Particle: React.FC<ParticleProps> = ({ delay, duration, x, y, size, color }) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -50, -100],
      x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
    }}
    transition={{
      duration,
      delay,
      ease: "easeOut"
    }}
  />
)

const FloatingIcon: React.FC<{
  icon: React.ElementType
  delay: number
  color: string
  size: string
}> = ({ icon: Icon, delay, color, size }) => (
  <motion.div
    className={`absolute ${color}`}
    initial={{ 
      opacity: 0, 
      scale: 0,
      rotate: 0,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0.5],
      rotate: [0, 180, 360],
      y: [0, -150],
    }}
    transition={{
      duration: 2,
      delay,
      ease: "easeInOut"
    }}
  >
    <Icon className={size} />
  </motion.div>
)

export const ContactSuccessAnimations: React.FC<ContactSuccessAnimationsProps> = ({
  isVisible,
  onClose,
  contactMethod,
  contactData,
  reducedMotion = false
}) => {
  const [showParticles, setShowParticles] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const getMethodIcon = () => {
    switch (contactMethod) {
      case 'form':
        return EnvelopeIcon
      case 'phone':
        return PhoneIcon
      case 'email':
        return EnvelopeIcon
      case 'chat':
        return FaceSmileIcon
      default:
        return CheckCircleIcon
    }
  }

  const getSuccessMessages = () => {
    switch (contactMethod) {
      case 'form':
        return [
          "Thank you for reaching out!",
          "Your message has been sent successfully.",
          "We'll get back to you within 24 hours.",
          "God bless you!"
        ]
      case 'phone':
        return [
          "Thank you for calling!",
          "We hope you had a great conversation.",
          "Feel free to contact us again anytime.",
          "Peace be with you!"
        ]
      case 'email':
        return [
          "Email sent successfully!",
          "Thank you for your message.",
          "We'll respond as soon as possible.",
          "Blessings to you!"
        ]
      case 'chat':
        return [
          "Great conversation!",
          "Thank you for using our chat service.",
          "We're always here to help.",
          "May God guide you!"
        ]
      default:
        return ["Thank you for contacting us!"]
    }
  }

  const successMessages = getSuccessMessages()
  const MethodIcon = getMethodIcon()

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true)
      const timer = setTimeout(() => {
        setShowParticles(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && successMessages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % successMessages.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isVisible, successMessages.length])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.3 }
    }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: reducedMotion ? 0.2 : 0.6
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  }

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  }

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 1.5,
    x: Math.random() * 400,
    y: Math.random() * 400,
    size: 4 + Math.random() * 8,
    color: ['bg-gold-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][Math.floor(Math.random() * 4)]
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-md mx-4 text-center overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Particles */}
            {showParticles && !reducedMotion && (
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                  <Particle key={particle.id} {...particle} />
                ))}
              </div>
            )}

            {/* Floating Icons */}
            {!reducedMotion && (
              <div className="absolute inset-0 pointer-events-none">
                <FloatingIcon icon={HeartIcon} delay={0.5} color="text-red-400" size="h-6 w-6" />
                <FloatingIcon icon={SparklesIcon} delay={1} color="text-gold-400" size="h-5 w-5" />
                <FloatingIcon icon={HandRaisedIcon} delay={1.5} color="text-blue-400" size="h-6 w-6" />
                <FloatingIcon icon={FaceSmileIcon} delay={2} color="text-green-400" size="h-5 w-5" />
              </div>
            )}

            {/* Success Icon */}
            <div className="relative mb-6">
              <motion.div
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative">
                  <MethodIcon className="h-12 w-12 text-green-400" />
                  {/* Animated checkmark overlay */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        variants={checkmarkVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Pulse rings */}
              {!reducedMotion && (
                <>
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-2 border-green-400/30 rounded-full"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 border-2 border-green-400/20 rounded-full"
                    variants={pulseVariants}
                    animate="pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                </>
              )}
            </div>

            {/* Success Messages */}
            <div className="space-y-4 mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentMessageIndex}
                  className="text-2xl font-semibold text-white"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {successMessages[currentMessageIndex]}
                </motion.h2>
              </AnimatePresence>

              {/* Contact Summary */}
              {contactData && (
                <motion.div
                  className="bg-white/5 rounded-xl p-4 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-sm font-semibold text-white mb-2">Contact Summary</h3>
                  <div className="space-y-1 text-sm text-gray-300">
                    {contactData.name && <p>Name: {contactData.name}</p>}
                    {contactData.email && <p>Email: {contactData.email}</p>}
                    {contactData.phone && <p>Phone: {contactData.phone}</p>}
                    {contactData.message && (
                      <p>Message: {contactData.message.substring(0, 100)}
                        {contactData.message.length > 100 && '...'}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={onClose}
                className="flex-1 bg-gold-600 text-black px-6 py-3 rounded-xl font-medium hover:bg-gold-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={!reducedMotion ? { scale: 1.05 } : {}}
                whileTap={!reducedMotion ? { scale: 0.95 } : {}}
              >
                Close
              </motion.button>
              
              <motion.button
                onClick={() => {
                  // Navigate to relevant page
                  window.location.href = contactMethod === 'form' ? '/contact-us' : '/'
                }}
                className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={!reducedMotion ? { scale: 1.05 } : {}}
                whileTap={!reducedMotion ? { scale: 0.95 } : {}}
              >
                {contactMethod === 'form' ? 'Send Another' : 'Go Home'}
              </motion.button>
            </div>

            {/* Next Steps */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-sm text-gray-400">
                {contactMethod === 'form' && "We'll respond within 24 hours"}
                {contactMethod === 'phone' && "Thank you for calling us today"}
                {contactMethod === 'email' && "Check your email for confirmation"}
                {contactMethod === 'chat' && "Our chat is always available"}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for triggering success animations
export const useContactSuccess = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [contactMethod, setContactMethod] = useState<'form' | 'phone' | 'email' | 'chat'>('form')
  const [contactData, setContactData] = useState<any>(null)

  const showSuccess = (method: 'form' | 'phone' | 'email' | 'chat', data?: any) => {
    setContactMethod(method)
    setContactData(data)
    setIsVisible(true)
  }

  const hideSuccess = () => {
    setIsVisible(false)
    setContactData(null)
  }

  return {
    isVisible,
    contactMethod,
    contactData,
    showSuccess,
    hideSuccess
  }
}

// Mini success toast for quick feedback
export const SuccessToast: React.FC<{
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}> = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-green-100 hover:text-white"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactSuccessAnimations