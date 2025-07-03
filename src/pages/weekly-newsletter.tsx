import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout";
import { PageHero } from "@/components/layout";
import ContentSection from "@/components/ContentSection";
import { 
  Mail, 
  Download, 
  Calendar, 
  Bell, 
  FileText,
  ArrowRight,
  CheckCircle,
  Clock
} from "lucide-react";

export default function WeeklyNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recentNewsletters = [
    {
      title: "Parish Newsletter - 26th January 2025",
      date: "2025-01-26",
      description: "Fourth Sunday in Ordinary Time - Parish updates, upcoming events, and spiritual reflections.",
      downloadUrl: "/newsletters/newsletter-26-jan-2025.pdf",
      featured: true
    },
    {
      title: "Parish Newsletter - 19th January 2025", 
      date: "2025-01-19",
      description: "Third Sunday in Ordinary Time - Week of Prayer for Christian Unity special feature.",
      downloadUrl: "/newsletters/newsletter-19-jan-2025.pdf",
      featured: false
    },
    {
      title: "Parish Newsletter - 12th January 2025",
      date: "2025-01-12", 
      description: "Baptism of the Lord - New Year parish initiatives and ministry opportunities.",
      downloadUrl: "/newsletters/newsletter-12-jan-2025.pdf",
      featured: false
    },
    {
      title: "Parish Newsletter - 5th January 2025",
      date: "2025-01-05",
      description: "Epiphany of the Lord - Christmas season reflections and upcoming Lenten preparations.",
      downloadUrl: "/newsletters/newsletter-05-jan-2025.pdf", 
      featured: false
    },
    {
      title: "Parish Newsletter - 29th December 2024",
      date: "2024-12-29",
      description: "Holy Family Sunday - Year-end gratitude and New Year resolutions.",
      downloadUrl: "/newsletters/newsletter-29-dec-2024.pdf",
      featured: false
    },
    {
      title: "Parish Newsletter - 22nd December 2024",
      date: "2024-12-22",
      description: "Fourth Sunday of Advent - Final Christmas preparations and Christmas Mass schedule.",
      downloadUrl: "/newsletters/newsletter-22-dec-2024.pdf",
      featured: false
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <PageLayout
      title="Weekly Newsletter"
      description="Stay connected with St Saviour's through our weekly parish newsletter. Get updates on events, spiritual reflections, and community news."
      keywords="Parish Newsletter, Weekly Newsletter, Church Newsletter, Parish Updates, Community News, Catholic Newsletter"
      background="white"
    >
      <PageHero
        title="Weekly Newsletter"
        subtitle="Stay Connected"
        description="Keep up with parish life through our weekly newsletter featuring updates, reflections, and community news."
        backgroundImage="/images/hero/newsletter-reading.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Newsletter Subscription */}
      <ContentSection background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-600">
              Receive our weekly newsletter every Friday with parish updates, 
              upcoming events, and spiritual reflections.
            </p>
          </div>

          {!isSubscribed ? (
            <div className="bg-gray-50 rounded-2xl p-8">
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      "Subscribing..."
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Subscribe to Newsletter
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Subscription Confirmed!
              </h3>
              <p className="text-green-800">
                Thank you for subscribing. You'll receive our weekly newsletter every Friday.
              </p>
            </div>
          )}
        </div>
      </ContentSection>

      {/* What's Included */}
      <ContentSection background="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              What's in Our Newsletter
            </h2>
            <p className="text-lg text-gray-600">
              Each week, our newsletter provides everything you need to stay connected with parish life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
              <p className="text-sm text-gray-600">
                All parish events, special celebrations, and important dates for the coming week.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Spiritual Reflections</h3>
              <p className="text-sm text-gray-600">
                Weekly reflections on the Sunday Gospel and seasonal spiritual guidance.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Parish Updates</h3>
              <p className="text-sm text-gray-600">
                Important announcements, parish news, and updates on ongoing projects.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mass Intentions</h3>
              <p className="text-sm text-gray-600">
                Weekly Mass times, intentions, and any changes to the regular schedule.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Recent Newsletters */}
      <ContentSection background="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Recent Newsletters
            </h2>
            <p className="text-lg text-gray-600">
              Download and read our recent weekly newsletters.
            </p>
          </div>

          <div className="space-y-6">
            {recentNewsletters.map((newsletter, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 shadow-sm border ${
                  newsletter.featured 
                    ? 'bg-gold-50 border-gold-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold ${
                        newsletter.featured ? 'text-gold-900' : 'text-gray-900'
                      }`}>
                        {newsletter.title}
                      </h3>
                      {newsletter.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gold-600 text-white">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${
                      newsletter.featured ? 'text-gold-800' : 'text-gray-600'
                    }`}>
                      {newsletter.description}
                    </p>
                    <p className={`text-xs ${
                      newsletter.featured ? 'text-gold-700' : 'text-gray-500'
                    }`}>
                      Published: {new Date(newsletter.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href={newsletter.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                        newsletter.featured
                          ? 'bg-gold-600 text-white hover:bg-gold-700'
                          : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Looking for older newsletters? Contact the parish office.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center text-gold-600 hover:text-gold-700 font-semibold transition-colors"
            >
              Contact Parish Office
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* Newsletter Archive Info */}
      <ContentSection background="white">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">
            Newsletter Archive
          </h2>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            We maintain an archive of all parish newsletters going back several years. 
            If you're looking for a specific edition or want to catch up on parish history, 
            we're happy to help.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gold-400">50+</div>
              <h3 className="text-lg font-semibold">Newsletters Published</h3>
              <p className="text-sm text-gray-300">Every year since 2020</p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gold-400">500+</div>
              <h3 className="text-lg font-semibold">Subscriber Families</h3>
              <p className="text-sm text-gray-300">Growing every week</p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gold-400">Friday</div>
              <h3 className="text-lg font-semibold">Published Weekly</h3>
              <p className="text-sm text-gray-300">Delivered to your inbox</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
            >
              Request Archive Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
            >
              View Parish News
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* Contact for Contributions */}
      <ContentSection background="white">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
            Contribute to Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Have news to share? Organizing an event? Want to contribute a reflection or article? 
            We welcome submissions from parishioners for our weekly newsletter.
          </p>
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Guidelines</h3>
            <ul className="text-left text-gray-600 space-y-2 mb-6">
              <li>• Submit articles by Wednesday for Friday publication</li>
              <li>• Keep submissions to 200 words or less</li>
              <li>• Include your name and contact information</li>
              <li>• All content subject to editorial review</li>
              <li>• Photos welcome (high resolution preferred)</li>
            </ul>
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-700 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Submit Content
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}