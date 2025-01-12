const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');
const mongoose = require('mongoose');

// Import all routes
const adminRoutes = require('./routes/adminRoutes');
const adminServiceRoutes = require('./routes/adminServiceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const careerRoutes = require('./routes/careerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const jobRoutes = require('./routes/jobRoutes');
const manualBookingRoutes = require('./routes/manualBookingRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const staffRoutes = require('./routes/staffRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check route
app.get('/', async (req, res) => {
  try {
    // Check MongoDB connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };

    // Collect system health information
    const healthInfo = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus[dbState],
        name: mongoose.connection.name,
        host: mongoose.connection.host
      },
      api: {
        version: process.env.npm_package_version || '1.0.0',
        cors: {
          enabled: true,
          origin: config.frontendUrl
        }
      },
      uptime: process.uptime(),
    };

    // If database is not connected, change status
    if (dbState !== 1) {
      healthInfo.status = 'degraded';
      healthInfo.warning = 'Database connection issues detected';
    }

    res.json(healthInfo);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      details: 'Health check failed'
    });
  }
});

// Add a test database endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    // Try to perform a simple database operation
    const dbState = mongoose.connection.readyState;
    const testResult = await mongoose.connection.db.admin().ping();
    
    res.json({
      success: true,
      database: {
        connected: dbState === 1,
        responseTime: testResult.ok === 1 ? 'OK' : 'Failed',
        state: dbState
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database connection test failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin-services', adminServiceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/manual-bookings', manualBookingRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS enabled for: ${config.frontendUrl}\n`);
  });
}

// For serverless deployment
module.exports = app;
