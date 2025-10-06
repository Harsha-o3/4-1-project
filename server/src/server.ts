import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import doctorsRoutes from './routes/doctors.js';
import appointmentsRoutes from './routes/appointments.js';
import pharmacyRoutes from './routes/pharmacy.js';
import symptomCheckerRoutes from './routes/symptom-checker.js';
import adminRoutes from './routes/admin.js';

// Import database
import sequelize from './database/connection.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

let PORT = parseInt(process.env.PORT || '5000', 10);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
);
app.use(compression());
app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/symptom-checker', symptomCheckerRoutes);
app.use('/api/admin', adminRoutes);

// WebSocket
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-appointment', (appointmentId) => {
    socket.join(`appointment-${appointmentId}`);
    console.log(`User ${socket.id} joined appointment ${appointmentId}`);
  });

  socket.on('webrtc-offer', (data) => {
    socket.to(`appointment-${data.appointmentId}`).emit('webrtc-offer', data);
  });

  socket.on('webrtc-answer', (data) => {
    socket.to(`appointment-${data.appointmentId}`).emit('webrtc-answer', data);
  });

  socket.on('webrtc-ice-candidate', (data) => {
    socket.to(`appointment-${data.appointmentId}`).emit('webrtc-ice-candidate', data);
  });

  socket.on('chat-message', (data) => {
    socket.to(`appointment-${data.appointmentId}`).emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use(
  (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    });
  },
);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start server with fallback port handling
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('✅ Database models synchronized.');
    }

    function listen(port: number) {
      server.listen(port)
        .once('listening', () => {
          console.log(`🚀 Server running on port ${port}`);
          console.log(`📊 Health check: http://localhost:${port}/health`);
          console.log(`🔌 WebSocket server ready`);
        })
        .once('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
            listen(port + 1);
          } else {
            console.error('❌ Failed to start server:', err);
            process.exit(1);
          }
        });
    }

    listen(PORT);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
