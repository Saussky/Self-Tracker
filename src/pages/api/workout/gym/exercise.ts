import { NextApiRequest, NextApiResponse } from 'next';
import { jwtMiddleware } from '../../middleware/jwt';
import gym from '../../../../../lib/db/workout/gym';

async function getExercises(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.user;
        const { rows } = await gym.getExercises(email);
        console.log('aaa')
        return res.status(200).json({ rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting exercises' });
    }
}

async function addExercise(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.user;
        const { category, exercise } = req.body
        const result = await gym.addExercise(email, category, exercise);
        return res.status(200).json({ message: 'Exercise added' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding exercise' });
    }
}

async function deleteExercise(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.user;
        const { category, exercise } = req.body
        const result = await gym.deleteExercise(email, category, exercise);
        return res.status(200).json({ message: 'Exercise added' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting exercise' });
    }
}

async function exercise(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log('oi')
        return await getExercises(req, res)
    }
    else if (req.method === 'POST') {
        return await addExercise(req, res)
    }
    else if (req.method === 'PATCH') {
        return await deleteExercise(req, res)
    }
    else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

export default jwtMiddleware(exercise)
