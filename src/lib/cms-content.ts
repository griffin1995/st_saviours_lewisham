// CMS Content utilities for retrieving all content from settings
// Client-side version that uses CMS data structure

import { WebsiteSettings } from './cms-data';

// Default CMS content structure - this should match the CMS settings.json
const defaultContent: WebsiteSettings = {
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
    announcements: [
      {
        id: "ann-001",
        title: "Welcome to Our New Website",
        message: "Explore our enhanced features including live streaming and online Mass times.",
        type: "info",
        active: true,
        showUntil: "2025-03-01"
      }
    ],
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

// Get all CMS content (in future, this can fetch from API)
export function getCMSContent(): WebsiteSettings {
  return defaultContent;
}

// **PARISH INFORMATION**
export function getParishInfo() {
  const content = getCMSContent();
  return content.parish;
}

export function getParishName() {
  const parish = getParishInfo();
  return parish.name;
}

export function getParishLocation() {
  const parish = getParishInfo();
  return parish.location;
}

export function getParishPriest() {
  const parish = getParishInfo();
  return parish.priest;
}

export function getParishDiocese() {
  const parish = getParishInfo();
  return parish.diocese;
}

export function getParishEstablished() {
  const parish = getParishInfo();
  return parish.established;
}

export function getAssistantPriest() {
  const parish = getParishInfo();
  return parish.assistantPriest || '';
}

export function getParishCharityNumber() {
  const parish = getParishInfo();
  return parish.charityNumber || '';
}

export function getOfficeHours() {
  const parish = getParishInfo();
  return parish.officeHours || { days: 'Mon-Fri', time: '9:00 AM - 5:00 PM' };
}

// **CONTACT INFORMATION**
export function getContactInfo() {
  const content = getCMSContent();
  return content.contact;
}

export function getContactAddress() {
  const contact = getContactInfo();
  return contact.address;
}

export function getContactPhone() {
  const contact = getContactInfo();
  return contact.phone;
}

export function getContactEmail() {
  const contact = getContactInfo();
  return contact.email;
}

export function getEmergencyPhone() {
  const contact = getContactInfo();
  return contact.emergencyPhone;
}

export function getSafeguardingPhone() {
  const contact = getContactInfo();
  return contact.safeguardingPhone;
}

// **SOCIAL MEDIA**
export function getSocialMedia() {
  const content = getCMSContent();
  return content.social;
}

export function getFacebookUrl() {
  const social = getSocialMedia();
  return social.facebook;
}

export function getYouTubeUrl() {
  const social = getSocialMedia();
  return social.youtube;
}

export function getInstagramUrl() {
  const social = getSocialMedia();
  return social.instagram;
}

export function getTwitterUrl() {
  const social = getSocialMedia();
  return social.twitter;
}

// **WEBSITE SETTINGS**
export function getWebsiteSettings() {
  const content = getCMSContent();
  return content.website;
}

export function getAnnouncements() {
  const website = getWebsiteSettings();
  return website.announcements.filter(ann => ann.active);
}

export function isMaintenanceMode() {
  const website = getWebsiteSettings();
  return website.maintenanceMode;
}

export function isLiveStreamEnabled() {
  const website = getWebsiteSettings();
  return website.liveStreamEnabled;
}

export function getLiveStreamUrl() {
  const website = getWebsiteSettings();
  return website.liveStreamUrl;
}

export function isDonationsEnabled() {
  const website = getWebsiteSettings();
  return website.donationsEnabled;
}

export function getDonationsUrl() {
  const website = getWebsiteSettings();
  return website.donationsUrl;
}

// **FEATURES**
export function getFeatures() {
  const content = getCMSContent();
  return content.features;
}

export function isMassBookingEnabled() {
  const features = getFeatures();
  return features.massBooking;
}

export function isEventRegistrationEnabled() {
  const features = getFeatures();
  return features.eventRegistration;
}

export function isNewsletterEnabled() {
  const features = getFeatures();
  return features.newsletter;
}

export function isPrayerRequestsEnabled() {
  const features = getFeatures();
  return features.prayerRequests;
}

export function isVenueHireEnabled() {
  const features = getFeatures();
  return features.venueHire;
}

// **HERO CONTENT**
export function getHeroContent() {
  const content = getCMSContent();
  return content.images.hero;
}

export function getHeroTitles() {
  const hero = getHeroContent();
  return hero.map(h => ({ title: h.title, subtitle: h.subtitle }));
}

// **COMBINED UTILITIES**
export function getFullParishName() {
  const parish = getParishInfo();
  return `${parish.name}, ${parish.location}`;
}

export function getContactDisplay() {
  const contact = getContactInfo();
  return {
    address: contact.address,
    phone: contact.phone,
    email: contact.email
  };
}

export function getSocialLinks() {
  const social = getSocialMedia();
  return [
    { name: 'Facebook', url: social.facebook, active: !!social.facebook },
    { name: 'YouTube', url: social.youtube, active: !!social.youtube },
    { name: 'Instagram', url: social.instagram, active: !!social.instagram },
    { name: 'Twitter', url: social.twitter, active: !!social.twitter }
  ].filter(link => link.active);
}