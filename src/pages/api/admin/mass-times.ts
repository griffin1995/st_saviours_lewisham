import { NextApiRequest, NextApiResponse } from 'next';
import { getMassTimes, saveMassTimes, MassTime } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const massTimes = getMassTimes();
        res.status(200).json(massTimes);
        break;

      case 'PUT':
        // Update all mass times at once
        const updatedMassTimes: MassTime[] = req.body;
        
        // Validate structure
        if (!Array.isArray(updatedMassTimes)) {
          res.status(400).json({ error: 'Invalid data structure' });
          break;
        }

        // Ensure all required fields
        const validMassTimes = updatedMassTimes.map(daySchedule => ({
          day: daySchedule.day,
          services: (daySchedule.services || []).map(service => ({
            time: service.time || '',
            type: service.type || '',
            description: service.description || '',
            language: service.language,
            celebrant: service.celebrant
          }))
        }));

        if (saveMassTimes(validMassTimes)) {
          res.status(200).json(validMassTimes);
        } else {
          res.status(500).json({ error: 'Failed to save mass times' });
        }
        break;

      case 'POST':
        // Initialize default mass times if they don't exist
        const defaultMassTimes: MassTime[] = [
          {
            day: 'Sunday',
            services: [
              { time: '8:00 AM', type: 'Sunday Mass', description: 'Quiet Mass' },
              { time: '10:00 AM', type: 'Sunday Mass', description: 'Family Mass with music' },
              { time: '6:00 PM', type: 'Sunday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Monday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:30 PM', type: 'Weekday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Tuesday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:30 PM', type: 'Weekday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Wednesday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:30 PM', type: 'Weekday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Thursday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:30 PM', type: 'Weekday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Friday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:30 PM', type: 'Weekday Mass', description: 'Evening Mass' }
            ]
          },
          {
            day: 'Saturday',
            services: [
              { time: '10:00 AM', type: 'Weekday Mass', description: 'Morning Mass' },
              { time: '6:00 PM', type: 'Saturday Vigil', description: 'Vigil Mass for Sunday' }
            ]
          }
        ];

        if (saveMassTimes(defaultMassTimes)) {
          res.status(201).json(defaultMassTimes);
        } else {
          res.status(500).json({ error: 'Failed to initialize mass times' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}