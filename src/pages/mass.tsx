import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin, Phone, Mail, Info, Heart } from 'lucide-react'

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
import { ServiceTimes, TodaysServices } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'
import { massTimings, confessionTimes, adorationTimes } from '@/lib/data'

export default function MassTimes() {
  const reducedMotion = prefersReducedMotion()

  // Transform data for ServiceTimes component
  const serviceTimesData = [
    {
      day: 'Sunday',
      services: massTimings.sunday || []
    },
    {
      day: 'Monday', 
      services: massTimings.monday || []
    },
    {
      day: 'Tuesday',
      services: massTimings.tuesday || []
    },
    {
      day: 'Wednesday',
      services: massTimings.wednesday || []
    },
    {
      day: 'Thursday',
      services: massTimings.thursday || []
    },
    {
      day: 'Friday',
      services: massTimings.friday || []
    },
    {
      day: 'Saturday',
      services: massTimings.saturday || []
    }
  ]

  const additionalServices = [
    {
      title: "Confession",
      icon: Heart,
      description: "Sacrament of Reconciliation available",
      times: confessionTimes,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Adoration",
      icon: Calendar,
      description: "Eucharistic Adoration and quiet prayer",
      times: adorationTimes,
      color: "from-purple-500 to-violet-500"
    }
  ]

  return (
    <PageLayout
      title="Mass Times"
      description="Find Mass times, confession schedules, and service information at St Saviour's Catholic Church in Lewisham."
      keywords="Mass Times, Catholic Mass, Confession, Adoration, Service Times, Sunday Mass, Weekday Mass"
    >
      {/* Hero Section */}
      <PageHero
        title="Mass Times & Services"
        subtitle="Worship with us"
        description="Join us for Mass, confession, and adoration. All are welcome to worship with our community."
        backgroundImage="/images/hero/church-altar.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Call Parish
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<MapPin className="h-5 w-5" />}
            >
              Get Directions
            </Button>
          </Flex>
        }
      />

      {/* Today's Services Highlight */}
      <Section spacing="md" background="white">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Today's Services
            </Heading>
            <Text size="xl" align="center" color="muted">
              Join us for worship today
            </Text>
          </motion.div>

          <TodaysServices serviceTimes={serviceTimesData} />
        </Container>
      </Section>

      {/* Weekly Mass Schedule */}
      <Section spacing="lg" background="white">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level="h2" align="center" className="mb-6">
            Weekly Mass Schedule
          </Heading>
          <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
            Our regular weekly Mass times. Please note that times may vary during 
            special liturgical seasons and holidays.
          </Text>
        </motion.div>

        <ServiceTimes 
          serviceTimes={serviceTimesData}
          highlightToday={true}
          layout="grid"
        />
      </Section>

      {/* Additional Services */}
      <Section spacing="lg" background="white">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level="h2" align="center" className="mb-6">
            Additional Services
          </Heading>
          <Text size="xl" align="center" color="muted">
            Other spiritual services available at our parish
          </Text>
        </motion.div>

        <Grid cols={2} gap="lg">
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card variant="default" padding="lg" className="h-full border border-gray-200 hover:border-gold-200 transition-all duration-300">
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="h-10 w-10 text-white" />
                      </div>
                      <Heading level="h3" align="center" className="text-2xl font-bold mb-2">
                        {service.title}
                      </Heading>
                      <Text color="muted" align="center" className="mb-6">
                        {service.description}
                      </Text>
                    </div>

                    <div className="space-y-3">
                      {service.times && Array.isArray(service.times) ? (
                        service.times.map((time, timeIndex) => (
                          <div key={timeIndex} className="p-3 bg-gray-50 rounded-lg">
                            <Flex align="center" gap="sm">
                              <Clock className="h-4 w-4 text-gold-600" />
                              <Text weight="medium">
                                {time.time} - {(time as any).note || (time as any).description}
                              </Text>
                            </Flex>
                            {((time as any).description && (time as any).description !== ((time as any).note || (time as any).description)) && (
                              <Text size="sm" color="muted" className="mt-1 ml-6">
                                {(time as any).description}
                              </Text>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <Text color="muted" className="italic">
                            Please contact the parish office for current times
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Important Information */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="outlined" padding="lg" className="border-2 border-gold-200 bg-gold-50">
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto">
                    <Info className="h-8 w-8 text-white" />
                  </div>

                  <Heading level="h3" align="center" className="text-2xl font-bold">
                    Important Information
                  </Heading>

                  <div className="space-y-4 max-w-2xl mx-auto">
                    <Text align="center">
                      <strong>Special Occasions:</strong> Mass times may vary during Christmas, Easter, 
                      and other special liturgical seasons. Please check our weekly newsletter or 
                      contact the parish office for holiday schedules.
                    </Text>
                    
                    <Text align="center">
                      <strong>First Time Visitors:</strong> We warmly welcome all visitors to our services. 
                      If you have any questions or need assistance, please don't hesitate to speak 
                      with our welcoming team.
                    </Text>
                    
                    <Text align="center">
                      <strong>Accessibility:</strong> Our church is wheelchair accessible with designated 
                      seating areas. Hearing loops are available for those with hearing aids.
                    </Text>
                  </div>

                  <div className="pt-4 border-t border-gold-200">
                    <Flex justify="center" gap="md" wrap>
                      <Flex align="center" gap="sm">
                        <Phone className="h-4 w-4 text-gold-600" />
                        <Text weight="medium">020 8852 7411</Text>
                      </Flex>
                      <Flex align="center" gap="sm">
                        <Mail className="h-4 w-4 text-gold-600" />
                        <Text weight="medium">parish@saintsaviours.org.uk</Text>
                      </Flex>
                      <Flex align="center" gap="sm">
                        <MapPin className="h-4 w-4 text-gold-600" />
                        <Text weight="medium">Brockley Rise, SE23 1NG</Text>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <Heading level="h2" align="center">
              Join Us for Worship
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Whether you're a regular parishioner or visiting for the first time, 
              we invite you to join our community in worship and fellowship.
            </Text>
            
            <Flex justify="center" gap="md" className="pt-4">
              <Button 
                variant="primary" 
                size="lg" 
                leftIcon={<MapPin className="h-5 w-5" />}
              >
                Get Directions
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                leftIcon={<Phone className="h-5 w-5" />}
              >
                Contact Us
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