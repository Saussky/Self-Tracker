import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import timers from '../../../../../../lib/db/data/timers';
import parse from 'postgres-interval'

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

        // IF REACT STRICT MODE IS ON THERE WILL BE TWO TIMERS CREATED >:o

        if (todaysTimer.length > 0) {
            console.log('tt ,', todaysTimer)
            const time = (todaysTimer[0].time_elapsed.toPostgres())
            console.log('tt ', time)
            const postgresTime = parse(time)
            console.log("🚀 ~ file: check.ts:30 ~ getTimersRequest ~ postgresTime:", postgresTime)

            res.status(200).json({ id: todaysTimer[0].id, time_elapsed: time });
        } else {
            console.log('... no timers found')
            res.status(200).json({ id: false, time_elapsed: 0 })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Something went wrong' });
    }
}

