import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/users'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, age, country } = req.body;

    try {
      const result = await users.createUser(email, password, age, country);
      res.status(200).json({ message: 'Account creation successful' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}