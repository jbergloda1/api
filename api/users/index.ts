import { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

// Mock user data (in real app, this would be a database)
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method === 'GET') {
    // Return all users
    res.status(200).json(users);
    return;
  }

  if (req.method === 'POST') {
    // Create a new user
    const { name, email }: CreateUserRequest = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
    return;
  }

  // Method not allowed
  res.status(405).json({ error: `Method ${req.method} not allowed` });
} 