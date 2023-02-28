import { NextApiRequest, NextApiResponse } from 'next';
import counters from '../../../../../../lib/db/data/counters';
import { jwtMiddleware } from '../../../middleware/jwt';


async function CheckForCounters(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const infoId = req.query.info_id as string;
    if (!infoId) {
        throw new Error("ID not sent through")
    }

    try {
        const todaysCounter = await counters.getCounterByDate(infoId);

        if (todaysCounter.length > 0) {
            return res.status(200).json({ id: todaysCounter[0].id, amount: todaysCounter[0].amount });
        } else {
            return res.status(200).json({ id: false, amount: 0 })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Something went wrong' });
    }
}

export default jwtMiddleware(CheckForCounters)

