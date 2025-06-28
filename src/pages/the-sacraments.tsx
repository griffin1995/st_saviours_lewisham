import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { 
  Droplets, 
  Cross, 
  Cookie, 
  Heart, 
  Gem, 
  HandMetal, 
  Plus,
  ArrowRight 
} from "lucide-react";

export default function TheSacraments() {
  const sacraments = [
    {
      name: "Baptism",
      icon: Droplets,
      description: "The gateway to life in the Spirit and the door which gives access to the other sacraments.",
      details: "Through Baptism we are freed from sin and reborn as children of God.",
      link: "/the-sacraments/baptism",
      color: "blue"
    },
    {
      name: "Confirmation",
      icon: Cross,
      description: "Completes Christian initiation and strengthens us with the gifts of the Holy Spirit.",
      details: "Confirmation deepens baptismal grace and roots us more deeply in divine filiation.",
      link: "/the-sacraments/confirmation",
      color: "red"
    },
    {
      name: "The Eucharist",
      icon: Cookie,
      description: "The source and summit of Christian life, the Body and Blood of Christ.",
      details: "In Holy Communion, we receive Christ himself and are united with him and each other.",
      link: "/the-sacraments/the-eucharist",
      color: "amber"
    },
    {
      name: "Confession",
      icon: Heart,
      description: "The sacrament of forgiveness and reconciliation with God and the Church.",
      details: "Through confession, we receive God's mercy and are restored to grace.",
      link: "/the-sacraments/confession",
      color: "green"
    },
    {
      name: "Anointing of the Sick",
      icon: Plus,
      description: "Brings spiritual and sometimes physical healing to those who are seriously ill.",
      details: "This sacrament provides comfort, courage, and spiritual strength in times of illness.",
      link: "/the-sacraments/anointing-of-the-sick",
      color: "purple"
    },
    {
      name: "Holy Orders",
      icon: HandMetal,
      description: "The sacrament by which bishops, priests, and deacons are ordained.",
      details: "Through Holy Orders, men are consecrated to serve God and his people.",
      link: "/the-sacraments/holy-orders",
      color: "indigo"
    },
    {
      name: "Matrimony",
      icon: Gem,
      description: "The sacred covenant between a man and woman that mirrors Christ's love for the Church.",
      details: "Marriage is a lifelong partnership ordered toward the good of the spouses and children.",
      link: "/the-sacraments/matrimony",
      color: "pink"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    amber: "bg-amber-600 hover:bg-amber-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    pink: "bg-pink-600 hover:bg-pink-700"
  };

  return (
    <PageLayout
      title="The Sacraments"
      description="Learn about the seven sacraments of the Catholic Church at St Saviour's. Discover how these sacred signs bring us closer to God."
      keywords="Catholic Sacraments, Baptism, Confirmation, Eucharist, Confession, Anointing, Holy Orders, Matrimony, Catholic Church"
    >
      <PageHero
        title="The Seven Sacraments"
        subtitle="Sacred Signs of Grace"
        description="The sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church."
        backgroundImage="/images/hero/church-sanctuary.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
            What Are the Sacraments?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            The sacraments are visible signs of invisible grace, instituted by Christ 
            to sanctify us, to build up the body of Christ, and to give worship to God. 
            They are seven in number and are celebrated in the Catholic Church as 
            sacred encounters with the living God.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Cross className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Signs of Grace</h3>
              <p className="text-gray-600">
                Each sacrament is an outward sign that communicates inward grace, 
                making God's love tangible in our lives.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Christ's Presence</h3>
              <p className="text-gray-600">
                Through the sacraments, Christ himself acts, touching our hearts 
                and transforming our souls.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Gem className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Church Community</h3>
              <p className="text-gray-600">
                The sacraments unite us as one body in Christ, building up 
                the community of faith.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* The Seven Sacraments */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              The Seven Sacraments
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each sacrament has its own unique role in our spiritual journey, 
              from initiation to healing to service.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sacraments.map((sacrament, index) => (
              <motion.div
                key={sacrament.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={sacrament.link}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-6 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${colorClasses[sacrament.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center transition-colors`}>
                        <sacrament.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {sacrament.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                      {sacrament.description}
                    </p>
                    
                    <p className="text-sm text-gray-500 mb-4 italic">
                      {sacrament.details}
                    </p>
                    
                    <div className="flex items-center text-gold-600 hover:text-gold-700 font-semibold transition-colors group-hover:translate-x-1 transform duration-300">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Sacrament Categories */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Droplets className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Sacraments of Initiation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Baptism, Confirmation, and Eucharist</strong> lay the foundation 
              of Christian life. They initiate us into the Church and establish our 
              relationship with Christ.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Baptism - Rebirth in Christ</li>
              <li>• Confirmation - Strengthened by the Spirit</li>
              <li>• Eucharist - Nourished by Christ's Body</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Sacraments of Healing
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Confession and Anointing of the Sick</strong> continue Jesus' 
              work of healing and forgiveness. They restore us to spiritual health 
              and strengthen us in times of need.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Confession - Forgiveness of sins</li>
              <li>• Anointing - Healing and comfort</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
              <HandMetal className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Sacraments of Service
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Holy Orders and Matrimony</strong> are directed toward the 
              salvation of others. They consecrate people to serve God and the 
              Church in specific ways.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Holy Orders - Service to the Church</li>
              <li>• Matrimony - Service to family</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">
            Begin Your Sacramental Journey
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            Whether you're seeking baptism, preparing for confirmation, or exploring 
            any of the sacraments, we're here to guide and support you on your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
            >
              Contact Us for Information
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/mass"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
            >
              See Mass Times
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}