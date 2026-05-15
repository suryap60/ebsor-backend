import {
  getProfileService,
  updateProfileService,
  changePasswordService,
} from "../services/profile.service.js";
import { emitProfileUpdated } from "../socket/socketEvents.js";

import { success, error } from "../utils/response.js";


// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user.id);

    return success(res, user);
  } catch (err) {
    return error(res, err.message, 400);
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const user = await updateProfileService(
      req.user.id,
      req.body
    );

    emitProfileUpdated(user);

    return success(res, user, "Profile updated successfully");
  } catch (err) {
    return error(res, err.message, 400);
  }
};


// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(
      req.user.id,
      currentPassword,
      newPassword
    );

    return success(res, "Password changed successfully");
  } catch (err) {
    return error(res, err.message, 400);
  }
};