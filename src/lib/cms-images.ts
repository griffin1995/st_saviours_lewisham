// CMS Image utilities for retrieving images from settings
// Client-side version that uses default data structure

// Default images structure - this should match the CMS settings.json
const defaultImages = {
  logo: "/images/logo.svg",
  hero: [
    {
      id: "hero-1",
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Beautiful interior of St Saviour's Catholic Church showing altar and pews filled with warm light",
      title: "Welcome to St Saviour's Catholic Church",
      subtitle: "A community of faith in the heart of Lewisham",
      overlay: "from-black/60 via-black/40 to-black/60",
      priority: true
    },
    {
      id: "hero-2",
      url: "/images/pexels-jibarofoto-2014775.jpg",
      alt: "Congregation gathered in prayer during Mass at St Saviour's Catholic Church",
      title: "Join Us in Prayer and Fellowship",
      subtitle: "Discover the warmth of our parish family",
      overlay: "from-black/70 via-black/30 to-black/50",
      priority: false
    },
    {
      id: "hero-3",
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "Stunning Gothic architecture and stained glass windows of our historic Victorian church",
      title: "A Place of Sacred Beauty",
      subtitle: "Experience our historic Victorian church",
      overlay: "from-black/60 via-black/40 to-black/60",
      priority: false
    },
    {
      id: "hero-4",
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Diverse parish community celebrating together at St Saviour's, showing families and individuals of all ages",
      title: "Growing in Faith Together",
      subtitle: "All are welcome in God's house",
      overlay: "from-black/60 via-black/40 to-black/60",
      priority: false
    }
  ],
  history: [
    {
      id: "history-1",
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Historical image of St Saviour's foundation",
      category: "Heritage"
    },
    {
      id: "history-2",
      url: "/images/pexels-jibarofoto-2014775.jpg",
      alt: "Parish community gathered together",
      category: "Community"
    },
    {
      id: "history-3", 
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "Church mission and ministry",
      category: "Mission"
    },
    {
      id: "history-4",
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Vision for the future",
      category: "Vision"
    }
  ],
  news: [
    {
      id: "news-1",
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Lenten season preparation",
      category: "Liturgical Season"
    },
    {
      id: "news-2",
      url: "/images/pexels-jibarofoto-2014775.jpg",
      alt: "Parish pilgrimage",
      category: "Pilgrimage"
    },
    {
      id: "news-3",
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "First Holy Communion",
      category: "Sacraments"
    },
    {
      id: "news-4",
      url: "/images/pexels-pixababy-218480.jpg",
      alt: "Parish restoration project",
      category: "Parish Life"
    }
  ],
  cta: {
    priest: {
      url: "/images/pexels-brett-sayles-3633711.jpg",
      alt: "Meet Father Krisz - Our parish priest ready to guide and support our faith community"
    },
    venue: {
      url: "/images/pexels-shelaghmurphy-1666816.jpg",
      alt: "Beautiful church interior available for weddings and special celebrations"
    }
  },
  sacraments: [
    {
      sacrament: "baptism",
      url: "/images/sacraments/baptism.jpg",
      alt: "Baptism ceremony at St Saviour's"
    },
    {
      sacrament: "confirmation",
      url: "/images/sacraments/confirmation.jpg", 
      alt: "Confirmation ceremony at St Saviour's"
    },
    {
      sacrament: "eucharist",
      url: "/images/sacraments/eucharist.jpg",
      alt: "Holy Eucharist celebration"
    },
    {
      sacrament: "confession",
      url: "/images/sacraments/confession.jpg",
      alt: "Confession and reconciliation"
    },
    {
      sacrament: "anointing",
      url: "/images/sacraments/anointing.jpg",
      alt: "Anointing of the sick"
    },
    {
      sacrament: "orders", 
      url: "/images/sacraments/orders.jpg",
      alt: "Holy Orders ordination"
    },
    {
      sacrament: "matrimony",
      url: "/images/sacraments/matrimony.jpg",
      alt: "Wedding ceremony at St Saviour's"
    }
  ],
  pages: {
    "about-us": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "About St Saviour's Catholic Church - Beautiful interior showing our community space"
    },
    "contact-us": {
      url: "/images/pexels-pixabay-248199.jpg", 
      alt: "Contact St Saviour's Catholic Church - Visit us in the heart of Lewisham"
    },
    "mass": {
      url: "/images/pexels-jibarofoto-2014775.jpg",
      alt: "Mass times and services at St Saviour's Catholic Church"
    },
    "mass-times": {
      url: "/images/pexels-jibarofoto-2014775.jpg",
      alt: "Mass times and services at St Saviour's Catholic Church"
    },
    "find-us": {
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "Find St Saviour's Catholic Church in Lewisham, South East London"
    },
    "donate": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Support St Saviour's Catholic Church - Your donations help our community"
    },
    "venue-hire": {
      url: "/images/pexels-shelaghmurphy-1666816.jpg",
      alt: "Venue hire at St Saviour's - Beautiful spaces for your special occasions"
    },
    "gallery": {
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "Photo gallery of St Saviour's Catholic Church events and community"
    },
    "streaming": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Live streaming services - Join us online for Mass and prayer"
    },
    "podcasts": {
      url: "/images/pexels-brett-sayles-3633711.jpg",
      alt: "St Saviour's podcasts and talks - Spiritual formation and teaching"
    },
    "news": {
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Latest news and updates from St Saviour's Catholic Church"
    },
    "parish-groups": {
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Parish groups and ministries - Get involved in our community"
    },
    "the-sacraments": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "The Seven Sacraments at St Saviour's Catholic Church"
    },
    "privacy-policy": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Privacy policy - St Saviour's Catholic Church"
    },
    "cookie-policy": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Cookie policy - St Saviour's Catholic Church"
    },
    "accessibility-statement": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Accessibility statement - St Saviour's Catholic Church"
    },
    "safeguarding": {
      url: "/images/pexels-pixabay-218480.jpg",
      alt: "Safeguarding at St Saviour's Catholic Church - Protecting our community"
    },
    "st-saviours-primary-school": {
      url: "/images/pexels-pixabay-248199.jpg",
      alt: "St Saviour's Catholic Primary School - Nurturing young minds in faith and learning"
    },
    "st-saviours-talks": {
      url: "/images/pexels-brett-sayles-3633711.jpg",
      alt: "St Saviour's Talks - Inspiring spiritual formation and Catholic teaching"
    },
    "weekly-newsletter": {
      url: "/images/pexels-pixabay-208216.jpg",
      alt: "Weekly newsletter - Stay connected with St Saviour's parish community"
    }
  }
};

