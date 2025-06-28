import React from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Droplets, Calendar, Phone, BookOpen, Users, Heart } from "lucide-react";

export default function Baptism() {
  return (
    <PageLayout
      title="Baptism"
      description="Learn about the sacrament of Baptism at St Saviour's Catholic Church. Information on infant baptism, adult baptism, and preparation classes."
      keywords="Catholic Baptism, Infant Baptism, Adult Baptism, Christening, RCIA, Baptism Preparation, Lewisham"
    >
      <PageHero
        title="Baptism"
        subtitle="The Sacrament of New Life"
        description="The gateway to life in the Spirit and the door which gives access to the other sacraments."
        backgroundImage="/images/sacraments/baptism-font.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-light text-gray-900">
              Born Again in Christ
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Baptism is the first and chief sacrament of forgiveness of sins because 
              it unites us with Christ, who died for our sins and rose for our 
              justification. Through Baptism we are freed from sin and reborn as 
              children of God.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In this sacrament, we are cleansed of original sin, become members 
              of the Church, and are called to live as disciples of Jesus Christ. 
              Baptism is necessary for salvation and is the foundation of our 
              Christian life.
            </p>
            <div className="flex items-center space-x-3 text-gold-600">
              <Droplets className="h-5 w-5" />
              <span className="italic">"Go therefore and make disciples of all nations, baptizing them..." - Matthew 28:19</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Effects of Baptism</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Forgiveness of original sin and all personal sins</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Rebirth as a child of God</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Incorporation into the Church</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Participation in Christ's priesthood</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Indelible spiritual mark</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Types of Baptism */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Baptism at St Saviour's
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We celebrate baptism for people of all ages, from infants to adults, 
              with appropriate preparation for each stage of life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Infant Baptism */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Infant Baptism</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We welcome families who wish to have their children baptized into 
                  the Catholic faith. Infant baptism is a beautiful celebration of 
                  God's grace and the family's commitment to raising their child 
                  in the faith.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• At least one parent must be Catholic</li>
                    <li>• Attendance at baptism preparation classes</li>
                    <li>• Catholic godparents (at least one)</li>
                    <li>• Birth certificate of child</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Preparation:</h4>
                  <p className="text-sm">
                    Parents attend two preparation sessions covering the meaning 
                    of baptism and their role in their child's faith development.
                  </p>
                </div>
              </div>
            </div>

            {/* Adult Baptism */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Adult Baptism</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Adults seeking baptism participate in the Rite of Christian 
                  Initiation of Adults (RCIA), a process of formation that 
                  prepares them for baptism, confirmation, and first communion.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">RCIA Process:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Initial inquiry and welcome</li>
                    <li>• Period of formation and catechesis</li>
                    <li>• Preparation for sacraments</li>
                    <li>• Celebration at Easter Vigil</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration:</h4>
                  <p className="text-sm">
                    The RCIA process typically takes 6-12 months, beginning 
                    in September and culminating at Easter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Preparation Process */}
      <ContentSection background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Baptism Preparation
            </h2>
            <p className="text-lg text-gray-600">
              Proper preparation helps families understand the significance of baptism 
              and their ongoing role in living out the faith.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900">Initial Contact</h3>
                <p className="text-sm text-gray-600">
                  Contact the parish office to express interest and schedule 
                  an initial meeting with one of our priests.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900">Preparation Classes</h3>
                <p className="text-sm text-gray-600">
                  Attend required preparation sessions to understand the 
                  sacrament and your responsibilities as Catholic parents.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Celebration</h3>
                <p className="text-sm text-gray-600">
                  The baptism is celebrated during Mass or in a separate 
                  ceremony, welcoming the new Christian into our community.
                </p>
              </div>
            </div>

            <div className="bg-navy-900 rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">
                Preparation Session Topics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Session 1: Understanding Baptism</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• The meaning and effects of baptism</li>
                    <li>• Biblical foundations</li>
                    <li>• The role of parents and godparents</li>
                    <li>• Symbols and rituals explained</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Session 2: Living the Faith</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Raising children in the Catholic faith</li>
                    <li>• The importance of regular Mass attendance</li>
                    <li>• Prayer in family life</li>
                    <li>• Preparing for future sacraments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Practical Information */}
      <ContentSection background="gray">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Baptism Schedule & Information
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-gold-600" />
                  <h4 className="font-semibold text-gray-900">When We Celebrate</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sundays after 11:30 AM Mass (monthly)</li>
                  <li>• First Saturday of each month at 2:00 PM</li>
                  <li>• Special arrangements for emergency baptisms</li>
                  <li>• Easter Vigil for adult baptisms</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="h-5 w-5 text-gold-600" />
                  <h4 className="font-semibold text-gray-900">What to Bring</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Birth certificate of child</li>
                  <li>• Completed baptism application form</li>
                  <li>• Certificate of completion of preparation classes</li>
                  <li>• Godparent certificates (if not from our parish)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="h-5 w-5 text-gold-600" />
                  <h4 className="font-semibold text-gray-900">Godparents</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Must be practicing Catholics aged 16+</li>
                  <li>• Confirmed and in good standing with the Church</li>
                  <li>• One godparent minimum, two maximum</li>
                  <li>• Christian witness (non-Catholic) permitted with Catholic godparent</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Getting Started
            </h3>
            <p className="text-gray-600">
              Ready to begin the baptism process? We're here to help guide you 
              through every step of this beautiful sacrament.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-600" />
                  <div>
                    <p className="font-medium text-gray-900">Parish Office</p>
                    <p className="text-sm text-gray-600">020 8852 7411</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600 mb-3">
                    Office Hours: Monday - Friday, 9:00 AM - 5:00 PM
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center px-4 py-2 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-700 transition-colors text-sm"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/the-sacraments"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                    >
                      All Sacraments
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Emergency Baptism</h4>
              <p className="text-blue-800 text-sm">
                In cases of serious illness or danger of death, please contact 
                the parish office immediately. A priest will be available to 
                perform an emergency baptism.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}