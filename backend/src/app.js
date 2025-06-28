import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import jobsRouter from './routes/Jobs.js';
import authRouter from './routes/auth.js';

const app = express();

// Simple test route at the very beginning
app.get('/debug', (req, res) => {
  res.json({ 
    message: 'Express server is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000', // Alternative dev port
  'https://your-frontend-domain.vercel.app', // Replace with your actual frontend domain
  'https://your-frontend-domain.netlify.app'  // Replace with your actual frontend domain
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Root route for debugging
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Tracker Backend API is running!',
    endpoints: {
      health: '/health',
      test: '/test',
      api: '/api',
      jobs: '/jobs',
      auth: '/auth'
    },
    timestamp: new Date().toISOString()
  });
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Routes
app.use('/api', router);
app.use('/jobs', jobsRouter);
app.use('/auth', authRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is healthy!' });
});

export default app; 