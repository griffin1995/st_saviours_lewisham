import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  HeartIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FireIcon,
  ShieldCheckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface PreparationStep {
  id: string
  title: string
  description: string
  category: 'preparation' | 'documentation' | 'ceremony' | 'spiritual' | 'community'
  completed: boolean
  optional?: boolean
  estimatedTime?: string
  resources?: string[]
  nextAction?: string
}

interface ConfirmationPreparationTrackerProps {
  confirmationType: 'youth' | 'adult'
  className?: string
}

export default function ConfirmationPreparationTracker({ 
  confirmationType, 
  className = '' 
}: ConfirmationPreparationTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set())
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<'initial' | 'preparation' | 'ready'>('initial')

  const youthSteps: PreparationStep[] = [
    {
      id: 'eligibility',
      title: 'Eligibility Check',
      description: 'Must be in Year 9 or above and baptised Catholic',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 day',
      resources: ['Baptism certificate', 'School year confirmation'],
      nextAction: 'Verify baptism status with parish office'
    },
    {
      id: 'enrollment',
      title: 'Program Enrollment',
      description: 'Register for the 2-year confirmation preparation program',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Registration form', 'Medical forms', 'Emergency contacts'],
      nextAction: 'Complete online registration form'
    },
    {
      id: 'weekly-classes',
      title: 'Weekly Classes',
      description: 'Attend weekly Sunday morning sessions covering Catholic faith',
      category: 'preparation',
      completed: false,
      estimatedTime: '2 years',
      resources: ['Faith formation materials', 'Bible', 'Notebook'],
      nextAction: 'Begin attending Sunday 10:00 AM sessions'
    },
    {
      id: 'service-hours',
      title: 'Service Hours',
      description: 'Complete 30 hours of community service reflecting Catholic values',
      category: 'community',
      completed: false,
      estimatedTime: '18 months',
      resources: ['Service log book', 'Supervisor contacts', 'Project ideas'],
      nextAction: 'Choose service project and begin logging hours'
    },
    {
      id: 'sponsor-selection',
      title: 'Choose Confirmation Sponsor',
      description: 'Select a confirmed Catholic to guide your faith journey',
      category: 'spiritual',
      completed: false,
      estimatedTime: '2 weeks',
      resources: ['Sponsor requirements sheet', 'Sponsor forms', 'Meeting guidelines'],
      nextAction: 'Identify potential sponsor and discuss commitment'
    },
    {
      id: 'saint-name',
      title: 'Choose Confirmation Name',
      description: 'Research and select a saint name for confirmation',
      category: 'spiritual',
      completed: false,
      estimatedTime: '3 weeks',
      resources: ['Saints reference book', 'Online saint database', 'Reflection worksheet'],
      nextAction: 'Research saints and choose meaningful name'
    },
    {
      id: 'retreat',
      title: 'Confirmation Retreat',
      description: 'Attend mandatory weekend retreat for spiritual preparation',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 weekend',
      resources: ['Retreat materials', 'Personal items', 'Journal'],
      nextAction: 'Register for scheduled retreat weekend'
    },
    {
      id: 'interview',
      title: 'Final Interview',
      description: 'Meet with priest for final assessment and blessing',
      category: 'ceremony',
      completed: false,
      estimatedTime: '30 minutes',
      resources: ['Preparation summary', 'Questions about faith', 'Sponsor presence'],
      nextAction: 'Schedule interview appointment'
    },
    {
      id: 'ceremony-prep',
      title: 'Ceremony Preparation',
      description: 'Final preparations for confirmation ceremony',
      category: 'ceremony',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Appropriate clothing', 'Family invitations', 'Photography arrangements'],
      nextAction: 'Prepare ceremony details with family'
    }
  ]

  const adultSteps: PreparationStep[] = [
    {
      id: 'rcia-inquiry',
      title: 'RCIA Inquiry',
      description: 'Begin inquiry period to explore Catholic faith and confirmation',
      category: 'preparation',
      completed: false,
      estimatedTime: '2 months',
      resources: ['RCIA handbook', 'Question journal', 'Prayer guide'],
      nextAction: 'Contact RCIA coordinator to begin'
    },
    {
      id: 'formation-sessions',
      title: 'Formation Sessions',
      description: 'Attend weekly Wednesday evening RCIA sessions',
      category: 'preparation',
      completed: false,
      estimatedTime: '6-8 months',
      resources: ['Catholic Bible', 'Catechism', 'Formation workbook'],
      nextAction: 'Begin regular Wednesday 7:00 PM attendance'
    },
    {
      id: 'sponsor-selection',
      title: 'Sponsor Selection',
      description: 'Choose a confirmed Catholic to guide your journey',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 month',
      resources: ['Sponsor guidelines', 'Commitment forms', 'Meeting schedule'],
      nextAction: 'Find and ask suitable sponsor'
    },
    {
      id: 'rite-of-welcome',
      title: 'Rite of Welcome',
      description: 'Participate in liturgical rite welcoming candidates',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 hour',
      resources: ['Ceremonial preparation', 'Family invitation', 'Understanding of rite'],
      nextAction: 'Prepare for welcome ceremony'
    },
    {
      id: 'sending-forth',
      title: 'Rite of Sending Forth',
      description: 'Parish ceremony before diocesan rite of election',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 hour',
      resources: ['Parish testimonial', 'Sponsor support', 'Prayer preparation'],
      nextAction: 'Prepare for sending forth rite'
    },
    {
      id: 'retreat',
      title: 'Confirmation Retreat',
      description: 'Day of reflection and spiritual preparation',
      category: 'spiritual',
      completed: false,
      optional: true,
      estimatedTime: '1 day',
      resources: ['Retreat materials', 'Journal', 'Prayer intentions'],
      nextAction: 'Register for retreat day'
    },
    {
      id: 'easter-vigil',
      title: 'Easter Vigil Ceremony',
      description: 'Receive confirmation during Easter Vigil celebration',
      category: 'ceremony',
      completed: false,
      estimatedTime: '3 hours',
      resources: ['Appropriate clothing', 'Candle', 'Family coordination'],
      nextAction: 'Prepare for Easter Vigil'
    }
  ]

  const steps = confirmationType === 'youth' ? youthSteps : adultSteps

  useEffect(() => {
    const completed = Array.from(completedSteps).length
    const total = steps.filter(step => !step.optional).length
    const progress = (completed / total) * 100
    setOverallProgress(progress)
    
    if (progress === 0) {
      setCurrentPhase('initial')
    } else if (progress < 100) {
      setCurrentPhase('preparation')
    } else {
      setCurrentPhase('ready')
    }
  }, [completedSteps, steps])

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

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(stepId)) {
        newSet.delete(stepId)
      } else {
        newSet.add(stepId)
      }
      return newSet
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'preparation': return BookOpenIcon
      case 'documentation': return DocumentTextIcon
      case 'ceremony': return FireIcon
      case 'spiritual': return HeartIcon
      case 'community': return UserGroupIcon
      default: return ClockIcon
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preparation': return 'text-blue-400'
      case 'documentation': return 'text-green-400'
      case 'ceremony': return 'text-red-400'
      case 'spiritual': return 'text-gold-400'
      case 'community': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'initial':
        return 'Ready to begin your confirmation preparation journey'
      case 'preparation':
        return 'Your preparation is underway - keep going!'
      case 'ready':
        return 'Congratulations! You\'re ready for confirmation'
      default:
        return ''
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <m.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FireIcon className="h-8 w-8 text-red-400" />
          </m.div>
          <Heading level="h3" color="white" className="text-xl font-bold">
            {confirmationType === 'youth' ? 'Youth' : 'Adult'} Confirmation Preparation
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Track your progress through the confirmation preparation process. Complete each step to prepare for receiving the gifts of the Holy Spirit.
        </Text>
      </m.div>

      {/* Progress Overview */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="default" padding="lg" className="bg-gradient-to-r from-red-500/20 to-gold-500/20 border border-red-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Heading level="h4" color="white" className="text-lg font-semibold">
                  Overall Progress
                </Heading>
                <div className="flex items-center gap-2">
                  <Text className="text-white font-bold text-xl">
                    {Math.round(overallProgress)}%
                  </Text>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(overallProgress / 20) ? 'text-gold-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3">
                <m.div
                  className="bg-gradient-to-r from-red-500 to-gold-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <Text className="text-red-200 text-center">
                {getPhaseMessage()}
              </Text>
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const CategoryIcon = getCategoryIcon(step.category)
          const isCompleted = completedSteps.has(step.id)
          const isExpanded = expandedSteps.has(step.id)
          
          return (
            <m.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="default" padding="md" className={`border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500/10 border-green-500/50 backdrop-blur-sm' 
                  : 'bg-white/10 border-slate-600 hover:border-red-400 backdrop-blur-sm'
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
                              : 'border-slate-400 hover:border-red-400'
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
                              {step.optional && (
                                <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                              )}
                            </Heading>
                          </div>
                          <Text size="sm" className={`text-gray-300 ${
                            isCompleted ? 'opacity-75' : ''
                          }`}>
                            {step.description}
                          </Text>
                          {step.estimatedTime && (
                            <div className="flex items-center gap-1 mt-2">
                              <ClockIcon className="h-4 w-4 text-gray-400" />
                              <Text size="xs" className="text-gray-400">
                                Estimated time: {step.estimatedTime}
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleStepExpansion(step.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="h-5 w-5" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-5" />
                        )}
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
                          <div className="border-t border-slate-600 pt-4 space-y-3">
                            {step.nextAction && (
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                <Text size="sm" className="text-red-200 font-medium">
                                  Next Action: {step.nextAction}
                                </Text>
                              </div>
                            )}
                            
                            {step.resources && step.resources.length > 0 && (
                              <div>
                                <Text size="sm" className="text-gray-300 font-medium mb-2">
                                  Resources Needed:
                                </Text>
                                <ul className="space-y-1">
                                  {step.resources.map((resource, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                                      <Text size="sm" className="text-gray-400">
                                        {resource}
                                      </Text>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
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
        {currentPhase === 'ready' && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-green-500/20 to-red-500/20 border border-green-500/50 backdrop-blur-sm text-center">
              <CardContent>
                <div className="space-y-4">
                  <m.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ShieldCheckIcon className="h-16 w-16 text-green-400 mx-auto" />
                  </m.div>
                  <Heading level="h4" color="white" className="text-xl font-bold">
                    Ready for Confirmation!
                  </Heading>
                  <Text className="text-green-200">
                    Congratulations! You have completed all the required preparation steps. 
                    You are now ready to receive the gifts of the Holy Spirit through confirmation.
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