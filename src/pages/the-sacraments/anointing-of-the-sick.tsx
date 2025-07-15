import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { useSpring as useReactSpring, animated, useTrail as useReactTrail } from '@react-spring/web'
import { 
  PlusIcon as Plus, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  HeartIcon as Heart, 
  ShieldCheckIcon as Shield, 
  ArrowRightIcon as ArrowRight, 
  UserGroupIcon as Users,
  ClockIcon as Clock,
  BellIcon as Bell,
  MapPinIcon as MapPin,
  InformationCircleIcon as InfoCircle,
  CheckCircleIcon as CheckCircle,
  ExclamationTriangleIcon as Warning,
  ChatBubbleLeftRightIcon as Chat,
  HandRaisedIcon as HandRaised,
  SparklesIcon as Sparkles,
  LightBulbIcon as LightBulb,
  ChartBarIcon as ChartBar,
  EyeIcon as Eye,
  KeyIcon as Key,
  StarIcon as Star,
  SunIcon as Sun,
  CloudIcon as Cloud,
  FireIcon as Fire
} from '@heroicons/react/24/solid'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card,
  CardContent,
  Heading, 
  Text, 
  Section,
  Container,
  Grid,
  Flex
} from '@/components/ui'
import { SacramentInfo } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

// Enhanced Components
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import SacramentalAnalytics from '@/components/enhanced/SacramentalAnalytics'

// Enhanced Components for Anointing of the Sick
interface EmergencyContact {
  name: string
  phone: string
  role: string
  availability: string
  urgent: boolean
}

