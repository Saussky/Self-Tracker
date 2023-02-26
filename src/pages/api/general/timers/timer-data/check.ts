import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import timers from '../../../../../../lib/db/data/timers';
import { jwtMiddleware } from '../../../middleware/jwt';

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

async function getTimersRequest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const infoId = req.query.info_id as string;
    if (!infoId) {
        throw new Error("ID not sent through")
    }

    try {
        const todaysTimer = await timers.getTimerByDate(infoId);

        // IF REACT STRICT MODE IS ON THERE WILL BE TWO TIMERS CREATED >:o

        if (todaysTimer.length > 0) {
            return res.status(200).json({ id: todaysTimer[0].id, time_elapsed: todaysTimer[0].elapsedSeconds });
        } else {
            return res.status(200).json({ id: false, time_elapsed: 0 })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Something went wrong' });
    }
}

export default jwtMiddleware(getTimersRequest)

