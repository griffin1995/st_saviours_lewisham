import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
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
} from "lucide-react";

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
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-gold-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              St Saviour's Catholic Church is committed to protecting your privacy and handling your 
              personal data in accordance with UK GDPR and the Data Protection Act 2018.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              St Saviour's Catholic Church, Lewisham is the data controller for the personal information 
              we collect and use. We are registered with the Information Commissioner's Office (ICO) 
              under registration number [ICO Reference Number].
            </p>

            <div className="bg-gold-50 border-l-4 border-gold-600 p-6 mb-8">
              <div className="flex items-start">
                <FileText className="h-6 w-6 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Details</h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Data Controller:</strong> St Saviour's Catholic Church<br />
                    <strong>Address:</strong> 123 Church Lane, Lewisham, London SE13 7XX<br />
                    <strong>Email:</strong> privacy@saintsaviours.org.uk<br />
                    <strong>Phone:</strong> 020 8852 7411
                  </p>
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong> Available on request via the contact details above
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Last Updated</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This privacy policy was last updated on <strong>1st January 2025</strong>. We may update 
              this policy from time to time, and we will notify you of any significant changes.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* How We Collect Data */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8 text-center">
            How We Collect Your Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Directly from You</h3>
              <p className="text-gray-600 text-sm">
                When you register for events, sign up for newsletters, or contact us
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Usage</h3>
              <p className="text-gray-600 text-sm">
                Automatically through cookies and analytics when you visit our website
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Third Parties</h3>
              <p className="text-gray-600 text-sm">
                From other organizations with your consent (e.g., diocesan records)
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Types of Data */}
      <ContentSection background="white" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              What Data We Collect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We only collect data that is necessary for our pastoral, administrative, and legal obligations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dataTypes.map((dataType, index) => (
              <motion.div
                key={dataType.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gold-100 rounded-full mr-4 flex-shrink-0">
                    <dataType.icon className="h-5 w-5 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{dataType.category}</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Examples:</h4>
                    <p className="text-sm text-gray-600">{dataType.examples.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Purpose:</h4>
                    <p className="text-sm text-gray-600">{dataType.purpose}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Retention:</h4>
                    <p className="text-sm text-gray-600">{dataType.retention}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Legal Basis */}
      <ContentSection background="navy" padding="large">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-8">
            Legal Basis for Processing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consent</h3>
              <p className="text-gray-600 text-sm">When you give us explicit permission</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Obligation</h3>
              <p className="text-gray-600 text-sm">To comply with laws and regulations</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legitimate Interest</h3>
              <p className="text-gray-600 text-sm">For pastoral care and church administration</p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Your Rights */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Your Data Protection Rights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Under UK GDPR, you have several rights regarding your personal data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yourRights.map((right, index) => (
              <motion.div
                key={right.right}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
                  <right.icon className="h-6 w-6 text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{right.right}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{right.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Exercise Your Rights</h3>
              <p className="text-gray-600 mb-6">
                To exercise any of these rights, please contact us using the details below. 
                We will respond to your request within one month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:privacy@saintsaviours.org.uk"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </Link>
                <Link
                  href="tel:02088527411"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Data Security */}
      <ContentSection background="white" padding="large">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              How We Protect Your Data
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to ensure your data is secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Technical Measures</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Lock className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">SSL Encryption</h4>
                    <p className="text-gray-600 text-sm">All data transmitted to our website is encrypted</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Database className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Storage</h4>
                    <p className="text-gray-600 text-sm">Data stored on secure, password-protected systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regular Backups</h4>
                    <p className="text-gray-600 text-sm">Data backed up regularly to prevent loss</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Organizational Measures</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <UserCheck className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Access Controls</h4>
                    <p className="text-gray-600 text-sm">Only authorized staff can access personal data</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Staff Training</h4>
                    <p className="text-gray-600 text-sm">Regular data protection training for all staff</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regular Reviews</h4>
                    <p className="text-gray-600 text-sm">We regularly review and update our security measures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Data Sharing */}
      <ContentSection background="gray" padding="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-8 text-center">
            When We Share Your Data
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6 leading-relaxed">
              We do not sell or rent your personal data to third parties. We may share your data only in these circumstances:
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Diocese and Church Hierarchy</h3>
                <p className="text-gray-600">
                  We may share data with the Archdiocese of Southwark or Vatican for canonical and administrative purposes.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                <p className="text-gray-600">
                  Where required by law, such as safeguarding obligations or responding to legitimate legal requests.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-600">
                  With trusted third parties who help us provide services (e.g., email providers, website hosting), 
                  but only under strict data processing agreements.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Situations</h3>
                <p className="text-gray-600">
                  In emergencies where sharing data is necessary to protect someone's vital interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Contact and Complaints */}
      <ContentSection background="navy" padding="large">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-8">
            Questions or Complaints?
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
                <Mail className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us First</h3>
              <p className="text-gray-600 mb-6">
                If you have any questions about this privacy policy or how we handle your data, 
                please contact us first and we'll do our best to help.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> privacy@saintsaviours.org.uk</p>
                <p><strong>Phone:</strong> 020 8852 7411</p>
                <p><strong>Post:</strong> St Saviour's Catholic Church, 123 Church Lane, Lewisham, London SE13 7XX</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ICO Complaints</h3>
              <p className="text-gray-600 mb-6">
                If you're not satisfied with our response, you have the right to make a complaint 
                to the Information Commissioner's Office (ICO).
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Website:</strong> ico.org.uk</p>
                <p><strong>Phone:</strong> 0303 123 1113</p>
                <p><strong>Post:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}