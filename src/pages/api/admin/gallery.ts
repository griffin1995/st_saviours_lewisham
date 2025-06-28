import { NextApiRequest, NextApiResponse } from 'next';
import { getGalleryAlbums, saveGalleryAlbums, generateId, GalleryAlbum } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const albums = getGalleryAlbums();
        res.status(200).json(albums);
        break;

      case 'POST':
        const newAlbum: GalleryAlbum = {
          id: generateId(),
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          date: req.body.date,
          images: req.body.images || [],
          featured: req.body.featured || false,
          published: req.body.published || false
        };

        const existingAlbums = getGalleryAlbums();
        existingAlbums.push(newAlbum);
        
        // Sort albums by date (newest first)
        existingAlbums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        if (saveGalleryAlbums(existingAlbums)) {
          res.status(201).json(newAlbum);
        } else {
          res.status(500).json({ error: 'Failed to save album' });
        }
        break;

      case 'PUT':
        const { id } = req.query;
        const updatedAlbums = getGalleryAlbums();
        const albumIndex = updatedAlbums.findIndex(album => album.id === id);
        
        if (albumIndex === -1) {
          res.status(404).json({ error: 'Album not found' });
          break;
        }

        updatedAlbums[albumIndex] = {
          ...updatedAlbums[albumIndex],
          ...req.body
        };

        // Sort albums by date (newest first)
        updatedAlbums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (saveGalleryAlbums(updatedAlbums)) {
          res.status(200).json(updatedAlbums[albumIndex]);
        } else {
          res.status(500).json({ error: 'Failed to update album' });
        }
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        const albumsToDelete = getGalleryAlbums();
        const filteredAlbums = albumsToDelete.filter(album => album.id !== deleteId);
        
        if (filteredAlbums.length === albumsToDelete.length) {
          res.status(404).json({ error: 'Album not found' });
          break;
        }

        if (saveGalleryAlbums(filteredAlbums)) {
          res.status(200).json({ message: 'Album deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete album' });
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