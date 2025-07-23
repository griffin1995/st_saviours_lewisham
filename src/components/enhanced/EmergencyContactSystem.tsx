/**
 * Emergency Contact System Component
 * Implements 2025 research recommendations for urgent pastoral care
 */
import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { m } from 'framer-motion'
import { typographyScale } from '@/lib/fonts'
import { 
  ExclamationTriangleIcon,
  PhoneIcon,
  ClockIcon,
  HeartIcon,
  UserGroupIcon,
  MapPinIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid'

interface EmergencyContact {
  type: string
  title: string
  description: string
  phone: string
  availability: string
  responseTime: string
  icon: React.ComponentType<any>
  priority: 'immediate' | 'urgent' | 'standard'
}

interface EmergencyContactSystemProps {
  reducedMotion?: boolean
}

export function EmergencyContactSystem({ reducedMotion = false }: EmergencyContactSystemProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const emergencyContacts: EmergencyContact[] = [
    {
      type: 'last-rites',
      title: 'Last Rites / Anointing',
      description: 'Serious illness, end-of-life care, emergency anointing of the sick',
      phone: '020 8852 7411',
      availability: '24/7',
      responseTime: 'Within 30 minutes',
      icon: HeartIcon,
      priority: 'immediate'
    },
    {
      type: 'emergency-baptism',
      title: 'Emergency Baptism',
      description: 'Emergency baptism for newborns or critically ill individuals',
      phone: '020 8852 7411',
      availability: '24/7',
      responseTime: 'Within 1 hour',
      icon: UserGroupIcon,
      priority: 'immediate'
    },
    {
      type: 'pastoral-crisis',
      title: 'Pastoral Crisis Support',
      description: 'Mental health crisis, family emergency, spiritual distress',
      phone: '020 8852 7411',
      availability: '24/7',
      responseTime: 'Within 2 hours',
      icon: ExclamationTriangleIcon,
      priority: 'urgent'
    },
    {
      type: 'hospital-visit',
      title: 'Hospital Visits',
      description: 'Urgent hospital visits for confession, communion, or pastoral care',
      phone: '020 8852 7411',
      availability: 'Daily 8:00 AM - 10:00 PM',
      responseTime: 'Within 4 hours',
      icon: MapPinIcon,
      priority: 'urgent'
    },
    {
      type: 'general-emergency',
      title: 'General Emergency',
      description: 'Other urgent pastoral needs not covered above',
      phone: '020 8852 7411',
      availability: '24/7',
      responseTime: 'Within 6 hours',
      icon: InformationCircleIcon,
      priority: 'standard'
    }
  ]

  // Emergency system animation
  const systemSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 200
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'bg-red-600 text-white border-red-600'
      case 'urgent': return 'bg-orange-600 text-white border-orange-600'
      case 'standard': return 'bg-blue-600 text-white border-blue-600'
      default: return 'bg-gray-600 text-white border-gray-600'
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'bg-red-100 text-red-800'
      case 'urgent': return 'bg-orange-100 text-orange-800'
      case 'standard': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isOfficeHours = () => {
    const hour = currentTime.getHours()
    const day = currentTime.getDay()
    // Monday-Friday 9-17, Saturday 10-14
    return (day >= 1 && day <= 5 && hour >= 9 && hour < 17) || 
           (day === 6 && hour >= 10 && hour < 14)
  }

  return (
    <animated.div ref={ref} style={systemSpring} className="space-y-8">
      {/* Emergency Header */}
      <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className={`${typographyScale.h3} text-red-900 mb-2`}>
              Emergency Pastoral Care
            </h3>
            <p className={`${typographyScale.body} text-red-800 mb-4`}>
              For urgent spiritual needs outside regular office hours, we provide 24/7 emergency pastoral care. 
              Please call our main number and clearly state the nature of your emergency.
            </p>
            
            {/* Current Status */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-red-600" />
                <span className="text-red-800 font-medium">
                  Current time: {currentTime.toLocaleTimeString('en-GB', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${isOfficeHours() 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
                }
              `}>
                {isOfficeHours() ? 'Office Hours' : 'After Hours'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="space-y-4">
        <h4 className={`${typographyScale.h4} text-slate-900 mb-6`}>
          Emergency Contact Categories
        </h4>
        
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <m.div
              key={contact.type}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={reducedMotion ? {} : { scale: 1.02, x: 10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedEmergency(selectedEmergency === contact.type ? null : contact.type)}
            >
              <div className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${getPriorityColor(contact.priority)}
                  `}>
                    <contact.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className={`${typographyScale.h5} text-slate-900 mb-1 group-hover:text-gold-600 transition-colors duration-300`}>
                          {contact.title}
                        </h5>
                        <p className={`${typographyScale.body} text-gray-600 mb-3`}>
                          {contact.description}
                        </p>
                      </div>
                      
                      {/* Priority Badge */}
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                        ${getPriorityBadgeColor(contact.priority)}
                      `}>
                        {contact.priority}
                      </span>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        <span className={`${typographyScale.caption} text-gray-700 font-medium`}>
                          {contact.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                        <span className={`${typographyScale.caption} text-gray-700`}>
                          {contact.availability}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-gray-400" />
                        <span className={`${typographyScale.caption} text-gray-700`}>
                          {contact.responseTime}
                        </span>
                      </div>
                    </div>
                    
                    {/* Expandable Details */}
                    {selectedEmergency === contact.type && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 pt-4 mt-4"
                      >
                        <div className="space-y-4">
                          <div>
                            <h6 className={`${typographyScale.body} text-slate-900 font-medium mb-2`}>
                              What to expect:
                            </h6>
                            <ul className="space-y-1 text-sm text-gray-600">
                              {contact.type === 'last-rites' && (
                                <>
                                  <li>• Call immediately, day or night</li>
                                  <li>• Priest will arrive within 30 minutes</li>
                                  <li>• Anointing of the sick and final prayers</li>
                                  <li>• Family support and guidance</li>
                                </>
                              )}
                              {contact.type === 'emergency-baptism' && (
                                <>
                                  <li>• Available for critically ill infants or adults</li>
                                  <li>• Can be performed at hospital or home</li>
                                  <li>• Family preparation provided if time allows</li>
                                  <li>• Follow-up pastoral care available</li>
                                </>
                              )}
                              {contact.type === 'pastoral-crisis' && (
                                <>
                                  <li>• Immediate spiritual and emotional support</li>
                                  <li>• Crisis intervention and counseling</li>
                                  <li>• Connection to professional resources</li>
                                  <li>• Ongoing pastoral accompaniment</li>
                                </>
                              )}
                              {contact.type === 'hospital-visit' && (
                                <>
                                  <li>• Communion for the sick</li>
                                  <li>• Confession and spiritual counseling</li>
                                  <li>• Family prayer and support</li>
                                  <li>• Coordination with hospital chaplaincy</li>
                                </>
                              )}
                              {contact.type === 'general-emergency' && (
                                <>
                                  <li>• Assessment of urgent need</li>
                                  <li>• Appropriate pastoral response</li>
                                  <li>• Referral to specialized services if needed</li>
                                  <li>• Follow-up care and support</li>
                                </>
                              )}
                            </ul>
                          </div>
                          
                          {/* Emergency Call Button */}
                          <m.a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className={`
                              inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300
                              ${getPriorityColor(contact.priority)} hover:shadow-lg
                            `}
                            whileHover={reducedMotion ? {} : { scale: 1.05 }}
                            whileTap={reducedMotion ? {} : { scale: 0.95 }}
                          >
                            <PhoneIcon className="h-5 w-5" />
                            Call Now: {contact.phone}
                          </m.a>
                        </div>
                      </m.div>
                    )}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className={`${typographyScale.h4} text-blue-900 mb-4`}>
          How to Request Emergency Pastoral Care
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className={`${typographyScale.body} text-blue-800 font-medium`}>Call the main parish number</p>
              <p className={`${typographyScale.caption} text-blue-700`}>
                020 8852 7411 - Available 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className={`${typographyScale.body} text-blue-800 font-medium`}>Clearly state it's an emergency</p>
              <p className={`${typographyScale.caption} text-blue-700`}>
                Say "This is a pastoral emergency" and specify the type of need
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className={`${typographyScale.body} text-blue-800 font-medium`}>Provide essential information</p>
              <p className={`${typographyScale.caption} text-blue-700`}>
                Location, contact number, nature of emergency, and urgency level
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <p className={`${typographyScale.body} text-blue-800 font-medium`}>Wait for response</p>
              <p className={`${typographyScale.caption} text-blue-700`}>
                A priest will respond according to the urgency and nature of your request
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Contacts */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className={`${typographyScale.h4} text-slate-900 mb-4`}>
          Additional Emergency Resources
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className={`${typographyScale.body} text-slate-900 font-medium`}>
              Medical Emergency
            </h5>
            <p className={`${typographyScale.caption} text-gray-700`}>
              Call 999 for immediate medical assistance, then contact us for pastoral support
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className={`${typographyScale.body} text-slate-900 font-medium`}>
              Samaritans (24/7 Support)
            </h5>
            <p className={`${typographyScale.caption} text-gray-700`}>
              116 123 (free from any phone) - Emotional support in crisis
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className={`${typographyScale.body} text-slate-900 font-medium`}>
              Diocesan Emergency Line
            </h5>
            <p className={`${typographyScale.caption} text-gray-700`}>
              Available if parish line is unreachable: 020 7798 9033
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className={`${typographyScale.body} text-slate-900 font-medium`}>
              Hospital Chaplaincy
            </h5>
            <p className={`${typographyScale.caption} text-gray-700`}>
              Contact hospital directly for immediate chaplain services
            </p>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default EmergencyContactSystem