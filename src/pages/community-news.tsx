import React from "react";
import { m} from "framer-motion";
import Link from "next/link";
import {
  NewspaperIcon as Newspaper,
  UsersIcon as Users,
  HeartIcon as Heart,
  CalendarDaysIcon as Calendar,
  ClockIcon as Clock,
  ArrowRightIcon as ArrowRight,
  TagIcon as Tag,
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
import { communityNewsArticles } from "@/lib/data";

export default function CommunityNews() {
  const reducedMotion = prefersReducedMotion();

  // Categories for filtering
  const categories = [
    { name: "All", value: "all", icon: Newspaper },
    { name: "Community Groups", value: "Community Groups", icon: Users },
    { name: "Parish Events", value: "Parish Events", icon: Heart },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredArticles =
    selectedCategory === "all"
      ? communityNewsArticles
      : communityNewsArticles.filter(
          (article) => article.category === selectedCategory
        );

  return (
    <PageLayout
      title="Community News"
      description="Stay connected with the latest news and inspiring stories from our vibrant parish community at St Saviour's Catholic Church, Lewisham."
      keywords="parish news, community stories, St Bakhita Group, Pope John Paul II relics, Catholic community, Lewisham"
      background="slate"
    >
      <PageHero
        title="Community News"
        subtitle="Stay connected with the latest news from our vibrant parish community"
        backgroundImage="/images/mid-mass-priest-and-community.jpg"
        overlay="dark"
      />

      {/* Introduction Section */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level="h2" color="white" className="mb-6">
              Stories from Our Parish Family
            </Heading>
            <Text size="lg" color="gray-100" className="mb-8">
              Discover the inspiring stories, community groups, and special
              events that make St Saviour's a vibrant place of faith and
              fellowship. From new ministries to sacred celebrations, our
              community continues to grow in faith and service.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Category Filter */}
      <Section background="slate" className="py-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "bg-gold-500 text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Articles */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="space-y-12">
            {filteredArticles.map((article, index) => (
              <m.div
                key={article.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white overflow-hidden">
                  <div
                    className={`grid ${index % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-2"} gap-8 p-8`}
                  >
                    <div
                      className={`${index % 2 === 0 ? "order-1" : "order-1 md:order-2"}`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium">
                          {article.category}
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
                        <div className="flex items-center text-gray-300 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Published: {article.publishedDate}
                        </div>
                        <Link
                          href={
                            article.id === 1
                              ? "/community-news/st-bakhita-group"
                              : `/community-news/${article.id}`
                          }
                        >
                          <Button
                            variant="primary"
                            className="bg-white text-slate-900 hover:bg-gray-100"
                          >
                            Read Full Story
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={`${index % 2 === 0 ? "order-2" : "order-2 md:order-1"}`}
                    >
                      <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {article.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-gold-500 text-black rounded-full text-sm font-bold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </m.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Upcoming Events Section */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level="h2" color="white" className="text-center mb-12">
              Stay Connected
            </Heading>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Newspaper className="h-8 w-8 text-white" />
                  </div>
                  <Heading level="h3" color="white" className="mb-4">
                    Weekly Newsletter
                  </Heading>
                  <Text size="base" color="gray-100" className="mb-6">
                    Get the latest parish news, upcoming events, and spiritual
                    reflections delivered to your inbox.
                  </Text>
                  <Button
                    variant="primary"
                    className="bg-white text-slate-900 hover:bg-gray-100"
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-slate-600 hover:border-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <Heading level="h3" color="white" className="mb-4">
                    Join a Group
                  </Heading>
                  <Text size="base" color="gray-100" className="mb-6">
                    Connect with fellow parishioners through our various
                    community groups and ministries.
                  </Text>
                  <Button
                    variant="secondary"
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    View All Groups
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section background="slate" className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Heading level="h2" color="white" className="mb-6">
              Share Your Story
            </Heading>
            <Text size="lg" color="gray-100" className="mb-8">
              Do you have a story to share about your faith journey or community
              involvement? We'd love to hear from you and potentially feature
              your story in our community news.
            </Text>
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
