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
  TruckIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  ClockIcon,
  UsersIcon
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

interface LocationAnalyticsProps {
  className?: string
}

export default function LocationAnalytics({ className = '' }: LocationAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'transport' | 'visitors' | 'accessibility'>('transport')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Transport method usage data
  const transportData = {
    labels: ['Train', 'Bus', 'Car', 'Walking', 'Cycling'],
    datasets: [
      {
        label: 'Visitor Transport Methods (%)',
        data: [45, 30, 15, 8, 2],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green for train
          'rgba(239, 68, 68, 0.8)',   // Red for bus
          'rgba(59, 130, 246, 0.8)',  // Blue for car
          'rgba(168, 85, 247, 0.8)',  // Purple for walking
          'rgba(245, 158, 11, 0.8)',  // Amber for cycling
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Visitor trends over time
  const visitorTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Visitors',
        data: [42, 38, 55, 48, 62, 58],
        borderColor: 'rgb(212, 175, 55)',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Returning Visitors',
        data: [85, 92, 88, 95, 87, 103],
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.2)',
        tension: 0.4,
      },
    ],
  }

  // Accessibility requests data
  const accessibilityData = {
    labels: ['Wheelchair Access', 'Hearing Loop', 'Large Print', 'Sign Language', 'Assistance'],
    datasets: [
      {
        data: [8, 12, 6, 3, 15],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(239, 68, 68, 0.8)',
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
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
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
      id: 'transport',
      label: 'Transport Methods',
      icon: TruckIcon,
      color: 'text-green-400',
    },
    {
      id: 'visitors',
      label: 'Visitor Trends',
      icon: UsersIcon,
      color: 'text-blue-400',
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: MapPinIcon,
      color: 'text-purple-400',
    },
  ]

  const quickStats = [
    {
      icon: BuildingOffice2Icon,
      label: 'Train Users',
      value: '45%',
      change: '+5%',
      color: 'text-green-400',
    },
    {
      icon: ClockIcon,
      label: 'Avg. Journey Time',
      value: '12 min',
      change: '-2 min',
      color: 'text-blue-400',
    },
    {
      icon: MapPinIcon,
      label: 'First-time Visitors',
      value: '58',
      change: '+8',
      color: 'text-purple-400',
    },
    {
      icon: UsersIcon,
      label: 'Weekly Visitors',
      value: '347',
      change: '+23',
      color: 'text-gold-400',
    },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Stats */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
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
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Card variant="default" padding="lg" className="bg-white/10 backdrop-blur-sm border border-slate-600">
          <CardContent>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Heading level="h3" color="white" className="text-xl font-semibold">
                  Location Analytics
                </Heading>
                <m.div
                  animate={{ rotate: isVisible ? 360 : 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <MapPinIcon className="h-6 w-6 text-gold-400" />
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
                className="h-64"
              >
                {activeTab === 'transport' && (
                  <Bar data={transportData} options={chartOptions} />
                )}
                {activeTab === 'visitors' && (
                  <Line data={visitorTrends} options={chartOptions} />
                )}
                {activeTab === 'accessibility' && (
                  <Doughnut data={accessibilityData} options={doughnutOptions} />
                )}
              </m.div>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  )
}