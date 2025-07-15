import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MassTime } from '@/lib/cms-data';

export default function MassTimesManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [massTimes, setMassTimes] = useState<MassTime[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  useEffect(() => {
    checkAuth();
    loadMassTimes();
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

  const loadMassTimes = async () => {
    try {
      const response = await fetch('/api/admin/mass-times');
      let data = await response.json();
      
      // If no data exists, initialize with default structure
      if (!data || data.length === 0) {
        data = daysOfWeek.map(day => ({
          day,
          services: []
        }));
      } else {
        // Ensure all days are present
        const existingDays = data.map((mt: MassTime) => mt.day);
        const missingDays = daysOfWeek.filter(day => !existingDays.includes(day));
        missingDays.forEach(day => {
          data.push({ day, services: [] });
        });
        
        // Sort by day of week
        data.sort((a: MassTime, b: MassTime) => 
          daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)
        );
      }
      
      setMassTimes(data);
    } catch (error) {
      console.error('Error loading mass times:', error);
      setMessage({ type: 'error', text: 'Failed to load mass times' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/mass-times', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(massTimes),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Mass times updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save mass times' });
      }
    } catch (error) {
      console.error('Error saving mass times:', error);
      setMessage({ type: 'error', text: 'Error saving mass times' });
    } finally {
      setSaving(false);
    }
  };

  const addService = (dayIndex: number) => {
    const newMassTimes = [...massTimes];
    newMassTimes[dayIndex].services.push({
      time: '',
      type: 'Mass',
      description: ''
    });
    setMassTimes(newMassTimes);
  };

  const removeService = (dayIndex: number, serviceIndex: number) => {
    const newMassTimes = [...massTimes];
    newMassTimes[dayIndex].services.splice(serviceIndex, 1);
    setMassTimes(newMassTimes);
  };

  const updateService = (dayIndex: number, serviceIndex: number, field: string, value: string) => {
    const newMassTimes = [...massTimes];
    (newMassTimes[dayIndex].services[serviceIndex] as any)[field] = value;
    setMassTimes(newMassTimes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
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
              <h1 className="text-xl font-semibold text-gray-900">Mass Times Management</h1>
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
              Save Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <Clock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Mass Times Instructions</h3>
              <div className="text-blue-700 space-y-1">
                <p>• Update the Mass times for each day of the week</p>
                <p>• Use 24-hour format for times (e.g., "10:00 AM", "6:30 PM")</p>
                <p>• Add multiple services per day using the "Add Service" button</p>
                <p>• Include special Masses like Spanish Mass, Vigil Mass, etc.</p>
                <p>• Changes will be reflected immediately on the website</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mass Times by Day */}
        <div className="space-y-6">
          {massTimes.map((daySchedule, dayIndex) => (
            <m.div
              key={daySchedule.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{daySchedule.day}</h3>
                  </div>
                  <button
                    onClick={() => addService(dayIndex)}
                    className="inline-flex items-center px-3 py-2 text-sm bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </button>
                </div>
              </div>

              <div className="p-6">
                {daySchedule.services.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p>No services scheduled for {daySchedule.day}</p>
                    <p className="text-sm">Click "Add Service" to schedule a Mass or service</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {daySchedule.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <input
                            type="text"
                            value={service.time}
                            onChange={(e) => updateService(dayIndex, serviceIndex, 'time', e.target.value)}
                            placeholder="10:00 AM"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                          </label>
                          <select
                            value={service.type}
                            onChange={(e) => updateService(dayIndex, serviceIndex, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          >
                            <option value="Mass">Mass</option>
                            <option value="Sunday Mass">Sunday Mass</option>
                            <option value="Weekday Mass">Weekday Mass</option>
                            <option value="Saturday Vigil">Saturday Vigil</option>
                            <option value="Spanish Mass">Spanish Mass</option>
                            <option value="Confession">Confession</option>
                            <option value="Adoration">Adoration</option>
                            <option value="Vespers">Vespers</option>
                            <option value="Special Service">Special Service</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(dayIndex, serviceIndex, 'description', e.target.value)}
                            placeholder="Family Mass"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            onClick={() => removeService(dayIndex, serviceIndex)}
                            className="w-full px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-8 py-3 bg-gold-600 text-white text-lg font-medium rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            ) : (
              <Save className="h-6 w-6 mr-3" />
            )}
            Save All Changes
          </button>
        </div>
      </main>
    </div>
  );
}