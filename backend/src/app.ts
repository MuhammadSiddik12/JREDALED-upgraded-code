import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads directory
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Global rate limiting
app.use('/api', apiRateLimiter);

// API Routes
app.use('/api', routes);

// Top level routes (for legacy k.php / Cmd.php device endpoints)
app.use('/', routes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
