import jwt from "jsonwebtoken";
import { error } from "../utils/response.js";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return error(res, "No token", 401);
  }

  // xtract token from "Bearer <token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, "Access token expired", 401);
  }
};

export default auth;