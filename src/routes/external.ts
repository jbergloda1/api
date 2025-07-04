import { FastifyInstance } from 'fastify';
import axios from 'axios';

interface ExternalApiResponse {
  data: any;
  source: string;
  timestamp: string;
}

interface ExternalApiQuery {
  source: string;
}

export default async function externalRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: ExternalApiQuery;
    Reply: ExternalApiResponse | { error: string };
  }>('/external', {
    schema: {
      description: 'Proxy external API calls',
      tags: ['External'],
      querystring: {
        type: 'object',
        properties: {
          source: { 
            type: 'string',
            enum: ['jsonplaceholder', 'httpbin', 'quotes'],
            description: 'External API source to call'
          }
        },
        required: ['source']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: { type: 'object' },
            source: { type: 'string' },
            timestamp: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { source } = request.query;

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
          return reply.code(400).send({ 
            error: 'Invalid source. Use: jsonplaceholder, httpbin, or quotes' 
          });
      }

      const response = await axios.get(apiUrl, {
        timeout: 10000, // 10 second timeout
      });

      return {
        data: response.data,
        source: apiSource,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      fastify.log.error('External API call failed:', error);
      return reply.code(500).send({ error: 'Failed to call external API' });
    }
  });
} 