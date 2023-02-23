import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import timers from '../../../../../../lib/db/data/timers';

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function startTimer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.body.token as string;
  const id = req.body.uniqueId as string;
  const timeElapsed = req.body.timeElapsed as number;

  if (!token || !id) {
    return res.status(401).json({ message: 'Token or Id not provided' });
  }

  try {
    await timers.updateTimer(id, timeElapsed)
    res.status(200).json({ message: "Timer created" });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}