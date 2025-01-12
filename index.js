const cors = require('cors');

// Add this before your routes
app.use(cors({
  origin: [
    'https://frontend-git-main-ashishs-projects-f40fabf1.vercel.app',
    'https://www.frontend-git-main-ashishs-projects-f40fabf1.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); 