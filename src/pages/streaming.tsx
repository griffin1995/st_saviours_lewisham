import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Play,
  Calendar,
  ExternalLink,
  Heart,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";
import { motion, m } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

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
  Flex,
} from "@/components/ui";
import {
  StreamingStatus,
  StreamingSchedule,
  WatchingOptions,
  TechnicalRequirements,
  OnlineCommunity,
} from "@/components/church";
import {
  LiveStreamingDashboard,
  StreamingAnalytics,
} from "@/components/enhanced";
import { MainPageScriptureSection } from '@/components/shared/content';
import { MediaPageSocialSystem } from '@/components/shared/social';
import { typographyScale } from "@/lib/fonts";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { prefersReducedMotion } from "@/lib/utils";
import { useUI, useActions } from "@/stores/churchStore";

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Streaming() {
  const ui = useUI();
  const actions = useActions();
  const reducedMotion = prefersReducedMotion();
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderSet, setReminderSet] = useState(false);
  const [streamingStats, setStreamingStats] = useState<{
    [key: string]: { viewers: number; engagement: number; duration: number };
  }>({});
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(247);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [prayerIntentionsOpen, setPrayerIntentionsOpen] = useState(false);
  const [qualitySettingsOpen, setQualitySettingsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareStreamData, setShareStreamData] = useState<any>(null);
  const { ref: analyticsRef, inView: analyticsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const upcomingStreams = [
    {
      id: "sunday-mass",
      title: "Sunday Mass",
      time: "11:30 AM",
      date: "Every Sunday",
      description:
        "Join us for our principal Sunday Mass with full participation from our community.",
      isLive: false,
      nextStream: "2025-01-26T11:30:00",
      featured: true,
    },
    {
      id: "weekday-mass",
      title: "Weekday Mass",
      time: "12:15 PM",
      date: "Monday - Friday",
      description: "Daily Mass for those who cannot attend in person.",
      isLive: false,
      nextStream: "2025-01-27T12:15:00",
      featured: false,
    },
    {
      id: "evening-prayer",
      title: "Evening Prayer",
      time: "6:00 PM",
      date: "Wednesdays",
      description: "Midweek prayer and reflection to center our hearts on God.",
      isLive: false,
      nextStream: "2025-01-29T18:00:00",
      featured: false,
    },
    {
      id: "special-celebrations",
      title: "Special Celebrations",
      time: "Various",
      date: "Holy Days & Seasons",
      description:
        "Christmas, Easter, Ash Wednesday, and other important liturgical celebrations.",
      isLive: false,
      nextStream: null,
      featured: false,
    },
  ];

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: "info",
      message: "Welcome to Live Streaming - join our virtual worship community",
      dismissible: true,
    });

    // Load streaming statistics from localStorage
    const savedStats = localStorage.getItem("streaming-stats");
    if (savedStats) {
      setStreamingStats(JSON.parse(savedStats));
    }

    // Simulate live status updates
    const liveStatusInterval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const isSundayMass =
        now.getDay() === 0 && hour === 11 && minute >= 30 && minute <= 60;
      const isWeekdayMass =
        now.getDay() >= 1 &&
        now.getDay() <= 5 &&
        hour === 12 &&
        minute >= 15 &&
        minute <= 45;

      setIsLive(isSundayMass || isWeekdayMass);
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5);
    }, 30000);

    return () => clearInterval(liveStatusInterval);
  }, []);

  const handleReminderSignup = (streamId: string) => {
    console.log(`Setting reminder for stream: ${streamId}`);
    setReminderSet(true);
    actions.addNotification({
      type: "success",
      message: "Reminder set! You'll be notified before the stream starts.",
      dismissible: true,
    });
  };

  const handleStreamShare = useCallback((streamData: any) => {
    setShareStreamData(streamData);
    setIsShareModalOpen(true);
  }, []);

  const handleChatMessage = useCallback((message: string, author: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        author,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const handlePrayerIntention = useCallback((intention: string) => {
    actions.addNotification({
      type: "success",
      message: "Prayer intention submitted. Our community will pray for you.",
      dismissible: true,
    });
    setPrayerIntentionsOpen(false);
  }, []);

  const handleWatchStream = (streamId: string) => {
    console.log(`Watching stream: ${streamId}`);
  };

  const handleViewSchedule = () => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  };

  // React Spring animations
  const heroSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(30px)" },
    config: ui.reducedMotion ? config.default : config.gentle,
  });

  const analyticsSpring = useSpring({
    opacity: analyticsInView ? 1 : 0,
    transform: analyticsInView ? "translateY(0px)" : "translateY(50px)",
    config: ui.reducedMotion ? config.default : config.gentle,
    delay: 300,
  });

  // Streaming analytics data for Chart.js
  const viewerEngagementData = {
    labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Live Viewers",
        data: [45, 89, 167, 134, 198, 156],
        backgroundColor: "rgba(212, 175, 55, 0.6)",
        borderColor: "#d4af37",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const streamingStatsData = {
    labels: upcomingStreams.map(
      (stream) => stream.title.substring(0, 10) + ".."
    ),
    datasets: [
      {
        label: "Average Viewers",
        data: upcomingStreams.map(
          (stream) => streamingStats[stream.id]?.viewers || 0
        ),
        backgroundColor: "rgba(26, 54, 93, 0.6)",
        borderColor: "#1a365d",
        borderWidth: 1,
      },
      {
        label: "Engagement Score",
        data: upcomingStreams.map(
          (stream) => streamingStats[stream.id]?.engagement || 0
        ),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "#16a34a",
        borderWidth: 1,
      },
    ],
  };

  return (
    <PageLayout
      title="Live Streaming"
      description="Join St Saviour's Catholic Church online through our live streaming services. Attend Mass and prayer services from anywhere in the world."
      keywords="Live Stream Mass, Online Mass, Virtual Church, Live Streaming, Catholic Mass Online, Remote Worship"
    >
      {/* Hero Section */}
      <PageHero
        title="Live Streaming"
        subtitle="Worship with Us Online"
        description="Can't join us in person? Participate in our liturgies through live streaming from anywhere in the world."
        backgroundImage="/images/hero/church-streaming.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play className="h-5 w-5" />}
            >
              Watch Live
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Calendar className="h-5 w-5" />}
              onClick={handleViewSchedule}
            >
              View Schedule
            </Button>
          </Flex>
        }
      />

      {/* Scripture Inspiration Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Worship Together in Spirit
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "180px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Though we may be apart, we are united in prayer and praise
                through our live streams
              </p>
            </m.div>

            <div className="max-w-4xl mx-auto">
              <MainPageScriptureSection
                pageTheme="streaming"
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Live Stream Dashboard */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <animated.div style={heroSpring}>
{/* Simple Live Stream Embed - Video Only */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative aspect-video bg-slate-900">
                {/* Live Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>

                {/* Clean Video Embed */}
                <iframe
                  src="https://mcn.live/Camera/st-saviour%E2%80%99s-church-london"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; encrypted-media; camera; microphone"
                  title="St Saviour's Church Live Stream"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </animated.div>
        </Container>
      </Section>

      {/* Streaming Analytics Dashboard */}
      {analyticsInView && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <animated.div ref={analyticsRef} style={analyticsSpring}>
              <div className="text-center mb-12">
                <h2
                  className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
                >
                  Streaming Insights & Engagement
                  <m.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ width: "220px" }}
                  />
                </h2>
                <p
                  className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
                >
                  See how our virtual worship community is growing and engaging
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white shadow-lg"
                >
                  <CardContent>
                    <h3
                      className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}
                    >
                      Daily Viewer Activity
                    </h3>
                    <div className="h-64">
                      <Line
                        data={viewerEngagementData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: { color: "#374151" },
                            },
                          },
                          scales: {
                            x: {
                              ticks: { color: "#374151" },
                              grid: { color: "rgba(55, 65, 81, 0.1)" },
                            },
                            y: {
                              ticks: { color: "#374151" },
                              grid: { color: "rgba(55, 65, 81, 0.1)" },
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  variant="default"
                  padding="lg"
                  className="bg-white shadow-lg"
                >
                  <CardContent>
                    <h3
                      className={`${typographyScale.h3} text-slate-900 mb-6 text-center`}
                    >
                      Service Engagement
                    </h3>
                    <div className="h-64">
                      <Bar
                        data={streamingStatsData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: { color: "#374151" },
                            },
                          },
                          scales: {
                            x: {
                              ticks: { color: "#374151" },
                              grid: { color: "rgba(55, 65, 81, 0.1)" },
                            },
                            y: {
                              ticks: { color: "#374151" },
                              grid: { color: "rgba(55, 65, 81, 0.1)" },
                            },
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </animated.div>
          </Container>
        </Section>
      )}

      {/* Interactive Streaming Schedule */}
      <Section spacing="lg" background="white" id="schedule">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Interactive Streaming Schedule
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "200px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
              >
                Plan your virtual worship with our enhanced scheduling system
              </p>
            </m.div>

            {/* <InteractiveStreamingSchedule
              streams={upcomingStreams}
              onSetReminder={handleReminderSignup}
              onWatchStream={handleWatchStream}
              onShareStream={handleStreamShare}
              currentViewerCount={viewerCount}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Virtual Communion Integration */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Spiritual Communion
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Join in spiritual communion during our live streams when you
                cannot physically receive
              </p>
            </m.div>

            {/* <VirtualCommunionIntegration
              isLive={isLive}
              streamType="mass"
              onSpiritualCommunion={() => {
                actions.addNotification({
                  type: 'success',
                  message: 'Spiritual communion prayer shared. Jesus is with you in spirit.',
                  dismissible: true
                })
              }}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Live Chat System */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Community Chat
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "120px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
              >
                Connect with fellow worshippers during live streams
              </p>
            </m.div>

            {/* <LiveChatSystem
              isLive={isLive}
              messages={chatMessages}
              onSendMessage={handleChatMessage}
              viewerCount={viewerCount}
              moderationEnabled={true}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Prayer Intention Submission */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Share Your Prayer Intentions
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "180px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                Submit prayer intentions to be included in our live stream
                intercessions
              </p>
            </m.div>

            {/* <PrayerIntentionSubmission
              isOpen={prayerIntentionsOpen}
              onClose={() => setPrayerIntentionsOpen(false)}
              onSubmit={handlePrayerIntention}
              streamingService="Live Mass"
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Streaming Quality Controls */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Optimize Your Viewing Experience
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "220px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-3xl mx-auto`}
              >
                Adjust streaming quality and accessibility settings for the best
                worship experience
              </p>
            </m.div>

            {/* <StreamingQualityControls
              isOpen={qualitySettingsOpen}
              onClose={() => setQualitySettingsOpen(false)}
              onQualityChange={(quality) => {
                actions.addNotification({
                  type: 'info',
                  message: `Streaming quality changed to ${quality}`,
                  dismissible: true
                })
              }}
              currentQuality="HD"
              availableQualities={['4K', 'HD', 'SD', 'Audio Only']}
              reducedMotion={ui.reducedMotion}
            /> */}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* How to Watch */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <WatchingOptions />
        </Container>
      </Section>

      {/* Technical Requirements */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <TechnicalRequirements />
        </Container>
      </Section>

      {/* Online Community */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <OnlineCommunity />
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Heading level="h2" className="text-3xl font-light">
                Can't Attend in Person?
              </Heading>
              <Text size="xl" color="muted" className="max-w-2xl mx-auto">
                Whether you're traveling, unwell, or unable to visit our church,
                you're always welcome to join our worship online. We're here to
                serve our extended parish community wherever you are.
              </Text>
            </div>

            <Flex justify="center" gap="md" wrap>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Play className="h-5 w-5" />}
              >
                Join Next Stream
              </Button>
              <Link href="/mass">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                >
                  View Mass Times
                </Button>
              </Link>
            </Flex>
          </div>
        </Container>
      </Section>

      {/* Social Sharing Modal */}
      <MediaPageSocialSystem
        pageContext="streaming"
        title="Live Streaming at St Saviour's"
        url="https://stsaviourlewisham.org.uk/streaming"
        reducedMotion={ui.reducedMotion}
      />

      {/* Performance Monitor */}
      {/* <PerformanceMonitor
        pageName="Live Streaming"
        trackLoadTimes={true}
        trackInteractions={true}
        trackEngagement={true}
        trackStreamingMetrics={true}
        onPerformanceData={(data) => {
          console.log('Streaming performance:', data)
        }}
      /> */}

      {/* Accessibility Enhancer */}
      {/* <AccessibilityEnhancer
        keyboardNavigation={{
          enableArrowKeys: true,
          enableSpaceBar: true,
          enableEnterKey: true,
          onKeyPress: (key, target) => {
            if (key === ' ' && target?.dataset.action === 'play-pause') {
              // Handle play/pause for stream
            } else if (key === 'Enter' && target?.dataset.streamId) {
              handleWatchStream(target.dataset.streamId)
            }
          }
        }}
        screenReaderSupport={{
          announcePageChanges: true,
          announceStreamStatus: true,
          provideFocusIndicators: true,
          announceChatMessages: true
        }}
        contrastEnhancement={{
          enableHighContrast: ui.highContrast,
          enableFocusVisible: true,
          enableCaptionsSupport: true
        }}
      /> */}
    </PageLayout>
  );
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
