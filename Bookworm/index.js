import cors from "cors";
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/mongodb.js";

import routes from "./routes/routes.js";

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes
app.use("/api/", routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
