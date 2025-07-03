import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  Globe, 
  Settings, 
  Eye, 
  Clock,
  CheckCircle,
  X,
  RefreshCw,
  AlertCircle,
  Info
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

const cookieTypes = [
  {
    category: "Strictly Necessary Cookies",
    purpose: "Essential for the website to function properly",
    examples: [
      "Session cookies for form submissions",
      "Security cookies for user authentication",
      "Cookie consent preferences",
      "Language and accessibility settings"
    ],
    canOptOut: false,
    retention: "Session or until manually cleared",
    icon: Shield,
    color: "green"
  },
  {
    category: "Analytics Cookies",
    purpose: "Help us understand how visitors use our website",
    examples: [
      "Google Analytics - page views and user behavior",
      "Website performance metrics",
      "Popular content tracking",
      "Error tracking and diagnostics"
    ],
    canOptOut: true,
    retention: "26 months (Google Analytics default)",
    icon: BarChart3,
    color: "blue"
  },
  {
    category: "Functional Cookies",
    purpose: "Enable enhanced functionality and personalization",
    examples: [
      "Remembering your preferences",
      "Video player settings",
      "Newsletter subscription status",
      "Event registration details"
    ],
    canOptOut: true,
    retention: "12 months or until manually cleared",
    icon: Settings,
    color: "purple"
  },
  {
    category: "Third-Party Cookies",
    purpose: "Set by external services we use on our website",
    examples: [
      "YouTube video embeds",
      "Social media sharing buttons",
      "Online donation platform",
      "Event booking system"
    ],
    canOptOut: true,
    retention: "Varies by third-party service",
    icon: Globe,
    color: "orange"
  }
];

const thirdPartyServices = [
  {
    service: "Google Analytics",
    purpose: "Website analytics and user behavior tracking",
    cookies: ["_ga", "_ga_*", "_gid", "_gat"],
    privacy: "https://policies.google.com/privacy",
    optOut: "https://tools.google.com/dlpage/gaoptout"
  },
  {
    service: "YouTube",
    purpose: "Video embedding and streaming",
    cookies: ["VISITOR_INFO1_LIVE", "YSC", "yt-remote-*"],
    privacy: "https://policies.google.com/privacy",
    optOut: "Controlled by your YouTube/Google account settings"
  },
  {
    service: "Stripe",
    purpose: "Secure payment processing for donations",
    cookies: ["__stripe_mid", "__stripe_sid"],
    privacy: "https://stripe.com/privacy",
    optOut: "Required for payment processing"
  },
  {
    service: "Mailchimp",
    purpose: "Newsletter signup and email marketing",
    cookies: ["_mcid", "mailchimp_*"],
    privacy: "https://mailchimp.com/legal/privacy/",
    optOut: "Can be disabled by not subscribing to newsletters"
  }
];

