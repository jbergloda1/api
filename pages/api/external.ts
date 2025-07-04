import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ExternalApiResponse = {
  data: any;
  source: string;
  timestamp: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExternalApiResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { source } = req.query;

  try {
    let apiUrl = '';
    let apiSource = '';

    switch (source) {
      case 'jsonplaceholder':
        apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
        apiSource = 'JSONPlaceholder';
        break;
      case 'httpbin':
        apiUrl = 'https://httpbin.org/json';
        apiSource = 'HTTPBin';
        break;
      case 'quotes':
        apiUrl = 'https://api.quotable.io/random';
        apiSource = 'Quotable';
        break;
      default:
        return res.status(400).json({ error: 'Invalid source. Use: jsonplaceholder, httpbin, or quotes' });
    }

    const response = await axios.get(apiUrl, {
      timeout: 10000, // 10 second timeout
    });

    res.status(200).json({
      data: response.data,
      source: apiSource,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('External API call failed:', error);
    res.status(500).json({ error: 'Failed to call external API' });
  }
} 