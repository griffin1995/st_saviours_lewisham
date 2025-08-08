import React, { useState, useEffect } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";
import {
  useSpring as useReactSpring,
  animated,
  useTrail as useReactTrail,
} from "@react-spring/web";
import {
  ShieldCheckIcon as Shield,
  LockClosedIcon as Lock,
  EyeIcon as Eye,
  DocumentTextIcon as FileText,
  EnvelopeIcon as Mail,
  PhoneIcon as Phone,
  CalendarDaysIcon as Calendar,
  ServerIcon as Database,
  UserIcon as UserCheck,
  ExclamationTriangleIcon as AlertCircle,
  ClockIcon as Clock,
  GlobeAltIcon as Globe,
  CheckCircleIcon as CheckCircle,
  CogIcon as Cog,
  ChartBarIcon as ChartBar,
  BellIcon as Bell,
  KeyIcon as Key,
  ShareIcon as Share,
  ArrowRightIcon as ArrowRight,
} from "@heroicons/react/24/solid";

// New modern component system
import { PageLayout, PageHero } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  Heading,
  Text,
  Section,
  Container,
  Grid,
  Flex,
} from "@/components/ui";
import { prefersReducedMotion } from "@/lib/utils";

// Enhanced Components
import { PolicyPageScriptureSection } from '@/components/shared/content';
import { PolicyPageSocialSystem } from '@/components/shared/social';

const dataTypes = [
  {
    category: "Contact Information",
    examples: ["Name", "Email address", "Phone number", "Postal address"],
    purpose: "Communication about parish activities, events, and services",
    retention: "Retained while you remain an active parishioner, then archived",
    icon: Mail,
  },
  {
    category: "Event Registration",
    examples: [
      "Event preferences",
      "Dietary requirements",
      "Emergency contacts",
    ],
    purpose: "Managing event bookings and ensuring safety at parish events",
    retention: "Deleted 12 months after the event",
    icon: Calendar,
  },
  {
    category: "Pastoral Care",
    examples: [
      "Sacramental records",
      "Pastoral visit notes",
      "Prayer requests",
    ],
    purpose:
      "Providing appropriate spiritual care and maintaining church records",
    retention: "Permanent records as required by Canon Law",
    icon: UserCheck,
  },
  {
    category: "Safeguarding",
    examples: ["DBS checks", "Training records", "Incident reports"],
    purpose: "Ensuring the safety of children and vulnerable adults",
    retention: "As required by diocesan safeguarding policies",
    icon: Shield,
  },
  {
    category: "Website Usage",
    examples: ["IP address", "Browser type", "Pages visited", "Time on site"],
    purpose: "Improving website functionality and user experience",
    retention: "Anonymous analytics data retained for 26 months",
    icon: Globe,
  },
  {
    category: "Financial Information",
    examples: ["Donation records", "Gift Aid declarations", "Standing orders"],
    purpose: "Processing donations and claiming Gift Aid",
    retention: "7 years as required by HMRC",
    icon: Database,
  },
];

const yourRights = [
  {
    right: "Right to be Informed",
    description:
      "We will tell you how we use your personal data (this privacy policy)",
    icon: Eye,
  },
  {
    right: "Right of Access",
    description:
      "You can request a copy of the personal data we hold about you",
    icon: FileText,
  },
  {
    right: "Right to Rectification",
    description: "You can ask us to correct inaccurate or incomplete data",
    icon: UserCheck,
  },
  {
    right: "Right to Erasure",
    description:
      "You can ask us to delete your data (subject to certain exemptions)",
    icon: AlertCircle,
  },
  {
    right: "Right to Restrict Processing",
    description: "You can ask us to limit how we use your data",
    icon: Lock,
  },
  {
    right: "Right to Data Portability",
    description:
      "You can ask for your data to be transferred to another organization",
    icon: Database,
  },
];

// Enhanced Privacy Controls Component
interface PrivacyPreference {
  category: string;
  enabled: boolean;
  description: string;
  icon: any;
}

