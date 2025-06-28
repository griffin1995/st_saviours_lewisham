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
      diocese: "Southwark",
      established: "1889"
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