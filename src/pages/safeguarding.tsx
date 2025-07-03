import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Phone, 
  Mail, 
  AlertTriangle, 
  FileText, 
  Users, 
  Heart,
  Clock,
  Book,
  UserCheck,
  MapPin,
  Download,
  ExternalLink
} from 'lucide-react'

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
import { SafeguardingContactCard } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'

// CMS integration
import { getSafeguardingPhone, getContactPhone, getContactEmail, getParishPriest } from '@/lib/cms-content'

const emergencyContacts = [
  {
    situation: "Child or Adult in Immediate Danger",
    contact: "999",
    description: "Emergency Services",
    available: "24/7",
    icon: AlertTriangle,
    urgent: true
  },
  {
    situation: "Police Non-Emergency",
    contact: "101",
    description: "For non-urgent police matters",
    available: "24/7",
    icon: Phone,
    urgent: false
  },
  {
    situation: "NSPCC Helpline",
    contact: "0808 800 5000",
    description: "For concerns about a child",
    available: "24/7",
    icon: Heart,
    urgent: false
  },
  {
    situation: "Childline",
    contact: "0800 1111",
    description: "For children and young people",
    available: "24/7",
    icon: Users,
    urgent: false
  }
];

const parishContacts = [
  {
    role: "Parish Safeguarding Representative",
    name: "Sarah Mitchell",
    phone: getSafeguardingPhone(),
    email: "safeguarding@saintsaviours.org.uk",
    availability: "Monday-Friday, 9:00 AM - 5:00 PM"
  },
  {
    role: "Parish Priest",
    name: getParishPriest(),
    phone: getContactPhone(),
    email: getContactEmail(),
    availability: "By appointment"
  }
];

const diocesanContacts = [
  {
    role: "Diocesan Safeguarding Coordinator",
    name: "Helen Sheppard",
    phone: "020 8688 2181",
    email: "helen.sheppard@rcaos.org.uk",
    office: "Archdiocese of Southwark"
  },
  {
    role: "Assistant Safeguarding Coordinator",
    name: "Jeanette Donnelly",
    phone: "020 8688 2181", 
    email: "jeanette.donnelly@rcaos.org.uk",
    office: "Archdiocese of Southwark"
  }
];

const policies = [
  {
    title: "Safeguarding Policy",
    description: "Our comprehensive safeguarding policy following national and diocesan guidelines",
    downloadUrl: "/documents/safeguarding-policy.pdf",
    lastUpdated: "January 2025"
  },
  {
    title: "Code of Conduct",
    description: "Guidelines for all volunteers, staff, and clergy working with children and vulnerable adults",
    downloadUrl: "/documents/code-of-conduct.pdf",
    lastUpdated: "January 2025"
  },
  {
    title: "Safeguarding Procedures",
    description: "Step-by-step procedures for reporting and responding to safeguarding concerns",
    downloadUrl: "/documents/safeguarding-procedures.pdf",
    lastUpdated: "January 2025"
  }
];

