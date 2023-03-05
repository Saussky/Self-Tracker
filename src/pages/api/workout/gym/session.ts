import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../middleware/jwt';
import gym from '../../../../../lib/db/workout/gym';


async function createSession(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.user;
        const result = await gym.createSession(email);
        const sessionId = result.rows[0].id;
        return res.status(200).json({ message: 'Session created', sessionId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating session' });
    }
}

async function getSessionByUserEmail(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.user;
        const { rows: sessions } = await gym.getSessionsByUserEmail(email);
        return res.status(200).json({ sessions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting sessions' });
    }
}

async function gymSession(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return await createSession(req, res)
    }
    else if (req.method === 'GET') {
        return await getSessionByUserEmail(req, res)
    }
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

export default jwtMiddleware(gymSession)