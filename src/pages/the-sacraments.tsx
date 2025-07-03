import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon as ArrowRight, 
  BeakerIcon as Droplets, 
  PlusIcon as Cross, 
  CircleStackIcon as Cookie, 
  HeartIcon as Heart, 
  SparklesIcon as Gem, 
  HandRaisedIcon as HandMetal, 
  PlusIcon as Plus 
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
import { SacramentCard, type Sacrament } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

const sacraments: Sacrament[] = [
  {
    name: "Baptism",
    icon: Droplets,
    description: "The gateway to life in the Spirit and the door which gives access to the other sacraments.",
    details: "Through Baptism we are freed from sin and reborn as children of God.",
    link: "/the-sacraments/baptism",
    color: "blue"
  },
  {
    name: "Confirmation",
    icon: Cross,
    description: "Completes Christian initiation and strengthens us with the gifts of the Holy Spirit.",
    details: "Confirmation deepens baptismal grace and roots us more deeply in divine filiation.",
    link: "/the-sacraments/confirmation",
    color: "red"
  },
  {
    name: "The Eucharist",
    icon: Cookie,
    description: "The source and summit of Christian life, the Body and Blood of Christ.",
    details: "In Holy Communion, we receive Christ himself and are united with him and each other.",
    link: "/the-sacraments/the-eucharist",
    color: "amber"
  },
  {
    name: "Confession",
    icon: Heart,
    description: "The sacrament of forgiveness and reconciliation with God and the Church.",
    details: "Through confession, we receive God's mercy and are restored to grace.",
    link: "/the-sacraments/confession",
    color: "green"
  },
  {
    name: "Anointing of the Sick",
    icon: Plus,
    description: "Brings spiritual and sometimes physical healing to those who are seriously ill.",
    details: "This sacrament provides comfort, courage, and spiritual strength in times of illness.",
    link: "/the-sacraments/anointing-of-the-sick",
    color: "purple"
  },
  {
    name: "Holy Orders",
    icon: HandMetal,
    description: "The sacrament by which bishops, priests, and deacons are ordained.",
    details: "Through Holy Orders, men are consecrated to serve God and his people.",
    link: "/the-sacraments/holy-orders",
    color: "indigo"
  },
  {
    name: "Matrimony",
    icon: Gem,
    description: "The sacred covenant between a man and woman that mirrors Christ's love for the Church.",
    details: "Marriage is a lifelong partnership ordered toward the good of the spouses and children.",
    link: "/the-sacraments/matrimony",
    color: "pink"
  }
]

const sacramentCategories = [
  {
    title: "Sacraments of Initiation",
    icon: Droplets,
    description: "Baptism, Confirmation, and Eucharist lay the foundation of Christian life. They initiate us into the Church and establish our relationship with Christ.",
    sacraments: [
      "Baptism - Rebirth in Christ",
      "Confirmation - Strengthened by the Spirit", 
      "Eucharist - Nourished by Christ's Body"
    ]
  },
  {
    title: "Sacraments of Healing",
    icon: Heart,
    description: "Confession and Anointing of the Sick continue Jesus' work of healing and forgiveness. They restore us to spiritual health and strengthen us in times of need.",
    sacraments: [
      "Confession - Forgiveness of sins",
      "Anointing - Healing and comfort"
    ]
  },
  {
    title: "Sacraments of Service",
    icon: HandMetal,
    description: "Holy Orders and Matrimony are directed toward the salvation of others. They consecrate people to serve God and the Church in specific ways.",
    sacraments: [
      "Holy Orders - Service to the Church",
      "Matrimony - Service to family"
    ]
  }
]

