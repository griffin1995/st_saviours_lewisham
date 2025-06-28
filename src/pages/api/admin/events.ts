import { NextApiRequest, NextApiResponse } from 'next';
import { getEvents, saveEvents, generateId, Event } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const events = getEvents();
        res.status(200).json(events);
        break;

      case 'POST':
        const newEvent: Event = {
          id: generateId(),
          title: req.body.title,
          description: req.body.description,
          date: req.body.date,
          time: req.body.time,
          duration: req.body.duration || '1 hour',
          location: req.body.location,
          category: req.body.category,
          image: req.body.image,
          contactPerson: req.body.contactPerson,
          contactEmail: req.body.contactEmail,
          maxAttendees: req.body.maxAttendees,
          registrationRequired: req.body.registrationRequired || false,
          published: req.body.published || false
        };

        const existingEvents = getEvents();
        existingEvents.push(newEvent);
        
        // Sort events by date
        existingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        if (saveEvents(existingEvents)) {
          res.status(201).json(newEvent);
        } else {
          res.status(500).json({ error: 'Failed to save event' });
        }
        break;

      case 'PUT':
        const { id } = req.query;
        const updatedEvents = getEvents();
        const eventIndex = updatedEvents.findIndex(event => event.id === id);
        
        if (eventIndex === -1) {
          res.status(404).json({ error: 'Event not found' });
          break;
        }

        updatedEvents[eventIndex] = {
          ...updatedEvents[eventIndex],
          ...req.body
        };

        // Sort events by date
        updatedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (saveEvents(updatedEvents)) {
          res.status(200).json(updatedEvents[eventIndex]);
        } else {
          res.status(500).json({ error: 'Failed to update event' });
        }
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        const eventsToDelete = getEvents();
        const filteredEvents = eventsToDelete.filter(event => event.id !== deleteId);
        
        if (filteredEvents.length === eventsToDelete.length) {
          res.status(404).json({ error: 'Event not found' });
          break;
        }

        if (saveEvents(filteredEvents)) {
          res.status(200).json({ message: 'Event deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete event' });
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