import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Heart, Clock, Shield, ArrowRight, CheckCircle, Users } from "lucide-react";
import { confessionTimes } from "@/lib/data";

export default function Confession() {
  return (
    <PageLayout
      title="Confession"
      description="Learn about the sacrament of confession and reconciliation at St Saviour's Catholic Church."
      keywords="Confession, Reconciliation, Forgiveness, Catholic Sacrament, Penance, Absolution"
    >
      <PageHero
        title="Sacrament of Confession"
        subtitle="Reconciliation and Forgiveness"
        description="Experience God's mercy and forgiveness through the sacrament of confession."
        backgroundImage="/images/hero/church-sanctuary.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
              What is Confession?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Confession, also known as the Sacrament of Reconciliation or Penance, is God's gift 
              of forgiveness and healing. Through this sacrament, we receive absolution from our sins 
              and are restored to full communion with God and the Church.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Christ gave the apostles the power to forgive sins, and this authority continues 
              in the Church today through ordained priests. No sin is too great for God's mercy.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-green-800 italic">
                "Receive the Holy Spirit. Whose sins you forgive are forgiven them, 
                and whose sins you retain are retained."
              </p>
              <p className="text-green-600 text-sm mt-2">- John 20:22-23</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-navy-900 text-white p-8 rounded-lg">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-navy-900" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4 text-center">
                God's Mercy
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                God's mercy is infinite and always available to those who seek forgiveness 
                with a contrite heart.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* How to Go to Confession */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              How to Go to Confession
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to receive the sacrament of confession.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Examination of Conscience",
                description: "Reflect on your actions, thoughts, and omissions since your last confession. Consider how you have fallen short of God's love.",
                icon: Shield
              },
              {
                step: 2,
                title: "Contrition",
                description: "Feel genuine sorrow for your sins and resolve to avoid sin in the future with God's grace.",
                icon: Heart
              },
              {
                step: 3,
                title: "Confession",
                description: "Confess your sins honestly and completely to the priest, starting with how long since your last confession.",
                icon: Users
              },
              {
                step: 4,
                title: "Absolution",
                description: "The priest gives you a penance and grants absolution in the name of the Father, Son, and Holy Spirit.",
                icon: CheckCircle
              },
              {
                step: 5,
                title: "Penance",
                description: "Complete the penance given by the priest, usually prayers or acts of charity.",
                icon: Clock
              },
              {
                step: 6,
                title: "Amendment",
                description: "Make a firm purpose to avoid sin and live according to God's will with the help of His grace.",
                icon: ArrowRight
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <step.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Confession Times */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Confession Times at St Saviour's
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Regular times for the sacrament of confession are available throughout the week.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {confessionTimes.map((confession, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{confession.day}</h3>
                      <p className="text-gray-600">{confession.time}</p>
                    </div>
                  </div>
                </div>
                {confession.note && (
                  <p className="text-sm text-gray-500 mt-4 ml-16">{confession.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">By Appointment</h3>
            <p className="text-blue-800">
              Confession is also available by appointment. Please contact the parish office 
              at <strong>020 8852 7411</strong> to arrange a time that works for you.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Benefits of Confession */}
      <ContentSection background="navy">
        <div className="text-white space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gold-400 mb-4">
              Benefits of Regular Confession
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Regular confession brings many spiritual benefits and helps us grow closer to God.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Forgiveness of Sins",
                description: "All sins confessed with true contrition are completely forgiven."
              },
              {
                title: "Grace and Strength",
                description: "Receive actual grace to resist temptation and live virtuously."
              },
              {
                title: "Peace of Conscience",
                description: "Experience the peace that comes from knowing you are forgiven."
              },
              {
                title: "Spiritual Direction",
                description: "Receive guidance and advice for your spiritual journey."
              },
              {
                title: "Reconciliation",
                description: "Restore your relationship with God and the Church community."
              },
              {
                title: "Growth in Holiness",
                description: "Regular confession helps you grow in virtue and holiness."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gold-400 mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Examination of Conscience */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Examination of Conscience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Use these questions to help examine your conscience before confession.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Relationship with God</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Have I made time for prayer each day?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Have I attended Mass on Sundays and holy days?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Have I used God's name respectfully?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Have I kept the Sabbath holy?</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Relationships with Others</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Have I honored my parents and those in authority?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Have I been patient and kind to others?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Have I forgiven those who have hurt me?</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Have I been honest and truthful?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="white">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-serif font-light text-gray-900">
            Experience God's Mercy
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't let fear or shame keep you from God's infinite mercy. 
            Take the first step toward reconciliation and peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition-colors"
            >
              Schedule Confession
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