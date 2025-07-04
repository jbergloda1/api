import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    message: 'Hello from serverless API!',
    timestamp: new Date().toISOString(),
  });
} 