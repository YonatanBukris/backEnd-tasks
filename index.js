const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

const { verifyToken } = require("./middleware/authMiddleware");

dotenv.config(); // Load config

async function main() {
  // Connect to database
  await connectDB();

  // MIDDLEWARES
  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS for local development (for production, you should configure it properly)
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // Routes
  const taskRoutes = require("./routes/taskRoute");

  const authRoutes = require("./routes/authRoute");

  app.use("/api/tasks", taskRoutes);
  app.use("/api/auth", authRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();