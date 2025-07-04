import { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: string;
  name: string;
  email: string;
}

// Mock user data (should be same as in index.ts - in real app, this would be a database)
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.status(200).json(user);
} 