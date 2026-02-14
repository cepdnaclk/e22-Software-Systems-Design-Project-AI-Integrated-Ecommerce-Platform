import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getTopThreeProducts,
  getAllProducts,
  getProductById        // ✅ ADD THIS
} from "../controllers/productController.js";

const router = express.Router();

/**
 * CREATE PRODUCT
 * POST /api/products/create
 */
router.post("/create", createProduct);

/**
 * UPDATE PRODUCT
 * PUT /api/products/:id
 */
router.put("/:id", updateProduct);

/**
 * DELETE PRODUCT
 * DELETE /api/products/:id
 */
router.delete("/:id", deleteProduct);

/**
 * BROWSE / LIST PRODUCTS
 * GET /api/products
 */
router.get("/", getAllProducts);

/**
 * GET TOP 3 PRODUCTS
 * GET /api/products/top-three
 */
router.get("/top-three", getTopThreeProducts);

/**
 * ✅ PRODUCT DETAILS
 * GET /api/products/:id
 * ⚠️ MUST BE LAST
 */
router.get("/:id", getProductById);

export default router;
