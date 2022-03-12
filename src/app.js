import express from "express";
import cors from "cors";
import UserRoutes from "./routes/user.js";
import AuthRoutes from "./routes/auth.js";
import UploadRoutes from "./routes/upload.js";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";

const app = express();

// configuration
app.set("port", process.env.PORT || 9001);

//middlewares

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome to my api rest");
});

app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/upload", UploadRoutes);

export default app;
