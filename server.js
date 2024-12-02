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
    "https://mini-project-admin.vercel.app/",
    "http://localhost:5175", // For local development
    "http://localhost:5176", // For local development
  ];
  
  // Configure CORS
  app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Request Origin:", origin); // Log Origin ที่มาถึง
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow
      } else {
        console.error(`Blocked by CORS: ${origin}`); // Log Origin ที่ถูกบล็อก
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
