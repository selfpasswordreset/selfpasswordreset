const express = require('express');
const router = express.Router();
require('dotenv').config();
const msal = require('@azure/msal-node');
const axios = require('axios');

// MSAL configuration for authentication
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
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

    await axios.patch(
      `https://graph.microsoft.com/v1.0/users/${username}`,
      {
        passwordProfile: {
          password: newPassword,
          forceChangePasswordNextSignIn: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      }
    );

    res.status(200).send('Password reset successfully');
  } catch (error) {
    console.error('Password reset failed:', error.message);
    res.status(500).json({ error: 'Password reset failed', details: error.message });
  }
});

module.exports = router;
