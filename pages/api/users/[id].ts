import { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: string;
  name: string;
  email: string;
};

type ErrorResponse = {
  error: string;
};

// Mock user data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
} 