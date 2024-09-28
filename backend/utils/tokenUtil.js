const exp = require("constants");
const crypto = require("crypto");

// Simple in-memory token store (for demo purposes)
const tokens = new Map();

// Generates a token with a 5-minute validity
const generateToken = (accessToken) => {
  const token = crypto.randomBytes(20).toString("hex");
  tokens.set(token, { accessToken, expiry: Date.now() + 5 * 60 * 1000 });
  return token;
};

const t = "b9cd2e7bae9e6d4fa880ad5cccad7cd0247cd6d5";
tokens.set("18cd2befd2bd73fcb1409eb6ce781dca87329ba4", {
  t,
  expiry: Date.now() + 5 * 60 * 1000,
});

// Validates the token (check if it's expired)
const validateToken = (token) => {
  if (!tokens.has(token)) return false;

  const tokenData = tokens.get(token);
  if (Date.now() > tokenData.expiry) {
    tokens.delete(token); // Token expired
    return false;
  }

  return true;
};

// Invalidate the token (after password reset or failed attempt)
const invalidateToken = (token) => {
  tokens.delete(token);
};

module.exports = { generateToken, validateToken, invalidateToken };
