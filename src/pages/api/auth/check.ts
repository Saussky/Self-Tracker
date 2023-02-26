import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/authentication/users'
import jwt from 'jsonwebtoken'


interface JwtPayload {
    email: string;
}
const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function loginCheck(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (!token) {
        throw new Error("Missing authorization header");
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload
        const email = decodedToken.email;

        const result = await users.getUser(email);
        if (result.rows.length === 0) {
            throw new Error("Invalid user email");
        }

        return res.status(200).json({ message: "User is logged in" })
    } catch (e) {
        console.log(e)
        return res.status(401).json({ message: 'JWT Verification Failed' });
    }
}