export default function CookiePolicy() {
  const reducedMotion = prefersReducedMotion()
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
    thirdParty: true
  })

  const handlePreferenceChange = (category: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const savePreferences = () => {
    // This would typically save to localStorage and update cookie consent
    console.log('Saving preferences:', preferences)
    alert('Cookie preferences saved!')
  }

  return (
    <PageLayout
      title="Cookie Policy"
      description="St Saviour's Catholic Church Cookie Policy - how we use cookies on our website and how you can control them."
      keywords="Cookie Policy, Website Cookies, Privacy Settings, GDPR Compliance, Web Analytics"
    >
      <PageHero
        title="Cookie Policy"
        subtitle="How We Use Cookies"
        description="Learn about the cookies we use on our website and how you can control them."
        backgroundImage="/images/church/digital-privacy.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Settings className="h-5 w-5" />}
              onClick={savePreferences}
            >
              Manage Preferences
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<Info className="h-5 w-5" />}
            >
              About Cookies
            </Button>
          </Flex>
        }
      />

      {/* Introduction */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-orange-600" />
            </div>
            <Heading level="h2" align="center" className="mb-6">
              What Are Cookies?
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience and understand how our website is used.
            </Text>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <Heading level="h3" className="mb-4">
                How We Use Cookies
              </Heading>
              <Text color="muted" className="mb-6 leading-relaxed">
                St Saviour's Catholic Church uses cookies to:
              </Text>
              <div className="space-y-2">
                {[
                  "Ensure our website works properly and securely",
                  "Remember your preferences and settings",
                  "Understand how visitors use our website to help us improve it",
                  "Provide enhanced functionality like embedded videos",
                  "Remember your cookie consent choices"
                ].map((item, index) => (
                  <Flex key={index} align="start" gap="sm">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <Text color="muted">{item}</Text>
                  </Flex>
                ))}
              </div>
            </div>

            <Card variant="outlined" padding="lg" className="bg-blue-50 border-blue-200">
              <CardContent>
                <Flex align="start" gap="md">
                  <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <Heading level="h4" className="text-blue-800 mb-2">
                      Your Control
                    </Heading>
                    <Text className="text-blue-700 leading-relaxed">
                      You can control which cookies we set through your cookie preferences. 
                      Some cookies are essential for the website to work, but you can choose 
                      whether to allow others.
                    </Text>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            <div>
              <Heading level="h3" className="mb-4">
                Last Updated
              </Heading>
              <Text color="muted" className="leading-relaxed">
                This cookie policy was last updated on <Text weight="bold">1st January 2025</Text>. 
                We may update this policy from time to time to reflect changes in our use of cookies.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cookie Types */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Types of Cookies We Use
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We use different types of cookies for different purposes
            </Text>
          </div>

          <div className="space-y-8">
            {cookieTypes.map((cookie, index) => {
              const colorClasses = {
                green: { bg: 'bg-green-100', text: 'text-green-600' },
                blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
              }[cookie.color] || { bg: 'bg-gray-100', text: 'text-gray-600' }
              
              return (
                <Card
                  key={cookie.category}
                  variant="default"
                  padding="lg"
                  className="bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent>
                    <Flex align="start" gap="lg" className="mb-6">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <cookie.icon className={`h-6 w-6 ${colorClasses.text}`} />
                      </div>
                      <div className="flex-1">
                        <Flex justify="between" align="start" className="mb-4">
                          <Heading level="h3" className="text-2xl">
                            {cookie.category}
                          </Heading>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cookie.canOptOut 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {cookie.canOptOut ? 'Optional' : 'Required'}
                          </span>
                        </Flex>
                        <Text color="muted" className="mb-4">
                          {cookie.purpose}
                        </Text>
                        
                        <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
                          <div>
                            <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-2">
                              Examples:
                            </Heading>
                            <div className="space-y-1">
                              {cookie.examples.map((example, idx) => (
                                <Flex key={idx} align="start" gap="sm">
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                  <Text size="sm" color="muted">{example}</Text>
                                </Flex>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                                Retention Period:
                              </Heading>
                              <Flex align="center" gap="sm">
                                <Clock className="h-3 w-3" />
                                <Text size="sm" color="muted">{cookie.retention}</Text>
                              </Flex>
                            </div>
                            <div>
                              <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                                Can Opt Out:
                              </Heading>
                              <Flex align="center" gap="sm">
                                {cookie.canOptOut ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <Text size="sm" color="muted">Yes - you can disable these cookies</Text>
                                  </>
                                ) : (
                                  <>
                                    <X className="h-3 w-3 text-red-500" />
                                    <Text size="sm" color="muted">No - required for website functionality</Text>
                                  </>
                                )}
                              </Flex>
                            </div>
                          </div>
                        </Grid>
                      </div>
                    </Flex>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Third-Party Services */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <Heading level="h2" align="center" className="mb-6">
              Third-Party Services
            </Heading>
            <Text size="xl" align="center" color="muted" className="max-w-3xl mx-auto">
              We use some external services that may set their own cookies
            </Text>
          </div>

          <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
            {thirdPartyServices.map((service, index) => (
              <Card
                key={service.service}
                variant="outlined"
                padding="lg"
                className="bg-white hover:shadow-md transition-shadow duration-300"
              >
                <CardContent>
                  <Flex align="start" gap="md" className="mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Heading level="h3" className="text-lg mb-2">
                        {service.service}
                      </Heading>
                      <Text size="sm" color="muted">
                        {service.purpose}
                      </Text>
                    </div>
                  </Flex>
                  
                  <div className="space-y-3">
                    <div>
                      <Heading level="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        Cookies Set:
                      </Heading>
                      <div className="flex flex-wrap gap-1">
                        {service.cookies.map((cookieName, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-700"
                          >
                            {cookieName}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Flex gap="sm" wrap>
                      <Link
                        href={service.privacy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Eye className="h-3 w-3" />}
                        >
                          Privacy Policy
                        </Button>
                      </Link>
                      <span className="inline-flex items-center px-3 py-2 text-xs text-gray-600 bg-gray-50 rounded-lg">
                        <Settings className="h-3 w-3 mr-1" />
                        {service.optOut}
                      </span>
                    </Flex>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Cookie Preferences */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <div className="text-center mb-12">
            <Heading level="h2" className="text-white mb-6">
              Manage Your Cookie Preferences
            </Heading>
            <Text size="xl" className="text-gray-200 max-w-3xl mx-auto">
              You can control which cookies we set on your device
            </Text>
          </div>

          <Card variant="default" padding="lg" className="bg-white">
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Flex justify="between" align="center" className="mb-3">
                    <div>
                      <Heading level="h3" className="text-lg">
                        Strictly Necessary Cookies
                      </Heading>
                      <Text size="sm" color="muted">
                        Required for the website to function properly
                      </Text>
                    </div>
                    <Flex align="center" gap="sm">
                      <Text size="sm" color="muted">Always enabled</Text>
                      <div className="w-12 h-6 bg-green-100 rounded-full flex items-center">
                        <div className="w-5 h-5 bg-green-600 rounded-full ml-1"></div>
                      </div>
                    </Flex>
                  </Flex>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Flex justify="between" align="center" className="mb-3">
                    <div>
                      <Heading level="h3" className="text-lg">
                        Analytics Cookies
                      </Heading>
                      <Text size="sm" color="muted">
                        Help us understand how our website is used
                      </Text>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </Flex>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Flex justify="between" align="center" className="mb-3">
                    <div>
                      <Heading level="h3" className="text-lg">
                        Functional Cookies
                      </Heading>
                      <Text size="sm" color="muted">
                        Enable enhanced functionality and personalization
                      </Text>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </Flex>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Flex justify="between" align="center" className="mb-3">
                    <div>
                      <Heading level="h3" className="text-lg">
                        Third-Party Cookies
                      </Heading>
                      <Text size="sm" color="muted">
                        Set by external services like YouTube and Google Analytics
                      </Text>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.thirdParty}
                        onChange={(e) => handlePreferenceChange('thirdParty', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </Flex>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Flex gap="md" wrap>
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<CheckCircle className="h-5 w-5" />}
                      onClick={savePreferences}
                      className="flex-1"
                    >
                      Save Preferences
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      leftIcon={<X className="h-5 w-5" />}
                      onClick={() => setPreferences({ analytics: false, functional: false, thirdParty: false })}
                      className="flex-1"
                    >
                      Reject All Optional
                    </Button>
                  </Flex>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Browser Settings */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <Heading level="h2" align="center" className="mb-8">
            Browser Cookie Settings
          </Heading>
          
          <Card variant="default" padding="lg" className="bg-white">
            <CardContent>
              <Text color="muted" className="mb-6 leading-relaxed">
                You can also control cookies through your browser settings. Most browsers allow you to:
              </Text>
              
              <Grid cols={2} gap="lg" className="grid-cols-1 md:grid-cols-2 mb-8">
                <div>
                  <Heading level="h3" className="text-lg mb-3">
                    Cookie Controls
                  </Heading>
                  <div className="space-y-2">
                    {[
                      "Block all cookies",
                      "Block third-party cookies only", 
                      "Delete all cookies",
                      "Get notifications when cookies are set"
                    ].map((control, index) => (
                      <Flex key={index} align="start" gap="sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <Text color="muted">{control}</Text>
                      </Flex>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Heading level="h3" className="text-lg mb-3">
                    Browser Help
                  </Heading>
                  <div className="space-y-2">
                    {[
                      { name: "Chrome Cookie Settings", url: "https://support.google.com/chrome/answer/95647" },
                      { name: "Firefox Cookie Settings", url: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" },
                      { name: "Safari Cookie Settings", url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
                      { name: "Edge Cookie Settings", url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" }
                    ].map((browser, index) => (
                      <Link
                        key={index}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {browser.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Grid>

              <Card variant="outlined" padding="md" className="bg-yellow-50 border-yellow-200">
                <CardContent>
                  <Flex align="start" gap="md">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Heading level="h4" className="text-sm font-semibold text-yellow-800 mb-1">
                        Please Note
                      </Heading>
                      <Text size="sm" className="text-yellow-700">
                        If you disable all cookies, some parts of our website may not work properly. 
                        Essential cookies are required for basic functionality.
                      </Text>
                    </div>
                  </Flex>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Contact Information */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="text-center">
            <Heading level="h2" align="center" className="mb-8">
              Questions About Cookies?
            </Heading>
            
            <Card variant="default" padding="lg" className="bg-gray-50 max-w-4xl mx-auto">
              <CardContent>
                <Text color="muted" className="mb-6 leading-relaxed">
                  If you have any questions about our use of cookies or this cookie policy, 
                  please don't hesitate to contact us.
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
                
                <Flex justify="center" gap="md" wrap>
                  <Link href="mailto:info@stsaviourslewisham.org.uk">
                    <Button 
                      variant="primary" 
                      size="lg"
                    >
                      Email Us
                    </Button>
                  </Link>
                  <Link href="/privacy-policy">
                    <Button 
                      variant="outline" 
                      size="lg"
                    >
                      View Privacy Policy
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