import { NextApiRequest, NextApiResponse } from 'next';
import { getParishGroups, saveParishGroups, generateId, ParishGroup } from '@/lib/cms-data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const groups = getParishGroups();
        res.status(200).json(groups);
        break;

      case 'POST':
        const newGroup: ParishGroup = {
          id: generateId(),
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          meetingTime: req.body.meetingTime,
          location: req.body.location,
          contact: req.body.contact,
          contactPhone: req.body.contactPhone,
          email: req.body.email,
          active: req.body.active || true,
          newMembersWelcome: req.body.newMembersWelcome || true,
          ageRange: req.body.ageRange,
          note: req.body.note
        };

        const existingGroups = getParishGroups();
        existingGroups.push(newGroup);
        
        if (saveParishGroups(existingGroups)) {
          res.status(201).json(newGroup);
        } else {
          res.status(500).json({ error: 'Failed to save group' });
        }
        break;

      case 'PUT':
        const { id } = req.query;
        const updatedGroups = getParishGroups();
        const groupIndex = updatedGroups.findIndex(group => group.id === id);
        
        if (groupIndex === -1) {
          res.status(404).json({ error: 'Group not found' });
          break;
        }

        updatedGroups[groupIndex] = {
          ...updatedGroups[groupIndex],
          ...req.body
        };

        if (saveParishGroups(updatedGroups)) {
          res.status(200).json(updatedGroups[groupIndex]);
        } else {
          res.status(500).json({ error: 'Failed to update group' });
        }
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        const groupsToDelete = getParishGroups();
        const filteredGroups = groupsToDelete.filter(group => group.id !== deleteId);
        
        if (filteredGroups.length === groupsToDelete.length) {
          res.status(404).json({ error: 'Group not found' });
          break;
        }

        if (saveParishGroups(filteredGroups)) {
          res.status(200).json({ message: 'Group deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete group' });
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