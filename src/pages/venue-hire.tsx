import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { 
  Building, 
  Users, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Car,
  Wifi,
  Coffee,
  Music,
  Utensils,
  CheckCircle,
  Star,
  Heart,
  PartyPopper
} from "lucide-react";

interface Venue {
  id: string;
  name: string;
  description: string;
  capacity: string;
  area: string;
  image: string;
  features: string[];
  hourlyRate: string;
  halfDayRate: string;
  fullDayRate: string;
  suitableFor: string[];
}

const venues: Venue[] = [
  {
    id: "parish-hall",
    name: "Parish Hall",
    description: "Our spacious main hall is perfect for large gatherings, celebrations, and community events. With a stage area and excellent acoustics, it's ideal for both formal and informal occasions.",
    capacity: "Up to 150 people",
    area: "120 square meters",
    image: "/images/venues/parish-hall.jpg",
    features: [
      "Stage area with lighting",
      "Sound system available",
      "Kitchen facilities adjacent",
      "Tables and chairs included",
      "Disabled access",
      "Parking available"
    ],
    hourlyRate: "£35",
    halfDayRate: "£120",
    fullDayRate: "£200",
    suitableFor: ["Weddings", "Birthday parties", "Community meetings", "Concerts", "Fundraising events", "Corporate events"]
  },
  {
    id: "community-room",
    name: "Community Room",
    description: "A comfortable, intimate space perfect for smaller gatherings, meetings, and family celebrations. Features beautiful stained glass windows and a warm, welcoming atmosphere.",
    capacity: "Up to 50 people",
    area: "40 square meters",
    image: "/images/venues/community-room.jpg",
    features: [
      "Stained glass windows",
      "Natural lighting",
      "Kitchenette access",
      "Flexible seating arrangements",
      "Heating included",
      "Audio/visual equipment"
    ],
    hourlyRate: "£20",
    halfDayRate: "£70",
    fullDayRate: "£120",
    suitableFor: ["Small meetings", "Baby showers", "Book clubs", "Training sessions", "Family gatherings", "Prayer groups"]
  },
  {
    id: "garden-space",
    name: "Church Garden",
    description: "Our beautiful, peaceful garden provides a unique outdoor venue surrounded by mature trees and well-maintained grounds. Perfect for outdoor ceremonies and summer events.",
    capacity: "Up to 80 people",
    area: "200 square meters",
    image: "/images/venues/church-garden.jpg",
    features: [
      "Beautiful mature trees",
      "Well-maintained lawns",
      "Gazebo available",
      "Access to hall facilities",
      "Photography friendly",
      "Peaceful atmosphere"
    ],
    hourlyRate: "£25",
    halfDayRate: "£85",
    fullDayRate: "£150",
    suitableFor: ["Garden parties", "Wedding photos", "Outdoor ceremonies", "Summer fairs", "Memorial services", "Children's events"]
  }
];

const faqs = [
  {
    question: "What's included in the hire fee?",
    answer: "All venue hire includes basic furniture (tables and chairs), lighting, heating, and access to basic kitchen facilities. Additional equipment like sound systems or decorative items may incur extra charges."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 6-8 weeks in advance for popular dates, especially weekends. Some dates may be available with shorter notice."
  },
  {
    question: "Are there any restrictions on what I can hold?",
    answer: "As a Catholic parish, we ask that all events align with our Christian values. We welcome community celebrations, educational events, and charitable fundraisers. Please discuss your event with us."
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have an on-site car park with 25 spaces. Additional street parking is available nearby."
  },
  {
    question: "Can I bring my own catering?",
    answer: "Yes, you can bring your own catering or use our approved caterers list. Our kitchen facilities are available for food preparation and service."
  },
  {
    question: "What about decorations?",
    answer: "You're welcome to decorate the venues appropriately. We ask that no fixtures are damaged and all decorations are removed after your event."
  }
];

