import { NextApiRequest, NextApiResponse } from 'next';
import { getWebsiteSettings, saveWebsiteSettings, WebsiteSettings } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const settings = getWebsiteSettings();
        res.status(200).json(settings);
        break;

      case 'PUT':
        const updatedSettings: WebsiteSettings = req.body;

        if (saveWebsiteSettings(updatedSettings)) {
          res.status(200).json(updatedSettings);
        } else {
          res.status(500).json({ error: 'Failed to save settings' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}