import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, LazyMotion, domAnimation, useInView, m } from 'framer-motion'
import { useSpring as useReactSpring, animated, useTrail as useReactTrail } from '@react-spring/web'
import { 
  HeartIcon as Heart, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  ClockIcon as Clock, 
  ShieldCheckIcon as Shield, 
  ArrowRightIcon as ArrowRight, 
  CheckCircleIcon as CheckCircle,
  ChatBubbleLeftRightIcon as Chat,
  HandRaisedIcon as HandRaised,
  SparklesIcon as Sparkles,
  ScaleIcon as Scale,
  UserGroupIcon as UserGroup,
  AcademicCapIcon as Academic,
  BeakerIcon as Beaker,
  ChartBarIcon as ChartBar,
  EyeIcon as Eye,
  KeyIcon as Key,
  LightBulbIcon as LightBulb,
  MagnifyingGlassIcon as MagnifyingGlass,
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
// CMS DATA SOURCE: Import sacrament image functions
import { getSacramentImage } from '@/lib/cms-images'
// CMS DATA SOURCE: Import contact information functions
import { getContactPhone, getContactEmail } from '@/lib/cms-content'

// Enhanced Components
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { SacramentalScriptureSection } from '@/components/shared/content'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import SacramentalAnalytics from '@/components/enhanced/SacramentalAnalytics'

// Enhanced Components for Confession
interface ConfessionTime {
  day: string
  time: string
  note: string
  popular?: boolean
}

const ConfessionScheduler = ({ times }: { times: ConfessionTime[] }) => {
  const [selectedTime, setSelectedTime] = useState<ConfessionTime | null>(null)
  const [isScheduling, setIsScheduling] = useState(false)
  const reducedMotion = prefersReducedMotion()

  const springProps = useReactSpring({
    transform: isScheduling ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 20 }
  })

  const trailProps = useReactTrail(times.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  })

  return (
    <animated.div style={springProps} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Calendar className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Schedule Confession
          </Heading>
        </div>
        
        <div className="space-y-3">
          {trailProps.map((style, index) => (
            <animated.div key={index} style={style}>
              <button
                onClick={() => setSelectedTime(times[index])}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedTime?.day === times[index].day
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-slate-600 hover:border-white bg-slate-800/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="font-semibold text-white">{times[index].day}</div>
                    <div className="text-sm text-gray-300">{times[index].time}</div>
                  </div>
                  <div className="text-xs text-gray-400">{times[index].note}</div>
                </div>
              </button>
            </animated.div>
          ))}
        </div>
        
        {selectedTime && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-gold-500/20 rounded-lg border border-gold-500"
          >
            <div className="text-center space-y-2">
              <div className="text-white font-semibold">
                Selected: {selectedTime.day} at {selectedTime.time}
              </div>
              <Button
                onClick={() => setIsScheduling(true)}
                className="bg-white text-slate-900 hover:bg-gray-100"
                leftIcon={<Phone className="h-4 w-4" />}
              >
                Call to Confirm
              </Button>
            </div>
          </m.div>
        )}
      </div>
    </animated.div>
  )
}