export default function VenueHire() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <PageLayout
      title="Venue Hire"
      description="Hire beautiful spaces at St Saviour's Catholic Church in Lewisham for your special events, meetings, and celebrations."
      keywords="Venue Hire Lewisham, Church Hall Hire, Event Space, Wedding Venue, Community Hall, Parish Hall Rental"
    >
      <PageHero
        title="Venue Hire"
        subtitle="Beautiful Spaces for Your Special Events"
        description="Discover our welcoming venues perfect for celebrations, meetings, and community gatherings in the heart of Lewisham."
        backgroundImage="/images/venues/hall-setup.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-6">
            Welcome to Our Community Spaces
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            St Saviour's parish offers beautiful, well-maintained venues in the heart of Lewisham. 
            Whether you're planning a wedding reception, birthday celebration, community meeting, or 
            corporate event, our flexible spaces provide the perfect setting for your special occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
              <Building className="h-8 w-8 text-gold-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Historic Setting</h3>
            <p className="text-gray-600">Beautiful Victorian buildings with character and charm</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-gold-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Spirit</h3>
            <p className="text-gray-600">Supporting local families and community organizations</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
              <Star className="h-8 w-8 text-gold-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Value</h3>
            <p className="text-gray-600">Competitive rates with all proceeds supporting parish work</p>
          </div>
        </div>
      </ContentSection>

      {/* Venues */}
      <ContentSection background="gray" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Our Venues
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of flexible spaces to suit events of all sizes
          </p>
        </div>

        <div className="space-y-12">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-2xl lg:text-3xl font-serif font-light text-gray-900 mb-4">
                    {venue.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {venue.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gold-600 mr-2" />
                      <span className="text-gray-700">{venue.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gold-600 mr-2" />
                      <span className="text-gray-700">{venue.area}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {venue.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-gold-600 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{venue.hourlyRate}</div>
                      <div className="text-sm text-gray-600">per hour</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{venue.halfDayRate}</div>
                      <div className="text-sm text-gray-600">half day</div>
                    </div>
                    <div className="text-center p-3 bg-gold-50 rounded-lg border-2 border-gold-200">
                      <div className="text-lg font-semibold text-gray-900">{venue.fullDayRate}</div>
                      <div className="text-sm text-gold-600">full day</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Perfect for</h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.suitableFor.map((use, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-600"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedVenue(selectedVenue === venue.id ? null : venue.id)}
                    className="w-full sm:w-auto inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book This Venue
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Booking Process */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            How to Book
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to secure your venue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Contact Us",
              description: "Call or email to check availability and discuss your requirements",
              icon: Phone
            },
            {
              step: "2", 
              title: "Visit & View",
              description: "Arrange a viewing to see the venue and discuss your specific needs",
              icon: Building
            },
            {
              step: "3",
              title: "Confirm Booking",
              description: "Complete our booking form and pay the deposit to secure your date",
              icon: CheckCircle
            },
            {
              step: "4",
              title: "Your Event",
              description: "Enjoy your special day with our support and beautiful venue",
              icon: PartyPopper
            }
          ].map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full">
                  <step.icon className="h-8 w-8 text-gold-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Contact Information */}
      <ContentSection background="navy" padding="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Ready to book your venue or have questions? Our friendly team is here to help 
              make your event a success.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-gold-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <div className="text-lg font-semibold text-white">Phone</div>
                  <div className="text-gray-200">020 8852 7411</div>
                  <div className="text-sm text-gray-300">Monday - Friday, 9:00 AM - 5:00 PM</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-gold-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <div className="text-lg font-semibold text-white">Email</div>
                  <div className="text-gray-200">venues@saintsaviours.org.uk</div>
                  <div className="text-sm text-gray-300">We typically respond within 24 hours</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-gold-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <div className="text-lg font-semibold text-white">Address</div>
                  <div className="text-gray-200">
                    St Saviour's Catholic Church<br />
                    123 Church Lane<br />
                    Lewisham, London SE13 7XX
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Enquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
                <option value="">Select Venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>{venue.name}</option>
                ))}
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Expected Guests"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Tell us about your event..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              ></textarea>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </ContentSection>

      {/* FAQ Section */}
      <ContentSection background="gray" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about hiring our venues
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                  <CheckCircle className="h-5 w-5 text-gold-600" />
                </div>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </ContentSection>
    </PageLayout>
  );
}