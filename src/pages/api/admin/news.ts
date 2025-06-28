import { NextApiRequest, NextApiResponse } from 'next';
import { getNewsArticles, saveNewsArticles, generateId, slugify, NewsArticle } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const articles = getNewsArticles();
        res.status(200).json(articles);
        break;

      case 'POST':
        const newArticle: NewsArticle = {
          id: generateId(),
          title: req.body.title,
          excerpt: req.body.excerpt,
          content: req.body.content,
          image: req.body.image || '/images/news/default.jpg',
          category: req.body.category,
          date: req.body.date || new Date().toISOString().split('T')[0],
          readTime: req.body.readTime || calculateReadTime(req.body.content),
          author: req.body.author || 'Parish Office',
          published: req.body.published || false,
          slug: slugify(req.body.title)
        };

        const existingArticles = getNewsArticles();
        existingArticles.unshift(newArticle); // Add to beginning
        
        if (saveNewsArticles(existingArticles)) {
          res.status(201).json(newArticle);
        } else {
          res.status(500).json({ error: 'Failed to save article' });
        }
        break;

      case 'PUT':
        const { id } = req.query;
        const updatedArticles = getNewsArticles();
        const articleIndex = updatedArticles.findIndex(article => article.id === id);
        
        if (articleIndex === -1) {
          res.status(404).json({ error: 'Article not found' });
          break;
        }

        updatedArticles[articleIndex] = {
          ...updatedArticles[articleIndex],
          ...req.body,
          slug: slugify(req.body.title || updatedArticles[articleIndex].title)
        };

        if (saveNewsArticles(updatedArticles)) {
          res.status(200).json(updatedArticles[articleIndex]);
        } else {
          res.status(500).json({ error: 'Failed to update article' });
        }
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        const articlesToDelete = getNewsArticles();
        const filteredArticles = articlesToDelete.filter(article => article.id !== deleteId);
        
        if (filteredArticles.length === articlesToDelete.length) {
          res.status(404).json({ error: 'Article not found' });
          break;
        }

        if (saveNewsArticles(filteredArticles)) {
          res.status(200).json({ message: 'Article deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete article' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}