import type { NextApiRequest, NextApiResponse } from 'next'

// Mock events data
const eventsData = [
  {
    id: '1',
    title: 'Sunday Mass',
    description: 'Weekly celebration of the Eucharist',
    date: '2025-01-26',
    time: '11:30 AM',
    location: 'Main Church',
    category: 'liturgy',
    recurring: 'weekly'
  },
  {
    id: '2', 
    title: 'Parish Council Meeting',
    description: 'Monthly meeting for parish planning and discussion',
    date: '2025-02-01',
    time: '7:00 PM',
    location: 'Parish Hall',
    category: 'meeting',
    recurring: 'monthly'
  },
  {
    id: '3',
    title: 'Rosary Group',
    description: 'Weekly prayer group for the Holy Rosary',
    date: '2025-01-28',
    time: '6:00 PM', 
    location: 'Chapel',
    category: 'prayer',
    recurring: 'weekly'
  },
  {
    id: '4',
    title: 'Youth Group',
    description: 'Weekly gathering for young parishioners',
    date: '2025-01-29',
    time: '7:00 PM',
    location: 'Parish Hall',
    category: 'youth',
    recurring: 'weekly'
  },
  {
    id: '5',
    title: 'First Friday Adoration',
    description: 'Monthly Eucharistic Adoration',
    date: '2025-02-07',
    time: '7:00 PM',
    location: 'Main Church',
    category: 'adoration',
    recurring: 'monthly'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { category, limit } = req.query
    
    let filteredEvents = eventsData
    
    // Filter by category if provided
    if (category && typeof category === 'string') {
      filteredEvents = eventsData.filter(event => event.category === category)
    }
    
    // Limit results if provided
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        filteredEvents = filteredEvents.slice(0, limitNum)
      }
    }
    
    res.status(200).json({
      success: true,
      data: filteredEvents,
      total: filteredEvents.length,
      lastUpdated: new Date().toISOString()
    })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}