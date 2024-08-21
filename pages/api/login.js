// pages/api/login.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}
