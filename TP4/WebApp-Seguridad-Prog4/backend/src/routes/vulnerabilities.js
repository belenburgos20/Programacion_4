const express = require("express")
const router = express.Router()
const vulnerabilityController = require("../controllers/vulnerabilityController")
const { uploadMiddleware, uploadFile } = require("../controllers/uploadController")
const csrf = require("csurf")

const csrfProtection = csrf({ cookie: false })

router.post("/ping", vulnerabilityController.ping)

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

router.post(
  "/transfer",
  (req, res, next) => {
    const origin = req.get("origin")
    const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"]

    if (origin && !allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: "Invalid Origin" })
    }
    next()
  },
  csrfProtection,
  vulnerabilityController.transfer,
)

router.get("/file", vulnerabilityController.readFile)

router.post("/upload", uploadMiddleware, uploadFile)

router.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ error: "Invalid CSRF token" })
  }
  next(err)
})

module.exports = router

