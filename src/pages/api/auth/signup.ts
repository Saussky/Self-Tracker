import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/users'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, age, country } = req.body;

    const result = await users.createUser(email, password, age, country);

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Error' });
    } else {
      // TODO: Implement authentication logic and generate session token
      res.status(200).json({ message: 'Account creation successful' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}