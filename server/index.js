const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require("./middleware/auth.js");
const authRoutes = require("./routes/authRoutes");


//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // allow CORS requests from the React app and allow credentials (cookies) to be sent
app.use(express.json());
app.use(cookieParser());

//ROUTES//

// --- mount routers ---
app.use("/", authRoutes);  // paths are /login, /logout, /me

// add a user
app.post("/users", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (username.length <= 3) {
            return res.status(400).json({ error: "Username must be longer than 3 characters." });
        }
        if (password.length <= 5) {
            return res.status(400).json({ error: "Password must be longer than 5 characters." });
        }

        // Check if username already exists
        const userExists = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Username is already taken." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into the database
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING user_id, user_name",
            [username, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT user_id, user_name FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a specific user
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all skins
app.get("/skins", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const allSkins = await pool.query("SELECT * FROM skin_info ORDER BY skin_id LIMIT $1 OFFSET $2", [limit, offset]);
        res.json(allSkins.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a specific skin
app.get("/skins/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const skin = await pool.query("SELECT * FROM skin_info WHERE skin_id = $1", [id]);
        res.json(skin.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Rate a skin
app.post("/rate-skin", authenticateToken, async (req, res) => {
    try {
        const { skin_id, rating } = req.body;

        // Ensure the user is authenticated
        const user_id = req.user.user_id; // Extracted from the JWT

        // Validate input
        if (!skin_id || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Invalid input: Skin ID and rating (1-5) are required" });
        }

        // Call the "rate" SQL function in the database
        const result = await pool.query(
            "SELECT rate_skin($1, $2, $3)", // Assuming your SQL function is named "rate"
            [user_id, skin_id, rating]
        );

        res.json({ message: "Rating submitted successfully"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});