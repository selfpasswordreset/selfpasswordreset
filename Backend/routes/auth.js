const express = require('express');
const router = express.Router();
require('dotenv').config();
const msal = require('@azure/msal-node');
const axios = require('axios');
const rateLimit = require('express-rate-limit'); // Rate Limiter

// MSAL configuration and environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const msalConfig = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret: clientSecret,
  },
};
const cca = new msal.ConfidentialClientApplication(msalConfig);

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const authResponse = await cca.acquireTokenByUsernamePassword({
      scopes: ['User.Read'],
      username: username,
      password: password,
    });
    res.status(200).json({ token: authResponse.accessToken });
  } catch (error) {
    console.error('Authentication failed:', error.message);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

// Password reset route
router.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({ error: 'Username and new password are required' });
  }
  try {
    const tokenResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const graphResponse = await axios.patch(
      `https://graph.microsoft.com/v1.0/users/${username}`,
      {
        passwordProfile: {
          password: newPassword,
          forceChangePasswordNextSignIn: false,
        },
      },
      {
        headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
      }
    );
    res.status(200).send('Password reset successfully');
  } catch (error) {
    console.error('Password reset failed:', error.message);
    res.status(500).json({ error: 'Password reset failed', details: error.message });
  }
});

module.exports = router;
