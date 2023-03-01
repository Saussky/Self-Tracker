import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import counters from '../../../../../../lib/db/data/counters';


async function startCounter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.body.uniqueId as string;
  const amount = req.body.amount as number;

  if (!id) {
    return res.status(401).json({ message: 'Amount or Id not provided' });
  }

  try {
    await counters.updateCounter(id, amount)
    res.status(200).json({ message: "counter started" });
  } catch (error) {
    console.log('ee', error)
    return res.status(401).json({ message: "Couldn't start counter" });
  }
}

export default jwtMiddleware(startCounter)