import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateProfileService = async (userId, data) => {
  const { name, email } = data;

  const existingEmail = await User.findOne({
    email,
    _id: { $ne: userId },
  });

  if (existingEmail) {
    throw new Error("Email already in use");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  ).select("-password");

  return updatedUser;
};

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return true;
};