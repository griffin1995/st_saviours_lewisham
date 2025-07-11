import React, { useState } from 'react'
import { m } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'

interface ContactPreference {
  method: 'email' | 'phone' | 'sms' | 'whatsapp'
  priority: 'primary' | 'secondary' | 'disabled'
  timePreference: 'morning' | 'afternoon' | 'evening' | 'anytime'
  urgencyLevel: 'low' | 'medium' | 'high'
  language: 'english' | 'spanish' | 'portuguese' | 'polish'
  topics: string[]
}

interface ContactPreferenceSystemProps {
  onPreferencesChange: (preferences: ContactPreference[]) => void
  initialPreferences?: ContactPreference[]
  reducedMotion?: boolean
  className?: string
}

const contactMethods = [
  {
    id: 'email',
    name: 'Email',
    icon: EnvelopeIcon,
    description: 'Receive responses via email',
    color: 'blue'
  },
  {
    id: 'phone',
    name: 'Phone Call',
    icon: PhoneIcon,
    description: 'Receive phone calls',
    color: 'green'
  },
  {
    id: 'sms',
    name: 'Text Message',
    icon: DevicePhoneMobileIcon,
    description: 'Receive SMS messages',
    color: 'purple'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: ComputerDesktopIcon,
    description: 'Receive WhatsApp messages',
    color: 'emerald'
  }
]

const timePreferences = [
  { id: 'morning', name: 'Morning', time: '9:00 AM - 12:00 PM' },
  { id: 'afternoon', name: 'Afternoon', time: '12:00 PM - 5:00 PM' },
  { id: 'evening', name: 'Evening', time: '5:00 PM - 8:00 PM' },
  { id: 'anytime', name: 'Anytime', time: 'Any time during office hours' }
]

const languages = [
  { id: 'english', name: 'English', flag: '🇬🇧' },
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
  { id: 'polish', name: 'Polish', flag: '🇵🇱' }
]

const topics = [
  'General Inquiry',
  'Mass Times',
  'Sacraments',
  'Events',
  'Volunteering',
  'Donations',
  'Pastoral Care',
  'Youth Ministry',
  'Marriage Preparation',
  'Baptism',
  'Funeral Services',
  'Facility Rental'
]

