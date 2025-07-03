import React from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Mail, 
  Phone, 
  Calendar,
  Database,
  UserCheck,
  AlertCircle,
  Clock,
  Globe
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
import { prefersReducedMotion } from '@/lib/utils'

const dataTypes = [
  {
    category: "Contact Information",
    examples: ["Name", "Email address", "Phone number", "Postal address"],
    purpose: "Communication about parish activities, events, and services",
    retention: "Retained while you remain an active parishioner, then archived",
    icon: Mail
  },
  {
    category: "Event Registration",
    examples: ["Event preferences", "Dietary requirements", "Emergency contacts"],
    purpose: "Managing event bookings and ensuring safety at parish events",
    retention: "Deleted 12 months after the event",
    icon: Calendar
  },
  {
    category: "Pastoral Care",
    examples: ["Sacramental records", "Pastoral visit notes", "Prayer requests"],
    purpose: "Providing appropriate spiritual care and maintaining church records",
    retention: "Permanent records as required by Canon Law",
    icon: UserCheck
  },
  {
    category: "Safeguarding",
    examples: ["DBS checks", "Training records", "Incident reports"],
    purpose: "Ensuring the safety of children and vulnerable adults",
    retention: "As required by diocesan safeguarding policies",
    icon: Shield
  },
  {
    category: "Website Usage",
    examples: ["IP address", "Browser type", "Pages visited", "Time on site"],
    purpose: "Improving website functionality and user experience",
    retention: "Anonymous analytics data retained for 26 months",
    icon: Globe
  },
  {
    category: "Financial Information",
    examples: ["Donation records", "Gift Aid declarations", "Standing orders"],
    purpose: "Processing donations and claiming Gift Aid",
    retention: "7 years as required by HMRC",
    icon: Database
  }
];

const yourRights = [
  {
    right: "Right to be Informed",
    description: "We will tell you how we use your personal data (this privacy policy)",
    icon: Eye
  },
  {
    right: "Right of Access",
    description: "You can request a copy of the personal data we hold about you",
    icon: FileText
  },
  {
    right: "Right to Rectification",
    description: "You can ask us to correct inaccurate or incomplete data",
    icon: UserCheck
  },
  {
    right: "Right to Erasure",
    description: "You can ask us to delete your data (subject to certain exemptions)",
    icon: AlertCircle
  },
  {
    right: "Right to Restrict Processing",
    description: "You can ask us to limit how we use your data",
    icon: Lock
  },
  {
    right: "Right to Data Portability",
    description: "You can ask for your data to be transferred to another organization",
    icon: Database
  }
];

