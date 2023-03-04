import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import counters from '../../../../../../lib/db/data/counters';

async function getCounters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.user
    const { rows: userCounters } = await counters.getCountersByEmail(email)
    return res.status(200).json({ counters: userCounters })
  } catch (error) {
    return res.status(401).json({ message: "Couldn't get counters" })
  }
}

async function createCounter(req: NextApiRequest, res: NextApiResponse) {
  const name = req.body.name as string;
  if (!name) {
    return res.status(401).json({ message: 'Name not provided' });
  }

  try {
    const { email } = req.user
    await counters.createCounter(name, email)
    return res.status(200).json({ message: 'Counter creation successful' });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "Couldn't create counter" })
  }
}


async function deleteCounter(req: NextApiRequest, res: NextApiResponse) {
  const infoId = req.body.infoId as string;
  try {
    await counters.deleteCounterInfo(infoId);
    return res.status(200).json({ message: 'Counter deletion successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

async function Counter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getCounters(req, res)
  }
  else if (req.method === 'POST') {
    return await createCounter(req, res)
  }
  else if (req.method === 'PATCH') {
    return await deleteCounter(req, res)
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default jwtMiddleware(Counter)
