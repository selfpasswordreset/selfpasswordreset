const axios = require("axios");
const qs = require("qs");
const { msalConfig } = require("../config/authConfig");

// Function to handle Azure AD login token exchange
const getToken = async (req, res) => {
  const { code } = req.body;

  const tokenRequest = {
    client_id: msalConfig.auth.clientId,
    client_secret: msalConfig.auth.clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000", // Ensure this matches your Azure AD config
    scope: "openid profile email offline_access https://graph.microsoft.com/.default",
  };

  try {
    const response = await axios.post(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      qs.stringify(tokenRequest),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const accessToken = response.data.access_token;

    // Use the accessToken to get user details from Microsoft Graph API
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
      accessToken: accessToken,
      username: username,
      id: id,
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
  const { newPassword, msToken, userId } = req.body;

  try {
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
    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error resetting password." });
  }
};

module.exports = { getToken, sendMfaChallenge, resetPassword };
