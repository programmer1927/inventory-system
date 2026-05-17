const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const exp = express();
exp.use(cors());
exp.use(express.json());
//MONGODB CONNECTION
connectDB();
// ROUTES
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const stockMovementRoutes = require("./routes/stockMovementRoutes");
const authRoutes = require("./routes/authRoutes");
// USAGE 
exp.use("/products", productRoutes);
exp.use("/suppliers", supplierRoutes);
exp.use("/stock-history", stockMovementRoutes);
exp.use("/users", authRoutes);
// PORT
exp.listen(process.env.PORT, () => {
    console.log("Server running on port 5000")
});