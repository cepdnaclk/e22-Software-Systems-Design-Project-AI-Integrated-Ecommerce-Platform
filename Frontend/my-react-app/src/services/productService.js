// src/services/productService.js

const BASE_URL = "http://localhost:3000/api/products";

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}?${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch products error:", error);
    throw error;
  }
};
