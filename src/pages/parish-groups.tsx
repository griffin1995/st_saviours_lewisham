import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
import { prefersReducedMotion, cn } from '@/lib/utils'

export default function ParishGroups() {
  const reducedMotion = prefersReducedMotion()

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

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-4xl mx-auto mb-16"
          >
            <Heading level="h2" align="center" className="mb-6">
              Find Your Place in Our Community
            </Heading>
            <Text size="xl" align="center" color="muted" className="leading-relaxed">
              At St Saviour's, we believe that faith grows best in community. Our parish 
              groups offer opportunities to deepen your relationship with God, build 
              meaningful friendships, and serve others in need.
            </Text>
          </motion.div>

          <Grid cols={3} gap="lg">
            {benefits.map((benefit, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Parish Groups Grid */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <motion.div
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
          </motion.div>

          <Grid cols={2} gap="lg" className="md:grid-cols-2">
            {groups.map((group, index) => (
              <GroupCard
                key={group.name}
                {...group}
                className={cn(
                  "group",
                  reducedMotion ? "" : "animate-on-scroll"
                )}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Getting Involved */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <motion.div
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
          </motion.div>

          <Grid cols={3} gap="lg" className="mb-16">
            {steps.map((step, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </Grid>

          <motion.div
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
          </motion.div>
        </Container>
      </Section>

      {/* Weekly Schedule */}
      <Section spacing="lg" background="gray">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Weekly Schedule
            </Heading>
            <Text size="xl" align="center" color="muted">
              Quick overview of when our groups meet
            </Text>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="none" className="bg-white overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-4 bg-gray-50">
                  <Grid cols={3} gap="md" className="font-semibold text-gray-900">
                    <Text weight="bold">Day</Text>
                    <Text weight="bold">Group</Text>
                    <Text weight="bold">Time</Text>
                  </Grid>
                </div>
                {weeklySchedule.map((item, index) => (
                  <div key={index} className="px-6 py-4">
                    <Grid cols={3} gap="md">
                      <Text weight="medium">{item.day}</Text>
                      <Text color="muted">{item.group}</Text>
                      <Text color="muted">{item.time}</Text>
                    </Grid>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'