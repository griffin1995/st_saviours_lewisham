import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  CircleStackIcon as Cookie, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  UserGroupIcon as Users, 
  HeartIcon as Heart, 
  ArrowRightIcon as ArrowRight 
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

export default function TheEucharist() {
  const reducedMotion = prefersReducedMotion()

  const eucharistContent = [
    "The Eucharist is the source and summit of the Christian life. In this most blessed sacrament, Jesus Christ is truly present—body, blood, soul, and divinity—under the appearances of bread and wine.",
    "Through the Eucharist, we are intimately united with Christ and nourished for our journey of faith. It is both a sacrifice and a sacred meal, making present the one sacrifice of Christ on Calvary and feeding us with the Bread of Life."
  ]

  const eucharistEffects = [
    {
      title: "Union with Christ",
      description: "We become one with Jesus in the most intimate way possible"
    },
    {
      title: "Spiritual Nourishment",
      description: "Our souls are fed with the true food that leads to eternal life"
    },
    {
      title: "Forgiveness of Venial Sins",
      description: "Daily faults are cleansed and we are strengthened against temptation"
    },
    {
      title: "Unity with the Church",
      description: "We are bound together as one body in Christ with all believers"
    },
    {
      title: "Pledge of Glory",
      description: "We receive a foretaste of the heavenly banquet to come"
    }
  ]

  const eucharistRequirements = [
    {
      title: "First Holy Communion",
      items: [
        "Must be baptized Catholic",
        "Complete 2-year preparation program",
        "Usually received around age 7-8",
        "Understand the Real Presence of Christ",
        "Participate in practice sessions"
      ]
    },
    {
      title: "State of Grace",
      items: [
        "Free from mortal sin",
        "Receive confession if needed",
        "Proper intention and reverence",
        "Faith in the Real Presence",
        "Desire to receive Christ"
      ]
    },
    {
      title: "Eucharistic Fast",
      items: [
        "One hour fast from food and drink",
        "Water and medicine permitted",
        "Shorter fast for elderly and sick",
        "Spiritual preparation recommended",
        "Arrive early for quiet prayer"
      ]
    }
  ]

  const contactInfo = {
    title: "Join Us for Mass",
    description: "Experience the beauty and mystery of the Eucharist at St Saviour's. All are welcome to join us for Mass and encounter Christ in the Blessed Sacrament.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Take this, all of you, and eat of it, for this is my body, which will be given up for you",
    source: "Jesus at the Last Supper"
  }

  return (
    <PageLayout
      title="The Eucharist"
      description="Learn about the Eucharist, the source and summit of Christian life at St Saviour's Catholic Church. Information on Holy Communion and Mass times."
      keywords="Catholic Eucharist, Holy Communion, Mass, Real Presence, Transubstantiation, First Communion, Body of Christ"
    >
      {/* Hero Section */}
      <PageHero
        title="The Holy Eucharist"
        subtitle="Source and Summit of Christian Life"
        description="The Eucharist is the Body and Blood of Christ, truly present under the appearances of bread and wine."
        backgroundImage="/images/inside-church-aisle.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Join Us for Mass
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={Cookie}
            title="The Bread of Life"
            subtitle="The source and summit of the Christian life"
            content={eucharistContent}
            quote={quote}
            effects={eucharistEffects}
            requirements={eucharistRequirements}
            effectsColor="amber"
            theme="dark"
          />
        </Container>
      </Section>


      {/* Section Divider */}
      <div className="flex justify-center py-20 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '1px', boxShadow: '0 0 1px rgba(255,255,255,0.5)' }}></div>
      </div>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Come to the Table of the Lord
                </Heading>
                <div className="flex justify-center">
                  <motion.div
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
                  The Eucharist is the greatest gift Christ has given us. Join us for Mass 
                  and experience the profound mystery of God's love in Holy Communion.
                </Text>
                <Flex justify="center" gap="lg" wrap>
                  <a href="tel:020 8852 7411">
                    <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                      📞 020 8852 7411
                    </Text>
                  </a>
                  <a href="mailto:info@stsaviourslewisham.org.uk">
                    <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                      ✉️ info@stsaviourslewisham.org.uk
                    </Text>
                  </a>
                </Flex>
              </div>
            </div>
            
            <Link href="/mass">
              <Button 
                variant="primary" 
                size="lg"
                leftIcon={<Calendar className="h-5 w-5" />}
                className="bg-white text-slate-900 hover:bg-gray-100"
              >
                View Mass Times
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'