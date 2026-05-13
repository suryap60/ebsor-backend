import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
   question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FaqCategory",
    },
  ],
});

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, 
    type: { type: String, enum: ["terms", "faq", "privacy", "refund"], default: "terms" },

    content: { type: String }, // for terms/privacy

    faqs: [faqSchema], // for FAQ

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);