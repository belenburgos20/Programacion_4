const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { db } = require("../config/database")
const crypto = require("crypto")
const { recordFailedAttempt, clearFailedAttempts } = require("../middleware/bruteForceProtection")

const loginAttempts = new Map()
const captchaRequired = new Map()

const addDelay = (attempts) => {
  return new Promise((resolve) => {
    const delayMs = Math.min(Math.pow(2, attempts - 1) * 1000, 8000)
    setTimeout(resolve, delayMs)
  })
}

const login = async (req, res) => {
  const { username, password } = req.body

  const query = `SELECT * FROM users WHERE username = ?`

  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en el servidor" })
    }

    if (results.length === 0) {
      recordFailedAttempt(req)
      return res.status(401).json({ error: "Credenciales inválidas" })
    }

    const user = results[0]
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      recordFailedAttempt(req)
      return res.status(401).json({ error: "Credenciales inválidas" })
    }
    clearFailedAttempts(req)

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "supersecret123")

    res.json({ token, username: user.username })
  })
}

const register = async (req, res) => {
  const { username, password, email } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)"
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar usuario" })
    }
    res.json({ message: "Usuario registrado con éxito" })
  })
}

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret123")
    req.session.userId = decoded.id
    res.json({ valid: true, user: decoded })
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

const checkUsername = (req, res) => {
  const { username } = req.body

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    const delay = Math.random() * 100 + 50
    setTimeout(() => {
      res.json({ exists: false })
    }, delay)
    return
  }

  const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err)
      const delay = Math.random() * 100 + 50
      setTimeout(() => {
        res.json({ exists: false })
      }, delay)
      return
    }

    const delay = Math.random() * 100 + 50
    setTimeout(() => {
      const exists = results[0].count > 0
      res.json({ exists })
    }, delay)
  })
}

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername,
}
