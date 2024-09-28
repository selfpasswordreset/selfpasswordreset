const express = require("express");
const {
  getToken,
  sendMfaChallenge,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/auth/callback", getToken);
router.post("/send-mfa-challenge", sendMfaChallenge);
router.patch("/reset-password", resetPassword);

module.exports = router;
