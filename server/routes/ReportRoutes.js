const express = require("express");
const router = express.Router();
const generateReport = require("../controllers/GenerateReportController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/generate-report", authMiddleware.requireLogin, generateReport);

module.exports = router;
