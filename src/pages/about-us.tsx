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
import { priestBiographies } from '@/lib/data'

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

  const timelineEvents = [
    { 
      year: "849-918", 
      title: "Medieval Origins", 
      event: "King Alfred the Great was Lord of the Manor of Leofshema. In 918, the Manor was given to Saint Peter's Abbey, Ghent.", 
      icon: Award,
      image: "/images/chapel_st_patrick_st_saviours.jpeg",
      side: "left"
    },
    { 
      year: "1553-1558", 
      title: "Tudor Restoration", 
      event: "Following the English Reformation under Henry VIII, the Priory was briefly restored in the reign of Mary I under Cardinal Reginald Pole.", 
      icon: Church,
      image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      side: "right"
    },
    { 
      year: "1894", 
      title: "Parish Founded", 
      event: "Fr McClymont was appointed as the first resident priest, establishing the modern St Saviour's parish.", 
      icon: Church,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "left"
    },
    { 
      year: "1909", 
      title: "Church Opens", 
      event: "Foundation stone laid on April 24th and church officially opened by Bishop Peter Amigo on December 9th, with the Lord and Lady Mayor of London attending.", 
      icon: Award,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "right"
    },
    { 
      year: "1910", 
      title: "School Established", 
      event: "St Saviour's Catholic School opened - the first new Catholic school in the diocese under the 1902 Education Act.", 
      icon: BookOpen,
      image: "/images/chapel_st_patrick_st_saviours.jpeg",
      side: "left"
    },
    { 
      year: "1917", 
      title: "Church Consecrated", 
      event: "After the debt of £3,000 was paid off, the church was consecrated on October 23rd.", 
      icon: Star,
      image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      side: "right"
    },
    { 
      year: "1928-29", 
      title: "Campanile Completed", 
      event: "The famous Campanile topped by a 12-foot statue of Christ the King was completed as a commemoration of the Centenary of Catholic Emancipation.", 
      icon: Church,
      image: "/images/st_saviours_frontage_war_memorial.jpeg",
      side: "left"
    },
    { 
      year: "2025", 
      title: "Jubilee Sanctuary", 
      event: "St Saviour's was designated a special sanctuary during the Jubilee Year of Hope, serving parishioners from 80+ countries.", 
      icon: Heart,
      image: "/images/st_saviours_interior_1939_archive_photo.jpeg",
      side: "right"
    }
  ]

  const leadership = [
    {
      name: "Fr Krzysztof Krzyskow",
      role: "Parish Priest",
      description: "Leading our parish with wisdom and compassion, Fr Krzysztof brings years of pastoral experience to guide our community in faith and service.",
      icon: Church,
      image: "/images/fr_krzysztof_krzyskow_parish_priest_st_saviours.jpeg"
    },
    {
      name: "Fr Kenneth Iwunna", 
      role: "Assistant Priest",
      description: "Supporting our parish ministries and outreach programs, Fr Kenneth brings energy and dedication to serving our diverse community.",
      icon: BookOpen,
      image: "/images/fr_kenneth_iwunna_assistant_priest_st_saviours.jpeg"
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
                <stat.icon className="h-8 w-8 icon-theme-dark" />
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
              <Church className="h-10 w-10 icon-theme-dark" />
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
                      <value.icon className="h-10 w-10 icon-theme-dark" />
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

      {/* History Section - Vertical Timeline */}
      <Section spacing="lg" background="slate">
        <Container>
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Heading level="h2" color="white" align="center" className="mb-6">
              Our Rich History
            </Heading>
            <Text size="xl" align="center" color="white" className="max-w-4xl mx-auto">
              From medieval origins to modern sanctuary, discover the remarkable journey of St Saviour's Catholic Church through the centuries.
            </Text>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    event.side === 'left' ? 'lg:text-right' : 'lg:text-left'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-slate-900 rounded-full border-4 border-gold-500 flex items-center justify-center z-10 shadow-2xl">
                    <event.icon className="h-8 w-8 text-gold-500" />
                  </div>

                  {/* Content Card */}
                  <div className={`${event.side === 'left' ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-300 group">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-2 badge-gold-theme rounded-full font-bold text-lg">
                              {event.year}
                            </span>
                          </div>
                          <Heading level="h3" color="white" className="text-2xl font-bold mb-4">
                            {event.title}
                          </Heading>
                          <Text color="gray-100" size="lg" className="leading-relaxed">
                            {event.event}
                          </Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Event Image */}
                  <div className={`${event.side === 'left' ? 'lg:pl-12 lg:col-start-2 lg:row-start-1' : 'lg:pr-12 lg:col-start-1'}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Text size="sm" color="white" className="font-medium">
                          {event.year} - {event.title}
                        </Text>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
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
                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
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

        {/* Detailed Priest Biographies */}
        <div className="mt-16 space-y-8">
          {priestBiographies.map((priest, index) => (
            <motion.div
              key={priest.id}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card variant="default" padding="lg" className="border border-slate-600 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="text-center md:text-left">
                      <div className="w-32 h-32 bg-gray-300 rounded-xl mx-auto md:mx-0 mb-4 overflow-hidden">
                        <img
                          src={priest.image}
                          alt={priest.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Heading level="h3" color="white" className="text-xl font-bold mb-2">
                        {priest.name}
                      </Heading>
                      <Text color="white" weight="semibold" className="text-lg mb-4 opacity-80">
                        {priest.title}
                      </Text>
                      <div className="space-y-2 text-sm">
                        <Text color="white" className="opacity-70">
                          <strong>Ordained:</strong> {priest.ordination}
                        </Text>
                        <Text color="white" className="opacity-70">
                          <strong>Diocese:</strong> {priest.diocese}
                        </Text>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Text color="white" size="base" className="leading-relaxed mb-6">
                        {priest.bio}
                      </Text>
                      <div>
                        <Text color="white" weight="semibold" className="mb-3">
                          Areas of Ministry:
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {priest.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
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