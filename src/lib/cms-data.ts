// CMS Data structure for file-based content management
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generic file operations
export function readJsonFile(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

export function writeJsonFile(filename: string, data: any) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// News Articles
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  published: boolean;
  slug: string;
}

export function getNewsArticles(): NewsArticle[] {
  const articles = readJsonFile('news.json');
  return articles || [];
}

export function saveNewsArticles(articles: NewsArticle[]) {
  return writeJsonFile('news.json', articles);
}

// Events
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  category: string;
  image?: string;
  contactPerson?: string;
  contactEmail?: string;
  maxAttendees?: number;
  registrationRequired: boolean;
  published: boolean;
}

export function getEvents(): Event[] {
  const events = readJsonFile('events.json');
  return events || [];
}

export function saveEvents(events: Event[]) {
  return writeJsonFile('events.json', events);
}

// Mass Times
export interface MassTime {
  day: string;
  services: {
    time: string;
    type: string;
    description: string;
    language?: string;
    celebrant?: string;
  }[];
}

export function getMassTimes(): MassTime[] {
  const massTimes = readJsonFile('mass-times.json');
  return massTimes || [];
}

export function saveMassTimes(massTimes: MassTime[]) {
  return writeJsonFile('mass-times.json', massTimes);
}

// Website Settings
export interface WebsiteSettings {
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
    assistantPriest?: string;
    diocese: string;
    established: string;
    charityNumber?: string;
    officeHours?: {
      days: string;
      time: string;
    };
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
  images: {
    logo: string;
    hero: Array<{
      id: string;
      url: string;
      alt: string;
      title: string;
      subtitle: string;
      overlay: string;
      priority: boolean;
    }>;
    history: Array<{
      id: string;
      url: string;
      alt: string;
      category: string;
    }>;
    news: Array<{
      id: string;
      url: string;
      alt: string;
      category: string;
    }>;
    cta: {
      priest: {
        url: string;
        alt: string;
      };
      venue: {
        url: string;
        alt: string;
      };
    };
    sacraments: Array<{
      sacrament: string;
      url: string;
      alt: string;
    }>;
    pages: {
      [pageName: string]: {
        url: string;
        alt: string;
      };
    };
  };
}

export function getWebsiteSettings(): WebsiteSettings {
  const settings = readJsonFile('settings.json');
  return settings || getDefaultSettings();
}

export function saveWebsiteSettings(settings: WebsiteSettings) {
  return writeJsonFile('settings.json', settings);
}

function getDefaultSettings(): WebsiteSettings {
  return {
    contact: {
      address: "Brockley Rise, London SE23 1NG",
      phone: "020 8852 7411",
      email: "parish@saintsaviours.org.uk",
      emergencyPhone: "999",
      safeguardingPhone: "020 8858 2854"
    },
    parish: {
      name: "St Saviour's Catholic Church",
      location: "Lewisham",
      priest: "Fr Krisz Katona",
      assistantPriest: "Revd. Carlos Lozano",
      diocese: "Southwark",
      established: "1889",
      charityNumber: "1234567",
      officeHours: {
        days: "Mon-Fri",
        time: "9:00 AM - 5:00 PM"
      }
    },
    social: {
      facebook: "https://www.facebook.com/stsaviourslewisham",
      youtube: "https://www.youtube.com/@stsaviourslewisham",
      instagram: "",
      twitter: ""
    },
    website: {
      announcements: [],
      maintenanceMode: false,
      liveStreamEnabled: true,
      liveStreamUrl: "https://www.youtube.com/@stsaviourslewisham/live",
      donationsEnabled: true,
      donationsUrl: "https://donate.givealittle.co/campaigns/st-saviours-lewisham"
    },
    features: {
      massBooking: false,
      eventRegistration: true,
      newsletter: true,
      prayerRequests: true,
      venueHire: true
    },
    images: {
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
          url: "/images/pages/about-us.jpg",
          alt: "About St Saviour's Catholic Church"
        },
        "contact-us": {
          url: "/images/pages/contact-us.jpg", 
          alt: "Contact St Saviour's Catholic Church"
        },
        "mass-times": {
          url: "/images/pages/mass-times.jpg",
          alt: "Mass times at St Saviour's"
        },
        "find-us": {
          url: "/images/pages/find-us.jpg",
          alt: "Find St Saviour's Catholic Church"
        },
        "donate": {
          url: "/images/pages/donate.jpg",
          alt: "Support St Saviour's Catholic Church"
        },
        "venue-hire": {
          url: "/images/pages/venue-hire.jpg",
          alt: "Venue hire at St Saviour's"
        },
        "gallery": {
          url: "/images/pages/gallery.jpg",
          alt: "Photo gallery of St Saviour's"
        },
        "streaming": {
          url: "/images/pages/streaming.jpg",
          alt: "Live streaming services"
        },
        "podcasts": {
          url: "/images/pages/podcasts.jpg",
          alt: "St Saviour's podcasts and talks"
        }
      }
    }
  };
}

// Parish Groups
export interface ParishGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  meetingTime: string;
  location: string;
  contact: string;
  contactPhone?: string;
  email?: string;
  active: boolean;
  newMembersWelcome: boolean;
  ageRange?: string;
  note?: string;
}

export function getParishGroups(): ParishGroup[] {
  const groups = readJsonFile('parish-groups.json');
  return groups || [];
}

export function saveParishGroups(groups: ParishGroup[]) {
  return writeJsonFile('parish-groups.json', groups);
}

// Gallery Albums
export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  images: GalleryImage[];
  featured: boolean;
  published: boolean;
}

export function getGalleryAlbums(): GalleryAlbum[] {
  const albums = readJsonFile('gallery.json');
  return albums || [];
}

export function saveGalleryAlbums(albums: GalleryAlbum[]) {
  return writeJsonFile('gallery.json', albums);
}

// Utility functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Initialize default data if files don't exist
export function initializeDefaultData() {
  ensureDataDir();
  
  // Initialize news if doesn't exist
  if (!readJsonFile('news.json')) {
    const defaultNews: NewsArticle[] = [
      {
        id: generateId(),
        title: "Welcome to Our New Website",
        excerpt: "We're excited to launch our new parish website with enhanced features for our community.",
        content: "We're delighted to introduce our new parish website, designed to better serve our community and provide easy access to information about our services, events, and parish life. The new site features improved accessibility, mobile responsiveness, and user-friendly navigation.",
        image: "/images/news/new-website.jpg",
        category: "Announcement",
        date: new Date().toISOString().split('T')[0],
        readTime: 2,
        author: "Parish Office",
        published: true,
        slug: "welcome-to-our-new-website"
      }
    ];
    saveNewsArticles(defaultNews);
  }

  // Initialize events if doesn't exist
  if (!readJsonFile('events.json')) {
    const defaultEvents: Event[] = [
      {
        id: generateId(),
        title: "Sunday Mass",
        description: "Join us for our regular Sunday Mass",
        date: "2025-07-06",
        time: "10:00 AM",
        duration: "1 hour",
        location: "Main Church",
        category: "Mass",
        registrationRequired: false,
        published: true
      }
    ];
    saveEvents(defaultEvents);
  }

  // Initialize settings if doesn't exist
  if (!readJsonFile('settings.json')) {
    saveWebsiteSettings(getDefaultSettings());
  }
}