const InteractivePrivacyControls = () => {
  const [preferences, setPreferences] = useState<PrivacyPreference[]>([
    {
      category: "Analytics",
      enabled: true,
      description: "Allow collection of anonymized website usage data",
      icon: ChartBar,
    },
    {
      category: "Communications",
      enabled: true,
      description: "Receive parish newsletters and event notifications",
      icon: Mail,
    },
    {
      category: "Pastoral Care",
      enabled: true,
      description: "Enable pastoral care and prayer request systems",
      icon: Shield,
    },
    {
      category: "Event Registration",
      enabled: false,
      description: "Store registration information for future events",
      icon: Calendar,
    },
  ]);
  const [hasChanges, setHasChanges] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const togglePreference = (index: number) => {
    const newPreferences = [...preferences];
    newPreferences[index].enabled = !newPreferences[index].enabled;
    setPreferences(newPreferences);
    setHasChanges(true);
  };

  const savePreferences = () => {
    // Save to localStorage or API
    localStorage.setItem("privacy-preferences", JSON.stringify(preferences));
    setHasChanges(false);
  };

  const resetPreferences = () => {
    setPreferences((prefs) =>
      prefs.map((pref) => ({ ...pref, enabled: true }))
    );
    setHasChanges(true);
  };

  const springProps = useReactSpring({
    opacity: hasChanges ? 1 : 0,
    transform: hasChanges ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Cog className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Privacy Controls
          </Heading>
        </div>

        <div className="space-y-4">
          {preferences.map((pref, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mt-1">
                  {React.createElement(pref.icon, {
                    className: "h-4 w-4 text-slate-900",
                  })}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Text className="font-medium text-white">
                      {pref.category}
                    </Text>
                    <button
                      onClick={() => togglePreference(index)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        pref.enabled ? "bg-blue-600" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pref.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <Text className="text-sm text-gray-300">
                    {pref.description}
                  </Text>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <animated.div style={springProps} className="space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={savePreferences}
              className="bg-blue-600 text-white hover:bg-blue-700"
              leftIcon={<CheckCircle className="h-4 w-4" />}
            >
              Save Preferences
            </Button>
            <Button
              onClick={resetPreferences}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              Reset All
            </Button>
          </div>
          <Text className="text-xs text-gray-400">
            Changes will take effect immediately and be saved to your browser.
          </Text>
        </animated.div>
      </div>
    </div>
  );
};

// GDPR Compliance Dashboard
const GDPRComplianceTracker = () => {
  const [dataRequests, setDataRequests] = useState([
    {
      type: "Access Request",
      status: "pending",
      date: "2025-01-10",
      id: "DR001",
    },
    {
      type: "Data Export",
      status: "completed",
      date: "2025-01-08",
      id: "DR002",
    },
    {
      type: "Data Deletion",
      status: "processing",
      date: "2025-01-12",
      id: "DR003",
    },
  ]);
  const [requestType, setRequestType] = useState<
    "access" | "export" | "deletion"
  >("access");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const submitRequest = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newRequest = {
      type:
        requestType === "access"
          ? "Access Request"
          : requestType === "export"
            ? "Data Export"
            : "Data Deletion",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      id: `DR${String(dataRequests.length + 1).padStart(3, "0")}`,
    };

    setDataRequests([newRequest, ...dataRequests]);
    setIsSubmitting(false);
  };

  const springProps = useReactSpring({
    transform: isSubmitting ? "scale(0.95)" : "scale(1)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            GDPR Compliance Centre
          </Heading>
        </div>

        {/* Request Form */}
        <div className="space-y-4">
          <Text className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
            Submit Data Request:
          </Text>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setRequestType("access")}
              className={`text-sm ${requestType === "access" ? "bg-blue-500 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}
            >
              Access My Data
            </Button>
            <Button
              onClick={() => setRequestType("export")}
              className={`text-sm ${requestType === "export" ? "bg-blue-500 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}
            >
              Export Data
            </Button>
            <Button
              onClick={() => setRequestType("deletion")}
              className={`text-sm ${requestType === "deletion" ? "bg-blue-500 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}
            >
              Delete Data
            </Button>
          </div>

          <animated.div style={springProps}>
            <Button
              onClick={submitRequest}
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
              leftIcon={
                isSubmitting ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Share className="h-4 w-4" />
                )
              }
            >
              {isSubmitting ? "Submitting..." : `Submit ${requestType} Request`}
            </Button>
          </animated.div>
        </div>

        {/* Request History */}
        <div className="space-y-3">
          <Text className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
            Request History:
          </Text>
          <div className="space-y-2">
            {dataRequests.map((request, index) => (
              <m.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        request.status === "completed"
                          ? "bg-green-500"
                          : request.status === "processing"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <Text className="text-sm font-medium text-white">
                        {request.type}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        #{request.id}
                      </Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <Text
                      className={`text-xs font-medium capitalize ${
                        request.status === "completed"
                          ? "text-green-400"
                          : request.status === "processing"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    >
                      {request.status}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {request.date}
                    </Text>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PrivacyPolicy() {
  const reducedMotion = prefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced analytics integration
  useEffect(() => {
    // Track page engagement
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      // Analytics would be sent here
    };
  }, []);

  // Scripture for privacy/protection theme
  const privacyScripture = {
    verse: "You have searched me, Lord, and you know me.",
    reference: "Psalm 139:1",
    theme: "trust",
  };

  // Parallax effect calculation
  const parallaxOffset = {
    x:
      typeof window !== "undefined"
        ? (mousePosition.x - window.innerWidth / 2) * 0.01
        : 0,
    y:
      typeof window !== "undefined"
        ? (mousePosition.y - window.innerHeight / 2) * 0.01
        : 0,
  };

  // React Spring animations
  const heroSpring = useReactSpring({
    transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
    config: { tension: 300, friction: 50 },
  });

  const fadeInSpring = useReactSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(30px)" },
    config: { tension: 280, friction: 60 },
  });

  return (
      <PageLayout
        title="Privacy Policy"
        description="St Saviour's Catholic Church Privacy Policy - how we collect, use, and protect your personal data in compliance with GDPR and UK data protection law."
        keywords="Privacy Policy, GDPR, Data Protection, UK GDPR, Catholic Church Privacy, Personal Data"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>
            Privacy Policy page loaded with interactive privacy controls and
            GDPR compliance tracker
          </h1>
          <p>
            Use Alt+P to access privacy controls, Alt+G for GDPR compliance,
            Alt+A for analytics
          </p>
        </div>

        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
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
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() =>
                    document
                      .getElementById("privacy-controls")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  onKeyDown={(e) =>
                    e.key === "p" &&
                    document
                      .getElementById("privacy-controls")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Privacy Controls
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<FileText className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() =>
                    document
                      .getElementById("gdpr-compliance")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  GDPR Centre
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Introduction with Enhanced Features */}
        <Section spacing="lg" background="slate" id="privacy-intro">
          <Container size="lg">
            <animated.div style={fadeInSpring}>
              <div className="text-center mb-12">
                <m.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Shield className="h-8 w-8 text-slate-900" />
                </m.div>
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Your Privacy Matters
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="xl" className="text-gray-300 max-w-3xl mx-auto">
                  St Saviour's Catholic Church is committed to protecting your
                  privacy and handling your personal data in accordance with UK
                  GDPR and the Data Protection Act 2018.
                </Text>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <Heading level="h3" className="mb-4 text-white">
                    Who We Are
                  </Heading>
                  <Text className="text-gray-300 mb-6 leading-relaxed">
                    St Saviour's Catholic Church, Lewisham is the data
                    controller for the personal information we collect and use.
                    We are registered with the Information Commissioner's Office
                    (ICO) under registration number [ICO Reference Number].
                  </Text>
                </div>

                <Card
                  variant="outlined"
                  padding="lg"
                  className="bg-white/10 backdrop-blur-sm border border-slate-600"
                >
                  <CardContent>
                    <Flex align="start" gap="md">
                      <FileText className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div className="space-y-4">
                        <Heading level="h4" className="text-blue-400">
                          Contact Details
                        </Heading>
                        <div className="space-y-2">
                          <Text className="text-gray-300">
                            <Text weight="bold" className="text-white">
                              Data Controller:
                            </Text>{" "}
                            St Saviour's Catholic Church
                          </Text>
                          <Text className="text-gray-300">
                            <Text weight="bold" className="text-white">
                              Address:
                            </Text>{" "}
                            3 Vesta Road, Lewisham, London SE13 6QJ
                          </Text>
                          <Text className="text-gray-300">
                            <Text weight="bold" className="text-white">
                              Email:
                            </Text>{" "}
                            info@stsaviourslewisham.org.uk
                          </Text>
                          <Text className="text-gray-300">
                            <Text weight="bold" className="text-white">
                              Phone:
                            </Text>{" "}
                            020 8852 7411
                          </Text>
                          <Text className="text-gray-300">
                            <Text weight="bold" className="text-white">
                              Data Protection Officer:
                            </Text>{" "}
                            Available on request via the contact details above
                          </Text>
                        </div>
                      </div>
                    </Flex>
                  </CardContent>
                </Card>

                <div>
                  <Heading level="h3" className="mb-4 text-white">
                    Last Updated
                  </Heading>
                  <Text className="text-gray-300 leading-relaxed">
                    This privacy policy was last updated on{" "}
                    <Text weight="bold" className="text-white">
                      1st January 2025
                    </Text>
                    . We may update this policy from time to time, and we will
                    notify you of any significant changes.
                  </Text>
                </div>
              </div>
            </animated.div>
          </Container>
        </Section>

        {/* Scripture Card */}
        <Section spacing="md" background="slate">
          <Container size="lg">
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PolicyPageScriptureSection
                pageTheme="privacy-policy"
                reducedMotion={reducedMotion}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>

        {/* Interactive Privacy Controls */}
        <Section spacing="lg" background="slate" id="privacy-controls">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Privacy Controls
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Manage your privacy preferences and control how your data is
                  used by our parish systems.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InteractivePrivacyControls />
                {/* <PerformanceMonitor /> */}
              </div>
            </div>
          </Container>
        </Section>

        {/* GDPR Compliance Centre */}
        <Section spacing="lg" background="slate" id="gdpr-compliance">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    GDPR Compliance Centre
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Exercise your data protection rights with our comprehensive
                  GDPR compliance tools.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GDPRComplianceTracker />
                {/* <AccessibilityEnhancer /> */}
              </div>
            </div>
          </Container>
        </Section>

        {/* How We Collect Data */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    How We Collect Your Data
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  Understanding our data collection methods helps you make
                  informed decisions about your privacy.
                </Text>
              </div>

              <Grid cols={3} gap="lg" className="grid-cols-1 md:grid-cols-3">
                {[
                  {
                    icon: UserCheck,
                    title: "Directly from You",
                    description:
                      "When you register for events, sign up for newsletters, or contact us",
                    color: "blue",
                  },
                  {
                    icon: Globe,
                    title: "Website Usage",
                    description:
                      "Automatically through cookies and analytics when you visit our website",
                    color: "green",
                  },
                  {
                    icon: FileText,
                    title: "Third Parties",
                    description:
                      "From other organizations with your consent (e.g., diocesan records)",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      variant="default"
                      padding="lg"
                      className="bg-white/10 backdrop-blur-sm border border-slate-600 text-center hover:border-blue-500 transition-all duration-300"
                    >
                      <CardContent>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                          {React.createElement(item.icon, {
                            className: "h-6 w-6 text-slate-900",
                          })}
                        </div>
                        <Heading level="h3" className="text-lg mb-2 text-white">
                          {item.title}
                        </Heading>
                        <Text size="sm" className="text-gray-300">
                          {item.description}
                        </Text>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Types of Data */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    What Data We Collect
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  We only collect data that is necessary for our pastoral,
                  administrative, and legal obligations
                </Text>
              </div>

              <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
                {dataTypes.map((dataType, index) => (
                  <m.div
                    key={dataType.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      variant="outlined"
                      padding="lg"
                      className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent>
                        <Flex align="start" gap="md" className="mb-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <dataType.icon className="h-5 w-5 text-slate-900" />
                          </div>
                          <Heading level="h3" className="text-xl text-white">
                            {dataType.category}
                          </Heading>
                        </Flex>

                        <div className="space-y-3">
                          <div>
                            <Heading
                              level="h4"
                              className="text-sm font-semibold text-blue-400 mb-1"
                            >
                              Examples:
                            </Heading>
                            <Text size="sm" className="text-gray-300">
                              {dataType.examples.join(", ")}
                            </Text>
                          </div>
                          <div>
                            <Heading
                              level="h4"
                              className="text-sm font-semibold text-blue-400 mb-1"
                            >
                              Purpose:
                            </Heading>
                            <Text size="sm" className="text-gray-300">
                              {dataType.purpose}
                            </Text>
                          </div>
                          <div>
                            <Heading
                              level="h4"
                              className="text-sm font-semibold text-blue-400 mb-1"
                            >
                              Retention:
                            </Heading>
                            <Text size="sm" className="text-gray-300">
                              {dataType.retention}
                            </Text>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Legal Basis */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="text-center">
              <Heading level="h2" className="text-white mb-12">
                Legal Basis for Processing
              </Heading>

              <Grid
                cols={3}
                gap="lg"
                className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center"
                >
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
                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center"
                >
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
                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white text-center"
                >
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
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <div className="text-center mb-12">
              <Heading level="h2" align="center" className="mb-6 text-white">
                Your Data Protection Rights
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-300"
              >
                Under UK GDPR, you have several rights regarding your personal
                data
              </Text>
            </div>

            <Grid
              cols={3}
              gap="lg"
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12"
            >
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

            <Card
              variant="default"
              padding="lg"
              className="bg-white text-center max-w-4xl mx-auto"
            >
              <CardContent>
                <Heading level="h3" className="mb-4">
                  How to Exercise Your Rights
                </Heading>
                <Text color="muted" className="mb-6">
                  To exercise any of these rights, please contact us using the
                  details below. We will respond to your request within one
                  month.
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
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <Heading level="h2" align="center" className="mb-6 text-white">
                How We Protect Your Data
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-300"
              >
                We implement appropriate technical and organizational measures
                to ensure your data is secure
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
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <Heading level="h2" align="center" className="mb-8 text-white">
              When We Share Your Data
            </Heading>

            <Text className="mb-8 leading-relaxed text-center max-w-3xl mx-auto text-gray-300">
              We do not sell or rent your personal data to third parties. We may
              share your data only in these circumstances:
            </Text>

            <div className="space-y-6">
              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <Heading level="h3" className="text-xl mb-3">
                    Diocese and Church Hierarchy
                  </Heading>
                  <Text color="muted">
                    We may share data with the Archdiocese of Southwark or
                    Vatican for canonical and administrative purposes.
                  </Text>
                </CardContent>
              </Card>

              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <Heading level="h3" className="text-xl mb-3">
                    Legal Requirements
                  </Heading>
                  <Text color="muted">
                    Where required by law, such as safeguarding obligations or
                    responding to legitimate legal requests.
                  </Text>
                </CardContent>
              </Card>

              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <Heading level="h3" className="text-xl mb-3">
                    Service Providers
                  </Heading>
                  <Text color="muted">
                    With trusted third parties who help us provide services
                    (e.g., email providers, website hosting), but only under
                    strict data processing agreements.
                  </Text>
                </CardContent>
              </Card>

              <Card variant="default" padding="lg" className="bg-white">
                <CardContent>
                  <Heading level="h3" className="text-xl mb-3">
                    Emergency Situations
                  </Heading>
                  <Text color="muted">
                    In emergencies where sharing data is necessary to protect
                    someone's vital interests.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Section Divider */}
        <div className="flex justify-center py-20 bg-slate-900">
          <m.div
            className="w-[640px] h-px"
            style={{
              backgroundColor: "#ffffff",
              height: "1px",
              boxShadow: "0 0 1px rgba(255,255,255,0.5)",
            }}
            initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
            whileInView={reducedMotion ? { opacity: 1 } : { width: 640 }}
            transition={
              reducedMotion ? { duration: 0.3 } : { duration: 1.5, delay: 0.2 }
            }
            viewport={{ once: true }}
          />
        </div>

        {/* Contact and Complaints */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Questions or Complaints?
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                  We're here to help with any privacy concerns or questions you
                  may have.
                </Text>
              </div>

              <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-blue-500 transition-all duration-300"
                  >
                    <CardContent>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-6 w-6 text-slate-900" />
                      </div>
                      <Heading level="h3" className="text-xl mb-4 text-white">
                        Contact Us First
                      </Heading>
                      <Text className="text-gray-300 mb-6">
                        If you have any questions about this privacy policy or
                        how we handle your data, please contact us first and
                        we'll do our best to help.
                      </Text>
                      <div className="space-y-2 text-left">
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Email:
                          </Text>{" "}
                          info@stsaviourslewisham.org.uk
                        </Text>
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Phone:
                          </Text>{" "}
                          020 8852 7411
                        </Text>
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Post:
                          </Text>{" "}
                          St Saviour's Catholic Church, 3 Vesta Road, Lewisham,
                          London SE13 6QJ
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-red-500 transition-all duration-300"
                  >
                    <CardContent>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <Heading level="h3" className="text-xl mb-4 text-white">
                        ICO Complaints
                      </Heading>
                      <Text className="text-gray-300 mb-6">
                        If you're not satisfied with our response, you have the
                        right to make a complaint to the Information
                        Commissioner's Office (ICO).
                      </Text>
                      <div className="space-y-2 text-left">
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Website:
                          </Text>{" "}
                          ico.org.uk
                        </Text>
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Phone:
                          </Text>{" "}
                          0303 123 1113
                        </Text>
                        <Text size="sm" className="text-gray-300">
                          <Text weight="bold" className="text-white">
                            Post:
                          </Text>{" "}
                          Information Commissioner's Office, Wycliffe House,
                          Water Lane, Wilmslow, Cheshire SK9 5AF
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Call to Action with Social Sharing */}
        <Section spacing="lg" background="slate">
          <Container size="md">
            <div className="text-center text-white space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Your Privacy is Our Priority
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={reducedMotion ? { opacity: 0 } : { width: 0 }}
                      whileInView={
                        reducedMotion ? { opacity: 1 } : { width: 128 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0.3 }
                          : { duration: 1, delay: 0.3 }
                      }
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Text size="lg" className="text-gray-300 max-w-2xl mx-auto">
                    We're committed to protecting your personal data and
                    ensuring transparency in how we handle your information.
                  </Text>
                  <Flex justify="center" gap="lg" wrap>
                    <m.a
                      href="tel:020 8852 7411"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        Phone: 020 8852 7411
                      </Text>
                    </m.a>
                    <m.a
                      href="mailto:info@stsaviourslewisham.org.uk"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        Email: info@stsaviourslewisham.org.uk
                      </Text>
                    </m.a>
                  </Flex>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact-us">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Mail className="h-5 w-5" />}
                    className="bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Contact About Privacy
                  </Button>
                </Link>

                <PolicyPageSocialSystem
                  pageContext="privacy-policy"
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  title="Privacy Policy - St Saviour's"
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Enhanced Features */}
        <div className="sr-only">
          <div id="keyboard-shortcuts">
            <h3>Keyboard Shortcuts</h3>
            <ul>
              <li>Alt+P: Focus privacy controls</li>
              <li>Alt+G: Focus GDPR compliance centre</li>
              <li>Alt+A: Focus analytics</li>
              <li>Alt+C: Contact privacy officer</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    
  );
}

// Keyboard shortcuts for accessibility
if (typeof window !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case "p":
          e.preventDefault();
          document
            .getElementById("privacy-controls")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "g":
          e.preventDefault();
          document
            .getElementById("gdpr-compliance")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "a":
          e.preventDefault();
          document
            .querySelector("[data-analytics]")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "c":
          e.preventDefault();
          window.location.href = "mailto:info@stsaviourslewisham.org.uk";
          break;
      }
    }
  });
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
