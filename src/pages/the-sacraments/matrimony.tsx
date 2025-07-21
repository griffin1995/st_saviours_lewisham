import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, useInView, m } from "framer-motion";
import {
  useSpring as useReactSpring,
  animated,
  useTrail as useReactTrail,
} from "@react-spring/web";
import {
  SparklesIcon as Sparkles,
  CalendarDaysIcon as Calendar,
  PhoneIcon as Phone,
  BookOpenIcon as BookOpen,
  HeartIcon as Heart,
  UserGroupIcon as Users,
  ArrowRightIcon as ArrowRight,
  BuildingLibraryIcon as Church,
  CheckCircleIcon as CheckCircle,
  ClockIcon as Clock,
  BellIcon as Bell,
  MapPinIcon as MapPin,
  InformationCircleIcon as InfoCircle,
  ExclamationTriangleIcon as Warning,
  ChatBubbleLeftRightIcon as Chat,
  LightBulbIcon as LightBulb,
  ChartBarIcon as ChartBar,
  EyeIcon as Eye,
  KeyIcon as Key,
  SunIcon as Sun,
  CloudIcon as Cloud,
  FireIcon as Fire,
  AcademicCapIcon as Academic,
  ScaleIcon as Scale,
  ShieldCheckIcon as Shield,
  CakeIcon as Cake,
  GiftIcon as Gift,
  RectangleGroupIcon as RectangleGroup,
  DocumentTextIcon as Document,
  CurrencyPoundIcon as CurrencyPound,
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
import { SacramentInfo } from "@/components/church";
import { prefersReducedMotion } from "@/lib/utils";
// CMS DATA SOURCE: Import sacrament image functions
import { getSacramentImage } from '@/lib/cms-images';

// Enhanced Components
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from "@/components/enhanced/ScriptureCard";
import { SacramentalScriptureSection } from '@/components/shared/content';
import { SocialSharingSystem } from "@/components/enhanced/SocialSharingSystem";
import SacramentalAnalytics from "@/components/enhanced/SacramentalAnalytics";

// Enhanced Components for Matrimony
interface MarriagePreparationStage {
  title: string;
  description: string;
  duration: string;
  activities: string[];
  icon: any;
  requirements: string[];
}

const MarriagePreparationTracker = ({
  stages,
}: {
  stages: MarriagePreparationStage[];
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isPreparing, setIsPreparing] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const springProps = useReactSpring({
    transform: isPreparing ? "scale(1.05)" : "scale(1)",
    backgroundColor: isPreparing ? "#f472b6" : "#059669",
    config: { tension: 300, friction: 20 },
  });

  const trailProps = useReactTrail(stages.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  const markStageComplete = (stageIndex: number) => {
    if (!completedStages.includes(stageIndex)) {
      setCompletedStages([...completedStages, stageIndex]);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Academic className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Marriage Preparation Journey
          </Heading>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-6">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  completedStages.includes(index)
                    ? "bg-green-500 text-white"
                    : index <= currentStage
                      ? "bg-pink-500 text-white"
                      : "bg-slate-700 text-gray-300"
                }`}
              >
                {completedStages.includes(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`w-8 h-1 mx-2 transition-all ${
                    completedStages.includes(index)
                      ? "bg-green-500"
                      : index < currentStage
                        ? "bg-pink-500"
                        : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Stage */}
        <m.div
          key={currentStage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            {React.createElement(stages[currentStage].icon, {
              className: "h-6 w-6 text-pink-500",
            })}
            <Heading level="h4" className="text-lg font-semibold text-white">
              {stages[currentStage].title}
            </Heading>
          </div>

          <Text className="text-gray-300 leading-relaxed">
            {stages[currentStage].description}
          </Text>

          <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-pink-500" />
              <Text className="text-sm font-semibold text-pink-500">
                Duration: {stages[currentStage].duration}
              </Text>
            </div>

            <div className="space-y-3">
              <div>
                <Text className="text-sm font-semibold text-white mb-2">
                  Activities:
                </Text>
                <div className="space-y-1">
                  {stages[currentStage].activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Heart className="h-3 w-3 text-pink-500 mt-1 flex-shrink-0" />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text className="text-sm font-semibold text-white mb-2">
                  Requirements:
                </Text>
                <div className="space-y-1">
                  {stages[currentStage].requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stage Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => markStageComplete(currentStage)}
              disabled={completedStages.includes(currentStage)}
              className={`${
                completedStages.includes(currentStage)
                  ? "bg-green-500 text-white"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
              leftIcon={<CheckCircle className="h-4 w-4" />}
            >
              {completedStages.includes(currentStage)
                ? "Stage Complete"
                : "Mark Complete"}
            </Button>

            <Button
              onClick={() => setIsPreparing(!isPreparing)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
              leftIcon={<Heart className="h-4 w-4" />}
            >
              {isPreparing ? "In Preparation..." : "Begin Preparation"}
            </Button>
          </div>
        </m.div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
            disabled={currentStage === 0}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-slate-900"
          >
            Previous
          </Button>
          <div className="text-sm text-gray-400">
            Stage {currentStage + 1} of {stages.length}
          </div>
          <Button
            onClick={() =>
              setCurrentStage(Math.min(stages.length - 1, currentStage + 1))
            }
            disabled={currentStage === stages.length - 1}
            className="bg-pink-500 text-white hover:bg-pink-600"
          >
            Next
          </Button>
        </div>

        {/* Completion Message */}
        {completedStages.length === stages.length && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <Text className="text-sm font-semibold text-green-400">
                Preparation Complete!
              </Text>
            </div>
            <Text className="text-sm text-gray-300">
              You've completed all preparation stages. You're now ready to
              schedule your wedding ceremony!
            </Text>
          </m.div>
        )}
      </div>
    </div>
  );
};

const WeddingPlanningGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "ceremony" | "music" | "flowers" | "reception"
  >("ceremony");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const reducedMotion = prefersReducedMotion();

  const planningCategories = {
    ceremony: {
      title: "Ceremony Planning",
      description: "Essential elements for your Catholic wedding ceremony",
      items: [
        {
          id: "readings",
          task: "Choose Scripture readings (2-3 readings)",
          deadline: "2 months before",
        },
        {
          id: "music",
          task: "Select hymns and processional music",
          deadline: "2 months before",
        },
        {
          id: "flowers",
          task: "Arrange altar flowers and decorations",
          deadline: "1 month before",
        },
        {
          id: "programs",
          task: "Create wedding programs for guests",
          deadline: "2 weeks before",
        },
        {
          id: "rings",
          task: "Prepare wedding rings for blessing",
          deadline: "1 week before",
        },
        {
          id: "rehearsal",
          task: "Schedule wedding rehearsal",
          deadline: "1 day before",
        },
      ],
    },
    music: {
      title: "Music & Musicians",
      description: "Sacred music to enhance your wedding ceremony",
      items: [
        {
          id: "organist",
          task: "Book parish organist",
          deadline: "3 months before",
        },
        {
          id: "cantor",
          task: "Arrange for wedding cantor",
          deadline: "2 months before",
        },
        {
          id: "processional",
          task: "Select bridal processional music",
          deadline: "2 months before",
        },
        {
          id: "responsorial",
          task: "Choose responsorial psalm",
          deadline: "2 months before",
        },
        {
          id: "communion",
          task: "Select communion hymns",
          deadline: "1 month before",
        },
        {
          id: "recessional",
          task: "Choose recessional music",
          deadline: "1 month before",
        },
      ],
    },
    flowers: {
      title: "Flowers & Decorations",
      description: "Beautiful decorations for your special day",
      items: [
        {
          id: "altar-flowers",
          task: "Order altar flower arrangements",
          deadline: "2 months before",
        },
        {
          id: "pew-flowers",
          task: "Arrange pew decorations",
          deadline: "1 month before",
        },
        {
          id: "bridal-flowers",
          task: "Coordinate bridal bouquet",
          deadline: "1 month before",
        },
        {
          id: "candles",
          task: "Arrange unity candle setup",
          deadline: "2 weeks before",
        },
        {
          id: "decorations",
          task: "Plan additional decorations",
          deadline: "2 weeks before",
        },
        {
          id: "cleanup",
          task: "Arrange post-ceremony cleanup",
          deadline: "1 week before",
        },
      ],
    },
    reception: {
      title: "Reception Planning",
      description: "Celebrate with family and friends",
      items: [
        {
          id: "venue",
          task: "Book reception venue",
          deadline: "6 months before",
        },
        {
          id: "catering",
          task: "Arrange catering services",
          deadline: "3 months before",
        },
        {
          id: "invitations",
          task: "Send reception invitations",
          deadline: "2 months before",
        },
        {
          id: "seating",
          task: "Plan seating arrangements",
          deadline: "1 month before",
        },
        {
          id: "entertainment",
          task: "Arrange music/entertainment",
          deadline: "1 month before",
        },
        {
          id: "photography",
          task: "Coordinate photographer",
          deadline: "2 weeks before",
        },
      ],
    },
  };

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const currentCategory = planningCategories[selectedCategory];
  const completedItems = currentCategory.items.filter(
    (item) => checkedItems[item.id]
  ).length;
  const progressPercentage =
    (completedItems / currentCategory.items.length) * 100;

  const springProps = useReactSpring({
    transform: `translateX(${selectedCategory === "ceremony" ? "0%" : selectedCategory === "music" ? "25%" : selectedCategory === "flowers" ? "50%" : "75%"})`,
    config: { tension: 300, friction: 30 },
  });

  return (
    <animated.div
      style={springProps}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <RectangleGroup className="h-5 w-5 text-slate-900" />
          </div>
          <Heading level="h3" className="text-xl font-semibold text-white">
            Wedding Planning Guide
          </Heading>
        </div>

        {/* Category Selection */}
        <div className="space-y-4">
          <Text className="text-sm font-semibold text-pink-500 uppercase tracking-wide">
            Planning Category:
          </Text>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(planningCategories).map(([key, category]) => (
              <Button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`${
                  selectedCategory === key
                    ? "bg-pink-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Information */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <Heading level="h4" className="text-lg font-semibold text-white mb-2">
            {currentCategory.title}
          </Heading>
          <Text className="text-gray-300 mb-3">
            {currentCategory.description}
          </Text>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Text className="text-pink-500 font-semibold">Progress</Text>
              <Text className="text-white">
                {completedItems}/{currentCategory.items.length} completed
              </Text>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <m.div
                className="bg-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {currentCategory.items.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  checkedItems[item.id]
                    ? "bg-pink-500 border-pink-500"
                    : "border-slate-500 hover:border-pink-500"
                }`}
              >
                {checkedItems[item.id] && (
                  <CheckCircle className="h-3 w-3 text-white" />
                )}
              </button>

              <div className="flex-1">
                <Text
                  className={`text-sm font-medium ${
                    checkedItems[item.id]
                      ? "text-gray-400 line-through"
                      : "text-white"
                  }`}
                >
                  {item.task}
                </Text>
                <Text className="text-xs text-gray-400 mt-1">
                  Deadline: {item.deadline}
                </Text>
              </div>
            </m.div>
          ))}
        </div>

        {/* Completion Celebration */}
        {completedItems === currentCategory.items.length && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-pink-900/20 rounded-lg border border-pink-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-pink-400" />
              <Text className="text-sm font-semibold text-pink-400">
                {currentCategory.title} Complete!
              </Text>
            </div>
            <Text className="text-sm text-gray-300">
              Congratulations! You've completed all tasks in this category. Your
              wedding planning is progressing beautifully!
            </Text>
          </m.div>
        )}
      </div>
    </animated.div>
  );
};

export default function Matrimony() {
  const reducedMotion = prefersReducedMotion();
  
  // CMS DATA SOURCE: Get matrimony sacrament image
  const matrimonyImage = getSacramentImage('matrimony');
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

  const matrimonyContent = [
    "In the Catholic understanding, marriage is not just a legal contract but a sacred covenant between a man and woman, blessed by God and witnessed by the Church community. This sacrament reflects the unconditional love between Christ and the Church.",
    "Through marriage, couples receive the grace they need to love each other faithfully, support each other through life's challenges, and welcome children as a gift from God. Marriage is a lifelong partnership that mirrors Christ's love for the Church.",
    "The Catholic Church provides comprehensive marriage preparation to help couples build a strong foundation for their life together, ensuring they understand the sacred nature of their commitment and the graces available to them.",
  ];

  const matrimonyEffects = [
    {
      title: "Sacramental Grace",
      description:
        "Special graces to love faithfully and support each other through life's challenges",
    },
    {
      title: "Unity in Christ",
      description: "Two become one flesh, united in love and purpose under God",
    },
    {
      title: "Mutual Sanctification",
      description:
        "Husband and wife help each other grow in holiness and virtue",
    },
    {
      title: "Partnership in Mission",
      description:
        "Called together to serve God, the Church, and the broader community",
    },
    {
      title: "Openness to Life",
      description:
        "Blessed to welcome and raise children in the Catholic faith",
    },
  ];

  const matrimonyRequirements = [
    {
      title: "Catholic Couples",
      items: [
        "Both parties baptized Catholic",
        "Free to marry (no previous valid marriage)",
        "Complete marriage preparation program",
        "Six months advance notice preferred",
        "Recent baptismal and confirmation certificates",
      ],
    },
    {
      title: "Mixed Marriages",
      items: [
        "One party must be Catholic",
        "Dispensation required from the Bishop",
        "Catholic party promises to raise children Catholic",
        "Non-Catholic party informed of promises",
        "Additional preparation may be required",
      ],
    },
    {
      title: "Documentation Needed",
      items: [
        "Recent baptismal certificates",
        "Confirmation certificates",
        "Civil marriage license",
        "Proof of freedom to marry",
        "Pre-nuptial investigation forms",
      ],
    },
  ];

  const preparationStages: MarriagePreparationStage[] = [
    {
      title: "Initial Meeting",
      description:
        "Meet with the parish priest to discuss your desire to marry and begin the preparation process.",
      duration: "1-2 hours",
      activities: [
        "Discuss your relationship and faith journey",
        "Review marriage preparation requirements",
        "Schedule follow-up meetings",
        "Receive preparation materials",
      ],
      requirements: [
        "Contact parish office 6 months in advance",
        "Provide basic personal information",
        "Confirm availability for preparation program",
        "Discuss preferred wedding date",
      ],
      icon: LightBulb,
    },
    {
      title: "Pre-Cana Course",
      description:
        "Complete the Pre-Cana marriage preparation course covering Catholic marriage teachings.",
      duration: "6-8 weeks",
      activities: [
        "Attend weekly preparation sessions",
        "Learn about Catholic marriage theology",
        "Discuss communication and conflict resolution",
        "Explore finance and family planning topics",
      ],
      requirements: [
        "Attend all required sessions",
        "Complete homework assignments",
        "Participate in discussions",
        "Meet with course facilitators",
      ],
      icon: BookOpen,
    },
    {
      title: "Documentation",
      description:
        "Gather all required documents and complete the pre-nuptial investigation.",
      duration: "2-4 weeks",
      activities: [
        "Obtain recent baptismal certificates",
        "Complete pre-nuptial investigation forms",
        "Gather witness statements",
        "Secure civil marriage license",
      ],
      requirements: [
        "Baptismal certificates within 6 months",
        "Confirmation certificates if applicable",
        "Two witness statements each",
        "Civil marriage license",
      ],
      icon: Document,
    },
    {
      title: "Wedding Planning",
      description:
        "Plan the details of your wedding ceremony with parish staff.",
      duration: "4-6 weeks",
      activities: [
        "Choose Scripture readings",
        "Select wedding music",
        "Plan ceremony details",
        "Schedule wedding rehearsal",
      ],
      requirements: [
        "Submit music selections for approval",
        "Provide wedding program draft",
        "Confirm all participants",
        "Arrange rehearsal attendance",
      ],
      icon: Calendar,
    },
    {
      title: "Final Preparation",
      description:
        "Complete final preparations and attend your wedding rehearsal.",
      duration: "1 week",
      activities: [
        "Attend wedding rehearsal",
        "Finalize ceremony details",
        "Prepare for the sacrament",
        "Receive final blessing",
      ],
      requirements: [
        "All documentation complete",
        "Wedding party prepared",
        "Ceremony details confirmed",
        "Rehearsal attendance",
      ],
      icon: CheckCircle,
    },
  ];

  const quote = {
    text: "What God has joined together, let no one separate",
    source: "Mark 10:9",
  };

  const weddingFees = [
    { item: "Church usage donation", cost: "£400" },
    { item: "Organist (if required)", cost: "£150" },
    { item: "Cantor (if required)", cost: "£100" },
    { item: "Additional musicians", cost: "By arrangement" },
  ];

  const essentialElements = [
    {
      title: "Free Consent",
      description: "Both parties freely choose to marry",
      icon: Heart,
    },
    {
      title: "Fidelity",
      description: "Exclusive love and faithfulness",
      icon: Sparkles,
    },
    {
      title: "Permanence",
      description: "Until death do us part",
      icon: Church,
    },
    {
      title: "Openness to Life",
      description: "Welcoming children as God's gift",
      icon: Users,
    },
    {
      title: "Unity",
      description: "Two become one in Christ",
      icon: Heart,
    },
  ];

  // Scripture for Matrimony theme
  const matrimonyScripture = {
    verse: "What God has joined together, let no one separate.",
    reference: "Mark 10:9",
    theme: "love",
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
        title="Matrimony"
        description="Plan your Catholic wedding at St Saviour's Catholic Church. Information on marriage preparation, requirements, and celebrating your sacred covenant."
        keywords="Catholic Wedding, Church Wedding, Marriage Preparation, Wedding Ceremony, Catholic Marriage, Matrimony, Sacrament"
      >
        {/* Enhanced Accessibility - Screen Reader Support */}
        <div className="sr-only">
          <h1>
            Matrimony page loaded with marriage preparation tracker and wedding
            planning guide
          </h1>
          <p>
            Use Alt+P to access preparation tracker, Alt+W for wedding planning
            guide, Alt+A for analytics
          </p>
        </div>

        {/* Hero Section with Parallax */}
        <animated.div style={heroSpring}>
          <PageHero
            title="Holy Matrimony"
            subtitle="A Sacred Covenant of Love"
            description="Marriage is a lifelong partnership that mirrors Christ's love for the Church, blessed by God and witnessed by the community."
            backgroundImage={matrimonyImage?.url}
            height="large"
            overlay="medium"
            actions={
              <Flex justify="center" gap="md">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Heart className="h-5 w-5" />}
                  className="bg-white text-slate-900 hover:bg-gray-100"
                  onClick={() =>
                    document
                      .getElementById("preparation-tracker")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  onKeyDown={(e) =>
                    e.key === "p" &&
                    document
                      .getElementById("preparation-tracker")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Begin Preparation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<RectangleGroup className="h-5 w-5" />}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  onClick={() =>
                    document
                      .getElementById("wedding-planning")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Wedding Planning
                </Button>
              </Flex>
            }
          />
        </animated.div>

        {/* Sacrament Information with Enhanced Features */}
        <Section spacing="lg" background="slate" id="matrimony-info">
          <Container size="lg">
            <animated.div style={fadeInSpring}>
              <SacramentInfo
                icon={Sparkles}
                title="A Covenant of Love"
                subtitle="The sacred bond between husband and wife"
                content={matrimonyContent}
                quote={quote}
                effects={matrimonyEffects}
                requirements={matrimonyRequirements}
                effectsColor="pink"
                theme="dark"
              />
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
              <SacramentalScriptureSection
                pageTheme="matrimony"
                reducedMotion={reducedMotion}
                className="max-w-4xl mx-auto"
              />
            </m.div>
          </Container>
        </Section>

        {/* Marriage Preparation Tracker */}
        <Section spacing="lg" background="slate" id="preparation-tracker">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Marriage Preparation Journey
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
                  Follow the comprehensive preparation process to ensure your
                  marriage is built on a strong foundation of faith, love, and
                  understanding.
                </Text>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MarriagePreparationTracker stages={preparationStages} />
                <SacramentalAnalytics sacramentType="all" />
              </div>
            </div>
          </Container>
        </Section>

        {/* Wedding Planning Guide */}
        <Section spacing="lg" background="slate" id="wedding-planning">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Wedding Planning Guide
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
                  Comprehensive planning guide covering all aspects of your
                  wedding ceremony, from music and flowers to reception
                  celebration.
                </Text>
              </div>

              <WeddingPlanningGuide />
            </div>
          </Container>
        </Section>

        {/* Essential Elements of Marriage */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Essential Elements of Catholic Marriage
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
                  These five essential elements form the foundation of Catholic
                  marriage, each reflecting God's plan for married love and
                  family life.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {essentialElements.map((element, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600 hover:border-pink-500 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          {React.createElement(element.icon, {
                            className: "h-6 w-6 text-slate-900",
                          })}
                        </div>
                        <Heading
                          level="h3"
                          className="text-lg font-semibold text-white"
                        >
                          {element.title}
                        </Heading>
                      </div>

                      <Text className="text-gray-300 leading-relaxed">
                        {element.description}
                      </Text>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Wedding Fees */}
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <Heading
                    level="h2"
                    className="text-3xl font-light text-white text-center"
                  >
                    Wedding Fees & Donations
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
                  Suggested donations to support the parish and cover wedding
                  expenses.
                </Text>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
                  <div className="space-y-4">
                    {weddingFees.map((fee, index) => (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <CurrencyPound className="h-5 w-5 text-pink-500" />
                          <Text className="text-white font-medium">
                            {fee.item}
                          </Text>
                        </div>
                        <Text className="text-pink-500 font-semibold">
                          {fee.cost}
                        </Text>
                      </m.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700">
                    <div className="flex items-center gap-2 mb-2">
                      <InfoCircle className="h-5 w-5 text-blue-400" />
                      <Text className="text-sm font-semibold text-blue-400">
                        Payment Information
                      </Text>
                    </div>
                    <Text className="text-sm text-gray-300">
                      These are suggested donations to support the parish
                      ministries. Payment arrangements can be discussed with the
                      parish office.
                    </Text>
                  </div>
                </div>
              </div>
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
                    Begin Your Journey Together
                  </Heading>
                  <div className="flex justify-center">
                    <m.div
                      className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
                    Marriage is a beautiful sacrament that deserves careful
                    preparation and joyful celebration. We're honored to help
                    you begin this sacred journey together.
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
                <Link href="/contact-us">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Phone className="h-5 w-5" />}
                    className="bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Plan Your Wedding
                  </Button>
                </Link>

                <SocialSharingSystem
                  articleId="matrimony-page"
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  title="Matrimony at St Saviour's"
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
              <li>Alt+P: Focus marriage preparation tracker</li>
              <li>Alt+W: Focus wedding planning guide</li>
              <li>Alt+A: Focus analytics</li>
              <li>Alt+C: Contact parish office</li>
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
            .getElementById("preparation-tracker")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "w":
          e.preventDefault();
          document
            .getElementById("wedding-planning")
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
          window.location.href = "tel:020 8852 7411";
          break;
      }
    }
  });
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
