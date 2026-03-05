import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


// Load env 
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

import StudentRoutes from "./routes/StudentRoutes.js";
app.use("/api/Student/",StudentRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});