import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
// import timers from '../../../../lib/db/timers';

const jwtSecret = process.env.JWT_SECRET || 'moon';

export default async function handleTimersRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.query.token as string;
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret) as { email: string };
    const { email } = decodedToken;
    const userTimers = 'placeHolder'
    // const userTimers = await timers.getUserTimers(email);
    return res.status(200).json({ timers: userTimers });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}