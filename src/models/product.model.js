import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    shortDescription: String,
    images: [String],
    category: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);