import { NextApiRequest, NextApiResponse } from 'next';
import timers from '../../../../../../lib/db/data/timers';
import jwt from 'jsonwebtoken'
import { jwtMiddleware } from '../../../middleware/jwt';


async function createTimer(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const name = req.body.name as string;
    if (!name) {
        return res.status(401).json({ message: 'Name not provided' });
    }

    try {
        const { email } = req.user 
        await timers.createTimer(name, email)
        return res.status(200).json({ message: 'Timer creation successful' });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export default jwtMiddleware(createTimer)