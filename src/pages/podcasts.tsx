import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Play, Pause, Download, Calendar, Clock, User, Mic, Search, Filter, Rss } from "lucide-react";

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  host: string;
  guest?: string;
  date: string;
  duration: string;
  category: string;
  audioUrl: string;
  downloadUrl: string;
  image: string;
  featured?: boolean;
  season?: number;
  episode?: number;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Walking in Faith: A Journey Through Lent",
    description: "Join Fr Krisz as he explores the spiritual disciplines of Lent and how we can use this holy season to draw closer to God through prayer, fasting, and almsgiving.",
    host: "Fr Krisz",
    date: "2025-02-15",
    duration: "32 minutes",
    category: "Spiritual Formation",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/lent-journey.jpg",
    featured: true,
    season: 2,
    episode: 8
  },
  {
    id: 2,
    title: "The Saints Among Us: Stories of Modern Holiness",
    description: "Deacon Michael shares inspiring stories of contemporary saints and how their examples can guide our daily Christian living in the 21st century.",
    host: "Deacon Michael",
    date: "2025-02-01",
    duration: "28 minutes",
    category: "Saints & Spirituality",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/modern-saints.jpg",
    season: 2,
    episode: 7
  },
  {
    id: 3,
    title: "Youth Voices: Faith in Action",
    description: "Our parish youth share their experiences of living out Catholic values in school, work, and relationships. A powerful testimony of young faith.",
    host: "Sarah Mitchell",
    guest: "Parish Youth Group",
    date: "2025-01-18",
    duration: "25 minutes",
    category: "Youth & Family",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/youth-voices.jpg",
    season: 2,
    episode: 6
  },
  {
    id: 4,
    title: "Understanding the Mass: The Source and Summit",
    description: "Fr Krisz takes us through the beautiful structure and meaning of the Catholic Mass, helping us participate more fully in this central act of worship.",
    host: "Fr Krisz",
    date: "2025-01-04",
    duration: "35 minutes",
    category: "Liturgy & Worship",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/mass-explained.jpg",
    featured: true,
    season: 2,
    episode: 5
  },
  {
    id: 5,
    title: "Parish History: 150 Years of Faith",
    description: "Join local historian Margaret O'Brien as she takes us through the rich 150-year history of St Saviour's parish and its impact on the Lewisham community.",
    host: "Fr Krisz",
    guest: "Margaret O'Brien",
    date: "2024-12-20",
    duration: "42 minutes",
    category: "Parish Life",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/parish-history.jpg",
    season: 2,
    episode: 4
  },
  {
    id: 6,
    title: "Prayer Life: Finding God in Daily Routine",
    description: "Sr Catherine from the local convent shares practical advice on developing a meaningful prayer life that fits into our busy modern schedules.",
    host: "Deacon Michael",
    guest: "Sr Catherine",
    date: "2024-12-06",
    duration: "30 minutes",
    category: "Prayer & Devotion",
    audioUrl: "#",
    downloadUrl: "#",
    image: "/images/podcast/daily-prayer.jpg",
    season: 2,
    episode: 3
  }
];

const categories = ["All", "Spiritual Formation", "Liturgy & Worship", "Saints & Spirituality", "Youth & Family", "Parish Life", "Prayer & Devotion"];

export default function Podcasts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const filteredEpisodes = podcastEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredEpisodes = podcastEpisodes.filter(episode => episode.featured);

  const togglePlay = (episodeId: number) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episodeId);
    }
  };

  return (
    <PageLayout
      title="Podcasts"
      description="Listen to inspiring talks, homilies, and discussions from St Saviour's Catholic Church covering faith, spirituality, and Catholic teaching."
      keywords="Catholic Podcast, Faith Podcast, Spiritual Formation, Catholic Teaching, Parish Podcast, Religious Audio"
    >
      <PageHero
        title="St Saviour's Podcasts"
        subtitle="Faith On-the-Go"
        description="Listen to inspiring conversations about faith, spirituality, and Catholic living wherever you are."
        backgroundImage="/images/hero/podcast-studio.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Podcast Info */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6">
            <Mic className="h-10 w-10 text-gold-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            Faith Conversations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our weekly podcast features discussions on Catholic teaching, spiritual formation, and practical faith living. 
            Each episode offers insights to help you grow closer to God and live out your Catholic faith with joy and purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#subscribe"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors duration-200"
            >
              <Rss className="h-5 w-5 mr-2" />
              Subscribe
            </Link>
            <Link
              href="/weekly-newsletter"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-gold-600 bg-gold-50 rounded-lg hover:bg-gold-100 transition-colors duration-200"
            >
              Get Newsletter
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* Featured Episodes */}
      {featuredEpisodes.length > 0 && (
        <ContentSection background="gray" padding="large">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
              Featured Episodes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and impactful podcast episodes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEpisodes.map((episode) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-600">
                      Featured
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(episode.id)}
                      className="group w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                    >
                      {currentlyPlaying === episode.id ? (
                        <Pause className="h-10 w-10 text-white" />
                      ) : (
                        <Play className="h-10 w-10 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(episode.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {episode.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gold-600 transition-colors">
                    {episode.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center text-sm text-gray-700">
                      <User className="h-4 w-4 mr-1" />
                      {episode.host}
                      {episode.guest && ` & ${episode.guest}`}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {episode.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePlay(episode.id)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors"
                    >
                      {currentlyPlaying === episode.id ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </>
                      )}
                    </button>
                    <Link
                      href={episode.downloadUrl}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
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
              placeholder="Search episodes..."
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

      {/* All Episodes */}
      <ContentSection background="gray" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            All Episodes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete collection of faith conversations and spiritual content
          </p>
        </div>

        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No episodes found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-48 h-48 md:h-auto">
                    <Image
                      src={episode.image}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => togglePlay(episode.id)}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                      >
                        {currentlyPlaying === episode.id ? (
                          <Pause className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          {episode.season && episode.episode && (
                            <span className="font-medium">S{episode.season}E{episode.episode}</span>
                          )}
                          <span className="inline-flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(episode.date).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="inline-flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {episode.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gold-600 transition-colors">
                          {episode.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {episode.description}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center text-sm text-gray-700">
                            <User className="h-3 w-3 mr-1" />
                            {episode.host}
                            {episode.guest && ` & ${episode.guest}`}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {episode.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
                        <button
                          onClick={() => togglePlay(episode.id)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors"
                        >
                          {currentlyPlaying === episode.id ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Play
                            </>
                          )}
                        </button>
                        <Link
                          href={episode.downloadUrl}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </ContentSection>

      {/* Subscribe Section */}
      <ContentSection background="navy" padding="large">
        <div className="text-center">
          <Rss className="h-12 w-12 text-gold-400 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
            Never Miss an Episode
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Subscribe to our podcast on your favorite platform and join our community of faith-filled listeners.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              Apple Podcasts
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              Spotify
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              Google Podcasts
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              RSS Feed
            </Link>
          </div>
          <p className="text-gray-300">
            Questions or topic suggestions? <Link href="/contact-us" className="text-gold-400 hover:text-gold-300">Contact us</Link>
          </p>
        </div>
      </ContentSection>
    </PageLayout>
  );
}