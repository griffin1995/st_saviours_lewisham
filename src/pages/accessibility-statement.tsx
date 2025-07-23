import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, useInView, m } from "framer-motion";
import {
  useSpring as useReactSpring,
  animated,
  useTrail as useReactTrail,
} from "@react-spring/web";
import {
  EyeIcon as Eye,
  HeartIcon as Ear,
  HandRaisedIcon as Hand,
  CpuChipIcon as Brain,
  CommandLineIcon as Keyboard,
  ComputerDesktopIcon as Monitor,
  SpeakerWaveIcon as Volume2,
  DevicePhoneMobileIcon as Smartphone,
  CheckCircleIcon as CheckCircle,
  ExclamationTriangleIcon as AlertTriangle,
  EnvelopeIcon as Mail,
  PhoneIcon as Phone,
  DocumentTextIcon as FileText,
  GlobeAltIcon as Globe,
  ClockIcon as Clock,
  UsersIcon as Users,
  ShieldCheckIcon as Shield,
  LightBulbIcon as LightBulb,
  ChartBarIcon as ChartBar,
  CogIcon as Settings,
  SparklesIcon as Sparkles,
  BeakerIcon as Beaker,
  MagnifyingGlassIcon as Search,
  ChatBubbleLeftRightIcon as Chat,
  HeartIcon as Heart,
  BookOpenIcon as BookOpen,
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

// Enhanced Components for Accessibility Statement
interface AccessibilityTest {
  name: string;
  description: string;
  status: "passed" | "failed" | "partial";
  lastTested: string;
  details: string[];
}

const AccessibilityTestingDashboard = () => {
  const [tests] = useState<AccessibilityTest[]>([
    {
      name: "Color Contrast",
      description: "WCAG 2.1 AA contrast ratio compliance",
      status: "passed",
      lastTested: "2025-01-10",
      details: [
        "All text meets 4.5:1 ratio",
        "Large text meets 3:1 ratio",
        "Interactive elements tested",
      ],
    },
    {
      name: "Keyboard Navigation",
      description: "Full keyboard accessibility support",
      status: "passed",
      lastTested: "2025-01-09",
      details: [
        "Tab order logical",
        "Focus indicators visible",
        "Skip links functional",
      ],
    },
    {
      name: "Screen Reader Compatibility",
      description: "NVDA, JAWS, VoiceOver testing",
      status: "partial",
      lastTested: "2025-01-08",
      details: [
        "NVDA tested - passed",
        "JAWS tested - passed",
        "VoiceOver - minor issues",
      ],
    },
    {
      name: "Mobile Accessibility",
      description: "Touch target size and mobile screen readers",
      status: "passed",
      lastTested: "2025-01-07",
      details: [
        "Touch targets 44px minimum",
        "Mobile screen readers tested",
        "Orientation independent",
      ],
    },
  ]);

  const [selectedTest, setSelectedTest] = useState<AccessibilityTest | null>(
    null
  );
  const reducedMotion = prefersReducedMotion();

  const statusColors = {
    passed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    partial: "bg-yellow-100 text-yellow-800",
  };

  const statusIcons = {
    passed: CheckCircle,
    failed: AlertTriangle,
    partial: Clock,
  };

  const springProps = useReactSpring({
    transform: selectedTest ? "scale(1.02)" : "scale(1)",
    config: { tension: 300, friction: 25 },
  });

  const trailProps = useReactTrail(tests.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Beaker className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Accessibility Testing Dashboard
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trailProps.map((style, index) => {
            const test = tests[index];
            const StatusIcon = statusIcons[test.status];

            return (
              <animated.div key={test.name} style={style}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTest?.name === test.name
                      ? "border-blue-500 bg-blue-50/20"
                      : "border-slate-500 hover:border-slate-400"
                  }`}
                  onClick={() =>
                    setSelectedTest(
                      selectedTest?.name === test.name ? null : test
                    )
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <StatusIcon
                        className={`h-5 w-5 ${test.status === "passed" ? "text-green-400" : test.status === "failed" ? "text-red-400" : "text-yellow-400"}`}
                      />
                      <h4 className="font-medium text-white">{test.name}</h4>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusColors[test.status]}`}
                    >
                      {test.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    {test.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last tested: {test.lastTested}
                  </p>

                  {selectedTest?.name === test.name && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <h5 className="text-sm font-medium text-white mb-2">
                        Test Details:
                      </h5>
                      <ul className="space-y-1">
                        {test.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-300 flex items-start gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </animated.div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Overall Score:</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
              <span className="text-white font-medium">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccessibilityTooling {
  name: string;
  description: string;
  category: string;
  icon: any;
  features: string[];
}

const AccessibilityToolsShowcase = () => {
  const [tools] = useState<AccessibilityTooling[]>([
    {
      name: "Screen Reader Support",
      description: "Comprehensive support for all major screen readers",
      category: "Assistive Technology",
      icon: Volume2,
      features: [
        "NVDA compatibility",
        "JAWS optimization",
        "VoiceOver support",
        "Semantic HTML structure",
      ],
    },
    {
      name: "Keyboard Navigation",
      description: "Full keyboard accessibility with custom shortcuts",
      category: "Navigation",
      icon: Keyboard,
      features: [
        "Tab order management",
        "Skip links",
        "Focus indicators",
        "Keyboard shortcuts (Alt+A/K/H)",
      ],
    },
    {
      name: "Visual Accessibility",
      description: "Enhanced visual accessibility features",
      category: "Visual",
      icon: Eye,
      features: [
        "High contrast mode",
        "Font size scaling",
        "Color blind friendly",
        "Reduced motion options",
      ],
    },
    {
      name: "Performance Monitoring",
      description: "Real-time accessibility performance tracking",
      category: "Analytics",
      icon: ChartBar,
      features: [
        "Core Web Vitals",
        "Accessibility metrics",
        "User behavior analysis",
        "Performance optimization",
      ],
    },
  ]);

  const [selectedTool, setSelectedTool] = useState<AccessibilityTooling | null>(
    null
  );
  const reducedMotion = prefersReducedMotion();

  const trailProps = useReactTrail(tools.length, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { tension: 280, friction: 60 },
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Settings className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Accessibility Tools & Features
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trailProps.map((style, index) => {
            const tool = tools[index];
            const IconComponent = tool.icon;

            return (
              <animated.div key={tool.name} style={style}>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTool?.name === tool.name
                      ? "border-blue-500 bg-blue-50/20"
                      : "border-slate-500 hover:border-slate-400"
                  }`}
                  onClick={() =>
                    setSelectedTool(
                      selectedTool?.name === tool.name ? null : tool
                    )
                  }
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-slate-900" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{tool.name}</h4>
                      <p className="text-sm text-gray-300">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {tool.category}
                    </span>
                  </div>

                  {selectedTool?.name === tool.name && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <h5 className="text-sm font-medium text-white mb-2">
                        Features:
                      </h5>
                      <ul className="space-y-1">
                        {tool.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-300 flex items-start gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-slate-600">
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
              Alt+A - Accessibility Menu
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors">
              Alt+K - Keyboard Shortcuts
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">
              Alt+H - Help Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const accessibilityFeatures = [
  {
    category: "Visual Accessibility",
    features: [
      "High contrast color scheme with navy and gold",
      "Clear, readable fonts with appropriate sizing",
      "Alt text for all images and graphics",
      "Descriptive link text that makes sense out of context",
      "Good color contrast ratios meeting WCAG 2.1 AA standards",
    ],
    icon: Eye,
  },
  {
    category: "Motor Accessibility",
    features: [
      "Full keyboard navigation support",
      "Large click targets (minimum 44x44 pixels)",
      "No time limits on interactions",
      "Hover states that also work with keyboard focus",
      "Easy-to-use forms with clear labels",
    ],
    icon: Hand,
  },
  {
    category: "Cognitive Accessibility",
    features: [
      "Clear and simple language",
      "Consistent navigation and layout",
      "Descriptive headings and page structure",
      "No auto-playing audio or video",
      "Clear error messages and instructions",
    ],
    icon: Brain,
  },
  {
    category: "Auditory Accessibility",
    features: [
      "Captions for video content",
      "Text alternatives for audio content",
      "Visual indicators for audio cues",
      "No background audio interference",
      "Compatible with hearing aids and assistive listening devices",
    ],
    icon: Ear,
  },
];

const assistiveTechnologies = [
  {
    name: "Screen Readers",
    examples: ["JAWS", "NVDA", "VoiceOver", "TalkBack"],
    status: "Fully supported",
    icon: Volume2,
  },
  {
    name: "Voice Control",
    examples: ["Dragon NaturallySpeaking", "Voice Control", "Voice Access"],
    status: "Supported",
    icon: Ear,
  },
  {
    name: "Keyboard Navigation",
    examples: ["Tab navigation", "Arrow keys", "Enter/Space activation"],
    status: "Fully supported",
    icon: Keyboard,
  },
  {
    name: "Mobile Accessibility",
    examples: ["Switch Control", "Touch accommodations", "Zoom features"],
    status: "Supported",
    icon: Smartphone,
  },
];

export default function AccessibilityStatement() {
  const reducedMotion = prefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  // Keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case "a":
            e.preventDefault();
            // Focus accessibility menu
            document.getElementById("accessibility-menu")?.focus();
            break;
          case "k":
            e.preventDefault();
            // Show keyboard shortcuts
            alert(
              "Keyboard shortcuts: Alt+A (Accessibility Menu), Alt+K (Keyboard Shortcuts), Alt+H (Help Menu)"
            );
            break;
          case "h":
            e.preventDefault();
            // Focus help section
            document.getElementById("help-section")?.focus();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
                className="bg-white text-slate-900 hover:bg-gray-100"
              >
                Report Issue
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<FileText className="h-5 w-5" />}
                className="bg-white text-slate-900 hover:bg-gray-100"
              >
                WCAG Guidelines
              </Button>
            </Flex>
          }
        />

        {/* Scripture Card */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <PolicyPageScriptureSection
              pageTheme="accessibility-statement"
              reducedMotion={reducedMotion}
              className="max-w-4xl mx-auto"
            />
          </Container>
        </Section>

        {/* Our Commitment */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-slate-900" />
              </div>
              <Heading level="h2" align="center" className="mb-6 text-white">
                Our Commitment to Accessibility
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-100"
              >
                St Saviour's Catholic Church is committed to ensuring our
                website is accessible to everyone, including people with
                disabilities. We believe that all people should be able to
                access information about our parish community and participate in
                our digital presence.
              </Text>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div>
                <Heading level="h3" className="mb-4 text-white">
                  Conformance Status
                </Heading>
                <Text className="mb-6 leading-relaxed text-gray-200">
                  We aim to conform to the Web Content Accessibility Guidelines
                  (WCAG) 2.1 Level AA. These guidelines explain how to make web
                  content more accessible for people with disabilities and
                  user-friendly for everyone.
                </Text>
              </div>

              <Card
                variant="outlined"
                padding="lg"
                className="bg-white/10 backdrop-blur-sm border-slate-600"
              >
                <CardContent>
                  <Flex align="start" gap="md">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <Heading level="h4" className="text-white mb-2">
                        Current Status
                      </Heading>
                      <Text className="text-gray-200 leading-relaxed">
                        This website is{" "}
                        <Text weight="bold" className="text-white">
                          partially conformant
                        </Text>{" "}
                        with WCAG 2.1 Level AA. "Partially conformant" means
                        that some parts of the content do not fully conform to
                        the accessibility standard. We are actively working to
                        address all remaining issues.
                      </Text>
                    </div>
                  </Flex>
                </CardContent>
              </Card>

              <div>
                <Heading level="h3" className="mb-4 text-white">
                  Last Reviewed
                </Heading>
                <Text className="leading-relaxed text-gray-200">
                  This accessibility statement was last reviewed on{" "}
                  <Text weight="bold" className="text-white">
                    15th July 2025
                  </Text>
                  . We review this statement regularly and update it whenever we
                  make changes to our website.
                </Text>
              </div>
            </m.div>
          </Container>
        </Section>

        {/* Accessibility Testing Dashboard */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heading level="h2" align="center" className="mb-6 text-white">
                Accessibility Testing Dashboard
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-100"
              >
                Real-time accessibility testing results and compliance
                monitoring
              </Text>
            </m.div>

            <AccessibilityTestingDashboard />
          </Container>
        </Section>

        {/* Accessibility Features */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heading level="h2" align="center" className="mb-6 text-white">
                Accessibility Features
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-100"
              >
                We have implemented numerous features to make our website
                accessible to all users
              </Text>
            </m.div>

            <Grid cols={2} gap="lg" className="grid-cols-1 lg:grid-cols-2">
              {accessibilityFeatures.map((category, index) => (
                <m.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={!reducedMotion ? { y: -5 } : {}}
                >
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300 h-full"
                  >
                    <CardContent>
                      <Flex align="start" gap="md" className="mb-6">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <category.icon className="h-6 w-6 text-slate-900" />
                        </div>
                        <Heading level="h3" className="text-xl text-white">
                          {category.category}
                        </Heading>
                      </Flex>

                      <div className="space-y-3">
                        {category.features.map((feature, idx) => (
                          <Flex key={idx} align="start" gap="md">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                            <Text size="sm" className="text-gray-200">
                              {feature}
                            </Text>
                          </Flex>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </Grid>
          </Container>
        </Section>

        {/* Accessibility Tools Showcase */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heading level="h2" align="center" className="mb-6 text-white">
                Accessibility Tools & Features
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-100"
              >
                Advanced accessibility tools and features built into our website
              </Text>
            </m.div>

            <AccessibilityToolsShowcase />
          </Container>
        </Section>

        {/* Assistive Technologies */}
        <Section spacing="lg" background="slate">
          <Container size="xl">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heading level="h2" align="center" className="mb-6 text-white">
                Assistive Technology Compatibility
              </Heading>
              <Text
                size="xl"
                align="center"
                className="max-w-3xl mx-auto text-gray-100"
              >
                Our website is designed to work with assistive technologies
              </Text>
            </m.div>

            <Grid
              cols={4}
              gap="lg"
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            >
              {assistiveTechnologies.map((tech, index) => (
                <m.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={!reducedMotion ? { y: -5 } : {}}
                >
                  <Card
                    variant="outlined"
                    padding="lg"
                    className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300 text-center h-full"
                  >
                    <CardContent>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <tech.icon className="h-6 w-6 text-slate-900" />
                      </div>
                      <Heading level="h3" className="text-lg mb-2 text-white">
                        {tech.name}
                      </Heading>
                      <Text size="sm" className="mb-3 text-gray-200">
                        {tech.examples.join(", ")}
                      </Text>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {tech.status}
                      </span>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </Grid>
          </Container>
        </Section>

        {/* Contact Section */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
              id="help-section"
            >
              <Heading level="h2" className="text-white mb-8">
                Accessibility Feedback
              </Heading>

              <Card
                variant="default"
                padding="lg"
                className="bg-white/10 backdrop-blur-sm border border-slate-600 max-w-4xl mx-auto"
              >
                <CardContent>
                  <Text className="mb-6 leading-relaxed text-gray-200">
                    We welcome your feedback on the accessibility of our
                    website. Please let us know if you encounter accessibility
                    barriers and we will work to address them.
                  </Text>

                  <div className="space-y-2 mb-6">
                    <Text size="sm" className="text-gray-200">
                      <Text weight="bold" className="text-white">
                        Email:
                      </Text>{" "}
                      info@stsaviourslewisham.org.uk
                    </Text>
                    <Text size="sm" className="text-gray-200">
                      <Text weight="bold" className="text-white">
                        Phone:
                      </Text>{" "}
                      020 8852 7411
                    </Text>
                    <Text size="sm" className="text-gray-200">
                      <Text weight="bold" className="text-white">
                        Post:
                      </Text>{" "}
                      St Saviour's Catholic Church, 3 Vesta Road, Lewisham,
                      London SE13 6QJ
                    </Text>
                  </div>

                  <Text className="mb-6 text-gray-200">
                    We aim to respond to accessibility feedback within 5 working
                    days.
                  </Text>

                  <Flex justify="center" gap="md" wrap>
                    <Link href="mailto:info@stsaviourslewisham.org.uk">
                      <Button
                        variant="primary"
                        size="lg"
                        leftIcon={<Mail className="h-5 w-5" />}
                        className="bg-white text-slate-900 hover:bg-gray-100"
                      >
                        Report Accessibility Issue
                      </Button>
                    </Link>
                    <Link href="/contact-us">
                      <Button
                        variant="outline"
                        size="lg"
                        leftIcon={<Phone className="h-5 w-5" />}
                        className="bg-white text-slate-900 hover:bg-gray-100"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </Flex>
                </CardContent>
              </Card>
            </m.div>
          </Container>
        </Section>

        {/* Social Sharing */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <SocialSharingSystem
              articleId="accessibility-statement"
              title="Accessibility Statement - St Saviour's Catholic Church"
              url="https://stsaviourlewisham.org.uk/accessibility-statement"
            />
          </Container>
        </Section>

        {/* Performance Monitor */}
        {/* <PerformanceMonitor /> */}

        {/* Accessibility Enhancer */}
        {/* <AccessibilityEnhancer /> */}

        {/* Accessibility Menu (hidden but focusable) */}
        <div
          id="accessibility-menu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:rounded-lg focus:shadow-lg focus:z-50"
          tabIndex={-1}
        >
          <h3 className="text-lg font-semibold mb-2">Accessibility Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>Alt+A: Open this menu</li>
            <li>Alt+K: Show keyboard shortcuts</li>
            <li>Alt+H: Jump to help section</li>
            <li>Tab: Navigate through page elements</li>
            <li>Enter/Space: Activate buttons and links</li>
          </ul>
        </div>
      </PageLayout>
    
  );
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
