// pages/api/tournament/[id].js
import dbConnect from '../../../lib/mongodb';
import Tournament from '../../../models/tournament';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const tournament = await Tournament.findById(id).populate('participants rounds');
      if (!tournament) {
        return res.status(404).json({ success: false, message: 'Tournament not found' });
      }
      res.status(200).json({ success: true, data: tournament });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
