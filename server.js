//Step 1
import express from "express";
import cors from "cors";
import "dotenv/config.js";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;

// Service connections
connectDB(); //conncet กับ MOngoDB
connectCloudinary(); //connect กับ Cloudinary

// middlewares
app.use(express.json());

const allowedOrigins = [
    "https://mini-project-admin.vercel.app",
    "https://mini-project-user.vercel.app"
    "http://localhost:5175", // For local development
    "https://mini-project-admin-ben-taikhams-projects.vercel.app",
    "https://mini-project-user-ben-taikhams-projects.vercel.app", // For local development
  ];
  
  // Configure CORS
   app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error("Not allowed by CORS")); // Block the origin
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies or Authorization headers
    })
  );

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/",(req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
    console.log("Server stated om PORT : " + port + " 🌏")
);
