# Next.js Serverless API Project

Dự án Next.js để gọi các API serverless (Next.js project for serverless API calls)

## Tính năng (Features)

- 🚀 **Serverless API Routes**: Các API endpoints được triển khai như serverless functions
- 🔧 **CRUD Operations**: Tạo, đọc, cập nhật, xóa users
- 🌐 **External API Integration**: Gọi các API bên ngoài thông qua serverless functions
- 📱 **Modern UI**: Giao diện đơn giản để test các API endpoints
- 🔒 **Type Safety**: Sử dụng TypeScript cho type safety
- ⚡ **Fast Performance**: Tối ưu hóa cho hiệu suất cao

## Cài đặt (Installation)

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

## API Endpoints

### 1. Basic API
- **GET /api/hello** - Trả về tin nhắn hello cơ bản với timestamp

### 2. User Management
- **GET /api/users** - Lấy danh sách tất cả users
- **POST /api/users** - Tạo user mới
- **GET /api/users/[id]** - Lấy thông tin user theo ID

### 3. External API Calls
- **GET /api/external?source=jsonplaceholder** - Gọi JSONPlaceholder API
- **GET /api/external?source=httpbin** - Gọi HTTPBin API  
- **GET /api/external?source=quotes** - Gọi Random Quote API

## Cấu trúc thư mục (Project Structure)

```
├── pages/
│   ├── api/
│   │   ├── hello.ts              # Basic API endpoint
│   │   ├── external.ts           # External API calls
│   │   └── users/
│   │       ├── index.ts          # Users CRUD
│   │       └── [id].ts           # User by ID
│   ├── _app.tsx                  # App component
│   └── index.tsx                 # Homepage with API demo
├── package.json                  # Dependencies
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Documentation
```

## Cách sử dụng (Usage)

1. **Chạy development server**:
   ```bash
   npm run dev
   ```

2. **Mở trình duyệt**: http://localhost:3000

3. **Test các API endpoints**:
   - Click "Test Hello API" để test basic endpoint
   - Tạo users mới trong phần "User Management"
   - Gọi external APIs trong phần "External API Calls"

## Ví dụ API Calls

### Tạo user mới
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Lấy danh sách users
```bash
curl http://localhost:3000/api/users
```

### Gọi external API
```bash
curl http://localhost:3000/api/external?source=quotes
```

## Tính năng Serverless

- **Automatic Scaling**: Tự động scale theo traffic
- **Cost Effective**: Chỉ trả tiền khi có request
- **Zero Server Management**: Không cần quản lý server
- **Global Distribution**: Deploy trên CDN toàn cầu

## Deploy

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy folder 'out' to Netlify
```

## Môi trường (Environment)

- Node.js 18+
- Next.js 14+
- TypeScript
- React 18+

## Ghi chú (Notes)

- Các API routes tự động trở thành serverless functions
- CORS được cấu hình để cho phép cross-origin requests
- Sử dụng TypeScript để đảm bảo type safety
- Axios được sử dụng cho HTTP requests