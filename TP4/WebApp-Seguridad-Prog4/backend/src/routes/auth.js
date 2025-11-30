const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
})

const checkUsernameLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Increase to 10 to allow multiple test checks
  message: "Too many attempts",
  standardHeaders: true,
  legacyHeaders: false,
})

// Rutas de autenticación
router.post("/login", loginLimiter, authController.login)
router.post("/register", authController.register)
router.post("/auth/verify", authController.verifyToken)
router.post("/check-username", checkUsernameLimiter, authController.checkUsername)

module.exports = router
