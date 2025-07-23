import React from "react";
import { PageLayout } from "@/components/layout";
import { PageHero } from "@/components/layout";
import ContentSection from "@/components/ContentSection";
import { Clock, Calendar, MapPin, Phone } from "lucide-react";
import { massTimings, confessionTimes, adorationTimes } from "@/lib/data";

export default function MassTimes() {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = dayNames[today.getDay()];

  return (
    <PageLayout
      title="Mass Times"
      description="Find Mass times, confession schedules, and service information at St Saviour's Catholic Church in Lewisham."
      keywords="Mass Times, Catholic Mass, Confession, Adoration, Service Times, Sunday Mass, Weekday Mass"
      background="white"
    >
      <PageHero
        title="Mass Times & Services"
        subtitle="Worship with us"
        description="Join us for Mass, confession, and adoration. All are welcome to worship with our community."
        backgroundImage="/images/hero/church-altar.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Current Day Highlight */}
      <ContentSection background="white" padding="medium">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-serif text-gold-400 mb-4">
            Today's Services - {currentDay}
          </h2>
          <div className="max-w-2xl mx-auto">
            {massTimings[
              currentDay.toLowerCase() as keyof typeof massTimings
            ] ? (
              <div className="space-y-3">
                {massTimings[
                  currentDay.toLowerCase() as keyof typeof massTimings
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-4 text-white"
                  >
                    <Clock className="h-5 w-5 text-gold-400" />
                    <span className="text-lg font-semibold">
                      {service.time}
                    </span>
                    <span className="text-gray-300">-</span>
                    <span className="text-lg">{service.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-lg">No scheduled Mass today</p>
            )}
          </div>
        </div>
      </ContentSection>

      {/* Full Weekly Schedule */}
      <ContentSection background="white">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Weekly Mass Schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Regular Mass times throughout the week. Please arrive 10 minutes
              early.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {Object.entries(massTimings).map(([day, services]) => (
              <div
                key={day}
                className={`border rounded-lg p-6 ${
                  day.toLowerCase() === currentDay.toLowerCase()
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3
                    className={`text-xl font-semibold mb-3 sm:mb-0 ${
                      day.toLowerCase() === currentDay.toLowerCase()
                        ? "text-gold-700"
                        : "text-gray-900"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                    {day.toLowerCase() === currentDay.toLowerCase() && (
                      <span className="ml-2 text-sm font-normal text-gold-600">
                        (Today)
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2">
                    {services && services.length > 0 ? (
                      services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold text-gray-900">
                            {service.time}
                          </span>
                          <span className="text-gray-600">{service.type}</span>
                          {service.description && (
                            <span className="text-sm text-gray-500">
                              ({service.description})
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">
                        No scheduled Mass
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Other Services */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Confession Times */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 text-gold-500 mr-3" />
              Confession Times
            </h3>
            <div className="space-y-4">
              {confessionTimes.map((confession, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {confession.day}
                    </span>
                    <span className="text-gray-600">{confession.time}</span>
                  </div>
                  {confession.note && (
                    <p className="text-sm text-gray-500 mt-2">
                      {confession.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Confession is also available by
                appointment. Please contact the parish office to arrange.
              </p>
            </div>
          </div>

          {/* Adoration Times */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 flex items-center">
              <Clock className="h-6 w-6 text-gold-500 mr-3" />
              Adoration of the Blessed Sacrament
            </h3>
            <div className="space-y-4">
              {adorationTimes.map((adoration, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {adoration.day}
                    </span>
                    <span className="text-gray-600">{adoration.time}</span>
                  </div>
                  {adoration.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {adoration.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Special Information */}
      <ContentSection background="white">
        <div className="bg-navy-900 rounded-lg p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4">
                Important Information
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                  <span>Please arrive 10 minutes before Mass begins</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                  <span>Mass times may vary during holiday periods</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                  <span>Special Masses announced in the weekly newsletter</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                  <span>Wheelchair accessible entrance available</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-semibold text-gold-400 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-400" />
                  <div>
                    <p className="font-semibold">Parish Office</p>
                    <p className="text-gray-300">020 8852 7411</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gold-400" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">
                      Lewisham High Street, London SE13 6EE
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gold-400" />
                  <div>
                    <p className="font-semibold">Office Hours</p>
                    <p className="text-gray-300">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}
