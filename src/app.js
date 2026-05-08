import "./config/env.js";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/uploads", express.static("src/uploads"));

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR =>", err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

export default app;