import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout";
import { PageHero } from "@/components/layout";
import ContentSection from "@/components/ContentSection";
import { 
  GraduationCap, 
  Heart, 
  Users, 
  BookOpen, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Award,
  Target,
  Lightbulb
} from "lucide-react";

const schoolStats = [
  { label: "Current Pupils", value: "420", icon: Users },
  { label: "Teaching Staff", value: "28", icon: GraduationCap },
  { label: "Ofsted Rating", value: "Good", icon: Award },
  { label: "Founded", value: "1872", icon: Star }
];

const keyStages = [
  {
    stage: "Early Years Foundation Stage",
    ages: "3-5 years",
    description: "Nurturing young minds through play-based learning in our caring environment.",
    highlights: ["Qualified Early Years teachers", "Outdoor learning areas", "Daily prayers and Catholic values"]
  },
  {
    stage: "Key Stage 1",
    ages: "5-7 years (Years 1-2)",
    description: "Building fundamental skills in literacy, numeracy, and faith formation.",
    highlights: ["Phonics programme", "First Holy Communion preparation", "Small class sizes"]
  },
  {
    stage: "Key Stage 2",
    ages: "7-11 years (Years 3-6)",
    description: "Developing confident, capable young Catholics ready for secondary education.",
    highlights: ["SATs preparation", "Leadership opportunities", "Confirmation preparation"]
  }
];

const values = [
  {
    icon: Heart,
    title: "Love & Compassion",
    description: "Following Christ's example of love and care for others"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Striving for the best in all areas of learning and development"
  },
  {
    icon: Users,
    title: "Community",
    description: "Building strong relationships within our school and parish family"
  },
  {
    icon: Lightbulb,
    title: "Growth",
    description: "Encouraging every child to reach their full potential"
  }
];

export default function StSavioursPrimarySchool() {
  return (
    <PageLayout
      title="St Saviour's Primary School"
      description="St Saviour's Catholic Primary School in Lewisham - nurturing young minds in faith, learning, and community since 1872."
      keywords="Catholic Primary School, Lewisham Schools, Catholic Education, Primary Education, Faith School, St Saviours School"
      background="white"
    >
      <PageHero
        title="St Saviour's Catholic Primary School"
        subtitle="Faith, Learning, Community"
        description="Nurturing young minds and hearts in the Catholic tradition since 1872"
        pageName="st-saviours-primary-school"
        height="large"
        overlay="medium"
      />

      {/* School Introduction */}
      <ContentSection background="white" padding="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-6">
              Welcome to Our School Family
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              At St Saviour's Catholic Primary School, we provide an outstanding Catholic education 
              where every child is valued, nurtured, and inspired to achieve their full potential. 
              Our school community is built on the foundation of Gospel values, creating an environment 
              where faith, learning, and friendship flourish together.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We are proud to serve the diverse community of Lewisham, welcoming families from all 
              backgrounds who share our commitment to Catholic education and values-based learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#admissions"
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Apply Now
              </Link>
              <Link
                href="#visit"
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors duration-200"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Visit
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/school/children-learning.jpg"
              alt="Children learning in classroom"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </ContentSection>

      {/* School Statistics */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Our School at a Glance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key facts and figures about St Saviour's Catholic Primary School
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-gold-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Our Values */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Our Catholic Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The foundation of everything we do at St Saviour's
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-6">
                <value.icon className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Key Stages */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
            Learning Journey
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Supporting your child through every stage of their primary education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {keyStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stage.stage}</h3>
                <p className="text-gold-600 font-medium">{stage.ages}</p>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{stage.description}</p>
              <ul className="space-y-2">
                {stage.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <Star className="h-4 w-4 text-gold-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* School Life */}
      <ContentSection background="white" padding="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="/images/school/playground-children.jpg"
              alt="Children playing in school playground"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-6">
              Enriching School Life
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Beyond the classroom, we offer a rich variety of activities and opportunities 
              that help our pupils develop their talents, build confidence, and grow in faith.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Award className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Extra-Curricular Activities</h4>
                  <p className="text-gray-600">Sports clubs, music lessons, art workshops, and more</p>
                </div>
              </div>
              <div className="flex items-start">
                <Heart className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Pastoral Care</h4>
                  <p className="text-gray-600">Dedicated support for every child's wellbeing</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Community Links</h4>
                  <p className="text-gray-600">Strong connections with our parish and local community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Admissions Information */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Admissions Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We welcome applications from families who share our Catholic values and commitment to education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Dates 2025/2026</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gold-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Application Deadline</div>
                  <div className="text-gray-600">15th January 2025</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gold-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Offers Sent</div>
                  <div className="text-gray-600">16th April 2025</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <GraduationCap className="h-5 w-5 text-gold-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Term Starts</div>
                  <div className="text-gray-600">September 2025</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Admission Criteria</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Star className="h-4 w-4 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Catholic children who are looked after or previously looked after</span>
              </div>
              <div className="flex items-start">
                <Star className="h-4 w-4 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Catholic children with a sibling at the school</span>
              </div>
              <div className="flex items-start">
                <Star className="h-4 w-4 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Catholic children living in the parish</span>
              </div>
              <div className="flex items-start">
                <Star className="h-4 w-4 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Other Catholic children</span>
              </div>
              <div className="flex items-start">
                <Star className="h-4 w-4 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Children of other Christian denominations</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Full admissions policy available on our school website
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Contact & Visit */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
            Visit Our School
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We warmly welcome prospective families to visit and experience our school community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">School Office</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div className="text-gray-600">
                    St Saviour's Catholic Primary School<br />
                    123 School Lane<br />
                    Lewisham, London SE13 7XX
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">020 8852 7412</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">office@stsaviours-school.lewisham.sch.uk</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gold-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Office Hours</div>
                  <div className="text-gray-600">8:30 AM - 4:30 PM (Term Time)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">School Tours</h3>
            <p className="text-gray-600 mb-6">
              We offer regular school tours for prospective families. These provide an opportunity 
              to see our facilities, meet our staff, and experience the warm, welcoming atmosphere 
              of our school community.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gold-50 rounded-lg">
                <div className="font-semibold text-gray-900">Next Open Morning</div>
                <div className="text-gray-600">Saturday 15th March 2025, 10:00 AM</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="tel:02088527412"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call to Book
                </Link>
                <Link
                  href="mailto:office@stsaviours-school.lewisham.sch.uk"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}