const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

const authRoutes = require('./routes/auth');

// Use JSON parser for incoming requests
app.use(express.json());

// Set up the authentication and password reset routes
app.use('/auth', authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
