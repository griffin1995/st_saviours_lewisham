import React from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { MapPin, Car, Train, Bus, Clock, Accessibility, Phone } from "lucide-react";

export default function FindUs() {
  return (
    <PageLayout
      title="Find Us"
      description="Directions and location information for St Saviour's Catholic Church in Lewisham. Find us by car, public transport, or on foot."
      keywords="Directions St Saviours, Church Location, Lewisham High Street, How to find us, Public Transport, Parking"
    >
      <PageHero
        title="Find Us"
        subtitle="Visit Our Church"
        description="Located in the heart of Lewisham, we're easily accessible by public transport and car."
        backgroundImage="/images/hero/church-exterior.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Address & Quick Info */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">Our Location</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-6 w-6 text-gold-400" />
              <span className="text-xl">St Saviour's Catholic Church</span>
            </div>
            <address className="text-lg text-gray-300 not-italic">
              Lewisham High Street<br />
              London SE13 6EE<br />
              United Kingdom
            </address>
            <div className="flex items-center justify-center space-x-3 pt-4">
              <Phone className="h-5 w-5 text-gold-400" />
              <span>020 8852 7411</span>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Map */}
      <ContentSection background="gray" padding="small">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will be embedded here</p>
              <p className="text-sm text-gray-500 mt-2">
                Google Maps integration showing exact location and directions
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Transport Options */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              How to Get Here
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're conveniently located in central Lewisham with excellent transport links.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* By Train */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Train className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">By Train</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">Lewisham Station</p>
                  <p className="text-sm">2 minutes walk</p>
                  <p className="text-sm">National Rail & DLR</p>
                </div>
                <div>
                  <p className="font-semibold">Services:</p>
                  <ul className="text-sm space-y-1">
                    <li>• National Rail from London Bridge</li>
                    <li>• National Rail from Victoria</li>
                    <li>• National Rail from Cannon Street</li>
                    <li>• DLR from Canary Wharf</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Bus */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">By Bus</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">Lewisham Shopping Centre</p>
                  <p className="text-sm">1 minute walk</p>
                </div>
                <div>
                  <p className="font-semibold">Bus Routes:</p>
                  <div className="text-sm grid grid-cols-3 gap-1">
                    <span>21</span><span>136</span><span>185</span>
                    <span>202</span><span>208</span><span>284</span>
                    <span>321</span><span>380</span><span>436</span>
                  </div>
                </div>
                <p className="text-sm">
                  Night buses: N21, N136, N199
                </p>
              </div>
            </div>

            {/* By Car */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">By Car</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-semibold">From Central London:</p>
                  <p className="text-sm">A20 via New Cross</p>
                  <p className="text-sm">Approximately 20-30 minutes</p>
                </div>
                <div>
                  <p className="font-semibold">Parking:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Limited street parking nearby</li>
                    <li>• Lewisham Shopping Centre car park</li>
                    <li>• River Park Retail Park</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Postcode for Sat Nav: SE13 6EE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Accessibility & Facilities */}
      <ContentSection background="gray">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Accessibility */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 flex items-center">
              <Accessibility className="h-6 w-6 text-gold-500 mr-3" />
              Accessibility
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Accessibility Access</h4>
                <p className="text-gray-600 text-sm">
                  Full wheelchair access via the main entrance. Accessible seating 
                  areas available in the nave.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Accessible Facilities</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Accessible toilet facilities</li>
                  <li>• Hearing loop system installed</li>
                  <li>• Large print service books available</li>
                  <li>• Reserved parking spaces</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Assistance</h4>
                <p className="text-gray-600 text-sm">
                  Our ushers are always happy to provide assistance. 
                  Please don't hesitate to ask for help.
                </p>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 flex items-center">
              <Clock className="h-6 w-6 text-gold-500 mr-3" />
              Facilities & Information
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Church Facilities</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Main church seating for 300 people</li>
                  <li>• Side chapel for quiet prayer</li>
                  <li>• Parish hall for events</li>
                  <li>• Kitchen facilities</li>
                  <li>• Children's area</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Nearby Amenities</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Lewisham Shopping Centre (1 min walk)</li>
                  <li>• Restaurants and cafes</li>
                  <li>• Lewisham Library</li>
                  <li>• Lewisham Hospital (5 min drive)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">First Time Visitors</h4>
                <p className="text-gray-600 text-sm">
                  Arrive 10 minutes early for Mass. Our welcomers will be happy 
                  to help you find a seat and provide any information you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Contact for Directions */}
      <ContentSection background="navy">
        <div className="text-center text-white">
          <h2 className="text-3xl font-serif font-light mb-6">Need Help Finding Us?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            If you need specific directions or have any accessibility requirements, 
            please don't hesitate to contact us. We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+442088527411"
              className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us: 020 8852 7411
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors"
            >
              Contact Form
            </a>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}