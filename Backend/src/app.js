import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limits: "16kb" }));
app.use(express.urlencoded({ extended: true, limits: "16kb" }));
app.use(express.static("Public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./Routes/user.route.js";
import videoRouter from "./Routes/video.route.js";
import subscription from './Routes/subscription.route.js' 

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use('/api/v1/subscription',subscription)

export { app };