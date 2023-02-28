import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../../middleware/jwt';
import counters from '../../../../../../lib/db/data/counters';


async function Counter(req: NextApiRequest, res: NextApiResponse) {
  console.log('hi')
  if (req.method === 'GET') {
    try {
      const { email } = req.user
      const { rows: userCounters } = await counters.getCountersByEmail(email)
      return res.status(200).json({ counters: userCounters })
    } catch (error) {
      return res.status(401).json({ message: "Couldn't get counters"})
    }
  }

  else if (req.method === 'POST') {
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

  else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

export default jwtMiddleware(Counter)
