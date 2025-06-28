import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
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
} from "lucide-react";

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
      "Clear, simple language throughout",
      "Consistent navigation and layout",
      "Headings that create a logical structure",
      "Error messages that are clear and helpful",
      "Content organized in a logical, predictable way"
    ],
    icon: Brain
  },
  {
    category: "Technical Accessibility",
    features: [
      "Semantic HTML5 markup",
      "ARIA labels where appropriate",
      "Screen reader compatible structure",
      "Responsive design that works on all devices",
      "Fast loading times for slower connections"
    ],
    icon: Monitor
  }
];

const knownIssues = [
  {
    issue: "PDF Documents",
    description: "Some older PDF documents may not be fully accessible to screen readers",
    status: "We are working to make all PDFs accessible or provide alternative formats",
    timeline: "Ongoing - completed by June 2025"
  },
  {
    issue: "Video Captions",
    description: "Not all embedded videos have captions or transcripts",
    status: "Adding captions to all video content",
    timeline: "In progress - completed by March 2025"
  },
  {
    issue: "Image Gallery",
    description: "Some photos in the gallery may need more descriptive alt text",
    status: "Reviewing and improving all image descriptions",
    timeline: "In progress - completed by April 2025"
  }
];

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
];

export default function AccessibilityStatement() {
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
        height="medium"
        overlay="medium"
      />

      {/* Our Commitment */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Our Commitment to Accessibility
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              St Saviour's Catholic Church is committed to ensuring our website is accessible to everyone, 
              including people with disabilities. We believe that all people should be able to access 
              information about our parish community and participate in our digital presence.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Conformance Status</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
              These guidelines explain how to make web content more accessible for people with disabilities 
              and user-friendly for everyone.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Status</h4>
                  <p className="text-gray-700">
                    This website is <strong>partially conformant</strong> with WCAG 2.1 Level AA. 
                    "Partially conformant" means that some parts of the content do not fully conform 
                    to the accessibility standard. We are actively working to address all remaining issues.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Last Reviewed</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This accessibility statement was last reviewed on <strong>1st January 2025</strong>. 
              We review this statement regularly and update it whenever we make changes to our website.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Accessibility Features */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Accessibility Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have implemented numerous features to make our website accessible to all users
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {accessibilityFeatures.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4 flex-shrink-0">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <ul className="space-y-3">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Assistive Technologies */}
      <ContentSection background="white" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Assistive Technology Compatibility
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our website is designed to work with assistive technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assistiveTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <tech.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {tech.examples.join(", ")}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                  {tech.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Known Issues */}
      <ContentSection background="navy" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
              Known Issues & Improvements
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We are transparent about accessibility issues and our plans to fix them
            </p>
          </div>

          <div className="space-y-6">
            {knownIssues.map((issue, index) => (
              <motion.div
                key={issue.issue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md"
              >
                <div className="flex items-start mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full mr-4 flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{issue.issue}</h3>
                    <p className="text-gray-600 mb-3">{issue.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Current Status:</h4>
                        <p className="text-sm text-gray-600">{issue.status}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Timeline:</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {issue.timeline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Testing Information */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8 text-center">
            How We Test Accessibility
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Testing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">WAVE Web Accessibility Evaluation Tool</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Lighthouse accessibility audits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">axe accessibility testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Color contrast analyzers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Manual Testing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Keyboard-only navigation testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Screen reader testing (NVDA, JAWS)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Mobile accessibility testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">User testing with community members</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Feedback and Contact */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8">
            Accessibility Feedback
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Report Accessibility Issues</h3>
              <p className="text-gray-600 mb-6">
                If you encounter any accessibility barriers on our website, please let us know. 
                Your feedback helps us improve the experience for everyone.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p><strong>Email:</strong> accessibility@saintsaviours.org.uk</p>
                <p><strong>Phone:</strong> 020 8852 7411</p>
                <p><strong>Post:</strong> St Saviour's Catholic Church, 123 Church Lane, Lewisham, London SE13 7XX</p>
              </div>
              <Link
                href="mailto:accessibility@saintsaviours.org.uk"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Feedback
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alternative Formats</h3>
              <p className="text-gray-600 mb-6">
                If you need information from our website in a different format (large print, audio, etc.), 
                please contact us and we'll be happy to help.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>• Large print documents</p>
                <p>• Audio recordings</p>
                <p>• Easy-read versions</p>
                <p>• BSL interpretation (by arrangement)</p>
              </div>
              <Link
                href="tel:02088527411"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-gold-50 border border-gold-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Promise</h3>
            <p className="text-gray-600 leading-relaxed">
              We aim to respond to accessibility feedback within <strong>5 working days</strong> and to resolve 
              issues as quickly as possible. We are committed to making our website accessible to all members 
              of our community and welcome your suggestions for improvement.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Legal Information */}
      <ContentSection background="navy" padding="large">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-8">
            Legal Framework
          </h2>
          
          <div className="bg-white rounded-xl p-8 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Regulatory Compliance</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              While St Saviour's Catholic Church is not legally required to comply with the Public Sector Bodies 
              (Websites and Mobile Applications) Accessibility Regulations 2018, we voluntarily strive to meet 
              these standards as part of our commitment to inclusion and accessibility.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Standards We Follow:</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                  <li>• EN 301 549 European Accessibility Standard</li>
                  <li>• UK Government accessibility requirements (where applicable)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Preparation Date:</h4>
                <p className="text-gray-600 text-sm">
                  This statement was first prepared on 1st January 2025. It was last reviewed on 1st January 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}