import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

const server = http.createServer(app);

// initialize socket
initSocket(server);

// start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});