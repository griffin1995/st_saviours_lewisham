import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { useSpring as useReactSpring, animated, useTrail as useReactTrail } from '@react-spring/web'
import { 
  HandRaisedIcon as HandRaised, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  HeartIcon as Heart, 
  UserGroupIcon as Users, 
  ArrowRightIcon as ArrowRight, 
  StarIcon as Star,
  PlusIcon as Plus,
  CheckCircleIcon as CheckCircle,
  ClockIcon as Clock,
  BellIcon as Bell,
  MapPinIcon as MapPin,
  InformationCircleIcon as InfoCircle,
  ExclamationTriangleIcon as Warning,
  ChatBubbleLeftRightIcon as Chat,
  SparklesIcon as Sparkles,
  LightBulbIcon as LightBulb,
  ChartBarIcon as ChartBar,
  EyeIcon as Eye,
  KeyIcon as Key,
  SunIcon as Sun,
  CloudIcon as Cloud,
  FireIcon as Fire,
  AcademicCapIcon as Academic,
  ScaleIcon as Scale,
  ShieldCheckIcon as Shield
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

// Enhanced Components for Holy Orders
interface VocationStage {
  title: string
  description: string
  duration: string
  requirements: string[]
  icon: any
}

const VocationDiscernmentTracker = ({ stages }: { stages: VocationStage[] }) => {
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [isDiscerning, setIsDiscerning] = useState(false)
  const reducedMotion = prefersReducedMotion()

  const springProps = useReactSpring({
    transform: isDiscerning ? 'scale(1.05)' : 'scale(1)',
    backgroundColor: isDiscerning ? '#d4af37' : '#059669',
    config: { tension: 300, friction: 20 }
  })

  const trailProps = useReactTrail(stages.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  })

  const markStageComplete = (stageIndex: number) => {
    if (!completedStages.includes(stageIndex)) {
      setCompletedStages([...completedStages, stageIndex])
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Academic className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Vocation Discernment Journey
          </Heading>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-6">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                completedStages.includes(index) ? 'bg-green-500 text-white' : 
                index <= currentStage ? 'bg-gold-500 text-slate-900' : 'bg-slate-700 text-gray-300'
              }`}>
                {completedStages.includes(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < stages.length - 1 && (
                <div className={`w-8 h-1 mx-2 transition-all ${
                  completedStages.includes(index) ? 'bg-green-500' : 
                  index < currentStage ? 'bg-gold-500' : 'bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Current Stage */}
        <m.div
          key={currentStage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            {React.createElement(stages[currentStage].icon, {
              className: "h-6 w-6 text-gold-500"
            })}
            <Heading level="h4" className="text-lg font-semibold text-white">
              {stages[currentStage].title}
            </Heading>
          </div>
          
          <Text className="text-gray-300 leading-relaxed">
            {stages[currentStage].description}
          </Text>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gold-500" />
              <Text className="text-sm font-semibold text-gold-500">
                Duration: {stages[currentStage].duration}
              </Text>
            </div>
            <div className="space-y-2">
              <Text className="text-sm font-semibold text-white">Requirements:</Text>
              <ul className="space-y-1">
                {stages[currentStage].requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Stage Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => markStageComplete(currentStage)}
              disabled={completedStages.includes(currentStage)}
              className={`${
                completedStages.includes(currentStage) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gold-500 text-slate-900 hover:bg-gold-600'
              }`}
              leftIcon={<CheckCircle className="h-4 w-4" />}
            >
              {completedStages.includes(currentStage) ? 'Stage Complete' : 'Mark Complete'}
            </Button>
            
            <Button
              onClick={() => setIsDiscerning(!isDiscerning)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
              leftIcon={<Heart className="h-4 w-4" />}
            >
              {isDiscerning ? 'Discerning...' : 'Begin Discernment'}
            </Button>
          </div>
        </m.div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
            disabled={currentStage === 0}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-slate-900"
          >
            Previous
          </Button>
          <div className="text-sm text-gray-400">
            Stage {currentStage + 1} of {stages.length}
          </div>
          <Button
            onClick={() => setCurrentStage(Math.min(stages.length - 1, currentStage + 1))}
            disabled={currentStage === stages.length - 1}
            className="bg-gold-500 text-slate-900 hover:bg-gold-600"
          >
            Next
          </Button>
        </div>
        
        {/* Completion Message */}
        {completedStages.length === stages.length && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <Text className="text-sm font-semibold text-green-400">
                Discernment Journey Complete!
              </Text>
            </div>
            <Text className="text-sm text-gray-300">
              You've completed all stages of discernment. Consider scheduling a meeting with your vocations director to discuss the next steps.
            </Text>
          </m.div>
        )}
      </div>
    </div>
  )
}

const SeminaryFormationGuide = () => {
  const [selectedTrack, setSelectedTrack] = useState<'diocesan' | 'religious'>('diocesan')
  const [yearLevel, setYearLevel] = useState(1)
  const reducedMotion = prefersReducedMotion()

  const formationTracks = {
    diocesan: {
      title: "Diocesan Priesthood",
      description: "Formation for priests who serve in parishes and diocesan ministries",
      duration: "8 years",
      stages: [
        {
          year: 1,
          title: "Pre-Theology",
          focus: "Philosophy and Liberal Arts",
          courses: ["Philosophy of Being", "Logic", "Ethics", "Church History"],
          spiritual: "Basic prayer life and spiritual direction"
        },
        {
          year: 2,
          title: "Pre-Theology",
          focus: "Advanced Philosophy",
          courses: ["Philosophy of God", "Philosophy of Man", "Social Ethics", "Latin"],
          spiritual: "Deepening prayer and community life"
        },
        {
          year: 3,
          title: "Theology I",
          focus: "Fundamental Theology",
          courses: ["Sacred Scripture", "Dogmatic Theology", "Moral Theology", "Liturgy"],
          spiritual: "Introduction to priestly spirituality"
        },
        {
          year: 4,
          title: "Theology II",
          focus: "Systematic Theology",
          courses: ["Sacraments", "Christology", "Ecclesiology", "Canon Law"],
          spiritual: "Pastoral formation and field experience"
        },
        {
          year: 5,
          title: "Theology III",
          focus: "Pastoral Theology",
          courses: ["Pastoral Care", "Preaching", "Administration", "Counseling"],
          spiritual: "Advanced spiritual direction"
        },
        {
          year: 6,
          title: "Theology IV",
          focus: "Pastoral Internship",
          courses: ["Parish Ministry", "Advanced Preaching", "Thesis", "Comprehensive Exams"],
          spiritual: "Preparation for ordination"
        }
      ]
    },
    religious: {
      title: "Religious Priesthood",
      description: "Formation for priests who serve in religious communities",
      duration: "10-12 years",
      stages: [
        {
          year: 1,
          title: "Postulancy",
          focus: "Initial Formation",
          courses: ["Religious Life", "Community Living", "Basic Theology", "Spirituality"],
          spiritual: "Discernment and basic formation"
        },
        {
          year: 2,
          title: "Novitiate",
          focus: "Religious Formation",
          courses: ["Vows", "Charism", "Rule of Life", "Prayer"],
          spiritual: "Intensive spiritual formation"
        },
        {
          year: 3,
          title: "Simple Vows",
          focus: "Academic Preparation",
          courses: ["Philosophy", "Theology", "Liberal Arts", "Languages"],
          spiritual: "Living the vows in community"
        },
        {
          year: 4,
          title: "Theological Studies",
          focus: "Sacred Studies",
          courses: ["Scripture", "Dogma", "Morals", "Liturgy"],
          spiritual: "Deepening religious life"
        },
        {
          year: 5,
          title: "Pastoral Formation",
          focus: "Ministry Training",
          courses: ["Pastoral Care", "Preaching", "Sacraments", "Counseling"],
          spiritual: "Apostolic formation"
        },
        {
          year: 6,
          title: "Final Vows",
          focus: "Ordination Preparation",
          courses: ["Advanced Theology", "Thesis", "Comprehensive Exams", "Canon Law"],
          spiritual: "Final preparation for priesthood"
        }
      ]
    }
  }

  const currentTrack = formationTracks[selectedTrack]
  const currentYear = currentTrack.stages[yearLevel - 1]

  const springProps = useReactSpring({
    transform: `translateX(${selectedTrack === 'diocesan' ? '0%' : '100%'})`,
    config: { tension: 300, friction: 30 }
  })

  return (
    <animated.div style={springProps} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Seminary Formation Guide
          </Heading>
        </div>
        
        {/* Track Selection */}
        <div className="space-y-4">
          <Text className="text-sm font-semibold text-gold-500 uppercase tracking-wide">
            Formation Track:
          </Text>
          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedTrack('diocesan')}
              className={`${
                selectedTrack === 'diocesan' 
                  ? 'bg-gold-500 text-slate-900' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Diocesan Priesthood
            </Button>
            <Button
              onClick={() => setSelectedTrack('religious')}
              className={`${
                selectedTrack === 'religious' 
                  ? 'bg-gold-500 text-slate-900' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Religious Priesthood
            </Button>
          </div>
        </div>
        
        {/* Track Information */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <Heading level="h4" className="text-lg font-semibold text-white mb-2">
            {currentTrack.title}
          </Heading>
          <Text className="text-gray-300 mb-3">{currentTrack.description}</Text>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold-500" />
            <Text className="text-sm text-gold-500 font-semibold">
              Duration: {currentTrack.duration}
            </Text>
          </div>
        </div>
        
        {/* Year Selection */}
        <div className="space-y-4">
          <Text className="text-sm font-semibold text-gold-500 uppercase tracking-wide">
            Formation Year:
          </Text>
          <div className="flex flex-wrap gap-2">
            {currentTrack.stages.map((_, index) => (
              <Button
                key={index}
                onClick={() => setYearLevel(index + 1)}
                className={`${
                  yearLevel === index + 1 
                    ? 'bg-gold-500 text-slate-900' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Year {index + 1}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Current Year Details */}
        <m.div
          key={yearLevel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-slate-800/50 rounded-lg p-4">
            <Heading level="h4" className="text-lg font-semibold text-white mb-2">
              {currentYear.title} - {currentYear.focus}
            </Heading>
            
            <div className="space-y-4">
              <div>
                <Text className="text-sm font-semibold text-gold-500 mb-2">Academic Courses:</Text>
                <div className="grid grid-cols-2 gap-2">
                  {currentYear.courses.map((course, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <BookOpen className="h-3 w-3 text-gold-500" />
                      {course}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Text className="text-sm font-semibold text-gold-500 mb-2">Spiritual Formation:</Text>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Heart className="h-3 w-3 text-gold-500" />
                  {currentYear.spiritual}
                </div>
              </div>
            </div>
          </div>
        </m.div>
        
        {/* Contact Information */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <InfoCircle className="h-5 w-5 text-blue-400" />
            <Text className="text-sm font-semibold text-blue-400">
              Vocations Information
            </Text>
          </div>
          <Text className="text-sm text-gray-300">
            For more information about seminary formation and vocations, contact your diocesan vocations director or speak with your parish priest.
          </Text>
        </div>
      </div>
    </animated.div>
  )
}

export default function HolyOrders() {
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

  const holyOrdersContent = [
    "Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church. It includes three degrees: episcopate (bishops), presbyterate (priests), and diaconate (deacons).",
    "This sacrament confers a sacred power for the service of the faithful. Those who receive Holy Orders are consecrated in Christ's name to feed the Church with the Word and grace of God, becoming shepherds, teachers, and sanctifiers.",
    "The call to Holy Orders is a divine vocation requiring careful discernment, extensive formation, and lifelong commitment to serving God's people with humility and love."
  ]

  const holyOrdersEffects = [
    {
      title: "Sacred Character",
      description: "Imprints an indelible spiritual character that configures the man to Christ the priest"
    },
    {
      title: "Sacred Power",
      description: "Confers the power to celebrate sacraments and shepherd God's people"
    },
    {
      title: "Grace of State",
      description: "Provides special graces needed to fulfill the duties of ordained ministry"
    },
    {
      title: "Configuration to Christ",
      description: "The ordained person acts in the person of Christ the head of the Church"
    },
    {
      title: "Servant Leadership",
      description: "Called to serve the Church with humility following Christ's example"
    }
  ]

  const holyOrdersRequirements = [
    {
      title: "Divine Call",
      items: [
        "Clear sense of calling from God to serve",
        "Discernment through prayer and spiritual direction",
        "Recognition by the Church community",
        "Acceptance by the bishop after thorough evaluation",
        "Internal conviction of being chosen by God"
      ]
    },
    {
      title: "Personal Qualifications",
      items: [
        "Baptized Catholic male in good standing",
        "Sound physical and mental health",
        "Good moral character and reputation",
        "Ability to relate well to people",
        "Commitment to lifelong service"
      ]
    },
    {
      title: "Formation Process",
      items: [
        "Seminary education (6-8 years for priests)",
        "Academic studies in theology and philosophy",
        "Spiritual formation and prayer life",
        "Pastoral training and experience",
        "Human development and psychological readiness"
      ]
    }
  ]

  const vocationStages: VocationStage[] = [
    {
      title: "Initial Inquiry",
      description: "Begin exploring the possibility of a vocation through prayer and conversation.",
      duration: "3-6 months",
      requirements: [
        "Regular prayer and Mass attendance",
        "Speak with parish priest or spiritual director",
        "Read about priesthood and religious life",
        "Attend vocation events and retreats"
      ],
      icon: LightBulb
    },
    {
      title: "Formal Discernment",
      description: "Enter a structured discernment process with vocations director.",
      duration: "6-12 months",
      requirements: [
        "Meet regularly with vocations director",
        "Complete psychological evaluation",
        "Obtain academic transcripts",
        "Participate in Come and See programs"
      ],
      icon: Scale
    },
    {
      title: "Seminary Application",
      description: "Apply to seminary for philosophical and theological formation.",
      duration: "3-6 months",
      requirements: [
        "Complete application forms",
        "Provide letters of recommendation",
        "Undergo medical examination",
        "Pass academic and psychological assessments"
      ],
      icon: Academic
    },
    {
      title: "Seminary Formation",
      description: "Begin academic, spiritual, pastoral, and human formation.",
      duration: "6-8 years",
      requirements: [
        "Complete philosophical studies",
        "Study systematic theology",
        "Participate in pastoral assignments",
        "Maintain spiritual discipline"
      ],
      icon: BookOpen
    },
    {
      title: "Ordination Preparation",
      description: "Final preparation for ordination as deacon and priest.",
      duration: "1-2 years",
      requirements: [
        "Complete comprehensive exams",
        "Demonstrate pastoral competency",
        "Receive bishop's approval",
        "Prepare for lifelong commitment"
      ],
      icon: CheckCircle
    }
  ]

  const quote = {
    text: "It was not you who chose me, but I who chose you and appointed you to go and bear fruit that will remain",
    source: "John 15:16"
  }

  const holyOrdersDegrees = [
    {
      title: "Bishops",
      subtitle: "Episcopate",
      description: "Bishops possess the fullness of the sacrament of Holy Orders. They are the successors of the apostles and have the authority to ordain priests and deacons, confirm the faithful, and govern dioceses.",
      icon: Star,
      color: "bg-navy-600",
      responsibilities: [
        "Teaching and preaching",
        "Sanctifying through sacraments", 
        "Governing the diocese",
        "Ordaining clergy"
      ],
      symbol: "Ring, mitre, and pastoral staff representing their office"
    },
    {
      title: "Priests", 
      subtitle: "Presbyterate",
      description: "Priests are co-workers with bishops in the apostolic ministry. They celebrate Mass, hear confessions, perform baptisms and marriages, anoint the sick, and shepherd the faithful in parishes.",
      icon: Plus,
      color: "bg-blue-600",
      responsibilities: [
        "Celebrating Mass and sacraments",
        "Preaching and teaching",
        "Pastoral care of parishioners", 
        "Leading parish communities"
      ],
      symbol: "Stole and chasuble, representing the yoke of Christ"
    },
    {
      title: "Deacons",
      subtitle: "Diaconate", 
      description: "Deacons are ordained for service and assist bishops and priests. They can baptize, preach, distribute Communion, witness marriages, and have a special ministry to the poor and marginalized.",
      icon: HandRaised,
      color: "bg-green-600",
      responsibilities: [
        "Baptizing and preaching",
        "Distributing Communion",
        "Witnessing marriages",
        "Works of charity and justice"
      ],
      symbol: "Dalmatic and stole worn over the left shoulder"
    }
  ]

  // Scripture for Holy Orders theme
  const holyOrdersScripture = {
    verse: "It was not you who chose me, but I who chose you and appointed you to go and bear fruit that will remain.",
    reference: "John 15:16",
    theme: "calling"
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
        title="Holy Orders"
        description="Learn about the Sacrament of Holy Orders at St Saviour's Catholic Church. Information on priesthood, diaconate, and religious vocations."
        keywords="Holy Orders, Ordination, Priest, Bishop, Deacon, Catholic Sacrament, Vocation, Ministry, Seminary"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>Holy Orders page loaded with vocation discernment tracker and seminary formation guide</h1>
          <p>Use Alt+V to access vocation discernment, Alt+S for seminary guide, Alt+A for analytics</p>
        </div>
        
        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
          <PageHero
            title="Holy Orders"
            subtitle="Sacrament of Service"
            description="Through Holy Orders, men are consecrated to serve God and his people as bishops, priests, and deacons."
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
                  onClick={() => document.getElementById('vocation-discernment')?.scrollIntoView({ behavior: 'smooth' })}
                  onKeyDown={(e) => e.key === 'v' && document.getElementById('vocation-discernment')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Your Vocation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<BookOpen className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() => document.getElementById('seminary-guide')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Seminary Guide
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Sacrament Information with Enhanced Features */}
        <Section spacing="lg" background="slate" id="holy-orders-info">
          <Container size="lg">
            <animated.div style={fadeInSpring}>
              <SacramentInfo
                icon={HandRaised}
                title="Called to Serve"
                subtitle="Sacrament that consecrates men to serve the Church"
                content={holyOrdersContent}
                quote={quote}
                effects={holyOrdersEffects}
                requirements={holyOrdersRequirements}
                effectsColor="indigo"
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
                theme={holyOrdersScripture.theme}
                showAudio={true}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>
        
        {/* Vocation Discernment Tracker */}
        <Section spacing="lg" background="slate" id="vocation-discernment">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Vocation Discernment Journey
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
                  Follow the stages of vocation discernment from initial inquiry to 
                  ordination. Each stage builds upon the previous one in your journey of service.
                </Text>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <VocationDiscernmentTracker stages={vocationStages} />
                <SacramentalAnalytics sacramentType="all" />
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Seminary Formation Guide */}
        <Section spacing="lg" background="slate" id="seminary-guide">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Seminary Formation Guide
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
                  Understand the comprehensive formation process for diocesan and religious 
                  priesthood, including academic, spiritual, and pastoral components.
                </Text>
              </div>
              
              <SeminaryFormationGuide />
            </div>
          </Container>
        </Section>

        {/* Holy Orders Degrees */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading level="h2" className="text-3xl font-light text-white text-center">
                    Three Degrees of Holy Orders
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
                  The sacrament of Holy Orders includes three degrees: bishops, priests, and deacons. 
                  Each has distinct roles and responsibilities in serving God's people.
                </Text>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {holyOrdersDegrees.map((degree, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600 hover:border-white transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          {React.createElement(degree.icon, {
                            className: "h-6 w-6 text-slate-900"
                          })}
                        </div>
                        <div>
                          <Heading level="h3" className="text-xl font-semibold text-white">
                            {degree.title}
                          </Heading>
                          <Text className="text-sm text-gold-500">{degree.subtitle}</Text>
                        </div>
                      </div>
                      
                      <Text className="text-gray-300 leading-relaxed">
                        {degree.description}
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-sm font-semibold text-gold-500 uppercase tracking-wide">
                          Key Responsibilities:
                        </Text>
                        <ul className="space-y-2">
                          {degree.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-600">
                        <Text className="text-xs text-gray-400">
                          <strong>Symbol:</strong> {degree.symbol}
                        </Text>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
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
                    Pray for Vocations
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
                    Please pray for vocations to the priesthood and diaconate. The Church needs holy men 
                    to serve God's people and continue Christ's mission in the world.
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
                    Explore Your Vocation
                  </Button>
                </Link>
                
                <SocialSharingSystem
                  articleId="holy-orders-page"
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title="Holy Orders at St Saviour's"
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
              <li>Alt+V: Focus vocation discernment tracker</li>
              <li>Alt+S: Focus seminary formation guide</li>
              <li>Alt+A: Focus analytics</li>
              <li>Alt+C: Contact vocations office</li>
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
        case 'v':
          e.preventDefault()
          document.getElementById('vocation-discernment')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 's':
          e.preventDefault()
          document.getElementById('seminary-guide')?.scrollIntoView({ behavior: 'smooth' })
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