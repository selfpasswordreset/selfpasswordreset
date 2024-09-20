const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const rateLimit = require('express-rate-limit');

// Apply rate limiting to the login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again after 15 minutes',
});

// Middleware
app.use(express.json());

// Apply the rate limiter specifically to the login route
app.use('/auth/login', loginLimiter);

// Use routes
app.use('/auth', authRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
