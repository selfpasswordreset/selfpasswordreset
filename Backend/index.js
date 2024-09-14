const express = require('express');
const msal = require('@azure/msal-node');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
