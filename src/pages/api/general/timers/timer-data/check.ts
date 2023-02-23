import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import timers from '../../../../../../lib/db/data/timers';

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function getTimersRequest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.query.token as string;
    const info_id = req.query.info_id as string;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as { email: string };

        const todaysTimer = await timers.getTimerByDate(info_id);

        if (todaysTimer.length > 0) {
            res.status(200).json({ id: todaysTimer[0].id });
        } else {
            res.status(200).json({ id: false})
        }

    } catch (error) {
        return res.status(401).json({ message: 'Something went wrong' });
    }
}

