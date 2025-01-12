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

// Add this with your other routes
app.get('/api/blogs', async (req, res) => {
  try {
    // Replace this with your actual database query
    const blogs = [
      { id: 1, title: 'First Blog', content: 'This is my first blog post' },
      { id: 2, title: 'Second Blog', content: 'This is another blog post' }
    ];
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const { title, content } = req.body;
    // Replace this with your actual database insert
    const newBlog = { id: Date.now(), title, content };
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog' });
  }
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
