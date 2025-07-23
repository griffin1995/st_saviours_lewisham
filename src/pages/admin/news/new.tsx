import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { m } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Image,
  Calendar,
  User,
  Tag,
  FileText,
  Clock
} from 'lucide-react';

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  published: boolean;
}

export default function NewArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Announcement',
    author: 'Parish Office',
    image: '/images/news/default.jpg',
    published: false
  });

  const categories = [
    'Announcement',
    'Parish Life',
    'Liturgical Season',
    'Community',
    'Events',
    'Sacraments',
    'Youth',
    'Family',
    'Education',
    'Charity'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0]
        }),
      });

      if (response.ok) {
        router.push('/admin/news');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error creating article');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin/news"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to News
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create New Article</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  formData.published
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                {formData.published ? 'Will Publish' : 'Save as Draft'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Article Title */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Article Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Enter article title..."
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Brief summary for the article preview..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be shown in the news list and previews
                </p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Article Content</h2>
              {formData.content && (
                <div className="ml-auto flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {calculateReadTime(formData.content)} min read
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Full Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                placeholder="Write the full article content here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use line breaks to separate paragraphs
              </p>
            </div>
          </div>

          {/* Article Metadata */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Article Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Author name..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    placeholder="/images/news/article-image.jpg"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Upload Image"
                  >
                    <Image className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Image should be uploaded to /public/images/news/ folder first
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {formData.title && formData.excerpt && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Eye className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-600">
                    {formData.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()} • {calculateReadTime(formData.content)} min read
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{formData.title}</h3>
                <p className="text-gray-600 text-sm">{formData.excerpt}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Link
              href="/admin/news"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, published: false }));
                  setTimeout(() => {
                    const form = document.querySelector('form') as HTMLFormElement;
                    form?.requestSubmit();
                  }, 100);
                }}
                disabled={loading}
                className="inline-flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Save as Draft
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                {formData.published ? 'Publish Article' : 'Save Draft'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}