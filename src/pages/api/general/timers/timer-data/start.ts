import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import timers from '../../../../../../lib/db/data/timers';

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function startTimer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.body.token as string;
  const id = req.body.id as string;

  if (!token || !id) {
    return res.status(401).json({ message: 'Token or Id not provided' });
  }

  try {
    // const decodedToken = jwt.verify(token, jwtSecret) as { email: string };
    const UUID = await timers.startTimer(id)
    res.status(200).json({ message: "Timer created", UUID });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}