import { VercelRequest, VercelResponse } from '@vercel/node';

interface HelloResponse {
  message: string;
  timestamp: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const response: HelloResponse = {
    message: 'Hello from Fastify API!',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
} 