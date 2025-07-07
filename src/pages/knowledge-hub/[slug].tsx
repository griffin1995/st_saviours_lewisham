import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { motion } from 'framer-motion'
import { 
  ClockIcon as Clock, 
  CalendarDaysIcon as Calendar,
  UserIcon as User,
  TagIcon as Tag,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ShareIcon as Share,
  BookOpenIcon as BookOpen
} from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'
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
  KnowledgeHubArticle,
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles
} from '@/lib/cms-knowledge-hub'

interface ArticlePageProps {
  article: KnowledgeHubArticle
  relatedArticles: KnowledgeHubArticle[]
}

export default function ArticlePage({ article, relatedArticles }: ArticlePageProps) {
  const reducedMotion = prefersReducedMotion()

  if (!article) {
    return (
      <PageLayout 
        title="Article Not Found"
        description="The requested article could not be found."
        background="slate"
      >
        <Section background="slate" className="py-32">
          <Container>
            <div className="text-center">
              <Heading level="h1" color="white" className="mb-4">
                Article Not Found
              </Heading>
              <Text size="lg" color="gray-100" className="mb-8">
                The article you're looking for doesn't exist or has been moved.
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
      title={article.seo.metaTitle}
      description={article.seo.metaDescription}
      keywords={article.seo.keywords.join(', ')}
      background="slate"
    >
      {/* Article Hero */}
      <PageHero
        title={article.title}
        subtitle={article.subtitle || article.excerpt}
        backgroundImage={article.image.src}
        overlay="dark"
      />

      {/* Article Content */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      {article.publishedDate}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <User className="h-4 w-4 mr-2" />
                      {article.author}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {article.category.title}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Article Body */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                <CardContent className="p-8">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <Heading level="h1" color="white" className="mb-6 mt-8 first:mt-0">
                            {children}
                          </Heading>
                        ),
                        h2: ({ children }) => (
                          <Heading level="h2" color="white" className="mb-4 mt-8">
                            {children}
                          </Heading>
                        ),
                        h3: ({ children }) => (
                          <Heading level="h3" color="white" className="mb-3 mt-6">
                            {children}
                          </Heading>
                        ),
                        p: ({ children }) => (
                          <Text size="lg" color="gray-100" className="mb-4 leading-relaxed">
                            {children}
                          </Text>
                        ),
                        blockquote: ({ children }) => (
                          <div className="border-l-4 border-gold-500 pl-6 my-6 bg-gold-500/10 py-4">
                            <Text size="lg" color="gray-100" className="italic">
                              {children}
                            </Text>
                          </div>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 text-gray-100 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 text-gray-100 space-y-2">
                            {children}
                          </ol>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-gold-300">{children}</em>
                        )
                      }}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quotes Section */}
            {article.quotes && article.quotes.length > 0 && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <Heading level="h3" color="white" className="mb-6">
                  Key Insights
                </Heading>
                <div className="space-y-4">
                  {article.quotes.map((quote, index) => (
                    <Card key={index} className="bg-gold-500/10 border-gold-500/30">
                      <CardContent className="p-6">
                        <Text size="lg" color="white" className="italic mb-3">
                          "{quote.text}"
                        </Text>
                        <Text size="sm" color="gold" className="font-medium">
                          — {quote.source}
                          {quote.citation && (
                            <span className="text-gray-300 ml-2">({quote.citation})</span>
                          )}
                        </Text>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bibliography */}
            {article.bibliography && article.bibliography.length > 0 && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <Heading level="h3" color="white" className="mb-6">
                  Further Reading
                </Heading>
                <Card className="bg-white/10 backdrop-blur-sm border-slate-600">
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {article.bibliography.map((item, index) => (
                        <li key={index}>
                          <Text size="base" color="gray-100">
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-between mb-16"
            >
              <Link href="/knowledge-hub">
                <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-slate-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Knowledge Hub
                </Button>
              </Link>
              
              <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-slate-900">
                <Share className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section background="slate" className="py-16 border-t border-slate-700">
          <Container>
            <Heading level="h2" color="white" className="text-center mb-12">
              Related Articles
            </Heading>
            
            <Grid cols={relatedArticles.length === 1 ? 1 : 2} className="gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/knowledge-hub/${relatedArticle.slug}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white hover:scale-105 transition-all duration-300 group cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          <img
                            src={relatedArticle.image.src}
                            alt={relatedArticle.image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium">
                            {relatedArticle.category.title}
                          </span>
                          <div className="flex items-center text-gray-300 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {relatedArticle.readTime}
                          </div>
                        </div>
                        <Heading level="h4" color="white" className="mb-2 group-hover:text-gold-300 transition-colors">
                          {relatedArticle.title}
                        </Heading>
                        <Text size="sm" color="gray-100" className="mb-4">
                          {relatedArticle.excerpt}
                        </Text>
                        <div className="flex items-center justify-between">
                          <Text size="sm" color="gray-300">
                            {relatedArticle.publishedDate}
                          </Text>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </Grid>
          </Container>
        </Section>
      )}
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getPublishedArticles()
  
  const paths = articles.map((article) => ({
    params: { slug: article.slug }
  }))

  return {
    paths,
    fallback: false // Set to true if you want to generate pages on-demand
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      notFound: true
    }
  }

  const relatedArticles = getRelatedArticles(article.id)

  return {
    props: {
      article,
      relatedArticles
    },
    revalidate: 3600 // Revalidate every hour
  }
}