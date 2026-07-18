import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import { createRateLimiter } from './middleware/rateLimiter.js';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';
import { setupPassport } from './config/passport.js';
import { authRouter } from './routes/auth.js';
import { meetingRouter } from './routes/meetings.js';
import { userRouter } from './routes/users.js';
import { organizationRouter } from './routes/organizations.js';
import { recordingRouter, notificationRouter, fileRouter, analyticsRouter, adminRouter } from './routes/recordings.js';
import { setupSocketHandlers } from './services/socket/index.js';
import { setupSwagger } from './config/swagger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/env.js';

const app = express();
const httpServer = http.createServer(app);

// Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: config.CORS_ORIGINS.split(','),
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: config.CORS_ORIGINS.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(morgan('combined'));

// Rate limiting
app.use('/api/', createRateLimiter(100, 15));
app.use('/api/auth/', createRateLimiter(10, 15));

// Passport
setupPassport();

// Swagger docs
setupSwagger(app);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'edithink-api'
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/meetings', meetingRouter);
app.use('/api/users', userRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/recordings', recordingRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/files', fileRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/admin', adminRouter);

// Socket handlers
setupSocketHandlers(io);

// Error handler (must be last)
app.use(errorHandler);

// Start server
async function start() {
  await connectDatabase();
  await connectRedis();
  
  httpServer.listen(config.PORT, () => {
    console.log(`🚀 EdiThink server running on port ${config.PORT}`);
    console.log(`📄 API Docs: http://localhost:${config.PORT}/api-docs`);
    console.log(`🌍 Environment: ${config.NODE_ENV}`);
  });
}

start().catch(console.error);

export { app, io };
