const express = require("express")
const router = express.Router()
const vulnerabilityController = require("../controllers/vulnerabilityController")
const { uploadMiddleware, uploadFile } = require("../controllers/uploadController")
const csrf = require("csurf")

const csrfProtection = csrf({ cookie: false })

// Command Injection
router.post("/ping", vulnerabilityController.ping)

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

router.post("/transfer", csrfProtection, vulnerabilityController.transfer)

// Local File Inclusion
router.get("/file", vulnerabilityController.readFile)

// File Upload
router.post("/upload", uploadMiddleware, uploadFile)

module.exports = router
