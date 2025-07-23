import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { m} from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Camera,
  Image as ImageIcon,
  Eye,
  AlertCircle,
  CheckCircle,
  Save,
  X,
  Calendar,
  Star,
  Folder,
} from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  images: GalleryImage[];
  featured: boolean;
  published: boolean;
}

export default function GalleryManagement() {
  const router = useRouter();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Liturgical",
    date: "",
    featured: false,
    published: false,
    images: [] as GalleryImage[],
  });
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    album: GalleryAlbum | null;
  }>({
    show: false,
    album: null,
  });

  const categories = [
    "Liturgical",
    "Sacraments",
    "Community",
    "Events",
    "Building",
    "Youth",
    "Other",
  ];

  useEffect(() => {
    checkAuth();
    loadAlbums();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth");
      const data = await response.json();

      if (!data.success) {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    }
  };

  const loadAlbums = async () => {
    try {
      const response = await fetch("/api/admin/gallery");
      const data = await response.json();
      setAlbums(data || []);
    } catch (error) {
      console.error("Error loading albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingAlbum
        ? `/api/admin/gallery?id=${editingAlbum.id}`
        : "/api/admin/gallery";

      const method = editingAlbum ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingAlbum(null);
        resetForm();
        loadAlbums();
      } else {
        console.error("Failed to save album");
      }
    } catch (error) {
      console.error("Error saving album:", error);
    }
  };

  const handleEdit = (album: GalleryAlbum) => {
    setEditingAlbum(album);
    setFormData({
      title: album.title,
      description: album.description,
      category: album.category,
      date: album.date,
      featured: album.featured,
      published: album.published,
      images: album.images,
    });
    setShowForm(true);
  };

  const handleDelete = async (album: GalleryAlbum) => {
    try {
      const response = await fetch(`/api/admin/gallery?id=${album.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteModal({ show: false, album: null });
        loadAlbums();
      }
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  const togglePublished = async (album: GalleryAlbum) => {
    try {
      const response = await fetch(`/api/admin/gallery?id=${album.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...album, published: !album.published }),
      });

      if (response.ok) {
        loadAlbums();
      }
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const toggleFeatured = async (album: GalleryAlbum) => {
    try {
      const response = await fetch(`/api/admin/gallery?id=${album.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...album, featured: !album.featured }),
      });

      if (response.ok) {
        loadAlbums();
      }
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        {
          id: `img-${Date.now()}`,
          url: "",
          caption: "",
          alt: "",
        },
      ],
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const updateImage = (
    index: number,
    field: keyof GalleryImage,
    value: string
  ) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData({ ...formData, images: newImages });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Liturgical",
      date: "",
      featured: false,
      published: false,
      images: [],
    });
  };

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || album.category === filterCategory;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && album.published) ||
      (filterStatus === "Draft" && !album.published) ||
      (filterStatus === "Featured" && album.featured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

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
              <h1 className="text-xl font-semibold text-gray-900">
                Gallery Management
              </h1>
            </div>

            <button
              onClick={() => {
                setEditingAlbum(null);
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Album
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Featured">Featured</option>
            </select>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p>No photo albums found</p>
              <p className="text-sm">Add your first album to get started</p>
            </div>
          ) : (
            filteredAlbums.map((album) => (
              <m.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {album.images.length > 0 ? (
                    <img
                      src={album.images[0].url}
                      alt={album.images[0].alt}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {album.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {album.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {album.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(album.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          {album.images.length} photos
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Folder className="h-3 w-3 mr-1" />
                      {album.category}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFeatured(album)}
                        className={`p-1 rounded transition-colors ${
                          album.featured
                            ? "text-yellow-600 hover:text-yellow-700"
                            : "text-gray-400 hover:text-yellow-600"
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => togglePublished(album)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          album.published
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {album.published ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Draft
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(album)}
                      className="text-gold-600 hover:text-gold-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ show: true, album })}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))
          )}
        </div>
      </main>

      {/* Album Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingAlbum ? "Edit Album" : "Add New Album"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Album Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              featured: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Featured Album
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.published}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              published: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Publish Immediately
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      Images
                    </h4>
                    <button
                      type="button"
                      onClick={addImage}
                      className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Image
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                          </label>
                          <input
                            type="url"
                            required
                            value={image.url}
                            onChange={(e) =>
                              updateImage(index, "url", e.target.value)
                            }
                            placeholder="/images/gallery/..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Caption
                          </label>
                          <input
                            type="text"
                            value={image.caption}
                            onChange={(e) =>
                              updateImage(index, "caption", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            required
                            value={image.alt}
                            onChange={(e) =>
                              updateImage(index, "alt", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="w-full px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    {formData.images.length === 0 && (
                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        <ImageIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p>No images added yet</p>
                        <p className="text-sm">
                          Click "Add Image" to start building your album
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingAlbum ? "Update Album" : "Create Album"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.album && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Album
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{deleteModal.album.title}"?
                This action cannot be undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteModal({ show: false, album: null })}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.album!)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
