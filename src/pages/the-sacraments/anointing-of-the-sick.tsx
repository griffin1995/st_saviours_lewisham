import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Plus, Heart, Shield, Phone, ArrowRight, Users, Droplets } from "lucide-react";

export default function AnointingOfTheSick() {
  return (
    <PageLayout
      title="Anointing of the Sick"
      description="Learn about the sacrament of anointing of the sick at St Saviour's Catholic Church - bringing healing and comfort."
      keywords="Anointing of the Sick, Last Rites, Extreme Unction, Catholic Sacrament, Healing, Spiritual Comfort"
    >
      <PageHero
        title="Anointing of the Sick"
        subtitle="Sacrament of Healing and Comfort"
        description="Christ's healing touch continues through this sacrament of spiritual and physical restoration."
        backgroundImage="/images/hero/church-interior.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
              What is Anointing of the Sick?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Anointing of the Sick is a sacrament of healing that provides spiritual comfort, 
              courage, and strength to those facing serious illness, surgery, or the frailty of old age. 
              It continues Christ's healing ministry in the Church.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This sacrament is not only for those at the point of death (formerly called "Last Rites"), 
              but for anyone experiencing serious illness or preparing for major surgery. It can be 
              received multiple times during different illnesses.
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <p className="text-purple-800 italic">
                "Is anyone among you sick? Let him call for the elders of the church, 
                and let them pray over him, anointing him with oil in the name of the Lord."
              </p>
              <p className="text-purple-600 text-sm mt-2">- James 5:14</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-navy-900 text-white p-8 rounded-lg">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="h-8 w-8 text-navy-900" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4 text-center">
                Christ's Healing Touch
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Through this sacrament, Christ continues his healing ministry, 
                bringing comfort to body, mind, and soul.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Who Can Receive */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Who Can Receive This Sacrament?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Anointing of the Sick is available to any baptized Catholic who is seriously ill.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Serious Illness",
                description: "Those suffering from serious physical or mental illness that significantly affects their health.",
                icon: Heart,
                color: "red"
              },
              {
                title: "Before Surgery",
                description: "Anyone preparing for major surgery or medical procedures that carry significant risk.",
                icon: Plus,
                color: "blue"
              },
              {
                title: "Elderly Frail",
                description: "Elderly persons who are weakened by age, even without a specific serious illness.",
                icon: Shield,
                color: "green"
              },
              {
                title: "Chronic Conditions",
                description: "Those with chronic illnesses during periods when the condition worsens.",
                icon: Heart,
                color: "purple"
              },
              {
                title: "Children",
                description: "Sick children who have reached the age of reason (usually around 7 years old).",
                icon: Users,
                color: "amber"
              },
              {
                title: "Repeated Reception",
                description: "The sacrament can be received again if the person recovers and becomes seriously ill again.",
                icon: Droplets,
                color: "indigo"
              }
            ].map((recipient, index) => (
              <motion.div
                key={recipient.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 bg-${recipient.color}-600 rounded-lg flex items-center justify-center`}>
                    <recipient.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{recipient.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{recipient.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* The Rite */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              The Rite of Anointing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The sacrament follows a beautiful ritual that brings peace and comfort to the sick person.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900">The Celebration</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Liturgy of the Word</h4>
                      <p className="text-gray-600 text-sm">Scripture readings and prayers appropriate for the sick person's situation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Laying on of Hands</h4>
                      <p className="text-gray-600 text-sm">The priest silently lays hands on the sick person's head in prayer.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Prayer over the Oil</h4>
                      <p className="text-gray-600 text-sm">The priest blesses the oil of the sick (if not already blessed by the bishop).</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Anointing</h4>
                      <p className="text-gray-600 text-sm">The forehead and hands are anointed with oil while prayers are said.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-purple-900 mb-4">Prayer of Anointing</h3>
                <div className="space-y-4 text-purple-800">
                  <div>
                    <p className="font-semibold">On the forehead:</p>
                    <p className="italic text-sm">
                      "Through this holy anointing may the Lord in his love and mercy help you 
                      with the grace of the Holy Spirit."
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">On the hands:</p>
                    <p className="italic text-sm">
                      "May the Lord who frees you from sin save you and raise you up."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Effects of the Sacrament */}
      <ContentSection background="navy">
        <div className="text-white space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gold-400 mb-4">
              Effects of Anointing
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              The sacrament brings many graces and blessings to those who receive it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Spiritual Comfort",
                description: "Brings peace, courage, and strength to face illness with faith and hope."
              },
              {
                title: "Forgiveness of Sins",
                description: "Forgives sins if the person is unable to receive confession due to their condition."
              },
              {
                title: "Union with Christ",
                description: "Unites the sick person's suffering with Christ's passion for the salvation of souls."
              },
              {
                title: "Ecclesiastical Grace",
                description: "Strengthens the person's connection with the Church community and their prayers."
              },
              {
                title: "Preparation for Heaven",
                description: "If it is God's will, prepares the soul for the journey to eternal life."
              },
              {
                title: "Sometimes Physical Healing",
                description: "May bring physical healing if it is conducive to the person's spiritual good."
              }
            ].map((effect, index) => (
              <motion.div
                key={effect.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gold-400 mb-3">{effect.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{effect.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* How to Request */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              How to Request Anointing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you or a loved one needs this sacrament, please contact us immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Emergency Call</h3>
              </div>
              <p className="text-gray-600 mb-4">
                For urgent situations or when someone is dying, call the parish immediately:
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-semibold text-lg">020 8852 7411</p>
                <p className="text-red-600 text-sm">Available 24/7 for emergencies</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Planned Visit</h3>
              </div>
              <p className="text-gray-600 mb-4">
                For non-emergency situations, you can schedule a visit:
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Call during office hours: Monday-Friday, 9 AM - 5 PM</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Speak with a priest after Mass</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Contact the parish office for arrangements</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
            <p className="text-blue-800">
              Please don't hesitate to call, even if you're unsure whether the situation qualifies. 
              Our priests are always willing to visit and provide spiritual comfort to those in need.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="white">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-serif font-light text-gray-900">
            Comfort in Times of Illness
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't face illness alone. The Church is here to provide spiritual comfort and healing 
            through this beautiful sacrament.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500 transition-colors"
            >
              Request Anointing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/the-sacraments"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              All Sacraments
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}