import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { success, created, error } from "../utils/response.js";

// SIGNUP
export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    return created(res, user);
  } catch (err) {
    return error(res, err.message);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return success(res, {
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    return error(res, err.message, 401);
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return error(res, "Refresh token required", 401);
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = generateAccessToken({ _id: decoded.id, role: decoded.role, });

    return success(res, { accessToken: newAccessToken });
  } catch (err) {
    return error(res, "Invalid refresh token", 401);
  }
};