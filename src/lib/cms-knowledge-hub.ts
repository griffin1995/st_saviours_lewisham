/**
 * Knowledge Hub CMS - Article Management System
 * 
 * Centralized content management for theology articles, saints, and mystics
 */

export interface KnowledgeHubArticle {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  author: string
  category: KnowledgeHubCategory
  tags: string[]
  readTime: string
  publishedDate: string
  lastModified?: string
  image: {
    src: string
    alt: string
    caption?: string
  }
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    canonicalUrl?: string
  }
  relatedArticles?: string[] // Article IDs
  bibliography?: string[]
  quotes?: Array<{
    text: string
    source: string
    citation?: string
  }>
}

export interface KnowledgeHubCategory {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  articleCount: number
  featured: boolean
}

export const knowledgeHubCategories: KnowledgeHubCategory[] = [
  {
    id: "church-fathers",
    slug: "church-fathers",
    title: "Church Fathers",
    description: "Explore the foundational teachings of the early Church Fathers and their lasting impact on Catholic theology.",
    icon: "BookOpen",
    color: "from-blue-600 to-blue-500",
    articleCount: 3,
    featured: true
  },
  {
    id: "medieval-theology",
    slug: "medieval-theology", 
    title: "Medieval Theology",
    description: "Discover the scholastic tradition and the great theologians of the Middle Ages.",
    icon: "AcademicCap",
    color: "from-purple-600 to-purple-500",
    articleCount: 2,
    featured: true
  },
  {
    id: "catholic-mystics",
    slug: "catholic-mystics",
    title: "Catholic Mystics",
    description: "Learn from the contemplative saints and their profound spiritual experiences.",
    icon: "Heart",
    color: "from-pink-600 to-pink-500",
    articleCount: 4,
    featured: true
  },
  {
    id: "modern-saints",
    slug: "modern-saints",
    title: "Modern Saints",
    description: "Study the lives and teachings of recent saints and their relevance to contemporary life.",
    icon: "Sparkles",
    color: "from-green-600 to-green-500",
    articleCount: 1,
    featured: false
  }
]

