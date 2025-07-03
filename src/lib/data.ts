// Enhanced data arrays with 2025 Catholic church content
export const newsArticles = [
  {
    id: 1,
    title: "Lenten Journey 2025: Walking with Christ",
    excerpt: "Prepare your heart for Easter with our special Lenten programme including Stations of the Cross, prayer groups, and spiritual direction.",
    image: "/images/hands-up-praising.jpg",
    category: "Liturgical Season",
    date: "2025-02-28",
    readTime: 4,
  },
  {
    id: 2,
    title: "Parish Pilgrimage to Walsingham",
    excerpt: "Join us on a spiritual journey to England's Nazareth, the National Shrine of Our Lady. Experience prayer, fellowship, and renewal.",
    image: "/images/mid-mass-priest-and-community.jpg", 
    category: "Pilgrimage",
    date: "2025-05-15",
    readTime: 3,
  },
  {
    id: 3,
    title: "First Holy Communion Programme 2025",
    excerpt: "Celebrating the children of our parish as they prepare to receive Jesus in the Eucharist for the first time. A beautiful milestone in faith.",
    image: "/images/painted-glass-jesus.jpg",
    category: "Sacraments",
    date: "2025-04-12",
    readTime: 3,
  },
  {
    id: 4,
    title: "Restoration of Sacred Heart Chapel",
    excerpt: "Thanks to your generous stewardship, we're restoring our beautiful Sacred Heart Chapel with new lighting and prayer space.",
    image: "/images/inside-church-3-glass-windows.jpg",
    category: "Parish Life",
    date: "2025-01-20",
    readTime: 5,
  }
];

export const upcomingEvents = [
  {
    id: 1,
    title: "Ash Wednesday - Beginning of Lent",
    description: "Mark the beginning of our Lenten journey with the ancient tradition of receiving ashes. Join us for Mass and the distribution of blessed ashes as we prepare our hearts for Easter.",
    date: "2025-03-05",
    time: "7:30 AM, 12:15 PM, 7:00 PM",
    duration: "45 minutes",
    location: "Main Church",
    category: "Liturgical Season"
  },
  {
    id: 2,
    title: "Adoration of the Blessed Sacrament",
    description: "Come and spend time with our Lord in the Blessed Sacrament. A peaceful time for prayer, reflection, and spiritual renewal every Thursday evening.",
    date: "2025-02-20",
    time: "7:00 PM - 8:00 PM",
    duration: "1 hour",
    location: "Lady Chapel",
    category: "Eucharistic Adoration"
  },
  {
    id: 3,
    title: "Stations of the Cross",
    description: "Walk with Jesus on His path to Calvary. This beautiful devotion helps us meditate on Christ's passion and our call to follow Him faithfully.",
    date: "2025-03-07",
    time: "7:30 PM",
    duration: "30 minutes",
    location: "Main Church",
    category: "Lenten Devotion"
  },
  {
    id: 4,
    title: "Confirmation Programme Information",
    description: "For young people aged 14+ seeking to be sealed with the Holy Spirit. Information meeting for candidates and parents about our Confirmation preparation.",
    date: "2025-02-25",
    time: "6:30 PM",
    duration: "1.5 hours",
    location: "Parish Centre",
    category: "Sacraments"
  },
  {
    id: 5,
    title: "Our Lady of Fatima Devotions",
    description: "Join us for the monthly rosary and prayers honouring Our Lady of Fatima. Includes exposition of the Blessed Sacrament and benediction.",
    date: "2025-03-13",
    time: "7:00 PM",
    duration: "45 minutes",
    location: "Our Lady's Chapel",
    category: "Marian Devotion"
  },
  {
    id: 6,
    title: "Parish Retreat Day: 'Growing in Holiness'",
    description: "A day of prayer, reflection, and spiritual renewal led by Fr. Michael. Includes talks, quiet prayer time, and Mass.",
    date: "2025-03-22",
    time: "9:30 AM - 4:00 PM",
    duration: "6.5 hours",
    location: "Parish Hall & Church",
    category: "Spiritual Formation"
  }
];

