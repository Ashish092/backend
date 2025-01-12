const express = require('express');
const cors = require('cors');
const config = require('./config/config');
// ... other imports

const app = express();

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

app.use(express.json());
// ... rest of your middleware and routes 