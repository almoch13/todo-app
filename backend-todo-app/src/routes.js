const express = require("express");
const router = express.Router();
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Endpoint untuk signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Cek apakah username sudah ada
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length > 0)
        return res.status(400).json({ message: "Username already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json(err);
          res.status(201).json({ message: "User created" });
        }
      );
    }
  );
});

// Endpoint untuk login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(401).json({ message: "User not found" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      // Menghasilkan token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
});

// Mendapatkan semua todo
router.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Menambahkan todo baru
router.post("/todos", (req, res) => {
  const { text, completed, category, urgent } = req.body;
  db.query(
    "INSERT INTO todos (text, completed, category, urgent) VALUES (?, ?, ?, ?)",
    [text, completed, category, urgent],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ id: results.insertId, text, completed, category, urgent });
    }
  );
});

// Menghapus todo
router.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

// Mengupdate todo
router.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed, category, urgent } = req.body;
  db.query(
    "UPDATE todos SET text = ?, completed = ?, category = ?, urgent = ? WHERE id = ?",
    [text, completed, category, urgent, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, text, completed, category, urgent });
    }
  );
});

module.exports = router;