export const historyCards = [
  {
    id: 1,
    title: "Our Foundation",
    description: "St Saviour's was established in 1872 during the great Catholic revival in England, built to serve the growing immigrant community in Lewisham.",
    image: "/images/pexels-pixabay-208216.jpg",
    category: "Heritage",
    link: "/history",
    linkText: "Learn About Our History",
    year: 1872
  },
  {
    id: 2,
    title: "Our Community",
    description: "Today we are a vibrant parish of over 800 families, representing dozens of nationalities united in faith and fellowship.",
    image: "/images/pexels-jibarofoto-2014775.jpg",
    category: "Community",
    link: "/community",
    linkText: "Meet Our Community",
    year: 2025
  },
  {
    id: 3,
    title: "Our Mission",
    description: "We are called to be disciples of Jesus Christ, serving God and neighbour through worship, formation, fellowship, and outreach.",
    image: "/images/pexels-pixabay-248199.jpg",
    category: "Mission", 
    link: "/mission",
    linkText: "Discover Our Mission",
    year: null
  },
  {
    id: 4,
    title: "Our Future",
    description: "Together we build the Kingdom of God, fostering vocations, strengthening families, and reaching out to those in need.",
    image: "/images/pexels-pixabay-218480.jpg",
    category: "Vision",
    link: "/vision",
    linkText: "Our Vision for Tomorrow",
    year: null
  }
];

export const heroImages = [
  {
    image: "/images/pexels-pixabay-218480.jpg",
    alt: "Beautiful interior of St Saviour's Catholic Church showing altar and pews filled with warm light",
    title: "Welcome to St Saviour's Catholic Church",
    subtitle: "A community of faith in the heart of Lewisham",
    overlay: "from-black/60 via-black/40 to-black/60",
    priority: true, // First image should load with priority
  },
  {
    image: "/images/pexels-jibarofoto-2014775.jpg",
    alt: "Congregation gathered in prayer during Mass at St Saviour's Catholic Church",
    title: "Join Us in Prayer and Fellowship",
    subtitle: "Discover the warmth of our parish family",
    overlay: "from-black/70 via-black/30 to-black/50",
    priority: false,
  },
  {
    image: "/images/pexels-pixabay-248199.jpg",
    alt: "Stunning Gothic architecture and stained glass windows of our historic Victorian church",
    title: "A Place of Sacred Beauty",
    subtitle: "Experience our historic Victorian church",
    overlay: "from-black/60 via-black/40 to-black/60",
    priority: false,
  },
  {
    image: "/images/pexels-pixabay-208216.jpg",
    alt: "Diverse parish community celebrating together at St Saviour's, showing families and individuals of all ages",
    title: "Growing in Faith Together",
    subtitle: "All are welcome in God's house",
    overlay: "from-black/60 via-black/40 to-black/60",
    priority: false,
  },
];

// Mass Timings - Admin configurable data structure
export const massTimings = {
  // Sunday Masses
  sunday: [
    { time: "8:30 AM", type: "Sunday Mass", description: "Morning worship" },
    { time: "10:00 AM", type: "Sunday Mass", description: "Family Mass" },
    { time: "11:30 AM", type: "Sunday Mass", description: "Main celebration" },
    { time: "2:00 PM", type: "Spanish Mass", description: "1st and 3rd Sundays only" },
    { time: "5:30 PM", type: "Sunday Mass", description: "Evening service" },
  ],
  
  // Saturday (includes Saturday vigil)
  saturday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "12:00 PM", type: "Pilgrim Mass", description: "Special intention Mass" },
    { time: "5:30 PM", type: "Saturday Vigil", description: "Sunday obligation Mass" },
    { time: "6:30 PM", type: "Weekday Mass", description: "Evening Mass" },
  ],
  
  // Monday
  monday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "6:30 PM", type: "Weekday Mass", description: "Evening Mass" },
  ],
  
  // Tuesday (includes Pilgrim Mass)
  tuesday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "6:30 PM", type: "Pilgrim Mass", description: "Special intention Mass" },
  ],
  
  // Wednesday
  wednesday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "6:30 PM", type: "Weekday Mass", description: "Evening Mass" },
  ],
  
  // Thursday
  thursday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "6:30 PM", type: "Weekday Mass", description: "Evening Mass" },
  ],
  
  // Friday
  friday: [
    { time: "10:00 AM", type: "Weekday Mass", description: "Morning Mass" },
    { time: "6:30 PM", type: "Weekday Mass", description: "Evening Mass" },
  ],
};

