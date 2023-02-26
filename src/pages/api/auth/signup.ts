import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../../lib/db/authentication/users'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, hashedPassword, age, country } = req.body;

    try {
      const result = await users.createUser(email, hashedPassword, age, country);
      return res.status(200).json({ message: 'Account creation successful' });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}