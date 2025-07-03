import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PlusIcon as Plus, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  HeartIcon as Heart, 
  ShieldCheckIcon as Shield, 
  ArrowRightIcon as ArrowRight, 
  UserGroupIcon as Users 
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

export default function AnointingOfTheSick() {
  const reducedMotion = prefersReducedMotion()

  const anointingContent = [
    "The Anointing of the Sick is a sacrament of healing that provides spiritual comfort, courage, and strength to those facing serious illness, surgery, or the frailty of old age. It continues Christ's healing ministry in the Church.",
    "This sacrament is not only for those at the point of death, but for anyone experiencing serious illness or preparing for major surgery. It can be received multiple times during different illnesses, bringing God's grace and peace."
  ]

  const anointingEffects = [
    {
      title: "Spiritual Comfort",
      description: "Brings peace, courage, and strength to face illness with faith and hope"
    },
    {
      title: "Forgiveness of Sins",
      description: "Forgives sins if the person is unable to receive confession due to their condition"
    },
    {
      title: "Union with Christ",
      description: "Unites the sick person's suffering with Christ's passion for salvation"
    },
    {
      title: "Ecclesiastical Grace",
      description: "Strengthens connection with the Church community and their prayers"
    },
    {
      title: "Preparation for Heaven",
      description: "If it is God's will, prepares the soul for the journey to eternal life"
    }
  ]

  const anointingRequirements = [
    {
      title: "Who Can Receive",
      items: [
        "Any baptized Catholic who is seriously ill",
        "Those preparing for major surgery",
        "Elderly persons weakened by age",
        "Children who have reached the age of reason",
        "Anyone with chronic conditions during worsening periods"
      ]
    },
    {
      title: "When to Request",
      items: [
        "As soon as serious illness begins",
        "Before major surgery or procedures",
        "During times of great physical weakness",
        "When facing life-threatening conditions",
        "For repeated reception during new illnesses"
      ]
    },
    {
      title: "How to Request",
      items: [
        "Call parish office: 020 8852 7411",
        "Contact available 24/7 for emergencies",
        "Speak with priest after Mass",
        "Hospital chaplain services available",
        "Family members may request on behalf of patient"
      ]
    }
  ]

  const contactInfo = {
    title: "Need Anointing of the Sick?",
    description: "Don't face illness alone. The Church is here to provide spiritual comfort and healing through this beautiful sacrament. Call us day or night.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord",
    source: "James 5:14"
  }

  const anointingSteps = [
    {
      step: 1,
      title: "Liturgy of the Word",
      description: "Scripture readings and prayers appropriate for the sick person's situation",
      icon: BookOpen,
      color: "bg-navy-600"
    },
    {
      step: 2,
      title: "Laying on of Hands",
      description: "The priest silently lays hands on the sick person's head in prayer",
      icon: Heart,
      color: "bg-blue-600"
    },
    {
      step: 3,
      title: "Prayer over the Oil",
      description: "The priest blesses the oil of the sick if not already blessed by the bishop",
      icon: Plus,
      color: "bg-green-600"
    },
    {
      step: 4,
      title: "Anointing",
      description: "The forehead and hands are anointed with oil while prayers are said",
      icon: Shield,
      color: "bg-navy-700"
    }
  ]

  return (
    <PageLayout
      title="Anointing of the Sick"
      description="Learn about the Sacrament of Anointing of the Sick at St Saviour's Catholic Church. Information on spiritual healing, comfort, and last rites."
      keywords="Anointing of the Sick, Last Rites, Extreme Unction, Catholic Sacrament, Healing, Spiritual Comfort, Emergency"
    >
      {/* Hero Section */}
      <PageHero
        title="Anointing of the Sick"
        subtitle="Sacrament of Healing and Comfort"
        description="Christ's healing touch continues through this sacrament of spiritual and physical restoration."
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
              Request Anointing
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={Plus}
            title="Christ's Healing Touch"
            subtitle="Sacrament of healing for the seriously ill"
            content={anointingContent}
            quote={quote}
            effects={anointingEffects}
            requirements={anointingRequirements}
            effectsColor="purple"
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
                  Comfort in Times of Illness
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
                  You don't have to face illness alone. The Church is here to provide spiritual 
                  comfort and healing through this beautiful sacrament of God's love and mercy.
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
                Request Anointing
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