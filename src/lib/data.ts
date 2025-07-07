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
    description: "St Saviour's was established in 1894 during the great Catholic revival in England, built to serve the growing immigrant community in Lewisham.",
    image: "/images/st_saviours_interior_1939_archive_photo.jpeg",
    category: "Heritage",
    link: "/about-us#history",
    linkText: "Learn About Our History",
    year: 1894
  },
  {
    id: 2,
    title: "Our Community",
    description: "Today we are a vibrant parish of over 500 families, representing dozens of nationalities united in faith and fellowship.",
    image: "/images/st_saviours_frontage_war_memorial.jpeg",
    category: "Community",
    link: "/about-us",
    linkText: "Meet Our Community",
    year: 2025
  },
  {
    id: 3,
    title: "Sacred Spaces",
    description: "Our beautiful church features sacred chapels including St Patrick's Chapel and stained glass commemorating English martyrs like St Margaret Clitherow.",
    image: "/images/chapel_st_patrick_st_saviours.jpeg",
    category: "Architecture", 
    link: "/about-us#history",
    linkText: "Explore Our Sacred Spaces",
    year: null
  },
  {
    id: 4,
    title: "Honoring Saints",
    description: "Our church celebrates the witness of saints and martyrs through beautiful stained glass windows and dedicated prayer spaces.",
    image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
    category: "Saints",
    link: "/about-us#history",
    linkText: "Discover Our Saints",
    year: null
  }
];

