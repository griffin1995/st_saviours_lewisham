import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  PhoneIcon as Phone,
  EnvelopeIcon as Mail,
  MapPinIcon as MapPin,
  ArrowRightIcon,
  UserGroupIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  GlobeAltIcon,
  CameraIcon,
  PlayIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";

// Enhanced 2025 Components
import { m } from "framer-motion";
import { typographyScale } from "@/lib/fonts";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { EnhancedContactForm } from "@/components/enhanced/EnhancedContactForm";
import { InteractiveStaffDirectory } from "@/components/enhanced/InteractiveStaffDirectory";
import { EmergencyContactSystem } from "@/components/enhanced/EmergencyContactSystem";
// PhotoSwipe consolidated into shared component
// import {
//   PhotoSwipeLightbox,
//   EnhancedImage,
// } from "@/components/enhanced/PhotoSwipeLightbox";
import { MainPagePhotoSwipe, type SharedGalleryImage } from '@/components/shared/gallery';
// ScriptureCard consolidated into shared component
// import { ScriptureCard } from "@/components/enhanced/ScriptureCard";
import { MainPageScriptureSection } from '@/components/shared/content';

// Modern imports with Zustand integration
import { PageLayout, PageHero } from "@/components/layout";
import {
  getContactPhone,
  getContactEmail,
  getContactAddress,
} from "@/lib/cms-content";
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
import {
  ContactForm,
  ContactInfo,
  type ContactFormData,
} from "@/components/church";
import { useUI, useActions } from "@/stores/churchStore";

