import React, { useState, useEffect, useCallback } from 'react'
import { m } from 'framer-motion'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { 
  Users, 
  BookOpen, 
  Music, 
  Heart, 
  Coffee, 
  Baby,
  Cross,
  Globe,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Grid,
  Flex,
  Container
} from '@/components/ui'
import { GroupCard } from '@/components/church'
import { EnhancedGroupCard, AnimatedWeeklySchedule } from '@/components/enhanced'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
// import { InteractiveMemberDirectory } from '@/components/enhanced/InteractiveMemberDirectory'
// import { VirtualGroupMeeting } from '@/components/enhanced/VirtualGroupMeeting'
// import { GroupRegistrationSystem } from '@/components/enhanced/GroupRegistrationSystem'
// import { GroupTestimonialsCarousel } from '@/components/enhanced/GroupTestimonialsCarousel'
// import { PrayerRequestIntegration } from '@/components/enhanced/PrayerRequestIntegration'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
// import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'
// import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { prefersReducedMotion, cn } from '@/lib/utils'
import { useUI, useActions } from '@/stores/churchStore'

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function ParishGroups() {
  const ui = useUI()
  const actions = useActions()
  const reducedMotion = prefersReducedMotion()
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [groupStats, setGroupStats] = useState<{[key: string]: {members: number, activities: number, engagement: number}}>({})
  const [registrationMode, setRegistrationMode] = useState(false)
  const [selectedGroupForReg, setSelectedGroupForReg] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareGroupData, setShareGroupData] = useState<any>(null)
  const [prayerRequestsOpen, setPrayerRequestsOpen] = useState(false)
  const { ref: analyticsRef, inView: analyticsInView } = useInView({ threshold: 0.3, triggerOnce: true })

  const groups = [
    {
      name: "St Vincent de Paul Society",
      icon: Heart,
      description: "Caring for those in need in our local community through practical support and friendship.",
      meetingTime: "2nd Wednesday, 7:30 PM",
      contact: "Contact parish office",
      activities: ["Food bank support", "Home visits", "Emergency assistance", "Befriending service"],
      openTo: "All parishioners",
      color: "red" as const
    },
    {
      name: "Parish Choir",
      icon: Music,
      description: "Leading worship through music at Sunday Mass and special celebrations.",
      meetingTime: "Thursdays, 7:00 PM",
      contact: "choir@saintsaviours.org.uk",
      activities: ["Sunday Mass music", "Christmas concerts", "Easter celebrations", "Weddings and funerals"],
      openTo: "All ages and abilities",
      color: "blue" as const
    },
    {
      name: "Scripture Study Group",
      icon: BookOpen,
      description: "Exploring God's word together through weekly Bible study and prayer.",
      meetingTime: "Tuesdays, 7:30 PM",
      contact: "scripture@saintsaviours.org.uk",
      activities: ["Weekly Bible study", "Lectio Divina", "Advent/Lent programs", "Book discussions"],
      openTo: "Adults",
      color: "green" as const
    },
    {
      name: "Youth Group",
      icon: Users,
      description: "Fun, friendship, and faith for young people aged 11-18.",
      meetingTime: "Sundays, 6:00 PM",
      contact: "youth@saintsaviours.org.uk",
      activities: ["Weekly meetings", "Social events", "Service projects", "Retreats"],
      openTo: "Ages 11-18",
      color: "purple" as const
    },
    {
      name: "Mother & Toddler Group",
      icon: Baby,
      description: "A welcoming space for parents and carers with young children to meet and socialize.",
      meetingTime: "Fridays, 10:00 AM",
      contact: "mothers@saintsaviours.org.uk",
      activities: ["Play sessions", "Coffee mornings", "Parenting support", "Children's activities"],
      openTo: "Parents with children 0-4",
      color: "pink" as const
    },
    {
      name: "Coffee After Mass",
      icon: Coffee,
      description: "Social time and community building after Sunday morning Mass.",
      meetingTime: "Sundays after 11:30 AM Mass",
      contact: "No registration needed",
      activities: ["Coffee and refreshments", "Community notices", "Newcomer welcomes", "Social chat"],
      openTo: "Everyone welcome",
      color: "amber" as const
    },
    {
      name: "Altar Servers",
      icon: Cross,
      description: "Young people assisting at Mass and developing leadership skills.",
      meetingTime: "Training monthly",
      contact: "servers@saintsaviours.org.uk",
      activities: ["Serving at Mass", "Special ceremonies", "Training sessions", "Social events"],
      openTo: "Ages 8-18",
      color: "indigo" as const
    },
    {
      name: "Justice & Peace Group",
      icon: Globe,
      description: "Working for social justice and care of creation in our world.",
      meetingTime: "1st Saturday, 10:00 AM",
      contact: "justice@saintsaviours.org.uk",
      activities: ["Advocacy campaigns", "Environmental projects", "Fair trade promotion", "Prayer for peace"],
      openTo: "All interested parishioners",
      color: "teal" as const
    }
  ]

  const weeklySchedule = [
    { day: "Tuesday", group: "Scripture Study Group", time: "7:30 PM" },
    { day: "Wednesday", group: "St Vincent de Paul Society", time: "7:30 PM (2nd Wed)" },
    { day: "Thursday", group: "Parish Choir", time: "7:00 PM" },
    { day: "Friday", group: "Mother & Toddler Group", time: "10:00 AM" },
    { day: "Saturday", group: "Justice & Peace Group", time: "10:00 AM (1st Sat)" },
    { day: "Sunday", group: "Coffee After Mass", time: "After 11:30 AM Mass" },
    { day: "Sunday", group: "Youth Group", time: "6:00 PM" }
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Grow in Faith",
      description: "Deepen your understanding of Scripture, prayer, and Catholic teaching through study and discussion."
    },
    {
      icon: Users,
      title: "Build Community", 
      description: "Form lasting friendships with fellow parishioners who share your values and commitment to faith."
    },
    {
      icon: Globe,
      title: "Serve Others",
      description: "Put your faith into action by serving those in need in our parish and the wider community."
    }
  ]

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to Parish Groups - find your place in our vibrant community',
      dismissible: true
    })
    
    // Load group statistics from localStorage
    const savedStats = localStorage.getItem('parish-group-stats')
    if (savedStats) {
      setGroupStats(JSON.parse(savedStats))
    }
  }, [])

  const handleGroupRegistration = useCallback((groupName: string) => {
    setSelectedGroupForReg(groupName)
    setRegistrationMode(true)
  }, [])

  const handleGroupShare = useCallback((group: any) => {
    setShareGroupData(group)
    setIsShareModalOpen(true)
  }, [])

  const handlePrayerRequest = useCallback((groupName: string) => {
    setSelectedGroup(groupName)
    setPrayerRequestsOpen(true)
  }, [])

  // React Spring animations
  const heroSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    config: ui.reducedMotion ? config.default : config.gentle
  })

  const analyticsSpring = useSpring({
    opacity: analyticsInView ? 1 : 0,
    transform: analyticsInView ? 'translateY(0px)' : 'translateY(50px)',
    config: ui.reducedMotion ? config.default : config.gentle,
    delay: 300
  })

  // Group engagement analytics data
  const groupEngagementData = {
    labels: groups.slice(0, 6).map(group => group.name.substring(0, 15) + '..'),
    datasets: [
      {
        label: 'Active Members',
        data: groups.slice(0, 6).map(group => groupStats[group.name]?.members || 0),
        backgroundColor: 'rgba(212, 175, 55, 0.6)',
        borderColor: '#d4af37',
        borderWidth: 1
      },
      {
        label: 'Monthly Activities',
        data: groups.slice(0, 6).map(group => groupStats[group.name]?.activities || 0),
        backgroundColor: 'rgba(26, 54, 93, 0.6)',
        borderColor: '#1a365d',
        borderWidth: 1
      }
    ]
  }

  const groupParticipationData = {
    labels: groups.map(group => group.name),
    datasets: [
      {
        data: groups.map(group => groupStats[group.name]?.engagement || 0),
        backgroundColor: [
          '#d4af37', '#1a365d', '#16a34a', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#be185d'
        ],
        borderWidth: 2
      }
    ]
  }

  const steps = [
    {
      number: 1,
      title: "Choose Your Interest",
      description: "Browse our groups and find one that matches your interests, schedule, and stage of life.",
      color: "bg-blue-600"
    },
    {
      number: 2,
      title: "Make Contact",
      description: "Reach out using the contact information provided or speak to someone after Mass.",
      color: "bg-green-600"
    },
    {
      number: 3,
      title: "Come Along",
      description: "Attend a meeting or event - most groups welcome visitors and new members at any time.",
      color: "bg-purple-600"
    }
  ]

  return (
    <PageLayout
      title="Parish Groups"
      description="Join one of our many parish groups at St Saviour's Catholic Church. Find community, grow in faith, and serve others through our various ministries."
      keywords="Parish Groups, Catholic Community, Church Ministries, Volunteer, Bible Study, Choir, Youth Group, St Vincent de Paul"
    >
      {/* Hero Section */}
      <PageHero
        title="Parish Groups & Ministries"
        subtitle="Get Involved"
        description="Join our vibrant community through one of our many parish groups and ministries."
        backgroundImage="/images/hero/community-gathering.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Users className="h-5 w-5" />}
            >
              Join a Group
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Contact Us
            </Button>
          </Flex>
        }
      />

      {/* Scripture Inspiration Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Called to Community
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Where faith grows through fellowship and service to one another
              </p>
            </m.div>
            
            <div className="max-w-4xl mx-auto">
              <ScriptureCard
                displayMode="themed"
                theme="community"
                showReflection={true}
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <animated.div style={heroSpring} className="text-center space-y-8 max-w-4xl mx-auto mb-16">
            <Heading level="h2" align="center" className="mb-6">
              Find Your Place in Our Community
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              At St Saviour's, we believe that faith grows best in community. Our parish 
              groups offer opportunities to deepen your relationship with God, build 
              meaningful friendships, and serve others in need.
            </Text>
          </animated.div>

          <Grid cols={3} gap="lg">
            {benefits.map((benefit, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="default" padding="lg" className="text-center h-full bg-white">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center mx-auto">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <Heading level="h3" align="center" className="font-semibold">
                        {benefit.title}
                      </Heading>
                      <Text color="muted" align="center">
                        {benefit.description}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Group Engagement Analytics */}
      {analyticsInView && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <animated.div ref={analyticsRef} style={analyticsSpring}>
              <div className="text-center mb-12">
                <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                  Community Engagement & Growth
                  <m.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ width: '220px' }}
                  />
                </h2>
                <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                  See how our parish groups are thriving and growing together in faith
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Group Activity & Membership
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={groupEngagementData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: { color: '#374151' }
                            }
                          },
                          scales: {
                            x: {
                              ticks: { color: '#374151' },
                              grid: { color: 'rgba(55, 65, 81, 0.1)' }
                            },
                            y: {
                              ticks: { color: '#374151' },
                              grid: { color: 'rgba(55, 65, 81, 0.1)' }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white shadow-lg">
                  <CardContent>
                    <h3 className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}>
                      Participation Levels
                    </h3>
                    <div className="h-64">
                      <Pie
                        data={groupParticipationData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: { color: '#374151' }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </animated.div>
        </Container>
      </Section>
      )}

      {/* Interactive Member Directory */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Connect with Group Leaders
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '180px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Meet the dedicated volunteers who lead our vibrant parish groups
              </p>
            </m.div>
            
            {/* <InteractiveMemberDirectory
              groups={groups}
              onContactLeader={(group, leader) => {
                actions.addNotification({
                  type: 'info',
                  message: `Contact details for ${leader.name} from ${group.name} copied to clipboard!`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Virtual Group Meetings */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                Join Virtual Gatherings
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '160px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Can't attend in person? Join our groups online for prayer, study, and fellowship
              </p>
            </m.div>
            
            {/* <VirtualGroupMeeting
              groups={groups}
              onJoinMeeting={(group, meetingId) => {
                actions.addNotification({
                  type: 'success',
                  message: `Joining ${group.name} virtual meeting...`,
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Group Registration System */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Easy Group Registration
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '160px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Sign up for groups quickly and securely with our streamlined registration process
              </p>
            </m.div>
            
            {/* <GroupRegistrationSystem
              groups={groups}
              selectedGroup={selectedGroupForReg}
              isOpen={registrationMode}
              onClose={() => setRegistrationMode(false)}
              onRegister={(groupName, memberData) => {
                actions.addNotification({
                  type: 'success',
                  message: `Welcome to ${groupName}! You'll receive a confirmation email shortly.`,
                  dismissible: true
                })
                setRegistrationMode(false)
              }}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Parish Groups Grid */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Our Parish Groups
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Whether you're looking for spiritual growth, community service, or 
              social connection, there's a place for you.
            </Text>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groups.map((group, index) => (
              <EnhancedGroupCard
                key={group.name}
                group={group}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Getting Involved */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Ready to Get Involved?
            </Heading>
            <Text size="xl" align="center" color="muted">
              Joining a parish group is easy and everyone is welcome, regardless 
              of how long you've been part of our community.
            </Text>
          </m.div>

          <Grid cols={3} gap="lg" className="mb-16">
            {steps.map((step, index) => (
              <m.div
                key={index}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto`}>
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <Heading level="h3" align="center" className="font-semibold">
                  {step.title}
                </Heading>
                <Text size="sm" align="center" color="muted">
                  {step.description}
                </Text>
              </m.div>
            ))}
          </Grid>

          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="bg-slate-900 text-white">
              <CardContent>
                <div className="text-center space-y-6">
                  <Heading level="h3" align="center" className="text-2xl font-semibold text-gold-400">
                    Don't See What You're Looking For?
                  </Heading>
                  <Text align="center" className="text-gray-300 max-w-2xl mx-auto">
                    We're always open to starting new groups based on the interests and 
                    needs of our parishioners. Have an idea for a new ministry or group? 
                    We'd love to hear from you.
                  </Text>
                  <Flex justify="center" gap="md" className="pt-4" wrap>
                    <Link href="/contact-us">
                      <Button 
                        variant="primary" 
                        size="lg"
                        rightIcon={<ArrowRight className="h-5 w-5" />}
                      >
                        Contact Us
                      </Button>
                    </Link>
                    <a href="tel:+442088527411">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        leftIcon={<Phone className="h-5 w-5" />}
                      >
                        Call: 020 8852 7411
                      </Button>
                    </a>
                  </Flex>
                </div>
              </CardContent>
            </Card>
          </m.div>
        </Container>
      </Section>

      {/* Group Testimonials */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-slate-900 mb-6 relative`}>
                Stories from Our Community
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '180px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}>
                Hear how parish groups have enriched the faith journeys of our community members
              </p>
            </m.div>
            
            {/* <GroupTestimonialsCarousel
              groups={groups}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Prayer Request Integration */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Pray for Each Other
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: '140px' }}
                />
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}>
                Share prayer requests within your groups and lift each other up in faith
              </p>
            </m.div>
            
            {/* <PrayerRequestIntegration
              groups={groups}
              selectedGroup={selectedGroup}
              isOpen={prayerRequestsOpen}
              onClose={() => setPrayerRequestsOpen(false)}
              onSubmitRequest={(groupName, request) => {
                actions.addNotification({
                  type: 'success',
                  message: `Prayer request shared with ${groupName}. Our community will pray for you.`,
                  dismissible: true
                })
                setPrayerRequestsOpen(false)
              }}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Weekly Schedule */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <AnimatedWeeklySchedule
            schedule={weeklySchedule}
            reducedMotion={reducedMotion}
          />
        </Container>
      </Section>

      {/* Social Sharing Modal */}
      <SocialSharingSystem
        articleId="parish-groups"
        title="Parish Groups at St Saviour's"
        url="https://stsaviourlewisham.org.uk/parish-groups"
      />

      {/* Performance Monitor */}
      {/* <PerformanceMonitor
        pageName="Parish Groups"
        trackLoadTimes={true}
        trackInteractions={true}
        trackEngagement={true}
        onPerformanceData={(data) => {
          console.log('Parish Groups performance:', data)
        }}
      /> */}

      {/* Accessibility Enhancer */}
      {/* <AccessibilityEnhancer
        keyboardNavigation={{
          enableArrowKeys: true,
          enableTabNavigation: true,
          enableEnterKey: true,
          onKeyPress: (key, target) => {
            if (key === 'Enter' && target?.dataset.groupName) {
              handleGroupRegistration(target.dataset.groupName)
            }
          }
        }}
        screenReaderSupport={{
          announcePageChanges: true,
          announceFormValidation: true,
          provideFocusIndicators: true
        }}
        contrastEnhancement={{
          enableHighContrast: ui.highContrast,
          enableFocusVisible: true
        }}
      /> */}
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'