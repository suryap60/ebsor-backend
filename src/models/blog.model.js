import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    
    content: { type: String, required: true },
    excerpt: String, // short preview text

    featuredImage: String,
    tags: [String],

    author: {
      type: String, 
      default: "Admin",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);