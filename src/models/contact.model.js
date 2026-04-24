import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email"], },
    phone: String,

    subject: String,
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);