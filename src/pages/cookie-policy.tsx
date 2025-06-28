import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
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
} from "lucide-react";

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
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
    thirdParty: true
  });

  const handlePreferenceChange = (category: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const savePreferences = () => {
    // This would typically save to localStorage and update cookie consent
    console.log('Saving preferences:', preferences);
    alert('Cookie preferences saved!');
  };

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
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Cookie className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience and understand how our website is used.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              St Saviour's Catholic Church uses cookies to:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Ensure our website works properly and securely</li>
              <li>• Remember your preferences and settings</li>
              <li>• Understand how visitors use our website to help us improve it</li>
              <li>• Provide enhanced functionality like embedded videos</li>
              <li>• Remember your cookie consent choices</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <div className="flex items-start">
                <Info className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Control</h4>
                  <p className="text-gray-700">
                    You can control which cookies we set through your cookie preferences. 
                    Some cookies are essential for the website to work, but you can choose 
                    whether to allow others.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Last Updated</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This cookie policy was last updated on <strong>1st January 2025</strong>. 
              We may update this policy from time to time to reflect changes in our use of cookies.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Cookie Types */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use different types of cookies for different purposes
            </p>
          </div>

          <div className="space-y-8">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mr-6 flex-shrink-0 ${
                    cookie.color === 'green' ? 'bg-green-100' :
                    cookie.color === 'blue' ? 'bg-blue-100' :
                    cookie.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <cookie.icon className={`h-6 w-6 ${
                      cookie.color === 'green' ? 'text-green-600' :
                      cookie.color === 'blue' ? 'text-blue-600' :
                      cookie.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{cookie.category}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        cookie.canOptOut 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cookie.canOptOut ? 'Optional' : 'Required'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{cookie.purpose}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Examples:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {cookie.examples.map((example, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 mr-2 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">Retention Period:</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {cookie.retention}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">Can Opt Out:</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            {cookie.canOptOut ? (
                              <>
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                Yes - you can disable these cookies
                              </>
                            ) : (
                              <>
                                <X className="h-3 w-3 text-red-500 mr-1" />
                                No - required for website functionality
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Third-Party Services */}
      <ContentSection background="white" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Third-Party Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use some external services that may set their own cookies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-4 flex-shrink-0">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.service}</h3>
                    <p className="text-gray-600 text-sm">{service.purpose}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Cookies Set:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.cookies.map((cookieName, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-gray-100 text-gray-700"
                        >
                          {cookieName}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={service.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Privacy Policy
                    </Link>
                    <span className="inline-flex items-center px-3 py-2 text-xs text-gray-600 bg-gray-50 rounded-lg">
                      <Settings className="h-3 w-3 mr-1" />
                      {service.optOut}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Cookie Preferences */}
      <ContentSection background="navy" padding="large">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
              Manage Your Cookie Preferences
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              You can control which cookies we set on your device
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Strictly Necessary Cookies</h3>
                    <p className="text-sm text-gray-600">Required for the website to function properly</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Always enabled</span>
                    <div className="w-12 h-6 bg-green-100 rounded-full flex items-center">
                      <div className="w-5 h-5 bg-green-600 rounded-full ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">Help us understand how our website is used</p>
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
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                    <p className="text-sm text-gray-600">Enable enhanced functionality and personalization</p>
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
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Third-Party Cookies</h3>
                    <p className="text-sm text-gray-600">Set by external services like YouTube and Google Analytics</p>
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
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={savePreferences}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setPreferences({ analytics: false, functional: false, thirdParty: false })}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject All Optional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Browser Settings */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8 text-center">
            Browser Cookie Settings
          </h2>
          
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-gray-600 mb-6 leading-relaxed">
              You can also control cookies through your browser settings. Most browsers allow you to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Controls</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Block all cookies
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Block third-party cookies only
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Delete all cookies
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Get notifications when cookies are set
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Help</h3>
                <div className="space-y-2">
                  <Link
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Chrome Cookie Settings
                  </Link>
                  <Link
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Firefox Cookie Settings
                  </Link>
                  <Link
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Safari Cookie Settings
                  </Link>
                  <Link
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Edge Cookie Settings
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">Please Note</h4>
                  <p className="text-sm text-yellow-700">
                    If you disable all cookies, some parts of our website may not work properly. 
                    Essential cookies are required for basic functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Contact Information */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8">
            Questions About Cookies?
          </h2>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-gray-600 mb-6 leading-relaxed">
              If you have any questions about our use of cookies or this cookie policy, 
              please don't hesitate to contact us.
            </p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p><strong>Email:</strong> privacy@saintsaviours.org.uk</p>
              <p><strong>Phone:</strong> 020 8852 7411</p>
              <p><strong>Post:</strong> St Saviour's Catholic Church, 123 Church Lane, Lewisham, London SE13 7XX</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:privacy@saintsaviours.org.uk"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
              >
                Email Us
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors duration-200"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}