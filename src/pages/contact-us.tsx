import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission here
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message. We'll get back to you soon!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <PageLayout
      title="Contact Us"
      description="Get in touch with St Saviour's Catholic Church in Lewisham. Find our contact information, office hours, and send us a message."
      keywords="Contact St Saviours, Parish Office, Church Contact, Lewisham Catholic Church, Get in Touch"
    >
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch"
        description="We'd love to hear from you. Reach out with any questions or to learn more about our community."
        backgroundImage="/images/hero/church-entrance.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Quick Contact Info */}
      <ContentSection background="gray">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Call Us</h3>
            <p className="text-gray-600">020 8852 7411</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Email Us</h3>
            <p className="text-gray-600">parish@saintsaviours.org.uk</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Visit Us</h3>
            <p className="text-gray-600">Lewisham High Street<br />London SE13 6EE</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Office Hours</h3>
            <p className="text-gray-600">Mon-Fri<br />9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </ContentSection>

      {/* Contact Form & Info */}
      <ContentSection background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="baptism">Baptism</option>
                    <option value="marriage">Marriage</option>
                    <option value="funeral">Funeral</option>
                    <option value="confession">Confession</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="parish-groups">Parish Groups</option>
                    <option value="venue-hire">Venue Hire</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gold-700 focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      St Saviour's Catholic Church<br />
                      Lewisham High Street<br />
                      London SE13 6EE<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">020 8852 7411</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">parish@saintsaviours.org.uk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed (except for emergencies)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Contact</h3>
              <p className="text-red-700 text-sm mb-3">
                For urgent pastoral care outside office hours (serious illness, death, emergency baptism):
              </p>
              <p className="font-semibold text-red-800">020 8852 7411</p>
              <p className="text-red-600 text-sm">
                Please leave a clear message and we will respond as soon as possible.
              </p>
            </div>

            {/* Staff Contact */}
            <div className="bg-navy-900 rounded-lg p-6 text-white">
              <h3 className="font-semibold text-gold-400 mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Fr. Krzysztof Krzyskow</p>
                  <p className="text-gray-300 text-sm">Parish Priest</p>
                  <a href="/email-fr-krzysztof-krzyskow" className="text-gold-400 hover:text-gold-300 text-sm">
                    Send Direct Email
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Revd. Carlos Lozano</p>
                  <p className="text-gray-300 text-sm">Associate Priest</p>
                  <a href="/email-revd-carlos-lozano" className="text-gold-400 hover:text-gold-300 text-sm">
                    Send Direct Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}