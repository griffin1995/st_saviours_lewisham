import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  ClockIcon as Clock,
  CalendarDaysIcon as Calendar,
  MapPinIcon as MapPin,
  PhoneIcon as Phone,
  EnvelopeIcon as Mail,
  InformationCircleIcon as Info,
  HeartIcon as Heart,
  PlayIcon,
  BellIcon,
  BookOpenIcon,
  SparklesIcon,
  HandRaisedIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

// Enhanced 2025 Components
import { m} from "framer-motion";
import { typographyScale } from "@/lib/fonts";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { InteractiveMassCalendar } from "@/components/enhanced/InteractiveMassCalendar";
import { MassParticipationGuide } from "@/components/enhanced/MassParticipationGuide";
import { LiveMassCountdown } from "@/components/enhanced/LiveMassCountdown";
import { MassStatistics } from "@/components/enhanced/MassStatistics";
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from "@/components/enhanced/ScriptureCard";
import { MainPageScriptureSection } from '@/components/shared/content';
import {
  PhotoSwipeLightbox,
  EnhancedImage,
} from "@/components/enhanced/PhotoSwipeLightbox";

// Modern imports with Zustand integration
import { PageLayout, PageHero } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  Heading,
  Text,
  Section,
  Grid,
  Flex,
  Container,
} from "@/components/ui";
import { ServiceTimes, TodaysServices } from "@/components/church";
import { useUI, useActions } from "@/stores/churchStore";
import { massTimings, confessionTimes, adorationTimes } from "@/lib/data";

