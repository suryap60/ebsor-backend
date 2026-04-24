import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    resume: { type: String }, // file URL
    coverLetter: { type: String },

    status: {
      type: String,
      enum: ["pending", "reviewed", "rejected", "selected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);