export const knowledgeHubArticles: KnowledgeHubArticle[] = [
  {
    id: "peter-abelard-philosopher-love",
    slug: "peter-abelard-philosopher-love",
    title: "Peter Abelard: The Philosopher of Love",
    subtitle: "Critical Methodology and the Scholastic Tradition",
    excerpt: "Discover the profound theological insights of this 12th-century philosopher who developed critical methodology for understanding the Catholic faith. Known for his relationship with Heloise, Abelard was also a deep theological thinker who challenged the Church to think more critically about faith.",
    content: `# Peter Abelard: The Philosopher of Love

## Introduction

Peter Abelard (1079-1142) was one of the most influential philosophers and theologians of the medieval period. While he is often remembered for his tragic love affair with Heloise, his contributions to Catholic theology were profound and lasting. Abelard developed what became known as the 'critical methodology' for understanding the Catholic faith, emphasizing the importance of reason in theological inquiry.

## Early Life and Education

Born in Le Pallet, near Nantes in Brittany, Abelard was the eldest son of a knight. Rather than pursuing a military career, he chose the path of learning, studying under some of the most renowned teachers of his time. His intellectual prowess quickly became apparent, and he soon began teaching himself, attracting students from across Europe.

## The Critical Methodology

Abelard's most significant contribution to theology was his work 'Sic et Non' (Yes and No), completed around 1120. This revolutionary text presented 158 theological questions, each followed by contradictory statements from Church authorities - the Bible, Church Fathers, and papal decrees.

### Key Principles:

1. **Doubt as a Tool for Truth**: Abelard argued that by doubting, we are led to inquiry, and by inquiry, we arrive at truth.

2. **Rational Investigation**: He believed that apparent contradictions in Christian doctrine could be resolved through careful rational analysis.

3. **Dialectical Method**: His approach involved examining opposing viewpoints to reach a deeper understanding of theological truths.

## The Scholastic Foundation

Abelard's methodology laid the groundwork for the scholastic tradition that would dominate medieval theology. His approach influenced later giants like Thomas Aquinas, who would perfect the synthesis of faith and reason.

### Impact on Medieval Thought:

- **University Development**: His teaching methods contributed to the rise of medieval universities
- **Theological Debate**: He established the importance of reasoned debate in theological education
- **Critical Thinking**: His emphasis on questioning authority encouraged intellectual independence

## Personal Struggles and Redemption

Abelard's life was marked by controversy and personal tragedy. His secret marriage to Heloise and subsequent forced separation led to profound spiritual reflection. After becoming a monk, he continued his theological work, though not without further conflicts with Church authorities.

## Love and Theology

Abelard's understanding of love was both personal and theological. He distinguished between different types of love:

1. **Carnal Love**: Physical attraction and desire
2. **Spiritual Love**: Love based on virtue and mutual respect  
3. **Divine Love**: The ultimate love that draws us to God

His famous letters with Heloise reveal a man grappling with these different dimensions of love, ultimately finding that human love, properly understood, can be a pathway to divine love.

## Legacy and Modern Relevance

Abelard's influence extends far beyond the medieval period:

### Theological Contributions:
- Development of moral theology
- Emphasis on intention in moral acts
- Integration of classical philosophy with Christian thought

### Educational Innovation:
- Question-based learning
- Dialectical method
- Critical analysis of authorities

## Conclusion

Peter Abelard remains a fascinating figure whose life and work embody the tension between reason and faith, human love and divine love, individual conscience and ecclesiastical authority. His critical methodology reminds us that faith strengthened by reason is more robust than faith that fears questioning.

For modern Catholics, Abelard's legacy encourages us to:
- Engage thoughtfully with our faith
- Ask difficult questions
- Seek understanding through both reason and revelation
- Recognize that human experiences, including love and suffering, can deepen our relationship with God

*"I must understand in order that I may believe" - this principle, though associated with Anselm, was embodied in Abelard's approach to theology, reminding us that faith and reason are not enemies but partners in the quest for truth.*

## Further Reading

- Gilson, Étienne. *Heloise and Abelard*
- Clanchy, M.T. *Abelard: A Medieval Life*
- Marenbon, John. *The Philosophy of Peter Abelard*
- McGrath, Alister. *Christian Theology: An Introduction*`,
    author: "St Saviour's Knowledge Hub",
    category: knowledgeHubCategories[1], // Medieval Theology
    tags: ["Philosophy", "Scholasticism", "Medieval", "Theology", "Love", "Reason", "Faith"],
    readTime: "12 min",
    publishedDate: "2025-01-15",
    lastModified: "2025-01-15",
    image: {
      src: "/images/stained_glass_st_margaret_clitherow_st_saviours.jpeg",
      alt: "Stained glass window of St Margaret Clitherow at St Saviour's Church",
      caption: "The stained glass window of St Margaret Clitherow represents the medieval tradition of honoring martyrs and theologians"
    },
    featured: true,
    status: "published",
    seo: {
      metaTitle: "Peter Abelard: The Philosopher of Love | Knowledge Hub | St Saviour's",
      metaDescription: "Discover Peter Abelard's revolutionary critical methodology and his profound impact on medieval theology. Learn how this 12th-century philosopher shaped Catholic thought.",
      keywords: ["Peter Abelard", "medieval theology", "scholasticism", "critical methodology", "Catholic philosophy", "faith and reason"],
      canonicalUrl: "/knowledge-hub/peter-abelard-philosopher-love"
    },
    relatedArticles: ["augustine-doctor-grace", "julian-norwich-revelations"],
    bibliography: [
      "Gilson, Étienne. Heloise and Abelard. University of Michigan Press, 1960.",
      "Clanchy, M.T. Abelard: A Medieval Life. Blackwell, 1997.",
      "Marenbon, John. The Philosophy of Peter Abelard. Cambridge University Press, 1997."
    ],
    quotes: [
      {
        text: "By doubting we are led to question, by questioning we arrive at the truth.",
        source: "Peter Abelard",
        citation: "Sic et Non, Prologue"
      }
    ]
  },
  {
    id: "augustine-doctor-grace",
    slug: "augustine-doctor-grace",
    title: "St Augustine of Hippo: The Doctor of Grace",
    subtitle: "Foundations of Western Christian Thought",
    excerpt: "Explore the life and teachings of one of the most influential theologians in Christian history, whose insights into grace, free will, and the nature of God continue to shape Catholic doctrine today.",
    content: `# St Augustine of Hippo: The Doctor of Grace

*Coming soon...*

This comprehensive exploration of St Augustine's life and theology will examine his conversion, his theological innovations, and his lasting impact on Catholic doctrine.

## Preview of Topics:
- The Confessions and spiritual autobiography
- The doctrine of original sin and grace
- The City of God and political theology
- Trinitarian theology
- Influence on later theologians

*This article is currently being prepared and will be available soon.*`,
    author: "St Saviour's Knowledge Hub",
    category: knowledgeHubCategories[0], // Church Fathers
    tags: ["Church Fathers", "Grace", "Doctrine", "Patristics", "Conversion", "Trinity"],
    readTime: "15 min",
    publishedDate: "Coming Soon",
    image: {
      src: "/images/chapel_st_patrick_st_saviours.jpeg",
      alt: "Chapel of St Patrick at St Saviour's Church",
      caption: "The Chapel of St Patrick represents the deep theological traditions that connect us to the early Church Fathers"
    },
    featured: false,
    status: "published",
    seo: {
      metaTitle: "St Augustine of Hippo: The Doctor of Grace | Knowledge Hub | St Saviour's",
      metaDescription: "Explore the profound theological insights of St Augustine of Hippo, whose teachings on grace and free will shaped Catholic doctrine for centuries.",
      keywords: ["St Augustine", "Doctor of Grace", "Church Fathers", "Catholic theology", "grace", "free will", "City of God"],
      canonicalUrl: "/knowledge-hub/augustine-doctor-grace"
    },
    relatedArticles: ["peter-abelard-philosopher-love"],
    bibliography: [],
    quotes: []
  },
  {
    id: "julian-norwich-revelations",
    slug: "julian-norwich-revelations", 
    title: "Julian of Norwich: Revelations of Divine Love",
    subtitle: "England's First Female Theologian",
    excerpt: "Journey into the mystical visions of England's first female theologian and her profound insights into God's love, showing how divine love encompasses all creation.",
    content: `# Julian of Norwich: Revelations of Divine Love

*Coming soon...*

Discover the profound mystical insights of Julian of Norwich, the 14th-century English anchoress whose visions of divine love continue to inspire Christians today.

## Preview of Topics:
- The Showings and mystical visions
- "All shall be well" - theology of hope
- Maternal imagery for God
- Medieval women's spirituality
- Influence on modern theology

*This article is currently being prepared and will be available soon.*`,
    author: "St Saviour's Knowledge Hub", 
    category: knowledgeHubCategories[2], // Catholic Mystics
    tags: ["Mysticism", "English Saints", "Divine Love", "Contemplation", "Medieval Women", "Visions"],
    readTime: "10 min",
    publishedDate: "Coming Soon",
    image: {
      src: "/images/st_saviours_interior_1939_archive_photo.jpeg",
      alt: "Historical interior of St Saviour's Church from 1939 archive",
      caption: "This 1939 photograph of St Saviour's interior evokes the contemplative tradition that invites us into deeper communion with divine love"
    },
    featured: false,
    status: "published",
    seo: {
      metaTitle: "Julian of Norwich: Revelations of Divine Love | Knowledge Hub | St Saviour's",
      metaDescription: "Explore the mystical visions and theological insights of Julian of Norwich, England's first female theologian and her revelations of God's love.",
      keywords: ["Julian of Norwich", "Revelations of Divine Love", "English mystics", "medieval theology", "divine love", "mysticism"],
      canonicalUrl: "/knowledge-hub/julian-norwich-revelations"
    },
    relatedArticles: ["peter-abelard-philosopher-love"],
    bibliography: [],
    quotes: []
  }
]

