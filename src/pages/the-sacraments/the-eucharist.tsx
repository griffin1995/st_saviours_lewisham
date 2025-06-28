import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Cookie, Clock, Users, Heart, ArrowRight, BookOpen } from "lucide-react";

export default function TheEucharist() {
  return (
    <PageLayout
      title="The Eucharist"
      description="Learn about the Eucharist, the source and summit of Christian life at St Saviour's Catholic Church."
      keywords="Eucharist, Holy Communion, Mass, Catholic Sacrament, Body of Christ, Transubstantiation"
    >
      <PageHero
        title="The Holy Eucharist"
        subtitle="Source and Summit of Christian Life"
        description="The Eucharist is the Body and Blood of Christ, truly present under the appearances of bread and wine."
        backgroundImage="/images/hero/church-altar.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
              What is the Eucharist?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Eucharist is the sacrament of sacraments, the source and summit of the Christian life. 
              In this holy sacrifice, Christ gives us his Body and Blood under the appearances of bread and wine.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Through the Eucharist, we are united with Christ and with one another as the Body of Christ. 
              It nourishes our souls, forgives venial sins, and preserves us from mortal sin.
            </p>
            <div className="bg-gold-50 border-l-4 border-gold-500 p-4">
              <p className="text-gold-800 italic">
                "Take this, all of you, and eat of it, for this is my Body, which will be given up for you."
              </p>
              <p className="text-gold-600 text-sm mt-2">- Jesus Christ at the Last Supper</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-navy-900 text-white p-8 rounded-lg">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cookie className="h-8 w-8 text-navy-900" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4 text-center">
                Real Presence
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Through transubstantiation, the bread and wine become the true Body and Blood of Christ, 
                while retaining the appearance of bread and wine.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* The Mass */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              The Holy Mass
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Mass is the celebration of the Eucharist, where the sacrifice of Calvary is made present.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Liturgy of the Word
                </h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>First Reading (Old Testament)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Responsorial Psalm</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Second Reading (New Testament)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Gospel Acclamation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Gospel Reading</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Homily</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">
                  Liturgy of the Eucharist
                </h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Preparation of the Gifts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Eucharistic Prayer</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Consecration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Lord's Prayer</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Sign of Peace</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Communion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Preparation for Communion */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Preparing for Holy Communion
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Proper preparation helps us receive the Eucharist with reverence and devotion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">State of Grace</h3>
              <p className="text-gray-600 leading-relaxed">
                We must be free from mortal sin. If conscious of mortal sin, 
                receive the sacrament of confession first.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Eucharistic Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Abstain from food and drink (except water and medicine) 
                for at least one hour before receiving Communion.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Proper Disposition</h3>
              <p className="text-gray-600 leading-relaxed">
                Approach with faith, reverence, and awareness of the great gift 
                you are about to receive.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Benefits of the Eucharist */}
      <ContentSection background="navy">
        <div className="text-white space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gold-400 mb-4">
              Fruits of the Eucharist
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              The Eucharist brings many spiritual benefits to those who receive it worthily.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Union with Christ",
                description: "Deepens our relationship with Jesus and makes us one with him."
              },
              {
                title: "Forgiveness of Venial Sins",
                description: "Cleanses us from daily faults and strengthens us against temptation."
              },
              {
                title: "Unity with the Church",
                description: "Bonds us together as one body in Christ with all believers."
              },
              {
                title: "Spiritual Nourishment",
                description: "Feeds our souls and gives us strength for the Christian journey."
              },
              {
                title: "Pledge of Eternal Life",
                description: "Gives us a foretaste of the heavenly banquet to come."
              },
              {
                title: "Commitment to the Poor",
                description: "Moves us to care for those in need as Christ cares for us."
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

      {/* Call to Action */}
      <ContentSection background="white">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-serif font-light text-gray-900">
            Join Us for Mass
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the beauty and mystery of the Eucharist at St Saviour's. 
            All are welcome to join us for Mass and encounter Christ in the Eucharist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mass"
              className="inline-flex items-center px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors"
            >
              View Mass Times
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