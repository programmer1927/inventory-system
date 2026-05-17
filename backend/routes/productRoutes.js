const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {getProducts, addProduct, deleteProduct, updateProduct, patchProduct} = require("../controllers/productController");

router.get("/", protect, getProducts);
router.post("/", protect, addProduct);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);
router.patch("/:id", protect, patchProduct);

module.exports = router;
