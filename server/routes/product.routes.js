import express from "express";
// import { protect } from "../middleware/auth.middleware.js";
import { getProducts, getProductById, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById); 
router.post("/", createProduct); // For admin to add new products

export default router;