export default function PrivacyPolicy() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout
      title="Privacy Policy"
      description="St Saviour's Catholic Church Privacy Policy - how we collect, use, and protect your personal data in compliance with GDPR and UK data protection law."
      keywords="Privacy Policy, GDPR, Data Protection, UK GDPR, Catholic Church Privacy, Personal Data"
    >
      <PageHero
        title="Privacy Policy"
        subtitle="Protecting Your Personal Data"
        description="How St Saviour's Catholic Church collects, uses, and protects your personal information."
        backgroundImage="/images/church/privacy-security.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Mail className="h-5 w-5" />}
            >
              Contact About Privacy
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<FileText className="h-5 w-5" />}
            >
              Request Your Data
            </Button>
          </Flex>
        }
      />

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-gold-600" />
            </div>
            <Heading level="h2" align="center" className="mb-6">
              Your Privacy Matters
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              St Saviour's Catholic Church is committed to protecting your privacy and handling your 
              personal data in accordance with UK GDPR and the Data Protection Act 2018.
            </Text>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <Heading level="h3" className="mb-4">
                Who We Are
              </Heading>
              <Text color="muted" className="mb-6 leading-relaxed">
                St Saviour's Catholic Church, Lewisham is the data controller for the personal information 
                we collect and use. We are registered with the Information Commissioner's Office (ICO) 
                under registration number [ICO Reference Number].
              </Text>
            </div>

            <Card variant="outlined" padding="lg" className="bg-gold-50 border-gold-200">
              <CardContent>
                <Flex align="start" gap="md">
                  <FileText className="h-6 w-6 text-gold-600 mt-1 flex-shrink-0" />
                  <div className="space-y-4">
                    <Heading level="h4" className="text-gold-800">
                      Contact Details
                    </Heading>
                    <div className="space-y-2">
                      <Text className="text-gold-700">
                        <Text weight="bold" className="text-gold-800">Data Controller:</Text> St Saviour's Catholic Church
                      </Text>
                      <Text className="text-gold-700">
                        <Text weight="bold" className="text-gold-800">Address:</Text> 3 Vesta Road, Lewisham, London SE13 6QJ
                      </Text>
                      <Text className="text-gold-700">
                        <Text weight="bold" className="text-gold-800">Email:</Text> info@stsaviourslewisham.org.uk
                      </Text>
                      <Text className="text-gold-700">
                        <Text weight="bold" className="text-gold-800">Phone:</Text> 020 8852 7411
                      </Text>
                      <Text className="text-gold-700">
                        <Text weight="bold" className="text-gold-800">Data Protection Officer:</Text> Available on request via the contact details above
                      </Text>
                    </div>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            <div>
              <Heading level="h3" className="mb-4">
                Last Updated
              </Heading>
              <Text color="muted" className="leading-relaxed">
                This privacy policy was last updated on <Text weight="bold">1st January 2025</Text>. We may update 
                this policy from time to time, and we will notify you of any significant changes.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* How We Collect Data */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Heading level="h2" align="center" className="mb-12">
            How We Collect Your Data
          </Heading>
          
          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-3">
            <Card variant="default" padding="lg" className="bg-white text-center">
              <CardContent>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <Heading level="h3" className="text-lg mb-2">
                  Directly from You
                </Heading>
                <Text size="sm" color="muted">
                  When you register for events, sign up for newsletters, or contact us
                </Text>
              </CardContent>
            </Card>
            <Card variant="default" padding="lg" className="bg-white text-center">
              <CardContent>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <Heading level="h3" className="text-lg mb-2">
                  Website Usage
                </Heading>
                <Text size="sm" color="muted">
                  Automatically through cookies and analytics when you visit our website
                </Text>
              </CardContent>
            </Card>
            <Card variant="default" padding="lg" className="bg-white text-center">
              <CardContent>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <Heading level="h3" className="text-lg mb-2">
                  Third Parties
                </Heading>
                <Text size="sm" color="muted">
                  From other organizations with your consent (e.g., diocesan records)
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Types of Data */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              What Data We Collect
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We only collect data that is necessary for our pastoral, administrative, and legal obligations
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
            {dataTypes.map((dataType, index) => (
              <Card
                key={dataType.category}
                variant="outlined"
                padding="lg"
                className="bg-white hover:shadow-md transition-shadow duration-300"
              >
                <CardContent>
                  <Flex align="start" gap="md" className="mb-4">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <dataType.icon className="h-5 w-5 text-gold-600" />
                    </div>
                    <Heading level="h3" className="text-xl">
                      {dataType.category}
                    </Heading>
                  </Flex>
                  
                  <div className="space-y-3">
                    <div>
                      <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        Examples:
                      </Heading>
                      <Text size="sm" color="muted">
                        {dataType.examples.join(", ")}
                      </Text>
                    </div>
                    <div>
                      <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        Purpose:
                      </Heading>
                      <Text size="sm" color="muted">
                        {dataType.purpose}
                      </Text>
                    </div>
                    <div>
                      <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        Retention:
                      </Heading>
                      <Text size="sm" color="muted">
                        {dataType.retention}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Legal Basis */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center">
            <Heading level="h2" className="text-white mb-12">
              Legal Basis for Processing
            </Heading>
            
            <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card variant="default" padding="lg" className="bg-white text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <Heading level="h3" className="text-lg mb-2">
                    Consent
                  </Heading>
                  <Text size="sm" color="muted">
                    When you give us explicit permission
                  </Text>
                </CardContent>
              </Card>
              <Card variant="default" padding="lg" className="bg-white text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <Heading level="h3" className="text-lg mb-2">
                    Legal Obligation
                  </Heading>
                  <Text size="sm" color="muted">
                    To comply with laws and regulations
                  </Text>
                </CardContent>
              </Card>
              <Card variant="default" padding="lg" className="bg-white text-center">
                <CardContent>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <Heading level="h3" className="text-lg mb-2">
                    Legitimate Interest
                  </Heading>
                  <Text size="sm" color="muted">
                    For pastoral care and church administration
                  </Text>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* Your Rights */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Your Data Protection Rights
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Under UK GDPR, you have several rights regarding your personal data
            </Text>
          </div>

          <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {yourRights.map((right, index) => (
              <Card
                key={right.right}
                variant="default"
                padding="lg"
                className="bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent>
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                    <right.icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <Heading level="h3" className="text-lg mb-3">
                    {right.right}
                  </Heading>
                  <Text size="sm" color="muted" className="leading-relaxed">
                    {right.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Card variant="default" padding="lg" className="bg-white text-center max-w-4xl mx-auto">
            <CardContent>
              <Heading level="h3" className="mb-4">
                How to Exercise Your Rights
              </Heading>
              <Text color="muted" className="mb-6">
                To exercise any of these rights, please contact us using the details below. 
                We will respond to your request within one month.
              </Text>
              <Flex justify="center" gap="md" wrap>
                <Link href="mailto:info@stsaviourslewisham.org.uk">
                  <Button 
                    variant="primary" 
                    size="lg"
                    leftIcon={<Mail className="h-5 w-5" />}
                  >
                    Email Us
                  </Button>
                </Link>
                <Link href="tel:02088527411">
                  <Button 
                    variant="outline" 
                    size="lg"
                    leftIcon={<Phone className="h-5 w-5" />}
                  >
                    Call Us
                  </Button>
                </Link>
              </Flex>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Data Security */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <Heading level="h2" align="center" className="mb-6">
              How We Protect Your Data
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We implement appropriate technical and organizational measures to ensure your data is secure
            </Text>
          </div>

          <Grid cols={2} gap="lg">
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl text-green-600">
                    Technical Measures
                  </Heading>
                  <div className="space-y-4">
                    <Flex align="start" gap="md">
                      <Lock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          SSL Encryption
                        </Heading>
                        <Text size="sm" color="muted">
                          All data transmitted to our website is encrypted
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="start" gap="md">
                      <Database className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          Secure Storage
                        </Heading>
                        <Text size="sm" color="muted">
                          Data stored on secure, password-protected systems
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="start" gap="md">
                      <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          Regular Backups
                        </Heading>
                        <Text size="sm" color="muted">
                          Data backed up regularly to prevent loss
                        </Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <div className="space-y-6">
                  <Heading level="h3" className="text-2xl text-blue-600">
                    Organizational Measures
                  </Heading>
                  <div className="space-y-4">
                    <Flex align="start" gap="md">
                      <UserCheck className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          Access Controls
                        </Heading>
                        <Text size="sm" color="muted">
                          Only authorized staff can access personal data
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="start" gap="md">
                      <FileText className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          Staff Training
                        </Heading>
                        <Text size="sm" color="muted">
                          Regular data protection training for all staff
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="start" gap="md">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-gray-900 mb-1">
                          Regular Reviews
                        </Heading>
                        <Text size="sm" color="muted">
                          We regularly review and update our security measures
                        </Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Data Sharing */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Heading level="h2" align="center" className="mb-8">
            When We Share Your Data
          </Heading>
          
          <Text color="muted" className="mb-8 leading-relaxed text-center max-w-3xl mx-auto">
            We do not sell or rent your personal data to third parties. We may share your data only in these circumstances:
          </Text>

          <div className="space-y-6">
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <Heading level="h3" className="text-xl mb-3">
                  Diocese and Church Hierarchy
                </Heading>
                <Text color="muted">
                  We may share data with the Archdiocese of Southwark or Vatican for canonical and administrative purposes.
                </Text>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <Heading level="h3" className="text-xl mb-3">
                  Legal Requirements
                </Heading>
                <Text color="muted">
                  Where required by law, such as safeguarding obligations or responding to legitimate legal requests.
                </Text>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <Heading level="h3" className="text-xl mb-3">
                  Service Providers
                </Heading>
                <Text color="muted">
                  With trusted third parties who help us provide services (e.g., email providers, website hosting), 
                  but only under strict data processing agreements.
                </Text>
              </CardContent>
            </Card>

            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <Heading level="h3" className="text-xl mb-3">
                  Emergency Situations
                </Heading>
                <Text color="muted">
                  In emergencies where sharing data is necessary to protect someone's vital interests.
                </Text>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Contact and Complaints */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center">
            <Heading level="h2" className="text-white mb-12">
              Questions or Complaints?
            </Heading>
            
            <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-gold-600" />
                  </div>
                  <Heading level="h3" className="text-xl mb-4">
                    Contact Us First
                  </Heading>
                  <Text color="muted" className="mb-6">
                    If you have any questions about this privacy policy or how we handle your data, 
                    please contact us first and we'll do our best to help.
                  </Text>
                  <div className="space-y-2 text-left">
                    <Text size="sm" color="muted">
                      <Text weight="bold">Email:</Text> info@stsaviourslewisham.org.uk
                    </Text>
                    <Text size="sm" color="muted">
                      <Text weight="bold">Phone:</Text> 020 8852 7411
                    </Text>
                    <Text size="sm" color="muted">
                      <Text weight="bold">Post:</Text> St Saviour's Catholic Church, 3 Vesta Road, Lewisham, London SE13 6QJ
                    </Text>
                  </div>
                </CardContent>
              </Card>

              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <Heading level="h3" className="text-xl mb-4">
                    ICO Complaints
                  </Heading>
                  <Text color="muted" className="mb-6">
                    If you're not satisfied with our response, you have the right to make a complaint 
                    to the Information Commissioner's Office (ICO).
                  </Text>
                  <div className="space-y-2 text-left">
                    <Text size="sm" color="muted">
                      <Text weight="bold">Website:</Text> ico.org.uk
                    </Text>
                    <Text size="sm" color="muted">
                      <Text weight="bold">Phone:</Text> 0303 123 1113
                    </Text>
                    <Text size="sm" color="muted">
                      <Text weight="bold">Post:</Text> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'