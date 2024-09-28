const axios = require("axios");
const qs = require("qs");
const { msalConfig } = require("../config/authConfig");
const {
  generateToken,
  validateToken,
  invalidateToken,
} = require("../utils/tokenUtil");

// Function to handle Azure AD login token exchange
const getToken = async (req, res) => {
  const { code } = req.body;

  const tokenRequest = {
    client_id: msalConfig.auth.clientId,
    client_secret: msalConfig.auth.clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000", // Ensure this matches your Azure AD config
    scope: "openid profile email offline_access",
  };

  try {
    const response = await axios.post(
      "https://login.microsoftonline.com/d08b9f61-feef-4ff7-9994-db6c531274c5/oauth2/v2.0/token",
      qs.stringify(tokenRequest),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const accessToken = response.data.access_token;
    const token = generateToken(accessToken); // Generate 5-minute valid token

    const graphResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const username = graphResponse.data.displayName;
    const id = graphResponse.data.id;
    res.status(200).json({
      success: true,
      accessToken: token,
      username: username,
      id: id,
      msToken: accessToken,
    });
  } catch (err) {
    console.error("Error exchanging authorization code:", err);
    res.status(500).json({
      success: false,
      message: "Error exchanging authorization code for token",
    });
  }
};

// Send MFA Challenge (For users who don't know their credentials)
const sendMfaChallenge = (req, res) => {
  const { tenantId } = req.body;

  // In real implementation, you'd trigger an MFA challenge via Microsoft Graph API
  console.log("Sending MFA challenge for tenant ID:", tenantId);
  res.status(200).json({ message: "MFA challenge sent.", success: true });
};

// Reset Password for authenticated users
const resetPassword = async (req, res) => {
  const { newPassword, accessToken, userId, msToken } = req.body;

  if (!validateToken(accessToken)) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
  try {
    console.log("Hello World 2");
    const graphClientResponse = await axios.patch(
      `https://graph.microsoft.com/v1.0/users/${userId}`,
      {
        passwordProfile: {
          password: newPassword,
          forceChangePasswordNextSignIn: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${msToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      "Password reset for user with token:",
      graphClientResponse.data
    );
    invalidateToken(accessToken); // Invalidate token after use
    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error resetting password." });
  }
};

module.exports = { getToken, sendMfaChallenge, resetPassword };