export const heroImages = [
  {
    image: "/images/st_saviours_frontage_war_memorial.jpeg",
    alt: "St Saviour's Catholic Church frontage with war memorial, showing our commitment to remembrance and community",
    title: "Welcome to St Saviour's Catholic Church",
    subtitle: "A community of faith in the heart of Lewisham",
    overlay: "from-black/60 via-black/40 to-black/60",
    priority: true, // First image should load with priority
  },
  {
    image: "/images/chapel_st_patrick_st_saviours.jpeg",
    alt: "The beautiful Chapel of St Patrick within St Saviour's Church, a place of quiet prayer and devotion",
    title: "Sacred Spaces for Prayer",
    subtitle: "Discover the beauty of our chapels and prayer areas",
    overlay: "from-black/70 via-black/30 to-black/50",
    priority: false,
  },
  {
    image: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
    alt: "Stunning stained glass window of St Margaret Clitherow, commemorating English Catholic martyrs",
    title: "Honoring Our Saints",
    subtitle: "Beautiful stained glass windows tell stories of faith",
    overlay: "from-black/60 via-black/40 to-black/60",
    priority: false,
  },
  {
    image: "/images/st_saviours_interior_1939_archive_photo.jpeg",
    alt: "Historical interior photograph of St Saviour's Church from 1939, showing our rich heritage",
    title: "Our Rich Heritage",
    subtitle: "Over 130 years of faith and community",
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

// Knowledge Hub articles and data
export const knowledgeHubArticles = [
  {
    id: 1,
    title: "Peter Abelard: The Philosopher of Love",
    excerpt: "Discover the profound theological insights of this 12th-century philosopher who developed critical methodology for understanding the Catholic faith. Known for his relationship with Heloise, Abelard was also a deep theological thinker who challenged the Church to think more critically about faith.",
    content: "Peter Abelard (1079-1142) was one of the most influential philosophers and theologians of the medieval period. While he is often remembered for his tragic love affair with Heloise, his contributions to Catholic theology were profound and lasting. Abelard developed what became known as the 'critical methodology' for understanding the Catholic faith, emphasizing the importance of reason in theological inquiry. His work 'Sic et Non' (Yes and No) presented contradictory statements from Church authorities, encouraging readers to use reason to resolve apparent contradictions in Christian doctrine. This approach was revolutionary for its time and laid the groundwork for the scholastic method that would dominate medieval theology.",
    category: "Medieval Theology",
    readTime: "8 min",
    publishedDate: "2025-01-15",
    image: "/images/inside-church-3-glass-windows.jpg",
    featured: true,
    tags: ["Philosophy", "Scholasticism", "Medieval", "Theology"]
  },
  {
    id: 2,
    title: "St Augustine of Hippo: The Doctor of Grace",
    excerpt: "Explore the life and teachings of one of the most influential theologians in Christian history, whose insights into grace, free will, and the nature of God continue to shape Catholic doctrine today.",
    content: "Coming soon...",
    category: "Church Fathers",
    readTime: "10 min",
    publishedDate: "Coming Soon",
    image: "/images/painted-glass-jesus.jpg",
    featured: false,
    tags: ["Church Fathers", "Grace", "Doctrine", "Patristics"]
  },
  {
    id: 3,
    title: "Julian of Norwich: Revelations of Divine Love",
    excerpt: "Journey into the mystical visions of England's first female theologian and her profound insights into God's love, showing how divine love encompasses all creation.",
    content: "Coming soon...",
    category: "English Mystics",
    readTime: "6 min",
    publishedDate: "Coming Soon",
    image: "/images/inside-church-aisle.jpg",
    featured: false,
    tags: ["Mysticism", "English Saints", "Divine Love", "Contemplation"]
  }
];

export const knowledgeHubCategories = [
  {
    id: 1,
    title: "Church Fathers",
    description: "Explore the foundational teachings of the early Church Fathers and their lasting impact on Catholic theology.",
    count: 3,
    color: "from-blue-600 to-blue-500",
    articles: [2]
  },
  {
    id: 2,
    title: "Medieval Theology",
    description: "Discover the scholastic tradition and the great theologians of the Middle Ages.",
    count: 2,
    color: "from-purple-600 to-purple-500",
    articles: [1]
  },
  {
    id: 3,
    title: "Catholic Mystics",
    description: "Learn from the contemplative saints and their profound spiritual experiences.",
    count: 4,
    color: "from-pink-600 to-pink-500",
    articles: [3]
  },
  {
    id: 4,
    title: "Modern Saints",
    description: "Study the lives and teachings of recent saints and their relevance to contemporary life.",
    count: 1,
    color: "from-green-600 to-green-500",
    articles: []
  }
];

// Community news articles (St Bakhita Group, Pope John Paul II relics, etc.)
export const communityNewsArticles = [
  {
    id: 1,
    title: "The St Bakhita Group Launches",
    excerpt: "A welcoming place for migrants and parishioners, the St Bakhita Group launched in April, following the formal installation of a specially commissioned statue of the Saint in February this year.",
    content: `A community rooted in prayer and welcome

A welcoming place for migrants and parishioners, the St Bakhita Group launched in April, following the formal installation of a specially commissioned statue of the Saint in February this year. With prayers led by Fr Kenneth Iwunna, the group meets on the first Wednesday of each month straight after Mass, in the main body of the church. Inspired by the life and witness of Saint Josephine Bakhita, the group offers a regular space for prayer, reflection, and community-building, with a focus on the experiences and concerns of migrants.

Each session includes prayer, a Scripture reading, time for reflection, and intercessions centred around key themes such as family life, the dignity of work, belonging, and community. A register is taken as a simple way to strengthen relationships and keep in touch.

The group lasts no more than an hour and offers a warm, welcoming space where people can come together, grow in faith, and support one another. As it continues to grow, the St Bakhita Group seeks to foster connection and offer a place of affirmation for migrant issues - a safe space of listening, prayer, and hope.

Although the group is rooted in migrant issues, the group is open to everyone - recognising that we are all on a journey of faith, seeking connection, hope, and shared understanding.

St Bakhita's Story

St Josephine Bakhita was born in the Darfur region of Sudan in 1869. The young niece of a Daju tribal king, she was born into a wealthy family. Her early life was marred by a series of tragic events and physical trauma. However, she would eventually overcome these trials, and her life would eventually take a dramatic new turn that involved a profound spiritual awakening that finally resulted in sainthood.

At the age of seven, her world was upturned. Kidnapped by slave traders, a harrowing experience in itself, she was propelled into a world of suffering and exploitation. Instead of being cowed by the brutality of her captivity and mistreatment, she developed a profound and wise understanding of humanity that shaped her saintly spiritual journey.

While a slave, St Bakhita was sold and resold many times. Eventually, she was sold into the household of the consul Michel Michieli, who brought her to Italy after he was repatriated. Her journey into Italy was a turning point. She came into contact with the Cannossian Daughters of Charity, who welcomed her into their convent community with compassion and kindness.

In such favourable surroundings St Bakhita flourished and began a journey of conversion, discernment and spiritual rebirth. She enthusiastically embraced Christianity, leading to her Baptism on January 9th, 1890, in her early 20s. She chose the name Josephine in tribute to St Joseph, who nurtured the Christ.

Following her baptism, Josephine entered the novitiate of the Cannossian Sisters. St Bakhita's journey from a harrowing life of slavery into one of religious service is a powerful testament to the transformative power of God's grace. St Bakhita died on February 8th, 1947, in Schio, near Vicenza in northern Italy.

A lesson of hope

St Bakhita's life story offers a poignant lens through which we view contemporary issues of migration, freedom, and resilience in the face of injustice. The saint endured the harrowing experience of slavery, ultimately found hope through the kindness of others and vitally, her faith in God. Today, her story has special resonance with countless individuals who are navigating similar struggles in a world fraught with displacement and uncertainty.

Here in London, a cosmopolitan city marked by diversity, the narratives of migrants and refugees are often overshadowed by political discourse and fear. To think about St Bakhita's journey is to acknowledge the transformative power of compassion and solidarity. Her resilience serves as a reminder that hope can thrive even in the darkest circumstances.`,
    category: "Community Groups",
    readTime: "8 min",
    publishedDate: "2025-01-10",
    image: "/images/devotion_to_saint_josephine_bakhita.jpeg",
    featured: true
  },
  {
    id: 2,
    title: "The Relics of Pope St John Paul II",
    excerpt: "On the feast of Corpus Christi, the relics of Pope St John Paul II were incorporated into St Saviour's. A special liturgy was celebrated to welcome the relic and to honor the pope.",
    content: `On the feast of Corpus Christi, the relics of Pope St John Paul II were incorporated into St Saviour's. A special liturgy was celebrated to welcome the relic and to honor the pope. The blessing of the relic was undertaken by Bishop Patrick Lynch. He blessed the relic and the faithful with a formula that included the saint's name and the Trinitarian invocation. The moving ceremony encourages faith, devotion and spiritual growth.

The ceremony of introducing a sacred relic into a Catholic Church is a solemn and reverent occasion. It incorporates prayers, scripture reading and hymns. The process typically involves a procession; a solemn liturgical celebration, the respectful exposition of the relic to the faithful, who are then invited to venerate and/or kiss the reliquary. The relic is then placed in a designated place in the Church. These relics are not worshipped themselves, but are venerated as a tangible connection to the saint or holy event.

St Saviour's is fortunate in that the relics of St John Paul II are designated first class (consisting of either body parts or blood). Veneration of relics is a way to honor the saints and to strengthen our faith, and when needed, to help seek their intercession for blessings and graces.

St John Paul II's enduring legacy

Karol Wojtyla, better known to us as Pope John Paul II was born on May 18th, 1920, in Wadowice, Poland. He became Pope in 1978. He died at the age of 84 on April 2nd, 2005, in the Vatican City. Beatified some six years later in 2011, he was canonised on April 27th, 2014, and his feast day is celebrated on October 22nd.

He was recognised as one of the world's most influential political world leaders of the second half of the 20th century. He set a new missionary standard for the leaders of the Catholic Church. He visited over 130 countries, published more than 50 major documents, canonized hundreds of saints and was an active appointer of bishops.

St John Paul II helped bring an end to the Cold War through his support of the Polish trade union Solidarity and the Polish freedom movement. His commitment to freedom, coupled with the political support of US President Reagan and the leadership of the European Union, he began a landslide that wiped out Communism in Eastern Europe and eventually the Soviet Union. Incredibly, it came about without a shot being fired.

In a world of competing economic and national self-interests, he was a powerful, intellectual voice for social justice and reconciliation. His administration promoted not only the power of Catholic liturgy, but also a commitment to equality of opportunity for all people, and their right to enjoy legal and social protections as well as religious freedom.

St John Paul II will also be remembered for greatly improving relations between Catholics, Jews and Muslims, beginning an ecumenical dialogue which is still followed today. St Saviour's is honoured to safeguard his relics.`,
    category: "Parish Events",
    readTime: "10 min",
    publishedDate: "2025-01-05",
    image: "/images/pope_st_john_paul_ii_portrait.jpeg",
    featured: true
  }
];

// Priest biographies
export const priestBiographies = [
  {
    id: 1,
    name: "Fr Krzysztof Krzyskow",
    title: "Parish Priest",
    bio: "Fr Krzysztof Krzyskow serves as the Parish Priest of St Saviour's Catholic Church, bringing years of pastoral experience and spiritual wisdom to guide our diverse community. His leadership has been instrumental in fostering a welcoming environment where parishioners from over 80 countries come together in faith and fellowship. Fr Krzysztof is known for his compassionate pastoral care, his dedication to the liturgy, and his commitment to building bridges across cultural and linguistic boundaries within our multicultural parish.",
    image: "/images/fr_krzysztof_krzyskow_parish_priest_st_saviours.jpeg",
    ordination: "Details to be updated",
    diocese: "Archdiocese of Southwark",
    specialties: ["Parish Leadership", "Multicultural Ministry", "Pastoral Care", "Liturgy"]
  },
  {
    id: 2,
    name: "Fr Kenneth Iwunna",
    title: "Assistant Priest",
    bio: "Fr Kenneth Iwunna brings energy and dedication to St Saviour's as an Assistant Priest, supporting our parish ministries and outreach programs. He has been particularly instrumental in leading the St Bakhita Group, which provides a welcoming space for migrants and focuses on issues of dignity, belonging, and community. Fr Kenneth's compassionate approach to ministry and his commitment to social justice make him a beloved figure within our parish community.",
    image: "/images/fr_kenneth_iwunna_assistant_priest_st_saviours.jpeg",
    ordination: "Details to be updated",
    diocese: "Archdiocese of Southwark", 
    specialties: ["Community Outreach", "Migrant Ministry", "St Bakhita Group", "Social Justice"]
  },
  {
    id: 3,
    name: "Fr Michael Colin Nixon",
    title: "Assistant Parish Priest",
    bio: "St Saviour's is honoured to have Father Michael Colin Nixon serve with the parish. He was ordained to the priesthood on February 17th, 2007, for the diocese of Galle, Sri Lanka which is situated in the Southern Province of Sri Lanka. Having served the diocese with distinction as a priest in different capacities, he was promoted to being the Secretary to the Bishop Dr. Raymond Kingsley Wickramasinghe. He was also Director of three apostolates, Canon of the Cathedral, and the Administrator/Rector of the National Shrine of our Lady of Matara. Additionally, he was also Pastor in Charge of Parishes, Chaplain for universities and the Mother Theresa Convent. Currently serving as a much beloved assistant priest at St. Saviour's, he heads up the church's Extraordinary Ministers of Holy Communion, is renowned for his piety, his in-depth knowledge of theology and the liturgy, and is a touchstone for the growing Sri Lankan community in the parish. Responsive and able to multi-task, he brings a wealth of administrative experience and practical wisdom, which is often utilized and welcomed by the parish's various social and evangelical group leaders.",
    image: "/images/fr_michael_colin_nixon_assistant_priest_st_saviours.jpeg",
    ordination: "February 17th, 2007",
    diocese: "Galle, Sri Lanka",
    specialties: ["Liturgy", "Theology", "Parish Administration", "Community Outreach"]
  }
];

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
      { name: "Community News", href: "/community-news" },
      { name: "Parish Groups", href: "/parish-groups" },
      { name: "Weekly Newsletter", href: "/weekly-newsletter" },
      { name: "St Saviour's Talks", href: "/st-saviours-talks" },
      { name: "Gallery", href: "/gallery" },
      { name: "Streaming", href: "/streaming" },
      { name: "Podcasts", href: "/podcasts" },
    ]
  },
  {
    name: "Knowledge Hub",
    href: "/knowledge-hub",
    dropdown: [
      { name: "Theology Articles", href: "/knowledge-hub" },
      { name: "Catholic Mystics", href: "/knowledge-hub#mystics" },
      { name: "Saints & Theologians", href: "/knowledge-hub#theologians" },
      { name: "Faith Formation", href: "/knowledge-hub#formation" },
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