import React from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Heart, Calendar, Phone, BookOpen, Users, Gem, Church } from "lucide-react";

export default function Matrimony() {
  return (
    <PageLayout
      title="Marriage"
      description="Plan your Catholic wedding at St Saviour's Catholic Church. Information on marriage preparation, requirements, and celebrating your special day."
      keywords="Catholic Wedding, Church Wedding, Marriage Preparation, Wedding Ceremony, Catholic Marriage, Lewisham Wedding"
    >
      <PageHero
        title="Holy Matrimony"
        subtitle="A Sacred Covenant"
        description="Marriage is a lifelong partnership that mirrors Christ's love for the Church, blessed by God and witnessed by the community."
        backgroundImage="/images/sacraments/wedding-ceremony.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-light text-gray-900">
              A Covenant of Love
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In the Catholic understanding, marriage is not just a legal contract 
              but a sacred covenant between a man and woman, blessed by God and 
              witnessed by the Church community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This sacrament reflects the unconditional love between Christ and 
              the Church. Through marriage, couples receive the grace they need 
              to love each other faithfully, support each other through life's 
              challenges, and welcome children as a gift from God.
            </p>
            <div className="flex items-center space-x-3 text-pink-600">
              <Heart className="h-5 w-5" />
              <span className="italic">"What God has joined together, let no one separate." - Mark 10:9</span>
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-pink-900 mb-4">Essential Elements of Catholic Marriage</h3>
            <ul className="space-y-3 text-pink-800">
              <li className="flex items-start space-x-2">
                <Gem className="h-4 w-4 text-pink-600 mt-1" />
                <span><strong>Free Consent</strong> - Both parties freely choose to marry</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gem className="h-4 w-4 text-pink-600 mt-1" />
                <span><strong>Fidelity</strong> - Exclusive love and faithfulness</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gem className="h-4 w-4 text-pink-600 mt-1" />
                <span><strong>Permanence</strong> - Until death do us part</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gem className="h-4 w-4 text-pink-600 mt-1" />
                <span><strong>Openness to Life</strong> - Welcoming children</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gem className="h-4 w-4 text-pink-600 mt-1" />
                <span><strong>Unity</strong> - Two become one in Christ</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Requirements */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Getting Married at St Saviour's
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome couples who wish to celebrate their marriage in our 
              beautiful church, surrounded by family, friends, and the parish community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Requirements */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Requirements</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Catholic Couples:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Both parties baptized Catholic</li>
                    <li>• Free to marry (no previous valid marriage)</li>
                    <li>• Complete marriage preparation program</li>
                    <li>• Six months advance notice preferred</li>
                    <li>• Recent baptismal certificates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Mixed Marriages:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• One party must be Catholic</li>
                    <li>• Dispensation required from the Bishop</li>
                    <li>• Catholic party promises to raise children Catholic</li>
                    <li>• Non-Catholic party informed of promises</li>
                    <li>• Additional preparation may be required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Documentation Needed:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Recent baptismal certificates</li>
                    <li>• Confirmation certificates</li>
                    <li>• Civil marriage license</li>
                    <li>• Proof of freedom to marry</li>
                    <li>• Pre-nuptial investigation forms</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preparation */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Marriage Preparation</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our comprehensive marriage preparation helps couples build a 
                  strong foundation for their life together, rooted in faith 
                  and mutual understanding.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pre-Cana Program:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Six-session preparation course</li>
                    <li>• Communication and conflict resolution</li>
                    <li>• Financial planning and responsibility</li>
                    <li>• Catholic teaching on marriage</li>
                    <li>• Natural family planning</li>
                    <li>• Spirituality in marriage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Additional Preparation:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pre-marital inventory assessment</li>
                    <li>• Individual meetings with priest</li>
                    <li>• Liturgy planning sessions</li>
                    <li>• Pre-nuptial investigation</li>
                    <li>• Wedding rehearsal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Timeline:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Contact parish 6+ months before wedding</li>
                    <li>• Complete preparation 2 months before</li>
                    <li>• Final paperwork 1 month before</li>
                    <li>• Rehearsal 1-2 days before wedding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Wedding Planning */}
      <ContentSection background="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Planning Your Wedding Ceremony
            </h2>
            <p className="text-lg text-gray-600">
              Work with our team to create a beautiful and meaningful liturgy 
              that reflects your love and commitment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Liturgy Options
                </h3>
                <div className="grid gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Nuptial Mass</h4>
                    <p className="text-sm text-gray-600">
                      Full Mass with Eucharist - recommended when both parties are Catholic 
                      and the majority of guests can participate in Communion.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Ceremony Outside Mass</h4>
                    <p className="text-sm text-gray-600">
                      Wedding ceremony with Scripture readings, prayers, and vows - 
                      often used for mixed marriages or when many guests are not Catholic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Music Ministry
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Our music ministry can provide beautiful sacred music for your ceremony, 
                    including organ, piano, and vocal accompaniment.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional organist and cantor available</li>
                    <li>• Wide selection of sacred music</li>
                    <li>• Consultation on appropriate musical choices</li>
                    <li>• Assistance with hymn selection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Our Beautiful Church
                </h3>
                <div className="bg-navy-900 rounded-lg p-6 text-white">
                  <h4 className="font-semibold text-gold-400 mb-3">Church Features</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Seating capacity for 300 guests</li>
                    <li>• Beautiful Victorian architecture</li>
                    <li>• Sacred Heart side chapel for intimate ceremonies</li>
                    <li>• Professional sound system</li>
                    <li>• Wheelchair accessible</li>
                    <li>• Stunning stained glass windows</li>
                    <li>• Pipe organ and piano</li>
                    <li>• Photography-friendly lighting</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Photography & Video
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    We welcome professional photographers and videographers, 
                    with guidelines to ensure the sacred nature of the ceremony is maintained.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• No flash photography during ceremony</li>
                    <li>• Photographer briefing before ceremony</li>
                    <li>• Designated areas for equipment</li>
                    <li>• Post-ceremony photos in church permitted</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Costs and Practical Info */}
      <ContentSection background="gray">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Wedding Fees & Donations
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                We ask for a donation to help cover the costs of using the church 
                and supporting our ministry. Fees are kept modest to ensure all 
                couples can afford a church wedding.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Church usage donation:</span>
                  <span className="font-semibold">£400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Organist (if required):</span>
                  <span className="font-semibold">£150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cantor (if required):</span>
                  <span className="font-semibold">£100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Additional musicians:</span>
                  <span className="font-semibold">By arrangement</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Typical total:</span>
                    <span>£650</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Additional donations for flowers, special arrangements, or parish support are always welcome but not required.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Getting Started
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <p className="text-gray-600">
                Ready to begin planning your Catholic wedding? Contact our parish 
                office to schedule your initial meeting and start the preparation process.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-600" />
                  <div>
                    <p className="font-medium text-gray-900">Parish Office</p>
                    <p className="text-sm text-gray-600">020 8852 7411</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gold-600" />
                  <div>
                    <p className="font-medium text-gray-900">Office Hours</p>
                    <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/the-sacraments"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                  >
                    Other Sacraments
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-900 mb-2">Planning Timeline</h4>
              <p className="text-pink-800 text-sm">
                We recommend contacting us at least 6 months before your desired 
                wedding date to ensure adequate time for preparation and to secure 
                your preferred date.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">
            Begin Your Journey Together
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            Marriage is a beautiful sacrament that deserves careful preparation and 
            joyful celebration. We're honored to help you begin this sacred journey together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
            >
              <Heart className="mr-2 h-5 w-5" />
              Plan Your Wedding
            </Link>
            <Link
              href="/venue-hire"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
            >
              <Church className="mr-2 h-5 w-5" />
              Venue Information
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}