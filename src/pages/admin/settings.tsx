import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Settings as SettingsIcon,
  Phone,
  Mail,
  MapPin,
  Globe,
  Shield,
  Bell,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Facebook,
  Youtube,
  Instagram,
  Twitter
} from 'lucide-react';

interface WebsiteSettings {
  contact: {
    address: string;
    phone: string;
    email: string;
    emergencyPhone: string;
    safeguardingPhone: string;
  };
  parish: {
    name: string;
    location: string;
    priest: string;
    diocese: string;
    established: string;
  };
  social: {
    facebook: string;
    youtube: string;
    instagram: string;
    twitter: string;
  };
  website: {
    announcements: Array<{
      id: string;
      title: string;
      message: string;
      type: string;
      active: boolean;
      showUntil: string;
    }>;
    maintenanceMode: boolean;
    liveStreamEnabled: boolean;
    liveStreamUrl: string;
    donationsEnabled: boolean;
    donationsUrl: string;
  };
  features: {
    massBooking: boolean;
    eventRegistration: boolean;
    newsletter: boolean;
    prayerRequests: boolean;
    venueHire: boolean;
  };
}

export default function SettingsManagement() {
  const router = useRouter();
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    checkAuth();
    loadSettings();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      
      if (!data.success) {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Error saving settings' });
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (section: keyof WebsiteSettings, field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const addAnnouncement = () => {
    if (!settings) return;
    
    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: '',
      message: '',
      type: 'info',
      active: true,
      showUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };
    
    setSettings({
      ...settings,
      website: {
        ...settings.website,
        announcements: [...settings.website.announcements, newAnnouncement]
      }
    });
  };

  const updateAnnouncement = (index: number, field: string, value: any) => {
    if (!settings) return;
    
    const newAnnouncements = [...settings.website.announcements];
    newAnnouncements[index] = { ...newAnnouncements[index], [field]: value };
    
    setSettings({
      ...settings,
      website: {
        ...settings.website,
        announcements: newAnnouncements
      }
    });
  };

  const removeAnnouncement = (index: number) => {
    if (!settings) return;
    
    const newAnnouncements = settings.website.announcements.filter((_, i) => i !== index);
    
    setSettings({
      ...settings,
      website: {
        ...settings.website,
        announcements: newAnnouncements
      }
    });
  };

  const tabs = [
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'parish', label: 'Parish Details', icon: MapPin },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'website', label: 'Website Settings', icon: SettingsIcon },
    { id: 'features', label: 'Features', icon: Eye }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Website Settings</h1>
            </div>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Save Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          </m.div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-gold-500 text-gold-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parish Address
                    </label>
                    <textarea
                      rows={3}
                      value={settings.contact.address}
                      onChange={(e) => updateSettings('contact', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.contact.phone}
                      onChange={(e) => updateSettings('contact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parish Email
                    </label>
                    <input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => updateSettings('contact', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contact.emergencyPhone}
                      onChange={(e) => updateSettings('contact', 'emergencyPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safeguarding Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contact.safeguardingPhone}
                      onChange={(e) => updateSettings('contact', 'safeguardingPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Parish Details Tab */}
            {activeTab === 'parish' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Parish Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parish Name
                    </label>
                    <input
                      type="text"
                      value={settings.parish.name}
                      onChange={(e) => updateSettings('parish', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={settings.parish.location}
                      onChange={(e) => updateSettings('parish', 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parish Priest
                    </label>
                    <input
                      type="text"
                      value={settings.parish.priest}
                      onChange={(e) => updateSettings('parish', 'priest', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diocese
                    </label>
                    <input
                      type="text"
                      value={settings.parish.diocese}
                      onChange={(e) => updateSettings('parish', 'diocese', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Established Year
                    </label>
                    <input
                      type="text"
                      value={settings.parish.established}
                      onChange={(e) => updateSettings('parish', 'established', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Facebook className="h-4 w-4 inline mr-2" />
                      Facebook Page
                    </label>
                    <input
                      type="url"
                      value={settings.social.facebook}
                      onChange={(e) => updateSettings('social', 'facebook', e.target.value)}
                      placeholder="https://www.facebook.com/yourpage"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Youtube className="h-4 w-4 inline mr-2" />
                      YouTube Channel
                    </label>
                    <input
                      type="url"
                      value={settings.social.youtube}
                      onChange={(e) => updateSettings('social', 'youtube', e.target.value)}
                      placeholder="https://www.youtube.com/@yourchannel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Instagram className="h-4 w-4 inline mr-2" />
                      Instagram Profile
                    </label>
                    <input
                      type="url"
                      value={settings.social.instagram}
                      onChange={(e) => updateSettings('social', 'instagram', e.target.value)}
                      placeholder="https://www.instagram.com/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Twitter className="h-4 w-4 inline mr-2" />
                      Twitter Profile
                    </label>
                    <input
                      type="url"
                      value={settings.social.twitter}
                      onChange={(e) => updateSettings('social', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Website Settings Tab */}
            {activeTab === 'website' && (
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-gray-900">Website Configuration</h3>
                
                {/* Live Streaming */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Live Streaming</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.website.liveStreamEnabled}
                          onChange={(e) => updateSettings('website', 'liveStreamEnabled', e.target.checked)}
                          className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable Live Streaming</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Live Stream URL
                      </label>
                      <input
                        type="url"
                        value={settings.website.liveStreamUrl}
                        onChange={(e) => updateSettings('website', 'liveStreamUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Donations */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900">Online Donations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.website.donationsEnabled}
                          onChange={(e) => updateSettings('website', 'donationsEnabled', e.target.checked)}
                          className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable Online Donations</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donations URL
                      </label>
                      <input
                        type="url"
                        value={settings.website.donationsUrl}
                        onChange={(e) => updateSettings('website', 'donationsUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.website.maintenanceMode}
                        onChange={(e) => updateSettings('website', 'maintenanceMode', e.target.checked)}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="ml-2 text-sm text-yellow-800">
                        Enable Maintenance Mode (visitors will see a maintenance message)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Announcements */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Site Announcements</h4>
                    <button
                      onClick={addAnnouncement}
                      className="inline-flex items-center px-3 py-2 text-sm bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Add Announcement
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {settings.website.announcements.map((announcement, index) => (
                      <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={announcement.title}
                              onChange={(e) => updateAnnouncement(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Show Until
                            </label>
                            <input
                              type="date"
                              value={announcement.showUntil}
                              onChange={(e) => updateAnnouncement(index, 'showUntil', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            rows={2}
                            value={announcement.message}
                            onChange={(e) => updateAnnouncement(index, 'message', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <select
                              value={announcement.type}
                              onChange={(e) => updateAnnouncement(index, 'type', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                            >
                              <option value="info">Info</option>
                              <option value="warning">Warning</option>
                              <option value="success">Success</option>
                              <option value="error">Error</option>
                            </select>
                            
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={announcement.active}
                                onChange={(e) => updateAnnouncement(index, 'active', e.target.checked)}
                                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">Active</span>
                            </label>
                          </div>
                          
                          <button
                            onClick={() => removeAnnouncement(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {settings.website.announcements.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No announcements configured</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.features.massBooking}
                        onChange={(e) => updateSettings('features', 'massBooking', e.target.checked)}
                        className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Mass Booking System</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.features.eventRegistration}
                        onChange={(e) => updateSettings('features', 'eventRegistration', e.target.checked)}
                        className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Event Registration</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.features.newsletter}
                        onChange={(e) => updateSettings('features', 'newsletter', e.target.checked)}
                        className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Newsletter Signup</span>
                    </label>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.features.prayerRequests}
                        onChange={(e) => updateSettings('features', 'prayerRequests', e.target.checked)}
                        className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Prayer Requests</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.features.venueHire}
                        onChange={(e) => updateSettings('features', 'venueHire', e.target.checked)}
                        className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Venue Hire Booking</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}