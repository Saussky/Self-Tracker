import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import counters from '../../../../../../lib/db/data/counters';


async function startCounter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.body.id as string;
  if (!id) {
    return res.status(401).json({ message: 'Id not provided' });
  }

  try {
    const UUID = await counters.startCounter(id)
    res.status(200).json({ message: "Counter created", UUID });
  } catch (error) {
    return res.status(401).json({ message: `Couldn't create counter` });
  }
}

export default jwtMiddleware(startCounter)