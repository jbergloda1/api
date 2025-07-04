import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface ExternalApiResponse {
  data: any;
  source: string;
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

  const { source } = req.query;

  if (!source || typeof source !== 'string') {
    res.status(400).json({ 
      error: 'Invalid source. Use: jsonplaceholder, httpbin, or quotes' 
    });
    return;
  }

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
        res.status(400).json({ 
          error: 'Invalid source. Use: jsonplaceholder, httpbin, or quotes' 
        });
        return;
    }

    const response = await axios.get(apiUrl, {
      timeout: 10000, // 10 second timeout
    });

    const apiResponse: ExternalApiResponse = {
      data: response.data,
      source: apiSource,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(apiResponse);
  } catch (error) {
    console.error('External API call failed:', error);
    res.status(500).json({ error: 'Failed to call external API' });
  }
} 