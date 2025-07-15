/**
 * Interactive Mass Participation Guide
 * Implements 2025 research recommendations for first-time visitor assistance
 */
import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Motion } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import { 
  PlayIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  BookOpenIcon,
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid'

interface GuideStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  details: string[]
  timing: string
}

interface MassParticipationGuideProps {
  reducedMotion?: boolean
}

export function MassParticipationGuide({ reducedMotion = false }: MassParticipationGuideProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const guideSteps: GuideStep[] = [
    {
      id: 1,
      title: "Arriving at Church",
      description: "Welcome! Here's what to expect when you first arrive.",
      icon: UserGroupIcon,
      timing: "10-15 minutes before Mass",
      details: [
        "Arrive 10-15 minutes early to find parking and seating",
        "Holy water fonts are available at entrances for blessing yourself",
        "Genuflect (briefly kneel) toward the tabernacle when entering the pew",
        "Spend a few moments in quiet prayer before Mass begins",
        "Mass booklets and hymn books are available in the pews"
      ]
    },
    {
      id: 2,
      title: "Introductory Rites",
      description: "Mass begins with welcoming prayers and songs.",
      icon: HandRaisedIcon,
      timing: "First 10 minutes",
      details: [
        "Stand when the priest processes in with the altar servers",
        "Join in the opening hymn if you're comfortable",
        "Make the Sign of the Cross with the priest",
        "Participate in the Penitential Act (asking for God's mercy)",
        "Join in saying 'Glory to God' when sung or recited"
      ]
    },
    {
      id: 3,
      title: "Liturgy of the Word",
      description: "Listen to Scripture readings and the homily.",
      icon: BookOpenIcon,
      timing: "15-20 minutes",
      details: [
        "Sit for the first reading from the Old Testament",
        "Join in the Responsorial Psalm if you know it",
        "Sit for the second reading from the New Testament",
        "Stand for the Gospel Acclamation ('Alleluia')",
        "Listen to the Gospel reading while standing",
        "Sit for the homily (priest's reflection on the readings)",
        "Stand for the Creed (statement of faith) if you're comfortable"
      ]
    },
    {
      id: 4,
      title: "Liturgy of the Eucharist",
      description: "The central part of Mass - the Eucharistic Prayer.",
      icon: SparklesIcon,
      timing: "15-20 minutes",
      details: [
        "Sit during the preparation of gifts and collection",
        "Stand for the Eucharistic Prayer",
        "Join in responses like 'Holy, Holy, Holy'",
        "Kneel during the Consecration (when bread and wine become Body and Blood)",
        "Stand for the 'Our Father' and join hands if comfortable",
        "Exchange the Sign of Peace with those around you"
      ]
    },
    {
      id: 5,
      title: "Holy Communion",
      description: "Catholics receive the Eucharist; others may receive a blessing.",
      icon: HeartIcon,
      timing: "10-15 minutes",
      details: [
        "Catholics in good standing may receive Communion",
        "If you're not Catholic or not prepared, you may stay in your pew or come forward for a blessing",
        "For a blessing, cross your arms over your chest",
        "Wait for your row to be invited forward",
        "Follow the line to the priest or Eucharistic minister",
        "Say 'Amen' when offered the Host",
        "Return to your pew for quiet prayer and thanksgiving"
      ]
    },
    {
      id: 6,
      title: "Concluding Rites",
      description: "Final prayers and dismissal to serve others.",
      icon: PlayIcon,
      timing: "5 minutes",
      details: [
        "Stand for the final prayers and blessing",
        "Make the Sign of the Cross with the priest's blessing",
        "Join in the final hymn",
        "Remain standing as the priest processes out",
        "Feel free to stay for a few moments of personal prayer",
        "Introduce yourself to the welcoming team or priest after Mass"
      ]
    }
  ]

  // Guide animation
  const guideSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: reducedMotion ? config.default : config.gentle,
    delay: 300
  })

  // Step transition animation
  const stepSpring = useSpring({
    opacity: 1,
    transform: `translateX(${-activeStep * 100}%)`,
    config: reducedMotion ? config.default : config.gentle
  })

  const goToNextStep = () => {
    if (activeStep < guideSteps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const currentStep = guideSteps[activeStep]

  return (
    <animated.div ref={ref} style={guideSpring} className="space-y-6">
      {/* Guide Header */}
      <div className="text-center">
        <m.div
          className="w-20 h-20 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <currentStep.icon className="h-10 w-10 text-gold-400" />
        </m.div>
        
        <h3 className={`${typographyScale.h2} text-white mb-4`}>
          Mass Participation Guide
        </h3>
        <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
          New to Catholic Mass? This interactive guide will help you understand what to expect 
          and how to participate comfortably in our liturgical celebration.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`${typographyScale.body} text-white font-medium`}>
            Progress: Step {activeStep + 1} of {guideSteps.length}
          </span>
          <span className={`${typographyScale.caption} text-gray-300`}>
            {currentStep.timing}
          </span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
          <m.div
            className="bg-gradient-to-r from-gold-600 to-gold-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeStep + 1) / guideSteps.length) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="flex space-x-2">
          {guideSteps.map((step, index) => (
            <Motion.button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`
                flex-1 p-2 rounded-xl text-center transition-all duration-300
                ${index === activeStep 
                  ? 'bg-gold-700 text-black' 
                  : index < activeStep 
                    ? 'bg-green-600/20 text-green-300'
                    : 'bg-white/10 text-gray-400'
                }
              `}
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <step.icon className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs font-medium block">{step.id}</span>
            </Motion.button>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="relative overflow-hidden bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl">
        <animated.div style={stepSpring} className="flex">
          {guideSteps.map((step, index) => (
            <div key={step.id} className="w-full flex-shrink-0 p-8">
              <div className="space-y-6">
                {/* Step Header */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-gold-400" />
                  </div>
                  <h4 className={`${typographyScale.h3} text-white mb-2`}>
                    {step.title}
                  </h4>
                  <p className={`${typographyScale.body} text-gray-100`}>
                    {step.description}
                  </p>
                </div>

                {/* Step Details */}
                <div className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <m.div
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: detailIndex * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-slate-600"
                    >
                      <div className="w-6 h-6 bg-gold-700 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {detailIndex + 1}
                      </div>
                      <p className={`${typographyScale.body} text-gray-100 leading-relaxed`}>
                        {detail}
                      </p>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </animated.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Motion.button
          onClick={goToPreviousStep}
          disabled={activeStep === 0}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-slate-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className={typographyScale.body}>Previous</span>
        </Motion.button>

        <div className="text-center">
          <p className={`${typographyScale.caption} text-gray-300`}>
            Step {activeStep + 1} of {guideSteps.length}
          </p>
        </div>

        <Motion.button
          onClick={goToNextStep}
          disabled={activeStep === guideSteps.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-gold-700 text-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gold-600"
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
        >
          <span className={typographyScale.body}>
            {activeStep === guideSteps.length - 1 ? 'Complete' : 'Next'}
          </span>
          <ChevronRightIcon className="h-5 w-5" />
        </Motion.button>
      </div>

      {/* Quick Reference Card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6"
      >
        <h5 className={`${typographyScale.h4} text-white mb-4 text-center`}>
          Quick Reference for Mass
        </h5>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HandRaisedIcon className="h-6 w-6 text-green-400" />
            </div>
            <h6 className={`${typographyScale.body} text-white font-medium mb-2`}>
              When to Stand
            </h6>
            <p className={`${typographyScale.caption} text-gray-300`}>
              Opening, Gospel, Creed, Eucharistic Prayer, Our Father, Final Blessing
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpenIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h6 className={`${typographyScale.body} text-white font-medium mb-2`}>
              When to Sit
            </h6>
            <p className={`${typographyScale.caption} text-gray-300`}>
              First Reading, Second Reading, Homily, Preparation of Gifts
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HeartIcon className="h-6 w-6 text-purple-400" />
            </div>
            <h6 className={`${typographyScale.body} text-white font-medium mb-2`}>
              When to Kneel
            </h6>
            <p className={`${typographyScale.caption} text-gray-300`}>
              Consecration (when bread and wine become Body and Blood of Christ)
            </p>
          </div>
        </div>
      </m.div>
    </animated.div>
  )
}

export default MassParticipationGuide