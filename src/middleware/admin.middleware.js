import { error } from "../utils/response.js";

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return error(res, "Access denied: Admin only", 403);
  }

  next();
};

export default isAdmin;