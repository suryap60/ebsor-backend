import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]},
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["admin", "user"], default: "admin" } 
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);