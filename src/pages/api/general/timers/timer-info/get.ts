import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from '../../../middleware/jwt';
import timers from '../../../../../../lib/db/data/timers';


async function getTimersRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.user
    const { rows: userTimers } = await timers.getTimersByEmail(email)
    return res.status(200).json({ timers: userTimers })
  } catch (error) {
    return res.status(401).json({ message: "Couldn't get timers"})
  }
}

export default jwtMiddleware(getTimersRequest)
