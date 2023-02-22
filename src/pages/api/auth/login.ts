import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/authentication/users'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, hashedPassword } = req.body;
    console.log('a', email, hashedPassword)

    const result = await users.getUser(email);

    if (result.rows.length === 0 || result.rows[0].password !== hashedPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      const token = jwt.sign({ email: result.rows[0].email }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}