// Confession times in array format for easy display
export const confessionTimes = [
  { day: "Tuesday", time: "6:00-6:20 PM", note: "Before evening Mass" },
  { day: "Wednesday", time: "6:00-6:20 PM", note: "Before evening Mass" },
  { day: "Thursday", time: "7:00-7:20 PM", note: "After evening Mass" },
  { day: "Friday", time: "6:00-6:20 PM", note: "Before evening Mass" },
  { day: "Saturday", time: "11:00 AM-12:00 PM", note: "Before Pilgrim Mass" },
];

// Adoration times in array format for easy display
export const adorationTimes = [
  { day: "Thursday", time: "10:30 AM-12:00 PM", description: "Morning Adoration" },
  { day: "Thursday", time: "7:00-7:30 PM", description: "Evening Adoration (ends with Benediction)" },
  { day: "Saturday", time: "10:30 AM-12:00 PM", description: "Morning Adoration" },
];

// Additional services and timings
export const additionalServices = {
  confessions: {
    tuesday: { time: "6:00-6:20 PM", description: "Before evening Mass" },
    wednesday: { time: "6:00-6:20 PM", description: "Before evening Mass" },
    thursday: { time: "7:00-7:20 PM", description: "After evening Mass" },
    friday: { time: "6:00-6:20 PM", description: "Before evening Mass" },
    saturday: { time: "11:00 AM-12:00 PM", description: "Before Pilgrim Mass" },
    note: "Please ask at other times"
  },
  
  exposition: {
    thursday: [
      { time: "10:30 AM-12:00 PM", description: "Morning Adoration" },
      { time: "7:00-7:30 PM", description: "Evening Adoration (ends with Benediction)" }
    ],
    saturday: [
      { time: "10:30 AM-12:00 PM", description: "Morning Adoration" }
    ]
  },
  
  streaming: {
    daily10am: "The 10am Mass recorded every day",
    live: "All other events are live-streamed"
  },
  
  churchOpen: {
    daily: "8:30 AM until after evening Mass",
    bankHolidays: "Closed at 11:00 AM"
  },
  
  repository: {
    tuesday: ["9:30-10:00 AM", "10:30-11:00 AM"],
    thursday: ["9:30-10:00 AM", "10:30-11:00 AM"],
    friday: ["9:30-10:00 AM", "10:30-11:00 AM", "6:00-6:30 PM"],
    saturday: ["9:30-10:00 AM", "10:30-12:00 PM"],
    sunday: "Half an hour before & after every morning Mass"
  },
  
  specialEvents: {
    tamilMass: {
      frequency: "Second Sunday of month",
      time: "3:30 PM",
      description: "Tamil language Mass"
    },
    fatimaNovena: {
      frequency: "1st Saturday of the month",
      time: "After 10:00 AM Mass",
      description: "Novena to Our Lady of Fatima"
    },
    rosary: {
      mondayToThursday: "After 10:00 AM Mass",
      friday: "9:30 AM (before 10:00 AM Mass)"
    }
  },
  
  chaplaincy: {
    hospital: "Lewisham Hospital",
    chaplain: "Fr Christian",
    phone: "07436 051067",
    teamPhone: "0208 333 3299"
  }
};

// Helper function to get today's services
export const getTodaysServices = () => {
  const today = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayName = dayNames[today.getDay()] as keyof typeof massTimings;
  
  return massTimings[todayName] || [];
};

// Legacy export for backwards compatibility (can be removed later)
export const todaysServices = getTodaysServices();

