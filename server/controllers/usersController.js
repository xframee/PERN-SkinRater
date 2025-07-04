const pool = require("../db");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (username.length <= 3) {
      return res.status(400).json({ error: "Username must be longer than 3 characters." });
    }
    if (password.length <= 5) {
      return res.status(400).json({ error: "Password must be longer than 5 characters." });
    }

    // Check if username exists
    const userExists = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING user_id, user_name",
      [username, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT user_id, user_name FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
