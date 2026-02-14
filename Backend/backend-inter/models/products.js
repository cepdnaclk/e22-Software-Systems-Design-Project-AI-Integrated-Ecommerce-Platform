import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: "/images/default-profile.png"
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    warranty: {
      type: String,
      default: "No warranty"
    },

    howManyproductsSold: {
      type: Number,
      default: 0
    },

    sellerName: {
      type: String,
      required: true
    },

    // ✅ NEW FIELD
    category: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
