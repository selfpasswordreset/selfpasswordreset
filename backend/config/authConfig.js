require("dotenv").config();

console.log("this si the client Id: ", process.env.CLIENT_ID);
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const tokenRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "offline_access",
    "https://graph.microsoft.com/.default",
  ], // Ensures full user authentication
};

module.exports = { msalConfig, tokenRequest };
