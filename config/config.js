const config = {
  frontendUrl: process.env.FRONTEND_URL || 'https://frontend-git-main-ashishs-projects-f40fabf1.vercel.app',
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET
};

module.exports = config; 