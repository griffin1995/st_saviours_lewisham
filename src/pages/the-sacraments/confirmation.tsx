import React from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Cross, Calendar, Phone, BookOpen, Users, Heart, Gift } from "lucide-react";

export default function Confirmation() {
  return (
    <PageLayout
      title="Confirmation"
      description="Learn about the sacrament of Confirmation at St Saviour's Catholic Church. Information on preparation, classes, and celebrating this important milestone in faith."
      keywords="Catholic Confirmation, Confirmation Classes, RCIA, Youth Confirmation, Adult Confirmation, Gifts of Holy Spirit"
    >
      <PageHero
        title="Confirmation"
        subtitle="Strengthened by the Spirit"
        description="Confirmation completes Christian initiation and strengthens us with the gifts of the Holy Spirit."
        backgroundImage="/images/sacraments/confirmation-ceremony.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-light text-gray-900">
              Sealed with the Holy Spirit
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Confirmation is a sacrament of initiation that completes what was begun 
              in Baptism. It strengthens us with the gifts of the Holy Spirit and 
              deepens our relationship with Christ and the Church.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Through Confirmation, we receive the fullness of the Holy Spirit and 
              are called to be witnesses to Christ in the world. This sacrament 
              gives us the grace and strength we need to live as mature Christians.
            </p>
            <div className="flex items-center space-x-3 text-red-600">
              <Cross className="h-5 w-5" />
              <span className="italic">"But you will receive power when the Holy Spirit comes upon you." - Acts 1:8</span>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-4">Seven Gifts of the Holy Spirit</h3>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Wisdom</strong> - Understanding God's plan</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Understanding</strong> - Comprehending the truths of faith</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Counsel</strong> - Making good decisions</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Fortitude</strong> - Courage to do what is right</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Knowledge</strong> - Knowing God's will</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Piety</strong> - Love and reverence for God</span>
              </li>
              <li className="flex items-start space-x-2">
                <Gift className="h-4 w-4 text-red-600 mt-1" />
                <span><strong>Fear of the Lord</strong> - Awe and respect for God</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Age Groups */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Confirmation at St Saviour's
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer Confirmation preparation for both young people and adults, 
              with programs tailored to each age group's needs and circumstances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Youth Confirmation */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Youth Confirmation</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our youth Confirmation program typically begins in Year 9 (age 13-14) 
                  and runs for two years, allowing young people to mature in their 
                  faith and understanding.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Program Features:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Two-year preparation program</li>
                    <li>• Weekly sessions during term time</li>
                    <li>• Youth-focused activities and discussions</li>
                    <li>• Community service projects</li>
                    <li>• Retreat weekend</li>
                    <li>• Sponsor program</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Must be baptized Catholic</li>
                    <li>• Regular Mass attendance</li>
                    <li>• Completion of preparation program</li>
                    <li>• Choose a Confirmation sponsor</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Adult Confirmation */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900">Adult Confirmation</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Adults who were baptized Catholic but never confirmed can complete 
                  their initiation through our adult Confirmation program, often 
                  combined with RCIA.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Program Features:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Flexible scheduling for working adults</li>
                    <li>• Adult-focused discussions and learning</li>
                    <li>• Integration with RCIA if needed</li>
                    <li>• Individual spiritual direction</li>
                    <li>• Day of recollection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Typical Timeline:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 6-12 month preparation period</li>
                    <li>• Celebrated at Easter Vigil or Pentecost</li>
                    <li>• Can be combined with spouse preparation</li>
                  </ul>
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
              Preparation Journey
            </h2>
            <p className="text-lg text-gray-600">
              Our comprehensive preparation helps candidates understand their faith 
              and prepares them to receive the gifts of the Holy Spirit.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900">Application</h3>
                <p className="text-sm text-gray-600">
                  Submit application form and meet with parish team to 
                  discuss readiness and commitment.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900">Formation</h3>
                <p className="text-sm text-gray-600">
                  Attend weekly sessions covering Catholic teaching, 
                  sacraments, and Christian living.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Service</h3>
                <p className="text-sm text-gray-600">
                  Complete service hours in the parish or community 
                  to live out Christian discipleship.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-gray-900">Celebration</h3>
                <p className="text-sm text-gray-600">
                  Receive the sacrament in a beautiful ceremony 
                  surrounded by family and parish community.
                </p>
              </div>
            </div>

            <div className="bg-navy-900 rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold text-gold-400 mb-4">
                Program Curriculum
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Faith Formation Topics</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• The Trinity and God's love</li>
                    <li>• Jesus Christ: fully God, fully human</li>
                    <li>• The Church and its mission</li>
                    <li>• The sacraments and grace</li>
                    <li>• Catholic moral teaching</li>
                    <li>• Prayer and spiritual life</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Practical Christian Living</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Living as a witness to Christ</li>
                    <li>• Service to others</li>
                    <li>• Building community</li>
                    <li>• Discerning God's will</li>
                    <li>• Dealing with challenges to faith</li>
                    <li>• Continuing spiritual growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Sponsors & Celebration */}
      <ContentSection background="gray">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Choosing a Sponsor
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Role of the Sponsor</h4>
                <p className="text-sm text-gray-600 mb-3">
                  A Confirmation sponsor is a spiritual companion who supports 
                  the candidate's faith journey and continuing growth in the Christian life.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Provides ongoing spiritual support</li>
                  <li>• Shares their own faith journey</li>
                  <li>• Prays for the candidate</li>
                  <li>• Stands with them at Confirmation</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Sponsor Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Practicing Catholic aged 16 or older</li>
                  <li>• Confirmed and in good standing</li>
                  <li>• Lives a life consistent with Catholic teaching</li>
                  <li>• Not the parent of the candidate</li>
                  <li>• Willing to take an active role</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Baptismal Sponsor</h4>
                <p className="text-sm text-gray-600">
                  The Catholic Church encourages candidates to choose their 
                  baptismal godparent as their Confirmation sponsor to emphasize 
                  the unity of Christian initiation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              Confirmation Celebrations
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-gold-600" />
                  <h4 className="font-semibold text-gray-900">When We Celebrate</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Youth Confirmation: Annually in June</li>
                  <li>• Adult Confirmation: Easter Vigil or Pentecost</li>
                  <li>• Celebrated by the Bishop when possible</li>
                  <li>• Special liturgy with family and parish</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Confirmation Names</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Candidates may choose a saint's name as their Confirmation name, 
                  selecting a holy person to serve as their patron and model.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Research your chosen saint's life</li>
                  <li>• Learn from their example of faith</li>
                  <li>• Ask for their intercession</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Ready to Begin?</h4>
                <p className="text-red-800 text-sm mb-3">
                  Registration for our Confirmation programs opens each September. 
                  Contact the parish office for more information.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Getting Started */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">
            Come, Holy Spirit
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            Whether you're a young person ready to take the next step in your faith 
            journey or an adult seeking to complete your initiation, we're here to 
            guide and support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Parish Office
            </Link>
            <Link
              href="/the-sacraments"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
            >
              Other Sacraments
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}