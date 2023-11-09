import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3000;
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB connected success");
  })
  .catch((err) => console.log(`Error: ${err}`));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT}`)
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
