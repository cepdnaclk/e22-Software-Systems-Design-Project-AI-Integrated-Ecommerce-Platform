import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-40 object-cover mb-3 rounded"
      />

      <h3 className="font-semibold text-lg">
        {product.productName}
      </h3>

      <p className="text-gray-600">
        Seller: {product.sellerName}
      </p>

      <p className="font-bold text-green-600">
        Rs. {product.price}
      </p>

      <p
        className={`text-sm mt-1 ${
          product.isAvailable ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.isAvailable ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default ProductCard;
