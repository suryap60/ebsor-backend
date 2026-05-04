import jwt from "jsonwebtoken";
import { error } from "../utils/response.js";

const authOptional = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
  } catch (err) {
    console.log("Invalid token:", err.message);
    req.user = null;
  }

  next();
};

export default authOptional;