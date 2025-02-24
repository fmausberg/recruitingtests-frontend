import { NextApiRequest, NextApiResponse } from 'next';

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    // Handle login logic here
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}