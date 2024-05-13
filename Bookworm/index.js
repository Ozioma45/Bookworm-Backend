import cors from "cors";
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb.js";

import UserRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
config();

// Connect to MongoDB database
connectDB();

// Create an instance of Express.js
const app = express();

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.use("/api/user", UserRoutes);

/* // Define error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); */

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