const ExaminationOfConscienceGuide = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [expandedSections, setExpandedSections] = useState<{[key: number]: boolean}>({})
  const reducedMotion = prefersReducedMotion()

  const examineSteps = [
    {
      title: "Preparation",
      icon: Heart,
      content: "Begin with prayer, asking the Holy Spirit to illuminate your conscience and help you see your sins clearly.",
      questions: [
        "Have I made time for daily prayer?",
        "Have I attended Mass regularly?",
        "Have I honored God's name?",
        "Have I kept the Sabbath holy?"
      ]
    },
    {
      title: "Relationship with God",
      icon: Sun,
      content: "Reflect on your relationship with God and how you have honored or dishonored Him.",
      questions: [
        "Have I put other things before God?",
        "Have I been grateful for God's blessings?",
        "Have I prayed with sincerity?",
        "Have I sought God's will in decisions?"
      ]
    },
    {
      title: "Relationship with Others",
      icon: UserGroup,
      content: "Consider how you have treated family, friends, and strangers.",
      questions: [
        "Have I honored my parents?",
        "Have I been kind to others?",
        "Have I forgiven those who hurt me?",
        "Have I been truthful in my words?"
      ]
    },
    {
      title: "Relationship with Self",
      icon: Shield,
      content: "Examine your personal conduct and moral choices.",
      questions: [
        "Have I taken care of my body as a temple?",
        "Have I been honest with myself?",
        "Have I been responsible with my talents?",
        "Have I avoided occasions of sin?"
      ]
    }
  ]

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const springProps = useReactSpring({
    transform: currentStep > 0 ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 300, friction: 30 }
  })

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MagnifyingGlass className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Examination of Conscience Guide
          </Heading>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-6">
          {examineSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index <= currentStep ? 'bg-gold-500 text-slate-900' : 'bg-slate-700 text-gray-300'
              }`}>
                {index + 1}
              </div>
              {index < examineSteps.length - 1 && (
                <div className={`w-8 h-1 mx-2 ${
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
            {React.createElement(examineSteps[currentStep].icon, {
              className: "h-6 w-6 text-gold-500"
            })}
            <Heading level="h4" className="text-lg font-semibold text-white">
              {examineSteps[currentStep].title}
            </Heading>
          </div>
          
          <Text className="text-gray-300 leading-relaxed">
            {examineSteps[currentStep].content}
          </Text>
          
          <div className="space-y-2">
            <Text className="text-sm font-semibold text-gold-500 uppercase tracking-wide">
              Reflection Questions:
            </Text>
            <ul className="space-y-2">
              {examineSteps[currentStep].questions.map((question, qIndex) => (
                <m.li
                  key={qIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: qIndex * 0.1 }}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-sm">{question}</Text>
                </m.li>
              ))}
            </ul>
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
            Step {currentStep + 1} of {examineSteps.length}
          </div>
          <Button
            onClick={() => setCurrentStep(Math.min(examineSteps.length - 1, currentStep + 1))}
            disabled={currentStep === examineSteps.length - 1}
            className="bg-gold-500 text-slate-900 hover:bg-gold-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


