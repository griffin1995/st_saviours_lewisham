import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { 
  UsersIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  PlayIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid'
import { Card, CardContent, Heading, Text } from '@/components/ui'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface PodcastAnalyticsProps {
  className?: string
}

export default function PodcastAnalytics({ className = '' }: PodcastAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'audience' | 'engagement' | 'content'>('audience')
  const [isVisible, setIsVisible] = useState(false)
  const [realTimeListeners, setRealTimeListeners] = useState(247)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time listener updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeListeners(prev => {
        const change = Math.floor(Math.random() * 10) - 5
        return Math.max(0, prev + change)
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  // Listener demographics data
  const audienceData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Listeners by Age Group',
        data: [15, 32, 28, 18, 12, 8],
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Episode performance data
  const performanceData = {
    labels: ['Ep 1', 'Ep 2', 'Ep 3', 'Ep 4', 'Ep 5', 'Ep 6'],
    datasets: [
      {
        label: 'Plays',
        data: [1250, 1180, 1420, 980, 1650, 1380],
        borderColor: 'rgb(212, 175, 55)',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Completion Rate (%)',
        data: [78, 82, 85, 76, 88, 81],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  }

  // Content categories data
  const contentData = {
    labels: ['Spiritual Formation', 'Liturgy & Worship', 'Saints & Spirituality', 'Youth & Family', 'Parish Life', 'Prayer & Devotion'],
    datasets: [
      {
        data: [28, 22, 18, 15, 12, 8],
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#e2e8f0',
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
      },
    },
  }

  const tabs = [
    {
      id: 'audience',
      label: 'Audience',
      icon: UsersIcon,
      color: 'text-blue-400',
    },
    {
      id: 'engagement',
      label: 'Engagement',
      icon: HeartIcon,
      color: 'text-red-400',
    },
    {
      id: 'content',
      label: 'Content',
      icon: GlobeAltIcon,
      color: 'text-green-400',
    },
  ]

  const quickStats = [
    {
      icon: PlayIcon,
      label: 'Total Plays',
      value: '8,847',
      change: '+12%',
      color: 'text-green-400',
    },
    {
      icon: UsersIcon,
      label: 'Unique Listeners',
      value: '2,341',
      change: '+8%',
      color: 'text-blue-400',
    },
    {
      icon: ClockIcon,
      label: 'Avg. Listen Time',
      value: '18m 42s',
      change: '+15%',
      color: 'text-purple-400',
    },
    {
      icon: ArrowDownTrayIcon,
      label: 'Downloads',
      value: '1,892',
      change: '+22%',
      color: 'text-gold-400',
    },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Real-time Listeners */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Card variant="default" padding="md" className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
          <CardContent>
            <div className="flex items-center justify-center gap-3">
              <m.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <Text className="text-white font-semibold">
                {realTimeListeners} people listening now
              </Text>
            </div>
          </CardContent>
        </Card>
      </m.div>

      {/* Quick Stats */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card variant="default" padding="md" className="bg-white/10 backdrop-blur-sm border border-slate-600 hover:border-white transition-all duration-300">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`flex items-center gap-2 ${stat.color} mb-1`}>
                      <stat.icon className="h-4 w-4" />
                      <Text size="xs" className="text-gray-300">
                        {stat.label}
                      </Text>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <Text size="lg" className="font-bold text-white">
                        {stat.value}
                      </Text>
                      <Text size="xs" className="text-green-400">
                        {stat.change}
                      </Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </m.div>

      {/* Main Analytics Card */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Heading level="h3" color="white" className="text-xl font-semibold">
                  Podcast Analytics
                </Heading>
                <m.div
                  animate={{ rotate: isVisible ? 360 : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <ArrowTrendingUpIcon className="h-6 w-6 text-gold-400" />
                </m.div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-900'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-slate-900' : tab.color}`} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Chart Content */}
              <m.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-80"
              >
                {activeTab === 'audience' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Listener Demographics
                    </Heading>
                    <Bar data={audienceData} options={chartOptions} />
                  </div>
                )}
                {activeTab === 'engagement' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Episode Performance
                    </Heading>
                    <Line data={performanceData} options={chartOptions} />
                  </div>
                )}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    <Heading level="h4" color="white" className="text-lg">
                      Content Categories
                    </Heading>
                    <Doughnut data={contentData} options={doughnutOptions} />
                  </div>
                )}
              </m.div>

              {/* Insights */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="border-t border-slate-600 pt-4"
              >
                <Heading level="h5" color="white" className="text-sm font-semibold mb-2">
                  Key Insights
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                      <Text size="sm" className="text-gray-300">
                        25-34 age group represents our largest audience segment at 32%
                      </Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      <Text size="sm" className="text-gray-300">
                        Episode completion rate averages 81%, indicating strong engagement
                      </Text>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
                      <Text size="sm" className="text-gray-300">
                        Spiritual Formation content performs best with 28% of total listens
                      </Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gold-400 rounded-full mt-1.5 flex-shrink-0" />
                      <Text size="sm" className="text-gray-300">
                        Download rates increased 22% this month, showing growing offline engagement
                      </Text>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  )
}