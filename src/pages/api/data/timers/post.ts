import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function createTimer(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}