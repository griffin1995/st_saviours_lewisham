import { NextApiRequest, NextApiResponse } from 'next';
import { initializeDefaultData } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    initializeDefaultData();
    res.status(200).json({ 
      success: true, 
      message: 'CMS data initialized successfully' 
    });
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to initialize CMS data' 
    });
  }
}