export default function TheSacraments() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout
      title="The Sacraments"
      description="Learn about the seven sacraments of the Catholic Church at St Saviour's. Discover how these sacred signs bring us closer to God."
      keywords="Catholic Sacraments, Baptism, Confirmation, Eucharist, Confession, Anointing, Holy Orders, Matrimony, Catholic Church"
    >
      {/* Hero Section */}
      <PageHero
        title="The Seven Sacraments"
        subtitle="Sacred Signs of Grace"
        description="The sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church."
        backgroundImage="/images/inside-church-aisle.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="relative">
                <motion.div
                  className="absolute -left-4 top-0 w-1 h-12 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
                  initial={reducedMotion ? { opacity: 0 } : { height: 0 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { height: 48 }}
                  transition={reducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 1, delay: 0.3 }
                  }
                  viewport={{ once: true }}
                />
                <Heading level="h2" color="white" className="text-3xl lg:text-4xl font-light">
                  What Are the Sacraments?
                </Heading>
              </div>
              <Text size="xl" className="text-gray-100 leading-relaxed">
                The sacraments are visible signs of invisible grace, instituted by Christ 
                to sanctify us, to build up the body of Christ, and to give worship to God. 
                They are seven in number and are celebrated in the Catholic Church as 
                sacred encounters with the living God.
              </Text>
            </div>
            
            {/* Right Column - Features Grid */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 icon-container-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Cross className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <Heading level="h3" color="white" className="text-lg font-semibold mb-2">
                      Signs of Grace
                    </Heading>
                    <Text className="text-gray-200">
                      Each sacrament is an outward sign that communicates inward grace, 
                      making God's love tangible in our lives.
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 icon-container-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Heart className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <Heading level="h3" color="white" className="text-lg font-semibold mb-2">
                      Christ's Presence
                    </Heading>
                    <Text className="text-gray-200">
                      Through the sacraments, Christ himself acts, touching our hearts 
                      and transforming our souls.
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 icon-container-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Gem className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <Heading level="h3" color="white" className="text-lg font-semibold mb-2">
                      Church Community
                    </Heading>
                    <Text className="text-gray-200">
                      The sacraments unite us as one body in Christ, building up 
                      the community of faith.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>
      
      {/* Section Divider */}
      <div className="flex justify-center py-16 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
      </div>

      {/* The Seven Sacraments */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="space-y-12">
            <div className="text-center">
              <div className="space-y-4 mb-6">
                <Heading level="h2" color="white" align="center">
                  The Seven Sacraments
                </Heading>
                <div className="flex justify-center">
                  <motion.div
                    className="w-24 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                    initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                    whileInView={reducedMotion ? { opacity: 1 } : { width: 96 }}
                    transition={reducedMotion 
                      ? { duration: 0.3 }
                      : { duration: 1, delay: 0.3 }
                    }
                    viewport={{ once: true }}
                  />
                </div>
              </div>
              <Text size="lg" align="center" className="text-gray-100 max-w-3xl mx-auto">
                Each sacrament has its own unique role in our spiritual journey, 
                from initiation to healing to service.
              </Text>
            </div>

            <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sacraments.map((sacrament, index) => (
                <SacramentCard
                  key={sacrament.name}
                  sacrament={sacrament}
                  delay={index * 0.1}
                />
              ))}
            </Grid>
          </div>
        </Container>
      </Section>
      
      {/* Section Divider */}
      <div className="flex justify-center py-16 bg-slate-900">
        <div className="w-[640px] h-px" style={{ backgroundColor: '#ffffff', height: '0.5px' }}></div>
      </div>

      {/* Sacrament Categories */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="items-start">
            {/* Left Column - Categories Cards */}
            <div className="space-y-8">
              {sacramentCategories.map((category, index) => (
                <div key={category.title} className="flex items-start gap-6">
                  <div className="w-16 h-16 icon-container-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <category.icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="space-y-3">
                    <Heading level="h3" color="white" className="text-xl font-serif font-semibold">
                      {category.title}
                    </Heading>
                    <Text className="text-gray-100 leading-relaxed">
                      {category.description}
                    </Text>
                    <div className="space-y-1">
                      {category.sacraments.map((sacrament, idx) => (
                        <Text key={idx} size="sm" className="text-gray-200">
                          • {sacrament}
                        </Text>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column - Content */}
            <div className="space-y-8 text-right">
              <div className="relative flex justify-end">
                <motion.div
                  className="absolute -right-4 top-0 w-1 h-12 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"
                  initial={reducedMotion ? { opacity: 0 } : { height: 0 }}
                  whileInView={reducedMotion ? { opacity: 1 } : { height: 48 }}
                  transition={reducedMotion 
                    ? { duration: 0.3 }
                    : { duration: 1, delay: 0.3 }
                  }
                  viewport={{ once: true }}
                />
                <Heading level="h2" color="white" className="text-3xl lg:text-4xl font-light">
                  Three Sacred Categories
                </Heading>
              </div>
              <Text size="xl" className="text-gray-100 leading-relaxed text-right">
                The seven sacraments are organized into three meaningful categories, 
                each serving a distinct purpose in our spiritual journey and relationship 
                with God and the Church community.
              </Text>
              <Text className="text-gray-200 leading-relaxed text-right">
                From the foundational sacraments of initiation that welcome us into the faith, 
                to the healing sacraments that restore us, and the sacraments of service that 
                call us to serve others - each category reflects Christ's continuing presence 
                in our lives through the Church.
              </Text>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading level="h2" className="text-3xl font-light text-white text-center">
                  Begin Your Sacramental Journey
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
              <Text size="lg" className="text-gray-300 max-w-3xl mx-auto">
                Whether you're seeking baptism, preparing for confirmation, or exploring 
                any of the sacraments, we're here to guide and support you on your spiritual journey.
              </Text>
            </div>
            
            <Flex justify="center" gap="md" wrap>
              <Link href="/contact-us">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                >
                  Contact Us for Information
                </Button>
              </Link>
              <Link href="/mass">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-gray-100"
                >
                  See Mass Times
                </Button>
              </Link>
            </Flex>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'