import { FastifyInstance } from 'fastify';

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UserParams {
  id: string;
}

// Mock user data (in real app, this would be a database)
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export default async function userRoutes(fastify: FastifyInstance) {
  // GET /api/users - Get all users
  fastify.get<{
    Reply: User[];
  }>('/users', {
    schema: {
      description: 'Get all users',
      tags: ['Users'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    return users;
  });

  // POST /api/users - Create a new user
  fastify.post<{
    Body: CreateUserRequest;
    Reply: User | { error: string };
  }>('/users', {
    schema: {
      description: 'Create a new user',
      tags: ['Users'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' }
        },
        required: ['name', 'email']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { name, email } = request.body;
    
    if (!name || !email) {
      return reply.code(400).send({ error: 'Name and email are required' });
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
    };
    
    users.push(newUser);
    return reply.code(201).send(newUser);
  });

  // GET /api/users/:id - Get user by ID
  fastify.get<{
    Params: UserParams;
    Reply: User | { error: string };
  }>('/users/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['Users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    
    return user;
  });
} 