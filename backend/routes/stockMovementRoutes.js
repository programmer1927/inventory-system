const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {getStockHistory} = require("../controllers/stockMovementController");

router.get("/:id", protect, getStockHistory);

module.exports = router;
