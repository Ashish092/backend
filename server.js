const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const faqRoutes = require('./routes/faqRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Faq = require('./models/Faq');
const blogRoutes = require('./routes/blogRoutes');
const careerRoutes = require('./routes/careerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const jobRoutes = require('./routes/jobRoutes');
const contactRoutes = require('./routes/contactRoutes');
const staffRoutes = require('./routes/staffRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const adminServiceRoutes = require('./routes/adminServiceRoutes');
const manualBookingRoutes = require('./routes/manualBookingRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/admin-services', adminServiceRoutes);
app.use('/api/manual-bookings', manualBookingRoutes);
app.use('/api/quotes', quoteRoutes);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
    console.log('\n🚀 Server Status:');
    console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`🔗 Server URL: http://localhost:${PORT}`);
    console.log(`📚 API Endpoints:`);
    console.log(`   - GET  http://localhost:${PORT}/`);
    console.log(`   - POST http://localhost:${PORT}/api/users/register`);
    console.log(`   - GET  http://localhost:${PORT}/api/users\n`);
});

// Add error handling
process.on('unhandledRejection', (err) => {
    console.log('\n❌ Server Error:');
    console.log(`🔴 Error: ${err.message}`);
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
}); 