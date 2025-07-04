# Fastify Backend API

A high-performance backend API server built with Fastify and TypeScript.

## Features

- **High Performance**: Built with Fastify for excellent performance
- **TypeScript**: Full TypeScript support with strict type checking
- **Auto-generated Documentation**: Swagger/OpenAPI documentation
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Request validation with JSON Schema
- **Development Hot Reload**: Fast development with tsx watch mode

## API Endpoints

### General
- `GET /health` - Health check endpoint
- `GET /docs` - API documentation (Swagger UI)

### Hello
- `GET /api/hello` - Basic hello message

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID

### External APIs
- `GET /api/external?source=jsonplaceholder` - JSONPlaceholder API
- `GET /api/external?source=httpbin` - HTTPBin API  
- `GET /api/external?source=quotes` - Random quotes API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### Production

```bash
npm run build
npm start
```

### API Documentation

Once the server is running, visit `http://localhost:3000/docs` to view the interactive API documentation.

## Project Structure

```
src/
├── server.ts          # Main server file
└── routes/
    ├── hello.ts       # Hello endpoint
    ├── users.ts       # User CRUD operations
    └── external.ts    # External API proxy
```

## Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:3000/health

# Hello endpoint
curl http://localhost:3000/api/hello

# Get users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# External API
curl "http://localhost:3000/api/external?source=jsonplaceholder"
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## Built With

- [Fastify](https://fastify.dev/) - Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Swagger](https://swagger.io/) - API documentation
- [Axios](https://axios-http.com/) - HTTP client for external APIs