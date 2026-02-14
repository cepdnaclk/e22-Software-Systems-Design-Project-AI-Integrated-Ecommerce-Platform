import productModel from "../models/products.js";
import TopProduct from "../models/topProducts.js";

/**
 * CREATE PRODUCT
 */
export function createProduct(req, res) {
  const productData = new productModel({
    price: req.body.price,
    productName: req.body.productName,
    sellerName: req.body.sellerName,
    image: req.body.image,
    warranty: req.body.warranty,
    category: req.body.category,
    isAvailable: true
  });

  productData
    .save()
    .then(() => {
      res.json({ message: "Product created successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    });
}

/**
 * UPDATE PRODUCT
 */
export async function updateProduct(req, res) {
  try {
    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
}

/**
 * DELETE PRODUCT
 */
export async function deleteProduct(req, res) {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    // remove from AI ranking table
    await TopProduct.deleteMany({ productId: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
}

/**
 * BROWSE PRODUCT LISTING
 * GET /api/products
 */
export async function getAllProducts(req, res) {
  try {
    const {
      page = 1,
      limit = 8,
      search,
      minPrice,
      maxPrice,
      category,
      available,
      sort
    } = req.query;

    let query = {};

    // Search by product name
    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Availability filter
    if (available !== undefined) {
      query.isAvailable = available === "true";
    }

    // Sorting
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "latest") sortOption.createdAt = -1;
    if (sort === "popular") sortOption.howManyproductsSold = -1;

    const products = await productModel
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await productModel.countDocuments(query);

    res.json({
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit)
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
}

/**
 * ✅ PRODUCT DETAILS (NEW)
 * GET /api/products/:id
 */
export async function getProductById(req, res) {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
}

/**
 * GET TOP 3 PRODUCTS (AI)
 */
export async function getTopThreeProducts(req, res) {
  try {
    const topProducts = await TopProduct.find()
      .sort({ rank: 1 })
      .limit(3)
      .populate("productId");

    const response = topProducts.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.productName,
      sellerName: item.productId.sellerName,
      image: item.productId.image,
      score: item.score,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch top products",
      error: error.message,
    });
  }
}
