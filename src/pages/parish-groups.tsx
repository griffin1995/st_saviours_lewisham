import React from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { 
  Users, 
  BookOpen, 
  Music, 
  Heart, 
  Coffee, 
  Baby,
  Cross,
  Globe,
  Calendar,
  Clock,
  ArrowRight,
  MapPin
} from "lucide-react";

export default function ParishGroups() {
  const groups = [
    {
      name: "St Vincent de Paul Society",
      icon: Heart,
      description: "Caring for those in need in our local community through practical support and friendship.",
      meetingTime: "2nd Wednesday, 7:30 PM",
      contact: "Contact parish office",
      activities: ["Food bank support", "Home visits", "Emergency assistance", "Befriending service"],
      openTo: "All parishioners",
      color: "red"
    },
    {
      name: "Parish Choir",
      icon: Music,
      description: "Leading worship through music at Sunday Mass and special celebrations.",
      meetingTime: "Thursdays, 7:00 PM",
      contact: "choir@saintsaviours.org.uk",
      activities: ["Sunday Mass music", "Christmas concerts", "Easter celebrations", "Weddings and funerals"],
      openTo: "All ages and abilities",
      color: "blue"
    },
    {
      name: "Scripture Study Group",
      icon: BookOpen,
      description: "Exploring God's word together through weekly Bible study and prayer.",
      meetingTime: "Tuesdays, 7:30 PM",
      contact: "scripture@saintsaviours.org.uk",
      activities: ["Weekly Bible study", "Lectio Divina", "Advent/Lent programs", "Book discussions"],
      openTo: "Adults",
      color: "green"
    },
    {
      name: "Youth Group",
      icon: Users,
      description: "Fun, friendship, and faith for young people aged 11-18.",
      meetingTime: "Sundays, 6:00 PM",
      contact: "youth@saintsaviours.org.uk",
      activities: ["Weekly meetings", "Social events", "Service projects", "Retreats"],
      openTo: "Ages 11-18",
      color: "purple"
    },
    {
      name: "Mother & Toddler Group",
      icon: Baby,
      description: "A welcoming space for parents and carers with young children to meet and socialize.",
      meetingTime: "Fridays, 10:00 AM",
      contact: "mothers@saintsaviours.org.uk",
      activities: ["Play sessions", "Coffee mornings", "Parenting support", "Children's activities"],
      openTo: "Parents with children 0-4",
      color: "pink"
    },
    {
      name: "Coffee After Mass",
      icon: Coffee,
      description: "Social time and community building after Sunday morning Mass.",
      meetingTime: "Sundays after 11:30 AM Mass",
      contact: "No registration needed",
      activities: ["Coffee and refreshments", "Community notices", "Newcomer welcomes", "Social chat"],
      openTo: "Everyone welcome",
      color: "amber"
    },
    {
      name: "Altar Servers",
      icon: Cross,
      description: "Young people assisting at Mass and developing leadership skills.",
      meetingTime: "Training monthly",
      contact: "servers@saintsaviours.org.uk",
      activities: ["Serving at Mass", "Special ceremonies", "Training sessions", "Social events"],
      openTo: "Ages 8-18",
      color: "indigo"
    },
    {
      name: "Justice & Peace Group",
      icon: Globe,
      description: "Working for social justice and care of creation in our world.",
      meetingTime: "1st Saturday, 10:00 AM",
      contact: "justice@saintsaviours.org.uk",
      activities: ["Advocacy campaigns", "Environmental projects", "Fair trade promotion", "Prayer for peace"],
      openTo: "All interested parishioners",
      color: "teal"
    }
  ];

  const colorClasses = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
    amber: "bg-amber-600",
    indigo: "bg-indigo-600",
    teal: "bg-teal-600"
  };

  return (
    <PageLayout
      title="Parish Groups"
      description="Join one of our many parish groups at St Saviour's Catholic Church. Find community, grow in faith, and serve others through our various ministries."
      keywords="Parish Groups, Catholic Community, Church Ministries, Volunteer, Bible Study, Choir, Youth Group, St Vincent de Paul"
    >
      <PageHero
        title="Parish Groups & Ministries"
        subtitle="Get Involved"
        description="Join our vibrant community through one of our many parish groups and ministries."
        backgroundImage="/images/hero/community-gathering.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Introduction */}
      <ContentSection background="white">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
            Find Your Place in Our Community
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At St Saviour's, we believe that faith grows best in community. Our parish 
            groups offer opportunities to deepen your relationship with God, build 
            meaningful friendships, and serve others in need.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Grow in Faith</h3>
              <p className="text-gray-600">
                Deepen your understanding of Scripture, prayer, and Catholic teaching 
                through study and discussion.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Build Community</h3>
              <p className="text-gray-600">
                Form lasting friendships with fellow parishioners who share your 
                values and commitment to faith.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Serve Others</h3>
              <p className="text-gray-600">
                Put your faith into action by serving those in need in our parish 
                and the wider community.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Parish Groups Grid */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Our Parish Groups
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for spiritual growth, community service, or 
              social connection, there's a place for you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {groups.map((group, index) => (
              <div
                key={group.name}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-14 h-14 ${colorClasses[group.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                      <group.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">{group.openTo}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {group.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{group.contact}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Activities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {group.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-500">Open to: {group.openTo}</span>
                    <button className="text-gold-600 hover:text-gold-700 font-semibold text-sm transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Getting Involved */}
      <ContentSection background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Ready to Get Involved?
            </h2>
            <p className="text-lg text-gray-600">
              Joining a parish group is easy and everyone is welcome, regardless 
              of how long you've been part of our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900">Choose Your Interest</h3>
              <p className="text-sm text-gray-600">
                Browse our groups and find one that matches your interests, 
                schedule, and stage of life.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">Make Contact</h3>
              <p className="text-sm text-gray-600">
                Reach out using the contact information provided or speak 
                to someone after Mass.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">Come Along</h3>
              <p className="text-sm text-gray-600">
                Attend a meeting or event - most groups welcome visitors 
                and new members at any time.
              </p>
            </div>
          </div>

          <div className="bg-navy-900 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4">
              Don't See What You're Looking For?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always open to starting new groups based on the interests and 
              needs of our parishioners. Have an idea for a new ministry or group? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:+442088527411"
                className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
              >
                Call: 020 8852 7411
              </a>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Meeting Schedule */}
      <ContentSection background="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-8 text-center">
            Weekly Schedule
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 grid grid-cols-3 gap-4">
                <span>Day</span>
                <span>Group</span>
                <span>Time</span>
              </div>
              {[
                { day: "Tuesday", group: "Scripture Study Group", time: "7:30 PM" },
                { day: "Wednesday", group: "St Vincent de Paul Society", time: "7:30 PM (2nd Wed)" },
                { day: "Thursday", group: "Parish Choir", time: "7:00 PM" },
                { day: "Friday", group: "Mother & Toddler Group", time: "10:00 AM" },
                { day: "Saturday", group: "Justice & Peace Group", time: "10:00 AM (1st Sat)" },
                { day: "Sunday", group: "Coffee After Mass", time: "After 11:30 AM Mass" },
                { day: "Sunday", group: "Youth Group", time: "6:00 PM" }
              ].map((item, index) => (
                <div key={index} className="px-6 py-4 grid grid-cols-3 gap-4 text-sm">
                  <span className="font-medium text-gray-900">{item.day}</span>
                  <span className="text-gray-600">{item.group}</span>
                  <span className="text-gray-600">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}