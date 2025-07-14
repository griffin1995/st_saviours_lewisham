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
  BeakerIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface PreparationStep {
  id: string
  title: string
  description: string
  category: 'preparation' | 'documentation' | 'ceremony' | 'spiritual'
  completed: boolean
  optional?: boolean
  estimatedTime?: string
  resources?: string[]
  nextAction?: string
}

interface BaptismPreparationTrackerProps {
  baptismType: 'infant' | 'adult'
  className?: string
}

export default function BaptismPreparationTracker({ 
  baptismType, 
  className = '' 
}: BaptismPreparationTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set())
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<'initial' | 'preparation' | 'ready'>('initial')

  const infantSteps: PreparationStep[] = [
    {
      id: 'registration',
      title: 'Parish Registration',
      description: 'Both parents must be registered parishioners of St Saviour\'s',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Parish registration form', 'Proof of address'],
      nextAction: 'Contact parish office to register'
    },
    {
      id: 'preparation-course',
      title: 'Baptism Preparation Course',
      description: 'Attend the mandatory baptism preparation session for parents',
      category: 'preparation',
      completed: false,
      estimatedTime: '2 hours',
      resources: ['Course materials provided', 'Note-taking materials'],
      nextAction: 'Book preparation session'
    },
    {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      description: 'Provide original birth certificate of the child to be baptised',
      category: 'documentation',
      completed: false,
      estimatedTime: '1 day',
      resources: ['Original birth certificate'],
      nextAction: 'Obtain from registry office if needed'
    },
    {
      id: 'godparents',
      title: 'Choose Godparents',
      description: 'Select Catholic godparents who meet Church requirements',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Godparent requirements checklist', 'Confirmation certificates'],
      nextAction: 'Discuss with potential godparents'
    },
    {
      id: 'baptism-outfit',
      title: 'Baptism Outfit',
      description: 'Prepare white garment and other ceremonial items',
      category: 'ceremony',
      completed: false,
      optional: true,
      estimatedTime: '1 week',
      resources: ['White clothing or christening gown', 'Candle (provided)'],
      nextAction: 'Purchase or prepare outfit'
    },
    {
      id: 'schedule-baptism',
      title: 'Schedule Baptism',
      description: 'Book the baptism date with the parish office',
      category: 'preparation',
      completed: false,
      estimatedTime: '30 minutes',
      resources: ['Calendar availability', 'Preferred dates list'],
      nextAction: 'Contact parish office to schedule'
    }
  ]

  const adultSteps: PreparationStep[] = [
    {
      id: 'rcia-enrollment',
      title: 'RCIA Enrollment',
      description: 'Enroll in the Rite of Christian Initiation of Adults program',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 week',
      resources: ['RCIA application form', 'Personal commitment'],
      nextAction: 'Contact RCIA coordinator'
    },
    {
      id: 'weekly-sessions',
      title: 'Weekly RCIA Sessions',
      description: 'Attend weekly formation sessions for 6-12 months',
      category: 'preparation',
      completed: false,
      estimatedTime: '6-12 months',
      resources: ['RCIA materials', 'Catholic Bible', 'Notebook'],
      nextAction: 'Begin attending weekly sessions'
    },
    {
      id: 'sponsor-selection',
      title: 'Choose a Sponsor',
      description: 'Select a Catholic sponsor to guide your faith journey',
      category: 'spiritual',
      completed: false,
      estimatedTime: '2 weeks',
      resources: ['Sponsor requirements', 'Sponsor commitment form'],
      nextAction: 'Find and ask a suitable sponsor'
    },
    {
      id: 'scrutinies',
      title: 'Lenten Scrutinies',
      description: 'Participate in the three scrutinies during Lent',
      category: 'spiritual',
      completed: false,
      estimatedTime: '3 weeks',
      resources: ['Prayer preparation', 'Spiritual reflection'],
      nextAction: 'Prepare spiritually for scrutinies'
    },
    {
      id: 'retreat',
      title: 'Pre-Baptism Retreat',
      description: 'Attend the preparatory retreat before Easter Vigil',
      category: 'spiritual',
      completed: false,
      optional: true,
      estimatedTime: '1 day',
      resources: ['Retreat materials', 'Journal'],
      nextAction: 'Register for retreat'
    },
    {
      id: 'easter-vigil',
      title: 'Easter Vigil Ceremony',
      description: 'Receive baptism during the Easter Vigil celebration',
      category: 'ceremony',
      completed: false,
      estimatedTime: '3 hours',
      resources: ['White garment', 'Candle (provided)', 'Family invitation'],
      nextAction: 'Prepare for Easter Vigil'
    }
  ]

  const steps = baptismType === 'infant' ? infantSteps : adultSteps

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
      case 'ceremony': return BeakerIcon
      case 'spiritual': return HeartIcon
      default: return ClockIcon
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preparation': return 'text-blue-400'
      case 'documentation': return 'text-green-400'
      case 'ceremony': return 'text-purple-400'
      case 'spiritual': return 'text-gold-400'
      default: return 'text-gray-400'
    }
  }

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'initial':
        return 'Ready to begin your baptism preparation journey'
      case 'preparation':
        return 'Your preparation is underway - keep going!'
      case 'ready':
        return 'Congratulations! You\'re ready for baptism'
      default:
        return ''
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <BeakerIcon className="h-8 w-8 text-blue-400" />
          </motion.div>
          <Heading level="h3" color="white" className="text-xl font-bold">
            {baptismType === 'infant' ? 'Infant' : 'Adult'} Baptism Preparation
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Track your progress through the baptism preparation process. Complete each step to prepare for this sacred sacrament.
        </Text>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="default" padding="lg" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
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
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <Text className="text-blue-200 text-center">
                {getPhaseMessage()}
              </Text>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const CategoryIcon = getCategoryIcon(step.category)
          const isCompleted = completedSteps.has(step.id)
          const isExpanded = expandedSteps.has(step.id)
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="default" padding="md" className={`border-2 transition-all duration-300 ${
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
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-600 pt-4 space-y-3">
                            {step.nextAction && (
                              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                <Text size="sm" className="text-blue-200 font-medium">
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {currentPhase === 'ready' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 backdrop-blur-sm text-center">
              <CardContent>
                <div className="space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
                  </motion.div>
                  <Heading level="h4" color="white" className="text-xl font-bold">
                    Ready for Baptism!
                  </Heading>
                  <Text className="text-green-200">
                    Congratulations! You have completed all the required preparation steps. 
                    You are now ready to receive the sacrament of Baptism.
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}