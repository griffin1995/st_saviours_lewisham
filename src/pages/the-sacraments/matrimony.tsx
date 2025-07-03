import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  SparklesIcon as Gem, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  HeartIcon as Heart, 
  UserGroupIcon as Users, 
  ArrowRightIcon as ArrowRight, 
  BuildingLibraryIcon as Church 
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

export default function Matrimony() {
  const reducedMotion = prefersReducedMotion()

  const matrimonyContent = [
    "In the Catholic understanding, marriage is not just a legal contract but a sacred covenant between a man and woman, blessed by God and witnessed by the Church community. This sacrament reflects the unconditional love between Christ and the Church.",
    "Through marriage, couples receive the grace they need to love each other faithfully, support each other through life's challenges, and welcome children as a gift from God. Marriage is a lifelong partnership that mirrors Christ's love for the Church."
  ]

  const matrimonyEffects = [
    {
      title: "Sacramental Grace",
      description: "Special graces to love faithfully and support each other through life's challenges"
    },
    {
      title: "Unity in Christ",
      description: "Two become one flesh, united in love and purpose under God"
    },
    {
      title: "Mutual Sanctification",
      description: "Husband and wife help each other grow in holiness and virtue"
    },
    {
      title: "Partnership in Mission",
      description: "Called together to serve God, the Church, and the broader community"
    },
    {
      title: "Openness to Life",
      description: "Blessed to welcome and raise children in the Catholic faith"
    }
  ]

  const matrimonyRequirements = [
    {
      title: "Catholic Couples",
      items: [
        "Both parties baptized Catholic",
        "Free to marry (no previous valid marriage)",
        "Complete marriage preparation program", 
        "Six months advance notice preferred",
        "Recent baptismal and confirmation certificates"
      ]
    },
    {
      title: "Mixed Marriages",
      items: [
        "One party must be Catholic",
        "Dispensation required from the Bishop",
        "Catholic party promises to raise children Catholic",
        "Non-Catholic party informed of promises",
        "Additional preparation may be required"
      ]
    },
    {
      title: "Documentation Needed",
      items: [
        "Recent baptismal certificates",
        "Confirmation certificates",
        "Civil marriage license",
        "Proof of freedom to marry",
        "Pre-nuptial investigation forms"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Plan Your Wedding?",
    description: "We're honored to help you begin this sacred journey together. Contact us to start planning your beautiful Catholic wedding celebration.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "What God has joined together, let no one separate",
    source: "Mark 10:9"
  }

  const weddingFees = [
    { item: "Church usage donation", cost: "£400" },
    { item: "Organist (if required)", cost: "£150" },
    { item: "Cantor (if required)", cost: "£100" },
    { item: "Additional musicians", cost: "By arrangement" }
  ]

  const essentialElements = [
    {
      title: "Free Consent",
      description: "Both parties freely choose to marry",
      icon: Heart
    },
    {
      title: "Fidelity", 
      description: "Exclusive love and faithfulness",
      icon: Gem
    },
    {
      title: "Permanence",
      description: "Until death do us part",
      icon: Church
    },
    {
      title: "Openness to Life",
      description: "Welcoming children as God's gift",
      icon: Users
    },
    {
      title: "Unity",
      description: "Two become one in Christ",
      icon: Heart
    }
  ]

  return (
    <PageLayout
      title="Matrimony"
      description="Plan your Catholic wedding at St Saviour's Catholic Church. Information on marriage preparation, requirements, and celebrating your sacred covenant."
      keywords="Catholic Wedding, Church Wedding, Marriage Preparation, Wedding Ceremony, Catholic Marriage, Matrimony, Sacrament"
    >
      {/* Hero Section */}
      <PageHero
        title="Holy Matrimony"
        subtitle="A Sacred Covenant of Love"
        description="Marriage is a lifelong partnership that mirrors Christ's love for the Church, blessed by God and witnessed by the community."
        backgroundImage="/images/sacraments/wedding-ceremony.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Heart className="h-5 w-5" />}
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Plan Your Wedding
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={Gem}
            title="A Covenant of Love"
            subtitle="The sacred bond between husband and wife"
            content={matrimonyContent}
            quote={quote}
            effects={matrimonyEffects}
            requirements={matrimonyRequirements}
            effectsColor="pink"
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
                  Begin Your Journey Together
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
                  Marriage is a beautiful sacrament that deserves careful preparation and 
                  joyful celebration. We're honored to help you begin this sacred journey together.
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
                Plan Your Wedding
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