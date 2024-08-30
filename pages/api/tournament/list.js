// pages/api/tournament/list.js
import dbConnect from '../../../lib/mongodb.js';
import Tournament from '../../../models/tournament';
import allowCors from '../withCors.js';

async function handler(req, res) {
    await dbConnect();
  
    try {
      const tournaments = await Tournament.find({});
      res.status(200).json({ success: true, tournaments });
    } catch (error) {
      console.error("Error loading tournaments:", error);
      res.status(500).json({ success: false, message: "Failed to load tournaments" });
    }
  }