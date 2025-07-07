import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { motion } from 'framer-motion'
import { 
  ClockIcon as Clock, 
  CalendarDaysIcon as Calendar,
  ArrowRightIcon as ArrowRight,
  ArrowLeftIcon as ArrowLeft,
  BookOpenIcon as BookOpen,
  AcademicCapIcon as AcademicCap,
  HeartIcon as Heart,
  SparklesIcon as Sparkles
} from '@heroicons/react/24/solid'
import Link from 'next/link'

// Components
import { PageLayout, PageHero } from '@/components/layout'
import { 
  Button, 
  Card, 
  CardContent,
  Heading, 
  Text, 
  Section,
  Grid,
  Container
} from '@/components/ui'
import { prefersReducedMotion } from '@/lib/utils'

// CMS
import { 
  KnowledgeHubCategory,
  KnowledgeHubArticle,
  getCategoryBySlug,
  getArticlesByCategory,
  knowledgeHubCategories
} from '@/lib/cms-knowledge-hub'

interface CategoryPageProps {
  category: KnowledgeHubCategory
  articles: KnowledgeHubArticle[]
}

const iconMap = {
  BookOpen: BookOpen,
  AcademicCap: AcademicCap,
  Heart: Heart,
  Sparkles: Sparkles
}

export default function CategoryPage({ category, articles }: CategoryPageProps) {
  const reducedMotion = prefersReducedMotion()
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BookOpen

  if (!category) {
    return (
      <PageLayout 
        title="Category Not Found"
        description="The requested category could not be found."
        background="slate"
      >
        <Section background="slate" className="py-32">
          <Container>
            <div className="text-center">
              <Heading level="h1" color="white" className="mb-4">
                Category Not Found
              </Heading>
              <Text size="lg" color="gray-100" className="mb-8">
                The category you're looking for doesn't exist.
              </Text>
              <Link href="/knowledge-hub">
                <Button variant="primary" className="bg-white text-slate-900 hover:bg-gray-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Knowledge Hub
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </PageLayout>
    )
  }

  return (
    <PageLayout 
      title={`${category.title} | Knowledge Hub | St Saviour's Catholic Church`}
      description={`${category.description} Explore theological articles and insights in the ${category.title} category.`}
      keywords={`${category.title}, Catholic theology, ${category.title.toLowerCase()}, spiritual formation, faith education`}
      background="slate"
    >
      {/* Category Hero */}
      <Section background="slate" className="py-24">
        <Container>
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`w-24 h-24 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg`}>
              <IconComponent className="h-12 w-12 text-white" />
            </div>
            
            <Heading level="h1" color="white" className="mb-6">
              {category.title}
            </Heading>
            
            <Text size="xl" color="gray-100" className="mb-8 leading-relaxed">
              {category.description}
            </Text>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <Heading level="h2" color="white">
              All Articles
            </Heading>
            
            <Link href="/knowledge-hub">
              <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-slate-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Categories
              </Button>
            </Link>
          </div>

          {articles.length === 0 ? (
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <Heading level="h3" color="white" className="mb-4">
                No Articles Yet
              </Heading>
              <Text size="lg" color="gray-100" className="mb-8">
                Articles in this category are currently being prepared. Check back soon for new content!
              </Text>
            </motion.div>
          ) : (
            <Grid cols={articles.length === 1 ? 1 : 2} className="gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/knowledge-hub/${article.slug}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                      <CardContent className="p-0">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={article.image.src}
                            alt={article.image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          
                          {article.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-gold-500 text-black rounded-full text-sm font-bold">
                                Featured
                              </span>
                            </div>
                          )}

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {article.publishedDate}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {article.readTime}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <Heading level="h3" color="white" className="mb-3 group-hover:text-gold-300 transition-colors">
                            {article.title}
                          </Heading>
                          
                          {article.subtitle && (
                            <Text size="sm" color="gold" className="mb-3 font-medium">
                              {article.subtitle}
                            </Text>
                          )}
                          
                          <Text size="base" color="gray-100" className="mb-4 leading-relaxed">
                            {article.excerpt}
                          </Text>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-slate-800 text-gray-300 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="px-2 py-1 bg-slate-800 text-gray-300 rounded text-xs">
                                +{article.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <Text size="sm" color="gray-300">
                              By {article.author}
                            </Text>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </Grid>
          )}
        </Container>
      </Section>

      {/* Other Categories */}
      <Section background="slate" className="py-16 border-t border-slate-700">
        <Container>
          <Heading level="h2" color="white" className="text-center mb-12">
            Explore Other Categories
          </Heading>
          
          <Grid cols={3} className="gap-6">
            {knowledgeHubCategories
              .filter(cat => cat.slug !== category.slug)
              .map((otherCategory, index) => {
                const OtherIconComponent = iconMap[otherCategory.icon as keyof typeof iconMap] || BookOpen
                return (
                  <motion.div
                    key={otherCategory.id}
                    initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/knowledge-hub/category/${otherCategory.slug}`}>
                      <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white hover:scale-105 transition-all duration-300 group cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 bg-gradient-to-r ${otherCategory.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <OtherIconComponent className="h-8 w-8 text-white" />
                          </div>
                          <Heading level="h4" color="white" className="mb-2 group-hover:text-gold-300 transition-colors">
                            {otherCategory.title}
                          </Heading>
                          <Text size="sm" color="gray-100" className="mb-4">
                            {otherCategory.description}
                          </Text>
                          <Text size="sm" color="gray-300">
                            {otherCategory.articleCount} {otherCategory.articleCount === 1 ? 'article' : 'articles'}
                          </Text>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
          </Grid>
        </Container>
      </Section>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = knowledgeHubCategories.map((category) => ({
    params: { slug: category.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    return {
      notFound: true
    }
  }

  const articles = getArticlesByCategory(slug)

  return {
    props: {
      category,
      articles
    },
    revalidate: 3600
  }
}