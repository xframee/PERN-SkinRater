const express = require("express");
const router = express.Router();
const { getAllSkins, getSkinById, rateSkin } = require("../controllers/skinsController");
const authenticateToken = require("../middleware/auth");

router.get("/", getAllSkins);
router.get("/:id", getSkinById);
router.post("/rate", authenticateToken, rateSkin);

module.exports = router;