export const navigationMenu = [
  {
    name: "About",
    href: "/about-us",
    dropdown: [
      { name: "About Us", href: "/about-us" },
      { name: "Find Us", href: "/find-us" },
      { name: "Our History", href: "/about-us#history" },
      { name: "Parish Priest", href: "/about-us#leadership" },
    ]
  },
  {
    name: "Faith & Worship",
    href: "/mass", 
    dropdown: [
      { name: "Mass Times", href: "/mass" },
      { name: "The Sacraments", href: "/the-sacraments" },
      { name: "Baptism", href: "/the-sacraments/baptism" },
      { name: "Confirmation", href: "/the-sacraments/confirmation" },
      { name: "The Eucharist", href: "/the-sacraments/the-eucharist" },
      { name: "Confession", href: "/the-sacraments/confession" },
      { name: "Marriage", href: "/the-sacraments/matrimony" },
      { name: "Holy Orders", href: "/the-sacraments/holy-orders" },
      { name: "Anointing of the Sick", href: "/the-sacraments/anointing-of-the-sick" },
    ]
  },
  {
    name: "Community",
    href: "/news",
    dropdown: [
      { name: "Parish News", href: "/news" },
      { name: "Parish Groups", href: "/parish-groups" },
      { name: "Weekly Newsletter", href: "/weekly-newsletter" },
      { name: "St Saviour's Talks", href: "/st-saviours-talks" },
      { name: "Gallery", href: "/gallery" },
      { name: "Streaming", href: "/streaming" },
      { name: "Podcasts", href: "/podcasts" },
    ]
  },
  {
    name: "School",
    href: "/st-saviours-primary-school",
    dropdown: [
      { name: "About Our School", href: "/st-saviours-primary-school" },
      { name: "Admissions", href: "/st-saviours-primary-school#admissions" },
      { name: "School Tours", href: "/st-saviours-primary-school#visit" },
      { name: "School Values", href: "/st-saviours-primary-school#values" },
    ]
  },
  {
    name: "Contact & Support",
    href: "/contact-us",
    dropdown: [
      { name: "Contact Us", href: "/contact-us" },
      { name: "Venue Hire", href: "/venue-hire" },
      { name: "Emergency Contact", href: "/contact-us#emergency" },
      { name: "Safeguarding", href: "/safeguarding" },
    ]
  }
];

// Legacy navigation menu for reference during migration
export const legacyNavigationMenu = [
  {
    name: "About",
    href: "/about",
    dropdown: [
      { name: "Our Parish", href: "/parish" },
      { name: "Parish History", href: "/history" },
      { name: "Parish Priest", href: "/priest" },
      { name: "Parish Staff", href: "/staff" },
      { name: "Parish Council", href: "/council" },
    ]
  },
  {
    name: "Services",
    href: "/services", 
    dropdown: [
      { name: "Mass Times", href: "/mass-times" },
      { name: "Sacraments", href: "/sacraments" },
      { name: "Baptism", href: "/baptism" },
      { name: "Marriage", href: "/marriage" },
      { name: "Funerals", href: "/funerals" },
      { name: "Confession", href: "/confession" },
    ]
  },
  {
    name: "What's On",
    href: "/events",
    dropdown: [
      { name: "Events Calendar", href: "/events" },
      { name: "Parish News", href: "/news" },
      { name: "Youth Groups", href: "/youth" },
      { name: "Adult Faith Formation", href: "/adult-faith" },
      { name: "Children's Liturgy", href: "/childrens-liturgy" },
    ]
  },
  {
    name: "Get Involved",
    href: "/get-involved",
    dropdown: [
      { name: "Volunteer", href: "/volunteer" },
      { name: "Donations", href: "/donate" },
      { name: "Parish Groups", href: "/groups" },
      { name: "Music Ministry", href: "/music" },
      { name: "Readers & Ministers", href: "/ministers" },
    ]
  },
  {
    name: "Contact",
    href: "/contact",
    dropdown: [
      { name: "Get in Touch", href: "/contact" },
      { name: "Parish Office", href: "/office" },
      { name: "Directions", href: "/directions" },
      { name: "Emergency", href: "/emergency" },
    ]
  }
];