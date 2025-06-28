import React, { useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Wifi,
  Volume2,
  Monitor,
  Smartphone,
  Heart,
  Bell,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default function Streaming() {
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderSet, setReminderSet] = useState(false);

  const upcomingStreams = [
    {
      title: "Sunday Mass",
      time: "11:30 AM",
      date: "Every Sunday",
      description: "Join us for our principal Sunday Mass with full participation from our community.",
      isLive: false,
      nextStream: "2025-01-26T11:30:00",
      featured: true
    },
    {
      title: "Weekday Mass",
      time: "12:15 PM", 
      date: "Monday - Friday",
      description: "Daily Mass for those who cannot attend in person.",
      isLive: false,
      nextStream: "2025-01-27T12:15:00",
      featured: false
    },
    {
      title: "Evening Prayer",
      time: "6:00 PM",
      date: "Wednesdays",
      description: "Midweek prayer and reflection to center our hearts on God.",
      isLive: false,
      nextStream: "2025-01-29T18:00:00",
      featured: false
    },
    {
      title: "Special Celebrations",
      time: "Various",
      date: "Holy Days & Seasons",
      description: "Christmas, Easter, Ash Wednesday, and other important liturgical celebrations.",
      isLive: false,
      nextStream: null,
      featured: false
    }
  ];

  const handleReminderSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setReminderSet(true);
    setReminderEmail("");
  };

  return (
    <PageLayout
      title="Live Streaming"
      description="Join St Saviour's Catholic Church online through our live streaming services. Attend Mass and prayer services from anywhere in the world."
      keywords="Live Stream Mass, Online Mass, Virtual Church, Live Streaming, Catholic Mass Online, Remote Worship"
    >
      <PageHero
        title="Live Streaming"
        subtitle="Worship with Us Online"
        description="Can't join us in person? Participate in our liturgies through live streaming from anywhere in the world."
        backgroundImage="/images/hero/church-streaming.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Live Stream Status */}
      <ContentSection background="white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse mr-3"></div>
              <h2 className="text-2xl font-semibold">Currently Offline</h2>
            </div>
            <p className="text-red-100 mb-6">
              We'll be live for our next scheduled service. Check the schedule below for upcoming streams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                <Bell className="mr-2 h-5 w-5" />
                Set Reminder
              </button>
              <Link
                href="#schedule"
                className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                View Schedule
              </Link>
            </div>
          </div>

          {/* Video Player Placeholder */}
          <div className="bg-black rounded-2xl aspect-video flex items-center justify-center mb-8">
            <div className="text-center text-white">
              <Play className="h-20 w-20 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Stream Will Appear Here</h3>
              <p className="text-gray-300">
                Our live stream will be available 15 minutes before each scheduled service.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* How to Watch */}
      <ContentSection background="gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              How to Watch
            </h2>
            <p className="text-lg text-gray-600">
              Our streaming service is accessible on multiple platforms and devices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website</h3>
              <p className="text-sm text-gray-600 mb-4">
                Watch directly on our website using any web browser on your computer or laptop.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Watch Here
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube</h3>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to our YouTube channel for live streams and access to previous recordings.
              </p>
              <a
                href="https://youtube.com/@stsaviourslewisham"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-semibold text-sm inline-flex items-center"
              >
                YouTube Channel
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Facebook</h3>
              <p className="text-sm text-gray-600 mb-4">
                Join our Facebook page for live streams and connect with our online community.
              </p>
              <a
                href="https://facebook.com/stsaviourslewisham"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 font-semibold text-sm inline-flex items-center"
              >
                Facebook Page
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile</h3>
              <p className="text-sm text-gray-600 mb-4">
                Watch on your smartphone or tablet using our mobile-optimized streaming.
              </p>
              <span className="text-green-600 font-semibold text-sm">
                Any Device
              </span>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Streaming Schedule */}
      <ContentSection background="white" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Streaming Schedule
            </h2>
            <p className="text-lg text-gray-600">
              Regular live streaming times for Mass and prayer services.
            </p>
          </div>

          <div className="grid gap-6">
            {upcomingStreams.map((stream, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 border ${
                  stream.featured 
                    ? 'bg-gold-50 border-gold-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-semibold ${
                        stream.featured ? 'text-gold-900' : 'text-gray-900'
                      }`}>
                        {stream.title}
                      </h3>
                      {stream.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gold-600 text-white">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {stream.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {stream.date}
                      </div>
                    </div>
                    <p className={`text-sm ${
                      stream.featured ? 'text-gold-800' : 'text-gray-600'
                    }`}>
                      {stream.description}
                    </p>
                    {stream.nextStream && (
                      <p className="text-xs text-gray-500 mt-2">
                        Next stream: {new Date(stream.nextStream).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                      stream.featured
                        ? 'bg-gold-600 text-white hover:bg-gold-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}>
                      <Bell className="mr-2 h-4 w-4" />
                      Remind Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Technical Requirements */}
      <ContentSection background="navy">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light mb-4">
              Technical Requirements
            </h2>
            <p className="text-gray-300 text-lg">
              Our streaming is designed to work on most devices and internet connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-2">Internet Connection</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Minimum: 1 Mbps for standard quality</li>
                    <li>• Recommended: 3 Mbps for HD quality</li>
                    <li>• Automatic quality adjustment available</li>
                    <li>• Works with Wi-Fi or mobile data</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-2">Audio & Video</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• High-quality audio with multiple microphones</li>
                    <li>• HD video with professional cameras</li>
                    <li>• Closed captions available on request</li>
                    <li>• Multiple camera angles during Mass</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-4">Supported Browsers</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• Chrome (recommended)</div>
                  <div>• Firefox</div>
                  <div>• Safari</div>
                  <div>• Edge</div>
                  <div>• Mobile browsers</div>
                  <div>• Smart TV browsers</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-4">Having Issues?</h3>
                <p className="text-sm text-gray-300 mb-3">
                  If you experience technical difficulties with our stream:
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Refresh your browser</li>
                  <li>• Try a different browser</li>
                  <li>• Check your internet connection</li>
                  <li>• Contact us for support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Online Community */}
      <ContentSection background="gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Join Our Online Community
            </h2>
            <p className="text-lg text-gray-600">
              Watching online doesn't mean worshipping alone. Connect with other viewers 
              and participate in our digital parish community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Participate in live chat during streams to share prayers, 
                requests, and fellowship with other viewers.
              </p>
              <span className="text-red-600 font-semibold text-sm">Available During Streams</span>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prayer Requests</h3>
              <p className="text-sm text-gray-600 mb-4">
                Submit prayer requests through our online form and we'll 
                include them in our prayers during Mass.
              </p>
              <Link
                href="/contact-us"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                Submit Request
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Bell className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h3>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to receive notifications before each stream 
                so you never miss a service.
              </p>
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="white">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
            Can't Attend in Person?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're traveling, unwell, or unable to visit our church, 
            you're always welcome to join our worship online. We're here to 
            serve our extended parish community wherever you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-700 transition-colors">
              <Play className="mr-2 h-5 w-5" />
              Join Next Stream
            </button>
            <Link
              href="/mass"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Mass Times
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}