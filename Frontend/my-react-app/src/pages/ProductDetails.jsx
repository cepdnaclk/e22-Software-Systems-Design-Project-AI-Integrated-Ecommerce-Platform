// src/pages/ProductDetails.jsx

import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Details Page</h2>
      <p>Product ID: {id}</p>
      <p>This page is working ✅</p>
    </div>
  );
};

export default ProductDetails;
