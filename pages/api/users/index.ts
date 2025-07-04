import { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: string;
  name: string;
  email: string;
};

type CreateUserRequest = {
  name: string;
  email: string;
};

type ErrorResponse = {
  error: string;
};

// Mock user data (in real app, this would be a database)
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | ErrorResponse>
) {
  if (req.method === 'GET') {
    // Return all users
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    // Create a new user
    const { name, email }: CreateUserRequest = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
} 