export default function Safeguarding() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout
      title="Safeguarding"
      description="Safeguarding information for St Saviour's Catholic Church - protecting children, young people, and vulnerable adults in our parish community."
      keywords="Safeguarding, Child Protection, Vulnerable Adults, Catholic Church Safety, Diocese Southwark"
    >
      <PageHero
        title="Safeguarding"
        subtitle="Protecting Our Community"
        description="St Saviour's is committed to providing a safe environment for all members of our parish family."
        backgroundImage="/images/church/safe-community.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="h-5 w-5" />}
            >
              Emergency: 999
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Shield className="h-5 w-5" />}
            >
              Parish Contact
            </Button>
          </Flex>
        }
      />

      {/* Emergency Banner */}
      <section className="py-24 bg-red-600 relative overflow-hidden">
        <Container size="lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <Heading level="h2" className="text-white mb-6">
              Emergency Situations
            </Heading>
            <Text size="xl" className="text-red-100 mb-8 max-w-3xl mx-auto">
              If a child or adult is in immediate danger of significant or serious harm
            </Text>
            <Link href="tel:999">
              <Button 
                variant="secondary" 
                size="xl"
                leftIcon={<Phone className="h-6 w-6" />}
                className="bg-white text-red-600 hover:bg-red-50 font-bold text-xl px-8 py-4"
              >
                Call 999 Immediately
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Our Commitment */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Grid cols={2} gap="xl" className="grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <Heading level="h2" className="mb-6">
                Our Commitment to Safeguarding
              </Heading>
              <Text size="xl" color="muted" className="mb-6 leading-relaxed">
                St Saviour's Catholic Church is committed to safeguarding the welfare of all children, 
                young people, and vulnerable adults. We follow the safeguarding policies of the Catholic 
                Church in England & Wales and the Archdiocese of Southwark.
              </Text>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Safeguarding is embedded in everything we do. All clergy, religious, volunteers, 
              parishioners, and staff follow national and diocesan safeguarding policies and receive 
              appropriate training to ensure our parish remains a safe place for everyone.
            </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Safe Environment</h4>
                    <p className="text-gray-600 text-sm">Creating secure spaces for worship and community</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserCheck className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Safer Recruitment</h4>
                    <p className="text-gray-600 text-sm">Thorough vetting of all staff and volunteers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Book className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regular Training</h4>
                    <p className="text-gray-600 text-sm">Ongoing safeguarding education for all</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Support for Survivors</h4>
                    <p className="text-gray-600 text-sm">Care and assistance for those harmed by abuse</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/church/community-safe.jpg"
                alt="Safe parish community"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Emergency Contacts */}
      {/* Emergency Contacts */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Emergency Contacts
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Important numbers for safeguarding emergencies and concerns
            </Text>
          </div>

          <Grid cols={4} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {emergencyContacts.map((contact, index) => (
              <SafeguardingContactCard
                key={contact.situation}
                contact={contact}
                variant={contact.urgent ? "urgent" : "parish"}
                size="md"
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Parish Contacts */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Parish Safeguarding Team
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Our trained safeguarding representatives are here to help and support you
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
            {parishContacts.map((contact, index) => (
              <SafeguardingContactCard
                key={contact.role}
                contact={{
                  role: contact.role,
                  name: contact.name,
                  contact: contact.phone,
                  description: `Contact for safeguarding concerns and support`,
                  available: contact.availability,
                  email: contact.email,
                  icon: Users
                }}
                variant="parish"
                size="lg"
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Diocesan Contacts */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="text-white mb-6">
              Diocesan Safeguarding Team
            </Heading>
            <Text size="xl" align="center" className="text-gray-200 max-w-3xl mx-auto">
              Archdiocese of Southwark safeguarding coordinators
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
            {diocesanContacts.map((contact, index) => (
              <motion.div
                key={contact.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.role}</h3>
                  <p className="text-lg text-gold-600 font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.office}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <Link
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="text-gray-700 hover:text-gold-600 transition-colors"
                    >
                      {contact.phone}
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <Link
                      href={`mailto:${contact.email}`}
                      className="text-gray-700 hover:text-gold-600 transition-colors"
                    >
                      {contact.email}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Policies and Documents */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Safeguarding Policies
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Download our safeguarding policies and procedures
            </Text>
          </div>

          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-3">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{policy.description}</p>
                  <p className="text-xs text-gray-500 mb-4">Last updated: {policy.lastUpdated}</p>
                </div>
                <Link
                  href={policy.downloadUrl}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF
                </Link>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Training Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Safeguarding Training
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              All volunteers and staff receive appropriate safeguarding training
            </Text>
          </div>

          <Grid cols={2} gap="xl" className="grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Training Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <UserCheck className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">All Volunteers</h4>
                    <p className="text-gray-600">Basic safeguarding awareness training required</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Book className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regular Updates</h4>
                    <p className="text-gray-600">Training updated every three years minimum</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Enhanced Training</h4>
                    <p className="text-gray-600">Additional training for those working closely with children</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Support Available</h4>
                    <p className="text-gray-600">Ongoing guidance and support from our safeguarding team</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gold-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Want to Volunteer?</h3>
              <p className="text-gray-600 mb-6">
                If you're interested in volunteering with children, young people, or vulnerable adults, 
                we'll provide you with all the necessary training and support.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get in Touch
              </Link>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Additional Resources */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center">
            <Heading level="h2" align="center" className="text-white mb-6">
              Additional Resources
            </Heading>
            <Text size="xl" align="center" className="text-gray-200 mb-8 max-w-3xl mx-auto">
              Useful links and resources for safeguarding information
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="https://www.rcsouthwark.co.uk/mission/safeguarding/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-slate-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Diocese Safeguarding
              </Link>
              <Link
                href="https://www.nspcc.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200"
              >
                <Heart className="h-5 w-5 mr-2" />
                NSPCC
              </Link>
              <Link
                href="https://www.childline.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200"
              >
                <Users className="h-5 w-5 mr-2" />
                Childline
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}