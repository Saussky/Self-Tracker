import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import timers from '../../../../../../lib/db/data/timers';

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

async function startTimer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.body.id as string;
  if (!id) {
    return res.status(401).json({ message: 'Token or Id not provided' });
  }

  try {
    const UUID = await timers.startTimer(id)
    res.status(200).json({ message: "Timer created", UUID });
  } catch (error) {
    return res.status(401).json({ message: `Couldn't create timer` });
  }
}

export default jwtMiddleware(startTimer)