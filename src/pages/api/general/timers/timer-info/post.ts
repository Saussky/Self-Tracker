import { NextApiRequest, NextApiResponse } from 'next';
import timers from '../../../../../../lib/db/data/timers';
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function createTimer(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const name = req.body.name as string;
    const token = req.body.token as string;

    if (!token || !name) {
        return res.status(401).json({ message: 'Token or Name not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as { email: string };
        const { email } = decodedToken;
        await timers.createTimer(name, email)
        res.status(200).json({ message: 'Timer creation successful' });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}