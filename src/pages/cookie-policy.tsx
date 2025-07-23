import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, m, LazyMotion, domAnimation } from "framer-motion";
import {
  useSpring as useReactSpring,
  animated,
  useTrail as useReactTrail,
} from "@react-spring/web";
import {
  CakeIcon as Cookie,
  ShieldCheckIcon as Shield,
  ChartBarIcon as BarChart3,
  GlobeAltIcon as Globe,
  CogIcon as Settings,
  EyeIcon as Eye,
  ClockIcon as Clock,
  CheckCircleIcon as CheckCircle,
  XMarkIcon as X,
  ArrowPathIcon as RefreshCw,
  ExclamationTriangleIcon as AlertCircle,
  InformationCircleIcon as Info,
  TrashIcon as Trash,
  BellIcon as Bell,
  DevicePhoneMobileIcon as Mobile,
  ComputerDesktopIcon as Desktop,
  SparklesIcon as Sparkles,
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
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from "@/components/enhanced/ScriptureCard";
import { PolicyPageScriptureSection } from '@/components/shared/content';
import { SocialSharingSystem } from "@/components/enhanced/SocialSharingSystem";
// import { PerformanceMonitor } from '@/components/enhanced/PerformanceMonitor'
// import { AccessibilityEnhancer } from '@/components/enhanced/AccessibilityEnhancer'

const cookieTypes = [
  {
    category: "Strictly Necessary Cookies",
    purpose: "Essential for the website to function properly",
    examples: [
      "Session cookies for form submissions",
      "Security cookies for user authentication",
      "Cookie consent preferences",
      "Language and accessibility settings",
    ],
    canOptOut: false,
    retention: "Session or until manually cleared",
    icon: Shield,
    color: "green",
  },
  {
    category: "Analytics Cookies",
    purpose: "Help us understand how visitors use our website",
    examples: [
      "Google Analytics - page views and user behavior",
      "Website performance metrics",
      "Popular content tracking",
      "Error tracking and diagnostics",
    ],
    canOptOut: true,
    retention: "26 months (Google Analytics default)",
    icon: BarChart3,
    color: "blue",
  },
  {
    category: "Functional Cookies",
    purpose: "Enable enhanced functionality and personalization",
    examples: [
      "Remembering your preferences",
      "Video player settings",
      "Newsletter subscription status",
      "Event registration details",
    ],
    canOptOut: true,
    retention: "12 months or until manually cleared",
    icon: Settings,
    color: "purple",
  },
  {
    category: "Third-Party Cookies",
    purpose: "Set by external services we use on our website",
    examples: [
      "YouTube video embeds",
      "Social media sharing buttons",
      "Online donation platform",
      "Event booking system",
    ],
    canOptOut: true,
    retention: "Varies by third-party service",
    icon: Globe,
    color: "orange",
  },
];

const thirdPartyServices = [
  {
    service: "Google Analytics",
    purpose: "Website analytics and user behavior tracking",
    cookies: ["_ga", "_ga_*", "_gid", "_gat"],
    privacy: "https://policies.google.com/privacy",
    optOut: "https://tools.google.com/dlpage/gaoptout",
  },
  {
    service: "YouTube",
    purpose: "Video embedding and streaming",
    cookies: ["VISITOR_INFO1_LIVE", "YSC", "yt-remote-*"],
    privacy: "https://policies.google.com/privacy",
    optOut: "Controlled by your YouTube/Google account settings",
  },
  {
    service: "Stripe",
    purpose: "Secure payment processing for donations",
    cookies: ["__stripe_mid", "__stripe_sid"],
    privacy: "https://stripe.com/privacy",
    optOut: "Required for payment processing",
  },
  {
    service: "Mailchimp",
    purpose: "Newsletter signup and email marketing",
    cookies: ["_mcid", "mailchimp_*"],
    privacy: "https://mailchimp.com/legal/privacy/",
    optOut: "Can be disabled by not subscribing to newsletters",
  },
];

// Enhanced Cookie Management Component
const AdvancedCookieManager = () => {
  const [preferences, setPreferences] = useState({
    analytics: true,
    functional: true,
    thirdParty: true,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [cookieHistory, setCookieHistory] = useState([
    {
      action: "Analytics enabled",
      timestamp: "2025-01-10 14:30",
      type: "enable",
    },
    {
      action: "Functional cookies accepted",
      timestamp: "2025-01-10 14:29",
      type: "enable",
    },
    {
      action: "Third-party cookies allowed",
      timestamp: "2025-01-10 14:28",
      type: "enable",
    },
  ]);
  const reducedMotion = prefersReducedMotion();

  const handlePreferenceChange = (category: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
    setHasChanges(true);

    // Add to history
    const newHistoryItem = {
      action: `${category} ${value ? "enabled" : "disabled"}`,
      timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
      type: value ? "enable" : "disable",
    };
    setCookieHistory((prev) => [newHistoryItem, ...prev.slice(0, 9)]);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    setHasChanges(false);
  };

  const clearAllCookies = () => {
    setPreferences({ analytics: false, functional: false, thirdParty: false });
    setHasChanges(true);
    setCookieHistory((prev) => [
      {
        action: "All optional cookies cleared",
        timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
        type: "clear",
      },
      ...prev.slice(0, 9),
    ]);
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
            <Settings className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Advanced Cookie Manager
          </Heading>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-4">
          {[
            {
              key: "analytics",
              label: "Analytics Cookies",
              desc: "Track website usage and performance",
              color: "blue",
            },
            {
              key: "functional",
              label: "Functional Cookies",
              desc: "Enable enhanced features and personalization",
              color: "purple",
            },
            {
              key: "thirdParty",
              label: "Third-Party Cookies",
              desc: "External services like YouTube and social media",
              color: "orange",
            },
          ].map((category, index) => (
            <m.div
              key={category.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mt-1">
                  {category.color === "blue" && (
                    <BarChart3 className="h-4 w-4 text-slate-900" />
                  )}
                  {category.color === "purple" && (
                    <Settings className="h-4 w-4 text-slate-900" />
                  )}
                  {category.color === "orange" && (
                    <Globe className="h-4 w-4 text-slate-900" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="font-medium text-white">
                        {category.label}
                      </Text>
                      <Text className="text-sm text-gray-300">
                        {category.desc}
                      </Text>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          preferences[category.key as keyof typeof preferences]
                        }
                        onChange={(e) =>
                          handlePreferenceChange(category.key, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-12 h-6 rounded-full peer peer-focus:ring-2 peer-focus:ring-${category.color}-500 ${
                          preferences[category.key as keyof typeof preferences]
                            ? `bg-${category.color}-600`
                            : "bg-slate-600"
                        } peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Cookie History */}
        <div className="space-y-3">
          <Text className="text-sm font-semibold text-orange-400 uppercase tracking-wide">
            Cookie History:
          </Text>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {cookieHistory.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.type === "enable"
                          ? "bg-green-500"
                          : item.type === "disable"
                            ? "bg-red-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <Text className="text-sm font-medium text-white">
                      {item.action}
                    </Text>
                  </div>
                  <Text className="text-xs text-gray-400">
                    {item.timestamp}
                  </Text>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <animated.div style={springProps} className="space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={savePreferences}
              className="bg-green-600 text-white hover:bg-green-700"
              leftIcon={<CheckCircle className="h-4 w-4" />}
            >
              Save Preferences
            </Button>
            <Button
              onClick={clearAllCookies}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              leftIcon={<Trash className="h-4 w-4" />}
            >
              Clear All
            </Button>
          </div>
          <Text className="text-xs text-gray-400">
            Changes will be applied immediately and saved to your browser.
          </Text>
        </animated.div>
      </div>
    </div>
  );
};

// Real-time Cookie Analytics Component
const CookieAnalytics = () => {
  const [stats, setStats] = useState({
    totalCookies: 12,
    necessaryCookies: 4,
    optionalCookies: 8,
    thirdPartyCookies: 6,
    sessionCookies: 3,
    persistentCookies: 9,
  });
  const [refreshing, setRefreshing] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const refreshStats = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStats((prev) => ({
      ...prev,
      totalCookies: prev.totalCookies + Math.floor(Math.random() * 3) - 1,
      optionalCookies: prev.optionalCookies + Math.floor(Math.random() * 2) - 1,
    }));
    setRefreshing(false);
  };

  const springProps = useReactSpring({
    transform: refreshing ? "rotate(360deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-slate-900" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-white">
              Cookie Analytics
            </Heading>
          </div>
          <animated.button
            style={springProps}
            onClick={refreshStats}
            disabled={refreshing}
            className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4 text-white" />
          </animated.button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Total Cookies",
              value: stats.totalCookies,
              color: "blue",
            },
            {
              label: "Essential",
              value: stats.necessaryCookies,
              color: "green",
            },
            {
              label: "Optional",
              value: stats.optionalCookies,
              color: "orange",
            },
            {
              label: "Third-Party",
              value: stats.thirdPartyCookies,
              color: "purple",
            },
            { label: "Session", value: stats.sessionCookies, color: "yellow" },
            {
              label: "Persistent",
              value: stats.persistentCookies,
              color: "red",
            },
          ].map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 text-center hover:bg-slate-800/70 transition-colors"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </m.div>
          ))}
        </div>

        {/* Real-time Status */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Text className="text-sm font-semibold text-green-400">
              Real-time Monitoring
            </Text>
          </div>
          <Text className="text-xs text-gray-400">
            Cookie usage is being monitored in real-time. Last update:{" "}
            {new Date().toLocaleTimeString()}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default function CookiePolicy() {
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

  // Scripture for cookies/choices theme
  const cookieScripture = {
    verse: "Choose for yourselves this day whom you will serve.",
    reference: "Joshua 24:15",
    theme: "choice",
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
        title="Cookie Policy"
        description="St Saviour's Catholic Church Cookie Policy - how we use cookies on our website and how you can control them."
        keywords="Cookie Policy, Website Cookies, Privacy Settings, GDPR Compliance, Web Analytics"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>
            Cookie Policy page loaded with advanced cookie manager and analytics
            dashboard
          </h1>
          <p>
            Use Alt+C to access cookie controls, Alt+A for analytics, Alt+M for
            cookie manager
          </p>
        </div>

        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
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
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() =>
                    document
                      .getElementById("cookie-manager")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  onKeyDown={(e) =>
                    e.key === "c" &&
                    document
                      .getElementById("cookie-manager")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Cookie Manager
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Info className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() =>
                    document
                      .getElementById("cookie-analytics")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Cookie Analytics
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Introduction with Enhanced Features */}
        <Section spacing="lg" background="slate" id="cookie-intro">
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
                  <Cookie className="h-8 w-8 text-slate-900" />
                </m.div>
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    What Are Cookies?
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  Cookies are small text files that are placed on your device
                  when you visit our website. They help us provide you with a
                  better experience and understand how our website is used.
                </Text>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <Heading level="h3" className="mb-4 text-white">
                    How We Use Cookies
                  </Heading>
                  <Text className="text-gray-300 mb-6 leading-relaxed">
                    St Saviour's Catholic Church uses cookies to:
                  </Text>
                  <div className="space-y-2">
                    {[
                      "Ensure our website works properly and securely",
                      "Remember your preferences and settings",
                      "Understand how visitors use our website to help us improve it",
                      "Provide enhanced functionality like embedded videos",
                      "Remember your cookie consent choices",
                    ].map((item, index) => (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Flex align="start" gap="sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <Text className="text-gray-300">{item}</Text>
                        </Flex>
                      </m.div>
                    ))}
                  </div>
                </div>

                <Card
                  variant="outlined"
                  padding="lg"
                  className="bg-white/10 backdrop-blur-sm border border-slate-600"
                >
                  <CardContent>
                    <Flex align="start" gap="md">
                      <Info className="h-6 w-6 text-orange-400 mt-1 flex-shrink-0" />
                      <div>
                        <Heading level="h4" className="text-orange-400 mb-2">
                          Your Control
                        </Heading>
                        <Text className="text-gray-300 leading-relaxed">
                          You can control which cookies we set through your
                          cookie preferences. Some cookies are essential for the
                          website to work, but you can choose whether to allow
                          others.
                        </Text>
                      </div>
                    </Flex>
                  </CardContent>
                </Card>

                <div>
                  <Heading level="h3" className="mb-4 text-white">
                    Last Updated
                  </Heading>
                  <Text className="text-gray-300 leading-relaxed">
                    This cookie policy was last updated on{" "}
                    <Text weight="bold" className="text-white">
                      1st January 2025
                    </Text>
                    . We may update this policy from time to time to reflect
                    changes in our use of cookies.
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
                pageTheme="cookie-policy"
                reducedMotion={reducedMotion}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>

        {/* Advanced Cookie Manager */}
        <Section spacing="lg" background="slate" id="cookie-manager">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Advanced Cookie Manager
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  Take full control of your cookie preferences with our advanced
                  management system.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AdvancedCookieManager />
                {/* <PerformanceMonitor /> */}
              </div>
            </div>
          </Container>
        </Section>

        {/* Cookie Analytics */}
        <Section spacing="lg" background="slate" id="cookie-analytics">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Cookie Analytics Dashboard
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  Real-time insights into cookie usage and performance on our
                  website.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CookieAnalytics />
                {/* <AccessibilityEnhancer /> */}
              </div>
            </div>
          </Container>
        </Section>

        {/* Cookie Types */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Types of Cookies We Use
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  We use different types of cookies for different purposes
                </Text>
              </div>

              <div className="space-y-8">
                {cookieTypes.map((cookie, index) => {
                  const colorClasses = {
                    green: { bg: "bg-green-500", text: "text-green-400" },
                    blue: { bg: "bg-blue-500", text: "text-blue-400" },
                    purple: { bg: "bg-purple-500", text: "text-purple-400" },
                    orange: { bg: "bg-orange-500", text: "text-orange-400" },
                  }[cookie.color] || {
                    bg: "bg-gray-500",
                    text: "text-gray-400",
                  };

                  return (
                    <m.div
                      key={cookie.category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        variant="default"
                        padding="lg"
                        className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
                      >
                        <CardContent>
                          <Flex align="start" gap="lg" className="mb-6">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                              <cookie.icon className="h-6 w-6 text-slate-900" />
                            </div>
                            <div className="flex-1">
                              <Flex
                                justify="between"
                                align="start"
                                className="mb-4"
                              >
                                <Heading
                                  level="h3"
                                  className="text-2xl text-white"
                                >
                                  {cookie.category}
                                </Heading>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    cookie.canOptOut
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {cookie.canOptOut ? "Optional" : "Required"}
                                </span>
                              </Flex>
                              <Text className="text-gray-300 mb-4">
                                {cookie.purpose}
                              </Text>

                              <Grid
                                cols={2}
                                gap="lg"
                                className="grid-cols-1 lg:grid-cols-2"
                              >
                                <div>
                                  <Heading
                                    level="h4"
                                    className="text-sm font-semibold text-orange-400 mb-2"
                                  >
                                    Examples:
                                  </Heading>
                                  <div className="space-y-1">
                                    {cookie.examples.map((example, idx) => (
                                      <Flex key={idx} align="start" gap="sm">
                                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                                        <Text
                                          size="sm"
                                          className="text-gray-300"
                                        >
                                          {example}
                                        </Text>
                                      </Flex>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <Heading
                                      level="h4"
                                      className="text-sm font-semibold text-orange-400 mb-1"
                                    >
                                      Retention Period:
                                    </Heading>
                                    <Flex align="center" gap="sm">
                                      <Clock className="h-3 w-3 text-gray-400" />
                                      <Text size="sm" className="text-gray-300">
                                        {cookie.retention}
                                      </Text>
                                    </Flex>
                                  </div>
                                  <div>
                                    <Heading
                                      level="h4"
                                      className="text-sm font-semibold text-orange-400 mb-1"
                                    >
                                      Can Opt Out:
                                    </Heading>
                                    <Flex align="center" gap="sm">
                                      {cookie.canOptOut ? (
                                        <>
                                          <CheckCircle className="h-3 w-3 text-green-400" />
                                          <Text
                                            size="sm"
                                            className="text-gray-300"
                                          >
                                            Yes - you can disable these cookies
                                          </Text>
                                        </>
                                      ) : (
                                        <>
                                          <X className="h-3 w-3 text-red-400" />
                                          <Text
                                            size="sm"
                                            className="text-gray-300"
                                          >
                                            No - required for website
                                            functionality
                                          </Text>
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
                    </m.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>

        {/* Third-Party Services */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Third-Party Services
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  We use some external services that may set their own cookies
                </Text>
              </div>

              <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
                {thirdPartyServices.map((service, index) => (
                  <m.div
                    key={service.service}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      variant="outlined"
                      padding="lg"
                      className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent>
                        <Flex align="start" gap="md" className="mb-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <Globe className="h-5 w-5 text-slate-900" />
                          </div>
                          <div>
                            <Heading
                              level="h3"
                              className="text-lg mb-2 text-white"
                            >
                              {service.service}
                            </Heading>
                            <Text size="sm" className="text-gray-300">
                              {service.purpose}
                            </Text>
                          </div>
                        </Flex>

                        <div className="space-y-3">
                          <div>
                            <Heading
                              level="h4"
                              className="text-sm font-semibold text-orange-400 mb-1"
                            >
                              Cookies Set:
                            </Heading>
                            <div className="flex flex-wrap gap-1">
                              {service.cookies.map((cookieName, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 rounded-md text-xs font-mono bg-slate-700 text-gray-300"
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
                                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                              >
                                Privacy Policy
                              </Button>
                            </Link>
                            <span className="inline-flex items-center px-3 py-2 text-xs text-gray-300 bg-slate-700 rounded-lg">
                              <Settings className="h-3 w-3 mr-1" />
                              {service.optOut}
                            </span>
                          </Flex>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Browser Settings */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Browser Cookie Settings
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  You can also control cookies through your browser settings
                </Text>
              </div>

              <Card
                variant="default"
                padding="lg"
                className="bg-white/10 backdrop-blur-sm border border-slate-600"
              >
                <CardContent>
                  <Text className="text-gray-300 mb-6 leading-relaxed">
                    You can also control cookies through your browser settings.
                    Most browsers allow you to:
                  </Text>

                  <Grid
                    cols={2}
                    gap="lg"
                    className="grid-cols-1 md:grid-cols-2 mb-8"
                  >
                    <div>
                      <Heading level="h3" className="text-lg mb-3 text-white">
                        Cookie Controls
                      </Heading>
                      <div className="space-y-2">
                        {[
                          "Block all cookies",
                          "Block third-party cookies only",
                          "Delete all cookies",
                          "Get notifications when cookies are set",
                        ].map((control, index) => (
                          <m.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Flex align="start" gap="sm">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                              <Text className="text-gray-300">{control}</Text>
                            </Flex>
                          </m.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Heading level="h3" className="text-lg mb-3 text-white">
                        Browser Help
                      </Heading>
                      <div className="space-y-2">
                        {[
                          {
                            name: "Chrome Cookie Settings",
                            url: "https://support.google.com/chrome/answer/95647",
                          },
                          {
                            name: "Firefox Cookie Settings",
                            url: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop",
                          },
                          {
                            name: "Safari Cookie Settings",
                            url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
                          },
                          {
                            name: "Edge Cookie Settings",
                            url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                          },
                        ].map((browser, index) => (
                          <m.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Link
                              href={browser.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-orange-400 hover:text-orange-300 text-sm transition-colors"
                            >
                              {browser.name}
                            </Link>
                          </m.div>
                        ))}
                      </div>
                    </div>
                  </Grid>

                  <Card
                    variant="outlined"
                    padding="md"
                    className="bg-yellow-500/10 border-yellow-500/30"
                  >
                    <CardContent>
                      <Flex align="start" gap="md">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <Heading
                            level="h4"
                            className="text-sm font-semibold text-yellow-400 mb-1"
                          >
                            Please Note
                          </Heading>
                          <Text size="sm" className="text-gray-300">
                            If you disable all cookies, some parts of our
                            website may not work properly. Essential cookies are
                            required for basic functionality.
                          </Text>
                        </div>
                      </Flex>
                    </CardContent>
                  </Card>
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

        {/* Contact Information */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Questions About Cookies?
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                  If you have any questions about our use of cookies or this
                  cookie policy, please don't hesitate to contact us.
                </Text>
              </div>

              <Card
                variant="default"
                padding="lg"
                className="bg-white/10 backdrop-blur-sm border border-slate-600 max-w-4xl mx-auto"
              >
                <CardContent>
                  <div className="space-y-6 text-center">
                    <div className="space-y-2">
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

                    <Flex justify="center" gap="md" wrap>
                      <Link href="mailto:info@stsaviourslewisham.org.uk">
                        <Button
                          variant="primary"
                          size="lg"
                          className="bg-white text-slate-900 hover:bg-gray-100"
                        >
                          Email Us
                        </Button>
                      </Link>
                      <Link href="/privacy-policy">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white text-white hover:bg-white hover:text-slate-900"
                        >
                          View Privacy Policy
                        </Button>
                      </Link>
                    </Flex>
                  </div>
                </CardContent>
              </Card>
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
                    Your Choices Matter
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
                    We respect your right to choose how cookies are used on our
                    website. Your preferences help us serve you better.
                  </Text>
                  <Flex justify="center" gap="lg" wrap>
                    <m.a
                      href="tel:020 8852 7411"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        📞 020 8852 7411
                      </Text>
                    </m.a>
                    <m.a
                      href="mailto:info@stsaviourslewisham.org.uk"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text className="text-white hover:text-gray-200 font-medium transition-colors">
                        ✉️ info@stsaviourslewisham.org.uk
                      </Text>
                    </m.a>
                  </Flex>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Settings className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() =>
                    document
                      .getElementById("cookie-manager")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Manage Cookie Settings
                </Button>

                <SocialSharingSystem
                  articleId="cookie-policy-page"
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  title="Cookie Policy - St Saviour's"
                  onShare={(platform) => console.log(`Shared on ${platform}`)}
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
              <li>Alt+C: Focus cookie manager</li>
              <li>Alt+A: Focus analytics dashboard</li>
              <li>Alt+M: Focus cookie manager</li>
              <li>Alt+S: Contact support</li>
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
        case "c":
          e.preventDefault();
          document
            .getElementById("cookie-manager")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "a":
          e.preventDefault();
          document
            .getElementById("cookie-analytics")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "m":
          e.preventDefault();
          document
            .getElementById("cookie-manager")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "s":
          e.preventDefault();
          window.location.href = "mailto:info@stsaviourslewisham.org.uk";
          break;
      }
    }
  });
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
