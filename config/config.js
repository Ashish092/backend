const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // URLs and endpoints
  frontendUrl: process.env.FRONTEND_URL || 'https://frontend-git-main-ashishs-projects-f40fabf1.vercel.app',
  
  // Database configuration
  mongodbUri: process.env.MONGODB_URI,
  
  // Authentication
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '30d',
  
  // Admin credentials
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  // Cors options
  corsOptions: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

// Validation
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('\n❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`🔴 ${envVar} is not set`);
  });
  console.error('\n');
  
  // Only exit in development
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}

module.exports = config; 