import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { X, ChevronLeft, ChevronRight, Camera, Calendar, Heart } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  date: string;
  description?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/church/exterior-day.jpg",
    alt: "St Saviour's Church exterior",
    title: "Our Beautiful Church",
    category: "Church Building",
    date: "2024-12-15",
    description: "The magnificent Victorian architecture of St Saviour's Catholic Church"
  },
  {
    id: 2,
    src: "/images/church/interior-nave.jpg",
    alt: "Church interior nave",
    title: "Sacred Interior",
    category: "Church Building",
    date: "2024-12-10",
    description: "The nave of our church, where our community gathers for worship"
  },
  {
    id: 3,
    src: "/images/events/christmas-mass.jpg",
    alt: "Christmas Mass celebration",
    title: "Christmas Celebration",
    category: "Liturgical Celebrations",
    date: "2024-12-25",
    description: "Our parish family celebrating the birth of Christ"
  },
  {
    id: 4,
    src: "/images/events/first-communion.jpg",
    alt: "First Holy Communion ceremony",
    title: "First Holy Communion",
    category: "Sacraments",
    date: "2024-05-12",
    description: "Children receiving Jesus in the Eucharist for the first time"
  },
  {
    id: 5,
    src: "/images/events/confirmation.jpg",
    alt: "Confirmation ceremony",
    title: "Confirmation Service",
    category: "Sacraments",
    date: "2024-06-08",
    description: "Young people being sealed with the Holy Spirit"
  },
  {
    id: 6,
    src: "/images/community/parish-picnic.jpg",
    alt: "Parish picnic gathering",
    title: "Parish Picnic",
    category: "Community Events",
    date: "2024-07-20",
    description: "Our annual parish picnic bringing families together"
  },
  {
    id: 7,
    src: "/images/church/altar-close.jpg",
    alt: "Church altar detail",
    title: "Sacred Altar",
    category: "Church Building",
    date: "2024-11-30",
    description: "The beautiful altar where the Eucharist is celebrated"
  },
  {
    id: 8,
    src: "/images/events/easter-vigil.jpg",
    alt: "Easter Vigil service",
    title: "Easter Vigil",
    category: "Liturgical Celebrations",
    date: "2024-03-30",
    description: "The most sacred night of the year - the Easter Vigil"
  },
  {
    id: 9,
    src: "/images/community/volunteer-fair.jpg",
    alt: "Volunteer fair",
    title: "Volunteer Fair",
    category: "Community Events",
    date: "2024-09-15",
    description: "Parishioners learning about ways to serve our community"
  },
  {
    id: 10,
    src: "/images/church/stained-glass.jpg",
    alt: "Beautiful stained glass windows",
    title: "Stained Glass Windows",
    category: "Church Building",
    date: "2024-10-05",
    description: "Our historic stained glass windows telling stories of faith"
  },
  {
    id: 11,
    src: "/images/events/wedding-ceremony.jpg",
    alt: "Wedding ceremony",
    title: "Wedding Blessing",
    category: "Sacraments",
    date: "2024-08-18",
    description: "A beautiful Catholic wedding ceremony"
  },
  {
    id: 12,
    src: "/images/community/youth-group.jpg",
    alt: "Youth group gathering",
    title: "Youth Ministry",
    category: "Community Events",
    date: "2024-11-10",
    description: "Our vibrant youth group in action"
  }
];

const categories = ["All", "Church Building", "Liturgical Celebrations", "Sacraments", "Community Events"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = galleryImages.filter(image => 
    selectedCategory === "All" || image.category === selectedCategory
  );

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      : (lightboxIndex + 1) % filteredImages.length;
    
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <PageLayout
      title="Gallery"
      description="Explore photos of our beautiful church, celebrations, sacraments, and community life at St Saviour's Catholic Church in Lewisham."
      keywords="Photo Gallery, Church Photos, Community Events, Sacraments, Catholic Church Lewisham, Parish Life"
    >
      <PageHero
        title="Photo Gallery"
        subtitle="Capturing Our Faith Journey"
        description="Explore the beauty of our church, celebrations, and vibrant community life through these cherished moments."
        backgroundImage="/images/hero/church-gathering.jpg"
        height="medium"
        overlay="medium"
      />

      {/* Category Filter */}
      <ContentSection background="gray" padding="medium">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gold-50 hover:text-gold-600 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </ContentSection>

      {/* Gallery Grid */}
      <ContentSection background="white" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4">
            {selectedCategory === "All" ? "All Photos" : selectedCategory}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {selectedCategory === "All" 
              ? "Browse our complete collection of parish life moments"
              : `Photos from our ${selectedCategory.toLowerCase()}`
            }
          </p>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              No photos found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(image.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </ContentSection>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('prev');
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('next');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="relative max-w-4xl max-h-[70vh] w-full h-full">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Image Details */}
                <div className="mt-6 text-center text-white max-w-2xl">
                  <h2 className="text-2xl font-semibold mb-2">{selectedImage.title}</h2>
                  {selectedImage.description && (
                    <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                  )}
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(selectedImage.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="px-2 py-1 bg-gold-600 text-white rounded-full text-xs">
                      {selectedImage.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <ContentSection background="navy" padding="large">
        <div className="text-center">
          <Heart className="h-12 w-12 text-gold-400 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-serif font-light text-white mb-4">
            Share Your Moments
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Have photos from parish events you'd like to share? We'd love to include them in our gallery to celebrate our community together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:photos@saintsaviours.org.uk"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-navy-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Camera className="h-5 w-5 mr-2" />
              Submit Photos
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
}