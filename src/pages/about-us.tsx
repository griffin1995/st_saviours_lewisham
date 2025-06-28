import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Church, Heart, Users, BookOpen, Calendar, MapPin, Phone, Mail, Cross, Star, Award, Clock } from "lucide-react";

export default function AboutUs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "We strive to show Christ's love through our actions and care for one another.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "We welcome all people and build meaningful relationships across generations.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Church,
      title: "Worship",
      description: "We gather to celebrate the Eucharist and grow in our relationship with God.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "We are committed to ongoing formation and deepening our understanding of faith.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const milestones = [
    { year: "1889", event: "Parish established", icon: Church },
    { year: "1902", event: "Current church building consecrated", icon: Cross },
    { year: "1965", event: "Parish school opened", icon: BookOpen },
    { year: "2010", event: "Major restoration completed", icon: Award },
    { year: "2025", event: "Serving over 500 families", icon: Heart }
  ];

  const stats = [
    { number: "135+", label: "Years of Service", icon: Calendar },
    { number: "500+", label: "Families", icon: Users },
    { number: "7", label: "Weekly Masses", icon: Clock },
    { number: "15+", label: "Parish Groups", icon: Star }
  ];

  return (
    <PageLayout
      title="About Us"
      description="Learn about St Saviour's Catholic Church in Lewisham - our history, mission, and vibrant community serving South East London."
      keywords="About St Saviours, Catholic Church Lewisham, Parish History, Community, Mission, Values"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/church-interior.jpg"
            alt="St Saviour's Church Interior"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(248,245,242,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-gold-500" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Our Community</span>
                <div className="w-12 h-px bg-gold-500" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif font-light text-white leading-tight">
                About <span className="text-gold-400">St Saviour's</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto">
              <Cross className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-8">
              Our Mission
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              St Saviour's Catholic Church exists to be a beacon of hope and faith in Lewisham, 
              where all people can encounter the transforming love of Jesus Christ and grow 
              together as a community of believers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do as a parish community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gold-200 h-full">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-slate-900">
                Our Rich History
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  St Saviour's Catholic Church has been serving the Lewisham community since 1889, 
                  when it was first established to meet the spiritual needs of the growing Catholic 
                  population in South East London.
                </p>
                <p>
                  Over the decades, our parish has grown and evolved, but our commitment to providing 
                  a welcoming spiritual home for all has remained constant. We have weathered challenges, 
                  celebrated joys, and continued to be a source of hope and faith for generations of families.
                </p>
                <p>
                  Today, we are proud to be part of the Roman Catholic Archdiocese of Southwark, 
                  continuing our mission to serve God and our local community with dedication and love.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                  <Calendar className="h-6 w-6 text-gold-500 mr-3" />
                  Key Milestones
                </h3>
                
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <milestone.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-lg">{milestone.year}</div>
                        <div className="text-gray-600">{milestone.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team who guide our parish community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Fr. Krzysztof Krzyskow",
                role: "Parish Priest",
                description: "Leading our parish with wisdom and compassion, Fr. Krzysztof brings years of pastoral experience to guide our community in faith and service.",
                icon: Church
              },
              {
                name: "Revd. Carlos Lozano",
                role: "Associate Priest", 
                description: "Supporting our parish ministries and outreach programs, Revd. Carlos brings energy and dedication to serving our diverse community.",
                icon: BookOpen
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:border-gold-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <leader.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                  <p className="text-gold-600 font-semibold mb-6 text-lg">{leader.role}</p>
                  <p className="text-gray-600 leading-relaxed">{leader.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-slate-900">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're new to the area or have been part of Lewisham for years, 
              we'd love to welcome you to St Saviour's.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact-us"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get in Touch
              </motion.a>
              
              <motion.a
                href="/mass"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-slate-900 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                <Clock className="h-5 w-5 mr-2" />
                Mass Times
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

// Check for maintenance mode before rendering the page
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance';