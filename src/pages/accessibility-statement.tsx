import React from 'react'
import Link from 'next/link'
import { 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  Keyboard, 
  Monitor, 
  Volume2, 
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  FileText,
  Globe,
  Clock,
  Users
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

const accessibilityFeatures = [
  {
    category: "Visual Accessibility",
    features: [
      "High contrast color scheme with navy and gold",
      "Clear, readable fonts with appropriate sizing",
      "Alt text for all images and graphics",
      "Descriptive link text that makes sense out of context",
      "Good color contrast ratios meeting WCAG 2.1 AA standards"
    ],
    icon: Eye
  },
  {
    category: "Motor Accessibility",
    features: [
      "Full keyboard navigation support",
      "Large click targets (minimum 44x44 pixels)",
      "No time limits on interactions",
      "Hover states that also work with keyboard focus",
      "Easy-to-use forms with clear labels"
    ],
    icon: Hand
  },
  {
    category: "Cognitive Accessibility",
    features: [
      "Clear and simple language",
      "Consistent navigation and layout",
      "Descriptive headings and page structure",
      "No auto-playing audio or video",
      "Clear error messages and instructions"
    ],
    icon: Brain
  },
  {
    category: "Auditory Accessibility",
    features: [
      "Captions for video content",
      "Text alternatives for audio content",
      "Visual indicators for audio cues",
      "No background audio interference",
      "Compatible with hearing aids and assistive listening devices"
    ],
    icon: Ear
  }
]

const assistiveTechnologies = [
  {
    name: "Screen Readers",
    examples: ["JAWS", "NVDA", "VoiceOver", "TalkBack"],
    status: "Fully supported",
    icon: Volume2
  },
  {
    name: "Voice Control",
    examples: ["Dragon NaturallySpeaking", "Voice Control", "Voice Access"],
    status: "Supported",
    icon: Ear
  },
  {
    name: "Keyboard Navigation",
    examples: ["Tab navigation", "Arrow keys", "Enter/Space activation"],
    status: "Fully supported",
    icon: Keyboard
  },
  {
    name: "Mobile Accessibility",
    examples: ["Switch Control", "Touch accommodations", "Zoom features"],
    status: "Supported",
    icon: Smartphone
  }
]

export default function AccessibilityStatement() {
  const reducedMotion = prefersReducedMotion()

  return (
    <PageLayout
      title="Accessibility Statement"
      description="St Saviour's Catholic Church accessibility statement - our commitment to making our website accessible to everyone, including people with disabilities."
      keywords="Accessibility Statement, WCAG 2.1, Web Accessibility, Disability Access, Screen Reader, Keyboard Navigation"
    >
      <PageHero
        title="Accessibility Statement"
        subtitle="Accessible to Everyone"
        description="Our commitment to making our website accessible to all members of our community."
        backgroundImage="/images/church/accessible-community.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Mail className="h-5 w-5" />}
            >
              Report Issue
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<FileText className="h-5 w-5" />}
            >
              WCAG Guidelines
            </Button>
          </Flex>
        }
      />

      {/* Our Commitment */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <Heading level="h2" align="center" className="mb-6">
              Our Commitment to Accessibility
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              St Saviour's Catholic Church is committed to ensuring our website is accessible to everyone, 
              including people with disabilities. We believe that all people should be able to access 
              information about our parish community and participate in our digital presence.
            </Text>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <Heading level="h3" className="mb-4">
                Conformance Status
              </Heading>
              <Text color="muted" className="mb-6 leading-relaxed">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
                These guidelines explain how to make web content more accessible for people with disabilities 
                and user-friendly for everyone.
              </Text>
            </div>

            <Card variant="outlined" padding="lg" className="bg-blue-50 border-blue-200">
              <CardContent>
                <Flex align="start" gap="md">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <Heading level="h4" className="text-blue-800 mb-2">
                      Current Status
                    </Heading>
                    <Text className="text-blue-700 leading-relaxed">
                      This website is <Text weight="bold">partially conformant</Text> with WCAG 2.1 Level AA. 
                      "Partially conformant" means that some parts of the content do not fully conform 
                      to the accessibility standard. We are actively working to address all remaining issues.
                    </Text>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            <div>
              <Heading level="h3" className="mb-4">
                Last Reviewed
              </Heading>
              <Text color="muted" className="leading-relaxed">
                This accessibility statement was last reviewed on <Text weight="bold">1st January 2025</Text>. 
                We review this statement regularly and update it whenever we make changes to our website.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Accessibility Features */}
      <Section spacing="lg" background="gray">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Accessibility Features
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We have implemented numerous features to make our website accessible to all users
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
            {accessibilityFeatures.map((category, index) => (
              <Card
                key={category.category}
                variant="default"
                padding="lg"
                className="bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent>
                  <Flex align="start" gap="md" className="mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <category.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Heading level="h3" className="text-xl">
                      {category.category}
                    </Heading>
                  </Flex>
                  
                  <div className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <Flex key={idx} align="start" gap="md">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <Text size="sm" color="muted">
                          {feature}
                        </Text>
                      </Flex>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Assistive Technologies */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Assistive Technology Compatibility
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Our website is designed to work with assistive technologies
            </Text>
          </div>

          <Grid cols={4} gap="lg" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {assistiveTechnologies.map((tech, index) => (
              <Card
                key={tech.name}
                variant="outlined"
                padding="lg"
                className="bg-white text-center hover:shadow-md transition-shadow duration-300"
              >
                <CardContent>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tech.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <Heading level="h3" className="text-lg mb-2">
                    {tech.name}
                  </Heading>
                  <Text size="sm" color="muted" className="mb-3">
                    {tech.examples.join(", ")}
                  </Text>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                    {tech.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center">
            <Heading level="h2" className="text-white mb-8">
              Accessibility Feedback
            </Heading>
            
            <Card variant="default" padding="lg" className="bg-white max-w-4xl mx-auto">
              <CardContent>
                <Text color="muted" className="mb-6 leading-relaxed">
                  We welcome your feedback on the accessibility of our website. Please let us know 
                  if you encounter accessibility barriers and we will work to address them.
                </Text>
                
                <div className="space-y-2 mb-6">
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
                
                <Text color="muted" className="mb-6">
                  We aim to respond to accessibility feedback within 5 working days.
                </Text>
                
                <Flex justify="center" gap="md" wrap>
                  <Link href="mailto:info@stsaviourslewisham.org.uk">
                    <Button 
                      variant="primary" 
                      size="lg"
                      leftIcon={<Mail className="h-5 w-5" />}
                    >
                      Report Accessibility Issue
                    </Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button 
                      variant="outline" 
                      size="lg"
                      leftIcon={<Phone className="h-5 w-5" />}
                    >
                      Contact Us
                    </Button>
                  </Link>
                </Flex>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'