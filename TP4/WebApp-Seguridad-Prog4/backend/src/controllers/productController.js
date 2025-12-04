const { db } = require("../config/database")

const getProducts = (req, res) => {
  const { category, search } = req.query

  if (category && !/^[a-zA-Z0-9\s]+$/.test(category)) {
    return res.status(400).json({ error: "formato invalido" })
  }

  if (search && !/^[a-zA-Z0-9\s]+$/.test(search)) {
    return res.status(400).json({ error: "formato invalido" })
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
