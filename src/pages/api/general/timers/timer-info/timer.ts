import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from '../../../middleware/jwt';
import timers from '../../../../../../lib/db/data/timers';

async function getTimers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.user;
    const { rows: userTimers } = await timers.getTimersByEmail(email);
    return res.status(200).json({ timers: userTimers });
  } catch (error) {
    return res.status(401).json({ message: "Couldn't get timers" });
  }
}

async function createTimer(req: NextApiRequest, res: NextApiResponse) {
  const name = req.body.name as string;
  if (!name) {
    return res.status(401).json({ message: 'Name not provided' });
  }

  try {
    const { email } = req.user;
    await timers.createTimer(name, email);
    return res.status(200).json({ message: 'Timer creation successful' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

async function deleteTimer(req: NextApiRequest, res: NextApiResponse) {
  const infoId = req.body.infoId as string;
  try {
    await timers.deleteTimerInfo(infoId);
    return res.status(200).json({ message: 'Timer deletion successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}


async function Timer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getTimers(req, res);
  } else if (req.method === 'POST') {
    return await createTimer(req, res);
  } else if (req.method === 'PATCH') {
    return await deleteTimer(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}


export default jwtMiddleware(Timer)
