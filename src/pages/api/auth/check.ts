import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/authentication/users'
import jwt from 'jsonwebtoken'
import { jwtMiddleware } from '../middleware/jwt';

async function loginCheck(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({ message: "User is logged in" });
}

export default jwtMiddleware(loginCheck)