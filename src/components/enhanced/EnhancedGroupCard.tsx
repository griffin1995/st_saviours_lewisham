import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  ClockIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SparklesIcon,
  CalendarDaysIcon,
  HeartIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { LucideIcon } from 'lucide-react'

interface Group {
  name: string
  icon: LucideIcon
  description: string
  meetingTime: string
  contact: string
  activities: string[]
  openTo: string
  color: 'red' | 'blue' | 'green' | 'purple' | 'pink' | 'amber' | 'indigo' | 'teal'
}

interface EnhancedGroupCardProps {
  group: Group
  index: number
  reducedMotion?: boolean
  className?: string
}

export const EnhancedGroupCard: React.FC<EnhancedGroupCardProps> = ({
  group,
  index,
  reducedMotion = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const colorMap = {
    red: { 
      primary: 'from-red-500 to-red-600',
      secondary: 'bg-red-100 text-red-800',
      icon: 'text-red-600',
      border: 'border-red-200'
    },
    blue: { 
      primary: 'from-blue-500 to-blue-600',
      secondary: 'bg-blue-100 text-blue-800',
      icon: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: { 
      primary: 'from-green-500 to-green-600',
      secondary: 'bg-green-100 text-green-800',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    purple: { 
      primary: 'from-purple-500 to-purple-600',
      secondary: 'bg-purple-100 text-purple-800',
      icon: 'text-purple-600',
      border: 'border-purple-200'
    },
    pink: { 
      primary: 'from-pink-500 to-pink-600',
      secondary: 'bg-pink-100 text-pink-800',
      icon: 'text-pink-600',
      border: 'border-pink-200'
    },
    amber: { 
      primary: 'from-amber-500 to-amber-600',
      secondary: 'bg-amber-100 text-amber-800',
      icon: 'text-amber-600',
      border: 'border-amber-200'
    },
    indigo: { 
      primary: 'from-indigo-500 to-indigo-600',
      secondary: 'bg-indigo-100 text-indigo-800',
      icon: 'text-indigo-600',
      border: 'border-indigo-200'
    },
    teal: { 
      primary: 'from-teal-500 to-teal-600',
      secondary: 'bg-teal-100 text-teal-800',
      icon: 'text-teal-600',
      border: 'border-teal-200'
    }
  }

  const colors = colorMap[group.color]

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 30,
      scale: reducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: reducedMotion ? 0 : -4,
      scale: reducedMotion ? 1 : 1.02,
      transition: { duration: 0.2 }
    }
  }

  const iconVariants = {
    hover: {
      rotate: reducedMotion ? 0 : [0, -10, 10, -5, 5, 0],
      scale: reducedMotion ? 1 : 1.1,
      transition: { duration: 0.6 }
    }
  }

  const handleJoinGroup = () => {
    if (group.contact.includes('@')) {
      window.location.href = `mailto:${group.contact}?subject=Interest in joining ${group.name}`
    } else {
      setShowContact(true)
    }
  }

  return (
    <m.div
      className={`relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={!reducedMotion ? hoverVariants.hover : {}}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${colors.primary}`} />

      {/* Main Content */}
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <m.div
              className={`w-14 h-14 bg-gradient-to-br ${colors.primary} rounded-2xl flex items-center justify-center shadow-lg`}
              variants={iconVariants}
              animate={isHovered ? 'hover' : 'initial'}
            >
              <group.icon className="h-7 w-7 text-white" />
            </m.div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{group.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.secondary}`}>
                  {group.openTo}
                </span>
                {isLiked && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-red-500"
                  >
                    <HeartIcon className="h-4 w-4" />
                  </m.div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:text-red-500'
              }`}
            >
              <HeartIcon className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors`}
            >
              <m.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </m.div>
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">{group.description}</p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ClockIcon className={`h-4 w-4 ${colors.icon}`} />
            <span className="font-medium">Meets:</span>
            <span>{group.meetingTime}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <UserGroupIcon className={`h-4 w-4 ${colors.icon}`} />
            <span className="font-medium">Open to:</span>
            <span>{group.openTo}</span>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t border-gray-100">
                {/* Activities */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4 text-gold-600" />
                    Activities & Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.primary}`} />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`bg-gray-50 rounded-xl p-4 ${colors.border} border`}>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <EnvelopeIcon className="h-4 w-4 text-gold-600" />
                    Get In Touch
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{group.contact}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleJoinGroup}
                      className={`flex-1 bg-gradient-to-r ${colors.primary} text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      Join Group
                    </button>
                    
                    <button
                      onClick={() => setShowContact(true)}
                      className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Quick Action Buttons (when collapsed) */}
        {!isExpanded && (
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleJoinGroup}
              className={`flex-1 bg-gradient-to-r ${colors.primary} text-white py-2 px-4 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <ChevronRightIcon className="h-4 w-4" />
              Join Group
            </button>
            
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Learn More
            </button>
          </div>
        )}
      </div>

      {/* Floating Elements */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <m.div
            className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${colors.primary} opacity-20`}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <m.div
            className={`absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-br ${colors.primary} opacity-10`}
            animate={{
              y: [0, 8, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      )}

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <m.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContact(false)}
          >
            <m.div
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${colors.primary} rounded-2xl flex items-center justify-center mx-auto`}>
                  <group.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p className="text-gray-600">Contact: {group.contact}</p>
                <p className="text-sm text-gray-500">
                  Feel free to get in touch to learn more about joining our group!
                </p>
                <button
                  onClick={() => setShowContact(false)}
                  className="bg-gray-100 text-gray-700 py-2 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default EnhancedGroupCard