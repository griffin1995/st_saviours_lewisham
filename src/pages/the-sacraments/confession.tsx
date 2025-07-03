import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon as Heart, 
  CalendarDaysIcon as Calendar, 
  PhoneIcon as Phone, 
  BookOpenIcon as BookOpen, 
  ClockIcon as Clock, 
  ShieldCheckIcon as Shield, 
  ArrowRightIcon as ArrowRight, 
  CheckCircleIcon as CheckCircle 
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

export default function Confession() {
  const reducedMotion = prefersReducedMotion()

  const confessionContent = [
    "The Sacrament of Confession, also known as Reconciliation or Penance, is God's gift of forgiveness and healing. Through this sacrament, we receive absolution from our sins and are restored to full communion with God and the Church.",
    "Christ gave the apostles the power to forgive sins, and this authority continues in the Church today through ordained priests. No sin is too great for God's infinite mercy and love."
  ]

  const confessionEffects = [
    {
      title: "Forgiveness of Sins",
      description: "All sins confessed with true contrition are completely forgiven"
    },
    {
      title: "Grace and Strength",
      description: "Receive actual grace to resist temptation and live virtuously"
    },
    {
      title: "Peace of Conscience",
      description: "Experience the peace that comes from knowing you are forgiven"
    },
    {
      title: "Spiritual Direction",
      description: "Receive guidance and advice for your spiritual journey"
    },
    {
      title: "Reconciliation",
      description: "Restore your relationship with God and the Church community"
    }
  ]

  const confessionRequirements = [
    {
      title: "Examination of Conscience",
      items: [
        "Reflect on your actions since last confession",
        "Consider how you have fallen short of God's love",
        "Review the Ten Commandments and Church teachings",
        "Ask the Holy Spirit for guidance",
        "Examine thoughts, words, and actions"
      ]
    },
    {
      title: "Contrition",
      items: [
        "Feel genuine sorrow for your sins",
        "Resolve to avoid sin in the future",
        "Trust in God's mercy and forgiveness",
        "Desire to make amends where possible",
        "Commit to change with God's grace"
      ]
    },
    {
      title: "Confession Process",
      items: [
        "Confess sins honestly and completely",
        "Start with time since last confession",
        "Listen to the priest's counsel",
        "Receive absolution gratefully",
        "Complete assigned penance"
      ]
    }
  ]

  const contactInfo = {
    title: "Ready to Experience God's Mercy?",
    description: "Don't let fear or shame keep you from God's infinite mercy. Take the first step toward reconciliation and peace.",
    phone: "020 8852 7411",
    email: "info@stsaviourslewisham.org.uk"
  }

  const quote = {
    text: "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained",
    source: "John 20:22-23"
  }

  const confessionTimes = [
    { day: "Saturday", time: "5:00 PM - 5:45 PM", note: "Before Vigil Mass" },
    { day: "Sunday", time: "After 9:00 AM Mass", note: "Approximately 10:00 AM" },
    { day: "Wednesday", time: "7:00 PM - 7:30 PM", note: "After weekday Mass" }
  ]

  const confessionSteps = [
    {
      step: 1,
      title: "Examination of Conscience",
      description: "Reflect on your actions, thoughts, and omissions since your last confession",
      icon: Shield,
      color: "bg-navy-600"
    },
    {
      step: 2,
      title: "Contrition",
      description: "Feel genuine sorrow for your sins and resolve to avoid sin in the future",
      icon: Heart,
      color: "bg-navy-700"
    },
    {
      step: 3,
      title: "Confession",
      description: "Confess your sins honestly and completely to the priest",
      icon: BookOpen,
      color: "bg-navy-800"
    },
    {
      step: 4,
      title: "Absolution",
      description: "The priest grants absolution in the name of the Father, Son, and Holy Spirit",
      icon: CheckCircle,
      color: "bg-navy-500"
    }
  ]

  return (
    <PageLayout
      title="Confession"
      description="Learn about the Sacrament of Confession at St Saviour's Catholic Church. Information on confession times, how to confess, and God's mercy."
      keywords="Catholic Confession, Reconciliation, Penance, Forgiveness, Absolution, Confession Times, Sacrament"
    >
      {/* Hero Section */}
      <PageHero
        title="Sacrament of Confession"
        subtitle="God's Gift of Forgiveness"
        description="Experience God's infinite mercy and forgiveness through the sacrament of confession and reconciliation."
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
              Schedule Confession
            </Button>
          </Flex>
        }
      />

      {/* Sacrament Information */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <SacramentInfo
            icon={Heart}
            title="Reconciliation and Peace"
            subtitle="The sacrament of forgiveness and healing"
            content={confessionContent}
            quote={quote}
            effects={confessionEffects}
            requirements={confessionRequirements}
            effectsColor="green"
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
                  Experience God's Infinite Mercy
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
                  No sin is too great for God's mercy. Come and experience the peace 
                  and joy that comes from knowing you are completely forgiven and loved.
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
                Schedule Confession
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