# Image Converter App

A modern, full-stack web application for converting and transforming images with a beautiful user interface. Built with React (frontend) and Node.js (backend), supporting multiple formats and advanced conversion options.

## Features

- **Multi-format Support**: Convert images to JPEG, PNG, WebP, TIFF, GIF, AVIF, and HEIF formats
- **Batch Processing**: Convert multiple images simultaneously with ZIP download
- **Image Optimization**: Adjustable quality settings for optimal file size
- **Resize Functionality**: Custom width and height dimensions (optional)
- **Drag & Drop**: Intuitive file upload with drag-and-drop support
- **Real-time Preview**: Preview images before conversion
- **Error Handling**: Comprehensive error messages from backend
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Frontend
- **React** 18 with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express
- **Sharp** for image processing
- **Multer** for file uploads
- **JSZip** for creating ZIP archives
- **Express Rate Limiter** for API protection
- **CORS** enabled for cross-origin requests

## Project Structure

```
imageconverter-app/
├── imageconverter-backend/
│   ├── index.js                 # Main server file
│   ├── package.json             # Backend dependencies
│   ├── uploads/                 # Temporary file storage
│   └── package-lock.json
└── imageconverter-frontend/
    ├── src/
    │   ├── App.tsx             # Main component
    │   ├── App.css            # Styles
    │   ├── main.tsx           # App entry point
    │   ├── index.css          # Global styles
    │   └── assets/            # Static assets
    │       ├── logo-1.webp
    │       └── react.svg
    ├── index.html              # HTML template
    ├── package.json            # Frontend dependencies
    ├── vite.config.ts          # Vite configuration
    ├── tailwind.config.ts      # Tailwind configuration
    ├── tsconfig*.json          # TypeScript configurations
    └── README.md               # Vite template README
```

## Prerequisites

- **Node.js** 16 or higher (recommended: 18+)
- **npm** 7 or higher
- **Git** for version control

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imageconverter-app
   ```

2. **Backend Setup**
   ```bash
   cd imageconverter-backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../imageconverter-frontend
   npm install
   ```

## Environment Configuration

### Frontend Environment Variables
Create a `.env` file in `imageconverter-frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

If not set, the frontend will attempt to use relative paths (for same-origin deployment).

### Backend Environment Variables
You can optionally create a `.env` file in `imageconverter-backend/` directory:

```env
PORT=3001
MAX_FILE_SIZE_BYTES=10485760  # 10MB default
```

All environment variables have sensible defaults.

## Running the Application

1. **Start the Backend**
   ```bash
   cd imageconverter-backend
   npm start
   ```
   The backend will run on `http://localhost:3001`

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd imageconverter-frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## API Documentation

### Health Check
```http
GET /api/health
```
Returns application health status.

### Image Conversion
```http
POST /api/convert
```

**Content-Type**: `multipart/form-data`

**Parameters**:
- `images` (file, required): Image files (up to 20 files)
- `format` (string): Target format - 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif'
- `quality` (number, 1-100): Image quality (default: 90)
- `width` (number, optional): Resize width in pixels
- `height` (number, optional): Resize height in pixels

**Response**: Converted image file(s) or ZIP archive

**Error Response**:
```json
{
  "error": "Error message"
}
```

## Supported Formats

### Input Formats
- JPEG
- PNG
- WebP
- TIFF
- GIF
- AVIF
- HEIF (iOS/Apple compatibility required)

### Output Formats
- JPEG (with quality compression)
- PNG (lossless)
- WebP (with quality compression)
- TIFF (lossless)
- GIF (optimized)
- AVIF (with quality compression)
- HEIF (with AV1 compression)

## Development

### Running in Development Mode
```bash
# Backend
cd imageconverter-backend
npm run dev  # If nodemon is configured

# Frontend
cd imageconverter-frontend
npm run dev
```

### Building for Production

```bash
# Frontend
cd imageconverter-frontend
npm run build

# Backend (production server)
cd imageconverter-backend
npm start
```

### Testing

Current implementation includes basic error handling and response validation. Add unit tests for critical functions.

## Security Considerations

- **File Upload Limits**: Maximum 10MB per file, up to 20 files
- **Rate Limiting**: 60 requests per minute per IP
- **CORS**: Configured for development; restrict in production
- **MIME Type Validation**: Only accepts specified image types
- **File Extension Checking**: Validates uploaded files

## Performance

- **Sharp Optimization**: High-performance image processing
- **Streaming Responses**: Large files streamed directly to client
- **Memory Management**: Files processed in chunks for efficiency
- **ZIP Compression**: DEFLATE level 9 for multi-file downloads

## Deployment

### Backend Deployment
- Set `PORT` environment variable
- Configure production database if needed
- Set up reverse proxy (nginx)
- Enable HTTPS

### Frontend Deployment
- Build with `npm run build`
- Serve static files through web server
- Update API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Note**: This application is designed for educational and development purposes. For production use, implement additional security measures and consider cloud storage options for file handling.
