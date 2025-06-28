import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { Calendar, ArrowRight, Search, Filter } from "lucide-react";
import { newsArticles } from "@/lib/data";

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Parish Life", "Community", "Liturgical Season", "Events", "Announcement"];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout
      title="News"
      description="Stay updated with the latest news, events, and announcements from St Saviour's Catholic Church in Lewisham."
      keywords="Parish News, Church News, Community Updates, Events, Announcements, Catholic Church Lewisham"
    >
      <PageHero
        title="Parish News"
        subtitle="Stay Connected"
        description="Keep up with the latest happenings in our parish community and beyond."
        backgroundImage="/images/hero/community-gathering.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Search and Filter */}
      <ContentSection background="gray" padding="medium">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Showing {filteredArticles.length} of {newsArticles.length} articles
          </p>
        </div>
      </ContentSection>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <ContentSection background="white">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8 text-center">
              Featured Article
            </h2>
          </div>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold-600 text-white">
                    {filteredArticles[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(filteredArticles[0].date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-sm">• {filteredArticles[0].readTime} min read</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900 mb-4">
                  {filteredArticles[0].title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {filteredArticles[0].excerpt}
                </p>
                <Link
                  href={`/news/${filteredArticles[0].id}`}
                  className="inline-flex items-center text-gold-600 hover:text-gold-700 font-semibold transition-colors group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        </ContentSection>
      )}

      {/* Articles Grid */}
      <ContentSection background="gray">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/news/${article.id}`}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900">
                            {new Date(article.date).getDate()}
                          </div>
                          <div className="text-xs font-semibold text-gray-600 uppercase">
                            {new Date(article.date).toLocaleDateString('en-GB', { month: 'short' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-gold-600 hover:text-gold-700 font-semibold transition-colors group-hover:translate-x-1 transform duration-300 inline-flex items-center">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filter selection.</p>
          </div>
        )}
      </ContentSection>

      {/* Newsletter Signup */}
      <ContentSection background="navy">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-light text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our weekly newsletter to receive the latest parish news, 
            events, and spiritual reflections directly to your inbox.
          </p>
          <Link
            href="/weekly-newsletter"
            className="inline-flex items-center px-6 py-3 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-500 transition-colors"
          >
            Subscribe to Newsletter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </ContentSection>
    </PageLayout>
  );
}

// Check for maintenance mode before rendering the page
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance';