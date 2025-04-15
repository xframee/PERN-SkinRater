const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Get the token from the HTTP-only cookie
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Invalid token:", err.message);
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
};

module.exports = authenticateToken;