export const ContactPreferenceSystem: React.FC<ContactPreferenceSystemProps> = ({
  onPreferencesChange,
  initialPreferences = [],
  reducedMotion = false,
  className = ''
}) => {
  const [preferences, setPreferences] = useState<ContactPreference[]>(
    initialPreferences.length > 0 ? initialPreferences : [
      {
        method: 'email',
        priority: 'primary',
        timePreference: 'anytime',
        urgencyLevel: 'medium',
        language: 'english',
        topics: []
      }
    ]
  )

  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const updatePreference = (index: number, updates: Partial<ContactPreference>) => {
    const newPreferences = [...preferences]
    newPreferences[index] = { ...newPreferences[index], ...updates }
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }

  const addPreference = () => {
    const newPreference: ContactPreference = {
      method: 'email',
      priority: 'secondary',
      timePreference: 'anytime',
      urgencyLevel: 'medium',
      language: 'english',
      topics: []
    }
    const newPreferences = [...preferences, newPreference]
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }

  const removePreference = (index: number) => {
    if (preferences.length > 1) {
      const newPreferences = preferences.filter((_, i) => i !== index)
      setPreferences(newPreferences)
      onPreferencesChange(newPreferences)
    }
  }

  const toggleTopic = (topic: string) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic]
    setSelectedTopics(newTopics)
    
    // Update all preferences with selected topics
    const newPreferences = preferences.map(pref => ({
      ...pref,
      topics: newTopics
    }))
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.4 }
    }
  }

  return (
    <m.div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <m.div
        className="text-center mb-8"
        variants={itemVariants}
      >
        <div className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <BellIcon className="h-6 w-6 text-gold-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Contact Preferences
        </h3>
        <p className="text-gray-300 text-sm">
          Tell us how you'd like to be contacted and we'll respect your preferences
        </p>
      </m.div>

      <div className="space-y-8">
        {/* Contact Methods */}
        {preferences.map((preference, index) => (
          <m.div
            key={index}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">
                Contact Method {index + 1}
                {preference.priority === 'primary' && (
                  <span className="ml-2 px-2 py-1 bg-gold-500/20 text-gold-300 text-xs rounded-full">
                    Primary
                  </span>
                )}
              </h4>
              {preferences.length > 1 && (
                <button
                  onClick={() => removePreference(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Preferred Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contactMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => updatePreference(index, { method: method.id as any })}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        preference.method === method.id
                          ? 'border-gold-500 bg-gold-500/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <method.icon className={`h-5 w-5 mx-auto mb-2 ${
                        preference.method === method.id ? 'text-gold-300' : 'text-gray-400'
                      }`} />
                      <div className={`text-xs ${
                        preference.method === method.id ? 'text-gold-300' : 'text-gray-400'
                      }`}>
                        {method.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Priority Level
                </label>
                <div className="space-y-2">
                  {['primary', 'secondary', 'disabled'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => updatePreference(index, { priority: priority as any })}
                      className={`w-full p-2 rounded-lg text-sm transition-all duration-300 ${
                        preference.priority === priority
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Preference */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Best Time to Contact
                </label>
                <div className="space-y-2">
                  {timePreferences.map((time) => (
                    <button
                      key={time.id}
                      onClick={() => updatePreference(index, { timePreference: time.id as any })}
                      className={`w-full p-2 rounded-lg text-sm transition-all duration-300 text-left ${
                        preference.timePreference === time.id
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-medium">{time.name}</div>
                      <div className="text-xs opacity-80">{time.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Preference */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Language Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => updatePreference(index, { language: language.id as any })}
                      className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                        preference.language === language.id
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-lg mb-1">{language.flag}</div>
                      <div className="text-xs">{language.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        ))}

        {/* Add New Method */}
        <m.div
          className="text-center"
          variants={itemVariants}
        >
          <button
            onClick={addPreference}
            className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors duration-300 border border-white/20"
          >
            + Add Another Contact Method
          </button>
        </m.div>

        {/* Topic Interests */}
        <m.div
          className="bg-white/5 rounded-xl p-6 border border-white/10"
          variants={itemVariants}
        >
          <h4 className="text-lg font-medium text-white mb-4">
            Topics of Interest
          </h4>
          <p className="text-sm text-gray-300 mb-4">
            Select the topics you're most interested in to help us direct your inquiry appropriately
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`p-3 rounded-xl text-sm transition-all duration-300 ${
                  selectedTopics.includes(topic)
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedTopics.includes(topic) && (
                    <CheckCircleIcon className="h-4 w-4" />
                  )}
                  <span>{topic}</span>
                </div>
              </button>
            ))}
          </div>
        </m.div>

        {/* Summary */}
        <m.div
          className="bg-gold-500/10 rounded-xl p-6 border border-gold-500/20"
          variants={itemVariants}
        >
          <h4 className="text-lg font-medium text-gold-300 mb-4">
            Your Preferences Summary
          </h4>
          <div className="space-y-3">
            {preferences.map((pref, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  {pref.priority === 'primary' ? 'Primary' : 'Secondary'} Contact:
                </span>
                <span className="text-gold-300 font-medium">
                  {pref.method.charAt(0).toUpperCase() + pref.method.slice(1)} • {pref.timePreference} • {pref.language}
                </span>
              </div>
            ))}
            {selectedTopics.length > 0 && (
              <div className="pt-3 border-t border-gold-500/20">
                <span className="text-gray-300 text-sm">Interested in: </span>
                <span className="text-gold-300 text-sm">
                  {selectedTopics.join(', ')}
                </span>
              </div>
            )}
          </div>
        </m.div>
      </div>
    </m.div>
  )
}

export default ContactPreferenceSystem