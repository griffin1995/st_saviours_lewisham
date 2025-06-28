import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { HandMetal, Book, Heart, Users, ArrowRight, Crown, Cross } from "lucide-react";

export default function HolyOrders() {
  return (
    <PageLayout
      title="Holy Orders"
      description="Learn about the sacrament of Holy Orders - the ordination of bishops, priests, and deacons at St Saviour's Catholic Church."
      keywords="Holy Orders, Ordination, Priest, Bishop, Deacon, Catholic Sacrament, Vocation, Ministry"
    >
      <PageHero
        title="Holy Orders"
        subtitle="Sacrament of Service"
        description="Through Holy Orders, men are consecrated to serve God and his people as bishops, priests, and deacons."
        backgroundImage="/images/hero/church-sanctuary.jpg"
        height="large"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
              What is Holy Orders?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles 
              continues to be exercised in the Church. It includes three degrees: episcopate (bishops), 
              presbyterate (priests), and diaconate (deacons).
            </p>
            <p className="text-gray-600 leading-relaxed">
              This sacrament confers a sacred power for the service of the faithful. Those who receive 
              Holy Orders are consecrated in Christ's name to feed the Church with the Word and grace of God.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <p className="text-indigo-800 italic">
                "It was not you who chose me, but I who chose you and appointed you 
                to go and bear fruit that will remain."
              </p>
              <p className="text-indigo-600 text-sm mt-2">- John 15:16</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-navy-900 text-white p-8 rounded-lg">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandMetal className="h-8 w-8 text-navy-900" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4 text-center">
                Called to Serve
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Holy Orders consecrates men to serve the Church as shepherds, 
                teachers, and sanctifiers in the name of Christ.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* The Three Orders */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              The Three Degrees of Holy Orders
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each degree of Holy Orders has its own unique role and responsibilities in the Church.
            </p>
          </div>

          <div className="space-y-8">
            {/* Bishops */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900">Bishops</h3>
                  <p className="text-purple-600 font-semibold">Episcopate</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Bishops possess the fullness of the sacrament of Holy Orders. They are the successors 
                    of the apostles and have the authority to ordain priests and deacons, confirm the faithful, 
                    and govern dioceses.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Teaching and preaching</li>
                        <li>• Sanctifying through sacraments</li>
                        <li>• Governing the diocese</li>
                        <li>• Ordaining clergy</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Symbol:</h4>
                      <p className="text-sm text-gray-600">Ring, mitre, and pastoral staff representing their office</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Priests */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cross className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900">Priests</h3>
                  <p className="text-blue-600 font-semibold">Presbyterate</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Priests are co-workers with bishops in the apostolic ministry. They celebrate Mass, 
                    hear confessions, perform baptisms and marriages, anoint the sick, and shepherd 
                    the faithful in parishes.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Celebrating Mass and sacraments</li>
                        <li>• Preaching and teaching</li>
                        <li>• Pastoral care of parishioners</li>
                        <li>• Leading parish communities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Symbol:</h4>
                      <p className="text-sm text-gray-600">Stole and chasuble, representing the yoke of Christ</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deacons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandMetal className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900">Deacons</h3>
                  <p className="text-green-600 font-semibold">Diaconate</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Deacons are ordained for service and assist bishops and priests. They can baptize, 
                    preach, distribute Communion, witness marriages, and have a special ministry 
                    to the poor and marginalized.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Baptizing and preaching</li>
                        <li>• Distributing Communion</li>
                        <li>• Witnessing marriages</li>
                        <li>• Works of charity and justice</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Symbol:</h4>
                      <p className="text-sm text-gray-600">Dalmatic and stole worn over the left shoulder</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ContentSection>

      {/* Vocation and Calling */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              The Call to Priesthood
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A priestly vocation is a call from God to serve his people in a special way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Divine Calling",
                description: "God calls certain men to serve as priests through prayer, reflection, and spiritual discernment.",
                icon: Heart,
                color: "red"
              },
              {
                title: "Seminary Formation",
                description: "Seminary training includes academic study, spiritual formation, human development, and pastoral experience.",
                icon: Book,
                color: "blue"
              },
              {
                title: "Celibacy",
                description: "In the Roman Catholic Church, priests take a vow of celibacy to devote themselves fully to God and his people.",
                icon: Cross,
                color: "purple"
              },
              {
                title: "Pastoral Heart",
                description: "Priests must have a genuine love for God's people and a desire to serve their spiritual needs.",
                icon: Users,
                color: "green"
              },
              {
                title: "Life of Prayer",
                description: "Priests commit to a life of prayer, including daily celebration of Mass and the Liturgy of the Hours.",
                icon: Book,
                color: "amber"
              },
              {
                title: "Ongoing Formation",
                description: "Priestly formation continues throughout life through study, retreat, and spiritual direction.",
                icon: HandMetal,
                color: "indigo"
              }
            ].map((aspect, index) => (
              <motion.div
                key={aspect.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className={`w-16 h-16 bg-${aspect.color}-600 rounded-full flex items-center justify-center mx-auto`}>
                  <aspect.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{aspect.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{aspect.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* The Ordination Rite */}
      <ContentSection background="navy">
        <div className="text-white space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gold-400 mb-4">
              The Rite of Ordination
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Ordination is a solemn liturgical celebration that confers the sacrament of Holy Orders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-gold-400">Key Elements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Presentation of Candidates</h4>
                    <p className="text-gray-300 text-sm">The bishop calls the candidates forward and they express their willingness to serve.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Homily</h4>
                    <p className="text-gray-300 text-sm">The bishop explains the dignity and duties of the priestly office.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Examination</h4>
                    <p className="text-gray-300 text-sm">Candidates publicly promise obedience and commit to their duties.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Laying on of Hands</h4>
                    <p className="text-gray-300 text-sm">The essential element - the bishop and all priests present lay hands on the candidates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-gold-400">Sacred Symbols</h3>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-gold-300 mb-2">Investiture with Vestments</h4>
                  <p className="text-gray-300 text-sm">The newly ordained are clothed with the stole and chasuble, symbols of their priestly office.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-gold-300 mb-2">Anointing of Hands</h4>
                  <p className="text-gray-300 text-sm">The bishop anoints the palms of the new priests with sacred chrism.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-gold-300 mb-2">Presentation of Gifts</h4>
                  <p className="text-gray-300 text-sm">The chalice and paten are given as symbols of the power to offer sacrifice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Vocations */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Considering a Vocation?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you feel called to serve God and his people as a priest or deacon, we encourage you to explore this vocation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Signs of a Vocation</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <span>Deep prayer life and love for the Eucharist</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <span>Desire to serve God and his people</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <span>Others recognizing priestly qualities in you</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <span>Peace and joy when considering priesthood</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <span>Ability to relate well to people of all ages</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Next Steps</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                    <span>Speak with one of our priests</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                    <span>Contact the diocesan vocations director</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                    <span>Attend vocation events and retreats</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                    <span>Increase prayer and spiritual reading</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                    <span>Consider visiting a seminary</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="white">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-serif font-light text-gray-900">
            Pray for Vocations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please pray for vocations to the priesthood and diaconate. The Church needs holy men 
            to serve God's people and continue Christ's mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
            >
              Explore Your Vocation
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