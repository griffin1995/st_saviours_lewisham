import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Clock,
  Settings,
  Users,
  Camera,
  LogOut,
  Shield,
  BarChart3,
  Plus,
  Edit,
  Eye
} from 'lucide-react';

interface DashboardStats {
  totalNews: number;
  totalEvents: number;
  publishedNews: number;
  upcomingEvents: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalNews: 0,
    totalEvents: 0,
    publishedNews: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Load news stats
      const newsResponse = await fetch('/api/admin/news');
      const newsData = await newsResponse.json();
      
      // Load events stats
      const eventsResponse = await fetch('/api/admin/events');
      const eventsData = await eventsResponse.json();
      
      const now = new Date();
      
      setStats({
        totalNews: newsData.length,
        totalEvents: eventsData.length,
        publishedNews: newsData.filter((article: any) => article.published).length,
        upcomingEvents: eventsData.filter((event: any) => new Date(event.date) >= now).length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'News Articles',
      description: 'Manage parish news and announcements',
      href: '/admin/news',
      icon: FileText,
      color: 'bg-blue-500',
      actions: [
        { label: 'View All', href: '/admin/news', icon: Eye },
        { label: 'Add New', href: '/admin/news/new', icon: Plus }
      ]
    },
    {
      title: 'Events',
      description: 'Manage parish events and activities',
      href: '/admin/events',
      icon: Calendar,
      color: 'bg-green-500',
      actions: [
        { label: 'View All', href: '/admin/events', icon: Eye },
        { label: 'Add New', href: '/admin/events/new', icon: Plus }
      ]
    },
    {
      title: 'Mass Times',
      description: 'Update Mass schedules and service times',
      href: '/admin/mass-times',
      icon: Clock,
      color: 'bg-purple-500',
      actions: [
        { label: 'Edit Schedule', href: '/admin/mass-times', icon: Edit }
      ]
    },
    {
      title: 'Parish Groups',
      description: 'Manage community groups and ministries',
      href: '/admin/groups',
      icon: Users,
      color: 'bg-orange-500',
      actions: [
        { label: 'View All', href: '/admin/groups', icon: Eye },
        { label: 'Add New', href: '/admin/groups/new', icon: Plus }
      ]
    },
    {
      title: 'Gallery',
      description: 'Manage photo gallery and images',
      href: '/admin/gallery',
      icon: Camera,
      color: 'bg-pink-500',
      actions: [
        { label: 'View All', href: '/admin/gallery', icon: Eye },
        { label: 'Upload New', href: '/admin/gallery/upload', icon: Plus }
      ]
    },
    {
      title: 'Website Settings',
      description: 'Configure site settings and information',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-gray-500',
      actions: [
        { label: 'Edit Settings', href: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const statCards = [
    {
      title: 'Total News Articles',
      value: stats.totalNews,
      subtitle: `${stats.publishedNews} published`,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      subtitle: `${stats.upcomingEvents} upcoming`,
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Published Content',
      value: stats.publishedNews,
      subtitle: 'Live articles',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      subtitle: 'This month',
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-gold-600 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
                  <p className="text-sm text-gray-500">St Saviour's Catholic Church</p>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Site
              </Link>
              <div className="flex items-center text-sm text-gray-700">
                Welcome, {user?.username}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Manage your church website content and settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${item.color} p-3 rounded-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.actions.map((action, actionIndex) => (
                    <Link
                      key={actionIndex}
                      href={action.href}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <action.icon className="h-4 w-4 mr-1" />
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/news/new"
              className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add News Article
            </Link>
            <Link
              href="/admin/events/new"
              className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Event
            </Link>
            <Link
              href="/admin/mass-times"
              className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
            >
              <Edit className="h-5 w-5 mr-2" />
              Update Mass Times
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Settings className="h-5 w-5 mr-2" />
              Site Settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}