// Helper functions for CMS operations
export function getArticleBySlug(slug: string): KnowledgeHubArticle | undefined {
  return knowledgeHubArticles.find(article => article.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): KnowledgeHubArticle[] {
  return knowledgeHubArticles.filter(article => article.category.slug === categorySlug)
}

export function getFeaturedArticles(): KnowledgeHubArticle[] {
  return knowledgeHubArticles.filter(article => article.featured && article.status === 'published')
}

export function getPublishedArticles(): KnowledgeHubArticle[] {
  return knowledgeHubArticles.filter(article => article.status === 'published')
}

export function getCategoryBySlug(slug: string): KnowledgeHubCategory | undefined {
  return knowledgeHubCategories.find(category => category.slug === slug)
}

export function getRelatedArticles(articleId: string): KnowledgeHubArticle[] {
  const article = knowledgeHubArticles.find(a => a.id === articleId)
  if (!article?.relatedArticles) return []
  
  return article.relatedArticles
    .map(id => knowledgeHubArticles.find(a => a.id === id))
    .filter(Boolean) as KnowledgeHubArticle[]
}

export function searchArticles(query: string): KnowledgeHubArticle[] {
  const lowercaseQuery = query.toLowerCase()
  return knowledgeHubArticles.filter(article => 
    article.status === 'published' && (
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      article.category.title.toLowerCase().includes(lowercaseQuery)
    )
  )
}