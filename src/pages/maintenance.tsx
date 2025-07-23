import React from "react";
import Head from "next/head";
import { motion, m } from "framer-motion";
import { Settings, Clock, Phone, Mail, Facebook, Youtube } from "lucide-react";

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Website Under Maintenance - St Saviour's Catholic Church</title>
        <meta
          name="description"
          content="Our website is currently under maintenance. We'll be back shortly."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo/Header */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings
                className="h-10 w-10 text-white animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
              St Saviour's Catholic Church
            </h1>
            <p className="text-gold-400 text-lg">Lewisham</p>
          </m.div>

          {/* Maintenance Message */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-gold-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white">
                Website Under Maintenance
              </h2>
            </div>

            <p className="text-gray-300 text-lg mb-6">
              We're currently updating our website to serve you better. Please
              check back shortly.
            </p>

            <div className="flex items-center justify-center text-gold-400">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </m.div>

          {/* Contact Information */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Need to Contact Us?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>020 8852 7411</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>parish@saintsaviours.org.uk</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-400 mb-3">
                Follow us on social media for updates:
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.facebook.com/stsaviourslewisham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gold-400 hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@stsaviourslewisham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gold-400 hover:bg-white/20 transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </m.div>

          {/* Emergency Information */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm mb-2">
              For pastoral emergencies, please call:
            </p>
            <p className="text-gold-400 font-medium">020 8852 7411</p>
            <p className="text-gray-500 text-xs mt-4">
              Thank you for your patience
            </p>
          </m.div>
        </div>
      </div>
    </>
  );
}
