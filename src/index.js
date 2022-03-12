import { config } from "dotenv";
config();
import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./config/database.js";

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(app.get("port"), () =>
    console.log(`Server running on port ${app.get("port")}`)
  );
});
