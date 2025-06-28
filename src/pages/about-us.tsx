import React from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Church, Heart, Users, BookOpen } from "lucide-react";

export default function AboutUs() {
  return (
    <PageLayout
      title="About Us"
      description="Learn about St Saviour's Catholic Church in Lewisham - our history, mission, and vibrant community serving South East London."
      keywords="About St Saviours, Catholic Church Lewisham, Parish History, Community, Mission, Values"
    >
      <PageHero
        title="About St Saviour's"
        subtitle="Our Community"
        description="A vibrant Catholic community in the heart of Lewisham, welcoming all to experience God's love and grace."
        backgroundImage="/images/hero/church-interior.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Mission Statement */}
      <ContentSection background="white">
        <div className="text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              St Saviour's Catholic Church exists to be a beacon of hope and faith in Lewisham, 
              where all people can encounter the transforming love of Jesus Christ and grow 
              together as a community of believers.
            </p>
            <div className="w-24 h-px bg-gold-500 mx-auto"></div>
          </div>
        </div>
      </ContentSection>

      {/* Our Values */}
      <ContentSection background="gray">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do as a parish community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Love & Compassion",
                description: "We strive to show Christ's love through our actions and care for one another."
              },
              {
                icon: Users,
                title: "Community",
                description: "We welcome all people and build meaningful relationships across generations."
              },
              {
                icon: Church,
                title: "Worship",
                description: "We gather to celebrate the Eucharist and grow in our relationship with God."
              },
              {
                icon: BookOpen,
                title: "Learning",
                description: "We are committed to ongoing formation and deepening our understanding of faith."
              }
            ].map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="h-8 w-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* History */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900">
              Our History
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                St Saviour's Catholic Church has been serving the Lewisham community since 1889, 
                when it was first established to meet the spiritual needs of the growing Catholic 
                population in South East London.
              </p>
              <p className="leading-relaxed">
                Over the decades, our parish has grown and evolved, but our commitment to providing 
                a welcoming spiritual home for all has remained constant. We have weathered challenges, 
                celebrated joys, and continued to be a source of hope and faith for generations of families.
              </p>
              <p className="leading-relaxed">
                Today, we are proud to be part of the Roman Catholic Archdiocese of Southwark, 
                continuing our mission to serve God and our local community with dedication and love.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-navy-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-gold-400">Key Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span><strong>1889:</strong> Parish established</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span><strong>1902:</strong> Current church building consecrated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span><strong>1965:</strong> Parish school opened</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span><strong>2010:</strong> Major restoration completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span><strong>2025:</strong> Serving over 500 families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Leadership */}
      <ContentSection background="slate">
        <div className="text-center space-y-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
              Our Leadership
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Meet the dedicated team who guide our parish community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Church className="h-12 w-12 text-navy-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fr. Krzysztof Krzyskow</h3>
              <p className="text-gold-400 mb-4">Parish Priest</p>
              <p className="text-gray-300 leading-relaxed">
                Leading our parish with wisdom and compassion, Fr. Krzysztof brings years of 
                pastoral experience to guide our community in faith and service.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-navy-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Revd. Carlos Lozano</h3>
              <p className="text-gold-400 mb-4">Associate Priest</p>
              <p className="text-gray-300 leading-relaxed">
                Supporting our parish ministries and outreach programs, Revd. Carlos brings 
                energy and dedication to serving our diverse community.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}

// Check for maintenance mode before rendering the page
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance';