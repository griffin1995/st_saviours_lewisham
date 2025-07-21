import type { NextApiRequest, NextApiResponse } from 'next'

// Mock mass times data
const massTimesData = {
  weekday: [
    { day: 'Monday', time: '9:00 AM', location: 'Main Church' },
    { day: 'Wednesday', time: '9:00 AM', location: 'Main Church' },
    { day: 'Friday', time: '9:00 AM', location: 'Main Church' }
  ],
  weekend: [
    { day: 'Saturday', time: '6:00 PM', location: 'Main Church' },
    { day: 'Sunday', time: '8:00 AM', location: 'Main Church' },
    { day: 'Sunday', time: '11:30 AM', location: 'Main Church' },
    { day: 'Sunday', time: '6:00 PM', location: 'Main Church' }
  ],
  holyDays: [
    { day: 'Holy Days of Obligation', time: '9:00 AM & 7:00 PM', location: 'Main Church' }
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: massTimesData,
      lastUpdated: new Date().toISOString()
    })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}