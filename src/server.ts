import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

// Routes
import helloRoutes from './routes/hello';
import externalRoutes from './routes/external';
import userRoutes from './routes/users';

const server = fastify({ 
  logger: true 
});

// Register plugins
server.register(cors, {
  origin: true, // Allow all origins in development
});

server.register(swagger, {
  swagger: {
    info: {
      title: 'Fastify API Server',
      description: 'Backend API server built with Fastify',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  }
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header
});

// Register routes
server.register(helloRoutes, { prefix: '/api' });
server.register(externalRoutes, { prefix: '/api' });
server.register(userRoutes, { prefix: '/api' });

// Health check endpoint
server.get('/health', async (request, reply) => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📚 API Documentation available at http://localhost:${port}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 