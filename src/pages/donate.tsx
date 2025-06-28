import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { 
  Heart, 
  CreditCard, 
  Building, 
  Users, 
  Clock, 
  Shield,
  Banknote,
  QrCode,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [donationType, setDonationType] = useState("one-time");

  const donationCauses = [
    {
      title: "General Parish Fund",
      description: "Support our daily operations, utilities, and general parish needs.",
      icon: Building,
      color: "blue"
    },
    {
      title: "Building Maintenance",
      description: "Help preserve our beautiful church building for future generations.",
      icon: Building,
      color: "green"
    },
    {
      title: "Community Outreach",
      description: "Support our work with those in need in the local community.",
      icon: Users,
      color: "purple"
    },
    {
      title: "Youth Programs",
      description: "Fund activities and resources for our children and young people.",
      icon: Heart,
      color: "pink"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600"
  };

  return (
    <PageLayout
      title="Donate"
      description="Support St Saviour's Catholic Church through online donations. Help us continue our mission of faith, community, and service."
      keywords="Church Donations, Online Giving, Support Parish, Catholic Church Funding, Tithe, Offering"
    >
      <PageHero
        title="Support Our Mission"
        subtitle="Your Generosity Makes a Difference"
        description="Help us continue our work of faith, community, and service through your generous donations."
        backgroundImage="/images/hero/church-community.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Why Give */}
      <ContentSection background="white">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
            Why Your Support Matters
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your generous donations help us maintain our beautiful church, support 
            our community programs, and reach out to those in need. Every gift, 
            large or small, makes a meaningful difference.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Maintain Our Church</h3>
              <p className="text-gray-600">
                Keep our sacred space beautiful and welcoming for worship, 
                prayer, and community gatherings.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Support Programs</h3>
              <p className="text-gray-600">
                Fund youth activities, adult education, community outreach, 
                and pastoral care programs.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Serve Others</h3>
              <p className="text-gray-600">
                Enable our outreach to those in need through food banks, 
                visiting programs, and emergency assistance.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Online Donation Form */}
      <ContentSection background="gray">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Make a Donation Online
            </h2>
            <p className="text-lg text-gray-600">
              Quick, secure, and convenient online giving
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Donation Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDonationType("one-time")}
                      className={`px-4 py-3 rounded-lg border font-semibold transition-colors ${
                        donationType === "one-time"
                          ? "bg-gold-600 text-white border-gold-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setDonationType("monthly")}
                      className={`px-4 py-3 rounded-lg border font-semibold transition-colors ${
                        donationType === "monthly"
                          ? "bg-gold-600 text-white border-gold-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[10, 20, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`px-4 py-3 rounded-lg border font-semibold transition-colors ${
                          selectedAmount === amount
                            ? "bg-gold-600 text-white border-gold-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`px-4 py-3 rounded-lg border font-semibold transition-colors ${
                          selectedAmount === amount
                            ? "bg-gold-600 text-white border-gold-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                    <input
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Other amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Designation (Optional)
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
                    <option value="">General Parish Fund</option>
                    <option value="building">Building Maintenance</option>
                    <option value="outreach">Community Outreach</option>
                    <option value="youth">Youth Programs</option>
                    <option value="music">Music Ministry</option>
                  </select>
                </div>

                <button className="w-full bg-gold-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gold-700 transition-colors flex items-center justify-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Donate £{selectedAmount} {donationType === "monthly" ? "Monthly" : ""}
                </button>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing powered by Stripe</span>
                </div>
              </div>

              {/* What Your Donation Supports */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-semibold text-gray-900">
                  What Your Donation Supports
                </h3>
                <div className="space-y-4">
                  {donationCauses.map((cause, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 ${colorClasses[cause.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                        <cause.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{cause.title}</h4>
                        <p className="text-sm text-gray-600">{cause.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Gift Aid</h4>
                  <p className="text-blue-800 text-sm">
                    UK taxpayers can increase their donation by 25% at no extra cost 
                    through Gift Aid. We'll provide the necessary forms after your donation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Other Ways to Give */}
      <ContentSection background="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Other Ways to Give
            </h2>
            <p className="text-lg text-gray-600">
              Choose the giving method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Banknote className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Collection Basket</h3>
              <p className="text-sm text-gray-600">
                Place your donation in the collection basket during Mass on Sundays.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bank Transfer</h3>
              <p className="text-sm text-gray-600">
                Set up a standing order directly to our parish account. Contact the office for details.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
              <p className="text-sm text-gray-600">
                Scan the QR code in the church to make a quick donation using your mobile device.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Legacy Giving</h3>
              <p className="text-sm text-gray-600">
                Remember the parish in your will. Contact us to discuss legacy giving options.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Transparency & Impact */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">
            Your Impact
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            We are committed to being transparent about how your donations are used. 
            Here's how your generosity made a difference last year:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gold-400">£45,000</div>
              <h3 className="text-lg font-semibold">Building Maintenance</h3>
              <p className="text-sm text-gray-300">Roof repairs, heating system upgrades, and general upkeep</p>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gold-400">£12,000</div>
              <h3 className="text-lg font-semibold">Community Programs</h3>
              <p className="text-sm text-gray-300">Youth activities, adult education, and outreach initiatives</p>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gold-400">£8,500</div>
              <h3 className="text-lg font-semibold">Charitable Giving</h3>
              <p className="text-sm text-gray-300">Food bank support, emergency assistance, and local charities</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gold-400 mb-4">Annual Financial Report</h3>
            <p className="text-gray-300 mb-4">
              For full transparency, our annual financial report is available to all parishioners. 
              See exactly how donations are used and our financial health.
            </p>
            <button className="inline-flex items-center text-gold-400 hover:text-gold-300 font-semibold transition-colors">
              Download Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </ContentSection>

      {/* Contact for Questions */}
      <ContentSection background="gray">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
            Questions About Giving?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're happy to discuss donation options, Gift Aid, legacy giving, 
            or answer any questions about supporting our parish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-700 transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="tel:+442088527411"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Call: 020 8852 7411
            </a>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}