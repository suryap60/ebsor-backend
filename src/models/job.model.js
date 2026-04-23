import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },

    description: { type: String, required: true },
    shortDescription: String,

    location: String,
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
    },

    experience: String,
    salary: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);