export default function ContactUs() {
  const ui = useUI();
  const actions = useActions();
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: "info",
      message: "Welcome to our Contact page",
      dismissible: true,
    });
  }, []);

  // Google Maps and Street View integration
  useEffect(() => {
    if (!mapRef.current) return;

    const initMaps = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        // Main interactive map
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 51.4619, lng: -0.0366 }, // St Saviour's coordinates
          zoom: 16,
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
            {
              featureType: "poi.place_of_worship",
              elementType: "geometry",
              stylers: [{ color: "#d4af37" }],
            },
          ],
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Church marker with info window
        const marker = new google.maps.Marker({
          position: { lat: 51.4619, lng: -0.0366 },
          map: map,
          title: "St Saviour's Catholic Church",
          icon: {
            url: "/icons/church-marker.svg",
            scaledSize: new google.maps.Size(50, 50),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 300px;">
              <h3 style="margin: 0 0 10px 0; color: #1a365d; font-size: 16px; font-weight: bold;">St Saviour's Catholic Church</h3>
              <p style="margin: 0 0 5px 0; color: #666;">Lewisham High Street, SE13 6AA</p>
              <p style="margin: 0 0 10px 0; color: #666;">Phone: 020 8852 7411</p>
              <div style="margin-top: 10px;">
                <a href="https://maps.google.com/maps/dir//St+Saviour's+Catholic+Church,+Lewisham" target="_blank" style="color: #d4af37; text-decoration: none; font-weight: bold;">Get Directions</a>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        // Street View if element exists
        if (streetViewRef.current) {
          new google.maps.StreetViewPanorama(streetViewRef.current, {
            position: { lat: 51.4619, lng: -0.0366 },
            pov: { heading: 90, pitch: 0 },
            zoom: 1,
          });
        }
      } catch (error) {
        console.log("Maps API not available");
        // Show fallback content
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-navy-900 rounded-xl flex items-center justify-center">
              <div class="text-center text-white p-8">
                <div class="w-16 h-16 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg class="h-8 w-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p class="text-lg font-medium mb-2">St Saviour's Catholic Church</p>
                <p class="text-gray-300 mb-4">Lewisham High Street, SE13 6AA</p>
                <button class="bg-gold-700 text-black px-4 py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors">Get Directions</button>
              </div>
            </div>
          `;
        }
      }
    };

    initMaps();
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

  // Enhanced form submission with analytics and acknowledgment
  const handleFormSubmit = async (formData: any) => {
    try {
      // TODO: Implement actual form submission logic with proper API
      console.log("Enhanced form submission:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Send acknowledgment notification
      actions.addNotification({
        type: "success",
        message: `Thank you ${formData.name}! We'll respond within ${formData.urgency === "emergency" ? "30 minutes" : formData.urgency === "high" ? "24 hours" : "2-3 days"}.`,
        dismissible: true,
      });

      // Analytics tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "contact_form_submission", {
          urgency: formData.urgency,
          contact_reason: formData.contactReason,
          preferred_contact: formData.preferredContact,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      actions.addNotification({
        type: "error",
        message:
          "There was an error sending your message. Please try again or call us directly.",
        dismissible: true,
      });
    }
  };

  // Contact methods for quick contact section
  const quickContactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: getContactPhone(),
      type: "phone" as const,
      link: `tel:${getContactPhone().replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email Us",
      value: getContactEmail(),
      type: "email" as const,
      link: `mailto:${getContactEmail()}`,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: [getContactAddress()],
      type: "address" as const,
    },
  ];

  // Detailed contact information
  const detailedContacts = [
    {
      icon: MapPin,
      title: "Address",
      value: [
        "St Saviour's Catholic Church",
        "Lewisham High Street",
        "London SE13 6EE",
        "United Kingdom",
      ],
      type: "address" as const,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "020 8852 7411",
      type: "phone" as const,
      link: "tel:02088527411",
    },
    {
      icon: Mail,
      title: "Email",
      value: "parish@saintsaviours.org.uk",
      type: "email" as const,
      link: "mailto:parish@saintsaviours.org.uk",
    },
  ];

  // Office hours
  const officeHours = [
    "Monday - Friday: 9:00 AM - 5:00 PM",
    "Saturday: 10:00 AM - 2:00 PM",
    "Sunday: Closed (except for emergencies)",
  ];

  // Staff information
  const staff = [
    {
      name: "Fr. Krzysztof Krzyskow",
      title: "Parish Priest",
      directEmailPath: "/email-fr-krzysztof-krzyskow",
    },
    {
      name: "Revd. Carlos Lozano",
      title: "Associate Priest",
      directEmailPath: "/email-revd-carlos-lozano",
    },
  ];

  // Emergency contact
  const emergencyContact = {
    title: "Emergency Contact",
    description:
      "For urgent pastoral care outside office hours (serious illness, death, emergency baptism):",
    phone: "020 8852 7411",
    additionalInfo:
      "Please leave a clear message and we will respond as soon as possible.",
  };

  const contactImages = [
    {
      src: "/images/st_saviours_frontage_war_memorial.jpeg",
      width: 800,
      height: 600,
      alt: "St Saviour's Church Frontage",
      caption:
        "The welcoming entrance to St Saviour's Catholic Church on Lewisham High Street",
    },
    {
      src: "/images/st_saviours_interior_1939_archive_photo.jpeg",
      width: 800,
      height: 600,
      alt: "Parish Office Interior",
      caption:
        "Our parish office where our dedicated staff serve the community",
    },
    {
      src: "/images/chapel_st_patrick_st_saviours.jpeg",
      width: 800,
      height: 600,
      alt: "Parish Meeting Room",
      caption:
        "Comfortable meeting spaces for pastoral conversations and counseling",
    },
  ];

  return (
    <PageLayout
      title="Contact Us"
      description="Get in touch with St Saviour's Catholic Church in Lewisham. Enhanced contact form, interactive staff directory, emergency pastoral care, Google Maps integration, and comprehensive accessibility features."
      keywords="Contact St Saviours, Parish Office, Church Contact, Lewisham Catholic Church, Emergency Pastoral Care, Staff Directory, Get in Touch"
      background="white"
    >
      {/* Hero Section */}
      <PageHero
        title="Contact Us"
        subtitle="We're Here for You"
        description="Connect with our parish community through multiple channels. From general inquiries to emergency pastoral care, we're here to serve you."
        pageName="contact-us"
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
                leftIcon={<Mail className="h-5 w-5" />}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white"
              >
                Send Email
              </Button>
            </m.div>
            <m.div
              whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<ExclamationTriangleIcon className="h-5 w-5" />}
                className="border-red-300 text-white hover:bg-red-600/10 hover:border-red-200"
              >
                Emergency
              </Button>
            </m.div>
          </Flex>
        }
      />

      {/* Enhanced Quick Contact with Scripture */}
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
                Multiple Ways to Connect
                {/* Gold accent underline */}
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "160px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-3xl mx-auto`}
              >
                From everyday questions to urgent pastoral needs, we're here to
                serve our community with multiple contact options and dedicated
                staff.
              </p>
            </m.div>

            {/* Scripture Card about Community */}
            <div className="mb-16">
              <MainPageScriptureSection
                pageTheme="contact-us"
                reducedMotion={ui.reducedMotion}
              />
            </div>

            {/* Enhanced Contact Methods Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  value: "020 8852 7411",
                  description:
                    "Main parish line available 24/7 for emergencies",
                  link: "tel:02088527411",
                  color: "from-green-600 to-green-500",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  value: "parish@saintsaviours.org.uk",
                  description: "General inquiries and non-urgent matters",
                  link: "mailto:parish@saintsaviours.org.uk",
                  color: "from-blue-600 to-blue-500",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  value: "Lewisham High Street, SE13 6AA",
                  description: "Open Monday-Friday 9am-5pm, Saturday 10am-2pm",
                  link: "https://maps.google.com/maps/dir//St+Saviour's+Catholic+Church,+Lewisham",
                  color: "from-purple-600 to-purple-500",
                },
              ].map((method, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={ui.reducedMotion ? {} : { y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-500 transition-all duration-500 rounded-2xl p-8 text-center h-full">
                    <m.div
                      className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      whileHover={
                        ui.reducedMotion ? {} : { scale: 1.1, rotate: 5 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <method.icon className="h-10 w-10 text-white" />
                    </m.div>
                    <h3
                      className={`${typographyScale.h3} text-white mb-3 group-hover:text-gold-300 transition-colors duration-300`}
                    >
                      {method.title}
                    </h3>
                    <p
                      className={`${typographyScale.body} text-gold-300 font-medium mb-4`}
                    >
                      {method.value}
                    </p>
                    <p
                      className={`${typographyScale.caption} text-gray-200 mb-6`}
                    >
                      {method.description}
                    </p>
                    <m.a
                      href={method.link}
                      target={
                        method.link.startsWith("http") ? "_blank" : undefined
                      }
                      className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors duration-300"
                      whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                    >
                      Contact Now
                      <ArrowRightIcon className="h-4 w-4" />
                    </m.a>
                  </div>
                </m.div>
              ))}
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Contact Form Section */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${typographyScale.h2} text-slate-900 mb-6 relative`}
              >
                Send Us a Message
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
                Our enhanced contact form allows you to specify your needs and
                urgency level, ensuring you receive the most appropriate and
                timely response.
              </p>
            </m.div>

            <div className="max-w-4xl mx-auto">
              <EnhancedContactForm
                onSubmit={handleFormSubmit}
                reducedMotion={ui.reducedMotion}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Interactive Staff Directory */}
      <Section spacing="lg" background="slate">
        <Container>
          <ScrollRevealSection variant="reverent">
            <InteractiveStaffDirectory reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Emergency Contact System */}
      <Section spacing="lg" background="white">
        <Container>
          <ScrollRevealSection>
            <EmergencyContactSystem reducedMotion={ui.reducedMotion} />
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Interactive Maps Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`${typographyScale.h2} text-white mb-6 relative`}>
                Find Us & Virtual Tour
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "140px" }}
                />
              </h2>
              <p
                className={`${typographyScale.bodyLarge} text-gray-100 max-w-4xl mx-auto leading-relaxed`}
              >
                Explore our location with interactive maps, Street View, and
                virtual tours. Located in the heart of Lewisham with excellent
                transport links.
              </p>
            </m.div>

            <MainPagePhotoSwipe
              pageContext="contact-us"
              images={contactImages.map((image, index) => ({
                id: index,
                src: image.src,
                width: image.width,
                height: image.height,
                alt: image.alt,
                title: image.alt,
                description: image.caption,
                category: "Church"
              }))}
              reducedMotion={ui.reducedMotion}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Interactive Google Map */}
                <m.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 group hover:border-gold-500/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gold-700/20 rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className={`${typographyScale.h4} text-white`}>
                          Interactive Map
                        </h3>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          Click and drag to explore
                        </p>
                      </div>
                    </div>
                    <div className="relative h-80 w-full rounded-xl overflow-hidden">
                      <div ref={mapRef} className="w-full h-full" />
                    </div>
                    <div className="mt-4 flex gap-3">
                      <m.button
                        className="flex-1 bg-gold-700 text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-gold-600 transition-colors duration-300"
                        whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                        whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                      >
                        Get Directions
                      </m.button>
                      <m.button
                        className="flex-1 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/15 transition-colors duration-300"
                        whileHover={ui.reducedMotion ? {} : { scale: 1.05 }}
                        whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                      >
                        Share Location
                      </m.button>
                    </div>
                  </div>
                </m.div>

                {/* Virtual Tour & Contact Gallery */}
                <m.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {/* Street View */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 group hover:border-gold-500/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                        <GlobeAltIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className={`${typographyScale.h4} text-white`}>
                          Street View
                        </h3>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          Virtual church exterior
                        </p>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden">
                      <div ref={streetViewRef} className="w-full h-full" />
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 group hover:border-gold-500/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                        <CameraIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className={`${typographyScale.h4} text-white`}>
                          Photo Gallery
                        </h3>
                        <p
                          className={`${typographyScale.caption} text-gray-300`}
                        >
                          See our facilities
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {contactImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </div>
                </m.div>
              </div>
            </MainPagePhotoSwipe>

            {/* Transportation & Accessibility Info */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: GlobeAltIcon,
                  title: "Public Transport",
                  details: [
                    "Lewisham Station: 5 min walk",
                    "Multiple bus routes",
                    "DLR connection available",
                  ],
                },
                {
                  icon: MapPin,
                  title: "Parking",
                  details: [
                    "Limited street parking",
                    "Nearby car parks",
                    "Disabled parking available",
                  ],
                },
                {
                  icon: UserGroupIcon,
                  title: "Accessibility",
                  details: [
                    "Wheelchair accessible",
                    "Hearing loop system",
                    "Large print materials",
                  ],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-gold-700/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <h4 className={`${typographyScale.h5} text-white mb-3`}>
                    {item.title}
                  </h4>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className={`${typographyScale.caption} text-gray-300`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </m.div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Call to Action with Multi-language Support */}
      <Section spacing="lg" background="white">
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
                <HeartIcon className="h-10 w-10 icon-theme-dark" />
              </div>

              <h2
                className={`${typographyScale.h1} text-slate-900 mb-6 relative`}
              >
                We're Here to Help
                <m.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ width: "100px" }}
                />
              </h2>

              <p
                className={`${typographyScale.bodyLarge} text-gray-600 max-w-4xl mx-auto leading-relaxed`}
              >
                Whether you're a longtime parishioner, new to the area, or
                simply exploring faith, our doors and hearts are open. We're
                here to support you on your spiritual journey with pastoral
                care, community connection, and practical assistance.
              </p>

              {/* Multi-language Welcome */}
              <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className={`${typographyScale.h4} text-slate-900 mb-4`}>
                  Welcome in Multiple Languages
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p
                      className={`${typographyScale.body} text-gold-600 font-medium`}
                    >
                      English
                    </p>
                    <p className={`${typographyScale.caption} text-gray-700`}>
                      Welcome
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${typographyScale.body} text-gold-600 font-medium`}
                    >
                      Español
                    </p>
                    <p className={`${typographyScale.caption} text-gray-700`}>
                      Bienvenidos
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${typographyScale.body} text-gold-600 font-medium`}
                    >
                      Português
                    </p>
                    <p className={`${typographyScale.caption} text-gray-700`}>
                      Bem-vindos
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Phone,
                    text: "Call Anytime",
                    desc: "24/7 for emergencies",
                  },
                  { icon: Mail, text: "Email Us", desc: "Detailed inquiries" },
                  {
                    icon: BuildingOfficeIcon,
                    text: "Visit Office",
                    desc: "In-person assistance",
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
                    <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center group-hover:bg-gold-200 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-gold-600" />
                    </div>
                    <div className="text-center">
                      <h4
                        className={`${typographyScale.h4} text-slate-900 mb-2`}
                      >
                        {item.text}
                      </h4>
                      <p className={`${typographyScale.caption} text-gray-600`}>
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
                      leftIcon={<Phone className="h-5 w-5" />}
                      rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                      className="bg-gold-600 text-white hover:bg-gold-700 shadow-xl"
                    >
                      Call Us Today
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
                      className="border-gold-300 text-gold-700 hover:bg-gold-50 hover:border-gold-400"
                    >
                      Visit Our Church
                    </Button>
                  </m.div>
                  <m.div
                    whileHover={ui.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={ui.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<ExclamationTriangleIcon className="h-5 w-5" />}
                      className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                    >
                      Emergency Contact
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
