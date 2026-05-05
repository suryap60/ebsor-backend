import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, 
    type: { type: String, enum: ["terms", "faq", "privacy"], default: "terms" },

    content: { type: String }, // for terms/privacy

    faqs: [faqSchema], // for FAQ

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);