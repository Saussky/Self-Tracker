import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import timers from '../../../../../../lib/db/data/timers';


async function startTimer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.body.uniqueId as string;
  const timeElapsed = req.body.timeElapsed as string;

  if (!timeElapsed || !id) {
    return res.status(401).json({ message: 'Time or Id not provided' });
  }

  try {
    await timers.updateTimer(id, timeElapsed)
    res.status(200).json({ message: "Timer started" });
  } catch (error) {
    return res.status(401).json({ message: "Couldn't start timer" });
  }
}

export default jwtMiddleware(startTimer)