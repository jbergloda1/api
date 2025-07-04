import { FastifyInstance } from 'fastify';

interface HelloResponse {
  message: string;
  timestamp: string;
}

export default async function helloRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Reply: HelloResponse;
  }>('/hello', {
    schema: {
      description: 'Basic hello endpoint',
      tags: ['General'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      message: 'Hello from Fastify API!',
      timestamp: new Date().toISOString(),
    };
  });
} 