const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openaiController");

// Routes
router.post("/generateImage", openaiController.generateImage);

module.exports = router;
