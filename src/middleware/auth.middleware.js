import jwt from "jsonwebtoken";
import { error } from "../utils/response.js";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return error(res, "No token", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, "Access token expired", 401);
  }
};

export default auth;