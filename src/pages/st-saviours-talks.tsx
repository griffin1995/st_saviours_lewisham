import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, m } from "framer-motion";
import { PageLayout } from "@/components/layout";
import { PageHero } from "@/components/layout";
import ContentSection from "@/components/ContentSection";
import { Play, Calendar, Clock, User, Download, Search, Filter } from "lucide-react";

interface Talk {
  id: number;
  title: string;
  speaker: string;
  description: string;
  date: string;
  duration: string;
  category: string;
  image: string;
  videoUrl?: string;
  audioUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
}

const talks: Talk[] = [
  {
    id: 1,
    title: "The Call to Holiness in Everyday Life",
    speaker: "Fr Krisz",
    description: "Discover how to live a holy life in the midst of daily challenges and responsibilities. This talk explores practical ways to grow closer to God through ordinary moments.",
    date: "2025-01-15",
    duration: "45 minutes",
    category: "Spiritual Formation",
    image: "/images/church/interior-prayer.jpg",
    videoUrl: "#",
    audioUrl: "#",
    downloadUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Understanding the Mass: Heaven on Earth",
    speaker: "Fr Krisz",
    description: "Deepen your appreciation of the Holy Mass by understanding its rich symbolism, structure, and spiritual significance in our Catholic faith.",
    date: "2024-12-10",
    duration: "50 minutes",
    category: "Liturgy",
    image: "/images/church/altar-mass.jpg",
    videoUrl: "#",
    audioUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Mary, Our Mother and Model",
    speaker: "Fr Krisz",
    description: "Explore the role of Our Lady in salvation history and how her example of faith, hope, and love guides us on our spiritual journey.",
    date: "2024-11-20",
    duration: "40 minutes",
    category: "Marian Devotion",
    image: "/images/church/mary-statue.jpg",
    videoUrl: "#",
    audioUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "Living the Beatitudes Today",
    speaker: "Deacon Michael",
    description: "A practical guide to implementing Christ's teachings from the Sermon on the Mount in our modern world.",
    date: "2024-10-15",
    duration: "35 minutes",
    category: "Scripture",
    image: "/images/church/gospel-book.jpg",
    audioUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 5,
    title: "The Saints: Our Companions on the Journey",
    speaker: "Sr Catherine",
    description: "Learn about the communion of saints and how these holy men and women can inspire and intercede for us in our daily lives.",
    date: "2024-09-25",
    duration: "42 minutes",
    category: "Saints",
    image: "/images/church/saints-window.jpg",
    audioUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 6,
    title: "Prayer: The Heart of Christian Life",
    speaker: "Fr Krisz",
    description: "Discover different forms of prayer and how to develop a deeper, more meaningful relationship with God through regular prayer practice.",
    date: "2024-08-30",
    duration: "48 minutes",
    category: "Prayer",
    image: "/images/church/prayer-candles.jpg",
    videoUrl: "#",
    audioUrl: "#",
    downloadUrl: "#"
  }
];

const categories = ["All", "Spiritual Formation", "Liturgy", "Scripture", "Prayer", "Saints", "Marian Devotion"];

export default function StSavioursTalks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTalks = talks.filter(talk => {
    const matchesSearch = talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talk.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talk.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || talk.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTalks = talks.filter(talk => talk.featured);

  return (
    <PageLayout
      title="St Saviour's Talks"
      description="Watch and listen to inspiring talks from St Saviour's Catholic Church covering faith, spirituality, scripture, and Catholic teaching."
      keywords="Catholic Talks, Spiritual Formation, Parish Talks, Catholic Teaching, Faith Formation, Scripture Study"
      background="white"
    >
      <PageHero
        title="St Saviour's Talks"
        subtitle="Grow in Faith"
        description="Inspiring talks on Catholic faith, spirituality, and Christian living from our parish community."
        backgroundImage="/images/hero/church-interior.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Featured Talks */}
      {featuredTalks.length > 0 && (
        <ContentSection background="white" padding="large">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Featured Talks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and impactful presentations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTalks.map((talk) => (
              <m.div
                key={talk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={talk.image}
                    alt={talk.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-600">
                      Featured
                    </span>
                  </div>
                  {talk.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link href={talk.videoUrl} className="group">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(talk.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {talk.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {talk.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {talk.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm text-gray-700">
                      <User className="h-4 w-4 mr-1" />
                      {talk.speaker}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {talk.category}
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </ContentSection>
      )}

      {/* Search and Filter */}
      <ContentSection background="white" padding="medium">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search talks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ContentSection>

      {/* All Talks */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            All Talks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete collection of spiritual and educational content
          </p>
        </div>

        {filteredTalks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No talks found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTalks.map((talk, index) => (
              <m.div
                key={talk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={talk.image}
                    alt={talk.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-900/70 text-white">
                      {talk.category}
                    </span>
                  </div>
                  {talk.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <Link href={talk.videoUrl} className="group">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200">
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(talk.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {talk.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gold-600 transition-colors">
                    {talk.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {talk.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center text-sm text-gray-700">
                      <User className="h-3 w-3 mr-1" />
                      {talk.speaker}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {talk.videoUrl && (
                      <Link
                        href={talk.videoUrl}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Link>
                    )}
                    {talk.audioUrl && (
                      <Link
                        href={talk.audioUrl}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors"
                      >
                        Listen
                      </Link>
                    )}
                    {talk.downloadUrl && (
                      <Link
                        href={talk.downloadUrl}
                        className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        )}
      </ContentSection>

      {/* Call to Action */}
      <ContentSection background="white" padding="large">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to be notified when new talks are available and stay connected with our parish educational offerings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/weekly-newsletter"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-navy-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe to Newsletter
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-200"
            >
              Suggest a Topic
            </Link>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}