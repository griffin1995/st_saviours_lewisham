import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSpring, animated, config } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { 
  MagnifyingGlassIcon as Search, 
  FunnelIcon as Filter, 
  ArrowRightIcon as ArrowRight,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
  ClockIcon,
  TagIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LanguageIcon,
  CalendarDaysIcon,
  RssIcon,
  EnvelopeIcon,
  PrinterIcon,
  StarIcon,
  UserIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Enhanced 2025 Components
import { Motion, fadeInUp, reverentReveal, staggerChildren } from '@/lib/motion'
import { typographyScale } from '@/lib/fonts'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { PhotoSwipeLightbox, EnhancedImage } from '@/components/enhanced/PhotoSwipeLightbox'
import { ScriptureCard } from '@/components/enhanced/ScriptureCard'
import { EnhancedNewsletterForm } from '@/components/enhanced/EnhancedNewsletterForm'
import { AdvancedSearchSystem } from '@/components/enhanced/AdvancedSearchSystem'
import { ArticleBookmarkSystem } from '@/components/enhanced/ArticleBookmarkSystem'
import { SocialSharingSystem } from '@/components/enhanced/SocialSharingSystem'
import { ReadingProgressIndicator } from '@/components/enhanced/ReadingProgressIndicator'

// Modern imports with Zustand integration
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
import { useUI, useActions } from '@/stores/churchStore'
import { newsArticles } from '@/lib/data'

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function News() {
  const ui = useUI()
  const actions = useActions()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'title'>('date')
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(9)
  const [isInfiniteScrollEnabled, setIsInfiniteScrollEnabled] = useState(true)
  const [readingProgress, setReadingProgress] = useState<{[key: string]: number}>({})
  const [articleStats, setArticleStats] = useState<{[key: string]: {views: number, likes: number, shares: number}}>({})
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [showPrintPreview, setShowPrintPreview] = useState(false)
  const [emailShareData, setEmailShareData] = useState<{title: string, url: string} | null>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true })
  
  // Enhanced page initialization
  useEffect(() => {
    actions.addNotification({
      type: 'info',
      message: 'Welcome to Parish News - stay connected with our community',
      dismissible: true
    })
    
    // Load bookmarked articles from localStorage
    const savedBookmarks = localStorage.getItem('parish-news-bookmarks')
    if (savedBookmarks) {
      setBookmarkedArticles(JSON.parse(savedBookmarks))
    }
    
    // Load reading progress
    const savedProgress = localStorage.getItem('parish-news-progress')
    if (savedProgress) {
      setReadingProgress(JSON.parse(savedProgress))
    }
    
    // Load article statistics
    const savedStats = localStorage.getItem('parish-news-stats')
    if (savedStats) {
      setArticleStats(JSON.parse(savedStats))
    }
  }, [])
  
  // Advanced search form
  const { register, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      searchTerm: '',
      category: 'All',
      dateRange: 'all',
      author: 'all',
      tags: []
    }
  })
  
  const watchedValues = watch()
  
  // Infinite scroll implementation
  useEffect(() => {
    if (!isInfiniteScrollEnabled) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage * articlesPerPage < filteredArticles.length) {
          setCurrentPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }
    )
    
    if (observerRef.current) {
      observer.observe(observerRef.current)
    }
    
    return () => observer.disconnect()
  }, [currentPage, articlesPerPage, isInfiniteScrollEnabled])
  
  // Bookmark functionality
  const handleBookmark = useCallback((articleId: string) => {
    const updatedBookmarks = bookmarkedArticles.includes(articleId)
      ? bookmarkedArticles.filter(id => id !== articleId)
      : [...bookmarkedArticles, articleId]
    
    setBookmarkedArticles(updatedBookmarks)
    localStorage.setItem('parish-news-bookmarks', JSON.stringify(updatedBookmarks))
  }, [bookmarkedArticles])
  
  // Article interaction tracking
  const handleArticleView = useCallback((articleId: string) => {
    setArticleStats(prev => {
      const updated = {
        ...prev,
        [articleId]: {
          views: (prev[articleId]?.views || 0) + 1,
          likes: prev[articleId]?.likes || 0,
          shares: prev[articleId]?.shares || 0
        }
      }
      localStorage.setItem('parish-news-stats', JSON.stringify(updated))
      return updated
    })
  }, [])
  
  const handleArticleLike = useCallback((articleId: string) => {
    setArticleStats(prev => {
      const updated = {
        ...prev,
        [articleId]: {
          views: prev[articleId]?.views || 0,
          likes: (prev[articleId]?.likes || 0) + 1,
          shares: prev[articleId]?.shares || 0
        }
      }
      localStorage.setItem('parish-news-stats', JSON.stringify(updated))
      return updated
    })
  }, [])
  
  const handleArticleShare = useCallback((articleId: string, title: string) => {
    setArticleStats(prev => {
      const updated = {
        ...prev,
        [articleId]: {
          views: prev[articleId]?.views || 0,
          likes: prev[articleId]?.likes || 0,
          shares: (prev[articleId]?.shares || 0) + 1
        }
      }
      localStorage.setItem('parish-news-stats', JSON.stringify(updated))
      return updated
    })
    
    // Trigger share functionality
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this article from St Saviour\'s Parish News',
        url: window.location.href + '/' + articleId
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href + '/' + articleId)
      actions.addNotification({
        type: 'success',
        message: 'Article link copied to clipboard',
        dismissible: true
      })
    }
  }, [actions])

  // Enhanced animation variants with physics-based spring
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ui.reducedMotion ? 0.2 : 0.8,
        staggerChildren: ui.reducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.6 }
    }
  }

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: ui.reducedMotion ? 0.2 : 0.5 }
    }
  }

  const categories = ['All', 'Parish Life', 'Community', 'Liturgical Season', 'Events', 'Announcement', 'Prayer Requests', 'Youth Ministry', 'Adult Faith Formation']
  const authors = ['All', 'Fr. Krzysztof', 'Fr. Kenneth', 'Parish Administrator', 'Youth Ministry']
  const languages = [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'pt', name: 'Portuguese' }, { code: 'pl', name: 'Polish' }]
  const tags = ['Sacraments', 'Community', 'Liturgy', 'Youth', 'Family', 'Prayer', 'Service', 'Education', 'Celebration']

  // Enhanced filtering with advanced search
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesWatchedSearch = watchedValues.searchTerm === '' || 
                                article.title.toLowerCase().includes(watchedValues.searchTerm.toLowerCase()) ||
                                article.excerpt.toLowerCase().includes(watchedValues.searchTerm.toLowerCase())
    const matchesWatchedCategory = watchedValues.category === 'All' || article.category === watchedValues.category
    const matchesAuthor = watchedValues.author === 'all' || (article as any).author === watchedValues.author
    const matchesDateRange = watchedValues.dateRange === 'all' || checkDateRange(article.date, watchedValues.dateRange)
    const matchesTags = watchedValues.tags.length === 0 || watchedValues.tags.some((tag: string) => (article as any).tags?.includes(tag))
    
    return matchesSearch && matchesCategory && matchesWatchedSearch && matchesWatchedCategory && matchesAuthor && matchesDateRange && matchesTags
  })
  
  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'popularity':
        const aStats = articleStats[a.id] || { views: 0, likes: 0, shares: 0 }
        const bStats = articleStats[b.id] || { views: 0, likes: 0, shares: 0 }
        return (bStats.views + bStats.likes + bStats.shares) - (aStats.views + aStats.likes + aStats.shares)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })
  
  // Paginated articles for infinite scroll
  const displayedArticles = isInfiniteScrollEnabled 
    ? sortedArticles.slice(0, currentPage * articlesPerPage)
    : sortedArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)
  
  // Date range check helper
  const checkDateRange = (articleDate: string, range: string) => {
    const date = new Date(articleDate)
    const now = new Date()
    
    switch (range) {
      case 'today':
        return date.toDateString() === now.toDateString()
      case 'week':
        return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case 'month':
        return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      case 'year':
        return date >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      default:
        return true
    }
  }
  
  // Article statistics for Chart.js
  const articleEngagementData = {
    labels: sortedArticles.slice(0, 10).map(article => article.title.substring(0, 20) + '..'),
    datasets: [
      {
        label: 'Views',
        data: sortedArticles.slice(0, 10).map(article => articleStats[article.id]?.views || 0),
        backgroundColor: 'rgba(212, 175, 55, 0.6)',
        borderColor: '#d4af37',
        borderWidth: 1
      },
      {
        label: 'Likes',
        data: sortedArticles.slice(0, 10).map(article => articleStats[article.id]?.likes || 0),
        backgroundColor: 'rgba(26, 54, 93, 0.6)',
        borderColor: '#1a365d',
        borderWidth: 1
      }
    ]
  }
  
  // Newsletter form integration
  const handleNewsletterSubmit = useCallback((data: any) => {
    actions.addNotification({
      type: 'success',
      message: 'Thank you for subscribing to our newsletter!',
      dismissible: true
    })
  }, [actions])
  
  // Advanced search system animation
  const searchSpring = useSpring({
    opacity: statsInView ? 1 : 0,
    transform: statsInView ? 'translateY(0px)' : 'translateY(50px)',
    config: ui.reducedMotion ? config.default : config.gentle,
    delay: 300
  })

  return (
    <PageLayout
      title="Parish News"
      description="Stay updated with the latest news, events, and announcements from St Saviour's Catholic Church in Lewisham. Read inspiring stories, community updates, and spiritual reflections."
      keywords="Parish News, Church News, Community Updates, Events, Announcements, Catholic Church Lewisham, Spiritual Reflections, Community Stories"
    >
      {/* Reading Progress Indicator */}
      <ReadingProgressIndicator />
      
      {/* Hero Section */}
      <PageHero
        title="Parish News & Stories"
        subtitle="Stay Connected with Our Community"
        description="Discover inspiring stories, important announcements, and spiritual reflections from our parish family."
        backgroundImage="/images/hero/community-gathering.jpg"
        height="large"
        overlay="medium"
        actions={
          <Flex justify="center" gap="md">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Search className="h-5 w-5" />}
              className="bg-white text-slate-900 hover:bg-gray-100"
              onClick={() => document.getElementById('advanced-search')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Advanced Search
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={<RssIcon className="h-5 w-5" />}
              className="border-white text-white hover:bg-white hover:text-slate-900"
              onClick={() => window.open('/rss-feed.xml', '_blank')}
            >
              RSS Feed
            </Button>
          </Flex>
        }
      />
      
      {/* Scripture Inspiration Section */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <h2 className={`${typographyScale.h2} text-white mb-6`}>
                Today's Reflection
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                Let Scripture guide our understanding of current events and community life
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ScriptureCard
                displayMode="daily"
                showReflection={true}
              />
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Advanced Search and Filter System */}
      <Section spacing="md" background="slate">
        <Container size="lg">
          <animated.div
            ref={statsRef}
            style={searchSpring}
            id="advanced-search"
          >
            <div className="text-center mb-8">
              <h2 className={`${typographyScale.h2} text-white mb-6`}>
                Discover Parish Stories
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                Use our advanced search to find articles by topic, author, date, or tags
              </p>
            </div>

            <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
              <CardContent>
                <form onSubmit={handleSubmit(() => {})} className="space-y-6">
                  {/* Main Search Row */}
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        {...register('searchTerm')}
                        type="text"
                        placeholder="Search articles, content..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white placeholder-gray-300"
                      />
                    </div>
                    
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        {...register('category')}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        {categories.map(category => (
                          <option key={category} value={category} className="bg-slate-800 text-white">
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        {...register('author')}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        {authors.map(author => (
                          <option key={author} value={author} className="bg-slate-800 text-white">
                            {author}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Advanced Filters Row */}
                  <div className="grid lg:grid-cols-4 gap-4">
                    <div className="relative">
                      <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        {...register('dateRange')}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        <option value="all" className="bg-slate-800 text-white">All Time</option>
                        <option value="today" className="bg-slate-800 text-white">Today</option>
                        <option value="week" className="bg-slate-800 text-white">This Week</option>
                        <option value="month" className="bg-slate-800 text-white">This Month</option>
                        <option value="year" className="bg-slate-800 text-white">This Year</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <LanguageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code} className="bg-slate-800 text-white">
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="relative">
                      <EyeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'title')}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        <option value="date" className="bg-slate-800 text-white">Latest First</option>
                        <option value="popularity" className="bg-slate-800 text-white">Most Popular</option>
                        <option value="title" className="bg-slate-800 text-white">Alphabetical</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <DocumentTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value as 'grid' | 'list' | 'timeline')}
                        className="w-full pl-10 pr-4 py-3 border border-slate-500 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white/20 backdrop-blur-sm text-white appearance-none"
                      >
                        <option value="grid" className="bg-slate-800 text-white">Grid View</option>
                        <option value="list" className="bg-slate-800 text-white">List View</option>
                        <option value="timeline" className="bg-slate-800 text-white">Timeline View</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Tag Filter */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Filter by Tags:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <label key={tag} className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            value={tag}
                            {...register('tags')}
                            className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded bg-white/20"
                          />
                          <span className="text-sm text-gray-300">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Search Results Summary */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300">
                        Showing {displayedArticles.length} of {sortedArticles.length} articles
                      </span>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isInfiniteScrollEnabled}
                          onChange={(e) => setIsInfiniteScrollEnabled(e.target.checked)}
                          className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded bg-white/20"
                        />
                        <span className="text-sm text-gray-300">Infinite Scroll</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => reset()}
                        className="border-gray-400 text-gray-300 hover:bg-white/10"
                      >
                        Clear All
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<BookmarkIcon className="h-4 w-4" />}
                        className="bg-gold-600 hover:bg-gold-700"
                        onClick={() => window.open('/bookmarked-articles', '_blank')}
                      >
                        Bookmarks ({bookmarkedArticles.length})
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </animated.div>
        </Container>
      </Section>

      {/* Article Statistics Dashboard */}
      {statsInView && sortedArticles.length > 0 && (
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <h2 className={`${typographyScale.h2} text-white mb-6`}>
                  Community Engagement
                </h2>
                <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                  See how our community is engaging with parish news and stories
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600 text-center">
                  <CardContent>
                    <div className="w-16 h-16 bg-gold-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <DocumentTextIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-white mb-2`}>
                      {sortedArticles.length}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-300`}>Total Articles</p>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600 text-center">
                  <CardContent>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <EyeIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-white mb-2`}>
                      {Object.values(articleStats).reduce((sum, stats) => sum + stats.views, 0)}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-300`}>Total Views</p>
                  </CardContent>
                </Card>
                
                <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600 text-center">
                  <CardContent>
                    <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <HeartIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`${typographyScale.h3} text-white mb-2`}>
                      {Object.values(articleStats).reduce((sum, stats) => sum + stats.likes, 0)}
                    </h3>
                    <p className={`${typographyScale.body} text-gray-300`}>Community Likes</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Engagement Chart */}
              <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
                <CardContent>
                  <h3 className={`${typographyScale.h3} text-white mb-6 text-center`}>
                    Most Engaging Articles
                  </h3>
                  <div className="h-64">
                    <Bar
                      data={articleEngagementData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: '#ffffff' }
                          }
                        },
                        scales: {
                          x: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                          },
                          y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealSection>
          </Container>
        </Section>
      )}
      
      {/* Featured Article */}
      {sortedArticles.length > 0 && (
        <Section spacing="lg" background="slate">
          <Container size="lg">
            <ScrollRevealSection>
              <div className="text-center mb-12">
                <h2 className={`${typographyScale.h2} text-white mb-6`}>
                  Featured Story
                </h2>
                <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                  Highlighting the most important news from our parish community
                </p>
              </div>

              <div className="relative">
                <NewsCard
                  {...sortedArticles[0]}
                  variant="horizontal"
                  featured={true}
                  slug={String(sortedArticles[0].id)}
                  className="max-w-none"
                />
                
                {/* Enhanced Article Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookmark(String(sortedArticles[0].id))}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarkedArticles.includes(String(sortedArticles[0].id))
                        ? 'bg-gold-600 text-white' 
                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                    }`}
                  >
                    <BookmarkIcon className="h-5 w-5" />
                  </Motion.button>
                  
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleArticleShare(String(sortedArticles[0].id), sortedArticles[0].title)}
                    className="p-2 rounded-full bg-white/20 text-gray-300 hover:bg-white/30 transition-colors"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </Motion.button>
                  
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleArticleLike(String(sortedArticles[0].id))}
                    className="p-2 rounded-full bg-white/20 text-gray-300 hover:bg-white/30 transition-colors"
                  >
                    <HeartIcon className="h-5 w-5" />
                  </Motion.button>
                </div>
                
                {/* Article Stats */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <EyeIcon className="h-4 w-4" />
                    {articleStats[sortedArticles[0].id]?.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-4 w-4" />
                    {articleStats[sortedArticles[0].id]?.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShareIcon className="h-4 w-4" />
                    {articleStats[sortedArticles[0].id]?.shares || 0}
                  </span>
                </div>
              </div>
            </ScrollRevealSection>
          </Container>
        </Section>
      )}

      {/* Articles Grid with Enhanced Features */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <h2 className={`${typographyScale.h2} text-white mb-6`}>
                {viewMode === 'timeline' ? 'Article Timeline' : 'Community Stories'}
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                {viewMode === 'timeline' 
                  ? 'Follow our parish journey through time with chronological articles'
                  : 'Discover inspiring stories and important updates from our parish family'
                }
              </p>
            </div>

            {displayedArticles.length > 0 ? (
              <div className="space-y-8">
                {/* View Mode Selector */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                    {[{ key: 'grid', icon: DocumentTextIcon }, { key: 'list', icon: ClockIcon }, { key: 'timeline', icon: CalendarDaysIcon }].map(({ key, icon: Icon }) => (
                      <Motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode(key as 'grid' | 'list' | 'timeline')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          viewMode === key
                            ? 'bg-gold-600 text-white' 
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Articles Display */}
                {viewMode === 'grid' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedArticles.slice(1).map((article, index) => (
                      <Motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => handleArticleView(String(article.id))}
                      >
                        <Card variant="default" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-300 hover:shadow-2xl transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            {/* Article Image */}
                            <div className="relative mb-4 overflow-hidden rounded-xl">
                              <EnhancedImage
                                src={article.image || '/images/placeholder-article.jpg'}
                                alt={article.title}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 flex items-center gap-2">
                                <Motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleBookmark(String(article.id))
                                  }}
                                  className={`p-2 rounded-full transition-colors ${
                                    bookmarkedArticles.includes(String(article.id))
                                      ? 'bg-gold-600 text-white' 
                                      : 'bg-black/50 text-white hover:bg-black/70'
                                  }`}
                                >
                                  <BookmarkIcon className="h-4 w-4" />
                                </Motion.button>
                              </div>
                            </div>
                            
                            {/* Article Content */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{new Date(article.date).toLocaleDateString('en-GB')}</span>
                                <span className="text-gold-600">•</span>
                                <span>{(article as any).author || 'Parish News'}</span>
                              </div>
                              
                              <h3 className={`${typographyScale.h5} text-white group-hover:text-gold-300 transition-colors duration-300 line-clamp-2`}>
                                {article.title}
                              </h3>
                              
                              <p className={`${typographyScale.body} text-gray-300 line-clamp-3`}>
                                {article.excerpt}
                              </p>
                              
                              {/* Article Tags */}
                              {(article as any).tags && (article as any).tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {(article as any).tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="px-2 py-1 bg-gold-600/20 text-gold-300 rounded-md text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              {/* Article Stats */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-600">
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <EyeIcon className="h-3 w-3" />
                                    {articleStats[article.id]?.views || 0}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <HeartIcon className="h-3 w-3" />
                                    {articleStats[article.id]?.likes || 0}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleArticleLike(String(article.id))
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                                  >
                                    <HeartIcon className="h-4 w-4" />
                                  </Motion.button>
                                  
                                  <Motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleArticleShare(String(article.id), article.title)
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-blue-400 transition-colors"
                                  >
                                    <ShareIcon className="h-4 w-4" />
                                  </Motion.button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Motion.div>
                    ))}
                  </div>
                )}
                
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {displayedArticles.slice(1).map((article, index) => (
                      <Motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 8 }}
                        className="group cursor-pointer"
                        onClick={() => handleArticleView(String(article.id))}
                      >
                        <Card variant="default" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-300 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                                <EnhancedImage
                                  src={article.image || '/images/placeholder-article.jpg'}
                                  alt={article.title}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <CalendarDaysIcon className="h-4 w-4" />
                                  <span>{new Date(article.date).toLocaleDateString('en-GB')}</span>
                                  <span className="text-gold-600">•</span>
                                  <span>{(article as any).author || 'Parish News'}</span>
                                  <span className="text-gold-600">•</span>
                                  <span className="px-2 py-1 bg-gold-600/20 text-gold-300 rounded-md">
                                    {article.category}
                                  </span>
                                </div>
                                
                                <h3 className={`${typographyScale.h5} text-white group-hover:text-gold-300 transition-colors duration-300`}>
                                  {article.title}
                                </h3>
                                
                                <p className={`${typographyScale.body} text-gray-300 line-clamp-2`}>
                                  {article.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <EyeIcon className="h-3 w-3" />
                                      {articleStats[article.id]?.views || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <HeartIcon className="h-3 w-3" />
                                      {articleStats[article.id]?.likes || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <ShareIcon className="h-3 w-3" />
                                      {articleStats[article.id]?.shares || 0}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleBookmark(String(article.id))
                                      }}
                                      className={`p-1 rounded-full transition-colors ${
                                        bookmarkedArticles.includes(String(article.id))
                                          ? 'text-gold-600' 
                                          : 'text-gray-400 hover:text-gold-400'
                                      }`}
                                    >
                                      <BookmarkIcon className="h-4 w-4" />
                                    </Motion.button>
                                    
                                    <Motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleArticleShare(String(article.id), article.title)
                                      }}
                                      className="p-1 rounded-full text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                      <ShareIcon className="h-4 w-4" />
                                    </Motion.button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Motion.div>
                    ))}
                  </div>
                )}
                
                {viewMode === 'timeline' && (
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-600"></div>
                    <div className="space-y-8">
                      {displayedArticles.slice(1).map((article, index) => (
                        <Motion.div
                          key={article.id}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="relative pl-20 group cursor-pointer"
                          onClick={() => handleArticleView(String(article.id))}
                        >
                          <div className="absolute left-6 w-4 h-4 bg-gold-600 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300"></div>
                          
                          <Card variant="default" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-300 hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-6">
                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl">
                                  <EnhancedImage
                                    src={article.image || '/images/placeholder-article.jpg'}
                                    alt={article.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    <span className="font-medium">{new Date(article.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                  </div>
                                  
                                  <h3 className={`${typographyScale.h5} text-white group-hover:text-gold-300 transition-colors duration-300`}>
                                    {article.title}
                                  </h3>
                                  
                                  <p className={`${typographyScale.body} text-gray-300 line-clamp-2`}>
                                    {article.excerpt}
                                  </p>
                                  
                                  <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <span className="px-2 py-1 bg-gold-600/20 text-gold-300 rounded-md">
                                        {article.category}
                                      </span>
                                      <span>by {(article as any).author || 'Parish News'}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                      <span className="flex items-center gap-1">
                                        <EyeIcon className="h-3 w-3" />
                                        {articleStats[article.id]?.views || 0}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <HeartIcon className="h-3 w-3" />
                                        {articleStats[article.id]?.likes || 0}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Infinite Scroll Trigger */}
                {isInfiniteScrollEnabled && currentPage * articlesPerPage < sortedArticles.length && (
                  <div ref={observerRef} className="flex justify-center py-8">
                    <Motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full"
                    />
                  </div>
                )}
                
                {/* Load More Button (when infinite scroll is disabled) */}
                {!isInfiniteScrollEnabled && currentPage * articlesPerPage < sortedArticles.length && (
                  <div className="flex justify-center py-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <ScrollRevealSection>
                <Card variant="default" padding="lg" className="text-center bg-white/10 backdrop-blur-sm border border-slate-600">
                  <CardContent>
                    <div className="py-12">
                      <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                      <h3 className={`${typographyScale.h3} text-white mb-4`}>
                        No articles found
                      </h3>
                      <p className={`${typographyScale.body} text-gray-300 mb-6 max-w-md mx-auto`}>
                        We couldn't find any articles matching your criteria. Try adjusting your search terms or filters.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchTerm('')
                            setSelectedCategory('All')
                            reset()
                          }}
                          className="border-white text-white hover:bg-white hover:text-slate-900"
                        >
                          Clear All Filters
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={() => window.location.href = '/contact-us'}
                          className="bg-gold-600 hover:bg-gold-700"
                        >
                          Suggest an Article
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollRevealSection>
            )}
          </ScrollRevealSection>
        </Container>
      </Section>

      {/* Enhanced Newsletter Signup */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Newsletter Form */}
              <div>
                <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center lg:text-left">
                        <h2 className={`${typographyScale.h2} text-white mb-4`}>
                          Stay Connected
                        </h2>
                        <p className={`${typographyScale.bodyLarge} text-gray-300`}>
                          Join our parish newsletter to receive weekly updates, spiritual reflections, 
                          and exclusive content delivered to your inbox.
                        </p>
                      </div>
                      
                      <EnhancedNewsletterForm
                        onSubmit={handleNewsletterSubmit}
                        reducedMotion={ui.reducedMotion}
                        className="space-y-4"
                      />
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-600">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-5 w-5 text-gold-600" />
                          <span className="text-sm text-gray-300">Weekly delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-5 w-5 text-gold-600" />
                          <span className="text-sm text-gray-300">1,200+ subscribers</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Newsletter Benefits */}
              <div className="space-y-6">
                <div>
                  <h3 className={`${typographyScale.h3} text-white mb-6`}>
                    What You'll Receive
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: DocumentTextIcon, title: 'Weekly Parish News', description: 'Latest updates from our community' },
                      { icon: CalendarDaysIcon, title: 'Upcoming Events', description: 'Never miss important parish activities' },
                      { icon: BookmarkIcon, title: 'Spiritual Reflections', description: 'Weekly thoughts and prayers' },
                      { icon: HeartIcon, title: 'Community Stories', description: 'Inspiring tales from our parish family' }
                    ].map((benefit, index) => (
                      <Motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className={`${typographyScale.h5} text-white mb-2`}>
                            {benefit.title}
                          </h4>
                          <p className={`${typographyScale.body} text-gray-300`}>
                            {benefit.description}
                          </p>
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<RssIcon className="h-5 w-5" />}
                    onClick={() => window.open('/rss-feed.xml', '_blank')}
                    className="border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white"
                  >
                    RSS Feed
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<PrinterIcon className="h-5 w-5" />}
                    onClick={() => setShowPrintPreview(true)}
                    className="border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-slate-900"
                  >
                    Print Articles
                  </Button>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>
      {/* Article Archive & Additional Features */}
      <Section spacing="lg" background="slate">
        <Container size="lg">
          <ScrollRevealSection>
            <div className="text-center mb-12">
              <h2 className={`${typographyScale.h2} text-white mb-6`}>
                Explore More
              </h2>
              <p className={`${typographyScale.bodyLarge} text-gray-300 max-w-3xl mx-auto`}>
                Discover additional ways to stay connected with our parish community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Article Archive',
                  description: 'Browse past articles by month and year',
                  icon: CalendarDaysIcon,
                  action: () => window.open('/news-archive', '_blank'),
                  color: 'bg-blue-600'
                },
                { 
                  title: 'Prayer Requests',
                  description: 'Submit and read community prayer requests',
                  icon: HeartIcon,
                  action: () => window.open('/prayer-requests', '_blank'),
                  color: 'bg-purple-600'
                },
                { 
                  title: 'Community Forum',
                  description: 'Join discussions with fellow parishioners',
                  icon: ChatBubbleLeftIcon,
                  action: () => window.open('/community-forum', '_blank'),
                  color: 'bg-green-600'
                },
                { 
                  title: 'Submit News',
                  description: 'Share your story with the parish community',
                  icon: DocumentTextIcon,
                  action: () => window.open('/submit-news', '_blank'),
                  color: 'bg-gold-600'
                }
              ].map((feature, index) => (
                <Motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group cursor-pointer"
                  onClick={feature.action}
                >
                  <Card variant="default" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-gold-300 hover:shadow-2xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${feature.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`${typographyScale.h5} text-white mb-3 group-hover:text-gold-300 transition-colors duration-300`}>
                        {feature.title}
                      </h3>
                      <p className={`${typographyScale.body} text-gray-300`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Motion.div>
              ))}
            </div>
          </ScrollRevealSection>
        </Container>
      </Section>
      
      {/* Print Preview Modal */}
      {showPrintPreview && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowPrintPreview(false)}
        >
          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`${typographyScale.h3} text-slate-900`}>
                Print Preview
              </h3>
              <button
                onClick={() => setShowPrintPreview(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <p className={`${typographyScale.body} text-gray-700 mb-6`}>
                Select articles to include in your print version:
              </p>
              
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {sortedArticles.map(article => (
                  <label key={article.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-gold-600 focus:ring-gold-500 border-gray-300 rounded mt-1"
                      defaultChecked
                    />
                    <div className="flex-1">
                      <h4 className={`${typographyScale.h5} text-slate-900 mb-1`}>
                        {article.title}
                      </h4>
                      <p className={`${typographyScale.caption} text-gray-600`}>
                        {new Date(article.date).toLocaleDateString('en-GB')} • {(article as any).author || 'Parish News'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowPrintPreview(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<PrinterIcon className="h-5 w-5" />}
                  onClick={() => {
                    window.print()
                    setShowPrintPreview(false)
                  }}
                  className="bg-gold-600 hover:bg-gold-700"
                >
                  Print Selected
                </Button>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </PageLayout>
  )
}

// Maintenance mode check
export { defaultMaintenanceCheck as getServerSideProps } from '@/lib/maintenance'