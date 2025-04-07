const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

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
            "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING *",
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



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});