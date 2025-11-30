const svgCaptcha = require("svg-captcha")
const crypto = require("crypto")

// Store para captchas with enhanced security
const captchaStore = {}

setInterval(() => {
  const now = Date.now()
  Object.keys(captchaStore).forEach((id) => {
    if (now - captchaStore[id].createdAt > 10 * 60 * 1000) {
      delete captchaStore[id]
    }
  })
}, 60000)

const generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 1,
    color: true,
  })

  const captchaId = crypto.randomBytes(16).toString("hex")

  captchaStore[captchaId] = {
    text: captcha.text.toLowerCase(),
    createdAt: Date.now(),
    attempts: 0,
    used: false,
  }

  const response = {
    captchaId,
    captcha: captcha.data,
  }

  res.json(response)
}

const verifyCaptcha = (req, res) => {
  const { captchaId, captchaText } = req.body

  const captchaData = captchaStore[captchaId]

  if (!captchaData) {
    return res.json({ valid: false, error: "Invalid captcha ID" })
  }

  if (Date.now() - captchaData.createdAt > 5 * 60 * 1000) {
    delete captchaStore[captchaId]
    return res.json({ valid: false, error: "CAPTCHA expired" })
  }

  if (captchaData.used) {
    return res.json({ valid: false, error: "CAPTCHA already used" })
  }

  captchaData.attempts++

  if (captchaData.attempts > 3) {
    return res.json({ valid: false, error: "Too many attempts" })
  }

  if (captchaData.text === captchaText.toLowerCase()) {
    captchaData.used = true
    res.json({ valid: true })
  } else {
    res.json({ valid: false })
  }
}

module.exports = {
  generateCaptcha,
  verifyCaptcha,
  captchaStore,
}