export default function Confession() {
  const reducedMotion = prefersReducedMotion()
  
  // CMS DATA SOURCE: Get confession sacrament image
  const confessionImage = getSacramentImage('confession')
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

  const confessionContent = [
    "The Sacrament of Confession, also known as Reconciliation or Penance, is God's gift of forgiveness and healing. Through this sacrament, we receive absolution from our sins and are restored to full communion with God and the Church.",
    "Christ gave the apostles the power to forgive sins, and this authority continues in the Church today through ordained priests. No sin is too great for God's infinite mercy and love.",
    "This sacrament brings peace to the soul, strength to resist temptation, and the grace necessary for spiritual growth. It is a encounter with Christ's infinite mercy."
  ]

  const confessionEffects = [
    {
      title: "Forgiveness of Sins",
      description: "All sins confessed with true contrition are completely forgiven"
    },
    {
      title: "Grace and Strength",
      description: "Receive actual grace to resist temptation and live virtuously"
    },
    {
      title: "Peace of Conscience",
      description: "Experience the peace that comes from knowing you are forgiven"
    },
    {
      title: "Spiritual Direction",
      description: "Receive guidance and advice for your spiritual journey"
    },
    {
      title: "Reconciliation",
      description: "Restore your relationship with God and the Church community"
    }
  ]

  const confessionRequirements = [
    {
      title: "Examination of Conscience",
      items: [
        "Reflect on your actions since last confession",
        "Consider how you have fallen short of God's love",
        "Review the Ten Commandments and Church teachings",
        "Ask the Holy Spirit for guidance",
        "Examine thoughts, words, and actions"
      ]
    },
    {
      title: "Contrition",
      items: [
        "Feel genuine sorrow for your sins",
        "Resolve to avoid sin in the future",
        "Trust in God's mercy and forgiveness",
        "Desire to make amends where possible",
        "Commit to change with God's grace"
      ]
    },
    {
      title: "Confession Process",
      items: [
        "Confess sins honestly and completely",
        "Start with time since last confession",
        "Listen to the priest's counsel",
        "Receive absolution gratefully",
        "Complete assigned penance"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Experience God's Mercy?",
    description: "Don't let fear or shame keep you from God's infinite mercy. Take the first step toward reconciliation and peace.",
    phone: getContactPhone(),
    email: getContactEmail()
  }

  const quote = {
    text: "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained",
    source: "John 20:22-23"
  }

  const confessionTimes = [
    { day: "Saturday", time: "5:00 PM - 5:45 PM", note: "Before Vigil Mass", popular: true },
    { day: "Sunday", time: "After 9:00 AM Mass", note: "Approximately 10:00 AM", popular: false },
    { day: "Wednesday", time: "7:00 PM - 7:30 PM", note: "After weekday Mass", popular: false },
    { day: "By Appointment", time: "Contact Parish Office", note: "Call 020 8852 7411", popular: false }
  ]

  const confessionSteps = [
    {
      step: 1,
      title: "Examination of Conscience",
      description: "Reflect on your actions, thoughts, and omissions since your last confession",
      icon: Shield,
      color: "bg-navy-600"
    },
    {
      step: 2,
      title: "Contrition",
      description: "Feel genuine sorrow for your sins and resolve to avoid sin in the future",
      icon: Heart,
      color: "bg-navy-700"
    },
    {
      step: 3,
      title: "Confession",
      description: "Confess your sins honestly and completely to the priest",
      icon: BookOpen,
      color: "bg-navy-800"
    },
    {
      step: 4,
      title: "Absolution",
      description: "The priest grants absolution in the name of the Father, Son, and Holy Spirit",
      icon: CheckCircle,
      color: "bg-navy-500"
    }
  ]

  // Scripture for Confession theme
  const confessionScripture = {
    verse: "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained.",
    reference: "John 20:22-23",
    theme: "forgiveness"
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
    
      <PageLayout
        title="Confession"
        description="Learn about the Sacrament of Confession at St Saviour's Catholic Church. Information on confession times, how to confess, and God's mercy."
        keywords="Catholic Confession, Reconciliation, Penance, Forgiveness, Absolution, Confession Times, Sacrament"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>Confession page loaded with interactive scheduling and examination guide</h1>
          <p>Use Alt+S to schedule confession, Alt+E for examination guide, Alt+A for analytics</p>
        </div>
        
        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
          <PageHero
            title="Sacrament of Confession"
            subtitle="God's Gift of Forgiveness"
            description="Experience God's infinite mercy and forgiveness through the sacrament of confession and reconciliation."
            backgroundImage={confessionImage?.url}
            height="large"
            overlay="medium"
            actions={
              <Flex justify="center" gap="md">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() => document.getElementById('confession-scheduler')?.scrollIntoView({ behavior: 'smooth' })}
                  onKeyDown={(e) => e.key === 's' && document.getElementById('confession-scheduler')?.focus()}
                >
                  Schedule Confession
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<BookOpen className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() => document.getElementById('examination-guide')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Examination Guide
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Sacrament Information with Enhanced Features */}
        <Section spacing="lg" background="slate" id="confession-info">
          <Container size="lg">
            <animated.div style={fadeInSpring}>
              <SacramentInfo
                icon={Heart}
                title="Reconciliation and Peace"
                subtitle="The sacrament of forgiveness and healing"
                content={confessionContent}
                quote={quote}
                effects={confessionEffects}
                requirements={confessionRequirements}
                effectsColor="green"
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
              <SacramentalScriptureSection
                pageTheme="confession"
                reducedMotion={reducedMotion}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>
        
        {/* Confession Scheduler */}
        <Section spacing="lg" background="slate" id="confession-scheduler">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Schedule Your Confession
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
                  Choose a convenient time for the sacrament of confession. No appointment 
                  necessary for scheduled times, but calling ahead is always welcome.
                </Text>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ConfessionScheduler times={confessionTimes} />
                <SacramentalAnalytics sacramentType="all" />
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Examination of Conscience Guide */}
        <Section spacing="lg" background="slate" id="examination-guide">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Examination of Conscience
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
                  Prepare your heart for confession with this guided examination of conscience. 
                  Reflect on your relationship with God, others, and yourself.
                </Text>
              </div>
              
              <ExaminationOfConscienceGuide />
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
                    Experience God's Infinite Mercy
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
                    No sin is too great for God's mercy. Come and experience the peace 
                    and joy that comes from knowing you are completely forgiven and loved.
                  </Text>
                  <Flex justify="center" gap="lg" wrap>
                    <m.a 
                      href="tel:020 8852 7411"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        📞 020 8852 7411
                      </Text>
                    </m.a>
                    <m.a 
                      href="mailto:info@stsaviourslewisham.org.uk"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        ✉️ info@stsaviourslewisham.org.uk
                      </Text>
                    </m.a>
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
                    Schedule Confession
                  </Button>
                </Link>
                
                <SocialSharingSystem
                  articleId="confession-page"
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title="Sacrament of Confession at St Saviour's"
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
              <li>Alt+S: Focus confession scheduler</li>
              <li>Alt+E: Focus examination guide</li>
              <li>Alt+A: Focus analytics</li>
              <li>Alt+C: Contact parish office</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    
  )
}

// Keyboard shortcuts for accessibility
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case 's':
          e.preventDefault()
          document.getElementById('confession-scheduler')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'e':
          e.preventDefault()
          document.getElementById('examination-guide')?.scrollIntoView({ behavior: 'smooth' })
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