const EmergencyAnointingSystem = ({ contacts }: { contacts: EmergencyContact[] }) => {
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null)
  const [isEmergency, setIsEmergency] = useState(false)
  const reducedMotion = prefersReducedMotion()

  const springProps = useReactSpring({
    transform: isEmergency ? 'scale(1.05)' : 'scale(1)',
    backgroundColor: isEmergency ? '#dc2626' : '#059669',
    config: { tension: 300, friction: 20 }
  })

  const trailProps = useReactTrail(contacts.length, {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 280, friction: 60 }
  })

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bell className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Emergency Anointing Request
          </Heading>
        </div>
        
        {/* Emergency Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isEmergency
                ? 'bg-red-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {isEmergency ? 'URGENT' : 'Standard Request'}
          </button>
          {isEmergency && (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-400 text-sm font-medium flex items-center gap-2"
            >
              <Warning className="h-4 w-4" />
              Life-threatening situation
            </m.div>
          )}
        </div>
        
        {/* Contact List */}
        <div className="space-y-3">
          <Text className="text-sm font-semibold text-gold-500 uppercase tracking-wide">
            Available Contacts:
          </Text>
          {trailProps.map((style, index) => (
            <animated.div key={index} style={style}>
              <button
                onClick={() => setSelectedContact(contacts[index])}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedContact?.name === contacts[index].name
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-slate-600 hover:border-white bg-slate-800/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <div className="font-semibold text-white flex items-center gap-2">
                      {contacts[index].name}
                      {contacts[index].urgent && (
                        <Bell className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-300">{contacts[index].role}</div>
                    <div className="text-sm text-gray-400">{contacts[index].availability}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-white">{contacts[index].phone}</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      contacts[index].urgent ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {contacts[index].urgent ? 'Emergency' : 'Available'}
                    </div>
                  </div>
                </div>
              </button>
            </animated.div>
          ))}
        </div>
        
        {/* Call Action */}
        {selectedContact && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-gold-500/20 rounded-lg border border-gold-500"
          >
            <div className="text-center space-y-3">
              <div className="text-white font-semibold">
                Calling {selectedContact.name} - {selectedContact.role}
              </div>
              <animated.div style={springProps}>
                <a href={`tel:${selectedContact.phone}`}>
                  <Button
                    className="text-white font-bold px-6 py-3 rounded-lg"
                    leftIcon={<Phone className="h-5 w-5" />}
                  >
                    Call Now: {selectedContact.phone}
                  </Button>
                </a>
              </animated.div>
              <div className="text-sm text-gray-300">
                {isEmergency ? 'Emergency request - will be prioritized' : 'Standard anointing request'}
              </div>
            </div>
          </m.div>
        )}
        
        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <InfoCircle className="h-5 w-5 text-blue-400" />
            <Text className="text-sm font-semibold text-blue-400">
              When You Call
            </Text>
          </div>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Provide patient's name and location</li>
            <li>• Describe the urgency of the situation</li>
            <li>• Mention any time constraints</li>
            <li>• Give clear directions if needed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const AnointingPreparationGuide = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const reducedMotion = prefersReducedMotion()

  const preparationSteps = [
    {
      title: "Prepare the Space",
      icon: MapPin,
      content: "Create a peaceful environment for the sacrament.",
      items: [
        "Clean, quiet room with good lighting",
        "Small table covered with white cloth",
        "Crucifix and candles if available",
        "Glass of water and small spoon",
        "Comfortable seating for family"
      ]
    },
    {
      title: "Prepare the Person",
      icon: Heart,
      content: "Help the sick person prepare spiritually and physically.",
      items: [
        "Explain the sacrament if they're conscious",
        "Encourage confession if possible",
        "Ensure they're comfortable and presentable",
        "Have their hands and forehead accessible",
        "Provide privacy for the sacrament"
      ]
    },
    {
      title: "Gather Family",
      icon: Users,
      content: "Invite close family and friends to participate.",
      items: [
        "Notify immediate family members",
        "Invite close friends if appropriate",
        "Ensure everyone understands the solemnity",
        "Prepare for communal prayer participation",
        "Arrange for someone to assist the priest"
      ]
    },
    {
      title: "During the Sacrament",
      icon: BookOpen,
      content: "Participate fully in this sacred moment.",
      items: [
        "Join in the prayers and responses",
        "Maintain reverent silence during anointing",
        "Support the sick person with your presence",
        "Receive any special blessings offered",
        "Stay for final prayers and blessing"
      ]
    }
  ]

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const springProps = useReactSpring({
    transform: completedSteps.length > 0 ? 'scale(1.02)' : 'scale(1)',
    config: { tension: 300, friction: 30 }
  })

  return (
    <animated.div style={springProps} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Preparation Guide
          </Heading>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-6">
          {preparationSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                completedSteps.includes(index) ? 'bg-green-500 text-white' : 
                index <= currentStep ? 'bg-gold-500 text-slate-900' : 'bg-slate-700 text-gray-300'
              }`}>
                {completedSteps.includes(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < preparationSteps.length - 1 && (
                <div className={`w-8 h-1 mx-2 transition-all ${
                  completedSteps.includes(index) ? 'bg-green-500' : 
                  index < currentStep ? 'bg-gold-500' : 'bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Current Step */}
        <m.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            {React.createElement(preparationSteps[currentStep].icon, {
              className: "h-6 w-6 text-gold-500"
            })}
            <Heading level="h4" className="text-lg font-semibold text-white">
              {preparationSteps[currentStep].title}
            </Heading>
          </div>
          
          <Text className="text-gray-300 leading-relaxed">
            {preparationSteps[currentStep].content}
          </Text>
          
          <div className="space-y-3">
            {preparationSteps[currentStep].items.map((item, itemIndex) => (
              <m.div
                key={itemIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIndex * 0.1 }}
                className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                <Text className="text-sm text-gray-300">{item}</Text>
              </m.div>
            ))}
          </div>
          
          {/* Step Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => markStepComplete(currentStep)}
              disabled={completedSteps.includes(currentStep)}
              className={`${
                completedSteps.includes(currentStep) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gold-500 text-slate-900 hover:bg-gold-600'
              }`}
              leftIcon={completedSteps.includes(currentStep) ? <CheckCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            >
              {completedSteps.includes(currentStep) ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        </m.div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-slate-900"
          >
            Previous
          </Button>
          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {preparationSteps.length}
          </div>
          <Button
            onClick={() => setCurrentStep(Math.min(preparationSteps.length - 1, currentStep + 1))}
            disabled={currentStep === preparationSteps.length - 1}
            className="bg-gold-500 text-slate-900 hover:bg-gold-600"
          >
            Next
          </Button>
        </div>
        
        {/* Completion Summary */}
        {completedSteps.length === preparationSteps.length && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <Text className="text-sm font-semibold text-green-400">
                Preparation Complete!
              </Text>
            </div>
            <Text className="text-sm text-gray-300">
              Everything is ready for the sacrament. The family and space are prepared to receive God's healing grace.
            </Text>
          </m.div>
        )}
      </div>
    </animated.div>
  )
}

export default function AnointingOfTheSick() {
  const reducedMotion = prefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced analytics integration
  useEffect(() => {
    // Track page engagement
    const startTime = Date.now()
    return () => {
      const endTime = Date.now()
      const timeSpent = endTime - startTime
      // Analytics would be sent here
    }
  }, [])

  const anointingContent = [
    "The Anointing of the Sick is a sacrament of healing that provides spiritual comfort, courage, and strength to those facing serious illness, surgery, or the frailty of old age. It continues Christ's healing ministry in the Church.",
    "This sacrament is not only for those at the point of death, but for anyone experiencing serious illness or preparing for major surgery. It can be received multiple times during different illnesses, bringing God's grace and peace.",
    "Through this sacrament, the Church continues Jesus' work of healing and comfort, offering hope and strength to those who need it most."
  ]

  const anointingEffects = [
    {
      title: "Spiritual Comfort",
      description: "Brings peace, courage, and strength to face illness with faith and hope"
    },
    {
      title: "Forgiveness of Sins",
      description: "Forgives sins if the person is unable to receive confession due to their condition"
    },
    {
      title: "Union with Christ",
      description: "Unites the sick person's suffering with Christ's passion for salvation"
    },
    {
      title: "Ecclesiastical Grace",
      description: "Strengthens connection with the Church community and their prayers"
    },
    {
      title: "Preparation for Heaven",
      description: "If it is God's will, prepares the soul for the journey to eternal life"
    }
  ]

  const anointingRequirements = [
    {
      title: "Who Can Receive",
      items: [
        "Any baptized Catholic who is seriously ill",
        "Those preparing for major surgery",
        "Elderly persons weakened by age",
        "Children who have reached the age of reason",
        "Anyone with chronic conditions during worsening periods"
      ]
    },
    {
      title: "When to Request",
      items: [
        "As soon as serious illness begins",
        "Before major surgery or procedures",
        "During times of great physical weakness",
        "When facing life-threatening conditions",
        "For repeated reception during new illnesses"
      ]
    },
    {
      title: "How to Request",
      items: [
        "Call parish office: 020 8852 7411",
        "Contact available 24/7 for emergencies",
        "Speak with priest after Mass",
        "Hospital chaplain services available",
        "Family members may request on behalf of patient"
      ]
    }
  ]

  const emergencyContacts: EmergencyContact[] = [
    {
      name: "Fr. Parish Priest",
      phone: "020 8852 7411",
      role: "Parish Priest",
      availability: "24/7 Emergency",
      urgent: true
    },
    {
      name: "Deacon Assistant",
      phone: "020 8852 7412",
      role: "Deacon",
      availability: "9 AM - 9 PM",
      urgent: false
    },
    {
      name: "Hospital Chaplain",
      phone: "020 8333 3000",
      role: "Hospital Chaplain",
      availability: "At University Hospital",
      urgent: true
    },
    {
      name: "Emergency Line",
      phone: "020 8852 7411",
      role: "Parish Emergency",
      availability: "After Hours",
      urgent: true
    }
  ]

  const quote = {
    text: "Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord",
    source: "James 5:14"
  }

  const anointingSteps = [
    {
      step: 1,
      title: "Liturgy of the Word",
      description: "Scripture readings and prayers appropriate for the sick person's situation",
      icon: BookOpen,
      color: "bg-navy-600"
    },
    {
      step: 2,
      title: "Laying on of Hands",
      description: "The priest silently lays hands on the sick person's head in prayer",
      icon: Heart,
      color: "bg-blue-600"
    },
    {
      step: 3,
      title: "Prayer over the Oil",
      description: "The priest blesses the oil of the sick if not already blessed by the bishop",
      icon: Plus,
      color: "bg-green-600"
    },
    {
      step: 4,
      title: "Anointing",
      description: "The forehead and hands are anointed with oil while prayers are said",
      icon: Shield,
      color: "bg-navy-700"
    }
  ]

  // Scripture for Anointing of the Sick theme
  const anointingScripture = {
    verse: "Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord.",
    reference: "James 5:14",
    theme: "healing"
  }

  // Parallax effect calculation
  const parallaxOffset = {
    x: typeof window !== 'undefined' ? (mousePosition.x - window.innerWidth / 2) * 0.01 : 0,
    y: typeof window !== 'undefined' ? (mousePosition.y - window.innerHeight / 2) * 0.01 : 0
  }

  // React Spring animations
  const heroSpring = useReactSpring({
    transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
    config: { tension: 300, friction: 50 }
  })

  const fadeInSpring = useReactSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    config: { tension: 280, friction: 60 }
  })

  return (
    <LazyMotion features={domAnimation}>
      <PageLayout
        title="Anointing of the Sick"
        description="Learn about the Sacrament of Anointing of the Sick at St Saviour's Catholic Church. Information on spiritual healing, comfort, and last rites."
        keywords="Anointing of the Sick, Last Rites, Extreme Unction, Catholic Sacrament, Healing, Spiritual Comfort, Emergency"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>Anointing of the Sick page loaded with emergency request system and preparation guide</h1>
          <p>Use Alt+E to request emergency anointing, Alt+P for preparation guide, Alt+A for analytics</p>
        </div>
        
        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
          <PageHero
            title="Anointing of the Sick"
            subtitle="Sacrament of Healing and Comfort"
            description="Christ's healing touch continues through this sacrament of spiritual and physical restoration."
            backgroundImage="/images/inside-church-aisle.jpg"
            height="large"
            overlay="medium"
            actions={
              <Flex justify="center" gap="md">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Phone className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() => document.getElementById('emergency-system')?.scrollIntoView({ behavior: 'smooth' })}
                  onKeyDown={(e) => e.key === 'e' && document.getElementById('emergency-system')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Anointing
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<CheckCircle className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() => document.getElementById('preparation-guide')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Preparation Guide
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Sacrament Information with Enhanced Features */}
        <Section spacing="lg" background="slate" id="anointing-info">
          <Container size="lg">
            <animated.div style={fadeInSpring}>
              <SacramentInfo
                icon={Plus}
                title="Christ's Healing Touch"
                subtitle="Sacrament of healing for the seriously ill"
                content={anointingContent}
                quote={quote}
                effects={anointingEffects}
                requirements={anointingRequirements}
                effectsColor="purple"
                theme="dark"
              />
            </animated.div>
          </Container>
        </Section>
        
        {/* Scripture Card */}
        <Section spacing="md" background="slate">
          <Container size="lg">
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ScriptureCard
                displayMode="themed"
                theme={anointingScripture.theme}
                showAudio={true}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>
        
        {/* Emergency Request System */}
        <Section spacing="lg" background="slate" id="emergency-system">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Emergency Anointing Request
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { width: 128 }}
                      transition={reducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Available 24/7 for spiritual comfort and healing. Don't hesitate to call 
                  in times of serious illness or emergency.
                </Text>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmergencyAnointingSystem contacts={emergencyContacts} />
                <SacramentalAnalytics sacramentType="all" />
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Preparation Guide */}
        <Section spacing="lg" background="slate" id="preparation-guide">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Preparation Guide
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { width: 128 }}
                      transition={reducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Help prepare for this sacred sacrament with practical guidance for 
                  family, space, and spiritual readiness.
                </Text>
              </div>
              
              <AnointingPreparationGuide />
            </div>
          </Container>
        </Section>


        {/* Section Divider */}
        <div className="flex justify-center py-20 bg-slate-900">
          <m.div 
            className="w-[640px] h-px" 
            style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}
            initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
            whileInView={reducedMotion ? { opacity: 1 } : { width: 640 }}
            transition={reducedMotion 
              ? { duration: 0.3 }
              : { duration: 1.5, delay: 0.2 }
            }
            viewport={{ once: true }}
          />
        </div>

        {/* Call to Action with Social Sharing */}
        <Section spacing="lg" background="slate">
          <Container size="md">
            <div className="text-center text-white space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Comfort in Times of Illness
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { width: 128 }}
                      transition={reducedMotion 
                        ? { duration: 0.3 }
                        : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                    You don't have to face illness alone. The Church is here to provide spiritual 
                    comfort and healing through this beautiful sacrament of God's love and mercy.
                  </Text>
                  <Flex justify="center" gap="lg" wrap>
                    <motion.a 
                      href="tel:020 8852 7411"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        📞 020 8852 7411
                      </Text>
                    </motion.a>
                    <motion.a 
                      href="mailto:info@stsaviourslewisham.org.uk"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        ✉️ info@stsaviourslewisham.org.uk
                      </Text>
                    </motion.a>
                  </Flex>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact-us">
                  <Button 
                    variant="primary" 
                    size="lg"
                    leftIcon={<Phone className="h-5 w-5" />}
                    className="bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Request Anointing
                  </Button>
                </Link>
                
                <SocialSharingSystem
                  articleId="anointing-page"
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title="Anointing of the Sick at St Saviour's"
                  onShare={(platform) => console.log(`Shared on ${platform}`)}
                />
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Enhanced Features */}
        <div className="sr-only">
          <div id="keyboard-shortcuts">
            <h3>Keyboard Shortcuts</h3>
            <ul>
              <li>Alt+E: Focus emergency request system</li>
              <li>Alt+P: Focus preparation guide</li>
              <li>Alt+A: Focus analytics</li>
              <li>Alt+C: Call emergency number</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    </LazyMotion>
  )
}

// Keyboard shortcuts for accessibility
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'e':
          e.preventDefault()
          document.getElementById('emergency-system')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'p':
          e.preventDefault()
          document.getElementById('preparation-guide')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'a':
          e.preventDefault()
          document.querySelector('[data-analytics]')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'c':
          e.preventDefault()
          window.location.href = 'tel:020 8852 7411'
          break
      }
    }
  })
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'