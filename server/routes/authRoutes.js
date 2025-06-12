// routes/auth.js
const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const pool    = require("../db");
const authenticateToken = require("../middleware/auth");

// ---------- POST /login ----------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const { rows } = await pool.query(
      "SELECT user_id, user_name, user_password FROM users WHERE user_name = $1",
      [username]
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.user_password))) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.user_name },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",                 // dev-friendly
        secure: process.env.NODE_ENV === "production",
        maxAge: 21600000,                // 6 h
      })
      .json({ userId: user.user_id, username: user.user_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------- GET /me ----------
router.get("/me", authenticateToken, (req, res) => {
  const { user_id, username } = req.user;
  res.json({ userId: user_id, username });
});

// ---------- POST /logout ----------
router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.json({ message: "Logout successful" });
});

module.exports = router;
