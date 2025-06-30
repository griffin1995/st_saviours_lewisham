import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// New modern component system
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Grid,
  Flex,
  Container
} from '@/components/ui'
import { NewsCard, NewsList } from '@/components/church'
import { prefersReducedMotion } from '@/lib/utils'
import { newsArticles } from '@/lib/data'

export default function News() {
  const reducedMotion = prefersReducedMotion()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Parish Life', 'Community', 'Liturgical Season', 'Events', 'Announcement']

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageLayout
      title="News"
      description="Stay updated with the latest news, events, and announcements from St Saviour's Catholic Church in Lewisham."
      keywords="Parish News, Church News, Community Updates, Events, Announcements, Catholic Church Lewisham"
    >
      {/* Hero Section */}
      <PageHero
        title="Parish News"
        subtitle="Stay Connected"
        description="Keep up with the latest happenings in our parish community and beyond."
        backgroundImage="/images/hero/community-gathering.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Search className="h-5 w-5" />}
            >
              Search Articles
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              leftIcon={<ArrowRight className="h-5 w-5" />}
            >
              Subscribe Newsletter
            </Button>
          </Flex>
        }
      />

      {/* Search and Filter */}
      <Section spacing="md" background="gray">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Heading level="h2" align="center" className="mb-6">
              Find What Interests You
            </Heading>
            <Text size="xl" align="center" color="muted">
              Search through our parish news and filter by category
            </Text>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="bg-white">
              <CardContent>
                <Flex direction="col" gap="md" className="lg:flex-row lg:items-center lg:justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search news articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  
                  <Flex align="center" gap="md">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </Flex>
                </Flex>

                <div className="mt-4 text-center">
                  <Text color="muted">
                    Showing {filteredArticles.length} of {newsArticles.length} articles
                  </Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <Section spacing="lg" background="white">
          <Container size="lg">
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heading level="h2" align="center" className="mb-6">
                Featured Article
              </Heading>
              <Text size="xl" align="center" color="muted">
                Our latest parish news and updates
              </Text>
            </motion.div>

            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NewsCard
                {...filteredArticles[0]}
                variant="horizontal"
                featured={true}
                slug={String(filteredArticles[0].id)}
                className="max-w-none"
              />
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Articles Grid */}
      <Section spacing="lg" background="gray">
        <Container size="lg">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heading level="h2" align="center" className="mb-6">
              Recent Articles
            </Heading>
            <Text size="xl" align="center" color="muted">
              Stay informed with our parish community updates
            </Text>
          </motion.div>

          {filteredArticles.length > 1 ? (
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
              viewport={{ once: true }}
            >
              <NewsList 
                articles={filteredArticles.slice(1).map(article => ({
                  ...article,
                  slug: String(article.id)
                }))}
                variant="default"
              />
            </motion.div>
          ) : filteredArticles.length === 0 && (
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.3 } : { duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="default" padding="lg" className="text-center bg-white">
                <CardContent>
                  <div className="py-12">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <Heading level="h3" align="center" className="mb-4">
                      No articles found
                    </Heading>
                    <Text align="center" color="muted" className="mb-6">
                      Try adjusting your search terms or filter selection.
                    </Text>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('All')
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* Newsletter Signup */}
      <Section spacing="lg" background="white">
        <Container size="md">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card variant="default" padding="lg" className="bg-slate-900 text-white">
              <CardContent>
                <div className="text-center space-y-8">
                  <div>
                    <Heading level="h2" align="center" className="text-white mb-6">
                      Stay Updated
                    </Heading>
                    <Text size="xl" align="center" className="text-gray-300 max-w-2xl mx-auto">
                      Subscribe to our weekly newsletter to receive the latest parish news, 
                      events, and spiritual reflections directly to your inbox.
                    </Text>
                  </div>
                  
                  <Flex justify="center" gap="md" className="pt-4">
                    <Link href="/weekly-newsletter">
                      <Button 
                        variant="primary" 
                        size="lg"
                        rightIcon={<ArrowRight className="h-5 w-5" />}
                      >
                        Subscribe to Newsletter
                      </Button>
                    </Link>
                    <Link href="/contact-us">
                      <Button 
                        variant="secondary" 
                        size="lg"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </Flex>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'