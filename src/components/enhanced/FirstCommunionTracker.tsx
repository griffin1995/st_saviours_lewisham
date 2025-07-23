import React, { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
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
  CircleStackIcon,
  BeakerIcon,
  HandRaisedIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text, Button } from '@/components/ui'

interface PreparationStep {
  id: string
  title: string
  description: string
  category: 'preparation' | 'documentation' | 'ceremony' | 'spiritual' | 'practice'
  completed: boolean
  optional?: boolean
  estimatedTime?: string
  resources?: string[]
  nextAction?: string
  ageGroup?: 'child' | 'adult'
}

interface FirstCommunionTrackerProps {
  participantType: 'child' | 'adult'
  className?: string
}

export default function FirstCommunionTracker({ 
  participantType, 
  className = '' 
}: FirstCommunionTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set())
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<'initial' | 'preparation' | 'ready'>('initial')

  const childSteps: PreparationStep[] = [
    {
      id: 'baptism-verified',
      title: 'Baptism Verification',
      description: 'Confirm Catholic baptism and provide baptismal certificate',
      category: 'documentation',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Baptismal certificate', 'Parish records verification'],
      nextAction: 'Contact parish office with baptismal details',
      ageGroup: 'child'
    },
    {
      id: 'age-readiness',
      title: 'Age of Reason',
      description: 'Child must have reached the age of reason (typically 7-8 years)',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 day',
      resources: ['School records', 'Parent assessment'],
      nextAction: 'Confirm child understands basic faith concepts',
      ageGroup: 'child'
    },
    {
      id: 'program-enrollment',
      title: 'First Communion Program',
      description: 'Enroll in the 2-year First Communion preparation program',
      category: 'preparation',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Registration forms', 'Medical information', 'Emergency contacts'],
      nextAction: 'Complete enrollment paperwork',
      ageGroup: 'child'
    },
    {
      id: 'weekly-classes',
      title: 'Weekly Religion Classes',
      description: 'Attend weekly catechesis sessions for 2 years',
      category: 'preparation',
      completed: false,
      estimatedTime: '2 years',
      resources: ['Faith formation books', 'Catholic Bible for children', 'Activity workbooks'],
      nextAction: 'Begin attending Sunday classes at 9:00 AM',
      ageGroup: 'child'
    },
    {
      id: 'mass-understanding',
      title: 'Understanding the Mass',
      description: 'Learn about the parts of Mass and the Real Presence',
      category: 'spiritual',
      completed: false,
      estimatedTime: '6 months',
      resources: ['Mass booklet for children', 'Real Presence explanations', 'Visual aids'],
      nextAction: 'Study Mass parts and practice responses',
      ageGroup: 'child'
    },
    {
      id: 'first-confession',
      title: 'First Confession',
      description: 'Receive the sacrament of Reconciliation before First Communion',
      category: 'spiritual',
      completed: false,
      estimatedTime: '30 minutes',
      resources: ['Examination of conscience for children', 'Confession guide', 'Prayer cards'],
      nextAction: 'Schedule and attend First Confession',
      ageGroup: 'child'
    },
    {
      id: 'retreat-day',
      title: 'First Communion Retreat',
      description: 'Attend special retreat day for spiritual preparation',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 day',
      resources: ['Retreat materials', 'Lunch and drinks', 'Comfortable clothes'],
      nextAction: 'Register for retreat day',
      ageGroup: 'child'
    },
    {
      id: 'practice-session',
      title: 'Ceremony Rehearsal',
      description: 'Attend rehearsal to practice receiving Holy Communion',
      category: 'practice',
      completed: false,
      estimatedTime: '1 hour',
      resources: ['Church attendance', 'Parent presence', 'Comfortable shoes'],
      nextAction: 'Attend scheduled rehearsal',
      ageGroup: 'child'
    },
    {
      id: 'communion-outfit',
      title: 'First Communion Outfit',
      description: 'Prepare appropriate white clothing for the ceremony',
      category: 'ceremony',
      completed: false,
      optional: true,
      estimatedTime: '2 weeks',
      resources: ['White dress or suit', 'Appropriate shoes', 'Optional veil or tie'],
      nextAction: 'Select and prepare ceremonial clothing',
      ageGroup: 'child'
    },
    {
      id: 'family-preparation',
      title: 'Family Spiritual Preparation',
      description: 'Family prayer and spiritual preparation leading up to the day',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Family prayer time', 'Special intentions', 'Gratitude prayers'],
      nextAction: 'Begin daily family prayer for intention',
      ageGroup: 'child'
    }
  ]

  const adultSteps: PreparationStep[] = [
    {
      id: 'rcia-completion',
      title: 'RCIA Completion',
      description: 'Complete the Rite of Christian Initiation of Adults program',
      category: 'preparation',
      completed: false,
      estimatedTime: '6-12 months',
      resources: ['RCIA materials', 'Catholic Bible', 'Catechism'],
      nextAction: 'Enroll in RCIA program',
      ageGroup: 'adult'
    },
    {
      id: 'baptism-confirmation',
      title: 'Baptism and Confirmation',
      description: 'Receive baptism and confirmation if not already received',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 ceremony',
      resources: ['Sponsor support', 'White garment', 'Candle'],
      nextAction: 'Prepare for Easter Vigil reception',
      ageGroup: 'adult'
    },
    {
      id: 'sponsor-selection',
      title: 'Sponsor Selection',
      description: 'Choose a Catholic sponsor to guide your journey',
      category: 'spiritual',
      completed: false,
      estimatedTime: '2 weeks',
      resources: ['Sponsor guidelines', 'Commitment forms', 'Regular meetings'],
      nextAction: 'Identify and ask suitable sponsor',
      ageGroup: 'adult'
    },
    {
      id: 'eucharistic-formation',
      title: 'Eucharistic Formation',
      description: 'Study the theology and practice of the Eucharist',
      category: 'preparation',
      completed: false,
      estimatedTime: '3 months',
      resources: ['Eucharistic theology books', 'Mass attendance', 'Adoration'],
      nextAction: 'Begin intensive Eucharistic study',
      ageGroup: 'adult'
    },
    {
      id: 'spiritual-direction',
      title: 'Spiritual Direction',
      description: 'Meet regularly with spiritual director for guidance',
      category: 'spiritual',
      completed: false,
      optional: true,
      estimatedTime: '6 months',
      resources: ['Monthly meetings', 'Prayer journal', 'Spiritual reading'],
      nextAction: 'Arrange spiritual direction meetings',
      ageGroup: 'adult'
    },
    {
      id: 'final-preparation',
      title: 'Final Preparation',
      description: 'Immediate preparation including fasting and prayer',
      category: 'spiritual',
      completed: false,
      estimatedTime: '1 week',
      resources: ['Eucharistic fast', 'Special prayers', 'Confession'],
      nextAction: 'Begin final week of intensive preparation',
      ageGroup: 'adult'
    }
  ]

  const steps = participantType === 'child' ? childSteps : adultSteps

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
      case 'ceremony': return CircleStackIcon
      case 'spiritual': return HeartIcon
      case 'practice': return HandRaisedIcon
      default: return ClockIcon
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preparation': return 'text-blue-400'
      case 'documentation': return 'text-green-400'
      case 'ceremony': return 'text-amber-400'
      case 'spiritual': return 'text-gold-400'
      case 'practice': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'initial':
        return `Ready to begin your ${participantType === 'child' ? 'child\'s ' : ''}First Communion preparation journey`
      case 'preparation':
        return 'Your preparation is underway - keep going!'
      case 'ready':
        return `Congratulations! ${participantType === 'child' ? 'Your child is' : 'You are'} ready for First Holy Communion`
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
            <CircleStackIcon className="h-8 w-8 text-amber-400" />
          </m.div>
          <Heading level="h3" color="white" className="text-xl font-bold">
            {participantType === 'child' ? 'Child' : 'Adult'} First Communion Preparation
          </Heading>
        </div>
        <Text className="text-gray-300 max-w-2xl mx-auto">
          Track your progress through the First Communion preparation process. Complete each step to prepare for receiving Jesus in the Eucharist.
        </Text>
      </m.div>

      {/* Progress Overview */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="default" padding="lg" className="bg-gradient-to-r from-amber-500/20 to-gold-500/20 border border-amber-500/30 backdrop-blur-sm">
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
                  className="bg-gradient-to-r from-amber-500 to-gold-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <Text className="text-amber-200 text-center">
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
                  : 'bg-white/10 border-slate-600 hover:border-amber-400 backdrop-blur-sm'
              }`}>
                <CardContent>
                  <div className="space-y-4">
                    {/* Step Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-slate-400 hover:border-amber-400'
                          }`}
                          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isCompleted && <CheckCircleIcon className="h-5 w-5" />}
                        </m.button>
                        
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
                      
                      <m.button
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
                      </m.button>
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
                              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                                <Text size="sm" className="text-amber-200 font-medium">
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
            <Card variant="default" padding="lg" className="bg-gradient-to-r from-green-500/20 to-amber-500/20 border border-green-500/50 backdrop-blur-sm text-center">
              <CardContent>
                <div className="space-y-4">
                  <m.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BeakerIcon className="h-16 w-16 text-green-400 mx-auto" />
                  </m.div>
                  <Heading level="h4" color="white" className="text-xl font-bold">
                    Ready for First Holy Communion!
                  </Heading>
                  <Text className="text-green-200">
                    Congratulations! {participantType === 'child' ? 'Your child has' : 'You have'} completed all the required preparation steps. 
                    {participantType === 'child' ? 'They are' : 'You are'} now ready to receive Jesus in the Eucharist for the first time.
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