// Get website images (in future, this can fetch from API)
export function getCMSImages() {
  return defaultImages;
}

// Get logo
export function getLogo() {
  const images = getCMSImages();
  return images.logo;
}

// Get hero images
export function getHeroImages() {
  const images = getCMSImages();
  return images.hero;
}

// Get history section images
export function getHistoryImages() {
  const images = getCMSImages();
  return images.history;
}

// Get news section images
export function getNewsImages() {
  const images = getCMSImages();
  return images.news;
}

// Get CTA section images
export function getCTAImages() {
  const images = getCMSImages();
  return images.cta;
}

// Get sacrament images
export function getSacramentImages() {
  const images = getCMSImages();
  return images.sacraments;
}

// Get specific sacrament image
export function getSacramentImage(sacramentName: string) {
  const sacraments = getSacramentImages();
  return sacraments.find(s => s.sacrament === sacramentName);
}

// Get page hero images
export function getPageImage(pageName: string) {
  const images = getCMSImages();
  return images.pages[pageName as keyof typeof images.pages];
}

// Get specific news image by index
export function getNewsImage(index: number) {
  const newsImages = getNewsImages();
  return newsImages[index] || newsImages[0]; // Fallback to first image
}

// Get specific history image by index
export function getHistoryImage(index: number) {
  const historyImages = getHistoryImages();
  return historyImages[index] || historyImages[0]; // Fallback to first image
}