import React from "react";
import { motion, m } from "framer-motion";
import Link from "next/link";
import {
  BookOpenIcon as BookOpen,
  AcademicCapIcon as AcademicCap,
  HeartIcon as Heart,
  SparklesIcon as Sparkles,
  ClockIcon as Clock,
  UserIcon as User,
  CalendarDaysIcon as Calendar,
  ArrowRightIcon as ArrowRight,
} from "@heroicons/react/24/solid";

// New modern component system
import { PageLayout, PageHero } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  Heading,
  Text,
  Section,
  Grid,
  Flex,
  Container,
} from "@/components/ui";
import { prefersReducedMotion } from "@/lib/utils";
import {
  getFeaturedArticles,
  getPublishedArticles,
  knowledgeHubCategories,
} from "@/lib/cms-knowledge-hub";

const iconMap = {
  BookOpen: BookOpen,
  AcademicCap: AcademicCap,
  Heart: Heart,
  Sparkles: Sparkles,
};

export default function KnowledgeHub() {
  const reducedMotion = prefersReducedMotion();

  // Get articles from CMS
  const featuredArticles = getFeaturedArticles();
  const allArticles = getPublishedArticles();
  const upcomingArticles = allArticles.filter((article) => !article.featured);

  return (
    <PageLayout
      title="Knowledge Hub"
      description="Deepen your understanding of Catholic theology through the wisdom of saints, mystics, and theologians at St Saviour's Catholic Church, Lewisham."
      keywords="Catholic theology, saints, mystics, theologians, Peter Abelard, St Augustine, Julian of Norwich, faith formation"
      background="slate"
    >
      <PageHero
        title="Knowledge Hub"
        subtitle="Deepen your understanding of Catholic theology through the wisdom of saints, mystics, and theologians"
        backgroundImage="/images/inside-church-3-glass-windows.jpg"
        overlay="dark"
      />

      {/* Introduction Section */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level="h2" color="white" className="mb-6">
              A Journey Through Catholic Wisdom
            </Heading>
            <Text size="lg" color="gray-100" className="mb-8">
              Rather than lectures on theology, we invite you to let the mystics
              and theologians speak for themselves. Each week, we explore the
              profound insights of those who have shaped our understanding of
              the Catholic faith.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {featuredArticles.length > 0 ? (
                <Link href={`/knowledge-hub/${featuredArticles[0].slug}`}>
                  <Button variant="primary" size="lg">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Reading
                  </Button>
                </Link>
              ) : (
                <Button variant="primary" size="lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Reading
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Weekly Schedule
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Article */}
      <Section background="slate" className="py-16">
        <Container>
          <Heading level="h2" color="white" className="text-center mb-12">
            Featured This Week
          </Heading>

          {featuredArticles.map((article) => (
            <m.div
              key={article.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="order-2 md:order-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium">
                        {article.category.title}
                      </span>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <Heading level="h3" color="white" className="mb-4">
                      {article.title}
                    </Heading>
                    <Text size="lg" color="gray-100" className="mb-6">
                      {article.excerpt}
                    </Text>
                    <div className="flex items-center justify-between">
                      <Text size="sm" color="gray-300">
                        Published: {article.publishedDate}
                      </Text>
                      <Link href={`/knowledge-hub/${article.slug}`}>
                        <Button variant="primary">
                          Read Article
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
                      <img
                        src={article.image.src}
                        alt={article.image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                </div>
              </Card>
            </m.div>
          ))}
        </Container>
      </Section>

      {/* Categories */}
      <Section background="slate" className="py-16">
        <Container>
          <Heading level="h2" color="white" className="text-center mb-12">
            Explore by Category
          </Heading>

          <Grid cols={2} className="gap-8">
            {knowledgeHubCategories.map((category, index) => {
              const IconComponent =
                iconMap[category.icon as keyof typeof iconMap] || BookOpen;
              return (
                <m.div
                  key={category.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/knowledge-hub/category/${category.slug}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white hover:scale-105 transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}
                          >
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <Heading
                              level="h3"
                              color="white"
                              className="mb-2 group-hover:text-gold-300 transition-colors"
                            >
                              {category.title}
                            </Heading>
                            <Text size="base" color="gray-100" className="mb-4">
                              {category.description}
                            </Text>
                            <div className="flex items-center justify-between">
                              <Text size="sm" color="gray-300">
                                {category.articleCount} articles
                              </Text>
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Upcoming Articles */}
      <Section background="slate" className="py-16">
        <Container>
          <Heading level="h2" color="white" className="text-center mb-12">
            More Articles
          </Heading>

          <Grid cols={2} className="gap-8">
            {upcomingArticles.slice(0, 4).map((article, index) => {
              const cardContent = (
                <CardContent className="p-6">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={article.image.src}
                      alt={article.image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium">
                      {article.category.title}
                    </span>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <Heading
                    level="h4"
                    color="white"
                    className="mb-2 group-hover:text-gold-300 transition-colors"
                  >
                    {article.title}
                  </Heading>
                  <Text size="sm" color="gray-100" className="mb-4">
                    {article.excerpt}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Text size="sm" color="gray-300">
                      {article.publishedDate}
                    </Text>
                    {article.status === "published" ? (
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="border-white text-white hover:bg-white hover:text-slate-900"
                      >
                        Notify Me
                      </Button>
                    )}
                  </div>
                </CardContent>
              );

              return (
                <m.div
                  key={article.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {article.status === "published" ? (
                    <Link href={`/knowledge-hub/${article.slug}`}>
                      <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white group cursor-pointer">
                        {cardContent}
                      </Card>
                    </Link>
                  ) : (
                    <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white group">
                      {cardContent}
                    </Card>
                  )}
                </m.div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Newsletter Signup */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Heading level="h2" color="white" className="mb-6">
              Never Miss an Article
            </Heading>
            <Text size="lg" color="gray-100" className="mb-8">
              Subscribe to our Knowledge Hub newsletter and receive weekly
              articles directly in your inbox.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
