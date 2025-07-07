import React from 'react'
import { motion } from 'framer-motion'
import { 
  UsersIcon as Users, 
  HeartIcon as Heart, 
  CalendarDaysIcon as Calendar,
  ClockIcon as Clock,
  ArrowLeftIcon as ArrowLeft,
  MapPinIcon as MapPin,
  BookOpenIcon as BookOpen
} from '@heroicons/react/24/solid'
import Link from 'next/link'

// Components
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Grid,
  Container
} from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

export default function StBakhitaGroupPage() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout 
      title="The St Bakhita Group | Community News | St Saviour's Catholic Church"
      description="Learn about the St Bakhita Group at St Saviour's - a welcoming community for migrants and parishioners, rooted in prayer and fellowship."
      keywords="St Bakhita Group, migrants, community, prayer, fellowship, St Josephine Bakhita, Catholic social teaching"
      background="slate"
    >
      <PageHero
        title="The St Bakhita Group"
        subtitle="A community rooted in prayer and welcome"
        image="/images/devotion_to_saint_josephine_bakhita.jpeg"
        overlay="from-black/70 via-black/40 to-black/60"
      />

      {/* Introduction Section */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gold-300" />
                      <div>
                        <Text size="sm" color="gold" className="font-medium">When</Text>
                        <Text size="sm" color="white">First Wednesday of each month</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gold-300" />
                      <div>
                        <Text size="sm" color="gold" className="font-medium">Time</Text>
                        <Text size="sm" color="white">After Mass (approx. 1 hour)</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gold-300" />
                      <div>
                        <Text size="sm" color="gold" className="font-medium">Where</Text>
                        <Text size="sm" color="white">Main body of the church</Text>
                      </div>
                    </div>
                  </div>
                  
                  <Text size="lg" color="gray-100" className="leading-relaxed">
                    A welcoming place for migrants and parishioners, the St Bakhita Group launched in April 2024, 
                    following the formal installation of a specially commissioned statue of the Saint in February. 
                    With prayers led by Fr Kenneth Iwunna, the group offers a regular space for prayer, reflection, 
                    and community-building, with a focus on the experiences and concerns of migrants.
                  </Text>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Two-column layout with images */}
      <Section background="slate" className="py-16">
        <Container>
          <Grid cols={2} className="gap-12 mb-16">
            {/* Group Activities */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading level="h2" color="white" className="mb-6">
                What We Do
              </Heading>
              
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Heading level="h4" color="white" className="mb-2">
                          Scripture & Prayer
                        </Heading>
                        <Text color="gray-100">
                          Each session includes prayer, a Scripture reading, and time for reflection.
                        </Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Heading level="h4" color="white" className="mb-2">
                          Community Building
                        </Heading>
                        <Text color="gray-100">
                          Intercessions focus on key themes: family life, dignity of work, belonging, and community.
                        </Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Heading level="h4" color="white" className="mb-2">
                          Open to All
                        </Heading>
                        <Text color="gray-100">
                          While rooted in migrant issues, the group welcomes everyone on their journey of faith.
                        </Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Saint's Story */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading level="h2" color="white" className="mb-6">
                About St Josephine Bakhita
              </Heading>
              
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600 mb-6">
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src="/images/statue_st_josephine_bakhita_st_peters_square_2022.jpeg"
                      alt="Statue of St Josephine Bakhita in St Peter's Square, erected in 2022"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Text size="sm" color="white" className="text-center">
                        Statue erected in St Peter's Square in 2022 to commemorate St Bakhita 
                        and highlight the Church's commitment to human dignity
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Text color="gray-100" className="leading-relaxed">
                  <strong className="text-white">St Josephine Bakhita (1869-1947)</strong> was born in the Darfur region of Sudan. 
                  At age seven, she was kidnapped by slave traders and sold multiple times before being brought to Italy.
                </Text>
                
                <Text color="gray-100" className="leading-relaxed">
                  In Italy, she encountered the Cannossian Daughters of Charity, who welcomed her with compassion. 
                  She embraced Christianity and was baptized on January 9th, 1890, choosing the name Josephine 
                  in tribute to St Joseph.
                </Text>
                
                <Text color="gray-100" className="leading-relaxed">
                  Her journey from slavery to sainthood is a powerful testament to God's transformative grace. 
                  She died peacefully in 1947, maintaining a joyful demeanor and unwavering faith to the end.
                </Text>

                <Card className="bg-gold-500/10 border-gold-500/30 mt-6">
                  <CardContent className="p-6">
                    <Heading level="h4" color="gold" className="mb-3">
                      A Lesson of Hope
                    </Heading>
                    <Text color="white" className="italic">
                      "St Bakhita's story offers a poignant lens through which we view contemporary issues 
                      of migration, freedom, and resilience. Her life reminds us that hope can thrive 
                      even in the darkest circumstances."
                    </Text>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading level="h2" color="white" className="mb-6">
                Join Our Community
              </Heading>
              <Text size="lg" color="gray-100" className="mb-8">
                Everyone is welcome to join the St Bakhita Group. Whether you're a migrant, long-time parishioner, 
                or simply seeking a space of prayer and fellowship, you'll find a warm welcome.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us">
                  <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                    <Heart className="h-5 w-5 mr-2" />
                    Get Involved
                  </Button>
                </Link>
                <Link href="/community-news">
                  <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Community News
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}