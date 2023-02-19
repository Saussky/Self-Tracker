import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/users'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, hashedPassword } = req.body;

    const result = await users.getUser(email);

    if (result.rows.length === 0 || result.rows[0].password !== hashedPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      // TODO: Implement authentication logic and generate session token
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}