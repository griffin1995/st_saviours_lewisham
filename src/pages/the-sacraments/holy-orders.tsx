import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HandRaisedIcon as HandMetal, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  HeartIcon as Heart, 
  UserGroupIcon as Users, 
  ArrowRightIcon as ArrowRight, 
  StarIcon as Crown, 
  PlusIcon as Cross 
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

export default function HolyOrders() {
  const reducedMotion = prefersReducedMotion()

  const holyOrdersContent = [
    "Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church. It includes three degrees: episcopate (bishops), presbyterate (priests), and diaconate (deacons).",
    "This sacrament confers a sacred power for the service of the faithful. Those who receive Holy Orders are consecrated in Christ's name to feed the Church with the Word and grace of God, becoming shepherds, teachers, and sanctifiers."
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

  const contactInfo = {
    title: "Exploring a Vocation?",
    description: "If you feel called to serve God and his people as a priest or deacon, we encourage you to explore this vocation. The Church needs holy men to serve.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "It was not you who chose me, but I who chose you and appointed you to go and bear fruit that will remain",
    source: "John 15:16"
  }

  const holyOrdersDegrees = [
    {
      title: "Bishops",
      subtitle: "Episcopate",
      description: "Bishops possess the fullness of the sacrament of Holy Orders. They are the successors of the apostles and have the authority to ordain priests and deacons, confirm the faithful, and govern dioceses.",
      icon: Crown,
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
      icon: Cross,
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
      icon: HandMetal,
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

  return (
    <PageLayout
      title="Holy Orders"
      description="Learn about the Sacrament of Holy Orders at St Saviour's Catholic Church. Information on priesthood, diaconate, and religious vocations."
      keywords="Holy Orders, Ordination, Priest, Bishop, Deacon, Catholic Sacrament, Vocation, Ministry, Seminary"
    >
      {/* Hero Section */}
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
            >
              Explore Your Vocation
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={HandMetal}
            title="Called to Serve"
            subtitle="Sacrament that consecrates men to serve the Church"
            content={holyOrdersContent}
            quote={quote}
            effects={holyOrdersEffects}
            requirements={holyOrdersRequirements}
            effectsColor="indigo"
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
                  Pray for Vocations
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
                  Please pray for vocations to the priesthood and diaconate. The Church needs holy men 
                  to serve God's people and continue Christ's mission in the world.
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
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'