export default function MassTimes() {
  const ui = useUI();
  const actions = useActions();
  const mapRef = useRef<HTMLDivElement>(null);

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: "info",
      message: "Welcome to our Mass Times page",
      dismissible: true,
    });
  }, []);

  // Google Maps integration for directions
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 51.4619, lng: -0.0366 }, // St Saviour's coordinates
          zoom: 15,
          styles: [
            // Catholic color scheme map styling
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#1a365d" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#d4af37" }],
            },
          ],
        });

        new google.maps.Marker({
          position: { lat: 51.4619, lng: -0.0366 },
          map: map,
          title: "St Saviour's Catholic Church",
          icon: {
            url: "/icons/church-marker.svg",
            scaledSize: new google.maps.Size(40, 40),
          },
        });
      } catch (error) {
        console.log("Maps API not available");
        // Show fallback content
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-navy-900 rounded-xl flex items-center justify-center">
              <div class="text-center text-white">
                <div class="w-16 h-16 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg class="h-8 w-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p class="text-lg font-medium">St Saviour's Catholic Church</p>
                <p class="text-gray-300">Lewisham High Street, SE13 6AA</p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.8,
        staggerChildren: ui.reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.6 },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.5 },
    },
  };

  // Transform data for ServiceTimes component
  const serviceTimesData = [
    {
      day: "Sunday",
      services: massTimings.sunday || [],
    },
    {
      day: "Monday",
      services: massTimings.monday || [],
    },
    {
      day: "Tuesday",
      services: massTimings.tuesday || [],
    },
    {
      day: "Wednesday",
      services: massTimings.wednesday || [],
    },
    {
      day: "Thursday",
      services: massTimings.thursday || [],
    },
    {
      day: "Friday",
      services: massTimings.friday || [],
    },
    {
      day: "Saturday",
      services: massTimings.saturday || [],
    },
  ];

  const additionalServices = [
    {
      title: "Confession",
      icon: Heart,
      description: "Sacrament of Reconciliation available",
      times: confessionTimes,
      color: "from-navy-500 to-navy-600",
    },
    {
      title: "Adoration",
      icon: Calendar,
      description: "Eucharistic Adoration and quiet prayer",
      times: adorationTimes,
      color: "from-navy-600 to-navy-700",
    },
  ];

  const massImages = [
    {
      src: "/images/st_saviours_interior_1939_archive_photo.jpeg",
      width: 800,
      height: 600,
      alt: "St Saviour's Interior During Mass",
      caption:
        "The beautiful interior of St Saviour's during a celebration of Mass",
    },
    {
      src: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      width: 800,
      height: 600,
      alt: "Stained Glass Window",
      caption: "Beautiful stained glass windows illuminate our worship space",
    },
    {
      src: "/images/chapel_st_patrick_st_saviours.jpeg",
      width: 800,
      height: 600,
      alt: "Chapel of St Patrick",
      caption:
        "Our peaceful chapel provides an intimate space for prayer and reflection",
    },
  ];

  return (
    <PageLayout
      title="Mass Times & Services"
      description="Find Mass times, confession schedules, and service information at St Saviour's Catholic Church in Lewisham. Live countdown to next Mass, interactive calendar, and participation guide for newcomers."
      keywords="Mass Times, Catholic Mass, Confession, Adoration, Service Times, Sunday Mass, Weekday Mass, Live Stream, Church Schedule"
      background="white"
    >
      {/* Hero Section */}
      <PageHero
        title="Mass Times & Services"
        subtitle="Worship with us"
        description="Join us for Mass, confession, and adoration. All are welcome to worship with our vibrant Catholic community."
        pageName="mass"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <m.div
              whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Phone className="h-5 w-5" />}
                rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                className="bg-white text-slate-900 hover:bg-gray-100 shadow-xl"
              >
                Call Parish
              </Button>
            </m.div>
            <m.div
              whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<MapPin className="h-5 w-5" />}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white"
              >
                Get Directions
              </Button>
            </m.div>
          </Flex>
        }
      />

      {/* Live Mass Countdown */}
      <Section spacing="md" background="slate">
        <Container>
          <ScrollRevealSection>
            <m.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Live Service Information
                {/* Gold accent underline */}
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
                Real-time updates on current and upcoming Mass services, with
                live countdown to the next celebration.
              </p>
            </m.div>

            <LiveMassCountdown reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Interactive Mass Calendar */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection variant="reverent">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Interactive Mass Calendar
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "160px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-4xl mx-auto leading-relaxed`}
              >
                Plan your attendance with our interactive calendar showing all
                Mass times, special services, and liturgical celebrations
                throughout the month.
              </p>
            </m.div>

            <InteractiveMassCalendar reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Weekly Mass Schedule with Scripture */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection>
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Weekly Mass Schedule
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "120px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto leading-relaxed`}
              >
                Our regular weekly Mass times, carefully arranged to serve our
                diverse community. Times may vary during special liturgical
                seasons and holidays.
              </p>
            </m.div>

            {/* Scripture Card about the Eucharist */}
            <div className="mb-16">
              <MainPageScriptureSection
                pageTheme="mass"
                reducedMotion={ui.reducedMotion}
              />
            </div>

            <ServiceTimes
              serviceTimes={serviceTimesData}
              highlightToday={true}
              layout="grid"
            />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Additional Services with PhotoSwipe */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection>
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Additional Spiritual Services
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
                Beyond our regular Mass schedule, we offer additional spiritual
                services to nourish your faith journey and deepen your
                relationship with God.
              </p>
            </m.div>

            <PhotoSwipeLightbox
              galleryId="mass-services-gallery"
              images={massImages}
            >
              <Grid cols={2} gap="lg">
                {additionalServices.map((service, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={ui.reducedMotion ? {} : { y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card
                      variant="default"
                      padding="lg"
                      className="h-full border border-slate-600 hover:border-gold-500 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                    >
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-center">
                            <m.div
                              className="w-20 h-20 icon-container-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                              whileHover={
                                ui.reducedMotion
                                  ? {}
                                  : { scale: 1.1, rotate: 5 }
                              }
                              transition={{ duration: 0.3 }}
                            >
                              <service.icon className="h-10 w-10 text-black" />
                            </m.div>
                            <h3
                              className={`${typographyScale.h3} text-white mb-2 group-hover:text-gold-300 transition-colors duration-300`}
                            >
                              {service.title}
                            </h3>
                            <p
                              className={`${typographyScale.body} text-gray-100 mb-6`}
                            >
                              {service.description}
                            </p>
                          </div>

                          <div className="space-y-3">
                            {service.times && Array.isArray(service.times) ? (
                              service.times.map((time, timeIndex) => (
                                <m.div
                                  key={timeIndex}
                                  className="p-4 bg-white/10 rounded-xl border border-slate-600 group-hover:border-gold-500/50 transition-colors duration-300"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: timeIndex * 0.1 }}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <Clock className="h-5 w-5 text-gold-400" />
                                    <span
                                      className={`${typographyScale.body} text-white font-medium`}
                                    >
                                      {time.time}
                                    </span>
                                  </div>
                                  <p
                                    className={`${typographyScale.caption} text-gray-200 ml-8`}
                                  >
                                    {(time as any).note ||
                                      (time as any).description}
                                  </p>
                                </m.div>
                              ))
                            ) : (
                              <div className="p-4 bg-white/10 rounded-xl text-center border border-slate-600">
                                <p
                                  className={`${typographyScale.body} text-gray-200 italic`}
                                >
                                  Please contact the parish office for current
                                  times
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </Grid>
            </PhotoSwipeLightbox>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Mass Statistics Section */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection variant="reverent">
            <MassStatistics reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Mass Participation Guide */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection>
            <MassParticipationGuide reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Important Information with Interactive Elements */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Information */}
                <div className="space-y-8">
                  <div>
                    <h3
                      className={`${typographyScale.h2} text-white mb-6 relative`}
                    >
                      Important Information
                      <m.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ width: "120px" }}
                      />
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: Calendar,
                        title: "Special Occasions",
                        description:
                          "Mass times may vary during Christmas, Easter, and other special liturgical seasons. Please check our weekly newsletter or contact the parish office for holiday schedules.",
                      },
                      {
                        icon: Heart,
                        title: "First Time Visitors",
                        description:
                          "We warmly welcome all visitors to our services. If you have any questions or need assistance, please don't hesitate to speak with our welcoming team.",
                      },
                      {
                        icon: UserGroupIcon,
                        title: "Accessibility",
                        description:
                          "Our church is wheelchair accessible with designated seating areas. Hearing loops are available for those with hearing aids.",
                      },
                      {
                        icon: PlayIcon,
                        title: "Live Streaming",
                        description:
                          "Can't attend in person? Join us online for live-streamed Sunday Masses and special celebrations through our website.",
                      },
                    ].map((item, index) => (
                      <m.div
                        key={index}
                        className="flex gap-4 p-6 bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl hover:border-gold-500/50 transition-all duration-300"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={
                          ui.reducedMotion ? {} : { scale: 1.02, y: -2 }
                        }
                      >
                        <div className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-gold-400" />
                        </div>
                        <div>
                          <h4
                            className={`${typographyScale.h4} text-white mb-2`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`${typographyScale.body} text-gray-100 leading-relaxed`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </m.div>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6">
                    <h4
                      className={`${typographyScale.h4} text-white mb-4 text-center`}
                    >
                      Contact Information
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-5 w-5 text-gold-400" />
                        </div>
                        <p
                          className={`${typographyScale.body} text-white font-medium`}
                        >
                          020 8852 7411
                        </p>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          Parish Office
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Mail className="h-5 w-5 text-gold-400" />
                        </div>
                        <p
                          className={`${typographyScale.body} text-white font-medium`}
                        >
                          parish@saintsaviours.org.uk
                        </p>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          Email Us
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <MapPin className="h-5 w-5 text-gold-400" />
                        </div>
                        <p
                          className={`${typographyScale.body} text-white font-medium`}
                        >
                          Lewisham High Street
                        </p>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          SE13 6AA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Interactive Google Map */}
                <m.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 group hover:border-gold-500/50 transition-all duration-500">
                    <div className="relative h-96 w-full rounded-xl overflow-hidden">
                      <div ref={mapRef} className="w-full h-full" />
                      {/* Fallback overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                        <MapPin className="h-16 w-16 text-gold-500" />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p
                        className={`${typographyScale.caption} text-gray-300 mb-3`}
                      >
                        Click and drag to explore the area around our church
                      </p>
                      <m.button
                        className="bg-gold-700 text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-gold-600 transition-colors duration-300"
                        whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                        whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                      >
                        Get Directions
                      </m.button>
                    </div>
                  </div>
                </m.div>
              </div>
            </m.div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Call to Action with Live Features */}
      <Section spacing="lg" background="slate">
        <Container size="md">
          <ScrollRevealSection>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div className="w-20 h-20 icon-container-white rounded-full flex items-center justify-center mx-auto shadow-lg mb-6">
                <Heart className="h-10 w-10 icon-theme-dark" />
              </div>

              <h2 className={`${typographyScale.h1} text-white mb-6 relative`}>
                Join Us for Worship
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "100px" }}
                />
              </h2>

              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-4xl mx-auto leading-relaxed`}
              >
                Whether you're a regular parishioner or visiting for the first
                time, we invite you to join our vibrant Catholic community in
                worship and fellowship. Experience the beauty of the Mass and
                the warmth of our welcoming parish family.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: BellIcon,
                    text: "Set Mass Reminders",
                    desc: "Never miss a service",
                  },
                  {
                    icon: PlayIcon,
                    text: "Watch Live Stream",
                    desc: "Join us online",
                  },
                  {
                    icon: MapPin,
                    text: "Get Directions",
                    desc: "Find us easily",
                  },
                ].map((item, index) => (
                  <m.div
                    key={index}
                    className="flex flex-col items-center space-y-4 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={ui.reducedMotion ? {} : { y: -8, scale: 1.05 }}
                  >
                    <div className="w-16 h-16 bg-gold-700/20 rounded-2xl flex items-center justify-center group-hover:bg-gold-700/30 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    </div>
                    <div className="text-center">
                      <h4 className={`${typographyScale.h4} text-white mb-2`}>
                        {item.text}
                      </h4>
                      <p className={`${typographyScale.caption} text-gray-300`}>
                        {item.desc}
                      </p>
                    </div>
                  </m.div>
                ))}
              </div>

              <div className="pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <m.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<MapPin className="h-5 w-5" />}
                      rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                      className="bg-white text-slate-900 hover:bg-gray-100 shadow-xl"
                    >
                      Get Directions
                    </Button>
                  </m.div>
                  <m.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<Phone className="h-5 w-5" />}
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white"
                    >
                      Contact Us
                    </Button>
                  </m.div>
                  <m.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<PlayIcon className="h-5 w-5" />}
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white"
                    >
                      Live Stream
                    </Button>
                  </m.div>
                </div>
              </div>
            </m.div>
          </ScrollRevealSection>
        </Container>
      </Section>
    </PageLayout>
  );
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from "@/lib/maintenance";
