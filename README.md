# Fastify Backend API

A high-performance backend API server built with Fastify and TypeScript, deployable to Vercel as serverless functions.

## Features

- **High Performance**: Built with Fastify for excellent performance
- **TypeScript**: Full TypeScript support with strict type checking
- **Serverless Ready**: Deployable to Vercel as serverless functions
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Request validation and error handling
- **Development Hot Reload**: Fast development with tsx watch mode

## API Endpoints

### General
- `GET /api/health` - Health check endpoint

### Hello
- `GET /api/hello` - Basic hello message

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user by ID

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

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

The API will be available at your Vercel domain with endpoints like:
- `https://your-domain.vercel.app/api/hello`
- `https://your-domain.vercel.app/api/users`
- `https://your-domain.vercel.app/api/health`

### Manual Deployment

For other platforms, build and deploy the `dist` folder:

```bash
npm run build
# Deploy the dist folder to your hosting platform
```

## Project Structure

```
src/
├── server.ts          # Main server file (for local development)
└── routes/
    ├── hello.ts       # Hello endpoint
    ├── users.ts       # User CRUD operations
    └── external.ts    # External API proxy

api/                   # Vercel serverless functions
├── health.ts          # Health check endpoint
├── hello.ts           # Hello endpoint
├── external.ts        # External API proxy
└── users/
    ├── index.ts       # Users CRUD operations
    └── [id].ts        # Individual user by ID
```

## Testing

### Local Development
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

### Production (Vercel)
Replace `localhost:3000` with your Vercel domain:

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Hello endpoint
curl https://your-domain.vercel.app/api/hello

# Get users
curl https://your-domain.vercel.app/api/users
```

## Environment Variables

- `PORT` - Server port (default: 3000, local development only)
- `NODE_ENV` - Environment mode (development/production)

## Built With

- [Fastify](https://fastify.dev/) - Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vercel](https://vercel.com/) - Serverless deployment platform
- [Axios](https://axios-http.com/) - HTTP client for external APIs

## Notes

- **Local Development**: Uses Fastify server for fast development
- **Production**: Deploys as individual serverless functions on Vercel
- **Dual Architecture**: Same codebase works for both local development and serverless deployment