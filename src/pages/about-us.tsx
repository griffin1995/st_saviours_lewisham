import React from 'react'
import { motion } from 'framer-motion'
import { 
  HomeModernIcon as Church, 
  HeartIcon as Heart, 
  UserGroupIcon as Users, 
  AcademicCapIcon as BookOpen, 
  CalendarDaysIcon as Calendar, 
  SparklesIcon as Star, 
  TrophyIcon as Award, 
  ClockIcon as Clock, 
  EnvelopeIcon as Mail, 
  PhoneIcon as Phone 
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
  Grid,
  Flex,
  Container
} from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

export default function AboutUs() {
  const reducedMotion = prefersReducedMotion()

  // Data arrays for cleaner code
  const stats = [
    { number: "135+", label: "Years of Service", icon: Calendar },
    { number: "500+", label: "Families", icon: Users },
    { number: "7", label: "Weekly Masses", icon: Clock },
    { number: "15+", label: "Parish Groups", icon: Star }
  ]

  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "We strive to show Christ's love through our actions and care for one another.",
      gradient: "from-navy-600 to-navy-500"
    },
    {
      icon: Users,
      title: "Community", 
      description: "We welcome all people and build meaningful relationships across generations.",
      gradient: "from-navy-500 to-navy-400"
    },
    {
      icon: Church,
      title: "Worship",
      description: "We gather to celebrate the Eucharist and grow in our relationship with God.",
      gradient: "from-navy-700 to-navy-600"
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "We are committed to ongoing formation and deepening our understanding of faith.",
      gradient: "from-navy-800 to-navy-700"
    }
  ]

  const milestones = [
    { year: "1889", event: "Parish established", icon: Church },
    { year: "1902", event: "Current church building consecrated", icon: Award },
    { year: "1965", event: "Parish school opened", icon: BookOpen },
    { year: "2010", event: "Major restoration completed", icon: Star },
    { year: "2025", event: "Serving over 500 families", icon: Heart }
  ]

  const leadership = [
    {
      name: "Fr. Krzysztof Krzyskow",
      role: "Parish Priest",
      description: "Leading our parish with wisdom and compassion, Fr. Krzysztof brings years of pastoral experience to guide our community in faith and service.",
      icon: Church
    },
    {
      name: "Revd. Carlos Lozano", 
      role: "Associate Priest",
      description: "Supporting our parish ministries and outreach programs, Revd. Carlos brings energy and dedication to serving our diverse community.",
      icon: BookOpen
    }
  ]

  return (
    <PageLayout
      title="About Us"
      description="Learn about St Saviour's Catholic Church in Lewisham - our history, mission, and vibrant community serving South East London."
      keywords="About St Saviours, Catholic Church Lewisham, Parish History, Community, Mission, Values"
      background="white"
    >
      {/* Hero Section */}
      <PageHero
        title="About St Saviour's"
        subtitle="Our Community"
        description="A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace."
        pageName="about-us"
        height="large"
        overlay="medium"
      />

      {/* Statistics Section */}
      <Section spacing="md" background="slate">
        <Grid cols={4} gap="lg">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 icon-container-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <stat.icon className="h-8 w-8 text-black" />
              </div>
              <Heading level="h3" color="white" className="text-3xl lg:text-4xl font-bold mb-2">
                {stat.number}
              </Heading>
              <Text color="white" weight="medium">
                {stat.label}
              </Text>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Mission Statement */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 icon-container-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Church className="h-10 w-10 text-black" />
            </div>
            
            <Heading level="h2" color="white" align="center" className="mb-8">
              Our Mission
            </Heading>
            
            <Text size="xl" align="center" className="lg:text-2xl max-w-4xl mx-auto">
              St Saviour's Catholic Church exists to be a beacon of hope and faith in Lewisham, 
              where all people can encounter the transforming love of Jesus Christ and grow 
              together as a community of believers.
            </Text>
          </motion.div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section spacing="lg" background="slate">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level="h2" color="white" align="center" className="mb-6">
            Our Values
          </Heading>
          <Text size="xl" align="center" color="white">
            These core values guide everything we do as a parish community.
          </Text>
        </motion.div>

        <Grid cols={4} gap="lg">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card variant="default" padding="lg" className="h-full border border-slate-600 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 icon-container-white rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="h-10 w-10 text-black" />
                    </div>
                    <Heading level="h3" color="white" align="center" className="text-xl font-bold">
                      {value.title}
                    </Heading>
                    <Text color="white" align="center">
                      {value.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* History Section */}
      <Section spacing="lg" background="slate">
        <Grid cols={2} gap="xl">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Heading level="h2" color="white">Our Rich History</Heading>
            
            <div className="space-y-6">
              <Text color="white" size="lg">
                St Saviour's Catholic Church has been serving the Lewisham community since 1889, 
                when it was first established to meet the spiritual needs of the growing Catholic 
                population in South East London.
              </Text>
              <Text color="white" size="lg">
                Over the decades, our parish has grown and evolved, but our commitment to providing 
                a welcoming spiritual home for all has remained constant. We have weathered challenges, 
                celebrated joys, and continued to be a source of hope and faith for generations of families.
              </Text>
              <Text color="white" size="lg">
                Today, we are proud to be part of the Roman Catholic Archdiocese of Southwark, 
                continuing our mission to serve God and our local community with dedication and love.
              </Text>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" padding="lg" className="border border-slate-600 bg-white/10 backdrop-blur-sm">
              <CardContent>
                <Flex align="center" className="mb-8">
                  <Calendar className="h-6 w-6 text-white mr-3" />
                  <Heading level="h3" color="white" className="text-2xl font-bold">
                    Key Milestones
                  </Heading>
                </Flex>
                
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={reducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Flex align="center" gap="md" className="group">
                        <div className="w-12 h-12 icon-container-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <milestone.icon className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <Text color="white" weight="bold" className="text-lg">
                            {milestone.year}
                          </Text>
                          <Text color="white">
                            {milestone.event}
                          </Text>
                        </div>
                      </Flex>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Section>

      {/* Leadership Section */}
      <Section spacing="lg" background="slate">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level="h2" color="white" align="center" className="mb-6">
            Our Leadership
          </Heading>
          <Text size="xl" align="center" color="white">
            Meet the dedicated team who guide our parish community.
          </Text>
        </motion.div>

        <Grid cols={2} gap="lg">
          {leadership.map((leader, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card variant="default" padding="lg" className="text-center border border-gray-700 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="space-y-6">
                    <div className="w-24 h-24 icon-container-white rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <leader.icon className="h-12 w-12 text-black" />
                    </div>
                    <div>
                      <Heading level="h3" color="white" align="center" className="text-2xl font-bold mb-2">
                        {leader.name}
                      </Heading>
                      <Text color="white" weight="semibold" align="center" className="text-lg mb-6 opacity-80">
                        {leader.role}
                      </Text>
                    </div>
                    <Text color="white" align="center">
                      {leader.description}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <Heading level="h2" color="white" align="center">
              Join Our Community
            </Heading>
            <Text size="xl" align="center" color="white" className="max-w-3xl mx-auto">
              Whether you're new to the area or have been part of Lewisham for years, 
              we'd love to welcome you to St Saviour's.
            </Text>
            
            <Flex justify="center" gap="md" className="pt-4">
              <Button variant="primary" size="lg" leftIcon={<Mail className="h-5 w-5" />}>
                Get in Touch
              </Button>
              <Button variant="secondary" size="lg" leftIcon={<Clock className="h-5 w-5" />}>
                Mass Times
              </Button>
            </Flex>
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'