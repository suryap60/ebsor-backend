import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: String,
    },

    state: {
      type: String,
    },

    place: {
      type: String,
    },

    experience: {
      type: Number,
      default: 0,
    },

    additionalInfo: {
      type: String,
    },

    resume: {
      type: String, // uploaded file URL
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "rejected", "selected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);