import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import {
  BeakerIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  HandRaisedIcon,
  HeartIcon,
  UserGroupIcon,
  StarIcon,
  SparklesIcon,
  ChevronRightIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface GuideStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  requirements: string[]
  resources: string[]
  category: 'spiritual' | 'practical' | 'documentation' | 'community'
  isRequired: boolean
}

interface SacramentalPreparationGuideProps {
  sacramentType: 'baptism' | 'confirmation' | 'eucharist' | 'matrimony'
  participantType?: 'infant' | 'child' | 'adult'
  className?: string
}

export default function SacramentalPreparationGuide({ 
  sacramentType = 'baptism',
  participantType = 'infant',
  className = '' 
}: SacramentalPreparationGuideProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const [expandedStep, setExpandedStep] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Baptism preparation steps
  const baptismInfantSteps: GuideStep[] = [
    {
      id: 'parish-registration',
      title: 'Parish Registration',
      description: 'Both parents must be registered parishioners for at least 3 months',
      estimatedTime: '1 week',
      requirements: ['Valid proof of address', 'Parish membership commitment'],
      resources: ['Registration form', 'Parish welcome pack', 'Stewardship information'],
      category: 'practical',
      isRequired: true
    },
    {
      id: 'preparation-course',
      title: 'Baptism Preparation Course',
      description: 'Attend mandatory preparation session covering sacramental theology',
      estimatedTime: '3 hours',
      requirements: ['Both parents attendance', 'Completed questionnaire'],
      resources: ['Course booklet', 'Scripture references', 'Prayer cards'],
      category: 'spiritual',
      isRequired: true
    },
    {
      id: 'godparent-selection',
      title: 'Godparent Selection',
      description: 'Choose Catholic godparents who meet Church requirements',
      estimatedTime: '2 weeks',
      requirements: ['Confirmed Catholic', 'Regular Mass attendance', 'Good moral standing'],
      resources: ['Godparent guidelines', 'Confirmation certificates', 'Sponsor forms'],
      category: 'community',
      isRequired: true
    },
    {
      id: 'documentation',
      title: 'Required Documentation',
      description: 'Gather all necessary certificates and forms',
      estimatedTime: '1 week',
      requirements: ['Birth certificate', 'Baptism certificates (parents)', 'Marriage certificate'],
      resources: ['Document checklist', 'Registry office contacts', 'Translation services'],
      category: 'documentation',
      isRequired: true
    },
    {
      id: 'ceremony-planning',
      title: 'Ceremony Planning',
      description: 'Schedule baptism and prepare ceremonial elements',
      estimatedTime: '2 weeks',
      requirements: ['Available date selection', 'White garment', 'Family coordination'],
      resources: ['Calendar booking', 'Ceremony outline', 'Photography guidelines'],
      category: 'practical',
      isRequired: true
    },
    {
      id: 'spiritual-preparation',
      title: 'Spiritual Preparation',
      description: 'Deepen understanding of baptismal significance through prayer',
      estimatedTime: 'Ongoing',
      requirements: ['Daily prayer commitment', 'Scripture reading', 'Reflection journal'],
      resources: ['Prayer book', 'Scripture study guide', 'Spiritual direction'],
      category: 'spiritual',
      isRequired: false
    }
  ]

  const baptismAdultSteps: GuideStep[] = [
    {
      id: 'rcia-inquiry',
      title: 'RCIA Inquiry Period',
      description: 'Begin your journey of faith discovery and questions',
      estimatedTime: '2-3 months',
      requirements: ['Open heart and mind', 'Regular attendance', 'Journal keeping'],
      resources: ['RCIA handbook', 'Catholic Bible', 'Sponsor assignment'],
      category: 'spiritual',
      isRequired: true
    },
    {
      id: 'catechumenate',
      title: 'Catechumenate Formation',
      description: 'Intensive formation in Catholic faith and teaching',
      estimatedTime: '6-12 months',
      requirements: ['Weekly session attendance', 'Scripture study', 'Service commitment'],
      resources: ['Catechism', 'Formation materials', 'Mentor support'],
      category: 'spiritual',
      isRequired: true
    },
    {
      id: 'sponsor-selection',
      title: 'Sponsor Selection',
      description: 'Choose a Catholic sponsor to guide your faith journey',
      estimatedTime: '1 month',
      requirements: ['Practicing Catholic', 'Confirmed', 'Good example of faith'],
      resources: ['Sponsor guidelines', 'Matching process', 'Relationship building'],
      category: 'community',
      isRequired: true
    },
    {
      id: 'rite-of-election',
      title: 'Rite of Election',
      description: 'Official enrollment as candidate for Easter baptism',
      estimatedTime: '1 day',
      requirements: ['Bishop\'s approval', 'Sponsor testimony', 'Parish recommendation'],
      resources: ['Ceremonial preparation', 'Cathedral visit', 'Special blessing'],
      category: 'spiritual',
      isRequired: true
    },
    {
      id: 'lenten-preparation',
      title: 'Lenten Preparation',
      description: 'Intensive spiritual preparation including scrutinies',
      estimatedTime: '40 days',
      requirements: ['Three scrutinies', 'Daily prayer', 'Fasting commitment'],
      resources: ['Lenten calendar', 'Spiritual exercises', 'Retreat day'],
      category: 'spiritual',
      isRequired: true
    },
    {
      id: 'easter-vigil',
      title: 'Easter Vigil Celebration',
      description: 'Receive baptism, confirmation, and first communion',
      estimatedTime: '3 hours',
      requirements: ['White garment', 'Candle preparation', 'Family invitation'],
      resources: ['Liturgy preparation', 'Photography permission', 'Reception planning'],
      category: 'practical',
      isRequired: true
    }
  ]

  const steps = sacramentType === 'baptism' && participantType === 'adult' 
    ? baptismAdultSteps 
    : baptismInfantSteps

  // Filter steps by category
  const filteredSteps = activeCategory === 'all' 
    ? steps 
    : steps.filter(step => step.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All Steps', icon: GlobeAltIcon, color: 'text-white' },
    { id: 'spiritual', label: 'Spiritual', icon: HeartIcon, color: 'text-gold-400' },
    { id: 'practical', label: 'Practical', icon: BookOpenIcon, color: 'text-blue-400' },
    { id: 'documentation', label: 'Documentation', icon: DocumentTextIcon, color: 'text-green-400' },
    { id: 'community', label: 'Community', icon: UserGroupIcon, color: 'text-purple-400' }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'spiritual': return HeartIcon
      case 'practical': return BookOpenIcon
      case 'documentation': return DocumentTextIcon
      case 'community': return UserGroupIcon
      default: return CalendarDaysIcon
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'spiritual': return 'text-gold-400'
      case 'practical': return 'text-blue-400'
      case 'documentation': return 'text-green-400'
      case 'community': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const progress = (completedSteps.size / steps.filter(s => s.isRequired).length) * 100

  // React Spring animation for progress bar
  const progressSpring = useSpring({
    width: `${progress}%`,
    config: { tension: 200, friction: 25 }
  })

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(stepId)) {
        newSet.delete(stepId)
      } else {
        newSet.add(stepId)
      }
      return newSet
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <m.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <BeakerIcon className="h-8 w-8 text-blue-400" />
          </m.div>
          <Heading level="h3" color="white" className="text-xl font-bold">
            {sacramentType === 'baptism' ? 'Baptism' : 'Sacrament'} Preparation Guide
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Follow this comprehensive guide to prepare for the sacrament of {sacramentType}. 
          Each step includes requirements, resources, and estimated timeframes.
        </Text>
      </m.div>

      {/* Progress Overview */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card variant="default" padding="lg" className="bg-gradient-to-r from-blue-500/20 to-gold-500/20 border border-blue-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Heading level="h4" color="white" className="text-lg font-semibold">
                  Preparation Progress
                </Heading>
                <div className="flex items-center gap-2">
                  <Text className="text-white font-bold text-xl">
                    {Math.round(progress)}%
                  </Text>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(progress / 20) ? 'text-gold-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <animated.div
                  style={progressSpring}
                  className="bg-gradient-to-r from-blue-500 to-gold-500 h-3 rounded-full"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Text className="text-2xl font-bold text-white">{completedSteps.size}</Text>
                  <Text size="sm" className="text-gray-300">Completed</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-blue-400">{steps.filter(s => s.isRequired).length}</Text>
                  <Text size="sm" className="text-gray-300">Required</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-gold-400">{steps.length}</Text>
                  <Text size="sm" className="text-gray-300">Total Steps</Text>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Category Filter */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-slate-900'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-slate-900' : category.color}`} />
                    <span className="text-sm">{category.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Steps List */}
      <div className="space-y-4">
        {filteredSteps.map((step, index) => {
          const CategoryIcon = getCategoryIcon(step.category)
          const isCompleted = completedSteps.has(step.id)
          const isExpanded = expandedStep === step.id
          
          return (
            <m.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="default" padding="lg" className={`border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500/10 border-green-500/50 backdrop-blur-sm' 
                  : 'bg-white/10 border-slate-600 hover:border-blue-400 backdrop-blur-sm'
              }`}>
                <CardContent>
                  <div className="space-y-4">
                    {/* Step Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-slate-400 hover:border-blue-400'
                          }`}
                          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isCompleted && <CheckCircleIcon className="h-5 w-5" />}
                        </motion.button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <CategoryIcon className={`h-5 w-5 ${getCategoryColor(step.category)}`} />
                            <Heading level="h5" color="white" className={`font-semibold ${
                              isCompleted ? 'line-through opacity-75' : ''
                            }`}>
                              {step.title}
                              {!step.isRequired && (
                                <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                              )}
                            </Heading>
                          </div>
                          <Text size="sm" className={`text-gray-300 ${
                            isCompleted ? 'opacity-75' : ''
                          }`}>
                            {step.description}
                          </Text>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4 text-gray-400" />
                              <Text size="xs" className="text-gray-400">
                                {step.estimatedTime}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                      >
                        <m.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRightIcon className="h-5 w-5" />
                        </m.div>
                      </motion.button>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-600 pt-4 space-y-4">
                            {/* Requirements */}
                            <div>
                              <Text size="sm" className="text-white font-medium mb-2">
                                Requirements:
                              </Text>
                              <ul className="space-y-1">
                                {step.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <Text size="sm" className="text-gray-300">
                                      {req}
                                    </Text>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Resources */}
                            <div>
                              <Text size="sm" className="text-white font-medium mb-2">
                                Available Resources:
                              </Text>
                              <ul className="space-y-1">
                                {step.resources.map((resource, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                                    <Text size="sm" className="text-gray-300">
                                      {resource}
                                    </Text>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          )
        })}
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {progress === 100 && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 backdrop-blur-sm text-center">
              <CardContent>
                <div className="space-y-4">
                  <m.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
                  </m.div>
                  <Heading level="h4" color="white" className="text-xl font-bold">
                    Preparation Complete!
                  </Heading>
                  <Text className="text-green-200">
                    Congratulations! You have completed all required preparation steps. 
                    You are now ready to receive the sacrament.
                  </Text>
                  <Button
                    variant="primary"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Contact Parish Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}