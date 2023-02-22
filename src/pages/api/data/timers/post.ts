import { NextApiRequest, NextApiResponse } from 'next';
import timers from '../../../../../lib/db/data/timers';
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function createTimer(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
        console.log('hi')
        const name = req.body.name as string;
        const token = req.body.token as string;
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decodedToken = jwt.verify(token, jwtSecret) as { email: string };
        const { email } = decodedToken;
        console.log('decoded email ', email)

        await timers.createTimer(name, email)
        res.status(200).json({ message: 'Timer creation successful' });
    } catch (e) {
        console.log('eee',e)
    }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}