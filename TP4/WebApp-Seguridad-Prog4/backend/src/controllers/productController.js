const { db } = require("../config/database")

const getProducts = (req, res) => {
  const { category, search } = req.query

  if (category) {
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|#|union|select|drop|insert|update|delete|where|or|and|\||`|\$)/i
    if (sqlInjectionPattern.test(category)) {
      return res.status(200).json([])
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(category)) {
      return res.status(200).json([])
    }
  }

  if (search) {
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|#|union|select|drop|insert|update|delete|where|or|\||`|\$)/i
    if (sqlInjectionPattern.test(search)) {
      return res.status(200).json([])
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(search)) {
      return res.status(200).json([])
    }
  }

  let query = "SELECT * FROM products WHERE 1=1"
  const params = []

  if (category) {
    query += ` AND category = ?`
    params.push(category)
  }

  if (search) {
    query += ` AND name LIKE ?`
    params.push(`%${search}%`)
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database error:", err)
      return res.status(500).json({ error: "Internal server error" })
    }
    res.json(results)
  })
}

module.exports = {
  getProducts,
}
