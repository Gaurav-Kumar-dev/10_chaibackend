import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Set up CORS middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,  
    credentials: true                // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse incoming requests
app.use(express.json({ limit: "16kb" }));  // Parse JSON bodies up to 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // Parse URL-encoded bodies up to 16kb
app.use(express.static("public"));  // Serve static files from the "public" directory
app.use(cookieParser());  // Parse cookies attached to the client request

// Import routes
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);  


export default app;
