const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://frontend-git-main-ashishs-projects-f40fabf1.vercel.app',
    'https://www.frontend-git-main-ashishs-projects-f40fabf1.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Your API routes
app.get('/api/your-endpoint', (req, res) => {
  res.json({ message: 'API is working!' });
});

// For Vercel, we need to export the app
module.exports = app;

// Only listen if running directly (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 
